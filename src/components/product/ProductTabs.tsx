'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

interface ProductTab {
  id: string;
  label: string;
  labelHi?: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface ProductTabsProps {
  locale: 'en' | 'hi';
  tabs: ProductTab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  locale,
  tabs,
  defaultTab,
  onTabChange,
  className = ''
}) => {
  const { t } = useTranslation(locale);
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <div className="container-bank px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <nav 
          aria-label={t('common.productTabs')}
          className="flex space-x-1"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled}
              className={`
                px-6 py-3 text-sm font-medium border-b-2 transition-all duration-200
                ${activeTab === tab.id
                  ? 'text-bank-blue-600 border-bank-blue-600 text-white'
                  : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
                }
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
            >
              <span className="flex items-center">
                {tab.labelHi || tab.label}
                {tab.disabled && (
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.586 6.586a2 2 0 00-3 2.828 2.828 2.828-2.828 2.828-2.828 2.828-6.586z" />
                  </svg>
                )}
              </span>
            </button>
          ))}
        </nav>

        {/* Tab Panels */}
        <div className="mt-6">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={`tabpanel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              className={`
                ${activeTab === tab.id ? 'block' : 'hidden'}
                bg-white rounded-lg shadow-card p-6
              `}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
