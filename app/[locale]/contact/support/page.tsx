'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface SupportPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function SupportPage({ params }: SupportPageProps) {
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    const initLocale = async () => {
      const { locale: localeParam } = await params;
      const localeTyped = localeParam as 'en' | 'hi';
      setLocale(localeTyped);
      trackPageView('Customer Support', localeTyped === 'hi' ? 'ग्राहक सहायता' : 'Customer Support');
    };
    initLocale();
  }, [params]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {locale === 'hi' ? 'ग्राहक सहायता' : 'Customer Support'}
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {locale === 'hi' ? '24/7 ग्राहक सहायता' : '24/7 Customer Support'}
            </h2>
            <p className="text-gray-600 mb-6">
              {locale === 'hi' 
                ? 'हम आपकी सहायता के लिए 24/7 उपलब्ध हैं। किसी भी प्रश्न या समस्या के लिए हमसे संपर्क करें।'
                : 'We are available 24/7 to assist you. Contact us for any questions or issues.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'hi' ? 'टोल-फ्री नंबर' : 'Toll-Free Number'}
                </h3>
                <p className="text-2xl font-bold text-blue-600">1800-123-4567</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'hi' ? 'ईमेल समर्थन' : 'Email Support'}
                </h3>
                <p className="text-lg text-blue-600">support@mnsbankbhopal.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">
              {locale === 'hi' ? 'शिकायत निवारण' : 'Grievance Redressal'}
            </h2>
            <p className="text-gray-600 mb-6">
              {locale === 'hi' 
                ? 'यदि आपकी कोई शिकायत है, तो कृपया हमारे ग्राहक सेवा केंद्र से संपर्क करें।'
                : 'If you have any complaints, please contact our customer service center.'
              }
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                {locale === 'hi' ? 'शिकायत अधिकारी' : 'Grievance Officer'}
              </h3>
              <p className="text-gray-700">
                {locale === 'hi' ? 'श्री/श्रीमति [नाम]' : 'Mr./Ms. [Name]'}
              </p>
              <p className="text-gray-700">
                {locale === 'hi' ? 'फोन: 0755-1234567' : 'Phone: 0755-1234567'}
              </p>
              <p className="text-gray-700">
                {locale === 'hi' ? 'ईमेल: grievance@mnsbankbhopal.com' : 'Email: grievance@mnsbankbhopal.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
