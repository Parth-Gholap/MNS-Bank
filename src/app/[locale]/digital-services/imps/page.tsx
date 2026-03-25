'use client';

import React, { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface IMPSServicesProps {
  locale: 'en' | 'hi';
}

const IMPSServices: React.FC<IMPSServicesProps> = ({ locale }) => {
  useEffect(() => {
    trackPageView('IMPS Services', locale === 'hi' ? 'आईएमपीएस सेवाएं' : 'IMPS Services');
  }, [locale]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'hi' ? 'आईएमपीएस सेवाएं' : 'IMPS Services'}
          </h1>
          <p className="text-xl max-w-3xl">
            {locale === 'hi' 
              ? '24/7 तत्काल पैसा ट्रांसफर सेवा'
              : '24/7 Immediate Payment Service'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'आईएमपीएस सेवाएं' : 'IMPS Services'}
          </h2>
          <p className="text-gray-600">
            {locale === 'hi' 
              ? 'किसी भी समय, किसी भी दिन तत्काल धन हस्तांतरण'
              : 'Instant fund transfers anytime, any day'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default IMPSServices;
