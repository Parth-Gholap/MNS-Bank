import React from 'react';
import { Metadata } from 'next';

interface VerifyCertificatePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: VerifyCertificatePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'प्रमाणपत्र सत्यापित करें - महानगर नागरिक सहकारी बैंक'
      : 'Verify Certificate - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'प्रमाणपत्र सत्यापन प्रणाली, प्रमाणपत्र जांच'
      : 'Certificate Verification System, Certificate Check',
  };
}

export default async function VerifyCertificatePage({ params }: VerifyCertificatePageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'प्रमाणपत्र सत्यापित करें' : 'Verify Certificate'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'हमारे द्वारा जारी प्रमाणपत्रों की प्रामाणिकता सत्यापित करें'
              : 'Verify the authenticity of certificates issued by us'}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="certificate-number" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'प्रमाणपत्र संख्या' : 'Certificate Number'}
                </label>
                <input
                  type="text"
                  id="certificate-number"
                  name="certificate-number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={locale === 'hi' ? 'प्रमाणपत्र संख्या दर्ज करें' : 'Enter certificate number'}
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'नाम' : 'Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={locale === 'hi' ? 'आपका नाम दर्ज करें' : 'Enter your name'}
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'जारी तिथि' : 'Issue Date'}
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {locale === 'hi' ? 'सत्यापित करें' : 'Verify'}
              </button>
            </form>
          </div>

          {/* Verification Information */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'hi' ? 'सत्यापन के बारे में जानकारी' : 'About Verification'}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {locale === 'hi' ? 'प्रामाणिक सत्यापन' : 'Authentic Verification'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi'
                      ? 'हमारी सत्यापन प्रणाली केवल प्रामाणिक प्रमाणपत्रों की पुष्टि करती है'
                      : 'Our verification system only confirms authentic certificates'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {locale === 'hi' ? 'त्वरित परिणाम' : 'Instant Results'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi'
                      ? 'सत्यापन के तुरंत परिणाम प्राप्त करें'
                      : 'Get instant verification results'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {locale === 'hi' ? 'सुरक्षित प्रक्रिया' : 'Secure Process'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi'
                      ? 'आपकी जानकारी सुरक्षित रूप से संरक्षित है'
                      : 'Your information is securely protected'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  {locale === 'hi' ? 'सत्यापन के लिए संपर्क करें' : 'Contact for Verification'}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {locale === 'hi' ? 'फोन: 0755-1234567' : 'Phone: 0755-1234567'}</li>
                  <li>• {locale === 'hi' ? 'ईमेल: verify@mahanagarbank.com' : 'Email: verify@mahanagarbank.com'}</li>
                  <li>• {locale === 'hi' ? 'समय: सोमवार - शुक्रवार, 9:30 - 18:30' : 'Hours: Monday - Friday, 9:30 - 18:30'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  {locale === 'hi' ? 'शाखा पता' : 'Branch Address'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'hi'
                    ? 'महानगर नागरिक सहकारी बैंक, 123, बैंकिंग स्ट्रीट, भोपाल, मध्य प्रदेश - 462001'
                    : 'Mahanager Nagrik Sahakari Bank, 123, Banking Street, Bhopal, Madhya Pradesh - 462001'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
