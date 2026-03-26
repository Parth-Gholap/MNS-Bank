'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation, type Locale } from '@/lib/i18n';

interface ImprovedNavigationProps {
  currentPath: string;
  locale: Locale;
  isMobile?: boolean;
  onClose?: () => void;
}

const ImprovedNavigation: React.FC<ImprovedNavigationProps> = ({ 
  currentPath, 
  locale, 
  isMobile = false, 
  onClose 
}) => {
  const { t } = useTranslation(locale);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigationStructure = {
    personal: {
      label: t('navigation.personal'),
      labelHi: t('navigation.personal'),
      href: `/${locale}/personal`,
      subItems: [
        {
          label: t('products.accounts'),
          labelHi: t('products.accounts'),
          href: `/${locale}/personal/accounts`
        },
        {
          label: t('products.deposits'),
          labelHi: t('products.deposits'),
          href: `/${locale}/personal/deposits`
        },
        {
          label: t('products.loans'),
          labelHi: t('products.loans'),
          href: `/${locale}/personal/loans`
        },
        {
          label: t('navigation.services'),
          labelHi: t('navigation.services'),
          href: `/${locale}/personal/services`
        }
      ]
    },
    business: {
      label: t('navigation.business'),
      labelHi: t('navigation.business'),
      href: `/${locale}/business`,
      subItems: [
        {
          label: t('products.accounts'),
          labelHi: t('products.accounts'),
          href: `/${locale}/business/accounts`
        },
        {
          label: t('products.deposits'),
          labelHi: t('products.deposits'),
          href: `/${locale}/business/deposits`
        },
        {
          label: t('products.loans'),
          labelHi: t('products.loans'),
          href: `/${locale}/business/loans`
        },
        {
          label: t('navigation.services'),
          labelHi: t('navigation.services'),
          href: `/${locale}/business/services`
        }
      ]
    }
  };

  const sharedNavigation = [
    {
      label: t('navigation.aboutUs'),
      labelHi: t('navigation.aboutUs'),
      href: `/${locale}/about-us`
    },
    {
      label: t('navigation.compliance'),
      labelHi: t('navigation.compliance'),
      href: `/${locale}/compliance`
    },
    {
      label: t('navigation.contact'),
      labelHi: t('navigation.contact'),
      href: `/${locale}/contact`
    }
  ];

  const isActive = useCallback((href: string) => {
    if (href === currentPath) return true;
    return currentPath.startsWith(href) && href !== `/${locale}`;
  }, [currentPath, locale]);

  const handleNavigation = useCallback((href: string) => {
    setIsNavigating(true);
    
    // Close mobile menu if open
    if (isMobile && onClose) {
      onClose();
    }
    
    // Close dropdown
    setActiveDropdown(null);
    
    // Navigate
    router.push(href);
    
    // Reset navigation state after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 100);
  }, [router, isMobile, onClose]);

  const handleDropdownToggle = useCallback((dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  }, [activeDropdown]);

  if (isMobile) {
    return (
      <div className="bg-white border-t border-gray-200">
        <div className="px-4 py-3 space-y-2">
          {/* Personal Banking */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {navigationStructure.personal.label}
            </h3>
            <div className="space-y-1">
              {navigationStructure.personal.subItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-bank-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  disabled={isNavigating}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Business Banking */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {navigationStructure.business.label}
            </h3>
            <div className="space-y-1">
              {navigationStructure.business.subItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-bank-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  disabled={isNavigating}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shared Navigation */}
          <div className="pt-4 border-t border-gray-200">
            {sharedNavigation.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-bank-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                disabled={isNavigating}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="hidden lg:flex lg:items-center lg:space-x-8">
      {/* Loading indicator */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 animate-pulse"></div>
      )}
      
      {/* Desktop Navigation */}
      <div className="flex items-center space-x-8">
        {/* Personal Banking Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle('personal')}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              isActive(navigationStructure.personal.href)
                ? 'bg-bank-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            disabled={isNavigating}
          >
            {navigationStructure.personal.label}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-5-5" />
            </svg>
          </button>
          
          {activeDropdown === 'personal' && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-2">
                {navigationStructure.personal.subItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-bank-blue-50 text-bank-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    disabled={isNavigating}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Business Banking Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle('business')}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              isActive(navigationStructure.business.href)
                ? 'bg-bank-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            disabled={isNavigating}
          >
            {navigationStructure.business.label}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-5-5" />
            </svg>
          </button>
          
          {activeDropdown === 'business' && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-2">
                {navigationStructure.business.subItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-bank-blue-50 text-bank-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    disabled={isNavigating}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Shared Navigation */}
        {sharedNavigation.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              isActive(item.href)
                ? 'bg-bank-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            disabled={isNavigating}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ImprovedNavigation;
