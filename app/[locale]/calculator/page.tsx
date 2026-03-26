import React from 'react';
import { Metadata } from 'next';
import CalculatorClient from './CalculatorClient';

interface CalculatorPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'ईएमआई कैलकुलेटर - महानगर नागरिक सहकारी बैंक'
      : 'EMI Calculator - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'ऋण ईएमआई कैलकुलेटर - होम लोन, पर्सनल लोन, कार लोन'
      : 'Loan EMI Calculator - Home Loan, Personal Loan, Car Loan',
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return <CalculatorClient locale={localeTyped} />;
}
