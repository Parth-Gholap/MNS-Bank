'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

interface KFSItem {
  label: string;
  labelHi?: string;
  value: string;
  valueHi?: string;
  description?: string;
  descriptionHi?: string;
}

interface KFSPanelProps {
  locale: 'en' | 'hi';
  title: string;
  titleHi?: string;
  subtitle?: string;
  subtitleHi?: string;
  items: KFSItem[];
  downloadUrl?: string;
  className?: string;
}

const KFSPanel: React.FC<KFSPanelProps> = ({
  locale,
  title,
  titleHi,
  subtitle,
  subtitleHi,
  items,
  downloadUrl,
  className = ''
}) => {
  const { t } = useTranslation(locale);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className={`bg-white rounded-lg shadow-card border border-gray-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {titleHi || title}
            </h3>
            {subtitle && (
              <p className="text-body text-gray-600">
                {subtitleHi || subtitle}
              </p>
            )}
          </div>
          
          <button
            onClick={toggleExpanded}
            className="text-bank-blue-600 hover:text-bank-blue-700 font-medium text-sm transition-colors duration-200"
            aria-expanded={isExpanded}
            aria-controls="kfs-content"
          >
            {isExpanded ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7-7 7a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                {t('common.hide')}
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9m-7-7 7a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                {t('common.show')}
              </>
            )}
          </button>
        </div>

        {/* KFS Content */}
        <div
          id="kfs-content"
          className={`
            ${isExpanded ? 'block' : 'hidden'}
            mt-4 space-y-4
          `}
        >
          {items.map((item, index) => (
            <div key={index} className="border-b border-gray-100 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    {item.labelHi || item.label}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.descriptionHi || item.description}
                  </p>
                </div>
                
                <div className="text-right">
                  <span className="text-2xl font-bold text-bank-blue-600">
                    {item.valueHi || item.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        {downloadUrl && (
          <div className="mt-6 text-center">
            <a
              href={downloadUrl}
              download="kfs.pdf"
              className="btn-secondary inline-block px-6 py-3"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m-6 6H6a2 2 0 00-2 2v6a2 2 0 012-2z" />
              </svg>
              {t('common.download')}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default KFSPanel;
