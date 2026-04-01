'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Carousel from '@/components/homepage/Carousel';
import WhatsNew from '@/components/homepage/WhatsNew';
import ProductCards from '@/components/homepage/ProductCards';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function HomePage({ params }: HomePageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    const initLocale = async () => {
      const { locale: localeParam } = await params;
      const localeTyped = localeParam as 'en' | 'hi';
      setLocale(localeTyped);
      trackPageView('Homepage', localeTyped === 'hi' ? 'मुख्य पृष्ठ' : 'Homepage');
    };
    initLocale();
  }, [params]);

  const handleAccountOpen = () => {
    router.push(`/${locale}/apply/account`);
  };

  const handleLoanApply = () => {
    router.push(`/${locale}/apply/loan`);
  };

  const handleDigitalBanking = () => {
    router.push(`/${locale}/digital-banking`);
  };

  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'account':
        router.push(`/${locale}/apply/account`);
        break;
      case 'loan':
        router.push(`/${locale}/apply/loan`);
        break;
      case 'digital':
        router.push(`/${locale}/digital-banking`);
        break;
      case 'products':
        router.push(`/${locale}/products`);
        break;
      case 'locate':
        router.push(`/${locale}/locate-us`);
        break;
      case 'contact':
        router.push(`/${locale}/contact`);
        break;
      case 'support':
        router.push(`/${locale}/contact`);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in leading-tight">
              <span className="text-gradient-bank">
                {locale === 'hi' 
                  ? 'आपके वित्त विश्वास के लिए भारत का प्रमुख बैंक' 
                  : 'India\'s Premier Bank for Your Financial Vision'
                }
              </span>
            </h1>
            <p className="text-2xl md:text-3xl mb-12 text-bank-blue-100 max-w-4xl mx-auto animate-slide-up leading-relaxed">
              {locale === 'hi' 
                ? 'डिजिटल बैंकिंग, ऋण, और निवेशन समाधान सेवाएं'
                : 'Digital Banking, Loans, and Investment Solutions'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleAccountOpen}
                className="bg-transparent px-8 py-4 text-white font-bold text-lg rounded-xl border-2 border-white hover:bg-white hover:text-bank-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                {locale === 'hi' ? 'खाता खोलें' : 'Open Account'}
              </button>
              <button
                onClick={handleLoanApply}
                className="bg-transparent px-8 py-4 text-white font-bold text-lg rounded-xl border-2 border-white hover:bg-white hover:text-bank-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                {locale === 'hi' ? 'ऋण आवेदन करें' : 'Apply for Loan'}
              </button>
              <button
                onClick={handleDigitalBanking}
                className="bg-transparent px-8 py-4 text-white font-bold text-lg rounded-xl border-2 border-white hover:bg-white hover:text-bank-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                {locale === 'hi' ? 'डिजिटल बैंकिंग शुरू करें' : 'Start Digital Banking'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel locale={locale} />
        </div>
      </section>

      {/* Quick Actions Bar */}
      <section className="bg-white border-b border-gray-200 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <button
              onClick={() => handleQuickAction('account')}
              className="bg-gradient-card flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-all duration-300 group shadow-lg"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-float">👤</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-bank-blue-600">
                {locale === 'hi' ? 'खाता खोलें' : 'Open Account'}
              </span>
            </button>
            <button
              onClick={() => handleQuickAction('loan')}
              className="bg-gradient-card flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-all duration-300 group shadow-lg"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-float">💰</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">
                {locale === 'hi' ? 'ऋण आवेदन' : 'Apply Loan'}
              </span>
            </button>
            <button
              onClick={() => handleQuickAction('digital')}
              className="bg-gradient-card flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-all duration-300 group shadow-lg"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-float">📱</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                {locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking'}
              </span>
            </button>
            <button
              onClick={() => handleQuickAction('products')}
              className="bg-gradient-card flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-all duration-300 group shadow-lg"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-float">💳</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                {locale === 'hi' ? 'कार्ड' : 'Cards'}
              </span>
            </button>
            <button
              onClick={() => handleQuickAction('locate')}
              className="bg-gradient-card flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-all duration-300 group shadow-lg"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-float">📍</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">
                {locale === 'hi' ? 'शाखा ढूंढें' : 'Find Branch'}
              </span>
            </button>
            <button
              onClick={() => handleQuickAction('support')}
              className="bg-gradient-card flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-all duration-300 group shadow-lg"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-float">🎧</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-teal-600">
                {locale === 'hi' ? 'सहायता' : 'Support'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Features Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              {locale === 'hi' ? 'हमारी विशेष सेवाएं' : 'Our Premium Services'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {locale === 'hi' 
                ? 'आपकी सभी बैंकिंग आवश्यकताओं के लिए व्यापक समाधान'
                : 'Comprehensive solutions for all your banking needs'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="feature-card text-center group">
              <div className="w-24 h-24 bg-bank-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-105">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🏦</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {locale === 'hi' ? 'बैंकिंग' : 'Banking'}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {locale === 'hi' ? '24/7 बैंकिंग सेवाएं' : '24/7 Banking Services'}
              </p>
            </div>
            <div className="feature-card text-center group">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-green-200 transition-all duration-300 group-hover:scale-105">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">💸</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {locale === 'hi' ? 'ऋण' : 'Loans'}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {locale === 'hi' ? 'तेज ऋण स्वीकृति' : 'Quick Loan Approval'}
              </p>
            </div>
            <div className="feature-card text-center group">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-105">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📊</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {locale === 'hi' ? 'निवेश' : 'Investments'}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {locale === 'hi' ? 'सुरक्षित निवेश विकल्प' : 'Secure Investment Options'}
              </p>
            </div>
            <div className="feature-card text-center group">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-orange-200 transition-all duration-300 group-hover:scale-105">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📱</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {locale === 'hi' ? 'डिजिटल' : 'Digital'}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {locale === 'hi' ? 'ऑनलाइन बैंकिंग' : 'Online Banking'}
              </p>
            </div>
          </div>
        </div>

        {/* What's New Section */}
        <div className="mb-32">
          <WhatsNew locale={locale} />
        </div>

        {/* Product Cards Section */}
        <div className="mb-32">
          <ProductCards locale={locale} />
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 mb-32">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === 'hi' ? 'विश्वास और सुरक्षा' : 'Trust & Security'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'hi' 
                ? 'हम आपके वित्त की सुरक्षा के लिए प्रतिबद्ध हैं'
                : 'We are committed to securing your financial future'
              }
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'आरबीआई विनियमित' : 'RBI Regulated'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {locale === 'hi' ? 'पूरी तरह से विनियमित' : 'Fully Regulated'}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-bank-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? '100% सुरक्षित' : '100% Secure'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {locale === 'hi' ? 'बैंकिंग सुरक्षा' : 'Banking Security'}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? '24/7 समर्थन' : '24/7 Support'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {locale === 'hi' ? 'हमेशा उपलब्ध' : 'Always Available'}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'पुरस्कार विजेता' : 'Award Winning'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {locale === 'hi' ? 'सर्वश्रेष्ठ सेवा' : 'Best Service'}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Call to Action Section */}
      <section className="cta-section py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-8">
              {locale === 'hi' 
                ? 'आज ही शुरू करें' 
                : 'Get Started Today'
              }
            </h2>
            <p className="text-2xl mb-12 text-bank-blue-100 leading-relaxed">
              {locale === 'hi' 
                ? 'हमारी विशेष बैंकिंग सेवाओं का अनुभव करें और अपने वित्त लक्ष्यों को प्राप्त करें'
                : 'Experience our comprehensive banking services and achieve your financial goals'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href={`/${locale}/products`}
                className="inline-flex items-center px-8 py-4 bg-white text-bank-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {locale === 'hi' ? 'सभी सेवाएं देखें' : 'View All Services'}
              </Link>
              <Link 
                href={`/${locale}/locate-us`}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-bank-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                {locale === 'hi' ? 'शाखा ढूंढें' : 'Find Branch'}
              </Link>
              <Link 
                href={`/${locale}/contact`}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-bank-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                {locale === 'hi' ? 'ग्राहक सहायता प्राप्त करें' : 'Get Support'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === 'hi' ? 'हमारी उपलब्धियां' : 'Our Achievements'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'hi' 
                ? 'वर्षों के विश्वसनीय सेवाओं का परिणाम'
                : 'Result of years of trusted service'
              }
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="stat-card text-center">
              <div className="text-5xl font-bold text-bank-blue-600 mb-4">50K+</div>
              <div className="text-xl text-gray-700 font-medium">
                {locale === 'hi' ? 'ग्राहक' : 'Customers'}
              </div>
            </div>
            <div className="stat-card text-center">
              <div className="text-5xl font-bold text-green-600 mb-4">100+</div>
              <div className="text-xl text-gray-700 font-medium">
                {locale === 'hi' ? 'शाखाएं' : 'Branches'}
              </div>
            </div>
            <div className="stat-card text-center">
              <div className="text-5xl font-bold text-purple-600 mb-4">₹500Cr+</div>
              <div className="text-xl text-gray-700 font-medium">
                {locale === 'hi' ? 'जमा' : 'Deposits'}
              </div>
            </div>
            <div className="stat-card text-center">
              <div className="text-5xl font-bold text-orange-600 mb-4">25+</div>
              <div className="text-xl text-gray-700 font-medium">
                {locale === 'hi' ? 'वर्ष' : 'Years'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
