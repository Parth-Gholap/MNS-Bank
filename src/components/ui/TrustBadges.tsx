'use client';

import React from 'react';
import { config } from '@/lib/config';

interface TrustBadge {
  name: string;
  icon: string;
  url: string;
  alt: string;
}

interface TrustBadgesProps {
  className?: string;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ className = '' }) => {
  const badges: TrustBadge[] = [
    {
      name: 'DICGC Insured',
      icon: '🛡️',
      url: config.dicgcUrl,
      alt: 'Deposit Insurance and Credit Guarantee Corporation'
    },
    {
      name: 'RBI Regulated',
      icon: '🏛️',
      url: config.rbiOmbudsmanUrl,
      alt: 'Reserve Bank of India'
    },
    {
      name: 'NPCI Certified',
      icon: '💳️',
      url: 'https://npci.org.in',
      alt: 'National Payments Corporation of India'
    }
  ];

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {badges.map((badge, index) => (
        <a
          key={index}
          href={badge.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200"
          title={badge.alt}
        >
          <span className="text-xs">{badge.icon}</span>
          <span className="text-xs ml-1">{badge.name}</span>
        </a>
      ))}
    </div>
  );
};

export default TrustBadges;
