'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface TendersPageProps {
  locale: 'en' | 'hi';
}

const TendersPage: React.FC<TendersPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView('Tenders', locale === 'hi' ? 'टेंडर' : 'Tenders');
  }, [locale]);

  const activeTenders = [
    {
      id: 1,
      title: locale === 'hi' ? 'बैंक के लिए सीसीटीवी सिस्टम की आपूर्ति और स्थापना' : 'Supply and Installation of CCTV System for Bank',
      category: locale === 'hi' ? 'सुरक्षा प्रणाली' : 'Security Systems',
      lastDate: locale === 'hi' ? '15 अप्रैल 2026' : '15 April 2026',
      status: locale === 'hi' ? 'सक्रिय' : 'Active',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: locale === 'hi' ? 'बैंक शाखाओं के लिए फर्नीचर की आपूर्ति' : 'Supply of Furniture for Bank Branches',
      category: locale === 'hi' ? 'फर्नीचर' : 'Furniture',
      lastDate: locale === 'hi' ? '20 अप्रैल 2026' : '20 April 2026',
      status: locale === 'hi' ? 'सक्रिय' : 'Active',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: locale === 'hi' ? 'एटीएम मशीन की रखरखाव सेवाएं' : 'ATM Machine Maintenance Services',
      category: locale === 'hi' ? 'रखरखाव' : 'Maintenance',
      lastDate: locale === 'hi' ? '25 अप्रैल 2026' : '25 April 2026',
      status: locale === 'hi' ? 'सक्रिय' : 'Active',
      downloadUrl: '#'
    }
  ];

  const closedTenders = [
    {
      id: 4,
      title: locale === 'hi' ? 'बैंक के लिए कंप्यूटर सिस्टम की आपूर्ति' : 'Supply of Computer Systems for Bank',
      category: locale === 'hi' ? 'आईटी हार्डवेयर' : 'IT Hardware',
      lastDate: locale === 'hi' ? '15 मार्च 2026' : '15 March 2026',
      status: locale === 'hi' ? 'बंद' : 'Closed',
      downloadUrl: '#'
    },
    {
      id: 5,
      title: locale === 'hi' ? 'बैंक वाहनों का बीमा' : 'Insurance for Bank Vehicles',
      category: locale === 'hi' ? 'बीमा' : 'Insurance',
      lastDate: locale === 'hi' ? '10 मार्च 2026' : '10 March 2026',
      status: locale === 'hi' ? 'बंद' : 'Closed',
      downloadUrl: '#'
    }
  ];

  const handleDownload = (tender: any) => {
    const content = locale === 'hi' 
      ? `महानगर नागरिक सहकारी बैंक\nटेंडर दस्तावेज़\n\nटेंडर ID: ${tender.id}\nशीर्षक: ${tender.title}\nश्रेणी: ${tender.category}\nअंतिम तिथि: ${tender.lastDate}\n\nकृपया विस्तृत जानकारी के लिए बैंक से संपर्क करें`
      : `Mahanagar Nagrik Sahakari Bank\nTender Document\n\nTender ID: ${tender.id}\nTitle: ${tender.title}\nCategory: ${tender.category}\nLast Date: ${tender.lastDate}\n\nPlease contact bank for detailed information`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tender-${tender.id}-${tender.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
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
            {locale === 'hi' ? 'टेंडर' : 'Tenders'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमार नागरिक सहकारी बैंक के टेंडर और खरीद अवसरों के बारे में जानकारी प्राप्त करें।'
              : 'Access information about tenders and procurement opportunities at our cooperative bank.'
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
              ? 'सभी टेंडर आवेदनों को निर्धारित तिथि से पहले जमा किया जाना चाहिए। विलंबित आवेदनों पर विचार नहीं किया जाएगा।'
              : 'All tender applications must be submitted before the specified date. Late applications will not be considered.'
            }
          </p>
        </div>

        {/* Active Tenders */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'सक्रिय टेंडर' : 'Active Tenders'}
          </h2>
          <div className="space-y-4">
            {activeTenders.map((tender) => (
              <div key={tender.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tender.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {tender.category}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {tender.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-red-600 mb-2">
                      {locale === 'hi' ? 'अंतिम तिथि:' : 'Last Date:'}
                    </p>
                    <p className="text-gray-900 mb-3">{tender.lastDate}</p>
                    <button
                      onClick={() => handleDownload(tender)}
                      className="bg-bank-blue-600 text-white px-4 py-2 rounded hover:bg-bank-blue-700 transition-colors"
                    >
                      {locale === 'hi' ? 'डाउनलोड' : 'Download'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closed Tenders */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'बंद टेंडर' : 'Closed Tenders'}
          </h2>
          <div className="space-y-4">
            {closedTenders.map((tender) => (
              <div key={tender.id} className="border border-gray-200 rounded-lg p-6 opacity-75">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tender.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {tender.category}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                        {tender.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 mb-2">
                      {locale === 'hi' ? 'बंद हो गया:' : 'Closed:'}
                    </p>
                    <p className="text-gray-900 mb-3">{tender.lastDate}</p>
                    <button
                      onClick={() => handleDownload(tender)}
                      className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                      disabled
                    >
                      {locale === 'hi' ? 'बंद' : 'Closed'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tender Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'टेंडर प्रक्रिया' : 'Tender Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'टेंडर आवेदन कैसे करें' : 'How to Apply for Tenders'}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'बैंक की वेबसाइट पर टेंडर दस्तावेज़ डाउनलोड करें' : 'Download tender document from bank website'}</li>
                <li>{locale === 'hi' ? 'टेंडर दस्तावेज़ ध्यान से पढ़ें' : 'Read tender document carefully'}</li>
                <li>{locale === 'hi' ? 'आवश्यक दस्तावेज़ तैयार करें' : 'Prepare required documents'}</li>
                <li>{locale === 'hi' ? 'निर्धारित प्रारूप में आवेदन भरें' : 'Fill application in prescribed format'}</li>
                <li>{locale === 'hi' ? 'अंतिम तिथि से पहले जमा करें' : 'Submit before last date'}</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'आवश्यक दस्तावेज़' : 'Required Documents'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{locale === 'hi' ? 'कंपनी पंजीकरण प्रमाण' : 'Company Registration Certificate'}</li>
                <li>{locale === 'hi' ? 'पैन कार्ड' : 'PAN Card'}</li>
                <li>{locale === 'hi' ? 'जीएसटी पंजीकरण' : 'GST Registration'}</li>
                <li>{locale === 'hi' ? 'वित्तीय बयान' : 'Financial Statements'}</li>
                <li>{locale === 'hi' ? 'अनुभव प्रमाण पत्र' : 'Experience Certificates'}</li>
                <li>{locale === 'hi' ? 'ईएमडी जमा रसीद' : 'EMD Deposit Receipt'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'नियम और शर्तें' : 'Terms and Conditions'}
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              {locale === 'hi' 
                ? 'बैंक किसी भी टेंडर को स्वीकार या अस्वीकार करने का अधिकार सुरक्षित रखता है।'
                : 'The bank reserves the right to accept or reject any tender.'
              }
            </p>
            <p>
              {locale === 'hi' 
                ? 'टेंडर दस्तावेज़ में किए गए किसी भी बदलाव की सूचना बैंक की वेबसाइट पर दी जाएगी।'
                : 'Any changes to tender documents will be notified on the bank website.'
              }
            </p>
            <p>
              {locale === 'hi' 
                ? 'टेंडर प्रक्रिया में भ्रष्टाचार या अनुचित प्रभाव डालने की कोई स्थिति सहन नहीं की जाएगी।'
                : 'Any corruption or undue influence in the tender process will not be tolerated.'
              }
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                {locale === 'hi' 
                  ? 'टेंडर संबंधी प्रश्नों के लिए कृपया संपर्क करें: '
                  : 'For tender-related inquiries, please contact: '
                }
                <a href="mailto:tenders@mnsbankbhopal.com" className="underline hover:text-blue-600">
                  tenders@mnsbankbhopal.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TendersPage;
