'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface ProductCard {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  image: string;
  link: string;
  category: string;
  categoryHi: string;
  interestRate?: string;
  interestRateHi?: string;
  features: string[];
  featuresHi: string[];
  popular?: boolean;
}

interface ProductCardsProps {
  locale: 'en' | 'hi';
  className?: string;
}

const ProductCards: React.FC<ProductCardsProps> = ({ locale, className = '' }) => {
  const { t } = useTranslation(locale);
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Product Cards', locale === 'hi' ? 'उत्पाद एकार्ड्स' : 'Product Cards');
    fetchProducts();
  }, [locale]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?locale=${locale}&featured=true`);
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data.products.slice(0, 6)); // Show 6 products
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to static products
      setProducts(getStaticProducts());
    } finally {
      setLoading(false);
    }
  };

  const getStaticProducts = (): ProductCard[] => {
    return [
      {
        id: '1',
        name: 'Savings Account',
        nameHi: 'बचत खाता',
        description: 'Zero balance account with digital banking',
        descriptionHi: 'जीरो शेष बचत खाता डिजिटल बैंकिंग के साथ',
        image: '/images/products/savings-account.jpg',
        link: '/personal/savings-account',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        interestRate: '3.25%',
        interestRateHi: '3.25%',
        features: ['Zero Balance', 'Mobile Banking', 'Free ATM'],
        featuresHi: ['जीरो शेष', 'मोबाइल बैंकिंग', 'मुफ्त एटीएम'],
        popular: true
      },
      {
        id: '2',
        name: 'Personal Loan',
        nameHi: 'व्यक्तिग लोन',
        description: 'Instant approval with flexible EMI options',
        descriptionHi: 'तुरंत स्वीकृति और लचीली EMI विकल्प',
        image: '/images/products/personal-loan.jpg',
        link: '/personal/loans/personal-loan',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        interestRate: '12.5%',
        interestRateHi: '12.5%',
        features: ['Quick Approval', 'Flexible Tenure', 'No Collateral'],
        featuresHi: ['त्वरित स्वीकृति', 'लचीली अवधि', 'कोई बंधक नहीं'],
        popular: true
      },
      {
        id: '3',
        name: 'Home Loan',
        nameHi: 'होम लोन',
        description: 'Your dream home at affordable rates',
        descriptionHi: 'किफायत दरों पर आपका सपना घर',
        image: '/images/products/home-loan.jpg',
        link: '/personal/loans/home-loan',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        interestRate: '8.5%',
        interestRateHi: '8.5%',
        features: ['Tax Benefits', 'Long Tenure', 'Low Processing'],
        featuresHi: ['कर लाभ', 'लंबा अवधि', 'कम प्रसंस्करण'],
        popular: true
      },
      {
        id: '4',
        name: 'Current Account',
        nameHi: 'चालू खाता',
        description: 'Business banking with unlimited transactions',
        descriptionHi: 'असीमित लेनदेन के साथ व्यवसाय बैंकिंग',
        image: '/images/products/current-account.jpg',
        link: '/business/current-account',
        category: 'Business Banking',
        categoryHi: 'व्यवसाय बैंकिंग',
        features: ['Unlimited Transactions', 'Overdraft Facility', 'Business Tools'],
        featuresHi: ['असीमित लेनदेन', 'ओवरड्राफ्ट सुविधा', 'व्यवसाय उपकरण'],
        popular: false
      },
      {
        id: '5',
        name: 'Credit Card',
        nameHi: 'क्रेडिट कार्ड',
        description: 'Premium cards with exclusive benefits',
        descriptionHi: 'अनन्य लाभ के साथ प्रीमियम कार्ड',
        image: '/images/products/credit-card.jpg',
        link: '/personal/loans/credit-cards',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        features: ['Cashback', 'Reward Points', 'Global Acceptance'],
        featuresHi: ['कैशबैक', 'इनाम पॉइंट्स', 'वैश्विक स्वीकृति'],
        popular: false
      },
      {
        id: '6',
        name: 'Fixed Deposit',
        nameHi: 'सावध जमा',
        description: 'High returns with guaranteed safety',
        descriptionHi: 'गारंटीड सुरक्षा के साथ उच्च रिटर्न',
        image: '/images/products/fixed-deposit.jpg',
        link: '/personal/deposits/fixed-deposit',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        interestRate: '6.5%',
        interestRateHi: '6.5%',
        features: ['Guaranteed Returns', 'Flexible Tenure', 'Loan Against FD'],
        featuresHi: ['गारंटीड रिटर्न', 'लचीली अवधि', 'FD के खिलाफ लोन'],
        popular: false
      }
    ];
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Personal Banking': 'bg-blue-100 text-blue-800',
      'Business Banking': 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Loading state
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="flex space-x-2">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-card border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group"
        >
          {/* Product Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={product.image}
              alt={locale === 'hi' ? product.nameHi : product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Popular Badge */}
            {product.popular && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.322 0 .639.139.858.529l8.117 8.117a2 2 0 01.587.935.695.653l-8.116-8.116a2 2 0 01.587-.935.693-.653z" />
                  </svg>
                  {locale === 'hi' ? 'लोकप्रिय' : 'Popular'}
                </span>
              </div>
            )}
          </div>

          {/* Product Content */}
          <div className="p-6">
            {/* Category Badge */}
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColor(product.category)}`}>
              {locale === 'hi' ? product.categoryHi : product.category}
            </span>

            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? product.nameHi : product.name}
            </h3>

            {/* Interest Rate */}
            {product.interestRate && (
              <div className="flex items-center mb-3">
                <span className="text-2xl font-bold text-bank-blue-600">
                  {product.interestRate}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {locale === 'hi' ? 'ब्याज दर' : 'Interest Rate'}
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-600 mb-4 line-clamp-2">
              {locale === 'hi' ? product.descriptionHi : product.description}
            </p>

            {/* Features */}
            <div className="space-y-2 mb-6">
              {(locale === 'hi' ? product.featuresHi : product.features).slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={product.link}
              className="btn-primary w-full text-center group-hover:bg-bank-blue-700"
            >
              {locale === 'hi' ? 'और जानें' : 'Know More'}
              <svg className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      ))}

      {/* View All Products Link */}
      <div className="col-span-full text-center mt-8">
        <a
          href="/products"
          className="inline-flex items-center px-6 py-3 border border-bank-blue-600 text-bank-blue-600 rounded-lg font-medium hover:bg-bank-blue-50 transition-colors duration-200"
        >
          {locale === 'hi' ? 'सभी उत्पाद देखें' : 'View All Products'}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProductCards;
