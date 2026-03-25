'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface BillCategory {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  services: BillService[];
}

interface BillService {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  available: boolean;
}

interface BBPSProps {
  locale: 'en' | 'hi';
}

const BBPS: React.FC<BBPSProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [categories, setCategories] = useState<BillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('BBPS Bill Payments', locale === 'hi' ? 'बीबीपीएस बिल भुगतान' : 'BBPS Bill Payments');
    fetchBillCategories();
  }, [locale]);

  const fetchBillCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/digital-services/bbps?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setCategories(result.data.categories);
      }
    } catch (error) {
      console.error('Error fetching BBPS categories:', error);
      setCategories(getStaticCategories());
    } finally {
      setLoading(false);
    }
  };

  const getStaticCategories = (): BillCategory[] => {
    return [
      {
        id: 'electricity',
        name: 'Electricity Bills',
        nameHi: 'बिजली बिल',
        description: 'Pay electricity bills for all major providers',
        descriptionHi: 'सभी प्रमुख प्रदाताओं के लिए बिजली बिल भुगतान',
        icon: 'zap',
        services: [
          { id: '1', name: 'BSES', nameHi: 'बीएसईएस', description: 'Delhi electricity provider', descriptionHi: 'दिल्ली बिजली प्रदाता', available: true },
          { id: '2', name: 'MSEB', nameHi: 'एमएसईबी', description: 'Maharashtra electricity provider', descriptionHi: 'महाराष्ट्र बिजली प्रदाता', available: true },
          { id: '3', name: 'TNEB', nameHi: 'टीएनईबी', description: 'Tamil Nadu electricity provider', descriptionHi: 'तमिलनाडु बिजली प्रदाता', available: true }
        ]
      },
      {
        id: 'water',
        name: 'Water Bills',
        nameHi: 'जल बिल',
        description: 'Pay water bills for municipal corporations',
        descriptionHi: 'नगर निगमों के लिए जल बिल भुगतान',
        icon: 'droplet',
        services: [
          { id: '1', name: 'Delhi Jal Board', nameHi: 'दिल्ली जल बोर्ड', description: 'Delhi water supply', descriptionHi: 'दिल्ली जल आपूर्ति', available: true },
          { id: '2', name: 'MCGM', nameHi: 'एमसीजीएम', description: 'Mumbai water supply', descriptionHi: 'मुंबई जल आपूर्ति', available: true },
          { id: '3', name: 'BWSSB', nameHi: 'बीडब्ल्यूएसबी', description: 'Bangalore water supply', descriptionHi: 'बैंगलोर जल आपूर्ति', available: true }
        ]
      },
      {
        id: 'gas',
        name: 'Gas Bills',
        nameHi: 'गैस बिल',
        description: 'Pay LPG and piped gas bills',
        descriptionHi: 'एलपीजी और पाइप्ड गैस बिल भुगतान',
        icon: 'flame',
        services: [
          { id: '1', name: 'Indane Gas', nameHi: 'इंडेन गैस', description: 'LPG gas provider', descriptionHi: 'एलपीजी गैस प्रदाता', available: true },
          { id: '2', name: 'Bharat Gas', nameHi: 'भारत गैस', description: 'LPG gas provider', descriptionHi: 'एलपीजी गैस प्रदाता', available: true },
          { id: '3', name: 'HP Gas', nameHi: 'एचपी गैस', description: 'LPG gas provider', descriptionHi: 'एलपीजी गैस प्रदाता', available: true }
        ]
      },
      {
        id: 'telecom',
        name: 'Telecom Bills',
        nameHi: 'दूरसंचार बिल',
        description: 'Pay mobile and broadband bills',
        descriptionHi: 'मोबाइल और ब्रॉडबैंड बिल भुगतान',
        icon: 'smartphone',
        services: [
          { id: '1', name: 'Airtel', nameHi: 'एयरटेल', description: 'Mobile and broadband', descriptionHi: 'मोबाइल और ब्रॉडबैंड', available: true },
          { id: '2', name: 'Jio', nameHi: 'जियो', description: 'Mobile and broadband', descriptionHi: 'मोबाइल और ब्रॉडबैंड', available: true },
          { id: '3', name: 'BSNL', nameHi: 'बीएसएनएल', description: 'Landline and broadband', descriptionHi: 'लैंडलाइन और ब्रॉडबैंड', available: true }
        ]
      },
      {
        id: 'dth',
        name: 'DTH Recharge',
        nameHi: 'डीटीएच रिचार्ज',
        description: 'Recharge DTH services',
        descriptionHi: 'डीटीएच सेवाएं रिचार्ज करें',
        icon: 'tv',
        services: [
          { id: '1', name: 'Tata Sky', nameHi: 'टाटा स्काई', description: 'DTH service provider', descriptionHi: 'डीटीएच सेवा प्रदाता', available: true },
          { id: '2', name: 'Dish TV', nameHi: 'डिश टीवी', description: 'DTH service provider', descriptionHi: 'डीटीएच सेवा प्रदाता', available: true },
          { id: '3', name: 'Airtel DTH', nameHi: 'एयरटेल डीटीएच', description: 'DTH service provider', descriptionHi: 'डीटीएच सेवा प्रदाता', available: true }
        ]
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
            {locale === 'hi' ? 'बीबीपीएस बिल भुगतान' : 'BBPS Bill Payments'}
          </h1>
          <p className="text-xl max-w-3xl">
            {locale === 'hi' 
              ? 'भारत बिल भुगतान प्रणाली के माध्यम से सभी बिल भुगतान'
              : 'Pay all your bills through Bharat Bill Payment System'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-bank-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-bank-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === 'hi' ? category.nameHi : category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi' ? category.descriptionHi : category.description}
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {locale === 'hi' ? 'सेवाएं' : 'Services'}
                </h4>
                <div className="space-y-2">
                  {category.services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">
                        {locale === 'hi' ? service.nameHi : service.name}
                      </span>
                      {service.available ? (
                        <span className="text-green-600">
                          {locale === 'hi' ? 'उपलब्ध' : 'Available'}
                        </span>
                      ) : (
                        <span className="text-red-600">
                          {locale === 'hi' ? 'अनुपलब्ध' : 'Unavailable'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <a
                  href={`/digital-services/bbps/${category.id}/pay`}
                  className="btn-primary flex-1 text-center"
                >
                  {locale === 'hi' ? 'बिल भुगतान करें' : 'Pay Bill'}
                </a>
                <a
                  href={`/digital-services/bbps/${category.id}/guide`}
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

export default BBPS;
