import React from 'react';
import LocaleLayoutClient from './LocaleLayoutClient';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <LocaleLayoutClient locale={localeTyped}>
      {children}
    </LocaleLayoutClient>
  );
}
