'use client';

import React, { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface MembershipPageProps {
  locale: 'en' | 'hi';
}

const MembershipPage: React.FC<MembershipPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  useEffect(() => {
    trackPageView('Membership', locale === 'hi' ? 'सदस्यता' : 'Membership');
  }, [locale]);

  const eligibilityCriteria = [
    {
      title: locale === 'hi' ? 'आयु सीमा' : 'Age Limit',
      description: locale === 'hi' 
        ? 'न्यूनतम 18 वर्ष और अधिकतम 65 वर्ष'
        : 'Minimum 18 years and maximum 65 years'
    },
    {
      title: locale === 'hi' ? 'पहचान प्रमाण' : 'Identity Proof',
      description: locale === 'hi' 
        ? 'आधार कार्ड, पैन कार्ड या वोटर आईडी'
        : 'Aadhaar Card, PAN Card or Voter ID'
    },
    {
      title: locale === 'hi' ? 'पता प्रमाण' : 'Address Proof',
      description: locale === 'hi' 
        ? 'बिजली बिल, पानी बिल या किराया रसीद'
        : 'Electricity Bill, Water Bill or Rent Receipt'
    },
    {
      title: locale === 'hi' ? 'फोटोग्राफ' : 'Photograph',
      description: locale === 'hi' 
        ? 'पासपोर्ट आकार के 2 फोटो'
        : '2 passport size photographs'
    }
  ];

  const membershipTypes = [
    {
      type: locale === 'hi' ? 'न्यूनतम शेयर पूंजी' : 'Minimum Share Capital',
      amount: locale === 'hi' ? '₹1000' : '₹1000',
      description: locale === 'hi' 
        ? 'प्रति सदस्य न्यूनतम शेयर पूंजी'
        : 'Minimum share capital per member'
    },
    {
      type: locale === 'hi' ? 'अधिकतम शेयर पूंजी' : 'Maximum Share Capital',
      amount: locale === 'hi' ? '₹50,000' : '₹50,000',
      description: locale === 'hi' 
        ? 'प्रति सदस्य अधिकतम शेयर पूंजी'
        : 'Maximum share capital per member'
    },
    {
      type: locale === 'hi' ? 'शेयर मूल्य' : 'Share Value',
      amount: locale === 'hi' ? '₹10 प्रति शेयर' : '₹10 per share',
      description: locale === 'hi' 
        ? 'प्रत्येक शेयर का मूल्य'
        : 'Value of each share'
    }
  ];

  const membershipBenefits = [
    {
      icon: '🏦',
      title: locale === 'hi' ? 'बैंकिंग सेवाएं' : 'Banking Services',
      description: locale === 'hi' 
        ? 'सभी प्रकार की बैंकिंग सुविधाएं उपलब्ध'
        : 'Access to all banking facilities'
    },
    {
      icon: '💰',
      title: locale === 'hi' ? 'उच्च ब्याज दरें' : 'High Interest Rates',
      description: locale === 'hi' 
        ? 'जमा पर आकर्षक ब्याज दरें'
        : 'Attractive interest rates on deposits'
    },
    {
      icon: '🏠',
      title: locale === 'hi' ? 'होम लोन' : 'Home Loans',
      description: locale === 'hi' 
        ? 'कम ब्याज दर पर होम लोन'
        : 'Home loans at low interest rates'
    },
    {
      icon: '🗳️',
      title: locale === 'hi' ? 'वोटिंग अधिकार' : 'Voting Rights',
      description: locale === 'hi' 
        ? 'बैंक के निर्णयों में भाग लेने का अधिकार'
        : 'Right to participate in bank decisions'
    },
    {
      icon: '📊',
      title: locale === 'hi' ? 'लाभांश' : 'Dividends',
      description: locale === 'hi' 
        ? 'वार्षिक लाभांश प्राप्त करने का अधिकार'
        : 'Right to receive annual dividends'
    },
    {
      icon: '🛡️',
      title: locale === 'hi' ? 'बीमा कवर' : 'Insurance Coverage',
      description: locale === 'hi' 
        ? 'जीवन बीमा और दुर्घटना बीमा'
        : 'Life and accident insurance coverage'
    }
  ];

  const applicationSteps = [
    {
      step: 1,
      title: locale === 'hi' ? 'आवेदन पत्र भरें' : 'Fill Application Form',
      description: locale === 'hi' 
        ? 'सदस्यता आवेदन पत्र भरें और जमा करें'
        : 'Fill and submit the membership application form'
    },
    {
      step: 2,
      title: locale === 'hi' ? 'दस्तावेज जमा करें' : 'Submit Documents',
      description: locale === 'hi' 
        ? 'आवश्यक दस्तावेज जमा करें'
        : 'Submit required documents'
    },
    {
      step: 3,
      title: locale === 'hi' ? 'शेयर खरीदें' : 'Purchase Shares',
      description: locale === 'hi' 
        ? 'न्यूनतम शेयर खरीदें'
        : 'Purchase minimum shares'
    },
    {
      step: 4,
      title: locale === 'hi' ? 'सत्यापन' : 'Verification',
      description: locale === 'hi' 
        ? 'दस्तावेजों का सत्यापन होगा'
        : 'Documents will be verified'
    },
    {
      step: 5,
      title: locale === 'hi' ? 'सदस्यता कार्ड' : 'Membership Card',
      description: locale === 'hi' 
        ? 'सदस्यता कार्ड प्राप्त होगा'
        : 'Membership card will be issued'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'सदस्यता' : 'Membership'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'महानगर नागरिक सहकारी बैंक का सदस्य बनें और विशेष लाभों का आनंद लें'
              : 'Become a member of Mahanagar Nagrik Sahakari Bank and enjoy exclusive benefits'
            }
          </p>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'पात्रता मानदंड' : 'Eligibility Criteria'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eligibilityCriteria.map((criteria, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-bank-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {criteria.title}
                  </h3>
                  <p className="text-gray-600">{criteria.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Types */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'सदस्यता प्रकार' : 'Membership Types'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipTypes.map((type, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {type.type}
                </h3>
                <p className="text-2xl font-bold text-bank-blue-600 mb-2">
                  {type.amount}
                </p>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'सदस्यता लाभ' : 'Membership Benefits'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {membershipBenefits.map((benefit, index) => (
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

        {/* Application Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'आवेदन प्रक्रिया' : 'Application Process'}
          </h2>
          <div className="space-y-6">
            {applicationSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-bank-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'मुख्य शाखा' : 'Main Branch'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{locale === 'hi' ? 'पता:' : 'Address:'}</strong> M.P. Nagar, Bhopal
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'फोन:' : 'Phone:'}</strong> +91-755-2471133
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'ईमेल:' : 'Email:'}</strong> info@mnsbankbhopal.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'कार्य समय' : 'Working Hours'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{locale === 'hi' ? 'सोमवार - शुक्रवार:' : 'Monday - Friday:'}</strong> 10:00 AM - 4:30 PM
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'शनिवार:' : 'Saturday:'}</strong> 10:00 AM - 1:30 PM
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'रविवार:' : 'Sunday:'}</strong> {locale === 'hi' ? 'बंद' : 'Closed'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;