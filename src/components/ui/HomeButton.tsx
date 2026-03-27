'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface HomeButtonProps {
  locale: 'en' | 'hi';
  className?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ locale, className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(`/${locale}/`);
  };

  const isHomePage = pathname === `/${locale}/` || pathname === `/${locale}`;

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
        isHomePage
          ? 'bg-gradient-to-r from-bank-blue-600 to-bank-blue-700 text-white shadow-lg shadow-bank-blue-500/25'
          : 'text-gray-700 hover:bg-gradient-to-r hover:from-bank-blue-50 hover:to-bank-blue-100 hover:text-bank-blue-700'
      } ${className}`}
      aria-label={locale === 'hi' ? 'मुख पृष्ठ' : 'Home'}
    >
      <span className="text-lg">🏠</span>
      <span>{locale === 'hi' ? 'मुख पृष्ठ' : 'Home'}</span>
    </button>
  );
};

export default HomeButton;
