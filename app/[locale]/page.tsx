'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import Carousel from '@/components/homepage/Carousel';
import WhatsNew from '@/components/homepage/WhatsNew';
import QuickLinks from '@/components/homepage/QuickLinks';
import ProductCards from '@/components/homepage/ProductCards';
import FraudBanner from '@/components/homepage/FraudBanner';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const locale = params?.locale as 'en' | 'hi' || 'en';
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView('Homepage', locale === 'hi' ? 'मुख्य पृष्ठ' : 'Homepage');
  }, [locale]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {locale === 'hi' 
                ? 'आपके वित्त विश्वास के लिए भारत का प्रमुख बैंक' 
                : 'India\'s Premier Bank for Your Financial Vision'
              }
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-bank-blue-100">
              {locale === 'hi' 
                ? 'डिजिटल बैंकिंग, ऋण, और निवेशन समाधान सेवाएं'
                : 'Digital Banking, Loans, and Investment Solutions'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-white text-bank-blue-600">
                {locale === 'hi' ? 'खाता खोलें' : 'Open Account'}
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-bank-blue-600">
                {locale === 'hi' ? 'ऋण आवेदन करें' : 'Apply for Loan'}
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-bank-blue-600">
                {locale === 'hi' ? 'डिजिटल बैंकिंग शुरू करें' : 'Start Digital Banking'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Bar */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickLinks locale={locale} />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Carousel */}
        <div className="mb-12">
          <Carousel locale={locale} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - What's New */}
          <div className="lg:col-span-2">
            <WhatsNew locale={locale} />
          </div>

          {/* Right Column - Product Cards */}
          <div>
            <ProductCards locale={locale} />
          </div>
        </div>

        {/* Fraud Banner */}
        <div className="mb-12">
          <FraudBanner locale={locale} />
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {locale === 'hi' ? 'आरबीआई' : 'RBI Regulated'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {locale === 'hi' ? '100% सुरक्षित' : '100% Secure'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 004.5 4.5v10.5a4.5 4.5 0 014.5 4.5h10.5a4.5 4.5 0 014.5-4.5v-10.5a4.5 4.5 0 00-4.5-4.5h-10.5z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {locale === 'hi' ? '24/7 समर्थन' : '24/7 Support'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-4z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {locale === 'hi' ? 'आधारित ऐप' : 'Award Winning App'}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Call to Action Section */}
      <section className="bg-bank-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'hi' 
              ? 'आज ही शुरू करें' 
              : 'Get Started Today'
            }
          </h2>
          <p className="text-xl mb-8 text-bank-blue-100">
            {locale === 'hi' 
              ? 'हमारी विशेष बैंकिंग सेवाओं का अनुभव करें और अपने वित्त लक्ष्यों को प्राप्त करें'
              : 'Experience our comprehensive banking services and achieve your financial goals'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-white text-bank-blue-600">
              {locale === 'hi' ? 'सभी सेवाएं देखें' : 'View All Services'}
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-bank-blue-600">
              {locale === 'hi' ? 'शाखा ढूंढें' : 'Find Branch'}
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-bank-blue-600">
              {locale === 'hi' ? 'ग्राहक सहायता प्राप्त करें' : 'Get Support'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
