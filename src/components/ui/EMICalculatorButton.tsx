'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface EMICalculatorButtonProps {
  locale: 'en' | 'hi';
  className?: string;
}

const EMICalculatorButton: React.FC<EMICalculatorButtonProps> = ({ locale, className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(`/${locale}/calculator`);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-gray-100 text-gray-700 px-6 py-3 rounded-button font-medium hover:bg-gray-200 hover:text-gray-900 transition-colors duration-200 ${className}`}
      aria-label={locale === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator'}
    >
      {locale === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator'}
    </button>
  );
};

export default EMICalculatorButton;
