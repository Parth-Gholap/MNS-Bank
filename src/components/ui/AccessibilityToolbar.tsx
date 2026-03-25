'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

interface AccessibilityToolbarProps {
  onIncreaseText?: () => void;
  onDecreaseText?: () => void;
  onHighContrast?: () => void;
  onReset?: () => void;
}

const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  onIncreaseText,
  onDecreaseText,
  onHighContrast,
  onReset
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleTextSize = (action: 'increase' | 'decrease') => {
    if (action === 'increase' && onIncreaseText) {
      onIncreaseText();
    } else if (action === 'decrease' && onDecreaseText) {
      onDecreaseText();
    }
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
        aria-label={t('accessibility.openMenu')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 5a.01 0 013 0 013-1 0 011-1.5-1.5-1.5-1.5h-4.5a1.5 1.5 0 011-1.5 0 011-1.5zm1.5 0a1.5 1.5 0 011-1.5 0 011-1.5c-.839.084-1.504-.839.084a1.5 1.5 0 011-1.5 0 011-1.5zm10 3.428a1.5 1.5 0 011-1.5c-.839.084-1.504-.839.084a1.5 1.5 0 011-1.5 0 011-1.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18m-18-6V6a2 2 0 01-2h4a2 2 0 01-2z" />
        </svg>
      </button>

      {/* Toolbar Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-bank border border-gray-200 z-dropdown">
          <div className="p-4 space-y-3">
            {/* Text Size Controls */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900 mb-2">
                {t('accessibility.textSize')}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleTextSize('decrease')}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                  aria-label={t('accessibility.decreaseText')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h12a2 2 0 01-2v-2a2 2 0 01-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleTextSize('increase')}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                  aria-label={t('accessibility.increaseText')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h12a2 2 0 01-2v2a2 2 0 01-2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900 mb-2">
                {t('accessibility.highContrast')}
              </p>
              <button
                onClick={() => onHighContrast?.()}
                className="w-full p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-label={t('accessibility.highContrast')}
              >
                High Contrast
              </button>
            </div>

            {/* Reset */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900 mb-2">
                {t('accessibility.reset')}
              </p>
              <button
                onClick={() => onReset?.()}
                className="w-full p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-label={t('accessibility.reset')}
              >
                {t('accessibility.reset')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityToolbar;
