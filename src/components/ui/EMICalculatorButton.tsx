'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface EMICalculatorButtonProps {
  locale: 'en' | 'hi';
  className?: string;
}

const EMICalculatorButton: React.FC<EMICalculatorButtonProps> = ({ locale, className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () => {
    router.push(`/${locale}/calculator`);
  };

  // Use consistent styling to prevent hydration mismatch
  const buttonClasses = `px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
    isMounted && pathname === `/${locale}/calculator` 
      ? 'bg-gradient-to-r from-bank-blue-600 to-bank-blue-700 text-white' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
  } ${className}`;

  return (
    <button
      onClick={handleClick}
      className={buttonClasses}
      aria-label={locale === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator'}
    >
      {locale === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator'}
    </button>
  );
};

export default EMICalculatorButton;
