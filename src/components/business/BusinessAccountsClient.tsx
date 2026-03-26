'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface BusinessAccountsClientProps {
  locale: 'en' | 'hi';
}

export default function BusinessAccountsClient({ locale }: BusinessAccountsClientProps) {
  const router = useRouter();

  const handleOpenAccount = (accountType: string) => {
    router.push(`/${locale}/apply/account/application?type=${accountType}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'व्यवसाय खाते' : 'Business Accounts'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपके व्यवसाय के लिए सही बैंकिंग समाधान'
              : 'The right banking solutions for your business'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Business Current Account */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">💼</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {locale === 'hi' ? 'व्यवसाय करेंट खाता' : 'Business Current Account'}
            </h3>
            <p className="text-gray-600 mb-6">
              {locale === 'hi' 
                ? 'आपके व्यवसाय लेनदेन के लिए डिज़ाइन किया गया'
                : 'Designed for your business transactions'}
            </p>
            <ul className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'असीमित लेनदेन' : 'Unlimited transactions'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'ओवरड्राफ्ट सुविधा' : 'Overdraft facility'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'डिजिटल बैंकिंग सुविधाएं' : 'Digital banking facilities'}
                </span>
              </div>
            </ul>

            <button 
              onClick={() => handleOpenAccount('business')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
            </button>
          </div>

          {/* Overdraft Facility */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">💸</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {locale === 'hi' ? 'ओवरड्राफ्ट सुविधा' : 'Overdraft Facility'}
            </h3>
            <p className="text-gray-600 mb-6">
              {locale === 'hi' 
                ? 'नकदी प्रवाह प्रबंधन के लिए लचीला ऋण'
                : 'Flexible credit for cash flow management'}
            </p>
            <ul className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'तुरंत ऋण' : 'Instant credit'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'केवल ब्याज भुगतान' : 'Interest-only payments'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'नवीनीकरण योग्य' : 'Renewable facility'}
                </span>
              </div>
            </ul>

            <button 
              onClick={() => handleOpenAccount('overdraft')}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {locale === 'hi' ? 'अभी खोलें' : 'Apply Now'}
            </button>
          </div>

          {/* Trade Finance */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🌍</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {locale === 'hi' ? 'व्यापार वित्त' : 'Trade Finance'}
            </h3>
            <p className="text-gray-600 mb-6">
              {locale === 'hi' 
                ? 'अंतर्राष्ट्रीय व्यापार के लिए वित्तीय समाधान'
                : 'Financial solutions for international trade'}
            </p>
            <ul className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'पत्र ऋण' : 'Letter of credit'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'बैंक गारंटी' : 'Bank guarantees'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'विदेशी मुद्रा सेवाएं' : 'Forex services'}
                </span>
              </div>
            </ul>

            <button 
              onClick={() => handleOpenAccount('trade')}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {locale === 'hi' ? 'अभी खोलें' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
