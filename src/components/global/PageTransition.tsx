'use client';

import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleExit = () => {
    setIsExiting(true);
  };

  return (
    <div 
      className={`page-transition-wrapper ${className} ${
        isVisible ? 'page-transition-enter-active' : 'page-transition-enter'
      } ${isExiting ? 'page-transition-exit-active' : ''}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
