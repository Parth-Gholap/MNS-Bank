'use client';

import React from 'react';

interface BusinessServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function BusinessServicesPage({ params }: BusinessServicesPageProps) {
  const [locale, setLocale] = React.useState<'en' | 'hi'>('en');
  
  React.useEffect(() => {
    params.then((resolvedParams) => {
      const localeValue = resolvedParams.locale;
      setLocale(localeValue as 'en' | 'hi');
    });
  }, [params]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'व्यवसाय सेवाएं' : 'Business Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपके व्यवसाय के विकास के लिए व्यापक समाधान'
              : 'Comprehensive solutions for your business growth'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cash Management */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'नकदी प्रबंधन' : 'Cash Management'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'कुशल नकदी प्रवाह प्रबंधन' : 'Efficient cash flow management'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'दैनिक नकदी संग्रह' : 'Daily cash collection'}</li>
              <li>• {locale === 'hi' ? 'वॉल्ट सेवाएं' : 'Vault services'}</li>
              <li>• {locale === 'hi' ? 'नकदी परिवहन' : 'Cash transportation'}</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {locale === 'hi' ? 'अभी शुरू करें' : 'Get Started'}
            </button>
          </div>

          {/* Trade Finance */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'व्यापार वित्त' : 'Trade Finance'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'अंतर्राष्ट्रीय व्यापार समर्थन' : 'International trade support'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'आयात-निर्यात वित्त' : 'Import-export finance'}</li>
              <li>• {locale === 'hi' ? 'ऋण पत्र' : 'Letters of credit'}</li>
              <li>• {locale === 'hi' ? 'विदेशी मुद्रा सेवाएं' : 'Forex services'}</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
            </button>
          </div>

          {/* Working Capital */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'कार्यशील पूंजी' : 'Working Capital'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'व्यापार संचालन के लिए वित्त' : 'Finance for business operations'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'अल्पावधि ऋण' : 'Short-term loans'}</li>
              <li>• {locale === 'hi' ? 'इन्वेंट्री वित्त' : 'Inventory finance'}</li>
              <li>• {locale === 'hi' ? 'बिल खरीदना' : 'Bill discounting'}</li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              {locale === 'hi' ? 'अभी जानें' : 'Learn More'}
            </button>
          </div>

          {/* Merchant Services */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'व्यापारी सेवाएं' : 'Merchant Services'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'भुगतान समाधान' : 'Payment solutions'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'पीओएस मशीन' : 'POS machines'}</li>
              <li>• {locale === 'hi' ? 'ऑनलाइन भुगतान' : 'Online payments'}</li>
              <li>• {locale === 'hi' ? 'क्यूआर कोड' : 'QR codes'}</li>
            </ul>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              {locale === 'hi' ? 'अभी सेटअप करें' : 'Setup Now'}
            </button>
          </div>

          {/* Payroll Services */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'वेतन सेवाएं' : 'Payroll Services'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'कर्मचारी वेतन प्रबंधन' : 'Employee salary management'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'वेतन खाता' : 'Salary accounts'}</li>
              <li>• {locale === 'hi' ? 'वेतन प्रसंस्करण' : 'Payroll processing'}</li>
              <li>• {locale === 'hi' ? 'कर निर्धारण' : 'Tax deductions'}</li>
            </ul>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              {locale === 'hi' ? 'अभी शुरू करें' : 'Start Now'}
            </button>
          </div>

          {/* Insurance Services */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'बीमा सेवाएं' : 'Insurance Services'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'व्यापार सुरक्षा' : 'Business protection'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'संपत्ति बीमा' : 'Property insurance'}</li>
              <li>• {locale === 'hi' ? 'कर्मचारी बीमा' : 'Employee insurance'}</li>
              <li>• {locale === 'hi' ? 'देयता बीमा' : 'Liability insurance'}</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              {locale === 'hi' ? 'अभी कवर करें' : 'Get Covered'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
