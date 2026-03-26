import React from 'react';
import { Metadata } from 'next';

interface PersonalPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PersonalPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'व्यक्तिगत बैंकिंग - महानगर नागरिक सहकारी बैंक'
      : 'Personal Banking - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'व्यक्तिगत बैंकिंग सेवाएं - बचत खाते, ऋण, जमा'
      : 'Personal Banking Services - Savings Accounts, Loans, Deposits',
  };
}

export default async function PersonalPage({ params }: PersonalPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'व्यक्तिगत बैंकिंग' : 'Personal Banking'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपकी सभी वित्तीय जरूरतों के लिए व्यापक समाधान'
              : 'Comprehensive solutions for all your financial needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Savings Account */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'बचत खाते' : 'Savings Accounts'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'आकर्षक ब्याज दरों के साथ सुरक्षित बचत' : 'Secure savings with attractive interest rates'}
            </p>
            <a 
              href={`/${locale}/personal/savings-account`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Personal Loans */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'व्यक्तिगत ऋण' : 'Personal Loans'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'आपकी सभी जरूरतों के लिए त्वरित ऋण' : 'Quick loans for all your needs'}
            </p>
            <a 
              href={`/${locale}/personal/loans/personal-loan`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Deposits */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'जमा योजनाएं' : 'Deposit Schemes'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'बेहतर रिटर्न के साथ सुरक्षित निवेश' : 'Secure investments with better returns'}
            </p>
            <a 
              href={`/${locale}/personal/deposits`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Digital Banking */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'किसी भी समय, कहीं भी बैंकिंग' : 'Bank anytime, anywhere'}
            </p>
            <a 
              href={`/${locale}/digital-banking`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Cards */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'डेबिट/क्रेडिट कार्ड' : 'Debit/Credit Cards'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'दुनिया भर में स्वीकृत कार्ड' : 'Cards accepted worldwide'}
            </p>
            <a 
              href={`/${locale}/personal/cards`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Insurance */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'बीमा समाधान' : 'Insurance Solutions'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'आपके और आपके परिवार की सुरक्षा' : 'Protect you and your family'}
            </p>
            <a 
              href={`/${locale}/personal/insurance`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
