'use client';

import React, { useState, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { MonthlyBreakdown, calculateEMIWithSchedule, EMICalculationInput } from '@/lib/calculator/emi';

interface AmortizationTableProps {
  locale: 'en' | 'hi';
  calculationInput: EMICalculationInput;
  className?: string;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ 
  locale, 
  calculationInput, 
  className = '' 
}) => {
  const { t } = useTranslation(locale);
  const [currentPage, setCurrentPage] = useState(1);
  const [showYearly, setShowYearly] = useState(false);
  const itemsPerPage = 12;

  React.useEffect(() => {
    trackPageView('Amortization Schedule', locale === 'hi' ? 'भुगतान अनुसूची' : 'Amortization Schedule');
  }, [locale]);

  const calculationResult = useMemo(() => {
    return calculateEMIWithSchedule(calculationInput);
  }, [calculationInput]);

  const yearlyData = useMemo(() => {
    const yearlyBreakdown: Array<{
      year: number;
      openingBalance: number;
      totalEMI: number;
      totalInterest: number;
      totalPrincipal: number;
      closingBalance: number;
    }> = [];

    if (!calculationResult.monthlyBreakdown) return yearlyBreakdown;

    for (let year = 1; year <= Math.ceil(calculationInput.tenure / 12); year++) {
      const startMonth = (year - 1) * 12;
      const endMonth = Math.min(year * 12, calculationInput.tenure);
      
      const yearData = calculationResult.monthlyBreakdown.slice(startMonth, endMonth);
      
      const openingBalance = yearData[0]?.openingBalance || 0;
      const totalEMI = yearData.reduce((sum, month) => sum + month.emi, 0);
      const totalInterest = yearData.reduce((sum, month) => sum + month.interestComponent, 0);
      const totalPrincipal = yearData.reduce((sum, month) => sum + month.principalComponent, 0);
      const closingBalance = yearData[yearData.length - 1]?.closingBalance || 0;
      
      yearlyBreakdown.push({
        year,
        openingBalance,
        totalEMI,
        totalInterest,
        totalPrincipal,
        closingBalance
      });
    }
    
    return yearlyBreakdown;
  }, [calculationResult.monthlyBreakdown, calculationInput.tenure]);

  const displayData = showYearly ? yearlyData : calculationResult.monthlyBreakdown;
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = displayData.slice(startIndex, endIndex);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'hi' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleExport = () => {
    const csvContent = [
      showYearly ? 'Year,Opening Balance,Total EMI,Total Interest,Total Principal,Closing Balance' : 
                   'Month,Opening Balance,EMI,Interest,Principal,Closing Balance',
      ...displayData.map(item => {
        if (showYearly) {
          const yearlyItem = item as typeof yearlyData[0];
          return `${yearlyItem.year},${yearlyItem.openingBalance},${yearlyItem.totalEMI},${yearlyItem.totalInterest},${yearlyItem.totalPrincipal},${yearlyItem.closingBalance}`;
        } else {
          const monthlyItem = item as MonthlyBreakdown;
          return `${monthlyItem.month},${monthlyItem.openingBalance},${monthlyItem.emi},${monthlyItem.interestComponent},${monthlyItem.principalComponent},${monthlyItem.closingBalance}`;
        }
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amortization-schedule-${showYearly ? 'yearly' : 'monthly'}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'hi' ? 'भुगतान अनुसूची' : 'Amortization Schedule'}
        </h2>
        <p className="text-gray-600">
          {locale === 'hi' 
            ? 'ऋण की भुगतान अनुसूची देखें, मासिक या वार्षिक दृश्य में'
            : 'View your loan amortization schedule, monthly or yearly breakdown'
          }
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-bank-blue-50 border border-bank-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">
            {locale === 'hi' ? 'मासिक EMI' : 'Monthly EMI'}
          </p>
          <p className="text-xl font-bold text-bank-blue-600">
            {formatCurrency(calculationResult.emi)}
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">
            {locale === 'hi' ? 'कुल भुगतानी' : 'Total Payment'}
          </p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(calculationResult.totalAmount)}
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">
            {locale === 'hi' ? 'कुल ब्याज' : 'Total Interest'}
          </p>
          <p className="text-xl font-bold text-yellow-600">
            {formatCurrency(calculationResult.totalInterest)}
          </p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">
            {locale === 'hi' ? 'प्रभावी दर' : 'Effective Rate'}
          </p>
          <p className="text-xl font-bold text-purple-600">
            {calculationResult.effectiveRate.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowYearly(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              !showYearly 
                ? 'bg-bank-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {locale === 'hi' ? 'मासिक' : 'Monthly'}
          </button>
          <button
            onClick={() => setShowYearly(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              showYearly 
                ? 'bg-bank-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {locale === 'hi' ? 'वार्षिक' : 'Yearly'}
          </button>
        </div>
        
        <button
          onClick={handleExport}
          className="btn-outline"
        >
          {locale === 'hi' ? 'CSV में निर्यात करें' : 'Export to CSV'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? (showYearly ? 'वर्ष' : 'महीना') : (showYearly ? 'Year' : 'Month')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? 'प्रारंभिक शेष' : 'Opening Balance'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? (showYearly ? 'कुल EMI' : 'EMI') : (showYearly ? 'Total EMI' : 'EMI')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? (showYearly ? 'कुल ब्याज' : 'ब्याज') : (showYearly ? 'Total Interest' : 'Interest')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? (showYearly ? 'कुल मूलधन' : 'मूलधन') : (showYearly ? 'Total Principal' : 'Principal')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? 'समापन शेष' : 'Closing Balance'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPageData.map((item, index) => {
              const isYearly = showYearly;
              const data = item as any;
              
              return (
                <tr key={isYearly ? data.year : data.month} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {isYearly ? `Year ${data.year}` : `Month ${data.month}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(data.openingBalance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(isYearly ? data.totalEMI : data.emi)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(isYearly ? data.totalInterest : data.interestComponent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(isYearly ? data.totalPrincipal : data.principalComponent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(data.closingBalance)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            {locale === 'hi' 
              ? `${startIndex + 1}-${Math.min(endIndex, displayData.length)} ${displayData.length} का दिखा रहा है`
              : `Showing ${startIndex + 1} to ${Math.min(endIndex, displayData.length)} of ${displayData.length}`
            }
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {locale === 'hi' ? 'पिछला' : 'Previous'}
            </button>
            
            <span className="text-sm text-gray-700">
              {currentPage} / {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {locale === 'hi' ? 'अगला' : 'Next'}
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">
          {locale === 'hi' ? 'स्पष्टीकरण' : 'Legend'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-bank-blue-100 rounded mr-2"></div>
            <span>{locale === 'hi' ? 'मासिक EMI' : 'Monthly EMI'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
            <span>{locale === 'hi' ? 'कुल भुगतानी' : 'Total Payment'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 rounded mr-2"></div>
            <span>{locale === 'hi' ? 'ब्याज घटक' : 'Interest Component'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-100 rounded mr-2"></div>
            <span>{locale === 'hi' ? 'मूलधन घटक' : 'Principal Component'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmortizationTable;
