'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface GrievancePolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function GrievancePolicyPage({ params }: GrievancePolicyPageProps) {
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    const initLocale = async () => {
      const { locale: localeParam } = await params;
      const localeTyped = localeParam as 'en' | 'hi';
      setLocale(localeTyped);
      trackPageView('Grievance Policy', localeTyped === 'hi' ? 'शिकायत नीति' : 'Grievance Policy');
    };
    initLocale();
  }, [params]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {locale === 'hi' ? 'शिकायत नीति' : 'Grievance Redressal Policy'}
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              {locale === 'hi' ? 'शिकायत निवारण प्रक्रिया' : 'Grievance Redressal Procedure'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'hi' ? 'उद्देश्य' : 'Objective'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {locale === 'hi' 
                    ? 'हमारा उद्देश्य ग्राहकों की शिकायतों का त्वरित और प्रभावी समाधान करना है। हम एक पारदर्शी और निष्पक्ष शिकायत निवारण प्रक्रिया को बनाए रखने के लिए प्रतिबद्ध हैं।'
                    : 'Our objective is to resolve customer complaints promptly and effectively. We are committed to maintaining a transparent and fair grievance redressal process.'
                  }
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'hi' ? 'शिकायत दर्ज कराने की प्रक्रिया' : 'How to Lodge a Complaint'}
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>{locale === 'hi' ? 'किसी भी शाखा में जाकर शिकायत दर्ज कराएं' : 'Visit any branch to lodge your complaint'}</li>
                  <li>{locale === 'hi' ? 'हमारे टोल-फ्री नंबर 1800-123-4567 पर कॉल करें' : 'Call our toll-free number 1800-123-4567'}</li>
                  <li>{locale === 'hi' ? 'ईमेल करें: support@mnsbankbhopal.com' : 'Email: support@mnsbankbhopal.com'}</li>
                  <li>{locale === 'hi' ? 'हमारी वेबसाइट पर शिकायत पोर्टल का उपयोग करें' : 'Use our website complaint portal'}</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'hi' ? 'समयरेखा' : 'Timeline'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-semibold">{locale === 'hi' ? 'साधारण शिकायतें' : 'Simple Complaints'}</h4>
                      <p className="text-gray-600">{locale === 'hi' ? '7 कार्य दिवसों के भीतर समाधान' : 'Resolution within 7 working days'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-semibold">{locale === 'hi' ? 'जटिल शिकायतें' : 'Complex Complaints'}</h4>
                      <p className="text-gray-600">{locale === 'hi' ? '30 कार्य दिवसों के भीतर समाधान' : 'Resolution within 30 working days'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'hi' ? 'अपील प्रक्रिया' : 'Appeal Process'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {locale === 'hi' 
                    ? 'यदि आप समाधान से संतुष्ट नहीं हैं, तो आप शिकायत अधिकारी के पास अपील कर सकते हैं। यदि आप अभी भी संतुष्ट नहीं हैं, तो आप भारतीय रिज़र्व बैंक (RBI) के ग्राहक सेवा विभाग से संपर्क कर सकते हैं।'
                    : 'If you are not satisfied with the resolution, you can appeal to the Grievance Officer. If still not satisfied, you may contact the Reserve Bank of India (RBI) Customer Service Department.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              {locale === 'hi' ? 'शिकायत अधिकारी' : 'Grievance Officer'}
            </h2>
            
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                {locale === 'hi' ? 'नाम: श्री/श्रीमति [नाम]' : 'Name: Mr./Ms. [Name]'}
              </h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>{locale === 'hi' ? 'पद:' : 'Designation:'}</strong> {locale === 'hi' ? 'शिकायत अधिकारी' : 'Grievance Officer'}</p>
                <p><strong>{locale === 'hi' ? 'फोन:' : 'Phone:'}</strong> 0755-1234567</p>
                <p><strong>{locale === 'hi' ? 'ईमेल:' : 'Email:'}</strong> grievance@mnsbankbhopal.com</p>
                <p><strong>{locale === 'hi' ? 'पता:' : 'Address:'}</strong> MP Nagar, Zone-I, Bhopal - 462011</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
