'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface FilterOption {
  value: string;
  label: string;
  labelHi: string;
  count: number;
}

interface ProductFilterProps {
  locale: 'en' | 'hi';
  onFilterChange: (filters: ProductFilters) => void;
  className?: string;
}

interface ProductFilters {
  category: string;
  subcategory: string;
  interestRate: string;
  loanAmount: string;
  features: string[];
  searchTerm: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ locale, onFilterChange, className = '' }) => {
  const { t } = useTranslation(locale);
  const [filters, setFilters] = useState<ProductFilters>({
    category: '',
    subcategory: '',
    interestRate: '',
    loanAmount: '',
    features: [],
    searchTerm: ''
  });
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [subcategories, setSubcategories] = useState<FilterOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Product Filter', locale === 'hi' ? 'उत्पाद फिल्टर' : 'Product Filter');
    fetchFilterOptions();
  }, [locale]);

  const fetchFilterOptions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/filters?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setCategories(result.data.categories);
        setSubcategories(result.data.subcategories);
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
      // Fallback to static options
      const staticOptions = getStaticFilterOptions();
      setCategories(staticOptions.categories);
      setSubcategories(staticOptions.subcategories);
    } finally {
      setLoading(false);
    }
  };

  const getStaticFilterOptions = () => {
    return {
      categories: [
        { value: 'all', label: 'All Products', labelHi: 'सभी उत्पाद', count: 24 },
        { value: 'personal-banking', label: 'Personal Banking', labelHi: 'व्यक्तिग बैंकिंग', count: 8 },
        { value: 'business-banking', label: 'Business Banking', labelHi: 'व्यवसाय बैंकिंग', count: 6 },
        { value: 'loans', label: 'Loans', labelHi: 'ऋण', count: 8 },
        { value: 'deposits', label: 'Deposits', labelHi: 'जमा', count: 4 },
        { value: 'cards', label: 'Cards', labelHi: 'कार्ड', count: 3 },
        { value: 'insurance', label: 'Insurance', labelHi: 'बीमा', count: 2 },
        { value: 'investments', label: 'Investments', labelHi: 'निवेश', count: 3 }
      ],
      subcategories: [
        { value: 'savings-account', label: 'Savings Account', labelHi: 'बचत खाता', count: 3 },
        { value: 'current-account', label: 'Current Account', labelHi: 'चालू खाता', count: 2 },
        { value: 'personal-loan', label: 'Personal Loan', labelHi: 'व्यक्तिग ऋण', count: 3 },
        { value: 'home-loan', label: 'Home Loan', labelHi: 'होम लोन', count: 2 },
        { value: 'business-loan', label: 'Business Loan', labelHi: 'व्यवसाय ऋण', count: 2 },
        { value: 'fixed-deposit', label: 'Fixed Deposit', labelHi: 'सावध जमा', count: 2 },
        { value: 'recurring-deposit', label: 'Recurring Deposit', labelHi: 'आवर्तित जमा', count: 1 },
        { value: 'credit-card', label: 'Credit Card', labelHi: 'क्रेडिट कार्ड', count: 2 },
        { value: 'debit-card', label: 'Debit Card', labelHi: 'डेबिट कार्ड', count: 1 }
      ]
    };
  };

  const handleFilterChange = (filterType: keyof ProductFilters, value: any) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    
    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: ProductFilters = {
      category: '',
      subcategory: '',
      interestRate: '',
      loanAmount: '',
      features: [],
      searchTerm: ''
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.subcategory) count++;
    if (filters.interestRate) count++;
    if (filters.loanAmount) count++;
    if (filters.features.length > 0) count++;
    if (filters.searchTerm) count++;
    return count;
  };

  const availableFeatures = [
    { value: 'zero-balance', label: 'Zero Balance', labelHi: 'जीरो शेष' },
    { value: 'digital-banking', label: 'Digital Banking', labelHi: 'डिजिटल बैंकिंग' },
    { value: 'mobile-banking', label: 'Mobile Banking', labelHi: 'मोबाइल बैंकिंग' },
    { value: 'atm-free', label: 'Free ATM', labelHi: 'मुफ्त एटीएम' },
    { value: 'online-banking', label: 'Online Banking', labelHi: 'ऑनलाइन बैंकिंग' },
    { value: 'quick-approval', label: 'Quick Approval', labelHi: 'त्वरित स्वीकृति' },
    { value: 'flexible-tenure', label: 'Flexible Tenure', labelHi: 'लचीली अवधि' },
    { value: 'no-collateral', label: 'No Collateral', labelHi: 'कोई बंधक' },
    { value: 'tax-benefits', label: 'Tax Benefits', labelHi: 'कर लाभ' },
    { value: 'guaranteed-returns', label: 'Guaranteed Returns', labelHi: 'गारंटीड रिटर्न' },
    { value: 'loan-against-fd', label: 'Loan Against FD', labelHi: 'एफडी के खिलाफ लोन' }
  ];

  const interestRateRanges = [
    { value: '0-4', label: '0% - 4%', labelHi: '0% - 4%' },
    { value: '4-6', label: '4% - 6%', labelHi: '4% - 6%' },
    { value: '6-8', label: '6% - 8%', labelHi: '6% - 8%' },
    { value: '8-10', label: '8% - 10%', labelHi: '8% - 10%' },
    { value: '10+', label: '10%+', labelHi: '10%+' }
  ];

  const loanAmountRanges = [
    { value: '0-1lakh', label: 'Up to ₹1 Lakh', labelHi: '₹1 लाख तक' },
    { value: '1-5lakh', label: '₹1-5 Lakh', labelHi: '₹1-5 लाख' },
    { value: '5-10lakh', label: '₹5-10 Lakh', labelHi: '₹5-10 लाख' },
    { value: '10-25lakh', label: '₹10-25 Lakh', labelHi: '₹10-25 लाख' },
    { value: '25-50lakh', label: '₹25-50 Lakh', labelHi: '₹25-50 लाख' },
    { value: '50lakh+', label: '₹50 Lakh+', labelHi: '₹50 लाख+' }
  ];

  // Loading state
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {locale === 'hi' ? 'उत्पाद फिल्टर' : 'Product Filters'}
        </h3>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {locale === 'hi' 
              ? `${getActiveFiltersCount()} फिल्टर सक्रिय`
              : `${getActiveFiltersCount()} filters active`
            }
          </span>
          <button
            onClick={clearFilters}
            className="btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
          >
            {locale === 'hi' ? 'साफ करें' : 'Clear All'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {locale === 'hi' ? 'खोजें' : 'Search'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            placeholder={locale === 'hi' ? 'उत्पाद नाम या विवरण दर्ज करें...' : 'Search products by name or description...'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'श्रेणी' : 'Category'}
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
          >
            <option value="">{locale === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {locale === 'hi' ? category.labelHi : category.label} ({category.count})
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'उप-श्रेणी' : 'Subcategory'}
          </label>
          <select
            value={filters.subcategory}
            onChange={(e) => handleFilterChange('subcategory', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
          >
            <option value="">{locale === 'hi' ? 'सभी उप-श्रेणियां' : 'All Subcategories'}</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.value} value={subcategory.value}>
                {locale === 'hi' ? subcategory.labelHi : subcategory.label} ({subcategory.count})
              </option>
            ))}
          </select>
        </div>

        {/* Interest Rate Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'ब्याज दर' : 'Interest Rate'}
          </label>
          <select
            value={filters.interestRate}
            onChange={(e) => handleFilterChange('interestRate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
          >
            <option value="">{locale === 'hi' ? 'सभी दरें' : 'All Rates'}</option>
            {interestRateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {locale === 'hi' ? range.labelHi : range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Loan Amount Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'ऋण राशि' : 'Loan Amount'}
          </label>
          <select
            value={filters.loanAmount}
            onChange={(e) => handleFilterChange('loanAmount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
          >
            <option value="">{locale === 'hi' ? 'सभी राशियां' : 'All Amounts'}</option>
            {loanAmountRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {locale === 'hi' ? range.labelHi : range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Features Filter */}
      <div className="md:col-span-2 lg:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {locale === 'hi' ? 'विशेष' : 'Features'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableFeatures.map((feature) => (
            <label key={feature.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.features.includes(feature.value)}
                onChange={() => handleFeatureToggle(feature.value)}
                className="mr-2 h-4 w-4 text-bank-blue-600 border-gray-300 rounded focus:ring-bank-blue-500"
              />
              <span className="text-sm text-gray-700">
                {locale === 'hi' ? feature.labelHi : feature.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Summary */}
      {getActiveFiltersCount() > 0 && (
        <div className="mt-6 p-4 bg-bank-blue-50 border border-bank-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-bank-blue-800">
              <span className="font-medium">
                {locale === 'hi' ? 'सक्रिय फिल्टर:' : 'Active Filters:'}
              </span>
              <div className="mt-2 space-y-1">
                {filters.category && (
                  <div className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{locale === 'hi' ? 'श्रेणी:' : 'Category:'}</span>
                    <span className="ml-1 font-medium">
                      {categories.find(c => c.value === filters.category)?.label || filters.category}
                    </span>
                  </div>
                )}
                {filters.subcategory && (
                  <div className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{locale === 'hi' ? 'उप-श्रेणी:' : 'Subcategory:'}</span>
                    <span className="ml-1 font-medium">
                      {subcategories.find(c => c.value === filters.subcategory)?.label || filters.subcategory}
                    </span>
                  </div>
                )}
                {filters.interestRate && (
                  <div className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{locale === 'hi' ? 'ब्याज दर:' : 'Interest Rate:'}</span>
                    <span className="ml-1 font-medium">
                      {interestRateRanges.find(r => r.value === filters.interestRate)?.label || filters.interestRate}
                    </span>
                  </div>
                )}
                {filters.loanAmount && (
                  <div className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{locale === 'hi' ? 'ऋण राशि:' : 'Loan Amount:'}</span>
                    <span className="ml-1 font-medium">
                      {loanAmountRanges.find(r => r.value === filters.loanAmount)?.label || filters.loanAmount}
                    </span>
                  </div>
                )}
                {filters.features.length > 0 && (
                  <div className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{locale === 'hi' ? 'विशेष:' : 'Features:'}</span>
                    <span className="ml-1 font-medium">
                      {filters.features.map(f => 
                        availableFeatures.find(feature => feature.value === f)?.label || f
                      ).join(', ')}
                    </span>
                  </div>
                )}
                {filters.searchTerm && (
                  <div className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{locale === 'hi' ? 'खोज:' : 'Search:'}</span>
                    <span className="ml-1 font-medium">"{filters.searchTerm}"</span>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={clearFilters}
              className="btn-outline border-bank-blue-600 text-bank-blue-600 hover:bg-bank-blue-50 text-sm"
            >
              {locale === 'hi' ? 'फिल्टर हटाएं' : 'Remove Filters'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
