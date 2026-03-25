'use client';

import React from 'react';

interface NetBankingButtonProps {
  href: string;
  className?: string;
}

const NetBankingButton: React.FC<NetBankingButtonProps> = ({ href, className = '' }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-bank-blue-600 text-white px-6 py-3 rounded-button font-medium hover:bg-bank-blue-700 transition-colors duration-200 ${className}`}
      aria-label="Net Banking"
    >
      Net Banking
    </a>
  );
};

export default NetBankingButton;
