'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import LanguageToggle from '@/components/ui/LanguageToggle';
import Navigation from '@/components/global/Navigation';
import NetBankingButton from '@/components/ui/NetBankingButton';
import AccessibilityToolbar from '@/components/ui/AccessibilityToolbar';
import { config } from '@/lib/config';

interface HeaderProps {
  locale: 'en' | 'hi';
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation(locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 left-0 right-0 z-sticky bg-white shadow-bank border-b border-gray-200">
      <div className="container-bank px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}/`} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-bank-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">MNS</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-bank-gray-900">
                {config.bankName}
              </span>
              <span className="text-sm text-bank-gray-600 ml-2">
                {t('navigation.aboutUs')}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Navigation currentPath={pathname} locale={locale} />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle 
              currentLocale={locale}
              onToggle={(newLocale) => {
                const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
                router.push(newPath);
              }}
            />

            {/* Net Banking Button */}
            <NetBankingButton href={config.netBankingUrl} />

            {/* Accessibility Toolbar */}
            <AccessibilityToolbar />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label={t('accessibility.openMenu')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 6v4a2 2 0 012-2h16a2 2 0 01-2V6a2 2 0 01-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6l6-6 6z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-modal bg-black bg-opacity-50">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label={t('accessibility.closeMenu')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6l6-6 6z" />
              </svg>
            </button>
          </div>
          <div className="fixed inset-0 z-modal bg-white p-4 pt-16">
            <Navigation 
              currentPath={pathname} 
              locale={locale} 
              isMobile={true}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
