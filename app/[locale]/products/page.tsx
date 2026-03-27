'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ProductRecommendations from '@/components/product/ProductRecommendations';
import RelatedProducts from '@/components/product/RelatedProducts';

interface ProductsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ProductsPage({ params }: ProductsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const localeTyped = (pathname.split('/')[1] || 'en') as 'en' | 'hi';
  
  const productCategories = [
    {
      id: 'accounts',
      title: localeTyped === 'hi' ? 'खाते' : 'Accounts',
      titleHi: localeTyped === 'hi' ? 'खाते' : 'Accounts',
      description: localeTyped === 'hi' ? 'बचत, चालू, वरिष्ठ नागरिक खाते' : 'Savings, Current, Senior Citizen Accounts',
      descriptionHi: localeTyped === 'hi' ? 'बचत, चालू, वरिष्ठ नागरिक खाते' : 'Savings, Current, Senior Citizen Accounts',
      icon: '💳',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      href: `/${localeTyped}/personal/accounts`,
      features: ['High Interest Rates', 'Zero Balance', 'Online Banking']
    },
    {
      id: 'loans',
      title: localeTyped === 'hi' ? 'ऋण' : 'Loans',
      titleHi: localeTyped === 'hi' ? 'ऋण' : 'Loans',
      description: localeTyped === 'hi' ? 'व्यक्तिग, होम, कार ऋण' : 'Personal, Home, Car Loans',
      descriptionHi: localeTyped === 'hi' ? 'व्यक्तिग, होम, कार ऋण' : 'Personal, Home, Car Loans',
      icon: '🏠',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      href: `/${localeTyped}/personal/loans`,
      features: ['Quick Approval', 'Flexible Terms', 'Low Interest']
    },
    {
      id: 'deposits',
      title: localeTyped === 'hi' ? 'जमा' : 'Deposits',
      titleHi: localeTyped === 'hi' ? 'जमा' : 'Deposits',
      description: localeTyped === 'hi' ? 'सावधि, आवर्तित जमा' : 'Fixed, Recurring, Double Deposits',
      descriptionHi: localeTyped === 'hi' ? 'सावधि, आवर्तित जमा' : 'Fixed, Recurring, Double Deposits',
      icon: '💰',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      href: `/${localeTyped}/personal/deposits`,
      features: ['Guaranteed Returns', 'Flexible Tenure', 'High Security']
    },
    {
      id: 'cards',
      title: localeTyped === 'hi' ? 'कार्ड' : 'Cards',
      titleHi: localeTyped === 'hi' ? 'कार्ड' : 'Cards',
      description: localeTyped === 'hi' ? 'डेबिट, क्रेडिट, एटीएम कार्ड' : 'Debit, Credit, ATM Cards',
      descriptionHi: localeTyped === 'hi' ? 'डेबिट, क्रेडिट, एटीएम कार्ड' : 'Debit, Credit, ATM Cards',
      icon: '💳',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      href: `/${localeTyped}/personal/cards`,
      features: ['Contactless Payment', 'Global Acceptance', 'Reward Points']
    },
    {
      id: 'digital',
      title: localeTyped === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking',
      titleHi: localeTyped === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking',
      description: localeTyped === 'hi' ? 'इंटरनेट, मोबाइल, यूपीआई' : 'Internet, Mobile, UPI Services',
      descriptionHi: localeTyped === 'hi' ? 'इंटरनेट, मोबाइल, यूपीआई' : 'Internet, Mobile, UPI Services',
      icon: '📱',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      href: `/${localeTyped}/digital-banking`,
      features: ['24/7 Access', 'Secure Transactions', 'Instant Transfers']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              {localeTyped === 'hi' ? 'हमारे उत्पाद' : 'Our Products'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {localeTyped === 'hi' 
                ? 'आपकी सभी बैंकिंग जरूरतों के लिए व्यापक समाधान'
                : 'Comprehensive solutions for all your banking needs'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => router.push(`/${localeTyped}/apply/account`)}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {localeTyped === 'hi' ? 'खाता खोलें' : 'Open Account'}
              </button>
              <button
                onClick={() => router.push(`/${localeTyped}/apply/loan`)}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
              >
                {localeTyped === 'hi' ? 'ऋण आवेदन करें' : 'Apply for Loan'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {localeTyped === 'hi' ? 'हमारे बैंकिंग उत्पाद' : 'Our Banking Products'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {localeTyped === 'hi' 
              ? 'आपकी सभी आवश्यकताओं के लिए सर्वोतम और सुरक्षित समाधान'
              : 'Explore our complete range of banking products and services'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div 
              key={category.id}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 cursor-pointer`}
              onClick={() => router.push(category.href)}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${category.color}`}></div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                
                {/* Title */}
                <h3 className={`text-2xl font-bold text-center mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-center mb-6">
                  {category.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L5 5l-4 4h6a2 2 0 002-2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Action Button */}
                <div className="mt-8">
                  <button className={`w-full py-3 px-6 bg-gradient-to-r ${category.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                    {localeTyped === 'hi' ? 'और जानकरें' : 'Explore Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductRecommendations locale={localeTyped} />
        <RelatedProducts 
          locale={localeTyped}
          title={localeTyped === 'hi' ? 'आपके लिए अनुशंसित उत्पाद' : 'Recommended Products for You'}
          titleHi={localeTyped === 'hi' ? 'आपके लिए अनुशंसित उत्पाद' : 'Recommended Products for You'}
          products={productCategories.map(cat => ({
            id: cat.id,
            name: cat.title,
            nameHi: cat.titleHi,
            description: cat.description,
            descriptionHi: cat.descriptionHi,
            image: '/images/products/default.jpg',
            imageAlt: cat.title,
            ctaText: localeTyped === 'hi' ? 'और जानें' : 'Learn More',
            ctaTextHi: localeTyped === 'hi' ? 'और जानें' : 'Learn More',
            ctaHref: cat.href
          }))}
        />
      </div>
    </div>
  );
}