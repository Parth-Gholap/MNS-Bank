'use client';

import React, { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface NeftRtgsPageProps {
  locale: 'en' | 'hi';
}

const NeftRtgsPage: React.FC<NeftRtgsPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  useEffect(() => {
    trackPageView('NEFT/RTGS', locale === 'hi' ? 'एनएफटी/आरटीजीएस' : 'NEFT/RTGS');
  }, [locale]);

  const serviceTypes = [
    {
      name: 'NEFT',
      fullName: locale === 'hi' ? 'नेशनल इलेक्ट्रॉनिक फंड ट्रांसफर' : 'National Electronic Fund Transfer',
      description: locale === 'hi' 
        ? 'भारत भर में धन ट्रांसफर के लिए इलेक्ट्रॉनिक प्रणाली'
        : 'Electronic system for fund transfer across India',
      settlementTime: locale === 'hi' 
        ? 'आधार बैच आधार (2 घंटे)'
        : 'Batch to batch (2 hours)',
      limits: {
        min: locale === 'hi' ? '₹1' : '₹1',
        max: locale === 'hi' ? 'कोई सीमा नहीं' : 'No limit'
      },
      charges: locale === 'hi' ? 'निःशुल्क' : 'Free',
      availability: locale === 'hi' ? '24x7' : '24x7'
    },
    {
      name: 'RTGS',
      fullName: locale === 'hi' ? 'रियल टाइम ग्रॉस सेटलमेंट' : 'Real Time Gross Settlement',
      description: locale === 'hi' 
        ? 'वास्तविक समय में धन ट्रांसफर की सुविधा'
        : 'Real-time fund transfer facility',
      settlementTime: locale === 'hi' 
        ? 'वास्तविक समय (तुरंत)'
        : 'Real time (instant)',
      limits: {
        min: locale === 'hi' ? '₹2 लाख' : '₹2 Lakhs',
        max: locale === 'hi' ? 'कोई सीमा नहीं' : 'No limit'
      },
      charges: locale === 'hi' ? 'निःशुल्क' : 'Free',
      availability: locale === 'hi' ? 'सोमवार - शुक्रवार (9 बजे - 4:30 बजे)' : 'Monday - Friday (9 AM - 4:30 PM)'
    }
  ];

  const benefits = [
    {
      icon: '⚡',
      title: locale === 'hi' ? 'तेज़ ट्रांसफर' : 'Fast Transfer',
      description: locale === 'hi' 
        ? 'कुछ ही मिनटों में धन ट्रांसफर'
        : 'Transfer funds in minutes'
    },
    {
      icon: '🔒',
      title: locale === 'hi' ? 'सुरक्षित' : 'Secure',
      description: locale === 'hi' 
        ? 'बैंक द्वारा सुरक्षित लेनदेन'
        : 'Bank-secured transactions'
    },
    {
      icon: '💰',
      title: locale === 'hi' ? 'निःशुल्क' : 'Free',
      description: locale === 'hi' 
        ? 'कोई ट्रांसफर शुल्क नहीं'
        : 'No transfer charges'
    },
    {
      icon: '🌐',
      title: locale === 'hi' ? 'भारत भर में' : 'Across India',
      description: locale === 'hi' 
        ? 'भारत के किसी भी बैंक में ट्रांसफर'
        : 'Transfer to any bank in India'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: locale === 'hi' ? 'लाभार्थी जानकारी' : 'Beneficiary Details',
      description: locale === 'hi' 
        ? 'लाभार्थी का नाम, खाता नंबर, IFSC'
        : 'Beneficiary name, account number, IFSC'
    },
    {
      step: 2,
      title: locale === 'hi' ? 'राशि निर्धारण' : 'Amount Entry',
      description: locale === 'hi' 
        ? 'ट्रांसफर करने की राशि दर्ज करें'
        : 'Enter amount to transfer'
    },
    {
      step: 3,
      title: locale === 'hi' ? 'पुष्टिकरण' : 'Verification',
      description: locale === 'hi' 
        ? 'सभी विवरणों का सत्यापन करें'
        : 'Verify all details'
    },
    {
      step: 4,
      title: locale === 'hi' ? 'पुष्टिकरण' : 'Confirmation',
      description: locale === 'hi' 
        ? 'ओटीपी के साथ पुष्टिकरण'
        : 'Confirm with OTP'
    },
    {
      step: 5,
      title: locale === 'hi' ? 'सफलता' : 'Success',
      description: locale === 'hi' 
        ? 'ट्रांसफर सफलतापूर्वक पूर्ण'
        : 'Transfer completed successfully'
    }
  ];

  const documents = [
    {
      name: locale === 'hi' ? 'बैंक खाता' : 'Bank Account',
      description: locale === 'hi' 
        ? 'सक्रिय बैंक खाता'
        : 'Active bank account'
    },
    {
      name: locale === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number',
      description: locale === 'hi' 
        ? 'बैंक के साथ पंजीकृत'
        : 'Registered with bank'
    },
    {
      name: locale === 'hi' ? 'इंटरनेट बैंकिंग' : 'Internet Banking',
      description: locale === 'hi' 
        ? 'इंटरनेट बैंकिंग सक्रिय'
        : 'Internet banking active'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'एनएफटी/आरटीजीएस सेवाएं' : 'NEFT/RTGS Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'भारत भर में तेज़ और सुरक्षित धन ट्रांसफर सेवाएं'
              : 'Fast and secure fund transfer services across India'
            }
          </p>
        </div>

        {/* Service Types */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'सेवा प्रकार' : 'Service Types'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceTypes.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
                  <div className="text-sm text-gray-500">{service.fullName}</div>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{locale === 'hi' ? 'सेटलमेंट समय:' : 'Settlement Time:'}</span>
                    <span className="font-semibold">{service.settlementTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{locale === 'hi' ? 'सीमा:' : 'Limits:'}</span>
                    <span className="font-semibold">{service.limits.min} - {service.limits.max}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{locale === 'hi' ? 'शुल्क:' : 'Charges:'}</span>
                    <span className="font-semibold text-green-600">{service.charges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{locale === 'hi' ? 'उपलब्धता:' : 'Availability:'}</span>
                    <span className="font-semibold">{service.availability}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'लाभ' : 'Benefits'}
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

        {/* Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'ट्रांसफर प्रक्रिया' : 'Transfer Process'}
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

        {/* Requirements */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'आवश्यकताएं' : 'Requirements'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            {locale === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'ग्राहक सेवा' : 'Customer Service'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{locale === 'hi' ? 'फोन:' : 'Phone:'}</strong> +91-755-2471133
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'ईमेल:' : 'Email:'}</strong> neft@mnsbankbhopal.com
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'समय:' : 'Hours:'}</strong> {locale === 'hi' ? 'सुबह 9 बजे - शाम 4:30 बजे' : '9:00 AM - 4:30 PM'}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'आपातकालीन सहायता' : 'Emergency Support'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{locale === 'hi' ? 'हेल्पलाइन:' : 'Helpline:'}</strong> 1800-123-4567
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'ईमेल:' : 'Email:'}</strong> emergency@mnsbankbhopal.com
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'उपलब्धता:' : 'Availability:'}</strong> {locale === 'hi' ? '24x7' : '24x7'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeftRtgsPage;