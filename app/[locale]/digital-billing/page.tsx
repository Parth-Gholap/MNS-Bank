'use client';

import React from 'react';
import { Metadata } from 'next';
import { useTranslation } from '@/lib/i18n';

interface DigitalBillingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function DigitalBillingPage({ params }: DigitalBillingPageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {localeTyped === 'hi' ? 'डिजिटल बिलिंग' : 'Digital Billing'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {localeTyped === 'hi' 
              ? 'आसान और सुरक्षित बिल भुगतान समाधान'
              : 'Easy and secure bill payment solutions'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {localeTyped === 'hi' ? 'मोबाइल रिचार्ज' : 'Mobile Recharge'}
            </h3>
            <p className="text-gray-600 mb-4">
              {localeTyped === 'hi' ? 'सभी प्रमुख मोबाइल ऑपरेटरों के लिए तत्काल रिचार्ज' : 'Instant recharge for all major mobile operators'}
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {localeTyped === 'hi' ? 'अभी रिचार्ज करें' : 'Recharge Now'}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {localeTyped === 'hi' ? 'िजली बिल' : 'Electricity Bill'}
            </h3>
            <p className="text-gray-600 mb-4">
              {localeTyped === 'hi' ? 'बिजली बिल ऑनलाइन भुगतान' : 'Pay electricity bills online'}
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              {localeTyped === 'hi' ? 'बिल भुगतान करें' : 'Pay Bill'}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📺</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {localeTyped === 'hi' ? 'डीटीएस/केबल' : 'DTH/Cable'}
            </h3>
            <p className="text-gray-600 mb-4">
              {localeTyped === 'hi' ? 'डीटीएच और केबल बिल भुगतान' : 'DTH and cable bill payments'}
            </p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              {localeTyped === 'hi' ? 'भुगतान करें' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
