import React from 'react';
import { Metadata } from 'next';
import BusinessAccountsClient from '@/components/business/BusinessAccountsClient';

interface BusinessAccountsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BusinessAccountsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'व्यवसाय खाते - महानगर नागरिक सहकारी बैंक'
      : 'Business Accounts - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'व्यवसाय करेंट खाते और ओवरड्राफ्ट सुविधाएं'
      : 'Business Current Accounts and Overdraft Facilities',
  };
}

export default async function BusinessAccountsPage({ params }: BusinessAccountsPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return <BusinessAccountsClient locale={localeTyped} />;
}
