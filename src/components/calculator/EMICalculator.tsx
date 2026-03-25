'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface EMICalculatorProps {
  locale: 'en' | 'hi';
  className?: string;
}

interface EMICalculatorData {
  principal: number;
  rate: number;
  tenure: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
}

interface EMICalculationResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  effectiveRate: number;
}

const EMICalculator: React.FC<EMICalculatorProps> = ({ locale, className = '' }) => {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState<EMICalculatorData>({
    principal: 1000000,
    rate: 8.5,
    tenure: 12,
    frequency: 'monthly'
  });
  
  const [result, setResult] = useState<EMICalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    trackPageView('EMI Calculator', locale === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator');
  }, [locale]);

  useEffect(() => {
    calculateEMI();
  }, [formData]);

  const calculateEMI = () => {
    const newErrors: Record<string, string> = {};
    
    // Validation
    if (formData.principal < 10000) {
      newErrors.principal = locale === 'hi' ? 'न्यूनतम ऋण राशि ₹10,000 होनी चाहिए' : 'Minimum loan amount is ₹10,000';
    }
    if (formData.principal > 100000000) {
      newErrors.principal = locale === 'hi' ? 'अधिकतम ऋण राशि ₹1,00,00,000 है' : 'Maximum loan amount is ₹1,00,00,000';
    }
    if (formData.rate < 5) {
      newErrors.rate = locale === 'hi' ? 'न्यूनतम ब्याज दर 5% है' : 'Minimum interest rate is 5%';
    }
    if (formData.rate > 20) {
      newErrors.rate = locale === 'hi' ? 'अधिकतम ब्याज दर 20% है' : 'Maximum interest rate is 20%';
    }
    if (formData.tenure < 6) {
      newErrors.tenure = locale === 'hi' ? 'न्यूनतम कार्यकाल 6 महीने है' : 'Minimum tenure is 6 months';
    }
    if (formData.tenure > 360) {
      newErrors.tenure = locale === 'hi' ? 'अधिकतम कार्यकाल 360 महीने है' : 'Maximum tenure is 360 months';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    setErrors({});

    // Calculate EMI
    const principal = formData.principal;
    const monthlyRate = formData.rate / 12 / 100;
    const tenure = formData.tenure;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);

    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;
    const effectiveRate = (totalInterest / principal) * 100;

    setResult({
      emi: Math.round(emi * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100
    });
  };

  const handleInputChange = (field: keyof EMICalculatorData, value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'hi' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator'}
        </h2>
        <p className="text-gray-600">
          {locale === 'hi' 
            ? 'अपनी ऋण राशि, ब्याज दर और कार्यकाल दर्ज करकर अपनी मासिक EMI की गणना करें'
            : 'Calculate your monthly EMI by entering loan amount, interest rate, and tenure'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'ऋण राशि (₹)' : 'Loan Amount (₹)'}
          </label>
          <input
            type="number"
            value={formData.principal}
            onChange={(e) => handleInputChange('principal', e.target.value)}
            className={`input-field ${errors.principal ? 'border-red-500' : ''}`}
            min={10000}
            max={100000000}
            step={10000}
          />
          {errors.principal && (
            <p className="mt-1 text-sm text-red-600">{errors.principal}</p>
          )}
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'ब्याज दर (%)' : 'Interest Rate (%)'}
          </label>
          <input
            type="number"
            value={formData.rate}
            onChange={(e) => handleInputChange('rate', e.target.value)}
            className={`input-field ${errors.rate ? 'border-red-500' : ''}`}
            min={5}
            max={20}
            step={0.1}
          />
          {errors.rate && (
            <p className="mt-1 text-sm text-red-600">{errors.rate}</p>
          )}
        </div>

        {/* Tenure */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'कार्यकाल (महीने)' : 'Tenure (Months)'}
          </label>
          <input
            type="number"
            value={formData.tenure}
            onChange={(e) => handleInputChange('tenure', e.target.value)}
            className={`input-field ${errors.tenure ? 'border-red-500' : ''}`}
            min={6}
            max={360}
            step={1}
          />
          {errors.tenure && (
            <p className="mt-1 text-sm text-red-600">{errors.tenure}</p>
          )}
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'भुगतान आवृत्ति' : 'Payment Frequency'}
          </label>
          <select
            value={formData.frequency}
            onChange={(e) => handleInputChange('frequency', e.target.value)}
            className="input-field"
          >
            <option value="monthly">
              {locale === 'hi' ? 'मासिक' : 'Monthly'}
            </option>
            <option value="quarterly">
              {locale === 'hi' ? 'त्रैमासिक' : 'Quarterly'}
            </option>
            <option value="yearly">
              {locale === 'hi' ? 'वार्षिक' : 'Yearly'}
            </option>
          </select>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-bank-blue-50 border border-bank-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-bank-blue-900 mb-4">
            {locale === 'hi' ? 'गणना परिणाम' : 'Calculation Results'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-bank-blue-100">
              <p className="text-sm text-gray-600 mb-1">
                {locale === 'hi' ? 'मासिक EMI' : 'Monthly EMI'}
              </p>
              <p className="text-2xl font-bold text-bank-blue-600">
                {formatCurrency(result.emi)}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-bank-blue-100">
              <p className="text-sm text-gray-600 mb-1">
                {locale === 'hi' ? 'कुल भुगतानी' : 'Total Payment'}
              </p>
              <p className="text-2xl font-bold text-bank-blue-600">
                {formatCurrency(result.totalAmount)}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-bank-blue-100">
              <p className="text-sm text-gray-600 mb-1">
                {locale === 'hi' ? 'कुल ब्याज' : 'Total Interest'}
              </p>
              <p className="text-2xl font-bold text-bank-blue-600">
                {formatCurrency(result.totalInterest)}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-bank-blue-100">
              <p className="text-sm text-gray-600 mb-1">
                {locale === 'hi' ? 'प्रभावी दर' : 'Effective Rate'}
              </p>
              <p className="text-2xl font-bold text-bank-blue-600">
                {result.effectiveRate.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Presets */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === 'hi' ? 'त्वरित सेटिंग्स' : 'Quick Presets'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setFormData({
              principal: 500000,
              rate: 8.5,
              tenure: 60,
              frequency: 'monthly'
            })}
            className="btn-outline"
          >
            {locale === 'hi' ? 'होम लोन (5 लाख)' : 'Home Loan (5 Lakh)'}
          </button>
          
          <button
            onClick={() => setFormData({
              principal: 1000000,
              rate: 9.5,
              tenure: 84,
              frequency: 'monthly'
            })}
            className="btn-outline"
          >
            {locale === 'hi' ? 'कार लोन (10 लाख)' : 'Car Loan (10 Lakh)'}
          </button>
          
          <button
            onClick={() => setFormData({
              principal: 2000000,
              rate: 11.5,
              tenure: 120,
              frequency: 'monthly'
            })}
            className="btn-outline"
          >
            {locale === 'hi' ? 'व्यक्ति लोन (20 लाख)' : 'Business Loan (20 Lakh)'}
          </button>
        </div>
      </div>

      {/* Information */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">
          {locale === 'hi' ? 'महत्वपूर्ण जानकारी' : 'Important Information'}
        </h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {locale === 'hi' 
                ? 'गणना केवल अनुमानित है। वास्तविक ब्याज दर ऋण प्रकार और आपकी क्रेडिट प्रोफाइल के आधार पर निर्भर की जाएगी।'
                : 'Calculations are indicative only. Actual interest rates depend on loan type and your credit profile.'
              }
            </span>
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {locale === 'hi' 
                ? 'प्रसंस्करण शुल्क और अन्य शुल्क लागू हो सकते हैं।'
                : 'Processing fees and other charges may apply.'
              }
            </span>
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {locale === 'hi' 
                ? 'EMI की गणना मासिक भुगतानी के आधार पर की जाती है।'
                : 'EMI is calculated based on monthly payment frequency.'
              }
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EMICalculator;
