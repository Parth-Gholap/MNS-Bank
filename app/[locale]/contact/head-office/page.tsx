'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { LocationIcon, PhoneIcon, EmailIcon, TimeIcon } from '@/components/icons';

interface HeadOfficePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function HeadOfficePage({ params }: HeadOfficePageProps) {
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    const initLocale = async () => {
      const { locale: localeParam } = await params;
      const localeTyped = localeParam as 'en' | 'hi';
      setLocale(localeTyped);
      trackPageView('Head Office', localeTyped === 'hi' ? 'मुख्य कार्यालय' : 'Head Office');
    };
    initLocale();
  }, [params]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {locale === 'hi' ? 'मुख्य कार्यालय' : 'Head Office'}
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              {locale === 'hi' ? 'महानगर नागरिक सहकारी बैंक मुख्य कार्यालय' : 'Mahanagar Nagrik Sahakari Bank Head Office'}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <LocationIcon className="text-gray-500 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">
                    {locale === 'hi' ? 'पता' : 'Address'}
                  </h3>
                  <p className="text-gray-700">
                    MP Nagar, Zone-I, Bhopal - 462011<br />
                    Madhya Pradesh, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <PhoneIcon className="text-gray-500 mr-3" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">
                    {locale === 'hi' ? 'फोन' : 'Phone'}
                  </h3>
                  <p className="text-gray-700">0755-1234567, 0755-1234568</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <PhoneIcon className="text-gray-500 mr-3" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">
                    {locale === 'hi' ? 'फैक्स' : 'Fax'}
                  </h3>
                  <p className="text-gray-700">0755-1234569</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <EmailIcon className="text-gray-500 mr-3" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">
                    {locale === 'hi' ? 'ईमेल' : 'Email'}
                  </h3>
                  <p className="text-gray-700">headoffice@mnsbankbhopal.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <TimeIcon className="text-gray-500 mr-3" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">
                    {locale === 'hi' ? 'कार्य समय' : 'Working Hours'}
                  </h3>
                  <p className="text-gray-700">
                    {locale === 'hi' ? 'सोमवार - शुक्रवार: 10:00 पूर्वाह्न - 5:00 अपराह्न' : 'Monday - Friday: 10:00 AM - 5:00 PM'}
                    <br />
                    {locale === 'hi' ? 'शनिवार: 10:00 पूर्वाह्न - 2:00 अपराह्न' : 'Saturday: 10:00 AM - 2:00 PM'}
                    <br />
                    {locale === 'hi' ? 'रविवार: बंद' : 'Sunday: Closed'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              {locale === 'hi' ? 'प्रबंधन टीम' : 'Management Team'}
            </h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">
                  {locale === 'hi' ? 'अध्यक्ष' : 'Chairman'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'hi' ? 'श्री [नाम]' : 'Shri [Name]'}
                </p>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi' ? 'अनुभव: 25+ वर्ष' : 'Experience: 25+ years'}
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">
                  {locale === 'hi' ? 'प्रबंधक निदेशक' : 'Managing Director'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'hi' ? 'श्री [नाम]' : 'Shri [Name]'}
                </p>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi' ? 'अनुभव: 20+ वर्ष' : 'Experience: 20+ years'}
                </p>
              </div>
              
              <div className="pb-4">
                <h3 className="text-lg font-semibold">
                  {locale === 'hi' ? 'मुख्य प्रबंधक' : 'Chief Manager'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'hi' ? 'श्री [नाम]' : 'Shri [Name]'}
                </p>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi' ? 'अनुभव: 15+ वर्ष' : 'Experience: 15+ years'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
