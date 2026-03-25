'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface ATMLocatorProps {
  locale: 'en' | 'hi';
}

const ATMServices: React.FC<ATMLocatorProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [atms, setAtms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('ATM Services', locale === 'hi' ? 'एटीएम सेवाएं' : 'ATM Services');
    fetchATMs();
  }, [locale]);

  const fetchATMs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/digital-services/atm?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setAtms(result.data.atms);
      }
    } catch (error) {
      console.error('Error fetching ATMs:', error);
      setAtms([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bank-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'hi' ? 'एटीएम सेवाएं' : 'ATM Services'}
          </h1>
          <p className="text-xl max-w-3xl">
            {locale === 'hi' 
              ? 'निकटतम एटीएम खोजें और नकद निकासी सेवाओं का उपयोग करें'
              : 'Find nearest ATMs and use cash withdrawal services'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'एटीएम लोकेटर' : 'ATM Locator'}
          </h2>
          <p className="text-gray-600 mb-6">
            {locale === 'hi' 
              ? 'अपने निकटतम एटीएम खोजने के लिए अपना स्थान दर्ज करें'
              : 'Enter your location to find nearest ATMs'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder={locale === 'hi' ? 'अपना स्थान दर्ज करें' : 'Enter your location'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
              />
              <button className="btn-primary mt-4 w-full">
                {locale === 'hi' ? 'एटीएम खोजें' : 'Find ATMs'}
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'एटीएम सेवाएं' : 'ATM Services'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {locale === 'hi' ? 'नकद निकासी' : 'Cash Withdrawal'}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {locale === 'hi' ? 'शेष जांच' : 'Balance Inquiry'}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {locale === 'hi' ? 'मिनी स्टेटमेंट' : 'Mini Statement'}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {locale === 'hi' ? 'पिन बदलना' : 'PIN Change'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATMServices;
