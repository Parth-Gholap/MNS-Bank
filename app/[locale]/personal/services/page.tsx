import React from 'react';
import { Metadata } from 'next';
import ServiceCard from '@/components/digital/ServiceCard';
import HowToGuide from '@/components/digital/HowToGuide';

interface PersonalServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PersonalServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'व्यक्तिगत सेवाएं - महानगर नागरिक सहकारी बैंक'
      : 'Personal Services - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'डिजिटल बैंकिंग, भुगतान सेवाएं, और अन्य सेवाएं'
      : 'Digital Banking, Payment Services, and Other Services',
  };
}

export default async function PersonalServicesPage({ params }: PersonalServicesPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'व्यक्तिगत सेवाएं' : 'Personal Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपकी सुविधा के लिए व्यापक बैंकिंग सेवाएं'
              : 'Comprehensive banking services for your convenience'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ServiceCard
            service={{
              id: 'mobile-banking',
              title: 'Mobile Banking',
              titleHi: 'मोबाइल बैंकिंग',
              description: 'Bank anytime, anywhere with our mobile app',
              descriptionHi: 'हमारे मोबाइल ऐप के साथ कहीं भी बैंकिंग करें',
              icon: 'mobile',
              link: `/${locale}/digital-banking`,
              downloadAvailable: true,
              guideAvailable: true
            }}
            locale={localeTyped}
          />
          
          <ServiceCard
            service={{
              id: 'internet-banking',
              title: 'Internet Banking',
              titleHi: 'इंटरनेट बैंकिंग',
              description: 'Secure online banking from your computer',
              descriptionHi: 'अपने कंप्यूटर से सुरक्षित ऑनलाइन बैंकिंग',
              icon: 'web',
              link: `/${locale}/digital-banking`,
              downloadAvailable: false,
              guideAvailable: true
            }}
            locale={localeTyped}
          />
          
          <ServiceCard
            service={{
              id: 'upi-services',
              title: 'UPI Services',
              titleHi: 'यूपीआई सेवाएं',
              description: 'Instant money transfers and payments',
              descriptionHi: 'तत्काल पैसा ट्रांसफर और भुगतान',
              icon: 'upi',
              link: `/${locale}/digital-banking`,
              downloadAvailable: false,
              guideAvailable: true
            }}
            locale={localeTyped}
          />
          
          <ServiceCard
            service={{
              id: 'bill-payments',
              title: 'Bill Payments',
              titleHi: 'बिल भुगतान',
              description: 'Pay your bills conveniently online',
              descriptionHi: 'अपने बिल आसानी से ऑनलाइन भुगतान करें',
              icon: 'bills',
              link: `/${locale}/digital-banking`,
              downloadAvailable: false,
              guideAvailable: true
            }}
            locale={localeTyped}
          />
          
          <ServiceCard
            service={{
              id: 'mobile-recharge',
              title: 'Mobile Recharge',
              titleHi: 'मोबाइल रिचार्ज',
              description: 'Quick mobile recharge for all operators',
              descriptionHi: 'सभी ऑपरेटरों के लिए त्वरित मोबाइल रिचार्ज',
              icon: 'recharge',
              link: `/${locale}/digital-banking`,
              downloadAvailable: false,
              guideAvailable: true
            }}
            locale={localeTyped}
          />
          
          <ServiceCard
            service={{
              id: 'locker-facility',
              title: 'Locker Facility',
              titleHi: 'लॉकर सुविधा',
              description: 'Secure your valuables in bank lockers',
              descriptionHi: 'बैंक लॉकर में अपनी कीमती चीजें सुरक्षित रखें',
              icon: 'locker',
              link: `/${locale}/personal/locker`,
              downloadAvailable: false,
              guideAvailable: true
            }}
            locale={localeTyped}
          />
        </div>

        {/* How to Guide */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'hi' ? 'कैसे शुरू करें' : 'How to Get Started'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HowToGuide
              title="Activate Digital Banking"
              titleHi="डिजिटल बैंकिंग सक्रिय करें"
              description="Start using our digital banking services"
              descriptionHi="हमारी डिजिटल बैंकिंग सेवाओं का उपयोग शुरू करें"
              steps={[
                {
                  id: '1',
                  title: 'Visit Branch',
                  titleHi: 'शाखा में जाएं',
                  description: 'Visit your nearest bank branch',
                  descriptionHi: 'अपनी निकटतम बैंक शाखा में जाएं'
                },
                {
                  id: '2',
                  title: 'Fill Application',
                  titleHi: 'आवेदन पत्र भरें',
                  description: 'Complete the digital banking form',
                  descriptionHi: 'डिजिटल बैंकिंग फॉर्म पूरा करें'
                },
                {
                  id: '3',
                  title: 'Receive Credentials',
                  titleHi: 'क्रेडेंशियल प्राप्त करें',
                  description: 'Get your login credentials',
                  descriptionHi: 'अपने लॉगिन क्रेडेंशियल प्राप्त करें'
                }
              ]}
              locale={localeTyped}
            />
            
            <HowToGuide
              title="Setup UPI Payments"
              titleHi='यूपीआई भुगतान सेटअप करें'
              description="Configure UPI for instant payments"
              descriptionHi="तत्काल भुगतान के लिए यूपीआई कॉन्फिगर करें"
              steps={[
                {
                  id: '1',
                  title: 'Open Banking App',
                  titleHi: 'बैंकिंग ऐप खोलें',
                  description: 'Launch our mobile banking app',
                  descriptionHi: 'हमारा मोबाइल बैंकिंग ऐप खोलें'
                },
                {
                  id: '2',
                  title: 'Go to UPI Section',
                  titleHi: 'यूपीआई सेक्शन पर जाएं',
                  description: 'Navigate to UPI services',
                  descriptionHi: 'यूपीआई सेवाओं पर जाएं'
                },
                {
                  id: '3',
                  title: 'Link Bank Account',
                  titleHi: 'बैंक खाता लिंक करें',
                  description: 'Connect your bank account to UPI',
                  descriptionHi: 'अपना बैंक खाता यूपीआई से जोड़ें'
                }
              ]}
              locale={localeTyped}
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'सभी सेवाओं की विशेषताएं' : 'Features Available on All Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'सुरक्षित' : 'Secure'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'बैंक स्तर सुरक्षा' : 'Bank-level security'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7l7 2 17 17l5 5-11h11l11-9 9-9l-3 10.5 2.5L21 8l-12 2.5L4 7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'तेज़' : 'Fast'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'तत्काल लेनदेन' : 'Instant transactions'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? '24/7' : '24/7'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'हर समय उपलब्ध' : 'Always available'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'सरल' : 'Simple'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'उपयोग में आसान' : 'Easy to use'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
