'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface CommitteesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function CommitteesPage({ params }: CommitteesPageProps) {
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    const initLocale = async () => {
      const { locale: localeParam } = await params;
      const localeTyped = localeParam as 'en' | 'hi';
      setLocale(localeTyped);
      trackPageView('Committees', localeTyped === 'hi' ? 'समितियां' : 'Committees');
    };
    initLocale();
  }, [params]);

  const committees = [
    {
      name: 'Board of Directors',
      nameHi: 'बोर्ड ऑफ डायरेक्टर्स',
      description: 'Governing body responsible for strategic decisions and overall management',
      descriptionHi: 'रणनीतिक निर्णयों और समग्र प्रबंधन के लिए जिम्मेदार शासी निकाय',
      members: 7,
      meetings: 'Quarterly'
    },
    {
      name: 'Audit Committee',
      nameHi: 'ऑडिट समिति',
      description: 'Ensures financial integrity and compliance with regulations',
      descriptionHi: 'वित्तीय अखंडता और नियमों के अनुपालन सुनिश्चित करती है',
      members: 3,
      meetings: 'Monthly'
    },
    {
      name: 'Risk Management Committee',
      nameHi: 'जोखिम प्रबंधन समिति',
      description: 'Identifies and mitigates various risks faced by the bank',
      descriptionHi: 'बैंक द्वारा सामना किए जाने वाले विभिन्न जोखिमों की पहचान और शमन करती है',
      members: 5,
      meetings: 'Monthly'
    },
    {
      name: 'Credit Committee',
      nameHi: 'क्रेडिट समिति',
      description: 'Evaluates and approves loan applications and credit facilities',
      descriptionHi: 'ऋण आवेदनों और क्रेडिट सुविधाओं का मूल्यांकन और अनुमोदन करती है',
      members: 4,
      meetings: 'Weekly'
    },
    {
      name: 'Nomination Committee',
      nameHi: 'नामांकन समिति',
      description: 'Handles appointments and succession planning',
      descriptionHi: 'नियुक्तियों और उत्तराधिकार योजना का प्रबंधन करती है',
      members: 3,
      meetings: 'As needed'
    },
    {
      name: 'Customer Service Committee',
      nameHi: 'ग्राहक सेवा समिति',
      description: 'Focuses on improving customer experience and service quality',
      descriptionHi: 'ग्राहक अनुभव और सेवा गुणवत्ता में सुधार पर केंद्रित है',
      members: 4,
      meetings: 'Monthly'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'बैंक समितियां' : 'Bank Committees'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमारी विभिन्न समितियां बैंक के प्रभावी प्रबंधन और शासन में महत्वपूर्ण भूमिका निभाती हैं'
              : 'Our various committees play crucial roles in the effective management and governance of the bank'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {committees.map((committee, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === 'hi' ? committee.nameHi : committee.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'hi' ? committee.descriptionHi : committee.description}
                </p>
              </div>
              
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    {locale === 'hi' ? 'सदस्य' : 'Members'}
                  </span>
                  <span className="font-semibold text-blue-600">
                    {committee.members}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    {locale === 'hi' ? 'बैठकें' : 'Meetings'}
                  </span>
                  <span className="font-semibold text-green-600">
                    {locale === 'hi' 
                      ? (committee.meetings === 'Quarterly' ? 'त्रैमासिक' : 
                         committee.meetings === 'Monthly' ? 'मासिक' :
                         committee.meetings === 'Weekly' ? 'साप्ताहिक' : 'आवश्यकतानुसार')
                      : committee.meetings
                    }
                  </span>
                </div>
              </div>
              
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                {locale === 'hi' ? 'विवरण देखें' : 'View Details'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {locale === 'hi' ? 'समिति जिम्मेदारियां' : 'Committee Responsibilities'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {locale === 'hi' ? 'प्राथमिक कार्य' : 'Primary Functions'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {locale === 'hi' ? 'रणनीतिक निर्णय लेना' : 'Strategic decision making'}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {locale === 'hi' ? 'जोखिम प्रबंधन' : 'Risk management'}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {locale === 'hi' ? 'अनुपालन सुनिश्चित करना' : 'Ensuring compliance'}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {locale === 'hi' ? 'प्रदर्शन की निगरानी' : 'Performance monitoring'}
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {locale === 'hi' ? 'मुख्य उद्देश्य' : 'Key Objectives'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  {locale === 'hi' ? 'पारदर्शिता बढ़ाना' : 'Enhancing transparency'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  {locale === 'hi' ? 'जवाबदेही सुनिश्चित करना' : 'Ensuring accountability'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  {locale === 'hi' ? 'शासन में सुधार' : 'Improving governance'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  {locale === 'hi' ? 'हितधारकों के हितों की रक्षा' : 'Protecting stakeholder interests'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
