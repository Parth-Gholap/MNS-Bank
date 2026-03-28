'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface AtmLocatorPageProps {
  locale: 'en' | 'hi';
}

interface ATM {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: 'on-site' | 'off-site';
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  available: boolean;
}

const AtmLocatorPage: React.FC<AtmLocatorPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  useEffect(() => {
    trackPageView('ATM Locator', locale === 'hi' ? 'एटीएम लोकेटर' : 'ATM Locator');
  }, [locale]);

  const [atms] = useState<ATM[]>([
    {
      id: 1,
      name: 'Head Office ATM',
      address: 'Plot No. 123, MP Nagar',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462016',
      type: 'on-site',
      services: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement', 'Fund Transfer'],
      coordinates: { lat: 23.2599, lng: 77.4126 },
      available: true
    },
    {
      id: 2,
      name: 'New Market ATM',
      address: 'New Market, MP Nagar',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462016',
      type: 'off-site',
      services: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement'],
      coordinates: { lat: 23.2610, lng: 77.4130 },
      available: true
    },
    {
      id: 3,
      name: 'Indore Branch ATM',
      address: 'MG Road, Vijay Nagar',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      type: 'on-site',
      services: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement', 'Fund Transfer', 'Bill Payment'],
      coordinates: { lat: 22.7196, lng: 75.8577 },
      available: true
    },
    {
      id: 4,
      name: 'Palasia ATM',
      address: 'Palasia Square, Indore',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452001',
      type: 'off-site',
      services: ['Cash Withdrawal', 'Balance Inquiry'],
      coordinates: { lat: 22.7180, lng: 75.8560 },
      available: true
    },
    {
      id: 5,
      name: 'Jabalpur Branch ATM',
      address: 'Civil Lines, Wright Town',
      city: 'Jabalpur',
      state: 'Madhya Pradesh',
      pincode: '482001',
      type: 'on-site',
      services: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement'],
      coordinates: { lat: 23.1815, lng: 79.9864 },
      available: true
    },
    {
      id: 6,
      name: 'Cantonment ATM',
      address: 'Cantonment Area, Jabalpur',
      city: 'Jabalpur',
      state: 'Madhya Pradesh',
      pincode: '482001',
      type: 'off-site',
      services: ['Cash Withdrawal', 'Balance Inquiry'],
      coordinates: { lat: 23.1800, lng: 79.9850 },
      available: false
    },
    {
      id: 7,
      name: 'Gwalior Branch ATM',
      address: 'Phool Bagh, Lashkar',
      city: 'Gwalior',
      state: 'Madhya Pradesh',
      pincode: '474009',
      type: 'on-site',
      services: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement', 'Fund Transfer'],
      coordinates: { lat: 26.2183, lng: 78.1828 },
      available: true
    },
    {
      id: 8,
      name: 'City Center ATM',
      address: 'City Center, Gwalior',
      city: 'Gwalior',
      state: 'Madhya Pradesh',
      pincode: '474009',
      type: 'off-site',
      services: ['Cash Withdrawal', 'Balance Inquiry'],
      coordinates: { lat: 26.2170, lng: 78.1810 },
      available: true
    }
  ]);

  const [selectedATM, setSelectedATM] = useState<ATM | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredATMs = atms.filter(atm => {
    const matchesSearch = atm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        atm.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        atm.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || atm.city === selectedCity;
    const matchesType = selectedType === 'all' || atm.type === selectedType;
    return matchesSearch && matchesCity && matchesType;
  });

  const cities = Array.from(new Set(atms.map(atm => atm.city)));

  const getDirections = (atm: ATM) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${atm.coordinates.lat},${atm.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const availableATMs = filteredATMs.filter(atm => atm.available).length;
  const totalATMs = filteredATMs.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'एटीएम लोकेटर' : 'ATM Locator'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमारे एटीएम नेटवर्क का पता लगाएं और निकटतम एटीएम खोजें'
              : 'Find our ATM network and locate the nearest ATM to you'
            }
          </p>
        </div>

        {/* ATM Usage Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            {locale === 'hi' ? 'एटीएम उपयोग गाइड' : 'ATM Usage Guide'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-blue-700">
              <h3 className="font-semibold mb-2">
                {locale === 'hi' ? 'नकद निकासी' : 'Cash Withdrawal'}
              </h3>
              <p className="text-sm">
                {locale === 'hi' 
                  ? 'प्रति दिन ₹40,000 तक नकद निकासी'
                  : 'Cash withdrawal up to ₹40,000 per day'
                }
              </p>
            </div>
            <div className="text-blue-700">
              <h3 className="font-semibold mb-2">
                {locale === 'hi' ? 'बैलेंस पूछताछ' : 'Balance Inquiry'}
              </h3>
              <p className="text-sm">
                {locale === 'hi' 
                  ? 'किसी भी समय खाता शेष जांचें'
                  : 'Check account balance anytime'
                }
              </p>
            </div>
            <div className="text-blue-700">
              <h3 className="font-semibold mb-2">
                {locale === 'hi' ? 'लघु विवरण' : 'Mini Statement'}
              </h3>
              <p className="text-sm">
                {locale === 'hi' 
                  ? 'अंतिम 10 लेनदेनों का विवरण'
                  : 'Last 10 transactions details'
                }
              </p>
            </div>
            <div className="text-blue-700">
              <h3 className="font-semibold mb-2">
                {locale === 'hi' ? 'फंड ट्रांसफर' : 'Fund Transfer'}
              </h3>
              <p className="text-sm">
                {locale === 'hi' 
                  ? 'NEFT/IMPS के माध्यम से फंड ट्रांसफर'
                  : 'Fund transfer via NEFT/IMPS'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'एटीएम खोजें' : 'Search ATMs'}
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={locale === 'hi' ? 'एटीएम नाम, पता, शहर...' : 'ATM name, address, city...'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'शहर चुनें' : 'Select City'}
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
              >
                <option value="all">
                  {locale === 'hi' ? 'सभी शहर' : 'All Cities'}
                </option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'एटीएम प्रकार' : 'ATM Type'}
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
              >
                <option value="all">
                  {locale === 'hi' ? 'सभी प्रकार' : 'All Types'}
                </option>
                <option value="on-site">
                  {locale === 'hi' ? 'शाखा में' : 'On-site (Branch)'}
                </option>
                <option value="off-site">
                  {locale === 'hi' ? 'शाखा के बाहर' : 'Off-site'}
                </option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                {locale === 'hi' 
                  ? `${availableATMs}/${totalATMs} एटीएम उपलब्ध`
                  : `${availableATMs}/${totalATMs} ATMs available`
                }
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'इंटरैक्टिव मैप' : 'Interactive Map'}
              </h3>
              <p className="text-gray-600 mb-4">
                {locale === 'hi' 
                  ? 'गूगल मैप्स एकीकरण विकासाधीन है'
                  : 'Google Maps integration under development'
                }
              </p>
              <p className="text-sm text-gray-500">
                {locale === 'hi' 
                  ? 'एटीएम को नीचे सूचीबद्ध किया गया है'
                  : 'ATMs listed below'
                }
              </p>
            </div>
          </div>
        </div>

        {/* ATM List */}
        <div className="space-y-6">
          {filteredATMs.map((atm) => (
            <div key={atm.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900 mr-3">
                      {atm.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      atm.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {atm.available 
                        ? (locale === 'hi' ? 'उपलब्ध' : 'Available')
                        : (locale === 'hi' ? 'अनुपलब्ध' : 'Unavailable')
                      }
                    </span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {atm.type === 'on-site' 
                        ? (locale === 'hi' ? 'शाखा में' : 'On-site')
                        : (locale === 'hi' ? 'शाखा के बाहर' : 'Off-site')
                      }
                    </span>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <span className="mr-2">📍</span>
                      {atm.address}, {atm.city}, {atm.state} - {atm.pincode}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => setSelectedATM(atm)}
                    className="bg-bank-blue-600 text-white px-4 py-2 rounded hover:bg-bank-blue-700 transition-colors mb-2"
                  >
                    {locale === 'hi' ? 'विवरण देखें' : 'View Details'}
                  </button>
                  <br />
                  <button
                    onClick={() => getDirections(atm)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    disabled={!atm.available}
                  >
                    {locale === 'hi' ? 'दिशाएं प्राप्त करें' : 'Get Directions'}
                  </button>
                </div>
              </div>
              
              {/* Services */}
              <div className="flex flex-wrap gap-2">
                {atm.services.map((service, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ATM Details Modal */}
        {selectedATM && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedATM.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedATM.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedATM.available 
                        ? (locale === 'hi' ? 'उपलब्ध' : 'Available')
                        : (locale === 'hi' ? 'अनुपलब्ध' : 'Unavailable')
                      }
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {selectedATM.type === 'on-site' 
                        ? (locale === 'hi' ? 'शाखा में' : 'On-site')
                        : (locale === 'hi' ? 'शाखा के बाहर' : 'Off-site')
                      }
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedATM(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === 'hi' ? 'पता' : 'Address'}
                  </h3>
                  <p className="text-gray-600">
                    {selectedATM.address}<br />
                    {selectedATM.city}, {selectedATM.state} - {selectedATM.pincode}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === 'hi' ? 'सेवाएं' : 'Services'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedATM.services.map((service, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    {locale === 'hi' ? 'महत्वपूर्ण जानकारी' : 'Important Information'}
                  </h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• {locale === 'hi' ? 'प्रति लेनदेन ₹25,000 तक नकद निकासी' : 'Cash withdrawal up to ₹25,000 per transaction'}</li>
                    <li>• {locale === 'hi' ? 'दैनिक सीमा ₹40,000' : 'Daily limit ₹40,000'}</li>
                    <li>• {locale === 'hi' ? '24/7 सेवा उपलब्ध (चयनित एटीएम पर)' : '24/7 service available (selected ATMs)'}</li>
                    <li>• {locale === 'hi' ? 'कृपया अपना कार्ड और पिन गुप्त रखें' : 'Please keep your card and PIN confidential'}</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => getDirections(selectedATM)}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                  disabled={!selectedATM.available}
                >
                  {locale === 'hi' ? 'दिशाएं प्राप्त करें' : 'Get Directions'}
                </button>
                <button
                  onClick={() => setSelectedATM(null)}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  {locale === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtmLocatorPage;
