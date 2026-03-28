'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface MutualFundsPageProps {
  locale: 'en' | 'hi';
}

const MutualFundsPage: React.FC<MutualFundsPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView('Mutual Funds', locale === 'hi' ? 'म्यूचुअल फंड्स' : 'Mutual Funds');
  }, [locale]);

  const fundCategories = [
    {
      id: 1,
      name: locale === 'hi' ? 'इक्विटी फंड' : 'Equity Funds',
      description: locale === 'hi' 
        ? 'उच्च विकास क्षमता वाले इक्विटी फंड निवेशन'
        : 'High growth potential equity fund investments',
      riskLevel: locale === 'hi' ? 'उच्च' : 'High',
      minInvestment: locale === 'hi' ? '₹500' : '₹500',
      returns: locale === 'hi' ? '12-18% प्रति वर्ष' : '12-18% p.a.'
    },
    {
      id: 2,
      name: locale === 'hi' ? 'डेट फंड' : 'Debt Funds',
      description: locale === 'hi' 
        ? 'स्थिर रिटर्न के साथ डेट फंड निवेशन'
        : 'Stable returns with debt fund investments',
      riskLevel: locale === 'hi' ? 'कम' : 'Low',
      minInvestment: locale === 'hi' ? '₹1000' : '₹1000',
      returns: locale === 'hi' ? '6-9% प्रति वर्ष' : '6-9% p.a.'
    },
    {
      id: 3,
      name: locale === 'hi' ? 'हाइब्रिड फंड' : 'Hybrid Funds',
      description: locale === 'hi' 
        ? 'इक्विटी और डेट का संतुलित मिश्रण'
        : 'Balanced mix of equity and debt',
      riskLevel: locale === 'hi' ? 'मध्यम' : 'Medium',
      minInvestment: locale === 'hi' ? '₹500' : '₹500',
      returns: locale === 'hi' ? '8-12% प्रति वर्ष' : '8-12% p.a.'
    },
    {
      id: 4,
      name: locale === 'hi' ? 'एलआईसीपी' : 'ELSS',
      description: locale === 'hi' 
        ? 'कर बचाओ के साथ इक्विटी लिंक्ड सेविंग स्कीम'
        : 'Equity Linked Saving Scheme with tax benefits',
      riskLevel: locale === 'hi' ? 'उच्च' : 'High',
      minInvestment: locale === 'hi' ? '₹1500' : '₹1500',
      returns: locale === 'hi' ? '10-15% प्रति वर्ष' : '10-15% p.a.'
    }
  ];

  const benefits = [
    {
      icon: '📈',
      title: locale === 'hi' ? 'पेशेशनल विशेषज्ञ' : 'Professional Management',
      description: locale === 'hi' 
        ? 'अनुभवी फंड मैनेजर्स द्वारा पेशेशनल फंड प्रबंधन'
        : 'Professional fund management by experienced managers'
    },
    {
      icon: '🌍',
      title: locale === 'hi' ? 'िविधत निवेश' : 'Diversified Investment',
      description: locale === 'hi' 
        ? 'कई कंपनियों और क्षेत्रों में विविधत निवेश'
        : 'Diversified investments across multiple companies and sectors'
    },
    {
      icon: '💰',
      title: locale === 'hi' ? 'कर लाभ' : 'Tax Benefits',
      description: locale === 'hi' 
        ? 'ELSS और अन्य टैक-बचत फंड्स में कर लाभ'
        : 'Tax benefits in ELSS and other tax-saving funds'
    },
    {
      icon: '🔒',
      title: locale === 'hi' ? 'सुरक्षित निवेश' : 'Secure Investment',
      description: locale === 'hi' 
        ? 'SEBI विनियमन और अम्फी दिशानिर्देश के तहत सुरक्षित'
        : 'Secure under SEBI regulations and AMFI guidelines'
    }
  ];

  const handleEnquiry = (fundId: number) => {
    const content = locale === 'hi' 
      ? `महानगर नागरिक सहकारी बैंक\nम्यूचुअल फंड्स पूछताछ\n\nफंड ID: ${fundId}\n\nकृपया अपना विवरण भेजें`
      : `Mahanagar Nagrik Sahakari Bank\nMutual Funds Inquiry\n\nFund ID: ${fundId}\n\nPlease send your details`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mutual-funds-enquiry-${fundId}.txt`;
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
            {locale === 'hi' ? 'म्यूचुअल फंड्स' : 'Mutual Funds'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमारे प्रतिष्ठित एएमसी साझेदारों के साथ व्यापक म्यूचुअल फंड निवेशन विकल्प'
              : 'Access comprehensive mutual fund investment options with our trusted AMFI partners'
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
              ? 'म्यूचुअल फंड सेवाएं केवल तब्बी उपलब्ध हैं जब बैंक को AMFI द्वारा अंपील किया गया है। सभी म्यूचुअल फंड एएमसी कंपनियों के नियमों और शर्तों के अधीन हैं।'
              : 'Mutual fund services are available only when the bank is empanelled with AMFI. All mutual funds are subject to the terms and conditions of the AMFI companies.'
            }
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'म्यूचुअल फंड के लाभ' : 'Mutual Fund Benefits'}
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

        {/* Fund Categories */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'फंड श्रेणियां' : 'Fund Categories'}
          </h2>
          <div className="space-y-6">
            {fundCategories.map((fund) => (
              <div key={fund.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {fund.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{fund.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        fund.riskLevel === 'High' ? 'bg-red-100 text-red-800'
                        : fund.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                      }`}>
                        {fund.riskLevel} {locale === 'hi' ? 'जोखिम' : 'Risk'}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {fund.minInvestment} {locale === 'hi' ? 'न्यूनतम' : 'Min'}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {fund.returns}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => handleEnquiry(fund.id)}
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
            {locale === 'hi' ? 'म्यूचुअल फंड खरीद प्रक्रिया' : 'Mutual Fund Purchase Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'कैसे खरीदें' : 'How to Purchase'}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'बैंक शाखा में जाएं' : 'Visit our bank branch'}</li>
                <li>{locale === 'hi' ? 'म्यूचुअल फंड सलाहकार से मिलें' : 'Meet with our mutual fund advisor'}</li>
                <li>{locale === 'hi' ? 'अपनी निवेश आवश्यकताएं चर्चा करें' : 'Discuss your investment requirements'}</li>
                <li>{locale === 'hi' ? 'उपयुक्त फंड चुनें' : 'Choose suitable fund'}</li>
                <li>{locale === 'hi' ? 'केवाईसी और नियमों को समझें' : 'Understand KYC and terms'}</li>
                <li>{locale === 'hi' ? 'निवेश करें' : 'Make investment'}</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'पैन कार्ड' : 'PAN Card'}</li>
                <li>{locale === 'hi' ? 'आधार कार्ड' : 'Aadhaar Card'}</li>
                <li>{locale === 'hi' ? 'पता प्रमाण' : 'Address Proof'}</li>
                <li>{locale === 'hi' ? 'बैंक खाता विवरण' : 'Bank Account Statement'}</li>
                <li>{locale === 'hi' ? 'फोटोग्राफ' : 'Photographs'}</li>
                <li>{locale === 'hi' ? 'आय प्रमाण' : 'Income Proof'}</li>
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
                ? 'सिक्यूरिटीज एंड एक्सचेंज बोर्ड ऑफ इंडिया (SEBI) और एसोसिएशन ऑफ म्यूचुअल फंड्स इन इंडिया (AMFI) द्वारा विनियमित बैंक म्यूचुअल फंड सेवाएं प्रदान करता है।'
                : 'Bank provides mutual fund services regulated by the Securities and Exchange Board of India (SEBI) and Association of Mutual Funds in India (AMFI).'
              }
            </p>
            <p>
              {locale === 'hi' 
                ? 'सभी म्यूचुअल फंड एएमसी कंपनियों के नियमों और शर्तों के अधीन हैं। निवेश जोखिम के अधीन हैं।'
                : 'All mutual funds are subject to the terms and conditions of the AMFI companies. Investments are subject to market risks.'
              }
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                {locale === 'hi' 
                  ? 'म्यूचुअल फंड संबंधी प्रश्नों के लिए कृपया संपर्क करें: '
                  : 'For mutual fund-related inquiries, please contact: '
                }
                <a href="mailto:mutualfunds@mnsbankbhopal.com" className="underline hover:text-blue-600">
                  mutualfunds@mnsbankbhopal.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFundsPage;
