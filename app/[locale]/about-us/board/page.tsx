'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface BoardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function BoardPage({ params }: BoardPageProps) {
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    const initLocale = async () => {
      const { locale: localeParam } = await params;
      const localeTyped = localeParam as 'en' | 'hi';
      setLocale(localeTyped);
      trackPageView('Board of Directors', localeTyped === 'hi' ? 'बोर्ड ऑफ डायरेक्टर्स' : 'Board of Directors');
    };
    initLocale();
  }, [params]);

  const boardMembers = [
    {
      name: 'Shri [Chairman Name]',
      nameHi: 'श्री [अध्यक्ष नाम]',
      position: 'Chairman',
      positionHi: 'अध्यक्ष',
      experience: '25+ years',
      experienceHi: '25+ वर्ष',
      background: 'Banking & Finance',
      backgroundHi: 'बैंकिंग और वित्त',
      image: '/images/board/chairman.jpg'
    },
    {
      name: 'Shri [Vice Chairman Name]',
      nameHi: 'श्री [उपाध्यक्ष नाम]',
      position: 'Vice Chairman',
      positionHi: 'उपाध्यक्ष',
      experience: '20+ years',
      experienceHi: '20+ वर्ष',
      background: 'Business Administration',
      backgroundHi: 'व्यावसायिक प्रशासन',
      image: '/images/board/vice-chairman.jpg'
    },
    {
      name: 'Shri [Managing Director Name]',
      nameHi: 'श्री [प्रबंधक निदेशक नाम]',
      position: 'Managing Director',
      positionHi: 'प्रबंधक निदेशक',
      experience: '22+ years',
      experienceHi: '22+ वर्ष',
      background: 'Banking Operations',
      backgroundHi: 'बैंकिंग संचालन',
      image: '/images/board/managing-director.jpg'
    },
    {
      name: 'Shri [Director Name 1]',
      nameHi: 'श्री [निदेशक नाम 1]',
      position: 'Director',
      positionHi: 'निदेशक',
      experience: '18+ years',
      experienceHi: '18+ वर्ष',
      background: 'Legal & Compliance',
      backgroundHi: 'कानूनी और अनुपालन',
      image: '/images/board/director1.jpg'
    },
    {
      name: 'Shri [Director Name 2]',
      nameHi: 'श्री [निदेशक नाम 2]',
      position: 'Director',
      positionHi: 'निदेशक',
      experience: '15+ years',
      experienceHi: '15+ वर्ष',
      background: 'Finance & Accounts',
      backgroundHi: 'वित्त और लेखा',
      image: '/images/board/director2.jpg'
    },
    {
      name: 'Shri [Director Name 3]',
      nameHi: 'श्री [निदेशक नाम 3]',
      position: 'Director',
      positionHi: 'निदेशक',
      experience: '16+ years',
      experienceHi: '16+ वर्ष',
      background: 'Risk Management',
      backgroundHi: 'जोखिम प्रबंधन',
      image: '/images/board/director3.jpg'
    },
    {
      name: 'Shri [Director Name 4]',
      nameHi: 'श्री [निदेशक नाम 4]',
      position: 'Director',
      positionHi: 'निदेशक',
      experience: '14+ years',
      experienceHi: '14+ वर्ष',
      background: 'Information Technology',
      backgroundHi: 'सूचना प्रौद्योगिकी',
      image: '/images/board/director4.jpg'
    },
    {
      name: 'Shri [Director Name 5]',
      nameHi: 'श्री [निदेशक नाम 5]',
      position: 'Director',
      positionHi: 'निदेशक',
      experience: '12+ years',
      experienceHi: '12+ वर्ष',
      background: 'Marketing & Business Development',
      backgroundHi: 'विपणन और व्यापार विकास',
      image: '/images/board/director5.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'बोर्ड ऑफ डायरेक्टर्स' : 'Board of Directors'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमारे बोर्ड के सदस्यों का परिचय जो बैंक के नेतृत्व और दिशा निर्धारण के लिए जिम्मेदार हैं'
              : 'Meet our board members who are responsible for the leadership and direction of the bank'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {boardMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Member Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                {member.position === 'Chairman' && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                    {locale === 'hi' ? 'अध्यक्ष' : 'Chair'}
                  </div>
                )}
              </div>
              
              {/* Member Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {locale === 'hi' ? member.nameHi : member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {locale === 'hi' ? member.positionHi : member.position}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {locale === 'hi' ? 'अनुभव:' : 'Experience:'}
                    </span>
                    <span className="text-gray-700">
                      {locale === 'hi' ? member.experienceHi : member.experience}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {locale === 'hi' ? 'पृष्ठभूमि:' : 'Background:'}
                    </span>
                    <span className="text-gray-700">
                      {locale === 'hi' ? member.backgroundHi : member.background}
                    </span>
                  </div>
                </div>
                
                <button className="mt-4 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  {locale === 'hi' ? 'प्रोफ़ाइल देखें' : 'View Profile'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {locale === 'hi' ? 'बोर्ड की जिम्मेदारियां' : 'Board Responsibilities'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'hi' ? 'रणनीतिक निर्देशन' : 'Strategic Direction'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  {locale === 'hi' ? 'बैंक की रणनीति निर्धारित करना' : 'Setting bank strategy'}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  {locale === 'hi' ? 'दीर्घकालिक योजना बनाना' : 'Long-term planning'}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  {locale === 'hi' ? 'नीतियों की निगरानी' : 'Policy oversight'}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  {locale === 'hi' ? 'प्रदर्शन मूल्यांकन' : 'Performance evaluation'}
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'hi' ? 'शासन और अनुपालन' : 'Governance & Compliance'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  {locale === 'hi' ? 'विनियामक अनुपालन' : 'Regulatory compliance'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  {locale === 'hi' ? 'जोखिम प्रबंधन पर्यवेक्षण' : 'Risk management oversight'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  {locale === 'hi' ? 'आंतरिक नियंत्रण' : 'Internal controls'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  {locale === 'hi' ? 'हितधारक संरक्षण' : 'Stakeholder protection'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {locale === 'hi' 
              ? 'बोर्ड बैठकें त्रैमासिक रूप से आयोजित की जाती हैं। विशेष बैठकें आवश्यकतानुसार बुलाई जाती हैं।'
              : 'Board meetings are held quarterly. Special meetings are called as needed.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
