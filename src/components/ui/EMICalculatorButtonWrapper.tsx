'use client';

import dynamic from 'next/dynamic';
import React from 'react';

interface EMICalculatorButtonWrapperProps {
  locale: 'en' | 'hi';
  className?: string;
}

// Dynamic import with no SSR to prevent hydration mismatch
const EMICalculatorButtonDynamic = dynamic(
  () => import('./EMICalculatorButton').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 animate-pulse">
        Loading...
      </div>
    )
  }
);

const EMICalculatorButtonWrapper: React.FC<EMICalculatorButtonWrapperProps> = ({ locale, className }) => {
  return <EMICalculatorButtonDynamic locale={locale} className={className} />;
};

export default EMICalculatorButtonWrapper;
