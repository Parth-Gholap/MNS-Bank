'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface PrivacyPolicyPageProps {
  locale: 'en' | 'hi';
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView('Privacy Policy', locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy');
  }, [locale]);

  const lastUpdated = new Date().toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN');

  const privacyContent = locale === 'hi' ? {
    title: 'गोपनीयता नीति',
    introduction: 'महानगर नागरिक सहकारी बैंक लिमिटेड अपने ग्राहकों की गोपनीयता की सुरक्षा के लिए प्रतिबद्ध है। यह गोपनीयता नीति बताती है कि हम आपकी व्यक्तिगत जानकारी कैसे एकत्र, उपयोग और साझा करते हैं।',
    sections: [
      {
        title: 'जानकारी का संग्रह',
        content: 'हम आपसे विभिन्न स्रोतों से जानकारी एकत्र करते हैं जिसमें खाता खोलने के फॉर्म, लेन-देन रिकॉर्ड, और सेवा अनुरोध शामिल हैं।'
      },
      {
        title: 'जानकारी का उपयोग',
        content: 'आपकी जानकारी का उपयोग खाता प्रबंधन, लेन-देन प्रसंस्करण, नियामक अनुपालन, और सेवा सुधार के लिए किया जाता है।'
      },
      {
        title: 'जानकारी का साझाकरण',
        content: 'हम आपकी जानकारी केवल आपकी सहमति से, कानूनी आवश्यकताओं के तहत, या बैंकिंग सेवाएं प्रदान करने के लिए तीसरे पक्षों के साथ साझा करते हैं।'
      },
      {
        title: 'डेटा सुरक्षा',
        content: 'हम आपकी जानकारी की सुरक्षा के लिए उद्योग-मानक तकनीकी और प्रक्रियाओं का उपयोग करते हैं, जिसमें एन्क्रिप्शन और सुरक्षित सर्वर शामिल हैं।'
      },
      {
        title: 'कुकीज़',
        content: 'हमारी वेबसाइट कुकीज़ का उपयोग उपयोगकर्ता अनुभव को बेहतर बनाने के लिए करती है। आप कुकीज़ को अस्वीकार कर सकते हैं या उन्हें अक्षम कर सकते हैं।'
      },
      {
        title: 'आपके अधिकार',
        content: 'आपको अपनी जानकारी का उपयोग, सुधार, और मिटाने का अधिकार है। आप अपने डेटा सुरक्षा अधिकारों का प्रयोग कर सकते हैं।'
      }
    ],
    contact: 'गोपनीयता संबंधी किसी भी प्रश्न के लिए, कृपया हमसे संपर्क करें:',
    downloadText: 'गोपनीयता नीति डाउनलोड करें'
  } : {
    title: 'Privacy Policy',
    introduction: 'Mahanagar Nagrik Sahakari Bank Limited is committed to protecting the privacy of our customers. This privacy policy explains how we collect, use, and share your personal information.',
    sections: [
      {
        title: 'Information Collection',
        content: 'We collect information from various sources including account opening forms, transaction records, and service requests.'
      },
      {
        title: 'Information Usage',
        content: 'Your information is used for account management, transaction processing, regulatory compliance, and service improvement.'
      },
      {
        title: 'Information Sharing',
        content: 'We share your information only with your consent, as required by law, or with third parties to provide banking services.'
      },
      {
        title: 'Data Security',
        content: 'We use industry-standard technical and organizational measures to protect your information, including encryption and secure servers.'
      },
      {
        title: 'Cookies',
        content: 'Our website uses cookies to enhance your user experience. You can accept or decline cookies through your browser settings.'
      },
      {
        title: 'Your Rights',
        content: 'You have the right to access, correct, and delete your personal information. You can exercise your data protection rights.'
      }
    ],
    contact: 'For any privacy-related questions, please contact us:',
    downloadText: 'Download Privacy Policy'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {privacyContent.title}
          </h1>
          <p className="text-gray-600 mb-4">
            {privacyContent.introduction}
          </p>
          <p className="text-sm text-gray-500">
            {locale === 'hi' ? 'अंतिम अपडेट: ' : 'Last updated: '}{lastUpdated}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {privacyContent.sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'संपर्क करें' : 'Contact Us'}
          </h2>
          <p className="text-gray-600 mb-4">
            {privacyContent.contact}
          </p>
          <div className="space-y-2 text-gray-600">
            <p><strong>{locale === 'hi' ? 'ईमेल: ' : 'Email: '}</strong>privacy@mnsbank.com</p>
            <p><strong>{locale === 'hi' ? 'फोन: ' : 'Phone: '}</strong>+91-755-1234567</p>
            <p><strong>{locale === 'hi' ? 'पता: ' : 'Address: '}</strong>
              {locale === 'hi' 
                ? 'भोपाल, मध्य प्रदेश, भारत'
                : 'Bhopal, Madhya Pradesh, India'
              }
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <button
            onClick={() => {
              // Create a simple text file download
              const content = `${privacyContent.title}\n\n${privacyContent.introduction}\n\n${privacyContent.sections.map(s => `${s.title}\n${s.content}`).join('\n\n')}\n\n${privacyContent.contact}`;
              const blob = new Blob([content], { type: 'text/plain' });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `privacy-policy-${locale}.txt`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            }}
            className="bg-bank-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-bank-blue-700 transition-colors duration-200"
          >
            {privacyContent.downloadText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;