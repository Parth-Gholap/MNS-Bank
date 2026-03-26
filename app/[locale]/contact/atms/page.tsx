'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface ATMsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ATMsPage({ params }: ATMsPageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  const atms = [
    { id: 1, name: 'Main Branch ATM', address: '123 Main Street, Bhopal', status: '24/7' },
    { id: 2, name: 'City Center ATM', address: '456 Mall Road, Bhopal', status: '24/7' },
    { id: 3, name: 'Airport ATM', address: 'Raja Bhoj Airport, Bhopal', status: '24/7' },
    { id: 4, name: 'Railway Station ATM', address: 'Bhopal Railway Station', status: '6AM-10PM' },
    { id: 5, name: 'University ATM', address: 'Barkatullah University', status: '24/7' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {localeTyped === 'hi' ? 'एटीएम ढूंढें' : 'Find ATMs'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {localeTyped === 'hi' 
              ? 'अपने नजदीकी एटीएम ढूंढें और उनके खुलने के समय जानें'
              : 'Find nearby ATMs and know their operating hours'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {atms.map((atm) => (
            <div key={atm.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">🏧</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{atm.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    atm.status === '24/7' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {atm.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{atm.address}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                  {localeTyped === 'hi' ? 'निर्देश' : 'Directions'}
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
                  {localeTyped === 'hi' ? 'विवरण' : 'Details'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {localeTyped === 'hi' ? 'एटीएम सेवाएं' : 'ATM Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <span className="text-3xl mb-2 block">💰</span>
              <h3 className="font-semibold">{localeTyped === 'hi' ? 'नकद निकासी' : 'Cash Withdrawal'}</h3>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">📊</span>
              <h3 className="font-semibold">{localeTyped === 'hi' ? 'बैलेंस जांच' : 'Balance Inquiry'}</h3>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">📱</span>
              <h3 className="font-semibold">{localeTyped === 'hi' ? 'मोबाइल रिचार्ज' : 'Mobile Recharge'}</h3>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">💳</span>
              <h3 className="font-semibold">{localeTyped === 'hi' ? 'कार्ड रिचार्ज' : 'Card Reload'}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
