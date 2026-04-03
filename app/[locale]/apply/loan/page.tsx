'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import InquiryForm from '@/components/forms/InquiryForm';

interface ApplyLoanPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ApplyLoanPage({ params }: ApplyLoanPageProps) {
  const searchParams = useSearchParams();
  const loanType = searchParams.get('type') || 'personal-loan';
  const success = searchParams.get('success');
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  
  React.useEffect(() => {
    params.then((resolvedParams) => {
      const localeValue = resolvedParams.locale;
      setLocale(localeValue as 'en' | 'hi');
    });
  }, [params]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'ऋण आवेदन करें' : 'Apply for Loan'}
          </h1>
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                {locale === 'hi' ? 'आवेदन सफल!' : 'Application Submitted Successfully!'}
              </h2>
              <p className="text-green-700">
                {locale === 'hi' ? 'आपका ऋण आवेदन हम र्प कर लिया है। हम जल्दी में आपसे संपर्क करेंगे.' : 'Your loan application has been received and we will contact you shortly.'}
              </p>
              <button
                onClick={() => router.push(`/${locale}`)}
                className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                {locale === 'hi' ? 'मुख्य पृष्ठ पर जाएं' : 'Go to Homepage'}
              </button>
            </div>
          )}
          {!success && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              {locale === 'hi'
                ? 'अपनी वित्तीय जरूरतों के लिए त्वरित ऋण'
                : 'Quick loans for your financial needs'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Loan Types */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'hi' ? 'ऋण प्रकार' : 'Loan Types'}
            </h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {locale === 'hi' ? 'व्यक्तिगत ऋण' : 'Personal Loan'}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {locale === 'hi' ? 'किसी भी उद्देश्य के लिए ऋण' : 'Loan for any purpose'}
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• {locale === 'hi' ? '10.5% - 14% ब्याज दर' : '10.5% - 14% interest rate'}</li>
                  <li>• {locale === 'hi' ? '₹50,000 - ₹20 लाख' : '₹50,000 - ₹20 Lakhs'}</li>
                  <li>• {locale === 'hi' ? '12 महीने से 5 वर्ष' : '12 months to 5 years'}</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {locale === 'hi' ? 'होम लोन' : 'Home Loan'}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {locale === 'hi' ? 'अपना घर बनाएं' : 'Build your dream home'}
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• {locale === 'hi' ? '8.5% - 10.5% ब्याज दर' : '8.5% - 10.5% interest rate'}</li>
                  <li>• {locale === 'hi' ? '₹5 लाख - ₹2 करोड़' : '₹5 Lakhs - ₹2 Crores'}</li>
                  <li>• {locale === 'hi' ? '5 वर्ष से 30 वर्ष' : '5 years to 30 years'}</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {locale === 'hi' ? 'कार लोन' : 'Car Loan'}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {locale === 'hi' ? 'अपनी कार खरीदें' : 'Buy your dream car'}
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• {locale === 'hi' ? '9% - 12% ब्याज दर' : '9% - 12% interest rate'}</li>
                  <li>• {locale === 'hi' ? '₹1 लाख - ₹25 लाख' : '₹1 Lakh - ₹25 Lakhs'}</li>
                  <li>• {locale === 'hi' ? '1 वर्ष से 7 वर्ष' : '1 year to 7 years'}</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {locale === 'hi' ? 'व्यवसाय ऋण' : 'Business Loan'}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {locale === 'hi' ? 'व्यवसाय विस्तार के लिए' : 'For business expansion'}
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• {locale === 'hi' ? '8.5% - 11% ब्याज दर' : '8.5% - 11% interest rate'}</li>
                  <li>• {locale === 'hi' ? '₹1 लाख - ₹5 करोड़' : '₹1 Lakh - ₹5 Crores'}</li>
                  <li>• {locale === 'hi' ? '1 वर्ष से 15 वर्ष' : '1 year to 15 years'}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'hi' ? 'ऋण आवेदन पत्र' : 'Loan Application Form'}
            </h2>
            <InquiryForm locale={locale} />
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'पात्रता मानदंड' : 'Eligibility Criteria'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'व्यक्तिगत ऋण पात्रता' : 'Personal Loan Eligibility'}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• {locale === 'hi' ? 'आयु: 21 - 60 वर्ष' : 'Age: 21 - 60 years'}</li>
                <li>• {locale === 'hi' ? 'न्यूनतम आय: ₹15,000/महीना' : 'Minimum income: ₹15,000/month'}</li>
                <li>• {locale === 'hi' ? 'कार्य अनुभव: 1 वर्ष' : 'Work experience: 1 year'}</li>
                <li>• {locale === 'hi' ? 'क्रेडिट स्कोर: 650+' : 'Credit score: 650+'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'व्यवसाय ऋण पात्रता' : 'Business Loan Eligibility'}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• {locale === 'hi' ? 'व्यवसाय अनुभव: 2 वर्ष' : 'Business experience: 2 years'}</li>
                <li>• {locale === 'hi' ? 'वार्षिक टर्नओवर: ₹10 लाख+' : 'Annual turnover: ₹10 Lakhs+'}</li>
                <li>• {locale === 'hi' ? 'आईटीआर रिटर्न: 2 वर्ष' : 'ITR returns: 2 years'}</li>
                <li>• {locale === 'hi' ? 'बैंक स्टेटमेंट: 6 महीने' : 'Bank statement: 6 months'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
