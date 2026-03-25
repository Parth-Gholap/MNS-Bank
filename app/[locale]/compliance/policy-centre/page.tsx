'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { api } from '@/lib/api/client';
import { PolicyDocument } from '@/types';
import { trackPageView, trackDownload } from '@/lib/analytics';

interface PolicyCentrePageProps {
  locale: 'en' | 'hi';
}

const PolicyCentrePage: React.FC<PolicyCentrePageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [policies, setPolicies] = useState<PolicyDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const policyCategories = [
    { value: 'all', label: locale === 'hi' ? 'सभी सभी नीतियां' : 'All Policies' },
    { value: 'fair-practices', label: locale === 'hi' ? 'निष्प अभ्यास' : 'Fair Practices' },
    { value: 'privacy', label: locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy' },
    { value: 'grievance', label: locale === 'hi' ? 'शिकायत नीति' : 'Grievance Policy' },
    { value: 'penal-charges', label: locale === 'hi' ? 'दंड शुल्क' : 'Penal Charges' },
    { value: 'citizens-charter', label: locale === 'hi' ? 'नागरिकों की चार्टर' : 'Citizens Charter' },
    { value: 'kfs-templates', label: locale === 'hi' ? 'केएफएस टेम्पलेट' : 'KFS Templates' }
  ];

  useEffect(() => {
    trackPageView('Policy Centre', locale === 'hi' ? 'नीति केंद्र' : 'Policy Centre');
  }, [locale]);

  const fetchPolicies = async (category?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.getPolicies({
        'Accept-Language': locale === 'hi' ? 'hi' : 'en',
        ...(category && category !== 'all' && { category })
      });

      if (response.success && response.data) {
        setPolicies(response.data as any || []);
      } else {
        setError(response.error?.message || 'Failed to fetch policies');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies(selectedCategory);
  }, [selectedCategory, locale]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDownload = async (policy: PolicyDocument) => {
    try {
      const response = await fetch(`/api/compliance/policies/${policy.id}/download`, {
        headers: {
          'Accept-Language': locale === 'hi' ? 'hi' : 'en'
        }
      });

      if (response.ok) {
        const data = await response.blob();
        // Create download link
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${policy.title}-${locale}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        trackDownload(`${policy.title}.pdf`, 'application/pdf');
      } else {
        setError('Failed to download policy document');
      }
    } catch (err) {
      setError('Failed to download policy document');
    }
  };

  const filteredPolicies = selectedCategory === 'all' 
    ? policies 
    : policies.filter(policy => policy.category === selectedCategory);

  return (
    <div className="container-bank px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-h2 text-gray-900">
          {t('compliance.policyCentre')}
        </h1>
        <p className="text-body text-gray-600">
          {locale === 'hi' 
            ? 'यहां बैंक की सभी नीतियां, दंड शुल्क, और अन्य अन्य दस्तावेज यहां देखें।'
            : 'Access all bank policies, fair practices, privacy policy, grievance redressal procedures, penal charges, citizens charter, and Key Facts Statement (KFS) templates.'}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {policyCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.value
                  ? 'bg-bank-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0-4-4.585-4.585a2 2 0 011-1.293 1.293-1.293 0-4.585-4.585z" />
            </svg>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 border-t-transparent"></div>
        </div>
      )}

      {/* Policies Grid */}
      {!loading && filteredPolicies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-lg shadow-card border border-gray-200 p-6 hover:shadow-bank transition-shadow duration-300">
              {/* Policy Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {policy.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{locale === 'hi' ? 'श्रेणी:' : 'Category:'}</span>
                  <span className="font-medium text-gray-700">
                    {policyCategories.find(cat => cat.value === policy.category)?.label}
                  </span>
                  <span>•</span>
                  <span>{locale === 'hi' ? 'अंतिम दिनाम:' : 'Effective Date:'}</span>
                  <span className="font-medium text-gray-700">
                    {new Date(policy.effectiveDate).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN')}
                  </span>
                </div>
              </div>

              {/* Policy Description */}
              <div className="mb-4">
                <p className="text-body text-gray-600">
                  {policy.description}
                </p>
              </div>

              {/* Policy Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleDownload(policy)}
                  className="btn-primary flex-1"
                  aria-label={locale === 'hi' ? 'डाउनलोड करें' : 'Download Policy'}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m-6 6H6a2 2 0 012 2v6a2 2 0 012-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 3 3h6v-6a2 2 0 012-2z" />
                  </svg>
                  {locale === 'hi' ? 'डाउनलोड करें' : 'Download'}
                </button>
                
                <a
                  href={`/compliance/policies/${policy.id}`}
                  className="btn-secondary flex-1 text-center"
                  aria-label={locale === 'hi' ? 'अधिक देखें' : 'View Details'}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2h10a2 2 0 002 2v10a2 2 0 002-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7l3 3 3 3h6v-6a2 2 0 012-2z" />
                  </svg>
                  {locale === 'hi' ? 'अधिक देखें' : 'View Details'}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Policies State */}
      {!loading && !error && filteredPolicies.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-gray-100 rounded-lg p-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 6-6a2 2 0 012-2v6a2 2 0 012-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {locale === 'hi' ? 'कोई नीतियां नहीं मिले' : 'No Policies Found'}
            </h3>
            <p className="text-body text-gray-600">
              {locale === 'hi' 
                ? 'वर्तमान चुनित नीतियां उपलब्ध होने के बाद में यहां देखें।'
                : 'No policies are currently available in this category. Please check back later or contact our support team for assistance.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyCentrePage;
