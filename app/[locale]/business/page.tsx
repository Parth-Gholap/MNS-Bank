import React from 'react';
import { Metadata } from 'next';

interface BusinessPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'व्यवसाय बैंकिंग - महानगर नागरिक सहकारी बैंक'
      : 'Business Banking - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'व्यवसाय बैंकिंग समाधान - करेंट खाते, व्यवसाय ऋण'
      : 'Business Banking Solutions - Current Accounts, Business Loans',
  };
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'व्यवसाय बैंकिंग' : 'Business Banking'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपके व्यवसाय की वृद्धि के लिए विशेष बैंकिंग समाधान'
              : 'Specialized banking solutions for your business growth'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Current Accounts */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'करेंट खाते' : 'Current Accounts'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'हर आकार के व्यवसाय के लिए खाते' : 'Accounts for businesses of all sizes'}
            </p>
            <a 
              href={`/${locale}/business/accounts`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Business Loans */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'व्यवसाय ऋण' : 'Business Loans'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'विस्तार और विकास के लिए वित्तपोषण' : 'Financing for expansion and growth'}
            </p>
            <a 
              href={`/${locale}/business/loans`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Business Deposits */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'व्यवसाय जमा' : 'Business Deposits'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'बेहतर रिटर्न के साथ जमा योजनाएं' : 'Deposit schemes with better returns'}
            </p>
            <a 
              href={`/${locale}/business/deposits`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Cash Management */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'नकदी प्रबंधन' : 'Cash Management'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'कुशल नकदी प्रवाह प्रबंधन' : 'Efficient cash flow management'}
            </p>
            <a 
              href={`/${locale}/business/cash-management`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Trade Finance */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'व्यापार वित्त' : 'Trade Finance'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'अंतर्राष्ट्रीय व्यापार के लिए समाधान' : 'Solutions for international trade'}
            </p>
            <a 
              href={`/${locale}/business/trade-finance`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'} →
            </a>
          </div>

          {/* Forex Services */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'विदेशी मुद्रा सेवाएं' : 'Forex Services'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'प्रतिस्पर्धी दरों पर मुद्रा विनिमय' : 'Currency exchange at competitive rates'}
            </p>
            <a 
              href={`/${locale}/business/forex`}
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
