'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface UPIApp {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  downloadUrl: string;
  category: string;
  categoryHi: string;
  features: string[];
  featuresHi: string[];
}

interface UPIQRServicesProps {
  locale: 'en' | 'hi';
}

const UPIQRServices: React.FC<UPIQRServicesProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [apps, setApps] = useState<UPIApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('UPI & QR Services', locale === 'hi' ? 'यूपीआई और क्यूआर सेवाएं' : 'UPI & QR Services');
    fetchUPIApps();
  }, [locale]);

  const fetchUPIApps = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/digital-services/upi-qr?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setApps(result.data.apps);
      }
    } catch (error) {
      console.error('Error fetching UPI apps:', error);
      setApps(getStaticApps());
    } finally {
      setLoading(false);
    }
  };

  const getStaticApps = (): UPIApp[] => {
    return [
      {
        id: '1',
        name: 'BHIM',
        nameHi: 'भीम',
        description: 'Bharat Interface for Money - Unified payment interface for all banks',
        descriptionHi: 'भारत इंटरफेस फॉर मनी - सभी बैंकों के लिए एकीकृत भुगतान',
        icon: 'smartphone',
        downloadUrl: '/downloads/bhim-app',
        category: 'payment',
        categoryHi: 'भुगतान',
        features: ['Send Money', 'Receive Money', 'Check Balance', 'Transaction History'],
        featuresHi: ['पैसा भेजें', 'पैसा प्राप्त', 'शेष जांचें', 'लेनदेन इतिहास']
      },
      {
        id: '2',
        name: 'PhonePe',
        nameHi: 'फोनपे',
        description: 'Digital payments and financial services app',
        descriptionHi: 'डिजिटल भुगतान और वित्तीय सेवाएं ऐप',
        icon: 'credit-card',
        downloadUrl: '/downloads/phonepe-app',
        category: 'payment',
        categoryHi: 'भुगतान',
        features: ['Mobile Recharge', 'Bill Payments', 'Investment', 'Insurance'],
        featuresHi: ['मोबाइल रिचार्ज', 'बिल भुगतान', 'निवेश', 'बीमा']
      },
      {
        id: '3',
        name: 'Paytm',
        nameHi: 'पेटीएम',
        description: 'Complete digital payment and financial services platform',
        descriptionHi: 'पूर्ण डिजिटल भुगतान और वित्तीय सेवाएं प्लेटफॉर्म',
        icon: 'wallet',
        downloadUrl: '/downloads/paytm-app',
        category: 'payment',
        categoryHi: 'भुगतान',
        features: ['Wallet', 'UPI Payments', 'Bill Payments', 'Shopping'],
        featuresHi: ['वॉलेट', 'यूपीआई भुगतान', 'बिल भुगतान', 'खरीदारी']
      },
      {
        id: '4',
        name: 'Google Pay',
        nameHi: 'गूगल पे',
        description: 'Simple and secure payments app',
        descriptionHi: 'सरल और सुरक्षित भुगतान ऐप',
        icon: 'smartphone',
        downloadUrl: '/downloads/google-pay-app',
        category: 'payment',
        categoryHi: 'भुगतान',
        features: ['Send Money', 'Pay Bills', 'Mobile Recharge', 'Shop Online'],
        featuresHi: ['पैसा भेजें', 'बिल भुगतान', 'मोबाइल रिचार्ज', 'ऑनलाइन खरीदारी']
      }
    ];
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
            {locale === 'hi' ? 'यूपीआई और क्यूआर सेवाएं' : 'UPI & QR Services'}
          </h1>
          <p className="text-xl max-w-3xl">
            {locale === 'hi' 
              ? 'सभी प्रमुख यूपीआई ऐप्स और क्यूआर भुगतान सेवाएं'
              : 'All major UPI apps and QR payment services'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-bank-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-bank-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === 'hi' ? app.nameHi : app.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi' ? app.descriptionHi : app.description}
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {locale === 'hi' ? 'विशेष' : 'Features'}
                </h4>
                <ul className="space-y-1">
                  {(locale === 'hi' ? app.featuresHi : app.features).map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-2">
                <a
                  href={app.downloadUrl}
                  className="btn-primary flex-1 text-center"
                >
                  {locale === 'hi' ? 'डाउनलोड करें' : 'Download'}
                </a>
                <a
                  href={`/digital-services/upi-qr/guide`}
                  className="btn-outline border-bank-blue-600 text-bank-blue-600 hover:bg-bank-blue-50"
                >
                  {locale === 'hi' ? 'गाइड' : 'Guide'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UPIQRServices;
