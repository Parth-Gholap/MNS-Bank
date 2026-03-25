'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { config } from '@/lib/config';

interface MobileNavProps {
  currentPath: string;
  locale: 'en' | 'hi';
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentPath, locale, onClose }) => {
  const { t } = useTranslation(locale);

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

  const isActive = (href: string) => {
    if (href === currentPath) return true;
    return currentPath.startsWith(href);
  };

  return (
    <div className="bg-white h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {t('navigation.personal')}
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          aria-label={t('accessibility.closeMenu')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6l6-6 6z" />
          </svg>
        </button>
      </div>

      {/* Navigation Content */}
      <div className="p-4 space-y-4">
        {/* Personal Banking */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {navigationStructure.personal.label}
          </h3>
          <div className="space-y-1">
            {navigationStructure.personal.subItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-bank-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
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
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-bank-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Shared Navigation */}
        <div className="pt-4 border-t border-gray-200">
          {sharedNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive(item.href)
                  ? 'bg-bank-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
