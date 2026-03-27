import React from 'react';
import { Metadata } from 'next';
import ServiceCard from '@/components/digital/ServiceCard';
import HowToGuide from '@/components/digital/HowToGuide';
import DownloadVerification from '@/components/digital/DownloadVerification';

interface DigitalBankingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: DigitalBankingPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'डिजिटल बैंकिंग - महानगर नागरिक सहकारी बैंक'
      : 'Digital Banking - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'डिजिटल बैंकिंग सेवाएं - मोबाइल बैंकिंग, इंटरनेट बैंकिंग'
      : 'Digital Banking Services - Mobile Banking, Internet Banking',
  };
}

export default async function DigitalBankingPage({ params }: DigitalBankingPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'किसी भी समय, कहीं भी बैंकिंग - 24/7 सुविधा'
              : 'Bank anytime, anywhere - 24/7 access'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ServiceCard
            service={{
              id: 'mobile-banking',
              title: 'Mobile Banking',
              titleHi: 'मोबाइल बैंकिंग',
              description: 'Manage your accounts with our mobile app',
              descriptionHi: 'हमारे मोबाइल ऐप के साथ अपने खाते प्रबंधित करें',
              icon: 'mobile',
              link: `/${localeTyped}/digital-banking/mobile`,
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
              description: 'Secure banking through our web portal',
              descriptionHi: 'वेब पोर्टल के माध्यम से सुरक्षित बैंकिंग',
              icon: 'web',
              link: `/${localeTyped}/digital-banking/internet`,
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
              description: 'Instant payments and money transfers',
              descriptionHi: 'त्वरित भुगतान और पैसा ट्रांसफर',
              icon: 'upi',
              link: `/${localeTyped}/digital-banking/upi`,
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
              description: 'Easy bill payment services',
              descriptionHi: 'आसान बिल भुगतान सेवाएं',
              icon: 'bills',
              link: `/${locale}/digital-billing/bills`,
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
              description: 'Quick mobile recharge',
              descriptionHi: 'त्वरित मोबाइल रिचार्ज',
              icon: 'recharge',
              link: `/${locale}/digital-billing/recharge`,
              downloadAvailable: false,
              guideAvailable: true
            }}
            locale={localeTyped}
          />
          
          <ServiceCard
            service={{
              id: 'card-services',
              title: 'Card Services',
              titleHi: 'कार्ड सेवाएं',
              description: 'Manage your cards',
              descriptionHi: 'अपने कार्ड प्रबंधित करें',
              icon: 'cards',
              link: `/${locale}/personal/cards`,
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
              title="Download Mobile Banking App"
              titleHi="मोबाइल बैंकिंग ऐप डाउनलोड करें"
              description="Get our mobile banking app on your device"
              descriptionHi="अपने डिवाइस पर हमारा मोबाइल बैंकिंग ऐप प्राप्त करें"
              steps={[
                {
                  id: '1',
                  title: 'Go to App Store',
                  titleHi: 'ऐप स्टोर पर जाएं',
                  description: 'Visit Google Play Store or Apple App Store',
                  descriptionHi: 'Google Play Store या Apple App Store पर जाएं'
                },
                {
                  id: '2',
                  title: 'Search for Mahanager Bank',
                  titleHi: 'महानगर बैंक खोजें',
                  description: 'Search for our official banking app',
                  descriptionHi: 'हमारा आधिकारिक बैंकिंग ऐप खोजें'
                },
                {
                  id: '3',
                  title: 'Download and Install',
                  titleHi: 'डाउनलोड और इंस्टॉल करें',
                  description: 'Download and install the application',
                  descriptionHi: 'एप्लिकेशन डाउनलोड और इंस्टॉल करें'
                }
              ]}
              locale={localeTyped}
            />
            
            <HowToGuide
              title="Internet Banking Registration"
              titleHi="इंटरनेट बैंकिंग पंजीकरण"
              description="Register for online banking services"
              descriptionHi="ऑनलाइन बैंकिंग सेवाओं के लिए पंजीकरण करें"
              steps={[
                {
                  id: '1',
                  title: 'Visit Our Website',
                  titleHi: 'हमारी वेबसाइट पर जाएं',
                  description: 'Go to our official banking website',
                  descriptionHi: 'हमारी आधिकारिक बैंकिंग वेबसाइट पर जाएं'
                },
                {
                  id: '2',
                  title: 'Click on Register',
                  titleHi: 'रजिस्टर पर क्लिक करें',
                  description: 'Find and click the registration button',
                  descriptionHi: 'रजिस्ट्रेशन बटन ढूंढें और क्लिक करें'
                },
                {
                  id: '3',
                  title: 'Fill Details',
                  titleHi: 'विवरण भरें',
                  description: 'Complete the registration form',
                  descriptionHi: 'रजिस्ट्रेशन फॉर्म पूरा करें'
                }
              ]}
              locale={localeTyped}
            />
          </div>
        </div>

        {/* Download Verification */}
        <DownloadVerification 
          downloadUrl="/downloads/mahanagar-mobile-app.apk"
          fileName="MahanagarBankMobile.apk"
          fileSize="15.2 MB"
          checksum="SHA256: a1b2c3d4e5f6..."
          locale={localeTyped}
        />

        {/* Security Features */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'सुरक्षा विशेषताएं' : 'Security Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'दो-चरणीय प्रमाणीकरण' : 'Two-Factor Authentication'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'अतिरिक्त सुरक्षा स्तर' : 'Extra security layer'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'एन्क्रिप्शन' : 'Encryption'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? '256-बिट एन्क्रिप्शन' : '256-bit encryption'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'सुरक्षित लॉगिन' : 'Secure Login'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'सुरक्षित प्रवेश प्रक्रिया' : 'Secure login process'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'तत्काल अलर्ट' : 'Instant Alerts'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'लेनदेन अलर्ट' : 'Transaction alerts'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
