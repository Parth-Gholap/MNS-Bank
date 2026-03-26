'use client';

import React, { useState } from 'react';
import EMICalculator from '@/components/calculator/EMICalculator';
import AmortizationTable from '@/components/calculator/AmortizationTable';
import { EMICalculationInput } from '@/lib/calculator/emi';

interface CalculatorClientProps {
  locale: 'en' | 'hi';
}

export default function CalculatorClient({ locale }: CalculatorClientProps) {
  const [calculationInput, setCalculationInput] = useState<EMICalculationInput>({
    principal: 1000000,
    rate: 8.5,
    tenure: 120,
    frequency: 'monthly'
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'अपने ऋण की मासिक किस्त की गणना करें'
              : 'Calculate your loan monthly installments'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* EMI Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <EMICalculator locale={locale} />
          </div>

          {/* Amortization Table */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === 'hi' ? 'अमोर्टाइज़ेशन तालिका' : 'Amortization Table'}
            </h2>
            <AmortizationTable 
              locale={locale} 
              calculationInput={calculationInput} 
            />
          </div>
        </div>

        {/* Loan Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'ऋण जानकारी' : 'Loan Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'एमआई क्या है?' : 'What is EMI?'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi'
                  ? 'ईएमआई (इक्विटेड मंथली इंस्टॉलमेंट) वह निश्चित राशि है जो आप हर महीने ऋण चुकाने के लिए भुगतान करते हैं।'
                  : 'EMI (Equated Monthly Installment) is the fixed amount you pay each month to repay your loan.'}
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'ईएमआई कैसे गणना की जाती है?' : 'How is EMI calculated?'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi'
                  ? 'ईएमआई ऋण राशि, ब्याज दर, और ऋण अवधि के आधार पर गणना की जाती है।'
                  : 'EMI is calculated based on loan amount, interest rate, and loan tenure.'}
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'ईएमआई के लाभ' : 'Benefits of EMI'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi'
                  ? 'ईएमआई आपको बड़े खर्चों को प्रबंधित मासिक भुगतान में तोड़ने में मदद करता है।'
                  : 'EMI helps you break down large expenses into manageable monthly payments.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
