'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface BranchesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function BranchesPage({ params }: BranchesPageProps) {
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    const initLocale = async () => {
      const { locale: localeParam } = await params;
      const localeTyped = localeParam as 'en' | 'hi';
      setLocale(localeTyped);
      trackPageView('Branches', localeTyped === 'hi' ? 'शाखाएं' : 'Branches');
    };
    initLocale();
  }, [params]);

  const branches = [
    {
      name: 'Head Office',
      nameHi: 'मुख्य कार्यालय',
      address: 'MP Nagar, Zone-I, Bhopal - 462011',
      addressHi: 'एमपी नगर, जोन-आई, भोपाल - 462011',
      phone: '0755-1234567',
      email: 'headoffice@mnsbankbhopal.com',
      timings: '10:00 AM - 5:00 PM',
      timingsHi: 'सुबह 10:00 - शाम 5:00'
    },
    {
      name: 'New Market Branch',
      nameHi: 'न्यू मार्केट शाखा',
      address: 'New Market, Bhopal - 462016',
      addressHi: 'न्यू मार्केट, भोपाल - 462016',
      phone: '0755-2345678',
      email: 'newmarket@mnsbankbhopal.com',
      timings: '10:00 AM - 5:00 PM',
      timingsHi: 'सुबह 10:00 - शाम 5:00'
    },
    {
      name: 'Habibganj Branch',
      nameHi: 'हबीबगंज शाखा',
      address: 'Habibganj, Bhopal - 462024',
      addressHi: 'हबीबगंज, भोपाल - 462024',
      phone: '0755-3456789',
      email: 'habibganj@mnsbankbhopal.com',
      timings: '10:00 AM - 5:00 PM',
      timingsHi: 'सुबह 10:00 - शाम 5:00'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'हमारी शाखाएं' : 'Our Branches'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'भोपाल में हमारी सभी शाखाओं का पता और संपर्क जानकारी'
              : 'Find the address and contact information for all our branches in Bhopal'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {locale === 'hi' ? branch.nameHi : branch.name}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-gray-500 mr-2">📍</span>
                  <span className="text-gray-700">
                    {locale === 'hi' ? branch.addressHi : branch.address}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📞</span>
                  <span className="text-gray-700">{branch.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">✉️</span>
                  <span className="text-gray-700 text-sm">{branch.email}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">🕐</span>
                  <span className="text-gray-700">
                    {locale === 'hi' ? branch.timingsHi : branch.timings}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  {locale === 'hi' ? 'नक्शा देखें' : 'View Map'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {locale === 'hi' ? 'सभी शाखाएं' : 'All Branches'}
          </h2>
          <p className="text-gray-700 mb-6">
            {locale === 'hi' 
              ? 'हमारे पास भोपाल में 15+ शाखाएं हैं। निकटतम शाखा खोजने के लिए हमारे शाखा लोकेटर का उपयोग करें।'
              : 'We have 15+ branches across Bhopal. Use our branch locator to find the nearest one.'
            }
          </p>
          <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            {locale === 'hi' ? 'शाखा लोकेटर' : 'Branch Locator'}
          </button>
        </div>
      </div>
    </div>
  );
}
