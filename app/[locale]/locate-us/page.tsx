import React from 'react';
import { Metadata } from 'next';
import LocationSearch from '@/components/location/LocationSearch';
import MapMarkers from '@/components/location/MapMarkers';

interface LocateUsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocateUsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'हमें खोजें - महानगर नागरिक सहकारी बैंक'
      : 'Locate Us - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'हमारी शाखाएं और एटीएम खोजें'
      : 'Find our branches and ATMs',
  };
}

export default async function LocateUsPage({ params }: LocateUsPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'हमें खोजें' : 'Locate Us'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'अपने निकटतम शाखा या एटीएम खोजें'
              : 'Find your nearest branch or ATM'}
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <LocationSearch 
            locale={localeTyped}
            onSearch={(params) => {
              console.log('Search params:', params);
            }}
          />
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {locale === 'hi' ? 'हमारे नेटवर्क' : 'Our Network'}
          </h2>
          <MapMarkers 
            locations={[
              {
                id: 'main-branch',
                type: 'branch',
                name: 'Main Branch',
                nameHi: 'मुख्य शाखा',
                address: {
                  line1: '123, Banking Street',
                  line1Hi: '123, बैंकिंग स्ट्रीट',
                  city: 'Bhopal',
                  cityHi: 'भोपाल',
                  state: 'Madhya Pradesh',
                  stateHi: 'मध्य प्रदेश',
                  pincode: '462001',
                  country: 'India',
                  countryHi: 'भारत',
                  latitude: 23.2599,
                  longitude: 77.4126
                },
                contact: {
                  phone: '0755-1234567',
                  email: 'main@mahanagarbank.com'
                },
                hours: {
                  monday: '09:30 - 18:30',
                  mondayHi: '09:30 - 18:30',
                  tuesday: '09:30 - 18:30',
                  tuesdayHi: '09:30 - 18:30',
                  wednesday: '09:30 - 18:30',
                  wednesdayHi: '09:30 - 18:30',
                  thursday: '09:30 - 18:30',
                  thursdayHi: '09:30 - 18:30',
                  friday: '09:30 - 18:30',
                  fridayHi: '09:30 - 18:30',
                  saturday: '09:30 - 18:30',
                  saturdayHi: '09:30 - 18:30',
                  sunday: 'Closed',
                  sundayHi: 'बंद'
                },
                services: ['savings', 'loans', 'deposits'],
                servicesHi: ['बचत', 'ऋण', 'जमा'],
                features: [],
                status: 'active',
                rating: 4.5,
                reviewCount: 127,
                images: [],
                lastUpdated: new Date().toISOString()
              }
            ]}
            locale={localeTyped}
          />
        </div>

        {/* Branch List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {locale === 'hi' ? 'शाखाएं' : 'Branches'}
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'मुख्य शाखा' : 'Main Branch'}
                </h4>
                <p className="text-gray-600">
                  123, Banking Street, {locale === 'hi' ? 'भोपाल' : 'Bhopal'}
                </p>
                <p className="text-gray-600">
                  {locale === 'hi' ? 'फोन: 0755-1234567' : 'Phone: 0755-1234567'}
                </p>
                <p className="text-gray-600">
                  {locale === 'hi' ? 'उपलब्धता: 9:30 AM - 6:30 PM' : 'Hours: 9:30 AM - 6:30 PM'}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'न्यू शाहीदा शाखा' : 'New Shahida Branch'}
                </h4>
                <p className="text-gray-600">
                  456, Market Road, {locale === 'hi' ? 'भोपाल' : 'Bhopal'}
                </p>
                <p className="text-gray-600">
                  {locale === 'hi' ? 'फोन: 0755-2345678' : 'Phone: 0755-2345678'}
                </p>
                <p className="text-gray-600">
                  {locale === 'hi' ? 'उपलब्धता: 9:30 AM - 6:30 PM' : 'Hours: 9:30 AM - 6:30 PM'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {locale === 'hi' ? 'एटीएम' : 'ATMs'}
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'रेलवे स्टेशन एटीएम' : 'Railway Station ATM'}
                </h4>
                <p className="text-gray-600">
                  {locale === 'hi' ? 'भोपाल रेलवे स्टेशन' : 'Bhopal Railway Station'}
                </p>
                <p className="text-gray-600">
                  {locale === 'hi' ? 'उपलब्धता: 24/7' : 'Available: 24/7'}
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'एमपी नगर एटीएम' : 'MP Nagar ATM'}
                </h4>
                <p className="text-gray-600">
                  Zone-I, {locale === 'hi' ? 'एमपी नगर' : 'MP Nagar'}
                </p>
                <p className="text-gray-600">
                  {locale === 'hi' ? 'उपलब्धता: 24/7' : 'Available: 24/7'}
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {locale === 'hi' ? 'हबीबगंज एटीएम' : 'Habibganj ATM'}
                </h4>
                <p className="text-gray-600">
                  {locale === 'hi' ? 'हबीबगंज मुख्य बाजार' : 'Habibganj Main Market'}
                </p>
                <p className="text-gray-600">
                  {locale === 'hi' ? 'उपलब्धता: 24/7' : 'Available: 24/7'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
