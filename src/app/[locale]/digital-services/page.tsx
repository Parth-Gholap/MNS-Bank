'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface DigitalService {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  link: string;
  category: string;
  categoryHi: string;
  featured: boolean;
  downloadAvailable: boolean;
  guideAvailable: boolean;
}

interface DigitalServicesProps {
  locale: 'en' | 'hi';
}

const DigitalServices: React.FC<DigitalServicesProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [services, setServices] = useState<DigitalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    trackPageView('Digital Services', locale === 'hi' ? 'डिजिटल सेवाएं' : 'Digital Services');
    fetchServices();
  }, [locale]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/digital-services?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setServices(result.data.services);
      }
    } catch (error) {
      console.error('Error fetching digital services:', error);
      // Fallback to static services
      setServices(getStaticServices());
    } finally {
      setLoading(false);
    }
  };

  const getStaticServices = (): DigitalService[] => {
    return [
      {
        id: 'upi-qr',
        title: 'UPI & QR Services',
        titleHi: 'यूपीआई और क्यूआर सेवाएं',
        description: 'Unified Payments Interface and QR code-based payments for instant money transfers',
        descriptionHi: 'तुरंत पैसा ट्रांसफर और क्यूआर कोड-आधारित भुगतान के लिए तत्काल धनर हस्तांतर',
        icon: 'qr-code',
        link: '/digital-services/upi-qr',
        category: 'payments',
        categoryHi: 'भुगतान',
        featured: true,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'bbps',
        title: 'BBPS Bill Payments',
        titleHi: 'बीबीपीएस बिल भुगतान',
        description: 'Bharat Bill Payment System for utility bill payments across India',
        descriptionHi: 'भारत बिल भुगतान प्रणाली भारत भर में उपयोगिता बिल भुगतान के लिए',
        icon: 'receipt',
        link: '/digital-services/bbps',
        category: 'payments',
        categoryHi: 'भुगतान',
        featured: true,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'mobile-banking',
        title: 'Mobile Banking',
        titleHi: 'मोबाइल बैंकिंग',
        description: 'Complete mobile banking app for account management and transactions',
        descriptionHi: 'खाता प्रबंधन और लेनदेन के लिए पूर्ण मोबाइल बैंकिंग ऐप',
        icon: 'smartphone',
        link: '/digital-services/mobile-banking',
        category: 'banking',
        categoryHi: 'बैंकिंग',
        featured: true,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'atm-services',
        title: 'ATM Services',
        titleHi: 'एटीएम सेवाएं',
        description: 'ATM locator, card management, and cash withdrawal services',
        descriptionHi: 'एटीएम लोकेटर, कार्ड प्रबंधन, और नकद निकासी सेवाएं',
        icon: 'credit-card',
        link: '/digital-services/atm',
        category: 'banking',
        categoryHi: 'बैंकिंग',
        featured: false,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'cards',
        title: 'Cards Services',
        titleHi: 'कार्ड सेवाएं',
        description: 'Credit and debit card services with online management',
        descriptionHi: 'क्रेडिट और डेबिट कार्ड सेवाओं के साथ ऑनलाइन प्रबंधन',
        icon: 'credit-card',
        link: '/digital-services/cards',
        category: 'banking',
        categoryHi: 'बैंकिंग',
        featured: false,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'imps',
        title: 'IMPS Services',
        titleHi: 'आईएमपीएस सेवाएं',
        description: 'Immediate Payment Service for 24/7 money transfers',
        descriptionHi: '24/7 धन हस्तांतर के लिए तत्काल पैसा ट्रांसफर सेवा',
        icon: 'arrow-circle-right',
        link: '/digital-services/imps',
        category: 'payments',
        categoryHi: 'भुगतान',
        featured: false,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'sms-banking',
        title: 'SMS Banking',
        titleHi: 'एसएमएस बैंकिंग',
        description: 'Banking services through SMS for basic transactions',
        descriptionHi: 'बुनियादी लेनदेन के लिए एसएमएस के माध्यम से बैंकिंग सेवाएं',
        icon: 'message-square',
        link: '/digital-services/sms',
        category: 'banking',
        categoryHi: 'बैंकिंग',
        featured: false,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'pan-services',
        title: 'PAN Services',
        titleHi: 'पैन सेवाएं',
        description: 'Permanent Account Number services for tax compliance',
        descriptionHi: 'कर अनुपालन के लिए स्थायी खाता संख्या सेवाएं',
        icon: 'file-text',
        link: '/digital-services/pan',
        category: 'services',
        categoryHi: 'सेवाएं',
        featured: false,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'locker-services',
        title: 'Locker Services',
        titleHi: 'लॉकर सेवाएं',
        description: 'Safe deposit locker services for valuables storage',
        descriptionHi: 'मूल्य मूल्यों के सुरक्षित भंडारण के लिए लॉकर सेवाएं',
        icon: 'lock',
        link: '/digital-services/locker',
        category: 'services',
        categoryHi: 'सेवाएं',
        featured: false,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'neft-rtgs',
        title: 'NEFT/RTGS Services',
        titleHi: 'एनईएफटी/आरटीजीएस सेवाएं',
        description: 'National Electronic Fund Transfer and Real Time Gross Settlement',
        descriptionHi: 'राष्ट्रीय इलेक्ट्रॉनिक फंड ट्रांसफर और रियल टाइम ग्रॉस सेटलमेंट',
        icon: 'arrow-right',
        link: '/digital-services/neft-rtgs',
        category: 'payments',
        categoryHi: 'भुगतान',
        featured: false,
        downloadAvailable: true,
        guideAvailable: true
      },
      {
        id: 'pm-schemes',
        title: 'PM Schemes',
        titleHi: 'प्रधानमंत्री योजनाएं',
        description: 'Pradhan Mantri government schemes and financial inclusion programs',
        descriptionHi: 'प्रधानमंत्री सरकार योजनाएं और वित्तीय समावेशन कार्यक्रम',
        icon: 'building',
        link: '/digital-services/pm-schemes',
        category: 'government',
        categoryHi: 'सरकार',
        featured: false,
        downloadAvailable: true,
        guideAvailable: true
      }
    ];
  };

  const categories = [
    { value: 'all', label: 'All Services', labelHi: 'सभी सेवाएं' },
    { value: 'payments', label: 'Payments', labelHi: 'भुगतान' },
    { value: 'banking', label: 'Banking', labelHi: 'बैंकिंग' },
    { value: 'services', label: 'Services', labelHi: 'सेवाएं' },
    { value: 'government', label: 'Government Schemes', labelHi: 'सरकार योजनाएं' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const featuredServices = services.filter(service => service.featured);
  const regularServices = services.filter(service => !service.featured);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bank-blue-600 border-t-transparent"></div>
        <span className="ml-3 text-gray-600">
          {locale === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {locale === 'hi' ? 'डिजिटल सेवाएं' : 'Digital Services'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {locale === 'hi' 
                ? 'बैंकिंग को अगले बनाने के लिए हमारे डिजिटल समाधानों का अन्वेषण करें'
                : 'Experience the future of banking with our comprehensive digital services'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-bank-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {locale === 'hi' ? category.labelHi : category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <div className="bg-bank-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {locale === 'hi' ? 'विशेष सेवाएं' : 'Featured Services'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {locale === 'hi' 
                  ? 'सबसे लोकप्रिय और अनुशचित डिजिटल सेवाएं'
                  : 'Our most popular and essential digital services'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard 
                  key={service.id}
                  service={service}
                  locale={locale}
                  featured={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular Services Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'hi' ? 'सभी सेवाएं' : 'All Services'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {locale === 'hi' 
                ? 'हमारे सभी डिजिटल सेवाओं का अन्वेषण करें'
                : 'Explore our complete range of digital banking services'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard 
                key={service.id}
                service={service}
                locale={locale}
                featured={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: DigitalService;
  locale: 'en' | 'hi';
  featured: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, locale, featured }) => {
  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group ${
      featured ? 'ring-2 ring-bank-blue-500 ring-offset-2' : ''
    }`}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.icon}
          alt={locale === 'hi' ? service.titleHi : service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {locale === 'hi' ? 'विशेष' : 'Featured'}
          </div>
        )}

        {/* Download/Guide Badges */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {service.downloadAvailable && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {locale === 'hi' ? 'डाउनलोड' : 'Download'}
            </div>
          )}
          {service.guideAvailable && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {locale === 'hi' ? 'गाइड' : 'Guide'}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {locale === 'hi' ? service.titleHi : service.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {locale === 'hi' ? service.descriptionHi : service.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {service.downloadAvailable && (
              <a
                href={`${service.link}/download`}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 4h.01M15 12a3 3 0 11-6 0 3 3 0 016 0 3 3 0z" />
                </svg>
                {locale === 'hi' ? 'डाउनलोड करें' : 'Download'}
              </a>
            )}
            {service.guideAvailable && (
              <a
                href={`${service.link}/guide`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C12 4.553 10 0 10-4.553S2 4.553 2 10v13m0 13h18" />
                </svg>
                {locale === 'hi' ? 'गाइड देखें' : 'View Guide'}
              </a>
            )}
          </div>

          <a
            href={service.link}
            className="inline-flex items-center px-4 py-2 bg-bank-blue-600 text-white rounded-lg font-medium hover:bg-bank-blue-700 transition-colors duration-200"
          >
            {locale === 'hi' ? 'विवरण देखें' : 'View Details'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DigitalServices;
