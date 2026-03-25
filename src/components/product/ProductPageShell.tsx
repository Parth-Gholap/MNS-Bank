'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface ProductPageShellProps {
  locale: 'en' | 'hi';
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  children: React.ReactNode;
  breadcrumbs?: Array<{ label: string; labelHi?: string; href: string }>;
  showHero?: boolean;
  heroData?: {
    title: string;
    titleHi?: string;
    subtitle: string;
    subtitleHi?: string;
    image?: string;
    ctaText?: string;
    ctaTextHi?: string;
    ctaHref?: string;
  };
}

const ProductPageShell: React.FC<ProductPageShellProps> = ({
  locale,
  title,
  titleHi,
  description,
  descriptionHi,
  children,
  breadcrumbs,
  showHero = true,
  heroData
}) => {
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView(title, titleHi || title);
  }, [title, titleHi, locale]);

  const pageTitle = titleHi || title;
  const pageDescription = descriptionHi || description;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <head>
        <title>{pageTitle} - {t('common.bankName')}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${t('common.bankName')}, ${title}, banking, ${locale}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={t('common.bankName')} />
        <meta property="og:locale" content={locale} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/current-path`} />
        <meta name="robots" content="index, follow" />
      </head>

      {/* Breadcrumb Navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav 
          aria-label={t('common.breadcrumb')}
          className="bg-white border-b border-gray-200 px-4 py-3"
        >
          <div className="container-bank px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7a2 2 0 012 2v6a2 2 0 012-2z" />
                    </svg>
                  )}
                  <a
                    href={crumb.href}
                    className="text-bank-blue-600 hover:text-bank-blue-700 font-medium transition-colors duration-200"
                  >
                    {crumb.labelHi || crumb.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      {/* Hero Section */}
      {showHero && heroData && (
        <section className="relative bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white py-16">
          <div className="container-bank px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="lg:col-span-1">
                  <h1 className="text-h1 text-white mb-4">
                    {heroData.titleHi || heroData.title}
                  </h1>
                  <p className="text-xl text-white mb-8 leading-relaxed">
                    {heroData.subtitleHi || heroData.subtitle}
                  </p>
                  {heroData.ctaText && heroData.ctaHref && (
                    <a
                      href={heroData.ctaHref}
                      className="btn-gold inline-block px-8 py-3 text-bank-blue-900 font-semibold hover:bg-bank-gold-700 transition-colors duration-300"
                    >
                      {heroData.ctaTextHi || heroData.ctaText}
                    </a>
                  )}
                </div>
                <div className="lg:col-span-1">
                  {heroData.image && (
                    <img
                      src={heroData.image}
                      alt={heroData.titleHi || heroData.title}
                      className="rounded-lg shadow-xl w-full h-auto max-h-96 object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className="container-bank px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title and Description */}
          <div className="text-center mb-8">
            <h1 className="text-h2 text-gray-900 mb-4">
              {titleHi || title}
            </h1>
            <p className="text-body text-gray-600 max-w-3xl mx-auto">
              {descriptionHi || description}
            </p>
          </div>

          {/* Product Content */}
          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-8">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container-bank px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              © {new Date().getFullYear()} {t('common.allRightsReserved')}. {t('common.bankName')}
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href={`/${locale}/compliance/privacy-policy`}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t('compliance.privacyPolicy')}
              </a>
              <span className="text-gray-400">|</span>
              <a
                href={`/${locale}/compliance/grievance-redressal`}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t('compliance.grievanceRedressal')}
              </a>
              <span className="text-gray-400">|</span>
              <a
                href={`/${locale}/compliance/deaf-unclaimed-deposits`}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t('compliance.deaf')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductPageShell;
