'use client';

import React from 'react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    titleHi: string;
    description: string;
    descriptionHi: string;
    icon: string;
    link: string;
    downloadAvailable: boolean;
    guideAvailable: boolean;
    featured?: boolean;
  };
  locale: 'en' | 'hi';
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, locale, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group ${
      service.featured ? 'ring-2 ring-bank-blue-500 ring-offset-2' : ''
    } ${className}`}>
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-bank-blue-100 flex items-center justify-center">
          <svg className="w-16 h-16 text-bank-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        
        {/* Featured Badge */}
        {service.featured && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {locale === 'hi' ? 'विशेष' : 'Featured'}
          </div>
        )}

        {/* Download/Guide Badges */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {service.downloadAvailable && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {locale === 'hi' ? 'डाउनलोड' : 'Download'}
            </div>
          )}
          {service.guideAvailable && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {locale === 'hi' ? 'गाइड' : 'Guide'}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {locale === 'hi' ? service.titleHi : service.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {locale === 'hi' ? service.descriptionHi : service.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {service.downloadAvailable && (
              <a
                href={`${service.link}/download`}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 4h.01M15 12a3 3 0 11-6 0 3 3 0 016 0 3 3 0 0z" />
                </svg>
                {locale === 'hi' ? 'डाउनलोड' : 'Download'}
              </a>
            )}
            {service.guideAvailable && (
              <a
                href={`${service.link}/guide`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C12 4.553 10 0 10-4.553S2 4.553 2 10v13m0 13h18" />
                </svg>
                {locale === 'hi' ? 'गाइड' : 'Guide'}
              </a>
            )}
          </div>

          <a
            href={service.link}
            className="inline-flex items-center px-4 py-2 bg-bank-blue-600 text-white rounded-lg font-medium hover:bg-bank-blue-700 transition-colors duration-200 text-sm"
          >
            {locale === 'hi' ? 'विवरण' : 'Details'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
