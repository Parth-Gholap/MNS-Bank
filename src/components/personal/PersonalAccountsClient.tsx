'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface PersonalAccountsClientProps {
  locale: 'en' | 'hi';
}

export default function PersonalAccountsClient({ locale }: PersonalAccountsClientProps) {
  const router = useRouter();

  const handleOpenAccount = (accountType: string) => {
    router.push(`/${locale}/apply/account/application?type=${accountType}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'खाते' : 'Accounts'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आपकी बैंकिंग जरूरतों के लिए सही खाता चुनें'
              : 'Choose the right account for your banking needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Savings Account */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'बचत खाता' : 'Savings Account'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'आकर्षक ब्याज दरों के साथ बचत' : 'Savings with attractive interest rates'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? '3.5% - 4% वार्षिक ब्याज' : '3.5% - 4% annual interest'}</li>
              <li>• {locale === 'hi' ? 'न्यूनतम शेष नहीं' : 'No minimum balance'}</li>
              <li>• {locale === 'hi' ? 'डिजिटल बैंकिंग सुविधा' : 'Digital banking facilities'}</li>
            </ul>
            <button 
              onClick={() => handleOpenAccount('savings')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
            </button>
          </div>

          {/* Current Account */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'चालू खाता' : 'Current Account'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'व्यवसाय और व्यक्तिगत लेनदेन' : 'Business and personal transactions'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'असीमित लेनदेन' : 'Unlimited transactions'}</li>
              <li>• {locale === 'hi' ? 'ओवरड्राफ्ट सुविधा' : 'Overdraft facility'}</li>
              <li>• {locale === 'hi' ? 'चेकबुक सुविधा' : 'Chequebook facility'}</li>
            </ul>
            <button 
              onClick={() => handleOpenAccount('current')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
            </button>
          </div>

          {/* Senior Citizen Account */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👴</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'वरिष्ठ नागरिक खाता' : 'Senior Citizen Account'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? 'वरिष्ठ नागरिकों के लिए विशेष लाभ' : 'Special benefits for senior citizens'}
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4">
              <li>• {locale === 'hi' ? 'अधिक ब्याज दरें' : 'Higher interest rates'}</li>
              <li>• {locale === 'hi' ? 'न्यूनतम शेष छूट' : 'Minimum balance waiver'}</li>
              <li>• {locale === 'hi' ? 'प्राथमिकता सेवा' : 'Priority service'}</li>
            </ul>
            <button 
              onClick={() => handleOpenAccount('senior')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {locale === 'hi' ? 'अभी खोलें' : 'Open Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
