'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

interface RelatedProduct {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  descriptionHi?: string;
  image: string;
  imageAlt?: string;
  interestRate?: number;
  features?: string[];
  ctaText?: string;
  ctaTextHi?: string;
  ctaHref?: string;
  badge?: {
    text: string;
    textHi?: string;
    color: string;
  };
}

interface RelatedProductsProps {
  locale: 'en' | 'hi';
  title: string;
  titleHi?: string;
  subtitle?: string;
  subtitleHi?: string;
  products: RelatedProduct[];
  maxProducts?: number;
  showInterestRates?: boolean;
  className?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  locale,
  title,
  titleHi,
  subtitle,
  subtitleHi,
  products,
  maxProducts = 4,
  showInterestRates = false,
  className = ''
}) => {
  const { t } = useTranslation(locale);

  const displayProducts = products.slice(0, maxProducts);

  const getBadgeColor = (color: string) => {
    const colorMap: Record<string, string> = {
      'green': 'bg-green-100 text-green-800',
      'blue': 'bg-blue-100 text-blue-800',
      'yellow': 'bg-yellow-100 text-yellow-800',
      'red': 'bg-red-100 text-red-800',
      'purple': 'bg-purple-100 text-purple-800',
      'gray': 'bg-gray-100 text-gray-800'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="container-bank px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-h2 text-gray-900 mb-4">
            {titleHi || title}
          </h2>
          {subtitle && (
            <p className="text-body text-gray-600">
              {subtitleHi || subtitle}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <div key={product.id} className="bg-white rounded-lg shadow-card border border-gray-200 p-6 hover:shadow-bank transition-shadow duration-300">
              {/* Product Badge */}
              {product.badge && (
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getBadgeColor(product.badge.color)}`}>
                    {product.badge.textHi || product.badge.text}
                  </span>
                </div>
              )}

              {/* Product Image */}
              {product.image && (
                <div className="mb-4">
                  <img
                    src={product.image}
                    alt={product.imageAlt || product.nameHi || product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Product Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.nameHi || product.name}
              </h3>

              {/* Interest Rate */}
              {showInterestRates && product.interestRate && (
                <div className="mb-2">
                  <span className="text-sm text-gray-500">
                    {t('products.interestRate')}:
                  </span>
                  <span className="text-lg font-bold text-bank-blue-600 ml-2">
                    {product.interestRate}%
                  </span>
                </div>
              )}

              {/* Product Description */}
              <p className="text-body text-gray-600 mb-4 leading-relaxed">
                {product.descriptionHi || product.description}
              </p>

              {/* Product Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    {t('products.features')}:
                  </h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="w-4 h-4 text-bank-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                        </svg>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-6">
                {product.ctaText && product.ctaHref && (
                  <Link
                    href={product.ctaHref}
                    className="btn-primary inline-block w-full text-center px-6 py-3"
                  >
                    {product.ctaTextHi || product.ctaText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Link */}
        {products.length > maxProducts && (
          <div className="text-center mt-8">
            <Link
              href={`/${locale}/products`}
              className="btn-secondary inline-block px-6 py-3"
            >
              {t('products.viewAll')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
