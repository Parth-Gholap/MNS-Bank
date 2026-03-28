'use client';

import React, { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface DownloadFormsPageProps {
  locale: 'en' | 'hi';
}

interface Form {
  id: string;
  name: string;
  description: string;
  category: string;
  format: 'PDF' | 'DOC';
  size: string;
  downloadUrl: string;
  hindiVersion?: boolean;
}

const DownloadFormsPage: React.FC<DownloadFormsPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  useEffect(() => {
    trackPageView('Download Forms', locale === 'hi' ? 'फॉर्म डाउनलोड करें' : 'Download Forms');
  }, [locale]);

  const forms: Form[] = [
    // Account Opening Forms
    {
      id: 'savings-account',
      name: locale === 'hi' ? 'बचत खाता खोलने का फॉर्म' : 'Savings Account Opening Form',
      description: locale === 'hi' 
        ? 'नया बचत खाता खोलने के लिए आवेदन पत्र'
        : 'Application form for opening new savings account',
      category: locale === 'hi' ? 'खाता खोलना' : 'Account Opening',
      format: 'PDF',
      size: '245 KB',
      downloadUrl: '/forms/savings-account.pdf',
      hindiVersion: true
    },
    {
      id: 'current-account',
      name: locale === 'hi' ? 'चालू खाता खोलने का फॉर्म' : 'Current Account Opening Form',
      description: locale === 'hi' 
        ? 'व्यावसायिक चालू खाता खोलने के लिए आवेदन पत्र'
        : 'Application form for opening business current account',
      category: locale === 'hi' ? 'खाता खोलना' : 'Account Opening',
      format: 'PDF',
      size: '267 KB',
      downloadUrl: '/forms/current-account.pdf',
      hindiVersion: true
    },
    {
      id: 'fixed-deposit',
      name: locale === 'hi' ? 'सावधि जमा फॉर्म' : 'Fixed Deposit Form',
      description: locale === 'hi' 
        ? 'सावधि जमा खाता खोलने के लिए आवेदन पत्र'
        : 'Application form for opening fixed deposit account',
      category: locale === 'hi' ? 'जमा' : 'Deposits',
      format: 'PDF',
      size: '198 KB',
      downloadUrl: '/forms/fixed-deposit.pdf',
      hindiVersion: true
    },
    {
      id: 'recurring-deposit',
      name: locale === 'hi' ? 'आवर्ती जमा फॉर्म' : 'Recurring Deposit Form',
      description: locale === 'hi' 
        ? 'आवर्ती जमा खाता खोलने के लिए आवेदन पत्र'
        : 'Application form for opening recurring deposit account',
      category: locale === 'hi' ? 'जमा' : 'Deposits',
      format: 'PDF',
      size: '203 KB',
      downloadUrl: '/forms/recurring-deposit.pdf',
      hindiVersion: true
    },
    
    // Loan Application Forms
    {
      id: 'personal-loan',
      name: locale === 'hi' ? 'व्यक्तिगत ऋण आवेदन फॉर्म' : 'Personal Loan Application Form',
      description: locale === 'hi' 
        ? 'व्यक्तिगत ऋण के लिए आवेदन पत्र'
        : 'Application form for personal loan',
      category: locale === 'hi' ? 'ऋण' : 'Loans',
      format: 'PDF',
      size: '312 KB',
      downloadUrl: '/forms/personal-loan.pdf',
      hindiVersion: true
    },
    {
      id: 'home-loan',
      name: locale === 'hi' ? 'गृह ऋण आवेदन फॉर्म' : 'Home Loan Application Form',
      description: locale === 'hi' 
        ? 'गृह ऋण के लिए आवेदन पत्र'
        : 'Application form for home loan',
      category: locale === 'hi' ? 'ऋण' : 'Loans',
      format: 'PDF',
      size: '445 KB',
      downloadUrl: '/forms/home-loan.pdf',
      hindiVersion: true
    },
    {
      id: 'business-loan',
      name: locale === 'hi' ? 'व्यावसायिक ऋण आवेदन फॉर्म' : 'Business Loan Application Form',
      description: locale === 'hi' 
        ? 'व्यावसायिक ऋण के लिए आवेदन पत्र'
        : 'Application form for business loan',
      category: locale === 'hi' ? 'ऋण' : 'Loans',
      format: 'PDF',
      size: '389 KB',
      downloadUrl: '/forms/business-loan.pdf',
      hindiVersion: true
    },
    {
      id: 'vehicle-loan',
      name: locale === 'hi' ? 'वाहन ऋण आवेदन फॉर्म' : 'Vehicle Loan Application Form',
      description: locale === 'hi' 
        ? 'वाहन ऋण के लिए आवेदन पत्र'
        : 'Application form for vehicle loan',
      category: locale === 'hi' ? 'ऋण' : 'Loans',
      format: 'PDF',
      size: '298 KB',
      downloadUrl: '/forms/vehicle-loan.pdf',
      hindiVersion: true
    },
    
    // Service Request Forms
    {
      id: 'cheque-book',
      name: locale === 'hi' ? 'चेक बुक अनुरोध फॉर्म' : 'Cheque Book Request Form',
      description: locale === 'hi' 
        ? 'नया चेक बुक के लिए अनुरोध पत्र'
        : 'Request form for new cheque book',
      category: locale === 'hi' ? 'सेवाएं' : 'Services',
      format: 'PDF',
      size: '156 KB',
      downloadUrl: '/forms/cheque-book.pdf',
      hindiVersion: true
    },
    {
      id: 'debit-card',
      name: locale === 'hi' ? 'डेबिट कार्ड आवेदन फॉर्म' : 'Debit Card Application Form',
      description: locale === 'hi' 
        ? 'डेबिट कार्ड के लिए आवेदन पत्र'
        : 'Application form for debit card',
      category: locale === 'hi' ? 'सेवाएं' : 'Services',
      format: 'PDF',
      size: '189 KB',
      downloadUrl: '/forms/debit-card.pdf',
      hindiVersion: true
    },
    {
      id: 'net-banking',
      name: locale === 'hi' ? 'नेट बैंकिंग पंजीकरण फॉर्म' : 'Net Banking Registration Form',
      description: locale === 'hi' 
        ? 'इंटरनेट बैंकिंग सेवा के लिए पंजीकरण फॉर्म'
        : 'Registration form for internet banking service',
      category: locale === 'hi' ? 'सेवाएं' : 'Services',
      format: 'PDF',
      size: '178 KB',
      downloadUrl: '/forms/net-banking.pdf',
      hindiVersion: true
    },
    {
      id: 'mobile-banking',
      name: locale === 'hi' ? 'मोबाइल बैंकिंग पंजीकरण फॉर्म' : 'Mobile Banking Registration Form',
      description: locale === 'hi' 
        ? 'मोबाइल बैंकिंग सेवा के लिए पंजीकरण फॉर्म'
        : 'Registration form for mobile banking service',
      category: locale === 'hi' ? 'सेवाएं' : 'Services',
      format: 'PDF',
      size: '167 KB',
      downloadUrl: '/forms/mobile-banking.pdf',
      hindiVersion: true
    },
    
    // KYC and Compliance Forms
    {
      id: 'kyc-form',
      name: locale === 'hi' ? 'केवाईसी फॉर्म' : 'KYC Form',
      description: locale === 'hi' 
        ? 'ग्राहक पहचान प्रमाण पत्र'
        : 'Customer identification proof form',
      category: locale === 'hi' ? 'अनुपालन' : 'Compliance',
      format: 'PDF',
      size: '234 KB',
      downloadUrl: '/forms/kyc-form.pdf',
      hindiVersion: true
    },
    {
      id: 'pan-change',
      name: locale === 'hi' ? 'पैन परिवर्तन फॉर्म' : 'PAN Change Request Form',
      description: locale === 'hi' 
        ? 'खाते में पैन नंबर परिवर्तन के लिए फॉर्म'
        : 'Form for PAN number change in account',
      category: locale === 'hi' ? 'अनुपालन' : 'Compliance',
      format: 'PDF',
      size: '145 KB',
      downloadUrl: '/forms/pan-change.pdf',
      hindiVersion: true
    },
    {
      id: 'nomination',
      name: locale === 'hi' ? 'नॉमिनेशन फॉर्म' : 'Nomination Form',
      description: locale === 'hi' 
        ? 'खाते में नॉमिनी नियुक्त करने के लिए फॉर्म'
        : 'Form for appointing nominee in account',
      category: locale === 'hi' ? 'अनुपालन' : 'Compliance',
      format: 'PDF',
      size: '189 KB',
      downloadUrl: '/forms/nomination.pdf',
      hindiVersion: true
    }
  ];

  const categories = Array.from(new Set(forms.map(form => form.category)));
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (form: Form) => {
    // Create a dummy file download since actual files don't exist
    const content = locale === 'hi' 
      ? `महानगर नागरिक सहकारी बैंक\n${form.name}\n\nयह एक नमूना फॉर्म है। कृपया निकटतम शाखा में जाकर वास्तविक फॉर्म प्राप्त करें।\n\nफॉर्म विवरण: ${form.description}\nश्रेणी: ${form.category}\nफॉर्मेट: ${form.format}\nआकार: ${form.size}\n\nधन्यवाद,\nमहानगर नागरिक सहकारी बैंक`
      : `Mahanagar Nagrik Sahakari Bank\n${form.name}\n\nThis is a sample form. Please visit the nearest branch to get the actual form.\n\nForm Description: ${form.description}\nCategory: ${form.category}\nFormat: ${form.format}\nSize: ${form.size}\n\nThank you,\nMahanagar Nagrik Sahakari Bank`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${form.id}-form.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'फॉर्म डाउनलोड करें' : 'Download Forms'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'सभी बैंकिंग फॉर्म डाउनलोड करें और अपनी बैंकिंग जरूरतों को पूरा करें'
              : 'Download all banking forms and complete your banking requirements'
            }
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            {locale === 'hi' ? 'महत्वपूर्ण सूचना' : 'Important Notice'}
          </h2>
          <div className="text-yellow-700 space-y-2">
            <p>• {locale === 'hi' 
              ? 'सभी फॉर्म नमूना के लिए हैं। वास्तविक फॉर्म के लिए कृपया निकटतम शाखा में जाएं।'
              : 'All forms are for sample purposes. Please visit the nearest branch for actual forms.'
            }</p>
            <p>• {locale === 'hi' 
              ? 'फॉर्म भरने से पहले सभी आवश्यक दस्तावेज तैयार रखें।'
              : 'Keep all necessary documents ready before filling forms.'
            }</p>
            <p>• {locale === 'hi' 
              ? 'फॉर्म में गलत जानकारी भरने पर कानूनी कार्रवाई हो सकती है।'
              : 'Legal action may be taken for false information in forms.'
            }</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'फॉर्म खोजें' : 'Search Forms'}
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={locale === 'hi' ? 'फॉर्म नाम, विवरण...' : 'Form name, description...'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'श्रेणी चुनें' : 'Select Category'}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
              >
                <option value="all">
                  {locale === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}
                </option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form) => (
            <div key={form.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {form.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {form.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {form.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {form.format}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {form.size}
                    </span>
                    {form.hindiVersion && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                        {locale === 'hi' ? 'हिंदी उपलब्ध' : 'Hindi Available'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(form)}
                  className="flex-1 bg-bank-blue-600 text-white px-4 py-2 rounded hover:bg-bank-blue-700 transition-colors text-sm"
                >
                  {locale === 'hi' ? 'डाउनलोड करें' : 'Download'}
                </button>
                {form.hindiVersion && (
                  <button
                    onClick={() => handleDownload({...form, id: `${form.id}-hindi`})}
                    className="flex-1 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors text-sm"
                  >
                    {locale === 'hi' ? 'हिंदी' : 'Hindi'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'फॉर्म भरने के निर्देश' : 'Form Filling Instructions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• {locale === 'hi' ? 'पैन कार्ड (मूल प्रति)' : 'PAN Card (Original)'} </li>
                <li>• {locale === 'hi' ? 'आधार कार्ड (मूल प्रति)' : 'Aadhaar Card (Original)'}</li>
                <li>• {locale === 'hi' ? 'पता प्रमाण' : 'Address Proof'}</li>
                <li>• {locale === 'hi' ? 'फोटोग्राफ (2 प्रति)' : 'Photographs (2 copies)'}</li>
                <li>• {locale === 'hi' ? 'हस्ताक्षर' : 'Signature'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'फॉर्म जमा करने के तरीके' : 'Form Submission Methods'}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• {locale === 'hi' ? 'निकटतम शाखा में जमा करें' : 'Submit at nearest branch'}</li>
                <li>• {locale === 'hi' ? 'ईमेल द्वारा भेजें' : 'Send via email'}</li>
                <li>• {locale === 'hi' ? 'ऑनलाइन पोर्टल के माध्यम से' : 'Through online portal'}</li>
                <li>• {locale === 'hi' ? 'डाक द्वारा भेजें' : 'Send by post'}</li>
                <li>• {locale === 'hi' ? 'कूरियर द्वारा' : 'By courier'}</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">
              {locale === 'hi' ? 'सहायता' : 'Help & Support'}
            </h3>
            <p className="text-blue-700">
              {locale === 'hi' 
                ? 'फॉर्म भरने में सहायता के लिए कृपया हमारे हेल्पलाइन 1800-123-4567 पर संपर्क करें या support@mnsbankbhopal.com पर ईमेल करें।'
                : 'For help with form filling, please contact our helpline 1800-123-4567 or email at support@mnsbankbhopal.com.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadFormsPage;
