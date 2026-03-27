'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown]) {
        if (!dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const navigationStructure = {
    personal: {
      label: locale === 'hi' ? 'व्यक्तिग बैंकिंग' : 'Personal Banking',
      icon: '👤',
      href: `/${locale}/personal`,
      subItems: [
        {
          label: locale === 'hi' ? 'खाते' : 'Accounts',
          icon: '💳',
          href: `/${locale}/personal/accounts`,
          description: locale === 'hi' ? 'बचत, चालू खाते' : 'Savings, Current Accounts'
        },
        {
          label: locale === 'hi' ? 'जमा' : 'Deposits',
          icon: '💰',
          href: `/${locale}/personal/deposits`,
          description: locale === 'hi' ? 'सावधि, आवर्तित जमा' : 'Fixed, Recurring Deposits'
        },
        {
          label: locale === 'hi' ? 'ऋण' : 'Loans',
          icon: '🏠',
          href: `/${locale}/personal/loans`,
          description: locale === 'hi' ? 'व्यक्तिग, होम, कार ऋण' : 'Personal, Home, Car Loans'
        },
        {
          label: locale === 'hi' ? 'सेवाएं' : 'Services',
          icon: '📱',
          href: `/${locale}/personal/services`,
          description: locale === 'hi' ? 'डिजिटल, बैंकिंग सेवाएं' : 'Digital, Banking Services'
        }
      ]
    },
    business: {
      label: locale === 'hi' ? 'व्यवसाय बैंकिंग' : 'Business Banking',
      icon: '🏢',
      href: `/${locale}/business`,
      subItems: [
        {
          label: locale === 'hi' ? 'खाते' : 'Accounts',
          icon: '💼',
          href: `/${locale}/business/accounts`,
          description: locale === 'hi' ? 'व्यवसाय, करेंट खाते' : 'Business, Current Accounts'
        },
        {
          label: locale === 'hi' ? 'जमा' : 'Deposits',
          icon: '📈',
          href: `/${locale}/business/deposits`,
          description: locale === 'hi' ? 'कार्यशील पूंजी, सावधि जमा' : 'Working Capital, Fixed Deposits'
        },
        {
          label: locale === 'hi' ? 'ऋण' : 'Loans',
          icon: '🏭',
          href: `/${locale}/business/loans`,
          description: locale === 'hi' ? 'व्यवसाय, मशीनरी ऋण' : 'Business, Machinery Loans'
        },
        {
          label: locale === 'hi' ? 'सेवाएं' : 'Services',
          icon: '⚙️',
          href: `/${locale}/business/services`,
          description: locale === 'hi' ? 'व्यापार वित्त सेवाएं' : 'Trade Finance Services'
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
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100">
        <div className="px-4 py-4 space-y-4">
          {/* Personal Banking */}
          <div className="bg-gradient-to-r from-bank-blue-50 to-bank-blue-100 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">{navigationStructure.personal.icon}</span>
              <h3 className="text-lg font-bold text-bank-blue-900">
                {navigationStructure.personal.label}
              </h3>
            </div>
            <div className="space-y-2">
              {navigationStructure.personal.subItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-bank-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-white hover:text-bank-blue-600 hover:shadow-sm'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Business Banking */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">{navigationStructure.business.icon}</span>
              <h3 className="text-lg font-bold text-green-900">
                {navigationStructure.business.label}
              </h3>
            </div>
            <div className="space-y-2">
              {navigationStructure.business.subItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-white hover:text-green-600 hover:shadow-sm'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Links */}
          <div className="space-y-2">
            <Link
              href={`/${locale}/digital-banking`}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(`/${locale}/digital-banking`)
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
              }`}
            >
              <span className="text-lg">📱</span>
              <span className="font-semibold">{locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking'}</span>
            </Link>

            <Link
              href={`/${locale}/contact`}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(`/${locale}/contact`)
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
            >
              <span className="text-lg">📞</span>
              <span className="font-semibold">{locale === 'hi' ? 'संपर्क करें' : 'Contact'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className={`${isMobile ? 'flex flex-col space-y-1' : 'flex items-center space-x-2'} nav-updated-2024`}>
      {/* Personal Banking Dropdown */}
      <div 
        className={`${isMobile ? '' : 'relative'}`}
        ref={(el) => { dropdownRefs.current.personal = el; }}
      >
        <button
          onClick={() => handleDropdownToggle('personal')}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
            isActive(navigationStructure.personal.href)
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
              : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700'
          } ${isMobile ? 'mb-3 w-full justify-start' : ''}`}
        >
          <span className="text-lg">{navigationStructure.personal.icon}</span>
          <span>{navigationStructure.personal.label}</span>
          {!isMobile && (
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'personal' ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
        
        {activeDropdown === 'personal' && !isMobile && (
          <div className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden z-50 animate-fadeIn">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{navigationStructure.personal.icon}</span>
                <div>
                  <h3 className="font-bold text-lg">{navigationStructure.personal.label}</h3>
                  <p className="text-blue-100 text-sm">
                    {locale === 'hi' ? 'आपकी वित्तीय जरूरतों के लिए' : 'For your financial needs'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2">
              {navigationStructure.personal.subItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-start space-x-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-bank-blue-50 text-bank-blue-700 border-l-4 border-bank-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
                  }`}
                  onClick={() => setActiveDropdown(null)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm group-hover:text-bank-blue-600 transition-colors duration-200">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-bank-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Business Banking Dropdown */}
      <div 
        className={`${isMobile ? '' : 'relative'}`}
        ref={(el) => { dropdownRefs.current.business = el; }}
      >
        <button
          onClick={() => handleDropdownToggle('business')}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
            isActive(navigationStructure.business.href)
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/25'
              : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700'
          } ${isMobile ? 'mb-3 w-full justify-start' : ''}`}
        >
          <span className="text-lg">{navigationStructure.business.icon}</span>
          <span>{navigationStructure.business.label}</span>
          {!isMobile && (
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'business' ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
        
        {activeDropdown === 'business' && !isMobile && (
          <div className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden z-50 animate-fadeIn">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{navigationStructure.business.icon}</span>
                <div>
                  <h3 className="font-bold text-lg">{navigationStructure.business.label}</h3>
                  <p className="text-green-100 text-sm">
                    {locale === 'hi' ? 'आपके व्यवसाय के लिए' : 'For your business growth'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2">
              {navigationStructure.business.subItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-start space-x-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
                  }`}
                  onClick={() => setActiveDropdown(null)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm group-hover:text-green-600 transition-colors duration-200">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Other Links */}
      <Link
        href={`/${locale}/digital-banking`}
        className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
          isActive(`/${locale}/digital-banking`)
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25'
            : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:text-purple-700'
        } ${isMobile ? 'mb-3' : ''}`}
        onClick={() => {
          if (isMobile && onClose) {
            onClose();
          }
        }}
      >
        <span className="text-lg">📱</span>
        <span>{locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking'}</span>
      </Link>

      <Link
        href={`/${locale}/contact`}
        className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
          isActive(`/${locale}/contact`)
            ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg shadow-orange-500/25'
            : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700'
        } ${isMobile ? 'mb-3' : ''}`}
        onClick={() => {
          if (isMobile && onClose) {
            onClose();
          }
        }}
      >
        <span className="text-lg">📞</span>
        <span>{locale === 'hi' ? 'संपर्क करें' : 'Contact'}</span>
      </Link>
    </nav>
  );
};

export default Navigation;
