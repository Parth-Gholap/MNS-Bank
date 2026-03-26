import React from 'react';
import { Metadata } from 'next';
import ProductRecommendations from '@/components/product/ProductRecommendations';
import RelatedProducts from '@/components/product/RelatedProducts';

interface ProductsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'उत्पाद - महानगर नागरिक सहकारी बैंक'
      : 'Products - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'सभी बैंकिंग उत्पाद, ऋण, जमा, कार्ड, सेवाएं'
      : 'All Banking Products, Loans, Deposits, Cards, Services',
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'हमारे उत्पाद' : 'Our Products'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपकी सभी बैंकिंग जरूरतों के लिए व्यापक समाधान'
              : 'Comprehensive solutions for all your banking needs'}
          </p>
        </div>

        {/* Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Accounts */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'खाते' : 'Accounts'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'बचत, चालू, वरिष्ठ नागरिक खाते' : 'Savings, Current, Senior Citizen Accounts'}
            </p>
            <a 
              href={`/${locale}/personal/accounts`}
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'}
            </a>
          </div>

          {/* Loans */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'ऋण' : 'Loans'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'व्यक्तिगत, होम, कार, व्यवसाय ऋण' : 'Personal, Home, Car, Business Loans'}
            </p>
            <a 
              href={`/${locale}/personal/loans`}
              className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              {locale === 'hi' ? 'र जानें' : 'Learn More'}
            </a>
          </div>

          {/* Deposits */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'जमा' : 'Deposits'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'सावधि, आवर्तित, डबल जमा' : 'Fixed, Recurring, Double Deposits'}
            </p>
            <a 
              href={`/${locale}/personal/deposits`}
              className="block w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'}
            </a>
          </div>

          {/* Cards */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'कार्ड' : 'Cards'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'डेबिट, क्रेडिट, एटीएम कार्ड' : 'Debit, Credit, ATM Cards'}
            </p>
            <a 
              href={`/${locale}/personal/cards`}
              className="block w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'}
            </a>
          </div>

          {/* Digital Banking */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'इंटरनेट, मोबाइल, यूपीआई सेवाएं' : 'Internet, Mobile, UPI Services'}
            </p>
            <a 
              href={`/${locale}/digital-banking`}
              className="block w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-center"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'}
            </a>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'सेवाएं' : 'Services'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'लॉकर, बिल भुगतान, व्यापार सेवाएं' : 'Locker, Bill Payments, Business Services'}
            </p>
            <a 
              href={`/${locale}/personal/services`}
              className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center"
            >
              {locale === 'hi' ? 'और जानें' : 'Learn More'}
            </a>
          </div>
        </div>

        {/* Product Recommendations */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'आपके लिए अनुशंसित उत्पाद' : 'Recommended Products for You'}
          </h2>
          <ProductRecommendations locale={localeTyped} />
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'संबंधित उत्पाद' : 'Related Products'}
          </h2>
          <RelatedProducts 
            locale={localeTyped}
            title={locale === 'hi' ? 'संबंधित उत्पाद' : 'Related Products'}
            products={[
              {
                id: 'savings-account',
                name: 'Savings Account',
                nameHi: 'बचत खाता',
                description: 'High interest savings account',
                descriptionHi: 'उच्च ब्याज बचत खाता',
                image: '/images/products/savings-account.jpg',
                imageAlt: 'Savings Account',
                interestRate: 3.5,
                features: ['No minimum balance', 'Free debit card', 'Mobile banking'],
                ctaText: 'Open Account',
                ctaTextHi: 'खाता खोलें',
                ctaHref: `/${locale}/apply/account`
              },
              {
                id: 'personal-loan',
                name: 'Personal Loan',
                nameHi: 'व्यक्तिगत ऋण',
                description: 'Quick personal loans',
                descriptionHi: 'त्वरित व्यक्तिगत ऋण',
                image: '/images/products/personal-loan.jpg',
                imageAlt: 'Personal Loan',
                interestRate: 10.5,
                features: ['Quick approval', 'Flexible tenure', 'Competitive rates'],
                ctaText: 'Apply Now',
                ctaTextHi: 'अभी आवेदन करें',
                ctaHref: `/${locale}/apply/loan`
              }
            ]}
            showInterestRates={true}
          />
        </div>
      </div>
    </div>
  );
}
