'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation, type Locale } from '@/lib/i18n';
import { config, apiEndpoints } from '@/lib/config';

interface NavigationProps {
  currentPath: string;
  locale: Locale;
  isMobile?: boolean;
  onClose?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPath, 
  locale, 
  isMobile = false, 
  onClose 
}) => {
  const { t } = useTranslation(locale);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navigationStructure = {
    personal: {
      label: locale === 'hi' ? 'व्यक्तिग बैंकिंग' : 'Personal Banking',
      href: `/${locale}/personal`,
      subItems: [
        {
          label: locale === 'hi' ? 'खाते' : 'Accounts',
          href: `/${locale}/personal/accounts`
        },
        {
          label: locale === 'hi' ? 'जमा' : 'Deposits',
          href: `/${locale}/personal/deposits`
        },
        {
          label: locale === 'hi' ? 'ऋण' : 'Loans',
          href: `/${locale}/personal/loans`
        },
        {
          label: locale === 'hi' ? 'सेवाएं' : 'Services',
          href: `/${locale}/personal/services`
        }
      ]
    },
    business: {
      label: locale === 'hi' ? 'व्यवसाय बैंकिंग' : 'Business Banking',
      href: `/${locale}/business`,
      subItems: [
        {
          label: locale === 'hi' ? 'खाते' : 'Accounts',
          href: `/${locale}/business/accounts`
        },
        {
          label: locale === 'hi' ? 'जमा' : 'Deposits',
          href: `/${locale}/business/deposits`
        },
        {
          label: locale === 'hi' ? 'ऋण' : 'Loans',
          href: `/${locale}/business/loans`
        },
        {
          label: locale === 'hi' ? 'सेवाएं' : 'Services',
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

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

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
  }

  return (
    <nav className={`${isMobile ? 'flex flex-col space-y-1' : 'flex items-center space-x-1'}`}>
      {/* Personal Banking Dropdown */}
      <div className={`${isMobile ? '' : 'relative'}`}>
        <button
          onClick={() => handleDropdownToggle('personal')}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            isActive(navigationStructure.personal.href)
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          } ${isMobile ? 'mb-2' : ''}`}
        >
          <span>{navigationStructure.personal.label}</span>
          {!isMobile && <span className="ml-1 text-xs">▼</span>}
        </button>
        
        {activeDropdown === 'personal' && (
          <div className={`${isMobile ? 'ml-4 mt-2 space-y-1' : 'absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50'}`}>
            {!isMobile && (
              <div className="p-2 border-b border-gray-100">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {locale === 'hi' ? 'व्यक्तिग सेवाएं' : 'Personal Services'}
                </div>
              </div>
            )}
            <div className={`${isMobile ? 'space-y-1' : 'p-2'}`}>
              {navigationStructure.personal.subItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => {
                    if (isMobile && onClose) {
                      onClose();
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Business Banking Dropdown */}
      <div className={`${isMobile ? '' : 'relative'}`}>
        <button
          onClick={() => handleDropdownToggle('business')}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            isActive(navigationStructure.business.href)
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          } ${isMobile ? 'mb-2' : ''}`}
        >
          <span>{navigationStructure.business.label}</span>
          {!isMobile && <span className="ml-1 text-xs">▼</span>}
        </button>
        
        {activeDropdown === 'business' && (
          <div className={`${isMobile ? 'ml-4 mt-2 space-y-1' : 'absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50'}`}>
            {!isMobile && (
              <div className="p-2 border-b border-gray-100">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {locale === 'hi' ? 'व्यवसाय सेवाएं' : 'Business Services'}
                </div>
              </div>
            )}
            <div className={`${isMobile ? 'space-y-1' : 'p-2'}`}>
              {navigationStructure.business.subItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => {
                    if (isMobile && onClose) {
                      onClose();
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Other Links */}
      <Link
        href={`/${locale}/digital-banking`}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive(`/${locale}/digital-banking`)
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        } ${isMobile ? 'mb-2' : ''}`}
        onClick={() => {
          if (isMobile && onClose) {
            onClose();
          }
        }}
      >
        {locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking'}
      </Link>

      <Link
        href={`/${locale}/contact`}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive(`/${locale}/contact`)
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        } ${isMobile ? 'mb-2' : ''}`}
        onClick={() => {
          if (isMobile && onClose) {
            onClose();
          }
        }}
      >
        {locale === 'hi' ? 'संपर्क करें' : 'Contact'}
      </Link>
    </nav>
  );
};

export default Navigation;
