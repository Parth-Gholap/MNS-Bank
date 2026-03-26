import React from 'react';
import { Metadata } from 'next';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'संपर्क करें - महानगर नागरिक सहकारी बैंक'
      : 'Contact Us - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'हमसे संपर्क करें - ग्राहक सेवा, शाखाएं, और सहायता'
      : 'Contact us - Customer Service, Branches, and Support',
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'संपर्क करें' : 'Contact Us'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'हम आपकी सहायता के लिए यहां हैं - किसी भी प्रश्न या समस्या के लिए हमसे संपर्क करें'
              : 'We are here to help you - Contact us for any questions or issues'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Customer Service */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {locale === 'hi' ? 'ग्राहक सेवा' : 'Customer Service'}
                  </h3>
                  <p className="text-gray-600">24/7 Support</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">{locale === 'hi' ? 'फोन:' : 'Phone:'}</span> 1800-123-4567
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">{locale === 'hi' ? 'ईमेल:' : 'Email:'}</span> support@mahanagarbank.com
                </p>
              </div>
            </div>

            {/* Head Office */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {locale === 'hi' ? 'मुख्य कार्यालय' : 'Head Office'}
                  </h3>
                  <p className="text-gray-600">{locale === 'hi' ? 'मुख्य शाखा' : 'Main Branch'}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  {locale === 'hi'
                    ? 'महानगर नागरिक सहकारी बैंक'
                    : 'Mahanager Nagrik Sahakari Bank'}
                </p>
                <p className="text-gray-700">
                  123, Banking Street, {locale === 'hi' ? 'भोपाल' : 'Bhopal'}
                </p>
                <p className="text-gray-700">
                  {locale === 'hi' ? 'मध्य प्रदेश 462001' : 'Madhya Pradesh 462001'}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">{locale === 'hi' ? 'फोन:' : 'Phone:'}</span> 0755-1234567
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {locale === 'hi' ? 'हमसे संपर्क करें' : 'Get in Touch'}
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'नाम' : 'Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={locale === 'hi' ? 'आपका नाम' : 'Your Name'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'ईमेल' : 'Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={locale === 'hi' ? 'आपका ईमेल' : 'Your Email'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'संदेश' : 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={locale === 'hi' ? 'आपका संदेश' : 'Your Message'}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {locale === 'hi' ? 'संदेश भेजें' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
