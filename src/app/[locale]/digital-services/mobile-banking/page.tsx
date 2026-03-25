'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface MobileBankingApp {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  downloadUrl: string;
  features: string[];
  featuresHi: string[];
  rating: number;
  downloads: string;
}

interface MobileBankingProps {
  locale: 'en' | 'hi';
}

const MobileBanking: React.FC<MobileBankingProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [apps, setApps] = useState<MobileBankingApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Mobile Banking', locale === 'hi' ? 'मोबाइल बैंकिंग' : 'Mobile Banking');
    fetchMobileApps();
  }, [locale]);

  const fetchMobileApps = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/digital-services/mobile-banking?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setApps(result.data.apps);
      }
    } catch (error) {
      console.error('Error fetching mobile banking apps:', error);
      setApps(getStaticApps());
    } finally {
      setLoading(false);
    }
  };

  const getStaticApps = (): MobileBankingApp[] => {
    return [
      {
        id: '1',
        name: 'Bank Mobile App',
        nameHi: 'बैंक मोबाइल ऐप',
        description: 'Official mobile banking application',
        descriptionHi: 'आधिकारिक मोबाइल बैंकिंग एप्लिकेशन',
        icon: 'smartphone',
        downloadUrl: '/downloads/bank-mobile-app',
        features: [
          'Account Balance Check',
          'Fund Transfer',
          'Bill Payments',
          'Mobile Recharge',
          'Investment Services'
        ],
        featuresHi: [
          'खाता शेष जांच',
          'धन हस्तांतरण',
          'बिल भुगतान',
          'मोबाइल रिचार्ज',
          'निवेश सेवाएं'
        ],
        rating: 4.5,
        downloads: '1M+'
      },
      {
        id: '2',
        name: 'Bank Business App',
        nameHi: 'बैंक बिजनेस ऐप',
        description: 'Business banking mobile application',
        descriptionHi: 'व्यवसाय बैंकिंग मोबाइल एप्लिकेशन',
        icon: 'briefcase',
        downloadUrl: '/downloads/bank-business-app',
        features: [
          'Business Account Management',
          'Bulk Payments',
          'Salary Disbursement',
          'Trade Finance',
          'Working Capital Loans'
        ],
        featuresHi: [
          'व्यवसाय खाता प्रबंधन',
          'थोक भुगतान',
          'वेतन वितरण',
          'व्यापार वित्त',
          'कार्यशील पूंजी ऋण'
        ],
        rating: 4.3,
        downloads: '500K+'
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
            {locale === 'hi' ? 'मोबाइल बैंकिंग' : 'Mobile Banking'}
          </h1>
          <p className="text-xl max-w-3xl">
            {locale === 'hi' 
              ? 'बैंकिंग सेवाओं तक पहुंचें कहीं भी, कभी भी'
              : 'Access banking services anywhere, anytime'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-card border border-gray-200 overflow-hidden">
              <div className="bg-bank-blue-50 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-bank-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {locale === 'hi' ? app.nameHi : app.name}
                    </h3>
                    <p className="text-gray-600">
                      {locale === 'hi' ? app.descriptionHi : app.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-700 font-medium">{app.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {locale === 'hi' ? 'डाउनलोड' : 'Downloads'}: {app.downloads}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {locale === 'hi' ? 'मुख्य विशेष' : 'Key Features'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(locale === 'hi' ? app.featuresHi : app.features).map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={app.downloadUrl}
                    className="btn-primary flex-1 text-center"
                  >
                    {locale === 'hi' ? 'डाउनलोड करें' : 'Download Now'}
                  </a>
                  <a
                    href={`/digital-services/mobile-banking/${app.id}/guide`}
                    className="btn-outline border-bank-blue-600 text-bank-blue-600 hover:bg-bank-blue-50"
                  >
                    {locale === 'hi' ? 'गाइड' : 'Guide'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-card border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'मोबाइल बैंकिंग के लाभ' : 'Benefits of Mobile Banking'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-bank-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-bank-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? '24/7 पहुंच' : '24/7 Access'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' 
                  ? 'किसी भी समय बैंकिंग सेवाओं तक पहुंचें'
                  : 'Access banking services anytime'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-bank-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-bank-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'सुरक्षित लेनदेन' : 'Secure Transactions'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' 
                  ? 'बैंक-स्तरीय सुरक्षा के साथ सुरक्षित लेनदेन'
                  : 'Bank-level security for all transactions'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-bank-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-bank-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'त्वरित सेवाएं' : 'Instant Services'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' 
                  ? 'तुरंत धन हस्तांतरण और भुगतान'
                  : 'Instant fund transfers and payments'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBanking;
