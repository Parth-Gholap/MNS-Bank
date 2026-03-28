'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface SmsBankingPageProps {
  locale: 'en' | 'hi';
}

const SmsBankingPage: React.FC<SmsBankingPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView('SMS Banking', locale === 'hi' ? 'एसएमएस बैंकिंग' : 'SMS Banking');
  }, [locale]);

  const smsCommands = [
    {
      command: 'BAL',
      description: locale === 'hi' 
        ? 'खाता शेष जानकारी'
        : 'Account Balance Information',
      format: locale === 'hi' 
        ? 'BAL <खाता नंबर>'
        : 'BAL <Account Number>',
      example: locale === 'hi' ? 'BAL 1234567890' : 'BAL 1234567890'
    },
    {
      command: 'MINI',
      description: locale === 'hi' ? 'लघु बयान' : 'Mini Statement',
      format: locale === 'hi' ? 'MINI <खाता नंबर>' : 'MINI <Account Number>',
      example: locale === 'hi' ? 'MINI 1234567890' : 'MINI 1234567890'
    },
    {
      command: 'CHEQUE',
      description: locale === 'hi' ? 'चेक स्थिति' : 'Cheque Status',
      format: locale === 'hi' ? 'CHEQUE <खाता नंबर> <चेक नंबर>' : 'CHEQUE <Account Number> <Cheque Number>',
      example: locale === 'hi' ? 'CHEQUE 1234567890 123456' : 'CHEQUE 1234567890 123456'
    },
    {
      command: 'BLOCK',
      description: locale === 'hi' ? 'कार्ड ब्लॉक करें' : 'Block Card',
      format: locale === 'hi' ? 'BLOCK <कार्ड नंबर> <कार्ड प्रकार>' : 'BLOCK <Card Number> <Card Type>',
      example: locale === 'hi' ? 'BLOCK 1234567890123456 DEBIT' : 'BLOCK 1234567890123456 DEBIT'
    },
    {
      command: 'STOP',
      description: locale === 'hi' ? 'चेक भुगतान रोकें' : 'Stop Cheque Payment',
      format: locale === 'hi' ? 'STOP <खाता नंबर> <चेक नंबर>' : 'STOP <Account Number> <Cheque Number>',
      example: locale === 'hi' ? 'STOP 1234567890 123456' : 'STOP 1234567890 123456'
    }
  ];

  const registrationSteps = [
    {
      step: 1,
      title: locale === 'hi' ? 'पंजीकरण फॉर्म भरें' : 'Fill Registration Form',
      description: locale === 'hi' ? 'बैंक शाखा में एसएमएस बैंकिंग पंजीकरण फॉर्म भरें' : 'Fill SMS banking registration form at bank branch'
    },
    {
      step: 2,
      title: locale === 'hi' ? 'मोबाइल नंबर पंजीकृत करें' : 'Register Mobile Number',
      description: locale === 'hi' ? 'अपना मोबाइल नंबर पंजीकृत करें' : 'Register your mobile number'
    },
    {
      step: 3,
      title: locale === 'hi' ? 'ओटीपी सत्यापन' : 'OTP Verification',
      description: locale === 'hi' ? 'पंजीकृत मोबाइल पर ओटीपी सत्यापन करें' : 'Verify OTP on registered mobile'
    },
    {
      step: 4,
      title: locale === 'hi' ? 'सक्रियण' : 'Activation',
      description: locale === 'hi' ? 'एसएमएस बैंकिंग सेवा सक्रिय' : 'SMS banking service activated'
    }
  ];

  const benefits = [
    {
      icon: '📱',
      title: locale === 'hi' ? '24/7 उपलब्धता' : '24/7 Availability',
      description: locale === 'hi' ? 'कहीं भी, कभी भी बैंकिंग सेवाएं' : 'Banking services anywhere, anytime'
    },
    {
      icon: '🔒',
      title: locale === 'hi' ? 'सुरक्षित' : 'Secure',
      description: locale === 'hi' ? 'पंजीकृत मोबाइल नंबर से सुरक्षित' : 'Secured with registered mobile number'
    },
    {
      icon: '💰',
      title: locale === 'hi' ? 'निःशुल्क' : 'Free of Cost',
      description: locale === 'hi' ? 'कोई शुल्क नहीं, पूरी तरह से निःशुल्क' : 'No charges, completely free'
    },
    {
      icon: '⚡',
      title: locale === 'hi' ? 'त्वरित' : 'Instant',
      description: locale === 'hi' ? 'तुरंत जानकारी प्राप्त' : 'Get information instantly'
    }
  ];

  const handleRegistration = () => {
    const content = locale === 'hi' 
      ? `महानगर नागरिक सहकारी बैंक\nएसएमएस बैंकिंग पंजीकरण\n\nकृपया निकटतम शाखा में जाएं और पंजीकरण फॉर्म भरें`
      : `Mahanagar Nagrik Sahakari Bank\nSMS Banking Registration\n\nPlease visit nearest branch and fill registration form`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sms-banking-registration.txt';
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
            {locale === 'hi' ? 'एसएमएस बैंकिंग' : 'SMS Banking'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
  ? 'एसएमएस के माध्यम से अपने बैंक खाते की जानकारी प्राप्त करें'
  : 'Access your bank account information through SMS'
            }
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'एसएमएस बैंकिंग के लाभ' : 'SMS Banking Benefits'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* SMS Commands */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'एसएमएस कमांड' : 'SMS Commands'}
          </h2>
          <div className="space-y-4">
            {smsCommands.map((cmd, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {cmd.command}
                    </h3>
                    <p className="text-gray-600 mb-4">{cmd.description}</p>
                    <div className="bg-gray-100 rounded p-3 mb-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        {locale === 'hi' ? 'प्रारूप:' : 'Format:'}
                      </p>
                      <code className="text-sm text-blue-600">{cmd.format}</code>
                    </div>
                    <div className="bg-blue-50 rounded p-3">
                      <p className="text-sm font-medium text-blue-700 mb-1">
                        {locale === 'hi' ? 'उदाहरण:' : 'Example:'}
                      </p>
                      <code className="text-sm text-blue-600">{cmd.example}</code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'पंजीकरण प्रक्रिया' : 'Registration Process'}
          </h2>
          <div className="space-y-6">
            {registrationSteps.map((step, index) => (
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

        {/* How to Use */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'कैसे उपयोग करें' : 'How to Use'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'एसएमएस भेजना' : 'Sending SMS'}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'पंजीकृत मोबाइल नंबर से एसएमएस भेजें' : 'Send SMS from registered mobile number'}</li>
                <li>{locale === 'hi' ? 'नंबर: 9212377377' : 'Number: 9212377377'}</li>
                <li>{locale === 'hi' ? 'सही प्रारूप में कमांड टाइप करें' : 'Type command in correct format'}</li>
                <li>{locale === 'hi' ? 'एसएमएस भेजें' : 'Send SMS'}</li>
                <li>{locale === 'hi' ? 'जवाब प्राप्त करें' : 'Receive response'}</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'महत्वपूर्ण बिंदु' : 'Important Points'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'केवल पंजीकृत मोबाइल से एसएमएस भेजें' : 'Send SMS only from registered mobile'}</li>
                <li>{locale === 'hi' ? 'सही कमांड प्रारूप का उपयोग करें' : 'Use correct command format'}</li>
                <li>{locale === 'hi' ? 'खाता नंबर सही होना चाहिए' : 'Account number must be correct'}</li>
                <li>{locale === 'hi' ? 'एसएमएस शुल्क लागू हो सकते हैं' : 'SMS charges may apply'}</li>
                <li>{locale === 'hi' ? 'सेवा 24/7 उपलब्ध है' : 'Service available 24/7'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'सुरक्षा जानकारी' : 'Security Information'}
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              {locale === 'hi' 
                ? 'एसएमएस बैंकिंग पूरी तरह से सुरक्षित है। केवल पंजीकृत मोबाइल नंबर से एसएमएस स्वीकार किए जाते हैं।'
                : 'SMS banking is completely secure. SMS are accepted only from registered mobile numbers.'
              }
            </p>
            <p>
              {locale === 'hi' 
                ? 'किसी भी संदिग्ध गतिविधि के लिए तुरंत बैंक को सूचित करें।'
                : 'Immediately inform the bank for any suspicious activity.'
              }
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                {locale === 'hi' 
                  ? 'एसएमएस बैंकिंग संबंधी प्रश्नों के लिए कृपया संपर्क करें: '
                  : 'For SMS banking inquiries, please contact: '
                }
                <a href="mailto:smsbanking@mnsbankbhopal.com" className="underline hover:text-blue-600">
                  smsbanking@mnsbankbhopal.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsBankingPage;
