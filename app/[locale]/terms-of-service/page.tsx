'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface TermsOfServicePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function TermsOfServicePage({ params }: TermsOfServicePageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {localeTyped === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {localeTyped === 'hi' ? 'सेवाओं की स्वीकृति' : 'Service Acceptance'}
              </h2>
              <p>
                {localeTyped === 'hi' 
                  ? 'हमारी सेवाओं का उपयोग करके, आप इन शर्तों से सहमत होते हैं।'
                  : 'By using our services, you agree to these terms.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                {localeTyped === 'hi' ? 'खाता जिम्मेदारियां' : 'Account Responsibilities'}
              </h2>
              <p>
                {localeTyped === 'hi' 
                  ? 'आप अपने खाते की सुरक्षा और गोपनीयता के लिए जिम्मेदार हैं।'
                  : 'You are responsible for the security and privacy of your account.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                {localeTyped === 'hi' ? 'लेनदेन' : 'Transactions'}
              </h2>
              <p>
                {localeTyped === 'hi' 
                  ? 'सभी लेनदेन भारतीय बैंकिंग नियमों के अधीन हैं।'
                  : 'All transactions are subject to Indian banking regulations.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                {localeTyped === 'hi' ? 'सेवा शुल्क' : 'Service Fees'}
              </h2>
              <p>
                {localeTyped === 'hi' 
                  ? 'कुछ सेवाओं के लिए शुल्क लागू हो सकते हैं।'
                  : 'Fees may apply to certain services.'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
