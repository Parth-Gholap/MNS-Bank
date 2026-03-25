'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { api } from '@/lib/api/client';
import { PolicyDocument } from '@/types';
import { trackPageView, trackDownload } from '@/lib/analytics';

interface PrivacyPolicyPageProps {
  locale: 'en' | 'hi';
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [policy, setPolicy] = useState<PolicyDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackPageView('Privacy Policy', locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy');
    
    // Fetch privacy policy
    const fetchPrivacyPolicy = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.getPolicies({
          'Accept-Language': locale === 'hi' ? 'hi' : 'en',
          category: 'privacy'
        });

        if (response.success && response.data && (response.data as any).length > 0) {
          setPolicy((response.data as any)[0]);
        } else {
          setError(response.error?.message || 'Failed to fetch privacy policy');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, [locale]);

  const handleDownload = async () => {
    if (policy) {
      try {
        const response = await fetch(`/api/compliance/policies/${policy.id}/download`, {
          headers: {
            'Accept-Language': locale === 'hi' ? 'hi' : 'en'
          }
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `privacy-policy-${locale}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          trackDownload('privacy-policy.pdf', 'application/pdf');
        } else {
          setError('Failed to download privacy policy');
        }
      } catch (err) {
        setError('Failed to download privacy policy');
      }
    }
  };

  const lastUpdated = policy ? new Date(policy.lastUpdated).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN') : new Date().toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN');

  return (
    <div className="container-bank px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-h2 text-gray-900">
          {t('compliance.privacyPolicy')}
        </h1>
        <p className="text-body text-gray-600">
          {locale === 'hi' 
            ? 'महानगर नागरिक सहकारी बैंक की गोपनीयता नीति और आपके व्यक्तिगत अधिकार जानकारी की सुरक्षा के बारे में जानकारी है।'
            : 'Mahanagar Nagrik Sahakari Bank is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.'
          }
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0-4-4.585-4.585a2 2 0 011-1.293 1.293-1.293 0-4.585-4.585z" />
            </svg>
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bank-blue-600"></div>
        </div>
      )}

      {/* Policy Content */}
      {policy && !loading && (
        <div className="bg-white rounded-lg shadow-card border border-gray-200">
          {/* Policy Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {policy.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-gray-700">
                      {locale === 'hi' ? 'अंतिम दिनाम:' : 'Effective Date:'}
                    </span>
                    <span className="font-medium text-gray-700">
                      {new Date(policy.effectiveDate).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN')}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="btn-primary ml-auto"
                aria-label={locale === 'hi' ? 'डाउनलोड करें' : 'Download Privacy Policy'}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m-6 6H6a2 2 0 012 2v6a2 2 0 012-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 3 3h6v-6a2 2 0 012-2z" />
                </svg>
                {locale === 'hi' ? 'डाउनलोड करें' : 'Download'}
              </button>
            </div>
          </div>

          {/* Policy Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              <div className="text-body text-gray-600 leading-relaxed space-y-6">
                {/* Introduction */}
                <section className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === 'hi' ? 'परिचय' : 'Introduction'}
                  </h3>
                  <div className="text-body text-gray-600">
                    {locale === 'hi' 
                      ? 'महानगर नागरिक सहकारी बैंक की गोपनीयता नीति और आपके व्यक्तिगत अधिकार जानकारी की सुरक्षा के बारे में जानकारी है।'
                      : 'Mahanagar Nagrik Sahakari Bank ("we," "our," or "Bank") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.'
                    }
                  </div>
                </section>

                {/* Information Collection */}
                <section className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === 'hi' ? 'जानकारी संग्रहण' : 'Information We Collect'}
                  </h3>
                  <div className="text-body text-gray-600">
                    {locale === 'hi' 
                      ? 'हम आपसे व्यक्तिगत अधिकार से संबंधित करते हैं, जब कि आप हमारे सेवाओं का उपयोग करते हैं।'
                      : 'We collect information from you when you use our services, open an account, or otherwise interact with us.'
                    }
                  </div>
                </section>

                {/* Contact Information */}
                <section className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {locale === 'hi' ? 'पता' : 'Address'}
                        </p>
                        <p className="text-gray-600">
                          {locale === 'hi' 
                            ? 'महानगर नागरिक सहकारी बैंक, मुख्य कार्यालय, भोपाल'
                            : 'Mahanagar Nagrik Sahakari Bank, Head Office, Bhopal'
                          }
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {locale === 'hi' ? 'फोन' : 'Phone'}
                        </p>
                        <p className="text-gray-600">
                          1800-123-4567
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Policy Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span>
                  {locale === 'hi' 
                    ? `यह नीति अंतिम दिनाम: ${lastUpdated}`
                    : `This policy was last updated: ${lastUpdated}`
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicyPage;