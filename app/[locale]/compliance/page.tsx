import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

interface CompliancePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CompliancePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'अनुपालन और कानूनी - महानगर नागरिक सहकारी बैंक'
      : 'Compliance & Legal - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'बैंकिंग विनियम, नीतियां, और अनुपालन जानकारी'
      : 'Banking regulations, policies, and compliance information',
  };
}

export default async function CompliancePage({ params }: CompliancePageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'अनुपालन और कानूनी' : 'Compliance & Legal'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'बैंकिंग विनियम और अनुपालन जानकारी'
              : 'Banking regulations and compliance information'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Policy Centre */}
          <Link href={`/${locale}/compliance/policy-centre`} className="block">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'नीति केंद्र' : 'Policy Centre'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? 'बैंक की नीतियां और दिशानिर्देश' : 'Bank policies and guidelines'}
              </p>
            </div>
          </Link>

          {/* Privacy Policy */}
          <Link href={`/${locale}/compliance/privacy-policy`} className="block">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? 'डेटा सुरक्षा और गोपनीयता' : 'Data security and privacy'}
              </p>
            </div>
          </Link>

          {/* Grievance Redressal */}
          <Link href={`/${locale}/compliance/grievance-redressal`} className="block">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'शिकायत निवारण' : 'Grievance Redressal'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? 'शिकायतें और समाधान' : 'Complaints and resolutions'}
              </p>
            </div>
          </Link>

          {/* Unclaimed Deposits */}
          <Link href={`/${locale}/compliance/deaf-unclaimed-deposits`} className="block">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'दावा न किए गए जमा' : 'Unclaimed Deposits'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? 'बेमानी जमा राशि' : 'Dormant deposit amounts'}
              </p>
            </div>
          </Link>

          {/* RBI Ombudsman */}
          <Link href={`/${locale}/compliance/rbi-ombudsman`} className="block">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'आरबीआई लोकपाल' : 'RBI Ombudsman'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? 'आरबीआई शिकायत निवारण' : 'RBI complaint resolution'}
              </p>
            </div>
          </Link>

          {/* Banking Regulations */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'बैंकिंग विनियम' : 'Banking Regulations'}
            </h3>
            <p className="text-gray-600">
              {locale === 'hi' ? 'बैंकिंग कानून और नियम' : 'Banking laws and regulations'}
            </p>
          </div>
        </div>

        {/* Important Links */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'महत्वपूर्ण लिंक' : 'Important Links'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'बैंकिंग ओम्बड्समैन' : 'Banking Ombudsman'}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <a href="#" className="text-blue-600 hover:underline">{locale === 'hi' ? 'शिकायत दर्ज करें' : 'File a Complaint'}</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">{locale === 'hi' ? 'शिकायत स्थिति' : 'Complaint Status'}</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">{locale === 'hi' ? 'निर्देशिका' : 'Guidelines'}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'आरबीआई सूचनाएं' : 'RBI Notifications'}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <a href="#" className="text-blue-600 hover:underline">{locale === 'hi' ? 'वित्तीय स्थिरता' : 'Financial Stability'}</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">{locale === 'hi' ? 'ग्राहक सुरक्षा' : 'Customer Protection'}</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">{locale === 'hi' ? 'ब्याज दरें' : 'Interest Rates'}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
