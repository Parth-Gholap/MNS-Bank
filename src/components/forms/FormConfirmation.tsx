'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface FormConfirmationProps {
  locale: 'en' | 'hi';
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  referenceNumber?: string;
  estimatedResponseTime?: string;
  nextSteps?: string[];
  supportContact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  onDismiss?: () => void;
  onNewInquiry?: () => void;
  onTrackStatus?: () => void;
  className?: string;
}

const FormConfirmation: React.FC<FormConfirmationProps> = ({
  locale,
  type,
  title,
  message,
  referenceNumber,
  estimatedResponseTime,
  nextSteps,
  supportContact,
  onDismiss,
  onNewInquiry,
  onTrackStatus,
  className = ''
}) => {
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView('Form Confirmation', locale === 'hi' ? 'फॉर्म पुष्टि' : 'Form Confirmation');
  }, [locale, type]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: '✅',
          iconBg: 'bg-green-100'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: '❌',
          iconBg: 'bg-red-100'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: 'ℹ️',
          iconBg: 'bg-blue-100'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: 'ℹ️',
          iconBg: 'bg-gray-100'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className={`${styles.iconBg} rounded-full p-2 mr-3`}>
            <span className="text-xl">{styles.icon}</span>
          </div>
          <div>
            <h2 className={`text-xl font-bold ${styles.text} mb-1`}>
              {title}
            </h2>
            {referenceNumber && (
              <p className="text-sm font-medium opacity-75">
                {locale === 'hi' ? 'संदर्भ संख्या' : 'Reference'}: {referenceNumber}
              </p>
            )}
          </div>
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`text-gray-400 hover:text-gray-600 transition-colors`}
            aria-label={locale === 'hi' ? 'बंद करें' : 'Dismiss'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Message */}
      <div className="mb-6">
        <p className={`${styles.text} leading-relaxed`}>
          {message}
        </p>
      </div>

      {/* Response Time */}
      {estimatedResponseTime && (
        <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3l3 3V8M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
            {locale === 'hi' ? 'अनुमानित प्रतिक्रिय समय' : 'Estimated Response Time'}
          </h3>
          <p className="text-gray-700">
            {locale === 'hi' ? 'आपको इस समय के भीतर में प्रतिक्रिय मिलेगी:' : 'You can expect a response within:'}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            {estimatedResponseTime}
          </p>
        </div>
      )}

      {/* Reference Card */}
      {referenceNumber && (
        <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {locale === 'hi' ? 'संदर्भ संख्या' : 'Reference Number'}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {referenceNumber}
            </p>
            <button
              onClick={() => navigator.clipboard.writeText(referenceNumber)}
              className="btn-outline text-sm"
              title={locale === 'hi' ? 'संदर्भ संख्या कॉपी करें' : 'Copy reference number'}
            >
              {locale === 'hi' ? 'कॉपी' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {/* Next Steps */}
      {nextSteps && nextSteps.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 9a2 2 0 002 2v2a2 2 0 002 2h-2a2 2 0 00-2-2V9z" />
            </svg>
            {locale === 'hi' ? 'अगले कदम' : 'Next Steps'}
          </h3>
          <ul className="space-y-2">
            {nextSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${styles.text} ${styles.bg} text-sm font-medium mr-3`}>
                  {index + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onNewInquiry && (
          <button
            onClick={onNewInquiry}
            className="btn-primary"
          >
            {locale === 'hi' ? 'नई पूछताछ दर्ज करें' : 'Submit New Inquiry'}
          </button>
        )}
        
        {onTrackStatus && referenceNumber && (
          <button
            onClick={onTrackStatus}
            className="btn-outline"
          >
            {locale === 'hi' ? 'स्थिति ट्रैक करें' : 'Track Status'}
          </button>
        )}
      </div>

      {/* Support Contact */}
      {supportContact && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.947.684L14 10a1 1 0 01.947.684 1.684V13a1 1 0 01.947.684 1.684H21a2 2 0 012-2v-8a2 2 0 00-2-2H3a2 2 0 00-2 2z" />
            </svg>
            {locale === 'hi' ? 'सहायता जानकारी' : 'Need Help?'}
          </h3>
          <p className="text-gray-600 mb-4">
            {locale === 'hi' 
              ? 'यदि आपके कोई और प्रश्न हैं या आपकी पूछताछ का स्थिति जानना चाहते हैं, तो हमारे सहायता टीम से संपर्क करें।'
              : 'If you have any questions or need to check the status of your inquiry, please contact our support team.'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportContact.phone && (
              <div className="text-center">
                <div className={`${styles.iconBg} rounded-full p-3 mx-auto mb-2 inline-block`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.947.684L14 10a1 1 0 01.947.684 1.684V13a1 1 0 01.947.684 1.684H21a2 2 0 012-2v-8a2 2 0 00-2-2H3a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <p className="font-medium text-gray-900">
                  {locale === 'hi' ? 'फोन' : 'Phone'}
                </p>
                <p className="text-sm text-gray-600">
                  {supportContact.phone}
                </p>
              </div>
            )}
            
            {supportContact.email && (
              <div className="text-center">
                <div className={`${styles.iconBg} rounded-full p-3 mx-auto mb-2 inline-block`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0.32l3.95 2.58a2 2 0 012.22 1.68V13a2 2 0 01-2.22 1.68L3 16a2 2 0 01-2.22-1.68V10a2 2 0 00-2.22-1.68z" />
                  </svg>
                </div>
                <p className="font-medium text-gray-900">
                  {locale === 'hi' ? 'ईमेल' : 'Email'}
                </p>
                <p className="text-sm text-gray-600">
                  {supportContact.email}
                </p>
              </div>
            )}
            
            {supportContact.website && (
              <div className="text-center">
                <div className={`${styles.iconBg} rounded-full p-3 mx-auto mb-2 inline-block`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0c-1.657 0-3.346-.694-4.828-1.928l1.414-1.414A8.964 8.964 0 0012.828 1.928 3.346 4.828 4.828 1.928 1.414 4.828 3.346 4.828 1.928 1.414L12.828 3.346C11.346 2.828 10.828 1.928 10.828 1.414l-1.414 1.414A8.964 8.964 0 004.828 3.346 3.346 4.828 1.928L4.828 12.828C5.346 12.828 6.828 13.172 4.828 13.172 4.828 12.828 6.828 13.172 4.828 12.828z" />
                  </svg>
                </div>
                <p className="font-medium text-gray-900">
                  {locale === 'hi' ? 'वेबसाइट' : 'Website'}
                </p>
                <p className="text-sm text-gray-600">
                  {supportContact.website}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Information */}
      {type === 'success' && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              {locale === 'hi' ? 'महत्वपूर्ण जानकारी' : 'Important Information'}
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {locale === 'hi' 
                    ? 'आपको अपनी संदेश में एक पुष्टि प्राप्त होगी जिसमें आपका संदर्भ संख्या और विवरण जानकारी होगी।'
                    : 'You will receive a confirmation email with your reference number and details.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {locale === 'hi' 
                    ? 'कृपया जल्द ही आपसे संपर्क करेंगे।'
                    : 'Please save your reference number for future correspondence.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {locale === 'hi' 
                    ? 'यदि अनुमानित समय के भीतर में प्रतिक्रिय नहीं मिलती है, तो कृपया संपर्क करें।'
                    : 'If you don\'t receive a response within the estimated time, please contact us.'
                  }
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormConfirmation;
