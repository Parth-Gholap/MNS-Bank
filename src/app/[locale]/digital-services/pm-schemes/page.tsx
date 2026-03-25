'use client';

import React, { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface PMSchemesProps {
  locale: 'en' | 'hi';
}

const PMSchemes: React.FC<PMSchemesProps> = ({ locale }) => {
  useEffect(() => {
    trackPageView('PM Schemes', locale === 'hi' ? 'प्रधानमंत्री योजनाएं' : 'PM Schemes');
  }, [locale]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'hi' ? 'प्रधानमंत्री योजनाएं' : 'PM Schemes'}
          </h1>
          <p className="text-xl max-w-3xl">
            {locale === 'hi' 
              ? 'प्रधानमंत्री सरकार योजनाएं और वित्तीय समावेशन'
              : 'Pradhan Mantri government schemes and financial inclusion'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'प्रधानमंत्री योजनाएं' : 'PM Schemes'}
          </h2>
          <p className="text-gray-600">
            {locale === 'hi' 
              ? 'वित्तीय समावेशन और सामाजिक कल्याण योजनाएं'
              : 'Financial inclusion and social welfare schemes'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default PMSchemes;
