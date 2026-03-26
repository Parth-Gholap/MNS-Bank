'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface PrivacyPolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {localeTyped === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {localeTyped === 'hi' ? 'जानकारी का संग्रह' : 'Information Collection'}
              </h2>
              <p>
                {localeTyped === 'hi' 
                  ? 'हम आपसे व्यक्तिगत जानकारी एकत्र करते हैं जब आप हमारी सेवाओं का उपयोग करते हैं।'
                  : 'We collect personal information from you when you use our services.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                {localeTyped === 'hi' ? 'जानकारी का उपयोग' : 'Use of Information'}
              </h2>
              <p>
                {localeTyped === 'hi' 
                  ? 'हम आपकी जानकारी का उपयोग सेवाएं प्रदान करने, लेनदेन प्रक्रिया करने और ग्राहक सहायता प्रदान करने के लिए करते हैं।'
                  : 'We use your information to provide services, process transactions, and offer customer support.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                {localeTyped === 'hi' ? 'डेटा सुरक्षा' : 'Data Security'}
              </h2>
              <p>
                {localeTyped === 'hi' 
                  ? 'हम आपकी जानकारी की सुरक्षा के लिए उद्योग मानकों का पालन करते हैं।'
                  : 'We follow industry standards to protect your information.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                {localeTyped === 'hi' ? 'संपर्क' : 'Contact Us'}
              </h2>
              <p>
                {localeTyped === 'hi' 
                  ? 'इस गोपनीयता नीति के बारे में किसी भी प्रश्न के लिए, कृपया हमसे संपर्क करें।'
                  : 'For any questions about this privacy policy, please contact us.'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
