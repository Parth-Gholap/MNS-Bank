import React from 'react';
import { Metadata } from 'next';

interface BusinessLoansPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BusinessLoansPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'व्यवसाय ऋण - महानगर नागरिक सहकारी बैंक'
      : 'Business Loans - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'व्यवसाय ऋण, कार्यशील पूंजी, मशीनरी ऋण'
      : 'Business Loans, Working Capital, Machinery Loans',
  };
}

export default async function BusinessLoansPage({ params }: BusinessLoansPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'व्यवसाय ऋण' : 'Business Loans'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपके व्यवसाय विस्तार के लिए वित्तपोषण'
              : 'Financing for your business expansion'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Working Capital Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'कार्यशील पूंजी ऋण' : 'Working Capital Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'दैनिक संचालन के लिए वित्त' : 'Finance for daily operations'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '9% - 12% ब्याज दर' : '9% - 12% interest rate'}</li>
              <li>• {locale === 'hi' ? '₹1 लाख - ₹5 करोड़' : '₹1 Lakh - ₹5 Crores'}</li>
              <li>• {locale === 'hi' ? '1 वर्ष से 5 वर्ष' : '1 year to 5 years'}</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* Term Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'अवधि ऋण' : 'Term Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'लंबी अवधि विस्तार के लिए' : 'For long-term expansion'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '8.5% - 11% ब्याज दर' : '8.5% - 11% interest rate'}</li>
              <li>• {locale === 'hi' ? '₹5 लाख - ₹20 करोड़' : '₹5 Lakhs - ₹20 Crores'}</li>
              <li>• {locale === 'hi' ? '5 वर्ष से 15 वर्ष' : '5 years to 15 years'}</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* Machinery Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'मशीनरी ऋण' : 'Machinery Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'उपकरण और मशीनरी खरीद' : 'Equipment and machinery purchase'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '8% - 10.5% ब्याज दर' : '8% - 10.5% interest rate'}</li>
              <li>• {locale === 'hi' ? '₹2 लाख - ₹10 करोड़' : '₹2 Lakhs - ₹10 Crores'}</li>
              <li>• {locale === 'hi' ? '3 वर्ष से 10 वर्ष' : '3 years to 10 years'}</li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* Property Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'संपत्ति ऋण' : 'Property Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'वाणिज्यिक संपत्ति के खिलाफ ऋण' : 'Loan against commercial property'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '9% - 12% ब्याज दर' : '9% - 12% interest rate'}</li>
              <li>• {locale === 'hi' ? '₹10 लाख - ₹15 करोड़' : '₹10 Lakhs - ₹15 Crores'}</li>
              <li>• {locale === 'hi' ? '5 वर्ष से 20 वर्ष' : '5 years to 20 years'}</li>
            </ul>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* Vehicle Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'वाहन ऋण' : 'Vehicle Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'वाणिज्यिक वाहन खरीद' : 'Commercial vehicle purchase'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '9.5% - 13% ब्याज दर' : '9.5% - 13% interest rate'}</li>
              <li>• {locale === 'hi' ? '₹2 लाख - ₹50 लाख' : '₹2 Lakhs - ₹50 Lakhs'}</li>
              <li>• {locale === 'hi' ? '3 वर्ष से 7 वर्ष' : '3 years to 7 years'}</li>
            </ul>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* MSME Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'एमएसएमई ऋण' : 'MSME Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'छोटे व्यवसायों के लिए विशेष' : 'Special for small businesses'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '7% - 9% ब्याज दर' : '7% - 9% interest rate'}</li>
              <li>• {locale === 'hi' ? '₹50,000 - ₹2 करोड़' : '₹50,000 - ₹2 Crores'}</li>
              <li>• {locale === 'hi' ? '1 वर्ष से 7 वर्ष' : '1 year to 7 years'}</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
