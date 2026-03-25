'use client';

import React from 'react';
import { useTranslation, type Locale } from '@/lib/i18n';

interface LanguageToggleProps {
  currentLocale: Locale;
  onToggle: (locale: Locale) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLocale, onToggle }) => {
  const { t } = useTranslation(currentLocale);
  const otherLocale = currentLocale === 'en' ? 'hi' : 'en';

  return (
    <div className="relative">
      <button
        onClick={() => onToggle(otherLocale)}
        className="flex items-center space-x-2 px-3 py-2 rounded-button text-sm font-medium text-bank-gray-600 hover:text-bank-gray-900 hover:bg-gray-100 transition-colors duration-200"
        aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'हिंदी'}`}
      >
        <div className="flex items-center space-x-1">
          {/* Current Language Icon */}
          <span className="text-base">
            {currentLocale === 'en' ? '🇺🇸🇳' : '🇮🇳'}
          </span>
          
          {/* Language Text */}
          <span className="hidden sm:inline font-medium">
            {currentLocale === 'en' ? 'EN' : 'हिं'}
          </span>
          
          {/* Mobile Full Language Name */}
          <span className="sm:hidden font-medium">
            {currentLocale === 'en' ? 'English' : 'हिंदी'}
          </span>
        </div>
        
        {/* Toggle Icon */}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4 4m0 0a2 2 0 01 2h-4a2 2 0 01-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 4 1 1h6m0 6a1 1 0 011-1h6a1 1 0 011-1z" />
        </svg>
      </button>
      
      {/* Language Indicator */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-bank-blue-600 rounded-full" />
    </div>
  );
};

export default LanguageToggle;
