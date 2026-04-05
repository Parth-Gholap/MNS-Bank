'use client';

import React, { useState } from 'react';
import { Metadata } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import InquiryForm from '@/components/forms/InquiryForm';

interface ApplyAccountPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ApplyAccountPage({ params }: ApplyAccountPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  const searchParams = useSearchParams();
  const success = searchParams.get('success') || undefined;
  const router = useRouter();

  return <ApplyAccountPageClient locale={localeTyped} success={success} />;
}

function ApplyAccountPageClient({ locale, success }: { locale: 'en' | 'hi', success?: string }) {
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const handleAccountSelect = (accountType: string) => {
    setSelectedAccount(accountType);
    // Navigate to application form with pre-selected account type
    router.push(`/${locale}/apply/account/application?type=${accountType}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'खाता खोलें' : 'Open Account'}
          </h1>
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                {locale === 'hi' ? 'आवेदन सफल!' : 'Application Submitted Successfully!'}
              </h2>
              <p className="text-green-700">
                {locale === 'hi' ? 'आपका आवेदन हम र्प कर लिए हैं और जल्दी में संपर्क करेंगे.' : 'Your application has been received and we will contact you shortly.'}
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
                ? 'कुछ ही क्षणों में अपना बैंक खाता खोलें'
                : 'Open your bank account in minutes'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Types */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'hi' ? 'खाता प्रकार' : 'Account Types'}
            </h2>
            <div className="space-y-4">
              <div className={`border rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 ${selectedAccount === 'savings' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {locale === 'hi' ? 'बचत खाता' : 'Savings Account'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {locale === 'hi' ? 'दैनिक बचत के लिए आदर्श' : 'Ideal for daily savings'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAccountSelect('savings')}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
                  </button>
                </div>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• {locale === 'hi' ? '3.5% - 4% ब्याज दर' : '3.5% - 4% interest rate'}</li>
                  <li>• {locale === 'hi' ? 'न्यूनतम शेष नहीं' : 'No minimum balance'}</li>
                  <li>• {locale === 'hi' ? 'डेबिट कार्ड निःशुल्क' : 'Free debit card'}</li>
                </ul>
              </div>
              
              <div className={`border rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 ${selectedAccount === 'current' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {locale === 'hi' ? 'चालू खाता' : 'Current Account'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {locale === 'hi' ? 'व्यवसाय लेनदेन के लिए' : 'For business transactions'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAccountSelect('current')}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
                  </button>
                </div>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• {locale === 'hi' ? 'असीमित लेनदेन' : 'Unlimited transactions'}</li>
                  <li>• {locale === 'hi' ? 'ओवरड्राफ्ट सुविधा' : 'Overdraft facility'}</li>
                  <li>• {locale === 'hi' ? 'चेकबुक सुविधा' : 'Chequebook facility'}</li>
                </ul>
              </div>
              
              <div className={`border rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 ${selectedAccount === 'senior' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {locale === 'hi' ? 'वरिष्ठ नागरिक खाता' : 'Senior Citizen Account'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {locale === 'hi' ? 'वरिष्ठ नागरिकों के लिए विशेष' : 'Special for senior citizens'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAccountSelect('senior')}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
                  </button>
                </div>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• {locale === 'hi' ? 'उच्च ब्याज दरें' : 'Higher interest rates'}</li>
                  <li>• {locale === 'hi' ? 'न्यूनतम शेष छूट' : 'Minimum balance waiver'}</li>
                  <li>• {locale === 'hi' ? 'प्राथमिकता सेवा' : 'Priority service'}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'hi' ? 'आवेदन पत्र' : 'Application Form'}
            </h2>
            {selectedAccount && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  {locale === 'hi' ? 'चयनित खाता प्रकार: ' : 'Selected account type: '}
                  <span className="font-semibold">
                    {selectedAccount === 'savings' ? (locale === 'hi' ? 'बचत खाता' : 'Savings Account') :
                     selectedAccount === 'current' ? (locale === 'hi' ? 'चालू खाता' : 'Current Account') :
                     (locale === 'hi' ? 'वरिष्ठ नागरिक खाता' : 'Senior Citizen Account')}
                  </span>
                </p>
              </div>
            )}
            <InquiryForm locale={locale} />
          </div>
        </div>

        {/* Documents Required */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'आवश्यक दस्तावेज' : 'Documents Required'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'व्यक्तिगत दस्तावेज' : 'Personal Documents'}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• {locale === 'hi' ? 'पासपोर्ट आकार का फोटो' : 'Passport size photo'}</li>
                <li>• {locale === 'hi' ? 'पहचान प्रमाण (आधार/पैन/वोटर आईडी)' : 'ID proof (Aadhaar/PAN/Voter ID)'}</li>
                <li>• {locale === 'hi' ? 'पता प्रमाण (बिजली बिल/टेलीफोन बिल)' : 'Address proof (Electricity/Telephone bill)'}</li>
                <li>• {locale === 'hi' ? 'जन्म प्रमाण पत्र' : 'Birth certificate'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'अन्य दस्तावेज' : 'Other Documents'}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• {locale === 'hi' ? 'आय प्रमाण पत्र' : 'Income proof'}</li>
                <li>• {locale === 'hi' ? 'व्यावसाय प्रमाण (यदि लागू हो)' : 'Business proof (if applicable)'}</li>
                <li>• {locale === 'hi' ? 'पैन कार्ड' : 'PAN card'}</li>
                <li>• {locale === 'hi' ? 'हस्ताक्षर प्रमाण' : 'Signature proof'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
