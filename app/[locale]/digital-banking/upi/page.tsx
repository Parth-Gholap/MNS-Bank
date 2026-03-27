import React from 'react';
import { Metadata } from 'next';

interface UPIServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: UPIServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'यूपीआई सेवाएं - महानगर नागरिक सहकारी बैंक'
      : 'UPI Services - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'त्वरित भुगतान और पैसा ट्रांसफर'
      : 'Instant payments and money transfers',
  };
}

export default async function UPIServicesPage({ params }: UPIServicesPageProps) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'यूपीआई सेवाएं' : 'UPI Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'त्वरित भुगतान और पैसा ट्रांसफर'
              : 'Instant payments and money transfers'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2zm-2-6a2 2 0 00-2-2H5a2 2 0 00-2 2v2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'भुगतान करें' : 'Make Payment'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi'
                  ? 'यूपीआई आईडी से भुगतान करें'
                  : 'Pay using UPI ID'}
              </p>
            </div>
            <button className="w-full bg-bank-blue-600 text-white py-2 px-4 rounded-lg hover:bg-bank-blue-700 transition-colors">
              {locale === 'hi' ? 'भुगतान करें' : 'Pay Now'}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3-.448-3-1s1.343.448-3 1-3 .448 3 3 3 3-.448 3-3 1.343 3 3 3zm0 8h16M7 8v8m-4-4h8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'पैसा ट्रांसफर' : 'Money Transfer'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi'
                  ? 'बैंक खाते में पैसा भेजें'
                  : 'Send money to bank accounts'}
              </p>
            </div>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              {locale === 'hi' ? 'ट्रांसफर करें' : 'Transfer'}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-6 0h1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'बिल भुगतान' : 'Bill Payment'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi'
                  ? 'यूपीआई से बिल भुगतान करें'
                  : 'Pay bills using UPI'}
              </p>
            </div>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              {locale === 'hi' ? 'बिल भुगतान' : 'Pay Bills'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'यूपीआई के लाभ' : 'UPI Benefits'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? '24/7 उपलब्धता' : '24/7 Availability'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi'
                    ? 'किसी भी समय भुगतान करें'
                    : 'Make payments anytime'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'त्वरित भुगतान' : 'Instant Payment'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi'
                    ? 'तुरंत पैसा ट्रांसफर'
                    : 'Instant money transfer'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-purple-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'सुरक्षित' : 'Secure'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi'
                    ? 'सुरक्षित भुगतान विधि'
                    : 'Secure payment method'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-orange-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3-.448-3-1s1.343.448-3 1-3 .448 3 3 3 3-.448 3-3 1.343 3 3 3zm0 8h16M7 8v8m-4-4h8" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'कोई शुल्क नहीं' : 'No Charges'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi'
                    ? 'ट्रांसफर पर कोई शुल्क नहीं'
                    : 'No transaction charges'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
