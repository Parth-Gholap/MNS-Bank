'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface ApplicationPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ApplicationPage({ params }: ApplicationPageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const searchParams = useSearchParams();
  const router = useRouter();
  const accountType = searchParams.get('type') || 'savings';
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    panNumber: '',
    aadhaarNumber: '',
    occupation: '',
    annualIncome: '',
    accountType: accountType
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackPageView('Account Application', localeTyped === 'hi' ? 'खाता आवेदन' : 'Account Application');
  }, [localeTyped]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Account Application Submitted:', formData);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        router.push(`/${localeTyped}/apply/account?success=true`);
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAccountTypeLabel = (type: string) => {
    const types: Record<string, { en: string; hi: string }> = {
      savings: { en: 'Savings Account', hi: 'बचत खाता' },
      current: { en: 'Current Account', hi: 'चालू खाता' },
      senior: { en: 'Senior Citizen Account', hi: 'वरिष्ठ नागरिक खाता' }
    };
    return types[type]?.[localeTyped] || types.savings[localeTyped];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {localeTyped === 'hi' ? 'खाता आवेदन पत्र' : 'Account Application Form'}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {localeTyped === 'hi' ? 'खाता प्रकार: ' : 'Account Type: '}
            <span className="font-semibold text-blue-600">
              {getAccountTypeLabel(accountType)}
            </span>
          </p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← {localeTyped === 'hi' ? 'खाता प्रकार बदलें' : 'Change Account Type'}
          </button>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              {localeTyped === 'hi' ? 'आवेदन सफलतापूर्वक जमा किया गया!' : 'Application Submitted Successfully!'}
            </h2>
            <p className="text-green-700 mb-4">
              {localeTyped === 'hi' 
                ? 'हम जल्द ही आपसे संपर्क करेंगे। आवेदन संख्या: #APP' + Date.now().toString().slice(-6)
                : 'We will contact you soon. Application ID: #APP' + Date.now().toString().slice(-6)
              }
            </p>
            <p className="text-green-600 text-sm">
              {localeTyped === 'hi' ? '3 सेकंड में मुख्य पृष्ठ पर रीडायरेक्ट किया जा रहा है...' : 'Redirecting to main page in 3 seconds...'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {localeTyped === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'पूरा नाम' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'ईमेल' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'} *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    placeholder="1234567890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'जन्म तिथि' : 'Date of Birth'} *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {localeTyped === 'hi' ? 'पता जानकारी' : 'Address Information'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'पता' : 'Address'} *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'शहर' : 'City'} *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'राज्य' : 'State'} *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'पिन कोड' : 'PIN Code'} *
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{6}"
                    placeholder="123456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Identity Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {localeTyped === 'hi' ? 'पहचान जानकारी' : 'Identity Information'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'पैन कार्ड नंबर' : 'PAN Card Number'} *
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    required
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'आधार कार्ड नंबर' : 'Aadhaar Card Number'} *
                  </label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{12}"
                    placeholder="123456789012"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'व्यवसाय' : 'Occupation'} *
                  </label>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{localeTyped === 'hi' ? 'चुनें' : 'Select'}</option>
                    <option value="salaried">{localeTyped === 'hi' ? 'वेतनभोगी' : 'Salaried'}</option>
                    <option value="business">{localeTyped === 'hi' ? 'व्यवसाय' : 'Business'}</option>
                    <option value="professional">{localeTyped === 'hi' ? 'पेशेवर' : 'Professional'}</option>
                    <option value="student">{localeTyped === 'hi' ? 'छात्र' : 'Student'}</option>
                    <option value="retired">{localeTyped === 'hi' ? 'सेवानिवृत्त' : 'Retired'}</option>
                    <option value="other">{localeTyped === 'hi' ? 'अन्य' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'वार्षिक आय' : 'Annual Income'} *
                  </label>
                  <select
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{localeTyped === 'hi' ? 'चुनें' : 'Select'}</option>
                    <option value="below-3lakh">{localeTyped === 'hi' ? '3 लाख से कम' : 'Below 3 Lakhs'}</option>
                    <option value="3-5lakh">{localeTyped === 'hi' ? '3-5 लाख' : '3-5 Lakhs'}</option>
                    <option value="5-10lakh">{localeTyped === 'hi' ? '5-10 लाख' : '5-10 Lakhs'}</option>
                    <option value="10-25lakh">{localeTyped === 'hi' ? '10-25 लाख' : '10-25 Lakhs'}</option>
                    <option value="above-25lakh">{localeTyped === 'hi' ? '25 लाख से अधिक' : 'Above 25 Lakhs'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">⏳</span>
                    {localeTyped === 'hi' ? 'जमा हो रहा है...' : 'Submitting...'}
                  </span>
                ) : (
                  localeTyped === 'hi' ? 'आवेदन जमा करें' : 'Submit Application'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
