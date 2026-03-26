import React from 'react';
import { Metadata } from 'next';
import GrievanceDashboard from '@/components/dashboard/GrievanceDashboard';

interface DashboardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: DashboardPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'डैशबोर्ड - महानगर नागरिक सहकारी बैंक'
      : 'Dashboard - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'आपका बैंकिंग डैशबोर्ड - खाता सारांश, लेनदेन, सेवाएं'
      : 'Your Banking Dashboard - Account Summary, Transactions, Services',
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'अपने खातों और सेवाओं का प्रबंधन करें'
              : 'Manage your accounts and services'}
          </p>
        </div>

        {/* Dashboard Component */}
        <GrievanceDashboard locale={localeTyped} />
      </div>
    </div>
  );
}
