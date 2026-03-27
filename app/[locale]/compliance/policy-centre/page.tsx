'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface PolicyCentrePageProps {
  locale: 'en' | 'hi';
}

const PolicyCentrePage: React.FC<PolicyCentrePageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const policyCategories = [
    { value: 'all', label: locale === 'hi' ? 'सभी नीतियां' : 'All Policies' },
    { value: 'fair-practices', label: locale === 'hi' ? 'निष्पादन अभ्यास' : 'Fair Practices' },
    { value: 'privacy', label: locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy' },
    { value: 'grievance', label: locale === 'hi' ? 'शिकायत नीति' : 'Grievance Policy' },
    { value: 'penal-charges', label: locale === 'hi' ? 'दंड शुल्क' : 'Penal Charges' },
    { value: 'citizens-charter', label: locale === 'hi' ? 'नागरिक चार्टर' : 'Citizens Charter' },
    { value: 'kfs-templates', label: locale === 'hi' ? 'केएफएस टेम्पलेट' : 'KFS Templates' }
  ];

  React.useEffect(() => {
    trackPageView('Policy Centre', locale === 'hi' ? 'नीति केंद्र' : 'Policy Centre');
  }, [locale]);

  const policies = [
    {
      id: 1,
      title: locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy',
      category: 'privacy',
      description: locale === 'hi' 
        ? 'ग्राहकों की व्यक्तिगत जानकारी की सुरक्षा और उपयोग के बारे में विस्तृत नीति'
        : 'Detailed policy on protection and usage of customer personal information',
      effectiveDate: '2024-01-01',
      lastUpdated: '2024-01-15',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: locale === 'hi' ? 'निष्पादन अभ्यास संहिता' : 'Fair Practices Code',
      category: 'fair-practices',
      description: locale === 'hi'
        ? 'बैंकिंग लेनदेन में निष्पादन अभ्यासों के लिए संहिता'
        : 'Code of fair practices for banking transactions',
      effectiveDate: '2024-01-01',
      lastUpdated: '2024-01-10',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: locale === 'hi' ? 'शिकायत निवारण नीति' : 'Grievance Redressal Policy',
      category: 'grievance',
      description: locale === 'hi'
        ? 'ग्राहक शिकायतों के निवारण की प्रक्रिया और समयरेखा'
        : 'Procedure and timeline for resolution of customer complaints',
      effectiveDate: '2024-01-01',
      lastUpdated: '2024-01-05',
      downloadUrl: '#'
    },
    {
      id: 4,
      title: locale === 'hi' ? 'दंड शुल्क' : 'Penal Charges',
      category: 'penal-charges',
      description: locale === 'hi'
        ? 'विभिन्न बैंकिंग सेवाओं पर लागू होने वाले दंड शुल्क'
        : 'Penal charges applicable on various banking services',
      effectiveDate: '2024-01-01',
      lastUpdated: '2024-01-08',
      downloadUrl: '#'
    },
    {
      id: 5,
      title: locale === 'hi' ? 'नागरिक चार्टर' : 'Citizens Charter',
      category: 'citizens-charter',
      description: locale === 'hi'
        ? 'ग्राहकों को प्रदान की जाने वाली सेवाओं और समयरेखा'
        : 'Services provided to customers and timeline commitments',
      effectiveDate: '2024-01-01',
      lastUpdated: '2024-01-12',
      downloadUrl: '#'
    },
    {
      id: 6,
      title: locale === 'hi' ? 'कुंजी तथ्य विवरण (KFS) टेम्पलेट' : 'Key Fact Statement (KFS) Templates',
      category: 'kfs-templates',
      description: locale === 'hi'
        ? 'विभिन्न ऋण उत्पादों के लिए कुंजी तथ्य विवरण टेम्पलेट'
        : 'Key fact statement templates for various loan products',
      effectiveDate: '2024-01-01',
      lastUpdated: '2024-01-20',
      downloadUrl: '#'
    }
  ];

  const filteredPolicies = selectedCategory === 'all' 
    ? policies 
    : policies.filter(policy => policy.category === selectedCategory);

  const handleDownload = (policy: any) => {
    // Create a simple text file download
    const content = `${policy.title}\n\n${policy.description}\n\n${locale === 'hi' ? 'प्रभावी तिथि: ' : 'Effective Date: '}${policy.effectiveDate}\n${locale === 'hi' ? 'अंतिम अपडेट: ' : 'Last Updated: '}${policy.lastUpdated}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${policy.title.replace(/\s+/g, '-').toLowerCase()}-${locale}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'नीति केंद्र' : 'Policy Centre'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमारी सभी बैंकिंग नीतियों, संहिताओं और दिशानिर्देशों तक पहुंचें'
              : 'Access all our banking policies, codes, and guidelines'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'श्रेणी द्वारा फ़िल्टर करें' : 'Filter by Category'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {policyCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-bank-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {policy.title}
                  </h3>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-bank-blue-100 text-bank-blue-800 rounded-full">
                    {policyCategories.find(cat => cat.value === policy.category)?.label}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {policy.description}
              </p>
              
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {locale === 'hi' ? 'प्रभावी तिथि: ' : 'Effective: '}{new Date(policy.effectiveDate).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN')}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  {locale === 'hi' ? 'अंतिम अपडेट: ' : 'Updated: '}{new Date(policy.lastUpdated).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN')}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(policy)}
                  className="flex-1 bg-bank-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-bank-blue-700 transition-colors duration-200 text-sm"
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {locale === 'hi' ? 'डाउनलोड' : 'Download'}
                </button>
                <button
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  {locale === 'hi' ? 'देखें' : 'View'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'अतिरिक्त जानकारी' : 'Additional Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'नीतियां क्यों महत्वपूर्ण हैं?' : 'Why Policies Matter?'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' 
                  ? 'हमारी नीतियां आपको आपके अधिकारों और दायित्वों को समझने में मदद करती हैं, और हमारी प्रतिबद्धता को पारदर्शिता और निष्पादन सुनिश्चित करती हैं।'
                  : 'Our policies help you understand your rights and responsibilities, ensuring transparency and fair practices in all our dealings.'
                }
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'नीतियों का अपडेट' : 'Policy Updates'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' 
                  ? 'हम नियामक आवश्यकताओं और बैंकिंग प्रथाओं में बदलावों के अनुसार नियमित रूप से अपनी नीतियों को अपडेट करते हैं।'
                  : 'We regularly update our policies to reflect regulatory requirements and changes in banking practices.'
                }
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-bank-blue-50 rounded-lg">
            <p className="text-bank-blue-800">
              <strong>{locale === 'hi' ? 'किसी भी प्रश्न के लिए: ' : 'For any questions: '}</strong>
              {locale === 'hi' ? 'कृपया हमारे ग्राहक सेवा केंद्र से संपर्क करें।' : 'Please contact our customer service center.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyCentrePage;
