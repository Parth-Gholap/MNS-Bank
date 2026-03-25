import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface InterestRate {
  id: string;
  category: string;
  categoryHi: string;
  product: string;
  productHi: string;
  rateType: string;
  rateTypeHi: string;
  minRate: number;
  maxRate: number;
  effectiveRate: number;
  tenure: string;
  tenureHi: string;
  specialFeatures: string[];
  specialFeaturesHi: string[];
  lastUpdated: string;
}

interface InterestRatesPageProps {
  params: {
    locale: string;
  };
}

const InterestRatesPage: React.FC<InterestRatesPageProps> = ({ params }) => {
  const locale = params.locale as 'en' | 'hi';
  const { t } = useTranslation(locale);
  const [rates, setRates] = useState<InterestRate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rate' | 'product' | 'category'>('rate');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Interest Rates Page', locale === 'hi' ? 'ब्याज दरें पृष्ठ' : 'Interest Rates Page');
    fetchInterestRates();
  }, [locale]);

  const fetchInterestRates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/rates?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setRates(result.data.rates);
      }
    } catch (error) {
      console.error('Error fetching interest rates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedRates = rates
    .filter(rate => selectedCategory === 'all' || rate.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rate':
          return a.effectiveRate - b.effectiveRate;
        case 'product':
          return a.product.localeCompare(b.product);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const categories = Array.from(new Set(rates.map(rate => rate.category)));

  const formatRate = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'hi' ? 'en-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const exportToPDF = () => {
    // Mock PDF export functionality
    console.log('Exporting to PDF...');
    alert(locale === 'hi' ? 'PDF डाउनलोड किया जा रहा है...' : 'Downloading PDF...');
  };

  const exportToExcel = () => {
    // Mock Excel export functionality
    console.log('Exporting to Excel...');
    alert(locale === 'hi' ? 'Excel डाउनलोड किया जा रहा है...' : 'Downloading Excel...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {locale === 'hi' ? 'ब्याज दरें' : 'Interest Rates'}
            </h1>
            <p className="text-lg text-gray-600">
              {locale === 'hi' 
                ? 'हमारे सभी बैंकिंग उत्पादों के लिए वर्तमान ब्याज दरें'
                : 'Current interest rates for all our banking products'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'श्रेणी' : 'Category'}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                <option value="all">
                  {locale === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}
                </option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {locale === 'hi' 
                      ? rates.find(r => r.category === category)?.categoryHi || category
                      : category
                    }
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'इसके अनुसार क्रमबद्ध करें' : 'Sort By'}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rate' | 'product' | 'category')}
                className="input-field"
              >
                <option value="rate">
                  {locale === 'hi' ? 'ब्याज दर' : 'Interest Rate'}
                </option>
                <option value="product">
                  {locale === 'hi' ? 'उत्पाद' : 'Product'}
                </option>
                <option value="category">
                  {locale === 'hi' ? 'श्रेणी' : 'Category'}
                </option>
              </select>
            </div>

            {/* Export Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'निर्यात करें' : 'Export'}
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={exportToPDF}
                  className="btn-outline text-sm"
                >
                  {locale === 'hi' ? 'PDF' : 'PDF'}
                </button>
                <button
                  onClick={exportToExcel}
                  className="btn-outline text-sm"
                >
                  {locale === 'hi' ? 'Excel' : 'Excel'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bank-blue-600"></div>
            <span className="ml-4 text-gray-600">
              {locale === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
            </span>
          </div>
        )}

        {/* Rates Table */}
        {!loading && (
          <div className="bg-white rounded-lg shadow-card border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {locale === 'hi' ? 'श्रेणी' : 'Category'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {locale === 'hi' ? 'उत्पाद' : 'Product'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {locale === 'hi' ? 'दर प्रकार' : 'Rate Type'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {locale === 'hi' ? 'ब्याज दर' : 'Interest Rate'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {locale === 'hi' ? 'कार्यकाल' : 'Tenure'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {locale === 'hi' ? 'विशेषताएं' : 'Features'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {locale === 'hi' ? 'अंतिम अपडेट' : 'Last Updated'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedRates.map((rate) => (
                    <tr key={rate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {locale === 'hi' ? rate.categoryHi : rate.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {locale === 'hi' ? rate.productHi : rate.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {locale === 'hi' ? rate.rateTypeHi : rate.rateType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-bank-blue-600">
                            {formatRate(rate.effectiveRate)}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            ({formatRate(rate.minRate)} - {formatRate(rate.maxRate)})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {locale === 'hi' ? rate.tenureHi : rate.tenure}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex flex-wrap gap-1">
                          {(locale === 'hi' ? rate.specialFeaturesHi : rate.specialFeatures).slice(0, 2).map((feature, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {feature}
                            </span>
                          ))}
                          {(locale === 'hi' ? rate.specialFeaturesHi : rate.specialFeatures).length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{(locale === 'hi' ? rate.specialFeaturesHi : rate.specialFeatures).length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(rate.lastUpdated)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAndSortedRates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500">
                  {locale === 'hi' ? 'कोई दरें नहीं मिलीं' : 'No rates found'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Important Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            {locale === 'hi' ? 'महत्वपूर्ण जानकारी' : 'Important Information'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">
                {locale === 'hi' ? 'ब्याज दरें' : 'Interest Rates'}
              </h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {locale === 'hi' 
                      ? 'ब्याज दरें बाजार स्थितियों के अनुसार बदल सकती हैं'
                      : 'Interest rates are subject to market conditions and may change'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {locale === 'hi' 
                      ? 'वास्तविक दर आपकी क्रेडिट प्रोफाइल के आधार पर निर्धारित की जाएगी'
                      : 'Actual rates will be determined based on your credit profile'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {locale === 'hi' 
                      ? 'प्रसंस्करण शुल्क और अन्य शुल्क लागू हो सकते हैं'
                      : 'Processing fees and other charges may apply'
                    }
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">
                {locale === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
              </h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.947.684L14 10a1 1 0 01.947.684 1.684V13a1 1 0 01.947.684 1.684H21a2 2 0 012-2v-8a2 2 0 00-2-2H3a2 2 0 00-2 2z" />
                  </svg>
                  <span>
                    {locale === 'hi' ? 'फोन: 1800-123-4567' : 'Phone: 1800-123-4567'}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0.32l3.95 2.58a2 2 0 012.22 1.68V13a2 2 0 01-2.22 1.68L3 16a2 2 0 01-2.22-1.68V10a2 2 0 00-2.22-1.68z" />
                  </svg>
                  <span>
                    {locale === 'hi' ? 'ईमेल: rates@bank.com' : 'Email: rates@bank.com'}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {locale === 'hi' ? 'शाखा: निकटतम शाखा पर जाएं' : 'Branch: Visit nearest branch'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-bank-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {locale === 'hi' ? 'आज ही लोन के लिए आवेदन करें' : 'Apply for a Loan Today'}
          </h2>
          <p className="text-bank-blue-100 mb-6">
            {locale === 'hi' 
              ? 'अपनी आवश्यकताओं के अनुसार सर्वश्रेष्ठ ब्याज दरें पाएं'
              : 'Get the best interest rates according to your needs'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-white text-bank-blue-600">
              {locale === 'hi' ? 'EMI कैलकुलेटर' : 'EMI Calculator'}
            </button>
            <button className="btn-white text-bank-blue-600">
              {locale === 'hi' ? 'ऋण आवेदन' : 'Loan Application'}
            </button>
            <button className="btn-white text-bank-blue-600">
              {locale === 'hi' ? 'विशेषज्ञ से बात करें' : 'Talk to Expert'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestRatesPage;
