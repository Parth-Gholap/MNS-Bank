import React from 'react';
import { Metadata } from 'next';

interface LockerPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LockerPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'लॉकर सुविधा - महानगर नागरिक सहकारी बैंक'
      : 'Locker Facility - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'सुरक्षित बैंक लॉकर सुविधा - अपनी कीमती चीजें सुरक्षित रखें'
      : 'Secure Bank Locker Facility - Keep your valuables safe',
  };
}

export default async function LockerPage({ params }: LockerPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'लॉकर सुविधा' : 'Locker Facility'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'अपनी कीमती चीजें हमारे सुरक्षित बैंक लॉकर में रखें'
              : 'Keep your valuables safe in our secure bank lockers'}
          </p>
        </div>

        {/* Locker Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-600">S</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'छोटा' : 'Small'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? '12.5" x 6" x 5"' : '12.5" x 6" x 5"'}
            </p>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              ₹{locale === 'hi' ? '1,500' : '1,500'}/-
            </p>
            <p className="text-gray-600 text-sm">
              {locale === 'hi' ? 'प्रति वर्ष' : 'per year'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-green-600">M</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'मध्यम' : 'Medium'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? '15" x 6" x 5"' : '15" x 6" x 5"'}
            </p>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              ₹{locale === 'hi' ? '2,500' : '2,500'}/-
            </p>
            <p className="text-gray-600 text-sm">
              {locale === 'hi' ? 'प्रति वर्ष' : 'per year'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-purple-600">L</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'बड़ा' : 'Large'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? '17" x 6" x 5"' : '17" x 6" x 5"'}
            </p>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              ₹{locale === 'hi' ? '3,500' : '3,500'}/-
            </p>
            <p className="text-gray-600 text-sm">
              {locale === 'hi' ? 'प्रति वर्ष' : 'per year'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-orange-600">XL</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'अतिरिक्त बड़ा' : 'Extra Large'}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === 'hi' ? '24" x 13" x 13"' : '24" x 13" x 13"'}
            </p>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              ₹{locale === 'hi' ? '5,000' : '5,000'}/-
            </p>
            <p className="text-gray-600 text-sm">
              {locale === 'hi' ? 'प्रति वर्ष' : 'per year'}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'लॉकर सुविधाओं की विशेषताएं' : 'Locker Facility Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'उच्च सुरक्षा' : 'High Security'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'बैंक स्तर सुरक्षा' : 'Bank-level security'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'बीमा कवर' : 'Insurance Cover'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'बीमा सुरक्षा' : 'Insurance protection'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? '24/7 पहुंच' : '24/7 Access'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'किसी भी समय पहुंच' : 'Access anytime'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'गोपनीयता' : 'Privacy'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'पूर्ण गोपनीयता' : 'Complete privacy'}
              </p>
            </div>
          </div>
        </div>

        {/* How to Apply */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'लॉकर कैसे प्राप्त करें' : 'How to Get a Locker'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'खाता खोलें' : 'Open Account'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'बचत या चालू खाता' : 'Savings or current account'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'आवेदन करें' : 'Apply'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'लॉकर आवेदन पत्र' : 'Locker application form'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'दस्तावेज' : 'Documents'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'पहचान और पता प्रमाण' : 'ID and address proof'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'प्राप्त करें' : 'Receive'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'लॉकर कुंजी प्राप्त करें' : 'Get locker keys'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
