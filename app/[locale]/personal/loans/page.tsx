import React from 'react';
import { Metadata } from 'next';

interface PersonalLoansPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PersonalLoansPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'व्यक्तिगत ऋण - महानगर नागरिक सहकारी बैंक'
      : 'Personal Loans - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'व्यक्तिगत ऋण, होम लोन, कार लोन, शिक्षा ऋण'
      : 'Personal Loans, Home Loans, Car Loans, Education Loans',
  };
}

export default async function PersonalLoansPage({ params }: PersonalLoansPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'व्यक्तिगत ऋण' : 'Personal Loans'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपकी सभी वित्तीय जरूरतों के लिए त्वरित ऋण'
              : 'Quick loans for all your financial needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Personal Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'व्यक्तिगत ऋण' : 'Personal Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'किसी भी उद्देश्य के लिए ऋण' : 'Loan for any purpose'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '10.5% - 14% ब्याज दर' : '10.5% - 14% interest rate'}</li>
              <li>• {locale === 'hi' ? '₹50,000 - ₹20 लाख' : '₹50,000 - ₹20 Lakhs'}</li>
              <li>• {locale === 'hi' ? '12 महीने से 5 वर्ष' : '12 months to 5 years'}</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* Home Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'होम लोन' : 'Home Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'अपना घर बनाएं' : 'Build your dream home'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '8.5% - 10.5% ब्याज दर' : '8.5% - 10.5% interest rate'}</li>
              <li>• {locale === 'hi' ? '₹5 लाख - ₹2 करोड़' : '₹5 Lakhs - ₹2 Crores'}</li>
              <li>• {locale === 'hi' ? '5 वर्ष से 30 वर्ष' : '5 years to 30 years'}</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* Car Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'कार लोन' : 'Car Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'अपनी कार खरीदें' : 'Buy your dream car'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '9% - 12% ब्याज दर' : '9% - 12% interest rate'}</li>
              <li>• {locale === 'hi' ? '₹1 लाख - ₹25 लाख' : '₹1 Lakh - ₹25 Lakhs'}</li>
              <li>• {locale === 'hi' ? '1 वर्ष से 7 वर्ष' : '1 year to 7 years'}</li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
