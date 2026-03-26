import React from 'react';
import { Metadata } from 'next';
import RateComparison from '@/components/rates/RateComparison';

interface RatesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: RatesPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'ब्याज दरें - महानगर नागरिक सहकारी बैंक'
      : 'Interest Rates - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'ऋण ब्याज दरें, जमा ब्याज दरें, एमएसएमई दरें'
      : 'Loan Interest Rates, Deposit Interest Rates, MSME Rates',
  };
}

export default async function RatesPage({ params }: RatesPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'ब्याज दरें' : 'Interest Rates'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'हमारी प्रतिस्पर्धी ब्याज दरें देखें'
              : 'View our competitive interest rates'}
          </p>
        </div>

        {/* Rate Comparison Component */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <RateComparison locale={localeTyped} />
        </div>

        {/* Rate Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Loan Rates */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'ऋण दरें' : 'Loan Rates'}
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• {locale === 'hi' ? 'होम लोन: 8.5% - 10.5%' : 'Home Loan: 8.5% - 10.5%'}</li>
              <li>• {locale === 'hi' ? 'पर्सनल लोन: 10.5% - 14%' : 'Personal Loan: 10.5% - 14%'}</li>
              <li>• {locale === 'hi' ? 'कार लोन: 9% - 12%' : 'Car Loan: 9% - 12%'}</li>
              <li>• {locale === 'hi' ? 'बिजनेस लोन: 8.5% - 11%' : 'Business Loan: 8.5% - 11%'}</li>
            </ul>
          </div>

          {/* Deposit Rates */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'जमा दरें' : 'Deposit Rates'}
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• {locale === 'hi' ? 'बचत खाता: 3.5% - 4%' : 'Savings Account: 3.5% - 4%'}</li>
              <li>• {locale === 'hi' ? 'सावधि जमा: 6% - 8%' : 'Fixed Deposit: 6% - 8%'}</li>
              <li>• {locale === 'hi' ? 'आवर्तित जमा: 6.5% - 8.5%' : 'Recurring Deposit: 6.5% - 8.5%'}</li>
              <li>• {locale === 'hi' ? 'वरिष्ठ नागरिक: 4.5% - 5%' : 'Senior Citizen: 4.5% - 5%'}</li>
            </ul>
          </div>

          {/* Special Rates */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'विशेष दरें' : 'Special Rates'}
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• {locale === 'hi' ? 'एमएसएमई ऋण: 7% - 9%' : 'MSME Loan: 7% - 9%'}</li>
              <li>• {locale === 'hi' ? 'कृषक ऋण: 6% - 8%' : 'Farmer Loan: 6% - 8%'}</li>
              <li>• {locale === 'hi' ? 'शिक्षा ऋण: 8% - 10%' : 'Education Loan: 8% - 10%'}</li>
              <li>• {locale === 'hi' ? 'आवास ऋण: 6.5% - 8.5%' : 'Housing Loan: 6.5% - 8.5%'}</li>
            </ul>
          </div>
        </div>

        {/* Rate Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'ब्याज दर की जानकारी' : 'Interest Rate Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'दरें कैसे निर्धारित की जाती हैं?' : 'How Rates are Determined?'}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• {locale === 'hi' ? 'आरबीआई नीति दरें' : 'RBI policy rates'}</li>
                <li>• {locale === 'hi' ? 'बाजार स्थितियां' : 'Market conditions'}</li>
                <li>• {locale === 'hi' ? 'ऋण राशि और अवधि' : 'Loan amount and tenure'}</li>
                <li>• {locale === 'hi' ? 'उधारक की क्रेडिट रेटिंग' : 'Borrower credit rating'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'दरों में बदलाव' : 'Rate Changes'}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• {locale === 'hi' ? 'नियमित समीक्षा' : 'Regular review'}</li>
                <li>• {locale === 'hi' ? '्राहक सूचना' : 'Customer notification'}</li>
                <li>• {locale === 'hi' ? 'वेबसाइट पर अपडेट' : 'Website updates'}</li>
                <li>• {locale === 'hi' ? 'शाखा सूचना बोर्ड' : 'Branch notice boards'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
