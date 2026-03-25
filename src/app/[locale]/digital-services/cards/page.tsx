'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface CardsServicesProps {
  locale: 'en' | 'hi';
}

const CardsServices: React.FC<CardsServicesProps> = ({ locale }) => {
  useEffect(() => {
    trackPageView('Cards Services', locale === 'hi' ? 'कार्ड सेवाएं' : 'Cards Services');
  }, [locale]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'hi' ? 'कार्ड सेवाएं' : 'Cards Services'}
          </h1>
          <p className="text-xl max-w-3xl">
            {locale === 'hi' 
              ? 'क्रेडिट और डेबिट कार्ड सेवाएं और प्रबंधन'
              : 'Credit and debit card services and management'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'कार्ड सेवाएं' : 'Card Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'क्रेडिट कार्ड' : 'Credit Cards'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {locale === 'hi' 
                  ? 'विभिन्न क्रेडिट कार्ड विकल्प और लाभ'
                  : 'Various credit card options and benefits'
                }
              </p>
              <a href="/digital-services/cards/credit" className="btn-primary text-sm">
                {locale === 'hi' ? 'और जानें' : 'Learn More'}
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'डेबिट कार्ड' : 'Debit Cards'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {locale === 'hi' 
                  ? 'डेबिट कार्ड सेवाएं और सुविधाएं'
                  : 'Debit card services and features'
                }
              </p>
              <a href="/digital-services/cards/debit" className="btn-primary text-sm">
                {locale === 'hi' ? 'और जानें' : 'Learn More'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsServices;
