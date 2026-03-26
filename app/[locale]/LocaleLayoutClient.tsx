'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import PageTransition from '@/components/global/PageTransition';

interface LocaleLayoutClientProps {
  locale: 'en' | 'hi';
  children: React.ReactNode;
}

export default function LocaleLayoutClient({ locale, children }: LocaleLayoutClientProps) {
  const pathname = usePathname();
  
  return (
    <div className="layout-stable">
      <Header locale={locale} />
      <main className="main-content content-stable">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
