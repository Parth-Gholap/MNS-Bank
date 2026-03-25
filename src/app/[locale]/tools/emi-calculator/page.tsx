import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import EMICalculator from '@/components/calculator/EMICalculator';
import AmortizationTable from '@/components/calculator/AmortizationTable';
import { EMICalculationInput } from '@/lib/calculator/emi';

interface EMICalculatorPageProps {
  params: {
    locale: string;
  };
}

const EMICalculatorPage: React.FC<EMICalculatorPageProps> = ({ params }) => {
  const locale = params.locale as 'en' | 'hi';
  const { t } = useTranslation(locale);
  const [activeTab, setActiveTab] = useState<'calculator' | 'schedule'>('calculator');
  const [calculationInput, setCalculationInput] = useState<EMICalculationInput>({
    principal: 1000000,
    rate: 8.5,
    tenure: 60,
    frequency: 'monthly'
  });

  React.useEffect(() => {
    trackPageView('EMI Calculator Page', locale === 'hi' ? 'ईएमआई कैलकुलेटर पृष्ठ' : 'EMI Calculator Page');
  }, [locale]);

  const handleCalculationChange = (input: EMICalculationInput) => {
    setCalculationInput(input);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {locale === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator'}
            </h1>
            <p className="text-lg text-gray-600">
              {locale === 'hi' 
                ? 'अपने ऋण के लिए मासिक किश्त गणना करें'
                : 'Calculate your monthly installments for your loan'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'calculator'
                    ? 'border-bank-blue-500 text-bank-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {locale === 'hi' ? 'कैलकुलेटर' : 'Calculator'}
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'schedule'
                    ? 'border-bank-blue-500 text-bank-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {locale === 'hi' ? 'भुगतान अनुसूची' : 'Amortization Schedule'}
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'calculator' && (
            <div>
              <EMICalculator
                locale={locale}
              />
              
              {/* Additional Tools */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* Quick Comparison */}
                <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === 'hi' ? 'त्वरित तुलना' : 'Quick Comparison'}
                  </h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setCalculationInput({
                        principal: 500000,
                        rate: 8.5,
                        tenure: 60,
                        frequency: 'monthly'
                      })}
                      className="w-full text-left px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <div className="font-medium">Home Loan (5 Lakh)</div>
                      <div className="text-xs text-gray-500">8.5% for 5 years</div>
                    </button>
                    <button
                      onClick={() => setCalculationInput({
                        principal: 800000,
                        rate: 9.5,
                        tenure: 60,
                        frequency: 'monthly'
                      })}
                      className="w-full text-left px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <div className="font-medium">Car Loan (8 Lakh)</div>
                      <div className="text-xs text-gray-500">9.5% for 5 years</div>
                    </button>
                    <button
                      onClick={() => setCalculationInput({
                        principal: 200000,
                        rate: 12.5,
                        tenure: 36,
                        frequency: 'monthly'
                      })}
                      className="w-full text-left px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <div className="font-medium">Personal Loan (2 Lakh)</div>
                      <div className="text-xs text-gray-500">12.5% for 3 years</div>
                    </button>
                  </div>
                </div>

                {/* Information Panel */}
                <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === 'hi' ? 'उपयोगी जानकारी' : 'Useful Information'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {locale === 'hi' ? 'ईएमआई कैसे काम करती है?' : 'How EMI Works?'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {locale === 'hi' 
                          ? 'ईएमआई (इक्वेटेड मासिक किश्त) ऋण राशि, ब्याज दर और कार्यकाल के आधार पर गणना की जाती है।'
                          : 'EMI (Equated Monthly Installment) is calculated based on loan amount, interest rate, and tenure.'
                        }
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {locale === 'hi' ? 'ब्याज दरें' : 'Interest Rates'}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {locale === 'hi' ? 'होम लोन: 7.5% - 10.5%' : 'Home Loan: 7.5% - 10.5%'}</li>
                        <li>• {locale === 'hi' ? 'कार लोन: 8.5% - 13.5%' : 'Car Loan: 8.5% - 13.5%'}</li>
                        <li>• {locale === 'hi' ? 'व्यक्ति लोन: 10.5% - 18.5%' : 'Personal Loan: 10.5% - 18.5%'}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {locale === 'hi' ? 'ऋण पात्रता' : 'Loan Eligibility'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {locale === 'hi' 
                          ? 'आमके ऋण पात्रता मानदंड के आधार पर आपकी मासिक आय का 50% तक होनी चाहिए।'
                          : 'Our loan eligibility requires your monthly EMI to be up to 50% of your monthly income.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <AmortizationTable 
                locale={locale} 
                calculationInput={calculationInput}
              />
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-bank-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {locale === 'hi' ? 'ऋण के लिए आवेदन करें' : 'Apply for a Loan'}
          </h2>
          <p className="text-bank-blue-100 mb-6">
            {locale === 'hi' 
              ? 'अपनी आवश्यकताओं के अनुसार तुरंत ऋण स्वीकृति करें'
              : 'Get instant loan approval based on your eligibility'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-white text-bank-blue-600">
              {locale === 'hi' ? 'होम लोन' : 'Home Loan'}
            </button>
            <button className="btn-white text-bank-blue-600">
              {locale === 'hi' ? 'व्यक्ति लोन' : 'Personal Loan'}
            </button>
            <button className="btn-white text-bank-blue-600">
              {locale === 'hi' ? 'कार लोन' : 'Car Loan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculatorPage;
