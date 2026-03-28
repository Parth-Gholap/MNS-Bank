'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface InsuranceServicesPageProps {
  locale: 'en' | 'hi';
}

const InsuranceServicesPage: React.FC<InsuranceServicesPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView('Insurance Services', locale === 'hi' ? 'बीमा सेवाएं' : 'Insurance Services');
  }, [locale]);

  const insuranceProducts = [
    {
      id: 1,
      name: locale === 'hi' ? 'जीवन बीमा' : 'Life Insurance',
      description: locale === 'hi' 
        ? 'आपके परिवार की वित्तीय सुरक्षा के लिए व्यापक जीवन बीमा प्लान'
        : 'Comprehensive life insurance plans for your family\'s financial security',
      features: [
        locale === 'hi' ? 'टर्म प्लान' : 'Term Plans',
        locale === 'hi' ? 'एंडावमेंट प्लान' : 'Endowment Plans',
        locale === 'hi' ? 'मनी बैक प्लान' : 'Money Back Plans',
        locale === 'hi' ? 'यूलिप प्लान' : 'ULIP Plans'
      ],
      partner: locale === 'hi' ? 'एलआईसी लाइफ इंश्योरेंस' : 'LIC Life Insurance'
    },
    {
      id: 2,
      name: locale === 'hi' ? 'स्वास्थ्य बीमा' : 'Health Insurance',
      description: locale === 'hi' 
        ? 'चिकित्सा खर्चों को कवर करने के लिए सर्वोत्तम स्वास्थ्य बीमा प्लान'
        : 'Best health insurance plans to cover medical expenses',
      features: [
        locale === 'hi' ? 'व्यक्तिगत स्वास्थ्य बीमा' : 'Individual Health Insurance',
        locale === 'hi' ? 'पारिवार स्वास्थ्य बीमा' : 'Family Health Insurance',
        locale === 'hi' ? 'वरिष्ण स्वास्थ्य बीमा' : 'Senior Citizen Health Insurance',
        locale === 'hi' ? 'क्रिटिकल बीमा' : 'Critical Illness Insurance'
      ],
      partner: locale === 'hi' ? 'स्टार हेल्थ इंश्योरेंस' : 'Star Health Insurance'
    },
    {
      id: 3,
      name: locale === 'hi' ? 'वाहन बीमा' : 'Vehicle Insurance',
      description: locale === 'hi' 
        ? 'आपके वाहन की पूरी सुरक्षा के लिए व्यापक वाहन बीमा'
        : 'Comprehensive vehicle insurance for complete protection of your vehicle',
      features: [
        locale === 'hi' ? 'कार बीमा' : 'Car Insurance',
        locale === 'hi' ? 'बाइक बीमा' : 'Bike Insurance',
        locale === 'hi' ? 'वाणिज्य वाहन बीमा' : 'Commercial Vehicle Insurance',
        locale === 'hi' ? 'थर्ड पार्टी बीमा' : 'Third Party Insurance'
      ],
      partner: locale === 'hi' ? 'आईसीआईसी लोम्बार्ड' : 'ICICI Lombard'
    }
  ];

  const benefits = [
    {
      icon: '🛡️',
      title: locale === 'hi' ? 'वित्तीय सुरक्षा' : 'Financial Security',
      description: locale === 'hi' 
        ? 'अप्रत्याशित घटनाओं से वित्तीय सुरक्षा सुनिश्चित करें'
        : 'Ensure financial security against unexpected events'
    },
    {
      icon: '💰',
      title: locale === 'hi' ? 'कर लाभ' : 'Tax Benefits',
      description: locale === 'hi' 
        ? 'बीमा प्रीमियम पर आयकर लाभ उपलब्ध'
        : 'Tax benefits available on insurance premiums'
    },
    {
      icon: '🏥',
      title: locale === 'hi' ? 'कैशलेस बिना उपचार' : 'Cashless Treatment',
      description: locale === 'hi' 
        ? 'नेटवर्क अस्पतालों में कैशलेस उपचार की सुविधा'
        : 'Cashless treatment facility at network hospitals'
    },
    {
      icon: '📞',
      title: locale === 'hi' ? '24/7 समर्थन' : '24/7 Support',
      description: locale === 'hi' 
        ? 'दौर-घड़ी सहायता और समर्थन सेवाएं'
        : 'Round-the-clock assistance and support services'
    }
  ];

  const handleEnquiry = (productId: number) => {
    const content = locale === 'hi' 
      ? `महानगर नागरिक सहकारी बैंक\nबीमा सेवाएं पूछताछ\n\nउत्पाद ID: ${productId}\n\nकृपया अपना विवरण भेजें`
      : `Mahanagar Nagrik Sahakari Bank\nInsurance Services Inquiry\n\nProduct ID: ${productId}\n\nPlease send your details`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `insurance-enquiry-${productId}.txt`;
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
            {locale === 'hi' ? 'बीमा सेवाएं' : 'Insurance Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमारे प्रतिष्ठित बीमा साझेदारों के साथ व्यापक बीमा समाधान प्राप्त करें'
              : 'Access comprehensive insurance solutions with our trusted insurance partners'
            }
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            {locale === 'hi' ? 'महत्वपूर्ण सूचना' : 'Important Notice'}
          </h2>
          <p className="text-yellow-700">
            {locale === 'hi' 
              ? 'बीमा सेवाएं केवल तब्बी उपलब्ध हैं जब बैंक को IRDAI द्वारा लाइसेंस प्राप्त है। सभी बीमा उत्पाद भागीदारी कंपनियों के नियमों और शर्तों के अधीन हैं।'
              : 'Insurance services are available only when the bank is licensed by IRDAI. All insurance products are subject to the terms and conditions of the partner companies.'
            }
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'बीमा के लाभ' : 'Insurance Benefits'}
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

        {/* Insurance Products */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'बीमा उत्पाद' : 'Insurance Products'}
          </h2>
          <div className="space-y-6">
            {insuranceProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="font-medium">
                        {locale === 'hi' ? 'साझेदार:' : 'Partner:'}
                      </span>
                      <span>{product.partner}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => handleEnquiry(product.id)}
                      className="bg-bank-blue-600 text-white px-4 py-2 rounded hover:bg-bank-blue-700 transition-colors"
                    >
                      {locale === 'hi' ? 'पूछताछ करें' : 'Enquire Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'बीमा खरीद प्रक्रिया' : 'Insurance Purchase Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'कैसे खरीदें' : 'How to Purchase'}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'बैंक शाखा में जाएं' : 'Visit our bank branch'}</li>
                <li>{locale === 'hi' ? 'बीमा सलाहकार से मिलें' : 'Meet with our insurance advisor'}</li>
                <li>{locale === 'hi' ? 'अपनी आवश्यकताएं चर्चा करें' : 'Discuss your requirements'}</li>
                <li>{locale === 'hi' ? 'उपयुक्त योजना चुनें' : 'Choose suitable plan'}</li>
                <li>{locale === 'hi' ? 'दस्तावेज जमा करें' : 'Submit required documents'}</li>
                <li>{locale === 'hi' ? 'प्रीमियम भुगतान करें' : 'Pay premium'}</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'पहचान प्रमाण (आधार/पैन)' : 'Identity Proof (Aadhaar/PAN)'}</li>
                <li>{locale === 'hi' ? 'पता प्रमाण' : 'Address Proof'}</li>
                <li>{locale === 'hi' ? 'आयु प्रमाण' : 'Age Proof'}</li>
                <li>{locale === 'hi' ? 'आय प्रमाण' : 'Income Proof'}</li>
                <li>{locale === 'hi' ? 'फोटोग्राफ' : 'Photographs'}</li>
                <li>{locale === 'hi' ? 'चिकित्सा रिपोर्ट (स्वास्थ्य बीमा के लिए)' : 'Medical Reports (for health insurance)'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'नियामक जानकारी' : 'Regulatory Information'}
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              {locale === 'hi' 
                ? 'बीमा विनियमन और विकास प्राधिकरण (IRDAI) द्वारा विनियमित बैंक बीमा सेवाएं प्रदान करता है।'
                : 'Bank provides insurance services regulated by the Insurance Regulatory and Development Authority (IRDAI).'
              }
            </p>
            <p>
              {locale === 'hi' 
                ? 'सभी बीमा उत्पाद भागीदारी कंपनियों के नियमों और शर्तों के अधीन हैं।'
                : 'All insurance products are subject to the terms and conditions of the partner companies.'
              }
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                {locale === 'hi' 
                  ? 'बीमा संबंधी प्रश्नों के लिए कृपया संपर्क करें: '
                  : 'For insurance-related inquiries, please contact: '
                }
                <a href="mailto:insurance@mnsbankbhopal.com" className="underline hover:text-blue-600">
                  insurance@mnsbankbhopal.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceServicesPage;
