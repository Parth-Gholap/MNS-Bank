import React from 'react';
import { Metadata } from 'next';

interface PersonalCardsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PersonalCardsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'कार्ड सेवाएं - महानगर नागरिक सहकारी बैंक'
      : 'Card Services - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'डेबिट कार्ड, क्रेडिट कार्ड, एटीएम कार्ड'
      : 'Debit Cards, Credit Cards, ATM Cards',
  };
}

export default async function PersonalCardsPage({ params }: PersonalCardsPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'कार्ड सेवाएं' : 'Card Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपके जीवन को आसान बनाने के लिए स्मार्ट कार्ड समाधान'
              : 'Smart card solutions to make your life easier'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Debit Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'डेबिट कार्ड' : 'Debit Card'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'अपने खाते से सीधे भुगतान' : 'Direct payments from your account'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'दुनिया भर में स्वीकृत' : 'Accepted worldwide'}</li>
              <li>• {locale === 'hi' ? '24/7 एटीएम पहुंच' : '24/7 ATM access'}</li>
              <li>• {locale === 'hi' ? 'शून्य वार्षिक शुल्क' : 'Zero annual fee'}</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* Credit Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'क्रेडिट कार्ड' : 'Credit Card'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'खरीदारी पर बेहतर लचीलापन' : 'Better flexibility on purchases'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '40 दिन ब्याज-मुक्त अवधि' : '40 days interest-free period'}</li>
              <li>• {locale === 'hi' ? 'रिवार्ड पॉइंट्स' : 'Reward points'}</li>
              <li>• {locale === 'hi' ? 'ईएमआई विकल्प' : 'EMI options'}</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* ATM Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'एटीएम कार्ड' : 'ATM Card'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'नकद निकासी के लिए सुविधाजनक' : 'Convenient for cash withdrawals'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '100+ एटीएम नेटवर्क' : '100+ ATM network'}</li>
              <li>• {locale === 'hi' ? '24/7 नकद पहुंच' : '24/7 cash access'}</li>
              <li>• {locale === 'hi' ? 'कोई छिपा हुआ शुल्क नहीं' : 'No hidden charges'}</li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              {locale === 'hi' ? 'अभी प्राप्त करें' : 'Get Now'}
            </button>
          </div>
        </div>

        {/* Card Features */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'सभी कार्ड की विशेषताएं' : 'Features Available on All Cards'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'चिप सुरक्षा' : 'Chip Security'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'ईएमवी चिप सुरक्षित' : 'EMV chip secured'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'ॉक और अनलॉक' : 'Lock & Unlock'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'मोबाइल ऐप नियंत्रण' : 'Mobile app control'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7l7 2 17 17l5 5-11h11l11-9 9-9l-3 10.5 2.5L21 8l-12 2.5L4 7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'तत्काल अलर्ट' : 'Instant Alerts'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'लेनदेन सूचनाएं' : 'Transaction notifications'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'बिल भुगतान' : 'Bill Payments'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'आसान बिल भुगतान' : 'Easy bill payments'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
