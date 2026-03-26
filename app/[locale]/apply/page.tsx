import React from 'react';
import { Metadata } from 'next';

interface ApplyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ApplyPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'आवेदन करें - महानगर नागरिक सहकारी बैंक'
      : 'Apply - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'खाता खोलें, ऋण आवेदन करें, डिजिटल बैंकिंग शुरू करें'
      : 'Open Account, Apply for Loan, Start Digital Banking',
  };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'आवेदन करें' : 'Apply Now'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'अपनी बैंकिंग जरूरतों के लिए ऑनलाइन आवेदन करें'
              : 'Apply online for your banking needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Open Account */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'खाता खोलें' : 'Open Account'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'बचत या चालू खाता खोलें' : 'Open savings or current account'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'ऑनलाइन आवेदन' : 'Online application'}</li>
              <li>• {locale === 'hi' ? 'त्वरित स्वीकृति' : 'Instant approval'}</li>
              <li>• {locale === 'hi' ? 'न्यूनतम दस्तावेज' : 'Minimal documentation'}</li>
            </ul>
            <a 
              href={`/${locale}/apply/account`}
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </a>
          </div>

          {/* Apply for Loan */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'ऋण आवेदन करें' : 'Apply for Loan'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'व्यक्तिगत या व्यापार ऋण' : 'Personal or business loans'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'त्वरित ऋण स्वीकृति' : 'Quick loan approval'}</li>
              <li>• {locale === 'hi' ? 'प्रतिस्पर्धी ब्याज दरें' : 'Competitive interest rates'}</li>
              <li>• {locale === 'hi' ? 'लचीली पुनर्भुगतान' : 'Flexible repayment'}</li>
            </ul>
            <a 
              href={`/${locale}/apply/loan`}
              className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </a>
          </div>

          {/* Digital Banking */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'डिजिटल बैंकिंग शुरू करें' : 'Start Digital Banking'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'इंटरनेट और मोबाइल बैंकिंग' : 'Internet and mobile banking'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '24/7 बैंकिंग' : '24/7 banking'}</li>
              <li>• {locale === 'hi' ? 'सुरक्षित लेनदेन' : 'Secure transactions'}</li>
              <li>• {locale === 'hi' ? 'आसान इंटरफेस' : 'Easy interface'}</li>
            </ul>
            <a 
              href={`/${locale}/digital-banking`}
              className="block w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center"
            >
              {locale === 'hi' ? 'शुरू करें' : 'Get Started'}
            </a>
          </div>
        </div>

        {/* Application Process */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'आवेदन प्रक्रिया' : 'Application Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'आवेदन भरें' : 'Fill Application'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'ऑनलाइन फॉर्म भरें' : 'Fill online form'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'दस्तावेज अपलोड करें' : 'Upload Documents'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'आवश्यक दस्तावेज अपलोड करें' : 'Upload required documents'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'सत्यापन' : 'Verification'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'दस्तावेज सत्यापित करें' : 'Document verification'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'अनुमोदन' : 'Approval'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'त्वरित अनुमोदन' : 'Quick approval'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
