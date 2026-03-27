import React from 'react';
import { Metadata } from 'next';

interface InternetBankingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: InternetBankingPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'इंटरनेट बैंकिंग - महानगर नागरिक सहकारी बैंक'
      : 'Internet Banking - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'ऑनलाइन बैंकिंग सेवाएं'
      : 'Secure online banking services',
  };
}

export default async function InternetBankingPage({ params }: InternetBankingPageProps) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'इंटरनेट बैंकिंग' : 'Internet Banking'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'किसी भी समय, कहीं भी जगह सुरक्षित बैंकिंग'
              : 'Secure banking anytime, anywhere'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'hi' ? 'लॉगिन करें' : 'Login'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'उपयोगकर्ता आईडी' : 'User ID'}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                  placeholder={locale === 'hi' ? 'अपना उपयोगकर्ता आईडी दर्ज करें' : 'Enter your user ID'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'पासवर्ड' : 'Password'}
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                  placeholder={locale === 'hi' ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-bank-blue-600 focus:ring-bank-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  {locale === 'hi' ? 'मुझे रखें' : 'Remember me'}
                </label>
              </div>
              <button className="w-full bg-bank-blue-600 text-white py-2 px-4 rounded-lg hover:bg-bank-blue-700 transition-colors">
                {locale === 'hi' ? 'लॉगिन करें' : 'Login'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'hi' ? 'पंजीकरण' : 'Registration'}
            </h2>
            <p className="text-gray-600 mb-6">
              {locale === 'hi'
                ? 'इंटरनेट बैंकिंग के लिए पंजीकरण करें'
                : 'New to internet banking? Register now'}
            </p>
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
              {locale === 'hi' ? 'अभी पंजीकरण करें' : 'Register Now'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'इंटरनेट बैंकिंग विशेषताएं' : 'Internet Banking Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707L19.586 6.414A1 1 0 0119 7.121V16a1 1 0 01-1 1h-3z" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'खाता सारांश' : 'Account Summary'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi'
                    ? 'अपने सभी खातों का विवरण देखें'
                    : 'View all your accounts in one place'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2zm-2-6a2 2 0 00-2-2H5a2 2 0 00-2 2v2" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? '�न ट्रांसफर' : 'Fund Transfer'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi'
                    ? 'तत्काल पैसा ट्रांसफर'
                    : 'Instant money transfers'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-purple-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'बिल भुगतान' : 'Bill Payments'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi'
                    ? 'ऑनलाइन बिल भुगतान करें'
                    : 'Pay bills online'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
