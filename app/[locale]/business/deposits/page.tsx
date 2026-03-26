import React from 'react';
import { Metadata } from 'next';

interface BusinessDepositsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BusinessDepositsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'व्यवसाय जमा - महानगर नागरिक सहकारी बैंक'
      : 'Business Deposits - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'व्यवसाय सावधि जमा, करेंट जमा, व्यापार जमा योजनाएं'
      : 'Business Fixed Deposits, Current Deposits, Commercial Deposit Schemes',
  };
}

export default async function BusinessDepositsPage({ params }: BusinessDepositsPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'व्यवसाय जमा' : 'Business Deposits'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपके व्यवसाय कोष के लिए बेहतर रिटर्न'
              : 'Better returns for your business funds'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Business Fixed Deposit */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'व्यवसाय सावधि जमा' : 'Business Fixed Deposit'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? '6.5% - 8.5% वार्षिक ब्याज' : '6.5% - 8.5% annual interest'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '7 दिन से 10 वर्ष' : '7 days to 10 years'}</li>
              <li>• {locale === 'hi' ? 'न्यूनतम ₹10,000' : 'Minimum ₹10,000'}</li>
              <li>• {locale === 'hi' ? 'क्वार्टरली ब्याज भुगतान' : 'Quarterly interest payment'}</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
            </button>
          </div>

          {/* Current Deposit */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'करेंट जमा' : 'Current Deposit'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'दैनिक लेनदेन के लिए' : 'For daily transactions'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'असीमित लेनदेन' : 'Unlimited transactions'}</li>
              <li>• {locale === 'hi' ? 'ओवरड्राफ्ट सुविधा' : 'Overdraft facility'}</li>
              <li>• {locale === 'hi' ? 'न्यूनतम शेष छूट' : 'Minimum balance waiver'}</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
            </button>
          </div>

          {/* Call Deposit */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'कॉल जमा' : 'Call Deposit'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'ब्याज और तरलता दोनों' : 'Interest and liquidity both'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '4% - 5% वार्षिक ब्याज' : '4% - 5% annual interest'}</li>
              <li>• {locale === 'hi' ? '24 घंटे निकासी' : '24-hour withdrawal'}</li>
              <li>• {locale === 'hi' ? 'न्यूनतम ₹25,000' : 'Minimum ₹25,000'}</li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'व्यवसाय जमा की विशेषताएं' : 'Business Deposit Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'उच्च ब्याज दरें' : 'High Interest Rates'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'बाजार से बेहतर रिटर्न' : 'Better than market returns'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'सुरक्षित' : 'Secure'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'आरबीआई विनियमित' : 'RBI regulated'}
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
                {locale === 'hi' ? '7 दिन से 10 वर्ष' : '7 days to 10 years'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7l7 2 17 17l5 5-11h11l11-9 9-9l-3 10.5 2.5L21 8l-12 2.5L4 7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'ऑनलाइन प्रबंधन' : 'Online Management'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'इंटरनेट बैंकिंग' : 'Internet banking'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
