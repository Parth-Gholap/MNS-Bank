'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface PersonalDepositsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function PersonalDepositsPage({ params }: PersonalDepositsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'जमा योजनाएं' : 'Deposit Schemes'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'बेहतर रिटर्न के साथ सुरक्षित निवेश विकल्प'
              : 'Secure investment options with better returns'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Fixed Deposit */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'सावधि जमा' : 'Fixed Deposit'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? '6% - 8% वार्षिक ब्याज दर' : '6% - 8% annual interest rate'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'न्यूनतम 6 महीने' : 'Minimum 6 months'}</li>
              <li>• {locale === 'hi' ? 'अधिकतम 10 वर्ष' : 'Maximum 10 years'}</li>
              <li>• {locale === 'hi' ? 'क्वार्टरली ब्याज भुगतान' : 'Quarterly interest payment'}</li>
            </ul>
            <button 
              onClick={() => router.push(`/${locale}/apply/account/application?type=fixed-deposit`)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
            </button>
          </div>

          {/* Recurring Deposit */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'आवर्तित जमा' : 'Recurring Deposit'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? '6.5% - 8.5% वार्षिक ब्याज दर' : '6.5% - 8.5% annual interest rate'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'न्यूनतम ₹500 प्रति महीना' : 'Minimum ₹500 per month'}</li>
              <li>• {locale === 'hi' ? '12 महीने से 10 वर्ष' : '12 months to 10 years'}</li>
              <li>• {locale === 'hi' ? 'मासिक जमा सुविधा' : 'Monthly deposit facility'}</li>
            </ul>
            <button 
              onClick={() => router.push(`/${locale}/apply/account/application?type=recurring-deposit`)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {locale === 'hi' ? 'अभी शुरू करें' : 'Start Now'}
            </button>
          </div>

          {/* Double Deposit */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'डबल जमा योजना' : 'Double Deposit Scheme'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? '7% - 9% वार्षिक ब्याज दर' : '7% - 9% annual interest rate'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '84 महीने में दोगुना' : 'Doubles in 84 months'}</li>
              <li>• {locale === 'hi' ? 'न्यूनतम ₹10,000' : 'Minimum ₹10,000'}</li>
              <li>• {locale === 'hi' ? 'लचीला जमा विकल्प' : 'Flexible deposit options'}</li>
            </ul>
            <button 
              onClick={() => router.push(`/${locale}/apply/account/application?type=double-deposit`)}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {locale === 'hi' ? 'अभी निवेश करें' : 'Invest Now'}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'सभी जमा योजनाओं की विशेषताएं' : 'Features Available on All Deposit Schemes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'बेहतर ब्याज दरें' : 'Better Interest Rates'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'बाजार से ऊपर रिटर्न' : 'Above market returns'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'सुरक्षित निवेश' : 'Secure Investment'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? '100% सुरक्षित' : '100% Secure'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'लचीली अवधि' : 'Flexible Tenure'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? '6 महीने से 10 वर्ष' : '6 months to 10 years'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7l7 2 17 17l5 5-11h11l11-9 9-9l-3 10.5 2.5L21 8l-12 2.5L4 7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'नलाइन प्रबंधन' : 'Online Management'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'इंटरनेट बैंकिंग' : 'Internet Banking'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
