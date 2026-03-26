'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface RateComparisonProps {
  locale: 'en' | 'hi';
  className?: string;
}

interface ComparisonItem {
  id: string;
  category: string;
  categoryHi: string;
  product: string;
  productHi: string;
  rate: number;
  features: string[];
  featuresHi: string[];
  pros: string[];
  prosHi: string[];
  cons: string[];
  consHi: string[];
  recommended: boolean;
}

const RateComparison: React.FC<RateComparisonProps> = ({ locale, className = '' }) => {
  const { t } = useTranslation(locale);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Rate Comparison', locale === 'hi' ? 'दर तुलना' : 'Rate Comparison');
    fetchComparisonData();
  }, [locale]);

  const fetchComparisonData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bank-data?type=rates&locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        // Transform rates data for comparison
        const comparisonItems: ComparisonItem[] = result.data.rates.map((rate: any, index: number) => ({
          id: rate.id,
          category: rate.category,
          categoryHi: rate.categoryHi,
          product: rate.product,
          productHi: rate.productHi,
          rate: rate.effectiveRate,
          features: rate.specialFeatures,
          featuresHi: rate.specialFeaturesHi,
          pros: getProsForProduct(rate.product),
          prosHi: getProsForProduct(rate.product, 'hi'),
          cons: getConsForProduct(rate.product),
          consHi: getConsForProduct(rate.product, 'hi'),
          recommended: index < 3 // Mark first 3 as recommended
        }));
        
        setComparisonData(comparisonItems);
      }
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProsForProduct = (product: string, lang: 'en' | 'hi' = 'en'): string[] => {
    const prosData: Record<string, { en: string[]; hi: string[] }> = {
      'Regular Savings': {
        en: ['No minimum balance', 'Free mobile banking', 'High liquidity'],
        hi: ['कोई न्यूनतम शेष नहीं', 'मुफ्त मोबाइल बैंकिंग', 'उच्च तरलता']
      },
      'Personal Loan': {
        en: ['Quick approval', 'Flexible tenure', 'No collateral required'],
        hi: ['त्वरित स्वीकृति', 'लचीला कार्यकाल', 'कोई बंधक आवश्यक नहीं']
      },
      'Home Loan': {
        en: ['Tax benefits', 'Long tenure', 'Property value appreciation'],
        hi: ['कर लाभ', 'लंबा कार्यकाल', 'प्रॉपर्टी मूल्यां वृद्धि']
      },
      'Car Loan': {
        en: ['100% financing', 'Quick processing', 'Insurance cover'],
        hi: ['100% वित्त', 'त्वरित प्रसंस्करण', 'बीमा कवर']
      },
      'Business Loan': {
        en: ['Working capital', 'Business advisory', 'Tax benefits'],
        hi: ['कार्यशील पूंजी', 'व्यवसाय सलाह', 'कर लाभ']
      },
      'Fixed Deposit': {
        en: ['Guaranteed returns', 'Safe investment', 'Loan facility'],
        hi: ['गारंटीड रिटर्न', 'सुरक्षित निवेश', 'लोन सुविधा']
      }
    };

    return prosData[product]?.[lang] || [];
  };

  const getConsForProduct = (product: string, lang: 'en' | 'hi' = 'en'): string[] => {
    const consData: Record<string, { en: string[]; hi: string[] }> = {
      'Regular Savings': {
        en: ['Lower returns than FD', 'Inflation impact', 'Limited features'],
        hi: ['FD से कम रिटर्न', 'मुद्रास्फीति प्रभाव', 'सीमित सुविधाएं']
      },
      'Personal Loan': {
        en: ['Higher interest rates', 'Documentation required', 'Credit score dependent'],
        hi: ['उच्च ब्याज दरें', 'दस्तावेजी आवश्यक', 'क्रेडिट स्कोर आधारित']
      },
      'Home Loan': {
        en: ['Long approval process', 'Property valuation', 'Legal documentation'],
        hi: ['लंबा स्वीकृति प्रक्रिया', 'प्रॉपर्टी मूल्यांकन', 'कानूनी दस्तावेजी']
      },
      'Car Loan': {
        en: ['Vehicle depreciation', 'Higher interest for used cars', 'Insurance mandatory'],
        hi: ['वाहन मूल्यांकन', 'पुरानी कारों के लिए उच्च ब्याज', 'बीमा अनिवार्य']
      },
      'Business Loan': {
        en: ['Collateral required', 'Business plan needed', 'Regular monitoring'],
        hi: ['बंधक आवश्यक', 'व्यवसाय योजना आवश्यक', 'नियमित निगरानी']
      },
      'Fixed Deposit': {
        en: ['Low liquidity', 'Inflation risk', 'Lower returns than market'],
        hi: ['कम तरलता', 'मुद्रास्फीति जोखिम', 'बाजार से कम रिटर्न']
      }
    };

    return consData[product]?.[lang] || [];
  };

  const handleProductSelect = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else if (selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const selectedProductsData = comparisonData.filter(item => selectedProducts.includes(item.id));

  const formatRate = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  const clearComparison = () => {
    setSelectedProducts([]);
  };

  const exportComparison = () => {
    const csvContent = [
      'Product,Rate,Category,Features,Pros,Cons',
      ...selectedProductsData.map(item => [
        `"${locale === 'hi' ? item.productHi : item.product}"`,
        item.rate,
        `"${locale === 'hi' ? item.categoryHi : item.category}"`,
        `"${(locale === 'hi' ? item.featuresHi : item.features).join(', ')}"`,
        `"${(locale === 'hi' ? item.prosHi : item.pros).join(', ')}"`,
        `"${(locale === 'hi' ? item.consHi : item.cons).join(', ')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rate-comparison.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center py-12 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bank-blue-600"></div>
        <span className="ml-4 text-gray-600">
          {locale === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'hi' ? 'दर तुलना' : 'Rate Comparison'}
        </h2>
        <p className="text-gray-600">
          {locale === 'hi' 
            ? 'अपनी आवश्यकताओं के अनुसार उत्पादों की तुलना करें'
            : 'Compare products based on your requirements'
          }
        </p>
      </div>

      {/* Product Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === 'hi' ? 'उत्पाद चुनें (4 तक)' : 'Select Products (up to 4)'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparisonData.map((product) => (
            <div
              key={product.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedProducts.includes(product.id)
                  ? 'border-bank-blue-500 bg-bank-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleProductSelect(product.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">
                  {locale === 'hi' ? product.productHi : product.product}
                </h4>
                {product.recommended && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {locale === 'hi' ? 'अनुशासित' : 'Recommended'}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {locale === 'hi' ? product.categoryHi : product.category}
              </div>
              <div className="text-lg font-semibold text-bank-blue-600">
                {formatRate(product.rate)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedProductsData.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {locale === 'hi' ? 'तुलना तालिका' : 'Comparison Table'}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={exportComparison}
                className="btn-outline text-sm"
              >
                {locale === 'hi' ? 'निर्यात करें' : 'Export'}
              </button>
              <button
                onClick={clearComparison}
                className="btn-outline text-sm"
              >
                {locale === 'hi' ? 'साफ करें' : 'Clear'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'उत्पाद' : 'Product'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'दर' : 'Rate'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'विशेषताएं' : 'Features'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'फायदे' : 'Pros'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'खामियां' : 'Cons'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedProductsData.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">
                          {locale === 'hi' ? product.productHi : product.product}
                        </div>
                        <div className="text-sm text-gray-500">
                          {locale === 'hi' ? product.categoryHi : product.category}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-semibold text-bank-blue-600">
                        {formatRate(product.rate)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(locale === 'hi' ? product.featuresHi : product.features).slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {feature}
                          </span>
                        ))}
                        {(locale === 'hi' ? product.featuresHi : product.features).length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{(locale === 'hi' ? product.featuresHi : product.features).length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="text-sm text-gray-700 space-y-1">
                        {(locale === 'hi' ? product.prosHi : product.pros).slice(0, 2).map((pro, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="text-sm text-gray-700 space-y-1">
                        {(locale === 'hi' ? product.consHi : product.cons).slice(0, 2).map((con, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-4 h-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          {locale === 'hi' ? 'सिफारिश' : 'Recommendations'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-900 mb-2">
              {locale === 'hi' ? 'अधिक बचत के लिए' : 'For Better Savings'}
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {locale === 'hi' 
                    ? 'वरिष्ठ नागरिक बचत खाता उच्च ब्याज दर प्रदान करता है'
                    : 'Senior Citizen Savings Account offers higher interest rates'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {locale === 'hi' 
                    ? 'सावध जमा निश्चित रिटर्न की गारंटी देती है'
                    : 'Fixed Deposits provide guaranteed returns'
                  }
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-2">
              {locale === 'hi' ? 'ऋण के लिए' : 'For Loans'}
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {locale === 'hi' 
                    ? 'प्रधानमंत्री होम लोन सब्सिडी प्रदान करता है'
                    : 'Pradhan Mantri Home Loan offers subsidy benefits'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {locale === 'hi' 
                    ? 'शिक्षा लोन पर कर लाभ मिलता है'
                    : 'Education Loans provide tax benefits'
                  }
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <button className="btn-primary">
          {locale === 'hi' ? 'विशेषज्ञ से बात करें' : 'Talk to an Expert'}
        </button>
      </div>
    </div>
  );
};

export default RateComparison;
