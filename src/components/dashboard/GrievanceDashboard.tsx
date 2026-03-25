'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { calculateGrievanceMetrics, getPerformanceMetrics, generateComplianceReport, getDetailedGrievanceReport } from '@/lib/analytics/grievance-analytics';

interface GrievanceDashboardProps {
  locale: 'en' | 'hi';
  className?: string;
}

const GrievanceDashboard: React.FC<GrievanceDashboardProps> = ({ locale, className = '' }) => {
  const { t } = useTranslation(locale);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    category: '',
    priority: '',
    locale: ''
  });
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Grievance Dashboard', locale === 'hi' ? 'शिकायत डैशबोर्ड' : 'Grievance Dashboard');
    loadDashboardData();
  }, [locale, timeRange, filters]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load different data based on active tab
      switch (activeTab) {
        case 'overview':
          setMetrics(calculateGrievanceMetrics(locale));
          break;
        case 'performance':
          setMetrics(getPerformanceMetrics());
          break;
        case 'compliance':
          setMetrics(generateComplianceReport());
          break;
        case 'detailed':
          setMetrics(getDetailedGrievanceReport(filters));
          break;
        default:
          setMetrics(calculateGrievanceMetrics(locale));
      }
    } catch (error) {
      console.error('Dashboard data loading error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'submitted': 'bg-gray-100',
      'under-review': 'bg-blue-100',
      'in-progress': 'bg-yellow-100',
      'resolved': 'bg-green-100',
      'escalated': 'bg-red-100',
      'closed': 'bg-gray-100'
    };
    return colors[status] || 'bg-gray-100';
  };

  const getPerformanceColor = (performance: string) => {
    const colors: Record<string, string> = {
      'Good': 'text-green-600',
      'Needs Improvement': 'text-red-600',
      'Average': 'text-yellow-600'
    };
    return colors[performance] || 'text-gray-600';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(locale === 'hi' ? 'en-IN' : 'en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
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
            {locale === 'hi' ? 'डैशबोर्ड लोड हो रहा है...' : 'Loading dashboard...'}
          </span>
        </div>
      </div>
    );
  }

  const renderOverviewTab = () => {
    if (!metrics) return null;

    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'कुल शिकायत' : 'Total Grievances'}
            </h3>
            <p className="text-3xl font-bold text-bank-blue-600">
              {formatNumber(metrics.totalGrievances)}
            </p>
            <p className="text-sm text-gray-600">
              {locale === 'hi' ? 'सभी समय' : 'All time'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'औसत औसत' : 'Open & Resolved'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{locale === 'hi' ? 'खुला' : 'Open'}</span>
                <span className="font-semibold text-yellow-600">
                  {formatNumber((metrics.grievancesByStatus.submitted || 0) + (metrics.grievancesByStatus['under-review'] || 0) + (metrics.grievancesByStatus['in-progress'] || 0))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{locale === 'hi' ? 'समाधित' : 'Resolved'}</span>
                <span className="font-semibold text-green-600">
                  {formatNumber(metrics.grievancesByStatus.resolved || 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'औसत समय' : 'Avg Resolution Time'}
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {metrics.averageResolutionTime.toFixed(1)} {locale === 'hi' ? 'दिन' : 'days'}
            </p>
            <p className="text-sm text-gray-600">
              {locale === 'hi' ? 'औसत' : 'Average'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {locale === 'hi' ? 'एस्केलेशन दर' : 'Escalation Rate'}
            </h3>
            <p className="text-2xl font-bold text-orange-600">
              {formatPercentage(metrics.escalationRate)}
            </p>
            <p className="text-sm text-gray-600">
              {locale === 'hi' ? 'एस्केलेट किए गए' : 'Escalated'}
            </p>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'स्थिति वितरण' : 'Status Distribution'}
          </h3>
          <div className="space-y-3">
            {Object.entries(metrics.grievancesByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}></div>
                  <span className="ml-3 font-medium">
                    {status === 'submitted' && (locale === 'hi' ? 'दर्ज किया गया' : 'Submitted')}
                    {status === 'under-review' && (locale === 'hi' ? 'समीक्षा में' : 'Under Review')}
                    {status === 'in-progress' && (locale === 'hi' ? 'प्रगति में' : 'In Progress')}
                    {status === 'resolved' && (locale === 'hi' ? 'समाधित' : 'Resolved')}
                    {status === 'escalated' && (locale === 'hi' ? 'एस्केलेटेड' : 'Escalated')}
                    {status === 'closed' && (locale === 'hi' ? 'बंद' : 'Closed')}
                  </span>
                </div>
                <span className="font-bold text-gray-900">
                  {formatNumber(count as number)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'प्राथमिकता वितरण' : 'Priority Distribution'}
          </h3>
          <div className="space-y-3">
            {Object.entries(metrics.grievancesByPriority).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    priority === 'high' ? 'bg-red-500' : 
                    priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="ml-3 font-medium capitalize">
                    {priority === 'high' && (locale === 'hi' ? 'उच्च' : 'High')}
                    {priority === 'medium' && (locale === 'hi' ? 'मध्यम' : 'Medium')}
                    {priority === 'low' && (locale === 'hi' ? 'कम' : 'Low')}
                  </span>
                </div>
                <span className="font-bold text-gray-900">
                  {formatNumber(count as number)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPerformanceTab = () => {
    if (!metrics) return null;

    return (
      <div className="space-y-6">
        {/* Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {locale === 'hi' ? 'समाधान समय' : 'Resolution Time'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{locale === 'hi' ? 'औसत' : 'Average'}</span>
                <span className="text-xl font-bold text-blue-600">
                  {metrics.resolutionTimePerformance.average.toFixed(1)} {locale === 'hi' ? 'दिन' : 'days'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{locale === 'hi' ? 'लक्ष्य' : 'Target'}</span>
                <span className="text-xl font-bold text-gray-600">
                  {metrics.resolutionTimePerformance.target} {locale === 'hi' ? 'दिन' : 'days'}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className={`font-medium ${getPerformanceColor(metrics.resolutionTimePerformance.performance)}`}>
                {metrics.resolutionTimePerformance.performance}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {locale === 'hi' ? 'एस्केलेशन दर' : 'Escalation Rate'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{locale === 'hi' ? 'वर्तमान' : 'Current'}</span>
                <span className="text-xl font-bold text-orange-600">
                  {formatPercentage(metrics.escalationPerformance.rate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{locale === 'hi' ? 'लक्ष्य' : 'Target'}</span>
                <span className="text-xl font-bold text-gray-600">
                  {formatPercentage(metrics.escalationPerformance.target)}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className={`font-medium ${getPerformanceColor(metrics.escalationPerformance.performance)}`}>
                {metrics.escalationPerformance.performance}
              </span>
            </div>
          </div>
        </div>

        {/* Volume Metrics */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'वॉल्यूम मीट्रिक्स' : 'Volume Metrics'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">{locale === 'hi' ? 'दैनिक' : 'Daily'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(metrics.volumeMetrics.daily)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">{locale === 'hi' ? 'साप्ताहिक' : 'Weekly'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(metrics.volumeMetrics.weekly)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">{locale === 'hi' ? 'मासिक' : 'Monthly'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(metrics.volumeMetrics.monthly)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderComplianceTab = () => {
    if (!metrics) return null;

    return (
      <div className="space-y-6">
        {/* RBI Compliance */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'आरबीआई अनुपालन' : 'RBI Compliance'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {locale === 'hi' ? 'कुल शिकायत' : 'Total Grievances'}
                </h4>
                <p className="text-2xl font-bold text-blue-600">
                  {formatNumber(metrics.rbiCompliance.totalGrievances)}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {locale === 'hi' ? 'आरबीआई को एस्केलेट' : 'Escalated to RBI'}
                </h4>
                <p className="text-2xl font-bold text-red-600">
                  {formatNumber(metrics.rbiCompliance.escalatedToRBI)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {locale === 'hi' ? 'औसत समय' : 'Avg Resolution Time'}
                </h4>
                <p className="text-2xl font-bold text-blue-600">
                  {metrics.rbiCompliance.averageResolutionTime.toFixed(1)} {locale === 'hi' ? 'दिन' : 'days'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {locale === 'hi' ? 'एसएलए अनुपालन' : 'SLA Compliance'}
                </h4>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">
                    {formatPercentage(metrics.rbiCompliance.slaCompliance)}
                  </span>
                  <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                    metrics.rbiCompliance.slaCompliance >= 95 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {metrics.rbiCompliance.slaCompliance >= 95 ? 
                      (locale === 'hi' ? 'अनुपालन' : 'Compliant') : 
                      (locale === 'hi' ? 'अनुपालन बाहर' : 'Non-Compliant')
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'गुणवत्व मीट्रिक्स' : 'Quality Metrics'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                {locale === 'hi' ? 'संतुष्टि स्कोर' : 'Satisfaction Score'}
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {metrics.qualityMetrics.satisfactionScore.toFixed(1)}/5.0
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                {locale === 'hi' ? 'फिर से खोले गए' : 'Re-opened'}
              </h4>
              <p className="text-2xl font-bold text-yellow-600">
                {formatNumber(metrics.qualityMetrics.reOpenedGrievances)}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                {locale === 'hi' ? 'डुप्लिकेट' : 'Duplicates'}
              </h4>
              <p className="text-2xl font-bold text-orange-600">
                {formatPercentage(metrics.qualityMetrics.duplicateGrievances)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDetailedTab = () => {
    if (!metrics || !Array.isArray(metrics)) return null;

    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'फिल्टर' : 'Filters'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'स्थिति' : 'Status'}
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input-field"
              >
                <option value="">{locale === 'hi' ? 'सभी स्थितियां' : 'All Status'}</option>
                <option value="submitted">{locale === 'hi' ? 'दर्ज किया गया' : 'Submitted'}</option>
                <option value="under-review">{locale === 'hi' ? 'समीक्षा में' : 'Under Review'}</option>
                <option value="in-progress">{locale === 'hi' ? 'प्रगति में' : 'In Progress'}</option>
                <option value="resolved">{locale === 'hi' ? 'समाधित' : 'Resolved'}</option>
                <option value="escalated">{locale === 'hi' ? 'एस्केलेटेड' : 'Escalated'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'प्रकार' : 'Type'}
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="input-field"
              >
                <option value="">{locale === 'hi' ? 'सभी प्रकार' : 'All Types'}</option>
                <option value="service">{locale === 'hi' ? 'सेवा' : 'Service'}</option>
                <option value="transaction">{locale === 'hi' ? 'लेनदेन' : 'Transaction'}</option>
                <option value="account">{locale === 'hi' ? 'खाता' : 'Account'}</option>
                <option value="atm">{locale === 'hi' ? 'एटीएम' : 'ATM'}</option>
                <option value="digital">{locale === 'hi' ? 'डिजिटल' : 'Digital'}</option>
                <option value="staff">{locale === 'hi' ? 'कर्मचारी' : 'Staff'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'प्राथमिकता' : 'Priority'}
              </label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="input-field"
              >
                <option value="">{locale === 'hi' ? 'सभी प्राथमिकताएं' : 'All Priorities'}</option>
                <option value="high">{locale === 'hi' ? 'उच्च' : 'High'}</option>
                <option value="medium">{locale === 'hi' ? 'मध्यम' : 'Medium'}</option>
                <option value="low">{locale === 'hi' ? 'कम' : 'Low'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'शिकायत विवरण' : 'Grievance Details'}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'संदर्भ संख्या' : 'Reference'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'नाम' : 'Name'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'प्रकार' : 'Type'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'प्राथमिकता' : 'Priority'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'स्थिति' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'दर्ज तिथि' : 'Created'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {locale === 'hi' ? 'अपडेट' : 'Updated'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metrics.map((grievance: any) => (
                  <tr key={grievance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {grievance.referenceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grievance.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grievance.complaintType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        grievance.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        grievance.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {grievance.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(grievance.status)}`}>
                        {grievance.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(grievance.createdAt).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(grievance.updatedAt).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {locale === 'hi' ? 'शिकायत डैशबोर्ड' : 'Grievance Dashboard'}
          </h1>
          <p className="text-gray-600">
            {locale === 'hi' 
              ? 'शिकायत प्रबंधन और प्रदर्शन का विस्तृत अवलोकन'
              : 'Monitor grievance trends, performance, and compliance metrics'
            }
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 bg-white rounded-lg shadow-card border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {locale === 'hi' ? 'समय सीमा' : 'Time Range'}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleTimeRangeChange('7d')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  timeRange === '7d' ? 'bg-bank-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {locale === 'hi' ? '7 दिन' : '7 Days'}
              </button>
              <button
                onClick={() => handleTimeRangeChange('30d')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  timeRange === '30d' ? 'bg-bank-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {locale === 'hi' ? '30 दिन' : '30 Days'}
              </button>
              <button
                onClick={() => handleTimeRangeChange('90d')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  timeRange === '90d' ? 'bg-bank-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {locale === 'hi' ? '90 दिन' : '90 Days'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-card border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-bank-blue-500 text-bank-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {locale === 'hi' ? 'अवलोकन' : 'Overview'}
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'performance'
                    ? 'border-bank-blue-500 text-bank-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {locale === 'hi' ? 'प्रदर्शन' : 'Performance'}
              </button>
              <button
                onClick={() => setActiveTab('compliance')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'compliance'
                    ? 'border-bank-blue-500 text-bank-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {locale === 'hi' ? 'अनुपालन' : 'Compliance'}
              </button>
              <button
                onClick={() => setActiveTab('detailed')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'detailed'
                    ? 'border-bank-blue-500 text-bank-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {locale === 'hi' ? 'विस्तृत' : 'Detailed'}
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'performance' && renderPerformanceTab()}
            {activeTab === 'compliance' && renderComplianceTab()}
            {activeTab === 'detailed' && renderDetailedTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceDashboard;
