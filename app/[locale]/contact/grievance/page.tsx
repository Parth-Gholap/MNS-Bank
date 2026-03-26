'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface GrievancePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function GrievancePage({ params }: GrievancePageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    accountNumber: '',
    complaintType: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(localeTyped === 'hi' ? 'शिकायत सफलतापूर्वक दर्ज की गई!' : 'Grievance submitted successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      accountNumber: '',
      complaintType: '',
      description: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {localeTyped === 'hi' ? 'शिकायत दर्ज करें' : 'File a Grievance'}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'पूरा नाम' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'ईमेल' : 'Email'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'फोन नंबर' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'खाता नंबर' : 'Account Number'}
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'शिकायत का प्रकार' : 'Complaint Type'}
                  </label>
                  <select
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{localeTyped === 'hi' ? 'चुनें' : 'Select'}</option>
                    <option value="service">{localeTyped === 'hi' ? 'सेवा संबंधी' : 'Service Related'}</option>
                    <option value="transaction">{localeTyped === 'hi' ? 'लेनदेन संबंधी' : 'Transaction Related'}</option>
                    <option value="staff">{localeTyped === 'hi' ? 'कर्मचारी संबंधी' : 'Staff Related'}</option>
                    <option value="other">{localeTyped === 'hi' ? 'अन्य' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {localeTyped === 'hi' ? 'विवरण' : 'Description'}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {localeTyped === 'hi' ? 'शिकायत दर्ज करें' : 'Submit Grievance'}
                </button>
              </form>
            </div>

            <div>
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {localeTyped === 'hi' ? 'शिकायत निवारण प्रक्रिया' : 'Grievance Redressal Process'}
                </h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. {localeTyped === 'hi' ? 'शिकायत प्राप्त होती है' : 'Complaint received'}</li>
                  <li>2. {localeTyped === 'hi' ? 'शिकायत की समीक्षा की जाती है' : 'Complaint reviewed'}</li>
                  <li>3. {localeTyped === 'hi' ? 'जांच की जाती है' : 'Investigation conducted'}</li>
                  <li>4. {localeTyped === 'hi' ? 'समाधान प्रदान किया जाता है' : 'Resolution provided'}</li>
                  <li>5. {localeTyped === 'hi' ? 'ग्राहक को सूचित किया जाता है' : 'Customer informed'}</li>
                </ol>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {localeTyped === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>{localeTyped === 'hi' ? 'फोन:' : 'Phone:'}</strong> 1800-123-4567</p>
                  <p><strong>{localeTyped === 'hi' ? 'ईमेल:' : 'Email:'}</strong> grievance@mnsbank.com</p>
                  <p><strong>{localeTyped === 'hi' ? 'समय:' : 'Hours:'}</strong> 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
