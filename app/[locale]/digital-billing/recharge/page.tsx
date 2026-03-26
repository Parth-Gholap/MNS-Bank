'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface RechargePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function RechargePage({ params }: RechargePageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  const [mobileNumber, setMobileNumber] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [operator, setOperator] = React.useState('');

  const handleRecharge = () => {
    if (mobileNumber && amount && operator) {
      alert(`${localeTyped === 'hi' ? 'रिचार्ज सफल!' : 'Recharge Successful!'}\n${localeTyped === 'hi' ? 'मोबाइल:' : 'Mobile:'} ${mobileNumber}\n${localeTyped === 'hi' ? 'राशि:' : 'Amount:'} ₹${amount}`);
    } else {
      alert(localeTyped === 'hi' ? 'कृपया सभी विवरण भरें' : 'Please fill all details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {localeTyped === 'hi' ? 'मोबाइल रिचार्ज' : 'Mobile Recharge'}
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {localeTyped === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="1234567890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {localeTyped === 'hi' ? 'ऑपरेटर' : 'Operator'}
              </label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{localeTyped === 'hi' ? 'ऑपरेटर चुनें' : 'Select Operator'}</option>
                <option value="airtel">Airtel</option>
                <option value="jio">Jio</option>
                <option value="vi">Vi</option>
                <option value="bsnl">BSNL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {localeTyped === 'hi' ? 'राशि' : 'Amount'}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleRecharge}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              {localeTyped === 'hi' ? 'रिचार्ज करें' : 'Recharge Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
