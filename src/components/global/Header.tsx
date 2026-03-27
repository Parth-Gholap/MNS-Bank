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
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}/`} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-bank-blue-600 to-bank-blue-800 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
              <span className="text-white font-bold text-xl">MNS</span>
            </div>
            <div className="hidden sm:block">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 group-hover:text-bank-blue-600 transition-colors duration-200">
                  {config.bankName}
                </span>
                <span className="text-xs text-gray-500">
                  {locale === 'hi' ? 'विश्वास के लिए बैंकिंग' : 'Banking with Trust'}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Navigation currentPath={pathname} locale={locale} />
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  const newLocale = locale === 'en' ? 'hi' : 'en';
                  const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
                  router.push(newPath);
                }}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <span className="text-lg">
                  {locale === 'en' ? '🇺🇸' : '🇮🇳'}
                </span>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {locale === 'en' ? 'EN' : 'हिं'}
                </span>
                <span className="text-xs text-gray-500 sm:hidden">
                  {locale === 'en' ? 'English' : 'हिंदी'}
                </span>
              </button>
            </div>

            {/* Net Banking Button */}
            <NetBankingButton href={config.netBankingUrl} />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white transition-colors duration-200"
              aria-label="Close menu"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
          <div className="fixed inset-0 z-50 bg-white p-4 pt-16 overflow-y-auto">
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
