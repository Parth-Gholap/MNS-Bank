import React from 'react';
import { Metadata } from 'next';

interface MobileBankingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: MobileBankingPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'मोबाइल बैंकिंग - महानगर नागरिक सहकारी बैंक'
      : 'Mobile Banking - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'हमारा मोबाइल बैंकिंग ऐप डाउनलोड करें'
      : 'Download our mobile banking app',
  };
}

export default async function MobileBankingPage({ params }: MobileBankingPageProps) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'मोबाइल बैंकिंग' : 'Mobile Banking'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'अपने खाते अपने फोन पर प्रबंधित करें'
              : 'Manage your accounts on your mobile device'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'एंड्रॉइड उपयोग' : 'Android App'}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {locale === 'hi' ? 'डाउनलोड' : 'Download'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {locale === 'hi' ? 'गूगल प्ले स्टोर' : 'Google Play Store'}
                  </p>
                </div>
                <button className="bg-bank-blue-600 text-white px-6 py-2 rounded-lg hover:bg-bank-blue-700 transition-colors">
                  {locale === 'hi' ? 'डाउनलोड करें' : 'Download'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'आईफोन ऐप' : 'iPhone App'}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {locale === 'hi' ? 'डाउनलोड' : 'Download'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {locale === 'hi' ? 'ऐप स्टोर' : 'App Store'}
                  </p>
                </div>
                <button className="bg-bank-blue-600 text-white px-6 py-2 rounded-lg hover:bg-bank-blue-700 transition-colors">
                  {locale === 'hi' ? 'डाउनलोड करें' : 'Download'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'ऐप की विशेषताएं' : 'App Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'खाता प्रबंधन' : 'Account Management'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi'
                    ? 'अपने खाते देखें और प्रबंधित करें'
                    : 'View and manage your accounts'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2zm-2-6a2 2 0 00-2-2H5a2 2 0 00-2 2v2" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? '�न ट्रांसफर' : 'Money Transfer'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi'
                    ? 'तत्काल पैसा ट्रांसफर करें'
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
                    ? 'अपने बिल आसान से भुगतान करें'
                    : 'Pay bills directly from app'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
