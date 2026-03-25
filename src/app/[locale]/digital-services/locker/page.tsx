'use client';

import React, { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface LockerServicesProps {
  locale: 'en' | 'hi';
}

const LockerServices: React.FC<LockerServicesProps> = ({ locale }) => {
  useEffect(() => {
    trackPageView('Locker Services', locale === 'hi' ? 'लॉकर सेवाएं' : 'Locker Services');
  }, [locale]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'hi' ? 'लॉकर सेवाएं' : 'Locker Services'}
          </h1>
          <p className="text-xl max-w-3xl">
            {locale === 'hi' 
              ? 'सुरक्षित जमा लॉकर सेवाएं'
              : 'Safe deposit locker services'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'लॉकर सेवाएं' : 'Locker Services'}
          </h2>
          <p className="text-gray-600">
            {locale === 'hi' 
              ? 'अपने मूल्यवान सामानों के लिए सुरक्षित लॉकर'
              : 'Secure lockers for your valuables'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default LockerServices;
