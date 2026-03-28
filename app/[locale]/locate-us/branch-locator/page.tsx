'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface BranchLocatorPageProps {
  locale: 'en' | 'hi';
}

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  timings: string;
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

const BranchLocatorPage: React.FC<BranchLocatorPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    trackPageView('Branch Locator', locale === 'hi' ? 'शाखा लोकेटर' : 'Branch Locator');
  }, [locale]);

  const branches: Branch[] = [
    {
      id: 'main-branch',
      name: locale === 'hi' ? 'मुख्य शाखा' : 'Main Branch',
      address: locale === 'hi' 
        ? 'एम.पी. नगर, भोपाल - 462011'
        : 'M.P. Nagar, Bhopal - 462011',
      phone: '+91-755-2471133',
      email: 'main@mnsbankbhopal.com',
      timings: locale === 'hi' 
        ? 'सुबह 10:00 - शाम 4:30'
        : '10:00 AM - 4:30 PM',
      services: [
        locale === 'hi' ? 'सभी बैंकिंग सेवाएं' : 'All Banking Services',
        locale === 'hi' ? 'लोन सेवाएं' : 'Loan Services',
        locale === 'hi' ? 'डेमिट खाते' : 'Deposit Accounts'
      ],
      coordinates: { lat: 23.2599, lng: 77.4126 }
    },
    {
      id: 'new-market',
      name: locale === 'hi' ? 'न्यू मार्केट शाखा' : 'New Market Branch',
      address: locale === 'hi' 
        ? 'न्यू मार्केट, भोपाल - 462001'
        : 'New Market, Bhopal - 462001',
      phone: '+91-755-2471134',
      email: 'newmarket@mnsbankbhopal.com',
      timings: locale === 'hi' 
        ? 'सुबह 9:30 - शाम 4:00'
        : '9:30 AM - 4:00 PM',
      services: [
        locale === 'hi' ? 'बचत खाते' : 'Savings Accounts',
        locale === 'hi' ? 'चालू खाते' : 'Current Accounts',
        locale === 'hi' ? 'एटीएम सेवाएं' : 'ATM Services'
      ],
      coordinates: { lat: 23.2468, lng: 77.4010 }
    },
    {
      id: 'habibganj',
      name: locale === 'hi' ? 'हबीबीगंज शाखा' : 'Habibganj Branch',
      address: locale === 'hi' 
        ? 'हबीबीगंज, भोपाल - 462016'
        : 'Habibganj, Bhopal - 462016',
      phone: '+91-755-2471135',
      email: 'habibganj@mnsbankbhopal.com',
      timings: locale === 'hi' 
        ? 'सुबह 10:00 - शाम 4:30'
        : '10:00 AM - 4:30 PM',
      services: [
        locale === 'hi' ? 'बचत खाते' : 'Savings Accounts',
        locale === 'hi' ? 'चालू खाते' : 'Current Accounts',
        locale === 'hi' ? 'एटीएम सेवाएं' : 'ATM Services'
      ],
      coordinates: { lat: 23.2547, lng: 77.4235 }
    },
    {
      id: 'kolar',
      name: locale === 'hi' ? 'कोलार शाखा' : 'Kolar Branch',
      address: locale === 'hi' 
        ? 'कोलार, भोपाल - 462042'
        : 'Kolar, Bhopal - 462042',
      phone: '+91-755-2471136',
      email: 'kolar@mnsbankbhopal.com',
      timings: locale === 'hi' 
        ? 'सुबह 9:30 - शाम 4:00'
        : '9:30 AM - 4:00 PM',
      services: [
        locale === 'hi' ? 'बचत खाते' : 'Savings Accounts',
        locale === 'hi' ? 'चालू खाते' : 'Current Accounts',
        locale === 'hi' ? 'एटीएम सेवाएं' : 'ATM Services'
      ],
      coordinates: { lat: 23.2704, lng: 77.4351 }
    },
    {
      id: 'bairagarh',
      name: locale === 'hi' ? 'बैरागढ़ शाखा' : 'Bairagarh Branch',
      address: locale === 'hi' 
        ? 'बैरागढ़, भोपाल - 462022'
        : 'Bairagarh, Bhopal - 462022',
      phone: '+91-755-2471137',
      email: 'bairagarh@mnsbankbhopal.com',
      timings: locale === 'hi' 
        ? 'सुबह 10:00 - शाम 4:30'
        : '10:00 AM - 4:30 PM',
      services: [
        locale === 'hi' ? 'बचत खाते' : 'Savings Accounts',
        locale === 'hi' ? 'चालू खाते' : 'Current Accounts',
        locale === 'hi' ? 'एटीएम सेवाएं' : 'ATM Services'
      ],
      coordinates: { lat: 23.2863, lng: 77.4124 }
    }
  ];

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDirections = (branch: Branch) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'शाखा लोकेटर' : 'Branch Locator'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'अपनी नजदीकतम सबसे करीबी बैंक शाखा खोजें'
              : 'Find the nearest bank branch to your location'
            }
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder={locale === 'hi' ? 'शाखा नाम या पता खोजें...' : 'Search branch name or address...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <div key={branch.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {branch.name}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {branch.timings}
                  </div>
                </div>
                <div className="text-2xl">🏦</div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="text-gray-400 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 0L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{branch.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-gray-400 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74-4.427a1 1 0 01.01-.042l1.358 5.43-.893.892C10.66 4.9 11.454 4.9 12 4.9c.546 0 1.34.004 1.653.896l.893-.893L15.46 3.99a1 1 0 01.01.042l.74 4.427a1 1 0 01.986.836H19a1 1 0 011-1v-1zM18 14a1 1 0 00-1 1H5a1 1 0 00-1 1v1a1 1 0 001 1h12a1 1 0 001-1v-1zM4 4a3 3 0 100 6h12a3 3 0 100-6H4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{branch.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-gray-400 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{branch.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  {locale === 'hi' ? 'सेवाएं:' : 'Services:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {branch.services.map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedBranch(branch)}
                  className="flex-1 bg-bank-blue-600 text-white px-4 py-2 rounded-lg hover:bg-bank-blue-700 transition-colors"
                >
                  {locale === 'hi' ? 'विवरण' : 'Details'}
                </button>
                <button
                  onClick={() => getDirections(branch)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {locale === 'hi' ? 'निर्देशन' : 'Directions'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Branch Details Modal */}
        {selectedBranch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedBranch.name}
                  </h2>
                  <button
                    onClick={() => setSelectedBranch(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-400 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 0L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {locale === 'hi' ? 'पता' : 'Address'}
                      </h3>
                      <p className="text-gray-600">{selectedBranch.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-400 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74-4.427a1 1 0 01.01-.042l1.358 5.43-.893.892C10.66 4.9 11.454 4.9 12 4.9c.546 0 1.34.004 1.653.896l.893-.893L15.46 3.99a1 1 0 01.01.042l.74 4.427a1 1 0 01.986.836H19a1 1 0 011-1v-1zM18 14a1 1 0 00-1 1H5a1 1 0 00-1 1v1a1 1 0 001 1h12a1 1 0 001-1v-1zM4 4a3 3 0 100 6h12a3 3 0 100-6H4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {locale === 'hi' ? 'फोन' : 'Phone'}
                      </h3>
                      <p className="text-gray-600">{selectedBranch.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-400 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {locale === 'hi' ? 'ईमेल' : 'Email'}
                      </h3>
                      <p className="text-gray-600">{selectedBranch.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-400 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm4-1a1 1 0 110 2H6a1 1 0 110-2h8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {locale === 'hi' ? 'समय' : 'Hours'}
                      </h3>
                      <p className="text-gray-600">{selectedBranch.timings}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-400 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {locale === 'hi' ? 'सेवाएं' : 'Services'}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedBranch.services.map((service, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => getDirections(selectedBranch)}
                    className="bg-bank-blue-600 text-white px-6 py-2 rounded-lg hover:bg-bank-blue-700 transition-colors"
                  >
                    {locale === 'hi' ? 'निर्देशन प्राप्त करें' : 'Get Directions'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'शाखा सहायता' : 'Branch Support'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{locale === 'hi' ? 'हेल्पलाइन:' : 'Helpline:'}</strong> +91-755-2471133
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'ईमेल:' : 'Email:'}</strong> branches@mnsbankbhopal.com
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'समय:' : 'Hours:'}</strong> {locale === 'hi' ? 'सुबह 9:00 - शाम 5:00' : '9:00 AM - 5:00 PM'}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'शाखा खोज सहायता' : 'Branch Search Help'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  {locale === 'hi' ? 'शाखा नाम, पता या सेवाओं से खोजें' : 'Search by branch name, address, or services'}
                </p>
                <p>
                  {locale === 'hi' ? 'नक्शा शाखा पर जानकारी प्राप्त करें' : 'Get detailed information about each branch'}
                </p>
                <p>
                  {locale === 'hi' ? 'गूगल मैप से निर्देशन प्राप्त करें' : 'Get directions using Google Maps'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchLocatorPage;