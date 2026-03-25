'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface ProductHeroProps {
  locale: 'en' | 'hi';
  title: string;
  titleHi?: string;
  subtitle: string;
  subtitleHi?: string;
  description: string;
  descriptionHi?: string;
  image?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaTextHi?: string;
  ctaHref?: string;
  backgroundImage?: string;
  showFeatures?: boolean;
  features?: Array<{
    icon: string;
    title: string;
    titleHi?: string;
    description: string;
    descriptionHi?: string;
  }>;
  className?: string;
}

const ProductHero: React.FC<ProductHeroProps> = ({
  locale,
  title,
  titleHi,
  subtitle,
  subtitleHi,
  description,
  descriptionHi,
  image,
  imageAlt,
  ctaText,
  ctaTextHi,
  ctaHref,
  backgroundImage,
  showFeatures = false,
  features = [],
  className = ''
}) => {
  const { t } = useTranslation(locale);

  return (
    <section 
      className={`
        relative overflow-hidden
        ${backgroundImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-to-r from-bank-blue-600 to-bank-blue-800'}
        text-white py-16
        ${className}
      `}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : {}}
    >
      <div className="container-bank px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content Section */}
            <div className="lg:col-span-1">
              <h1 className="text-h1 mb-4">
                {titleHi || title}
              </h1>
              <p className="text-xl mb-6 leading-relaxed">
                {subtitleHi || subtitle}
              </p>
              <p className="text-body mb-8 leading-relaxed">
                {descriptionHi || description}
              </p>
              {ctaText && ctaHref && (
                <a
                  href={ctaHref}
                  className="btn-gold inline-block px-8 py-3 text-bank-blue-900 font-semibold hover:bg-bank-gold-700 transition-colors duration-300"
                >
                  {ctaTextHi || ctaText}
                </a>
              )}
            </div>

            {/* Image Section */}
            {image && (
              <div className="lg:col-span-1">
                <img
                  src={image}
                  alt={imageAlt || titleHi || title}
                  className="rounded-lg shadow-xl w-full h-auto max-h-96 object-cover"
                />
              </div>
            )}
          </div>

          {/* Features Section */}
          {showFeatures && features && features.length > 0 && (
            <div className="lg:col-span-2 mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-lg p-6 shadow-card border border-gray-200">
                      <div className="text-bank-blue-600 text-4xl mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.titleHi || feature.title}
                      </h3>
                      <p className="text-body text-gray-600">
                        {feature.descriptionHi || feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
