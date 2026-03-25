import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface ServiceCharge {
  id: string;
  category: string;
  categoryHi: string;
  service: string;
  serviceHi: string;
  chargeType: string;
  chargeTypeHi: string;
  amount: number;
  amountType: string;
  amountTypeHi: string;
  description: string;
  descriptionHi: string;
  applicableTo: string[];
  applicableToHi: string[];
  frequency: string;
  frequencyHi: string;
  lastUpdated: string;
}

interface ServiceChargesPageProps {
  params: {
    locale: string;
  };
}

const ServiceChargesPage: React.FC<ServiceChargesPageProps> = ({ params }) => {
  const locale = params.locale as 'en' | 'hi';
  const { t } = useTranslation(locale);
  const [charges, setCharges] = useState<ServiceCharge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Service Charges Page', locale === 'hi' ? 'सेवा शुल्क पृष्ठ' : 'Service Charges Page');
    fetchServiceCharges();
  }, [locale]);

  const fetchServiceCharges = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/charges?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setCharges(result.data.charges);
      }
    } catch (error) {
      console.error('Error fetching service charges:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharges = charges
    .filter(charge => 
      selectedCategory === 'all' || charge.category === selectedCategory
    )
    .filter(charge => 
      searchTerm === '' || 
      (locale === 'hi' ? charge.serviceHi : charge.service).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (locale === 'hi' ? charge.descriptionHi : charge.description).toLowerCase().includes(searchTerm.toLowerCase())
    );

  const categories = Array.from(new Set(charges.map(charge => charge.category)));

  const formatAmount = (amount: number, amountType: string) => {
    if (amountType === 'percentage') {
      return `${amount}%`;
    } else if (amountType === 'fixed') {
      return new Intl.NumberFormat(locale === 'hi' ? 'en-IN' : 'en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    } else {
      return `${new Intl.NumberFormat(locale === 'hi' ? 'en-IN' : 'en-US').format(amount)} ${amountType}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'hi' ? 'en-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const exportToPDF = () => {
    console.log('Exporting service charges to PDF...');
    alert(locale === 'hi' ? 'PDF डाउनलोड किया जा रहा है...' : 'Downloading PDF...');
  };

  const getChargeTypeColor = (chargeType: string) => {
    switch (chargeType.toLowerCase()) {
      case 'free':
        return 'text-green-600 bg-green-50';
      case 'nominal':
        return 'text-blue-600 bg-blue-50';
      case 'standard':
        return 'text-gray-600 bg-gray-50';
      case 'premium':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {locale === 'hi' ? 'सेवा शुल्क' : 'Service Charges'}
            </h1>
            <p className="text-lg text-gray-600">
              {locale === 'hi' 
                ? 'हमारे सभी बैंकिंग सेवाओं के लिए विस्तृत शुल्क'
                : 'Detailed charges for all our banking services'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
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
                      ? charges.find(c => c.category === category)?.categoryHi || category
                      : category
                    }
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'खोजें' : 'Search'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={locale === 'hi' ? 'सेवाएं खोजें...' : 'Search services...'}
                  className="input-field pr-10"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={exportToPDF}
              className="btn-outline text-sm"
            >
              {locale === 'hi' ? 'PDF निर्यात करें' : 'Export to PDF'}
            </button>
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

        {/* Charges List */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCharges.map((charge) => (
              <div key={charge.id} className="bg-white rounded-lg shadow-card border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getChargeTypeColor(charge.chargeType)}`}>
                      {locale === 'hi' ? charge.chargeTypeHi : charge.chargeType}
                    </span>
                    <span className="text-xs text-gray-500">
                      {locale === 'hi' ? charge.frequencyHi : charge.frequency}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {locale === 'hi' ? charge.serviceHi : charge.service}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {locale === 'hi' ? charge.categoryHi : charge.category}
                  </p>
                </div>

                {/* Amount */}
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-bank-blue-600">
                      {formatAmount(charge.amount, charge.amountType)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({locale === 'hi' ? charge.amountTypeHi : charge.amountType})
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-gray-700">
                    {locale === 'hi' ? charge.descriptionHi : charge.description}
                  </p>
                </div>

                {/* Applicable To */}
                {charge.applicableTo && charge.applicableTo.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      {locale === 'hi' ? 'इन पर लागू' : 'Applicable To'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {(locale === 'hi' ? charge.applicableToHi : charge.applicableTo).slice(0, 3).map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {item}
                        </span>
                      ))}
                      {(locale === 'hi' ? charge.applicableToHi : charge.applicableTo).length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{(locale === 'hi' ? charge.applicableToHi : charge.applicableTo).length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {locale === 'hi' ? 'अंतिम अपडेट' : 'Last Updated'}: {formatDate(charge.lastUpdated)}
                    </span>
                    <button className="text-sm text-bank-blue-600 hover:text-bank-blue-700 font-medium">
                      {locale === 'hi' ? 'विवरण' : 'Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCharges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">
              {locale === 'hi' ? 'कोई सेवा शुल्क नहीं मिलीं' : 'No service charges found'}
            </p>
          </div>
        )}

        {/* Summary Cards */}
        {!loading && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {locale === 'hi' ? 'निःशुल्क सेवाएं' : 'Free Services'}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {charges.filter(c => c.amount === 0).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {locale === 'hi' ? 'नाममात्र शुल्क' : 'Nominal Charges'}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {charges.filter(c => c.amount > 0 && c.amount <= 100).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {locale === 'hi' ? 'मानक शुल्क' : 'Standard Charges'}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {charges.filter(c => c.amount > 100 && c.amount <= 500).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {locale === 'hi' ? 'प्रीमियम शुल्क' : 'Premium Charges'}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {charges.filter(c => c.amount > 500).length}
                  </p>
                </div>
              </div>
            </div>
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
                {locale === 'hi' ? 'शुल्क नीति' : 'Charges Policy'}
              </h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {locale === 'hi' 
                      ? 'सभी शुल्क RBI दिशानिर्देशों के अनुसार� हैं'
                      : 'All charges are as per RBI guidelines'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {locale === 'hi' 
                      ? 'शुल्क बैंक के विवेक पर बदल सकती हैं'
                      : 'Charges are subject to change at bank\'s discretion'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {locale === 'hi' 
                      ? 'कुछ सेवाओं पर छूट लागू हो सकती है'
                      : 'Waivers may apply to certain services'
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
                    {locale === 'hi' ? 'ईमेल: charges@bank.com' : 'Email: charges@bank.com'}
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
      </div>
    </div>
  );
};

export default ServiceChargesPage;
