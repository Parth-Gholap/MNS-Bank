'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { api } from '@/lib/http-client/client';
import { DEAFRecord } from '@/types';
import { trackPageView, trackSearch, trackDownload } from '@/lib/analytics';

interface DEAFPageProps {
  locale: 'en' | 'hi';
}

const DEAFPage: React.FC<DEAFPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [records, setRecords] = useState<DEAFRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const recordsPerPage = 10;

  useEffect(() => {
    trackPageView('DEAF Unclaimed Deposits', locale === 'hi' ? 'डीईएएफ अनधारित जमा' : 'DEAF Unclaimed Deposits');
  }, [locale]);

  const fetchDEAFRecords = async (page: number = 1, search?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: recordsPerPage.toString(),
        ...(search && { search: search.trim() })
      });

      const response = await api.getDEAFRecords({
        'Accept-Language': locale === 'hi' ? 'hi' : 'en',
        'X-Page': page.toString()
      });

      if (response.success && response.data) {
        const data = response.data as any;
        setRecords(data.records || []);
        setTotalPages(Math.ceil((data.total || 0) / recordsPerPage));
      } else {
        setError(response.error?.message || 'Failed to fetch DEAF records');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchDEAFRecords(1, query);
    trackSearch(query, records.length);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchDEAFRecords(page, searchQuery);
  };

  const handleDownload = async () => {
    try {
      const params = new URLSearchParams({
        search: searchQuery.trim(),
        format: 'csv'
      });

      const response = await fetch('/api/compliance/deaf/download', {
        headers: {
          'Accept-Language': locale === 'hi' ? 'hi' : 'en'
        }
      });

      if (response.ok) {
        const data = await response.blob();
        // Create download link
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `deaf-records-${locale}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        trackDownload('deaf-records.csv', 'text/csv');
      } else {
        setError('Failed to download DEAF records');
      }
    } catch (err) {
      setError('Failed to download DEAF records');
    }
  };

  return (
    <div className="container-bank px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-h2 text-gray-900">
          {t('compliance.deaf')}
        </h1>
        <p className="text-body text-gray-600 mb-6">
          {locale === 'hi' 
            ? 'डीईएएफ अनधारित जमा (DEAF) खातों और अधारित जमा की जानकारी पर जमा की जानकारी खातों की जानकारी'
            : 'Depositor Education and Awareness Fund (DEAF) Unclaimed Deposits and Accounts'}
        </p>
      </div>

      {/* Search and Download */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={locale === 'hi' ? 'खातों...' : 'Search by name, account number, or GL code...'}
              className="input-field w-full md:w-96 pr-10"
              aria-label={t('common.search')}
            />
            <svg className="absolute right-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6-6 2 2 12.79a2 2 0 01 2.82l-6.01-6.01z" />
            </svg>
          </div>
        </div>
        <button
          onClick={handleDownload}
          disabled={loading || records.length === 0}
          className="btn-gold px-6 py-3 whitespace-nowrap"
          aria-label={locale === 'hi' ? 'डाउनलोड करें' : 'Download CSV'}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-2 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018 8v4a8 8 0 014-8 0-4.58-4.58z" />
              </svg>
              {locale === 'hi' ? 'डाउनलोड में...' : 'Downloading...'}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m-6 6H6a2 2 0 012 2v6a2 2 0 012 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 3 3h6v-6a2 2 0 012-2z" />
              </svg>
              {locale === 'hi' ? 'डाउनलोड CSV' : 'Download CSV'}
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0-4-4.585-4.585a2 2 0 011-1.293 1.293-1.293 0-4.585-4.585z" />
            </svg>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 border-t-transparent"></div>
        </div>
      )}

      {/* DEAF Records Table */}
      {!loading && records.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-card border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'खाता' : 'Customer ID'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'जीएल कोड' : 'GL Code'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'नया खाता संख्या' : 'New Account Number'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'डीईएएफ खाता संख्या' : 'DEAF Account Number'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'खाताधारक नाम' : 'Account Name'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'पता' : 'Address'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'शहर' : 'District'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'राज्य' : 'State'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'लेनदेंड' : 'Transaction Date'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {locale === 'hi' ? 'डीईएएफ राशि' : 'DEAF Amount'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record, index) => (
                <tr key={record.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.customerId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.glCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.newAccountNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.deafAccountNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.accountName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.district}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.transactionDate).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {new Intl.NumberFormat(locale === 'hi' ? 'hi-IN' : 'en-IN').format(record.deafAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Records State */}
      {!loading && !error && records.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-gray-100 rounded-lg p-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 6-6a2 2 0 012-2v6a2 2 0 012-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {locale === 'hi' ? 'कोई रिकॉर्ड नहीं मिले' : 'No Records Found'}
            </h3>
            <p className="text-body text-gray-600">
              {locale === 'hi' 
                ? 'वर्तमान डीईएएफ राशि के लिए कोई रिकॉर्ड उपलब्ध हैं। कृपया बाद में फिर से संपर्क करें।'
                : 'There are currently no unclaimed deposits or accounts in the DEAF database. Please check back later or contact our support team for assistance.'
              }
            </p>
            <div className="mt-4">
              <a
                href="mailto:support@mnsbank.com"
                className="btn-primary inline-block"
              >
                {locale === 'hi' ? 'समर्थन करें' : 'Contact Support'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {locale === 'hi' ? 'पिछला' : 'Previous'}
          </button>
          
          <span className="text-sm text-gray-600">
            {locale === 'hi' ? 'पृष्ठ' : 'Page'} {currentPage} {locale === 'hi' ? 'का' : 'of'} {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {locale === 'hi' ? 'अगला' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DEAFPage;
