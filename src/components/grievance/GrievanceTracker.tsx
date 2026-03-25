'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface GrievanceTrackerProps {
  locale: 'en' | 'hi';
  referenceNumber?: string;
  className?: string;
}

interface Grievance {
  id: string;
  referenceNumber: string;
  fullName: string;
  complaintType: string;
  complaintCategory: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'submitted' | 'under-review' | 'in-progress' | 'resolved' | 'escalated' | 'closed';
  createdAt: string;
  updatedAt: string;
  resolutionDetails?: string;
  resolutionDate?: string;
  resolvedBy?: string;
  escalationLevel: number;
}

const GrievanceTracker: React.FC<GrievanceTrackerProps> = ({ locale, referenceNumber, className = '' }) => {
  const { t } = useTranslation(locale);
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    status: '',
    priority: '',
    dateRange: ''
  });

  useEffect(() => {
    trackPageView('Grievance Tracker', locale === 'hi' ? 'शिकायत ट्रैकर' : 'Grievance Tracker');
  }, [locale]);

  useEffect(() => {
    fetchGrievances();
  }, [referenceNumber]);

  const fetchGrievances = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        locale,
        ...(referenceNumber && { referenceNumber })
      });

      const response = await fetch(`/api/grievances?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch grievances');
      }

      const data = await response.json();
      
      if (data.success) {
        setGrievances(data.data.grievances || []);
      } else {
        setError(data.message || 'Failed to fetch grievances');
      }
    } catch (err) {
      console.error('Error fetching grievances:', err);
      setError(locale === 'hi' ? 'शिकायत लाने में त्रुटि' : 'Error fetching grievances');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-gray-100 text-gray-800';
      case 'under-review':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'escalated':
        return 'bg-red-100 text-red-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { en: string; hi: string }> = {
      'submitted': { en: 'Submitted', hi: 'दर्ज किया गया' },
      'under-review': { en: 'Under Review', hi: 'समीक्षा में' },
      'in-progress': { en: 'In Progress', hi: 'प्रगति में' },
      'resolved': { en: 'Resolved', hi: 'समाधित' },
      'escalated': { en: 'Escalated', hi: 'एस्केलेटेड' },
      'closed': { en: 'Closed', hi: 'बंद' }
    };
    return statusMap[status]?.[locale] || status;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    const priorityMap: Record<string, { en: string; hi: string }> = {
      'high': { en: 'High', hi: 'उच्च' },
      'medium': { en: 'Medium', hi: 'मध्यम' },
      'low': { en: 'Low', hi: 'कम' }
    };
    return priorityMap[priority]?.[locale] || priority;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  const filteredGrievances = grievances.filter(grievance => {
    if (filter.status && grievance.status !== filter.status) return false;
    if (filter.priority && grievance.priority !== filter.priority) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    const color = getStatusColor(status);
    const text = getStatusText(status);
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const color = getPriorityColor(priority);
    const text = getPriorityText(priority);
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-bank-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a2 2 0 012-2z" />
          </svg>
          <span className="ml-3 text-gray-600">
            {locale === 'hi' ? 'शिकायत लोड हो रहे हैं...' : 'Loading grievances...'}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {locale === 'hi' ? 'त्रुटि हुई' : 'Error'}
          </h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchGrievances}
            className="mt-4 btn-primary px-6 py-2"
          >
            {locale === 'hi' ? 'पुन: प्रयास करें' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'hi' ? 'शिकायत ट्रैकर' : 'Grievance Tracker'}
        </h2>
        <p className="text-gray-600">
          {locale === 'hi' 
            ? 'अपने शिकायत की स्थिति और प्रगति को ट्रैक करें'
            : 'Track the status and progress of your grievances'
          }
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === 'hi' ? 'फिल्टर' : 'Filters'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'स्थिति' : 'Status'}
            </label>
            <select
              id="status-filter"
              value={filter.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input-field"
            >
              <option value="">{locale === 'hi' ? 'सभी स्थितियां' : 'All Status'}</option>
              <option value="submitted">{getStatusText('submitted')}</option>
              <option value="under-review">{getStatusText('under-review')}</option>
              <option value="in-progress">{getStatusText('in-progress')}</option>
              <option value="resolved">{getStatusText('resolved')}</option>
              <option value="escalated">{getStatusText('escalated')}</option>
              <option value="closed">{getStatusText('closed')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'प्राथमिकता' : 'Priority'}
            </label>
            <select
              id="priority-filter"
              value={filter.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="input-field"
            >
              <option value="">{locale === 'hi' ? 'सभी प्राथमिकताएं' : 'All Priorities'}</option>
              <option value="high">{getPriorityText('high')}</option>
              <option value="medium">{getPriorityText('medium')}</option>
              <option value="low">{getPriorityText('low')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'संदर्भ संख्या' : 'Reference Number'}
            </label>
            <input
              type="text"
              id="search-filter"
              value={referenceNumber || ''}
              placeholder={locale === 'hi' ? 'संदर्भ संख्या दर्ज करें' : 'Enter reference number'}
              className="input-field"
              readOnly={!!referenceNumber}
            />
          </div>
        </div>
      </div>

      {/* Grievances List */}
      <div className="space-y-4">
        {filteredGrievances.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707H19a2 2 0 012-2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'कोई शिकायत नहीं मिली' : 'No grievances found'}
            </h3>
            <p className="text-gray-600">
              {locale === 'hi' 
                ? 'आपके फिल्टर मानदंड से मेल खाने वाले कोई शिकायत नहीं मिली।'
                : 'No grievances found matching your filter criteria.'
              }
            </p>
          </div>
        ) : (
          filteredGrievances.map((grievance) => (
            <div key={grievance.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 mr-3">
                      {locale === 'hi' ? 'संदर्भ संख्या' : 'Reference Number'}: {grievance.referenceNumber}
                    </h3>
                    {getStatusBadge(grievance.status)}
                    {getPriorityBadge(grievance.priority)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium text-gray-900">
                        {locale === 'hi' ? 'नाम' : 'Name'}:
                      </span>
                      {grievance.fullName}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {locale === 'hi' ? 'शिकायत प्रकार' : 'Type'}:
                      </span>
                      {grievance.complaintType}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {locale === 'hi' ? 'श्रेणी' : 'Category'}:
                      </span>
                      {grievance.complaintCategory}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {locale === 'hi' ? 'दर्ज तिथि' : 'Submitted'}:
                      </span>
                      {formatDate(grievance.createdAt)}
                    </div>
                  </div>

                  {grievance.description && (
                    <div className="mt-3">
                      <span className="font-medium text-gray-900 text-sm">
                        {locale === 'hi' ? 'विवरण' : 'Description'}:
                      </span>
                      <p className="text-gray-600 mt-1 text-sm">
                        {grievance.description.length > 100 
                          ? grievance.description.substring(0, 100) + '...'
                          : grievance.description
                        }
                      </p>
                    </div>
                  )}

                  {grievance.resolutionDetails && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                      <h4 className="font-medium text-green-900 text-sm mb-1">
                        {locale === 'hi' ? 'समाधान विवरण' : 'Resolution Details'}
                      </h4>
                      <p className="text-green-700 text-sm">{grievance.resolutionDetails}</p>
                      {grievance.resolutionDate && (
                        <p className="text-green-600 text-xs mt-1">
                          {locale === 'hi' ? 'समाधान तिथि' : 'Resolved on'}: {formatDate(grievance.resolutionDate)}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 md:mt-0 md:ml-4">
                  <button
                    onClick={() => window.open(`/grievances/${grievance.referenceNumber}`, '_blank')}
                    className="btn-secondary px-4 py-2 text-sm"
                  >
                    {locale === 'hi' ? 'विवरण देखें' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          {locale === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Help?'}
        </h3>
        <div className="space-y-3 text-sm text-blue-700">
          <p>
            {locale === 'hi' 
              ? 'यदि आपको अपने शिकायत की स्थिति के बारे में कोई समस्या है, तो कृपया हमारे ग्राहक सेवा केंदर्ज करें:'
              : 'If you have any questions about your grievance status, please contact our grievance support:'
            }
          </p>
          <div className="space-y-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2v3.28a2.491 2.491 0 011.014.322l.868.868c.283.228.514.5.868.868h.328c.491 0 .912.165 1.243.352l.868.868c.283.228.514.5.868.868h.328c.491 0 .912.165 1.243.352l.868.868c.283.228.514.5.868.868h.328c-.491 0-.912-.165-1.243-.352l-.868-.868c-.283-.228-.514-.5-.868-.868h-.328c-.491 0-.912-.165-1.243-.352l-.868-.868c-.283-.228-.514-.5-.868-.868h-.328z" />
              </svg>
              <span>{locale === 'hi' ? 'ग्राहक सेवा' : 'Toll-Free'}: 1800-123-4567</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22.37 1.48l.816.816a2 2 0 001.48.22.37L21 8a2 2 0 00-1-1.73l-.778-4.088V4a2 2 0 00-2-2H4a2 2 0 00-2 2v4.01z" />
              </svg>
              <span>{locale === 'hi' ? 'ईमेल' : 'Email'}: support@bank.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceTracker;
