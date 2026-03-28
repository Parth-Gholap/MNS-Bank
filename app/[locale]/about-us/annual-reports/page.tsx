'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface AnnualReportsPageProps {
  locale: 'en' | 'hi';
}

const AnnualReportsPage: React.FC<AnnualReportsPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  React.useEffect(() => {
    trackPageView('Annual Reports', locale === 'hi' ? 'वार्षिक रिपोर्ट' : 'Annual Reports');
  }, [locale]);

  const annualReports = [
    {
      year: 2023,
      title: locale === 'hi' ? 'वार्षिक रिपोर्ट 2023-24' : 'Annual Report 2023-24',
      type: 'PDF',
      size: '2.4 MB',
      downloadUrl: '#',
      description: locale === 'hi' 
        ? 'वित्त वर्ष में बैंक का वित्त विवरण, पूंजीब दर, और ऑडिट रिपोर्ट।'
        : 'Complete financial statements including balance sheet, profit & loss, and audit reports.'
    },
    {
      year: 2022,
      title: locale === 'hi' ? 'वार्षिक रिपोर्ट 2022-23' : 'Annual Report 2022-23',
      type: 'PDF',
      size: '2.1 MB',
      downloadUrl: '#',
      description: locale === 'hi' 
        ? 'वित्त वर्ष में बैंक का वित्त विवरण, पूंजीब दर, और ऑडिट रिपोर्ट।'
        : 'Complete financial statements including balance sheet, profit & loss, and audit reports.'
    },
    {
      year: 2021,
      title: locale === 'hi' ? 'वार्षिक रिपोर्ट 2021-22' : 'Annual Report 2021-22',
      type: 'PDF',
      size: '1.8 MB',
      downloadUrl: '#',
      description: locale === 'hi' 
        ? 'वित्त वर्ष में बैंक का वित्त विवरण, पूंजीब दर, और ऑडिट रिपोर्ट।'
        : 'Complete financial statements including balance sheet, profit & loss, and audit reports.'
    }
  ];

  const keyHighlights = [
    {
      label: locale === 'hi' ? 'कुल जमा पूंजीब' : 'Total Business',
      value: locale === 'hi' ? '₹1,245.67 करोड़' : '₹1,245.67 Crore',
      change: '+12.5%'
    },
    {
      label: locale === 'hi' ? 'कुल जमा जमा' : 'Total Deposits',
      value: locale === 'hi' ? '₹987.34 करोड़' : '₹987.34 Crore',
      change: '+15.2%'
    },
    {
      label: locale === 'hi' ? 'कुल ऋण' : 'Total Advances',
      value: locale === 'hi' ? '₹765.23 करोड़' : '₹765.23 Crore',
      change: '+18.7%'
    },
    {
      label: locale === 'hi' ? 'शुद्ध लाभ' : 'Net Profit',
      value: locale === 'hi' ? '₹12.45 करोड़' : '₹12.45 Crore',
      change: '+22.3%'
    },
    {
      label: locale === 'hi' ? 'कैपिटल अनुपात अनुपात' : 'Capital Adequacy Ratio',
      value: '14.25%',
      change: '+0.5%'
    },
    {
      label: locale === 'hi' ? 'गुणवत्त गुणवत्त अनुपात' : 'CRAR',
      value: '8.92%',
      change: '+1.2%'
    }
  ];

  const handleDownload = (report: any) => {
    // Create a simple text file download for demo
    const content = `${report.title}\n\n${report.description}\n\n${locale === 'hi' ? 'डाउनलोड: ' : 'Download: '} ${report.size}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
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
            {locale === 'hi' ? 'वार्षिक रिपोर्ट' : 'Annual Reports'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमार नागरिक सहकारी बैंक के वित्त विवरण, ऑडिट रिपोर्ट, और मुख्य नीतियों तक पहुंच सकते हैं।'
              : 'Access MNS Bank\'s annual financial reports, audit statements, and key performance indicators.'
            }
          </p>
        </div>

        {/* Key Financial Highlights */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'मुख्य वित्त विवरण' : 'Key Financial Highlights'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyHighlights.map((highlight, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {highlight.label}
                  </span>
                  <span className={`text-sm ${highlight.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                    {highlight.value}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {locale === 'hi' ? 'पिछले वर्ष से परिवर्तन' : 'vs Previous Year'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Reports Table */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'वार्षिक रिपोर्ट डाउनलोड' : 'Annual Reports Download'}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'वर्ष' : 'Year'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'रिपोर्ट' : 'Report Title'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'प्रकार' : 'Type'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'आकार' : 'Size'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'डाउनलोड' : 'Download'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {annualReports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {report.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDownload(report)}
                        className="text-bank-blue-600 hover:text-bank-blue-700 font-medium text-sm"
                      >
                        {locale === 'hi' ? 'डाउनलोड' : 'Download'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'अतिरिक्त जानकारी' : 'Important Information'}
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              {locale === 'hi' 
                ? 'वार्षिक रिपोर्ट RBI के दिशानचों के अनुसार अनुसार प्रकार रूप से तैयार किए जाते हैं। सभी रिपोर्ट बैंक नियामक के नियमों के अनुसार अनुसार द्वारा जाता है।'
                : 'Annual reports are prepared in accordance with RBI guidelines and are audited by statutory auditors.'
              }
            </p>
            <p>
              {locale === 'hi' 
                ? 'डिजिटल प्रारूपों के लिए कृपया ग्राहक की जांच की जा सत्यापन किया जा सकते हैं।'
                : 'Hard copies of annual reports are available at all our branches during banking hours.'
              }
            </p>
            <div className="mt-6 p-4 bg-bank-blue-50 rounded-lg">
              <p className="text-bank-blue-800 font-medium">
                {locale === 'hi' 
                  ? 'किसी भी प्रश्न या है, तो कृपया करें: '
                  : 'For any inquiries: '
                }
                <a href="mailto:info@mnsbankbhopal.com" className="underline hover:text-bank-blue-600">
                  info@mnsbankbhopal.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualReportsPage;
