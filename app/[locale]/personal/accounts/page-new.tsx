import React from 'react';
import { Metadata } from 'next';
import PersonalAccountsClient from '@/components/personal/PersonalAccountsClient';

interface PersonalAccountsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PersonalAccountsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'खाते - महानगर नागरिक सहकारी बैंक'
      : 'Accounts - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'बचत खाते, चालू खाते, विशेष खाते'
      : 'Savings Accounts, Current Accounts, Special Accounts',
  };
}

export default async function PersonalAccountsPage({ params }: PersonalAccountsPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return <PersonalAccountsClient locale={localeTyped} />;
}
