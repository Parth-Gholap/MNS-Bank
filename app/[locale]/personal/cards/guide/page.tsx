'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface CardsGuidePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function CardsGuidePage({ params }: CardsGuidePageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {localeTyped === 'hi' ? 'कार्ड गाइड' : 'Cards Guide'}
          </h1>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold mb-2">
                {localeTyped === 'hi' ? 'डेबिट कार्ड' : 'Debit Cards'}
              </h2>
              <p className="text-gray-700 mb-4">
                {localeTyped === 'hi' 
                  ? 'आपके खाते से सीधे जुड़ा कार्ड'
                  : 'Card directly linked to your account'}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>{localeTyped === 'hi' ? 'दुनिया भर में स्वीकार किया गया' : 'Accepted worldwide'}</li>
                <li>{localeTyped === 'hi' ? 'नकद निकासी सुविधा' : 'Cash withdrawal facility'}</li>
                <li>{localeTyped === 'hi' ? 'ऑनलाइन खरीदारी' : 'Online shopping'}</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h2 className="text-xl font-semibold mb-2">
                {localeTyped === 'hi' ? 'क्रेडिट कार्ड' : 'Credit Cards'}
              </h2>
              <p className="text-gray-700 mb-4">
                {localeTyped === 'hi' 
                  ? 'खरीदारी के लिए क्रेडिट सुविधा'
                  : 'Credit facility for purchases'}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>{localeTyped === 'hi' ? 'बिल भुगतान की सुविधा' : 'Bill payment facility'}</li>
                <li>{localeTyped === 'hi' ? 'रिवार्ड पॉइंट्स' : 'Reward points'}</li>
                <li>{localeTyped === 'hi' ? 'EMI विकल्प' : 'EMI options'}</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h2 className="text-xl font-semibold mb-2">
                {localeTyped === 'hi' ? 'कार्ड सुरक्षा' : 'Card Security'}
              </h2>
              <p className="text-gray-700 mb-4">
                {localeTyped === 'hi' 
                  ? 'अपने कार्ड को सुरक्षित रखें'
                  : 'Keep your cards secure'}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>{localeTyped === 'hi' ? 'PIN को गुप्त रखें' : 'Keep your PIN secret'}</li>
                <li>{localeTyped === 'hi' ? 'लेनदेन की निगरानी करें' : 'Monitor transactions'}</li>
                <li>{localeTyped === 'hi' ? 'खो गए कार्ड की रिपोर्ट करें' : 'Report lost cards immediately'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
