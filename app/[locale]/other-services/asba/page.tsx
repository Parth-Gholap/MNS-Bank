'use client';

import React, { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface AsbaServicesPageProps {
  locale: 'en' | 'hi';
}

const AsbaServicesPage: React.FC<AsbaServicesPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  useEffect(() => {
    trackPageView('ASBA Services', locale === 'hi' ? 'एएसबीए सेवाएं' : 'ASBA Services');
  }, [locale]);

  const accountTypes = [
    {
      type: locale === 'hi' ? 'बचत खाता' : 'Savings Account',
      description: locale === 'hi' 
        ? 'न्यूनतम 6 महीने पुराना बचत खाता'
        : 'Savings account with minimum 6 months old',
      minBalance: locale === 'hi' ? '₹1000' : '₹1000',
      features: [
        locale === 'hi' ? 'एएसबीए के लिए पात्र' : 'Eligible for ASBA',
        locale === 'hi' ? 'ऑनलाइन आवेदन' : 'Online application',
        locale === 'hi' ? 'कोई अतिरिक्श शुल्क नहीं' : 'No additional charges',
        locale === 'hi' ? 'बड़ी आईपीओ के लिए उपयुक्त' : 'Suitable for large IPOs',
        locale === 'hi' ? 'व्यापारिक लेनदेन के लिए उपयुक्त' : 'Suitable for business transactions'
      ]
    },
    {
      type: locale === 'hi' ? 'चालू खाता' : 'Current Account',
      description: locale === 'hi' 
        ? 'न्यूनतम 6 महीने पुराना चालू खाता'
        : 'Current account with minimum 6 months old',
      minBalance: locale === 'hi' ? '₹5000' : '₹5000',
      features: [
        locale === 'hi' ? 'एएसबीए के लिए पात्र' : 'Eligible for ASBA',
        locale === 'hi' ? 'ऑनलाइन आवेदन' : 'Online application',
        locale === 'hi' ? 'कोई अतिरिक्श शुल्क नहीं' : 'No additional charges',
        locale === 'hi' ? 'बड़ी आईपीओ के लिए उपयुक्त' : 'Suitable for large IPOs',
        locale === 'hi' ? 'व्यापारिक लेनदेन के लिए उपयुक्त' : 'Suitable for business transactions'
      ]
    },
    {
      type: locale === 'hi' ? 'नॉमिनी खाता' : 'Nominée Account',
      description: locale === 'hi' 
        ? 'नॉमिनी द्वारा संचालित खाता'
        : 'Account operated by nominee',
      minBalance: locale === 'hi' ? '₹1000' : '₹1000',
      features: [
        locale === 'hi' ? 'एएसबीए के लिए पात्र' : 'Eligible for ASBA',
        locale === 'hi' ? 'नॉमिनी की अनुमति' : 'With nominee permission',
        locale === 'hi' ? 'अतिरिक्त दस्तावेज आवश्यक' : 'Additional documents required'
      ]
    }
  ];

  const benefits = [
    {
      icon: '🔒',
      title: locale === 'hi' ? 'सुरक्षित निवेश' : 'Secure Investment',
      description: locale === 'hi' 
        ? 'बैंक द्वारा धनराशि सुरक्षित'
        : 'Funds secured by bank'
    },
    {
      icon: '🏦',
      title: locale === 'hi' ? 'बैंक गारंटी' : 'Bank Guarantee',
      description: locale === 'hi' 
        ? 'बैंक की पूरी गारंटी'
        : 'Full bank guarantee'
    },
    {
      icon: '📱',
      title: locale === 'hi' ? 'ऑनलाइन प्रक्रिया' : 'Online Process',
      description: locale === 'hi' 
        ? 'घर बैठे आवेदन करें'
        : 'Apply from home'
    },
    {
      icon: '💰',
      title: locale === 'hi' ? 'कोई अतिरिक्त शुल्क नहीं' : 'No Additional Charges',
      description: locale === 'hi' 
        ? 'बिल्कुल निःशुल्क सेवा'
        : 'Completely free service'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: locale === 'hi' ? 'आईपीओ चयन' : 'IPO Selection',
      description: locale === 'hi' 
        ? 'उपलब्ध आईपीओ की सूची से चुनें'
        : 'Select from available IPO list'
    },
    {
      step: 2,
      title: locale === 'hi' ? 'आवेदन भरें' : 'Fill Application',
      description: locale === 'hi' 
        ? 'एएसबीए आवेदन पत्र भरें'
        : 'Fill ASBA application form'
    },
    {
      step: 3,
      title: locale === 'hi' ? 'बोली राशि' : 'Bid Amount',
      description: locale === 'hi' 
        ? 'बोली राशि और मूल्य निर्धारित करें'
        : 'Specify bid amount and price'
    },
    {
      step: 4,
      title: locale === 'hi' ? 'पुष्टिकरण' : 'Verification',
      description: locale === 'hi' 
        ? 'बैंक द्वारा विवरण सत्यापित'
        : 'Bank verifies details'
    },
    {
      step: 5,
      title: locale === 'hi' ? 'पुष्टिकरण' : 'Confirmation',
      description: locale === 'hi' 
        ? 'आवेदन पुष्टि संदेश प्राप्त'
        : 'Receive application confirmation'
    }
  ];

  const documents = [
    {
      name: locale === 'hi' ? 'पहचान प्रमाण' : 'Identity Proof',
      description: locale === 'hi' 
        ? 'आधार कार्ड, पैन कार्ड, वोटर आईडी'
        : 'Aadhaar Card, PAN Card, Voter ID'
    },
    {
      name: locale === 'hi' ? 'पता प्रमाण' : 'Address Proof',
      description: locale === 'hi' 
        ? 'बिजली बिल, पानी बिल, किराया रसीद'
        : 'Electricity Bill, Water Bill, Rent Receipt'
    },
    {
      name: locale === 'hi' ? 'बैंक खाता विवरण' : 'Bank Account Statement',
      description: locale === 'hi' 
        ? '6 महीने का बैंक स्टेटमेंट'
        : '6 months bank statement'
    },
    {
      name: locale === 'hi' ? 'फोटोग्राफ' : 'Photograph',
      description: locale === 'hi' 
        ? 'पासपोर्ट आकार का फोटो'
        : 'Passport size photograph'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'एएसबीए सेवाएं' : 'ASBA Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'आईपीओ में आसानी से निवेश करें, बैंक द्वारा सुरक्षित और सुविधाजनक'
              : 'Invest in IPOs easily, secured and facilitated by bank'
            }
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'एएसबीए के लाभ' : 'ASBA Benefits'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Types */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'पात्र खाता प्रकार' : 'Eligible Account Types'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accountTypes.map((account, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {account.type}
                </h3>
                <p className="text-gray-600 mb-4">{account.description}</p>
                <p className="text-lg font-bold text-bank-blue-600 mb-4">
                  {account.minBalance}
                </p>
                <div className="space-y-2">
                  {account.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'आवेदन प्रक्रिया' : 'Application Process'}
          </h2>
          <div className="space-y-6">
            {processSteps.map((step, index) => (
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

        {/* Documents */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-bank-blue-100 text-bank-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h2a1 1 0 100-2 2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2H6z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {doc.name}
                  </h3>
                  <p className="text-gray-600">{doc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'संपर्क करें' : 'Contact Us'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'एएसबीए सेवाएं' : 'ASBA Services'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{locale === 'hi' ? 'फोन:' : 'Phone:'}</strong> +91-755-2471133
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'ईमेल:' : 'Email:'}</strong> asba@mnsbankbhopal.com
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'समय:' : 'Hours:'}</strong> {locale === 'hi' ? 'सुबह 10 बजे - शाम 4:30 बजे' : '10:00 AM - 4:30 PM'}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'शाखा' : 'Branch'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{locale === 'hi' ? 'पता:' : 'Address:'}</strong> M.P. Nagar, Bhopal
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'पिनकोड:' : 'Pincode:'}</strong> 462011
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsbaServicesPage;