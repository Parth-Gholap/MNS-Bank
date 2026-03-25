'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { useTranslation } from '@/lib/i18n';
import './globals.css';

interface LayoutProps {
  children: React.ReactNode;
  locale: 'en' | 'hi';
}

const Layout: React.FC<LayoutProps> = ({ children, locale }) => {
  const pathname = usePathname();
  const { t } = useTranslation(locale);

  // Define page titles based on route
  const getPageTitle = () => {
    if (pathname.includes('/compliance/')) {
      return t('navigation.compliance');
    }
    if (pathname.includes('/about-us')) {
      return t('navigation.aboutUs');
    }
    if (pathname.includes('/contact')) {
      return t('navigation.contact');
    }
    return t('navigation.personal'); // Default
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header locale={locale} />

      {/* Main Content */}
      <main className="flex-1">
        <div className="container-bank px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {getPageTitle()}
          </h1>
          
          {/* Page Content */}
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer locale={locale} />
    </div>
  );
};

export default Layout;
