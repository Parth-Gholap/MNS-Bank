'use client';

import React, { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface NEFTRTGSServicesProps {
  locale: 'en' | 'hi';
}

const NEFTRTGSServices: React.FC<NEFTRTGSServicesProps> = ({ locale }) => {
  useEffect(() => {
    trackPageView('NEFT/RTGS Services', locale === 'hi' ? 'एनईएफटी/आरटीजीएस सेवाएं' : 'NEFT/RTGS Services');
  }, [locale]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'hi' ? 'एनईएफटी/आरटीजीएस सेवाएं' : 'NEFT/RTGS Services'}
          </h1>
          <p className="text-xl max-w-3xl">
            {locale === 'hi' 
              ? 'राष्ट्रीय इलेक्ट्रॉनिक फंड ट्रांसफर और रियल टाइम ग्रॉस सेटलमेंट'
              : 'National Electronic Fund Transfer and Real Time Gross Settlement'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'एनईएफटी/आरटीजीएस सेवाएं' : 'NEFT/RTGS Services'}
          </h2>
          <p className="text-gray-600">
            {locale === 'hi' 
              ? 'बड़ी राशि के धन हस्तांतरण के लिए सुरक्षित और तेज़ सेवाएं'
              : 'Secure and fast services for large amount transfers'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default NEFTRTGSServices;
