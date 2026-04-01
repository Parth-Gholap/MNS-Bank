'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface KycCkycPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function KycCkycPage({ params }: KycCkycPageProps) {
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    const initLocale = async () => {
      const { locale: localeParam } = await params;
      const localeTyped = localeParam as 'en' | 'hi';
      setLocale(localeTyped);
      trackPageView('KYC/CKYC', localeTyped === 'hi' ? 'केवाईसी/सीकेवाईसी' : 'KYC/CKYC');
    };
    initLocale();
  }, [params]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {locale === 'hi' ? 'केवाईसी और सीकेवाईसी' : 'KYC and CKYC'}
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              {locale === 'hi' ? 'केवाईसी (अपने ग्राहक को जानें)' : 'KYC (Know Your Customer)'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'hi' ? 'केवाईसी क्या है?' : 'What is KYC?'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {locale === 'hi' 
                    ? 'केवाईसी एक सत्यापन प्रक्रिया है जिसका उद्देश्य ग्राहकों की पहचान सत्यापित करना और वित्तीय अपराधों को रोकना है। यह भारतीय रिज़र्व बैंक (RBI) द्वारा अनिवार्य है।'
                    : 'KYC is a verification process aimed at verifying customer identity and preventing financial crimes. It is mandatory as per Reserve Bank of India (RBI) guidelines.'
                  }
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'hi' ? 'केवाईसी दस्तावेज़' : 'KYC Documents Required'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      {locale === 'hi' ? 'पहचान प्रमाण' : 'Identity Proof'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>{locale === 'hi' ? 'आधार कार्ड' : 'Aadhaar Card'}</li>
                      <li>{locale === 'hi' ? 'पैन कार्ड' : 'PAN Card'}</li>
                      <li>{locale === 'hi' ? 'वोटर आईडी' : 'Voter ID'}</li>
                      <li>{locale === 'hi' ? 'पासपोर्ट' : 'Passport'}</li>
                      <li>{locale === 'hi' ? 'ड्राइविंग लाइसेंस' : 'Driving License'}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      {locale === 'hi' ? 'पता प्रमाण' : 'Address Proof'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>{locale === 'hi' ? 'आधार कार्ड' : 'Aadhaar Card'}</li>
                      <li>{locale === 'hi' ? 'वोटर आईडी' : 'Voter ID'}</li>
                      <li>{locale === 'hi' ? 'पासपोर्ट' : 'Passport'}</li>
                      <li>{locale === 'hi' ? 'यूटिलिटी बिल' : 'Utility Bills'}</li>
                      <li>{locale === 'hi' ? 'बैंक स्टेटमेंट' : 'Bank Statement'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              {locale === 'hi' ? 'सीकेवाईसी (केंद्रीकृत केवाईसी)' : 'CKYC (Central KYC)'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'hi' ? 'सीकेवाईसी क्या है?' : 'What is CKYC?'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {locale === 'hi' 
                    ? 'सीकेवाईसी एक केंद्रीकृत प्रक्रिया है जिसमें ग्राहक का केवाईसी डेटा एक बार सत्यापित होने के बाद सभी वित्तीय संस्थानों के साथ साझा किया जाता है।'
                    : 'CKYC is a centralized process where customer KYC data is verified once and shared across all financial institutions.'
                  }
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'hi' ? 'सीकेवाईसी के लाभ' : 'Benefits of CKYC'}
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{locale === 'hi' ? 'बार-बार केवाईसी करने की आवश्यकता नहीं' : 'No need for repeated KYC'}</li>
                  <li>{locale === 'hi' ? 'तेज़ खाता खोलने की प्रक्रिया' : 'Faster account opening process'}</li>
                  <li>{locale === 'hi' ? 'कम कागजी कार्य' : 'Reduced paperwork'}</li>
                  <li>{locale === 'hi' ? 'डिजिटल सत्यापन' : 'Digital verification'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              {locale === 'hi' ? 'केवाईसी अपडेट कैसे करें?' : 'How to Update KYC?'}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {locale === 'hi' ? 'आवश्यक दस्तावेज़ एकत्र करें' : 'Collect Required Documents'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi' ? 'अपने पहचान और पता प्रमाण दस्तावेज़ एकत्र करें' : 'Gather your identity and address proof documents'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {locale === 'hi' ? 'किसी भी शाखा पर जाएं' : 'Visit Any Branch'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi' ? 'मूल दस्तावेज़ों के साथ किसी भी शाखा पर जाएं' : 'Visit any branch with original documents'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {locale === 'hi' ? 'केवाईसी फॉर्म भरें' : 'Fill KYC Form'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi' ? 'केवाईसी अपडेट फॉर्म भरें और जमा करें' : 'Fill and submit the KYC update form'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {locale === 'hi' ? 'सत्यापन प्राप्त करें' : 'Receive Confirmation'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi' ? 'केवाईसी अपडेट की पुष्टि प्राप्त करें' : 'Receive confirmation of KYC update'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
