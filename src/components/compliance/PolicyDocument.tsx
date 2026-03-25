'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { PolicyDocument as PolicyDocumentType } from '@/types';

interface PolicyDocumentProps {
  policy: PolicyDocumentType;
  locale: 'en' | 'hi';
  onDownload?: () => void;
  onViewDetails?: () => void;
}

const PolicyDocument: React.FC<PolicyDocumentProps> = ({ 
  policy, 
  locale, 
  onDownload, 
  onViewDetails 
}) => {
  const { t } = useTranslation(locale);

  const getCategoryLabel = (category: string) => {
    const categories = {
      'fair-practices': locale === 'hi' ? 'निष्प अभ्यास' : 'Fair Practices',
      'privacy': locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy',
      'grievance': locale === 'hi' ? 'शिकायत नीति' : 'Grievance Policy',
      'penal-charges': locale === 'hi' ? 'दंड शुल्क' : 'Penal Charges',
      'citizens-charter': locale === 'hi' ? 'नागरिकों की चार्टर' : 'Citizens Charter',
      'kfs-templates': locale === 'hi' ? 'केएफएस टेम्पलेट' : 'KFS Templates'
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getFileSizeLabel = (size: number) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6 hover:shadow-bank transition-shadow duration-300">
      {/* Policy Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {policy.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 6-6a2 2 0 012-2v6a2 2 0 012-2z" />
              </svg>
              {getCategoryLabel(policy.category)}
            </span>
            <span>•</span>
            <span className="font-medium text-gray-700">
              {new Date(policy.effectiveDate).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN')}
            </span>
          </div>
        </div>
        
        {/* Document Info */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {policy.fileSize && (
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2h10a2 2 0 002 2v10a2 2 0 002-2z" />
              </svg>
              {locale === 'hi' ? 'फाइल आकार:' : 'File Size:'}
              <span className="font-medium text-gray-700">
                {getFileSizeLabel(parseInt(policy.fileSize || '0'))}
              </span>
            </span>
          )}
          {policy.version && (
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10a2 2 0 012-2v6a2 2 0 012-2z" />
              </svg>
              {locale === 'hi' ? 'संस्करण:' : 'Version:'}
              <span className="font-medium text-gray-700">
                {policy.version}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Policy Description */}
      <div className="mb-4">
        <p className="text-body text-gray-600 leading-relaxed">
          {policy.description}
        </p>
      </div>

      {/* Policy Tags */}
      {policy.tags && policy.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {policy.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block px-3 py-1 text-xs font-medium bg-bank-blue-100 text-bank-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Policy Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onDownload}
          className="btn-primary flex-1 group"
          aria-label={locale === 'hi' ? 'डाउनलोड करें' : 'Download Policy'}
        >
          <svg className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m-6 6H6a2 2 0 012 2v6a2 2 0 012-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 3 3h6v-6a2 2 0 012-2z" />
          </svg>
          <span className="group-hover:translate-x-0.5 transition-transform duration-200">
            {locale === 'hi' ? 'डाउनलोड करें' : 'Download'}
          </span>
        </button>
        
        <button
          onClick={onViewDetails}
          className="btn-secondary flex-1 group"
          aria-label={locale === 'hi' ? 'अधिक देखें' : 'View Details'}
        >
          <svg className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2h10a2 2 0 002 2v10a2 2 0 002-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7l3 3 3 3h6v-6a2 2 0 012-2z" />
          </svg>
          <span className="group-hover:translate-x-0.5 transition-transform duration-200">
            {locale === 'hi' ? 'अधिक देखें' : 'View Details'}
          </span>
        </button>
      </div>

      {/* Important Notice */}
      {policy.important && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0-4-4.585-4.585a2 2 0 011-1.293 1.293-1.293 0-4.585-4.585z" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-yellow-900 mb-2">
                {locale === 'hi' ? 'महत्वपूर्ण नोट:' : 'Important Notice:'}
              </h4>
              <p className="text-sm text-yellow-800">
                {locale === 'hi' 
                  ? 'यह नीति महत्वपूर्ण है और सभी सभी शिकायतों के लिए लागू हो सकती है।'
                  : 'This policy is important and requires your attention. Please read carefully.'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16a2 2 0 012 2v6a2 2 0 012-2z" />
          </svg>
          <span>
            {locale === 'hi' ? 'अंतिम दिनाम:' : 'Last Updated:'}
          </span>
          <span className="font-medium text-gray-700">
            {new Date(policy.lastUpdated).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PolicyDocument;
