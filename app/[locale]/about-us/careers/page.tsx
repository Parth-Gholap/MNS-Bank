'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface CareersPageProps {
  locale: 'en' | 'hi';
}

const CareersPage: React.FC<CareersPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView('Careers', locale === 'hi' ? 'करियर' : 'Careers');
  }, [locale]);

  const currentOpenings = [
    {
      id: 1,
      title: locale === 'hi' ? 'शाखा प्रबंधक' : 'Branch Manager',
      department: locale === 'hi' ? 'बैंकिंग ऑपरेशन' : 'Banking Operations',
      location: locale === 'hi' ? 'भोपाल' : 'Bhopal',
      experience: locale === 'hi' ? '5-7 वर्ष' : '5-7 years',
      salary: locale === 'hi' ? '₹8-12 लाख प्रति वर्ष' : '₹8-12 LPA',
      posted: locale === 'hi' ? '15 मार्च 2026' : '15 March 2026',
      closing: locale === 'hi' ? '15 अप्रैल 2026' : '15 April 2026'
    },
    {
      id: 2,
      title: locale === 'hi' ? 'वरिष्ठ लेखापाल' : 'Senior Accountant',
      department: locale === 'hi' ? 'वित्त और लेखा' : 'Finance & Accounts',
      location: locale === 'hi' ? 'भोपाल' : 'Bhopal',
      experience: locale === 'hi' ? '3-5 वर्ष' : '3-5 years',
      salary: locale === 'hi' ? '₹4-6 लाख प्रति वर्ष' : '₹4-6 LPA',
      posted: locale === 'hi' ? '20 मार्च 2026' : '20 March 2026',
      closing: locale === 'hi' ? '20 अप्रैल 2026' : '20 April 2026'
    },
    {
      id: 3,
      title: locale === 'hi' ? 'ग्राहक सेवा अधिकारी' : 'Customer Service Officer',
      department: locale === 'hi' ? 'ग्राहक सेवा' : 'Customer Service',
      location: locale === 'hi' ? 'टीटी नगर' : 'TT Nagar',
      experience: locale === 'hi' ? '1-2 वर्ष' : '1-2 years',
      salary: locale === 'hi' ? '₹2.5-3.5 लाख प्रति वर्ष' : '₹2.5-3.5 LPA',
      posted: locale === 'hi' ? '25 मार्च 2026' : '25 March 2026',
      closing: locale === 'hi' ? '25 अप्रैल 2026' : '25 April 2026'
    }
  ];

  const benefits = [
    {
      icon: '💰',
      title: locale === 'hi' ? 'प्रतिस्पर्धी वेतन' : 'Competitive Salary',
      description: locale === 'hi' 
        ? 'उद्योग के अनुसार सर्वोत्तम वेतन पैकेज'
        : 'Industry-best salary packages'
    },
    {
      icon: '🏥',
      title: locale === 'hi' ? 'स्वास्थ्य बीमा' : 'Health Insurance',
      description: locale === 'hi' 
        ? 'स्वयं और परिवार के लिए चिकित्सा बीमा'
        : 'Medical insurance for self and family'
    },
    {
      icon: '📚',
      title: locale === 'hi' ? 'प्रशिक्षण और विकास' : 'Training & Development',
      description: locale === 'hi' 
        ? 'निरंतर कौशल विकास कार्यक्रम'
        : 'Continuous skill development programs',
    },
    {
      icon: '🏖️',
      title: locale === 'hi' ? 'अवकाश नीति' : 'Leave Policy',
      description: locale === 'hi' 
        ? 'उदार अवकाश और छुट्टी नीति'
        : 'Generous leave and holiday policy'
    },
    {
      icon: '🏠',
      title: locale === 'hi' ? 'कार्य-जीवन संतुलन' : 'Work-Life Balance',
      description: locale === 'hi' 
        ? 'स्वस्थ कार्य-जीवन संतुलन को प्राथमिकता'
        : 'Priority to healthy work-life balance'
    },
    {
      icon: '📈',
      title: locale === 'hi' ? 'करियर विकास' : 'Career Growth',
      description: locale === 'hi' 
        ? 'आंतरिक प्रचार और करियर विकास के अवसर'
        : 'Internal promotions and career growth opportunities'
    }
  ];

  const handleApply = (jobId: number) => {
    const content = locale === 'hi' 
      ? `महानगर नागरिक सहकारी बैंक\nजॉब आवेदन\n\nजॉब ID: ${jobId}\n\nकृपया अपना बायोडाटा hr@mnsbankbhopal.com पर भेजें`
      : `Mahanagar Nagrik Sahakari Bank\nJob Application\n\nJob ID: ${jobId}\n\nPlease send your resume to hr@mnsbankbhopal.com`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-application-${jobId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'करियर' : 'Careers'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमार नागरिक सहकारी बैंक के साथ अपना करियर बनाएं और सहकारी बैंकिंग के विकास में योगदान दें।'
              : 'Build your career with our cooperative bank and contribute to the growth of cooperative banking.'
            }
          </p>
        </div>

        {/* Why Join Us */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'हमारे साथ क्यों जुड़ें?' : 'Why Join Us?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Openings */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'वर्तमान रिक्तियां' : 'Current Openings'}
          </h2>
          <div className="space-y-6">
            {currentOpenings.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {job.department}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {job.location}
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-bank-blue-600 mb-1">
                      {job.salary}
                    </p>
                    <button
                      onClick={() => handleApply(job.id)}
                      className="bg-bank-blue-600 text-white px-4 py-2 rounded hover:bg-bank-blue-700 transition-colors"
                    >
                      {locale === 'hi' ? 'आवेदन करें' : 'Apply Now'}
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <p>
                    {locale === 'hi' ? 'प्रकाशित: ' : 'Posted: '}
                    {job.posted} | {locale === 'hi' ? 'अंतिम तिथि: ' : 'Closing: '}
                    {job.closing}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'आवेदन प्रक्रिया' : 'Application Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'आवेदन कैसे करें' : 'How to Apply'}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'अपना अपडेटेड रिज्यूमे तैयार करें' : 'Prepare your updated resume'}</li>
                <li>{locale === 'hi' ? 'कवर लेटर लिखें' : 'Write a cover letter'}</li>
                <li>{locale === 'hi' ? 'hr@mnsbankbhopal.com पर भेजें' : 'Email to hr@mnsbankbhopal.com'}</li>
                <li>{locale === 'hi' ? 'ईमेल विषय में जॉब ID का उल्लेख करें' : 'Mention Job ID in email subject'}</li>
                <li>{locale === 'hi' ? 'शॉर्टलिस्ट किए गए उम्मीदवारों को सूचित किया जाएगा' : 'Shortlisted candidates will be notified'}</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'अपडेटेड रिज्यूमे/सीवी' : 'Updated Resume/CV'}</li>
                <li>{locale === 'hi' ? 'कवर लेटर' : 'Cover Letter'}</li>
                <li>{locale === 'hi' ? 'शैक्षणिक प्रमाण पत्र' : 'Educational Certificates'}</li>
                <li>{locale === 'hi' ? 'अनुभव प्रमाण पत्र' : 'Experience Certificates'}</li>
                <li>{locale === 'hi' ? 'पहचान प्रमाण' : 'Identity Proof'}</li>
                <li>{locale === 'hi' ? 'पता प्रमाण' : 'Address Proof'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Equal Opportunity */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'समान अवसर नियोक्ता' : 'Equal Opportunity Employer'}
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              {locale === 'hi' 
                ? 'महानगर नागरिक सहकारी बैंक एक समान अवसर नियोक्ता है। हम सभी योग्य उम्मीदवारों को धर्म, जाति, लिंग, आयु, या अक्षमता की परवाह किए बिना समान अवसर प्रदान करते हैं।'
                : 'Mahanagar Nagrik Sahakari Bank is an equal opportunity employer. We provide equal opportunities to all qualified candidates regardless of religion, caste, gender, age, or disability.'
              }
            </p>
            <p>
              {locale === 'hi' 
                ? 'हम विविधता और समावेश को बढ़ावा देते हैं और एक समावेशी कार्यस्थल बनाए रखने के लिए प्रतिबद्ध हैं।'
                : 'We promote diversity and inclusion and are committed to maintaining an inclusive workplace.'
              }
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'संपर्क करें' : 'Contact Us'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'एचआर विभाग' : 'HR Department'}
              </h3>
              <p>📧 hr@mnsbankbhopal.com</p>
              <p>📞 0755-2471235</p>
              <p>🕐 9:30 AM - 6:00 PM (Monday - Friday)</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'पता' : 'Address'}
              </h3>
              <p>Mahanagar Nagrik Sahakari Bank Ltd.</p>
              <p>HR Department, Bairagarhi</p>
              <p>Bhopal - 462022, Madhya Pradesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
