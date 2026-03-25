'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { api } from '@/lib/api/client';
import { GrievanceOfficer } from '@/types';
import { trackPageView, trackFormSubmission } from '@/lib/analytics';

interface GrievanceRedressalPageProps {
  locale: 'en' | 'hi';
}

const GrievanceRedressalPage: React.FC<GrievanceRedressalPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    complaintType: 'service',
    subject: '',
    message: '',
    referenceNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackPageView('Grievance Redressal', locale === 'hi' ? 'शिकायत निवारण' : 'Grievance Redressal');
  }, [locale]);

  const grievanceOfficers: GrievanceOfficer[] = [
    {
      level: 1,
      name: locale === 'hi' ? 'श्री. रमेश कुमार जैन' : 'Shri. Ramesh Kumar',
      designation: locale === 'hi' ? 'वरिषीय अधिकारी' : 'Branch Manager',
      email: 'manager@mnsbankbhopal.com',
      phone: '0755-1234567',
      address: locale === 'hi' ? 'मुख्य नगर नागरिक सहकारी बैंक, बैरागर, म.प. - 462001' : 'Mukhya Nagar, Nagrik Sahakari Bank, Bairagarh, M.P. - 462001',
      resolutionTat: locale === 'hi' ? '7 दिनों' : '7 days'
    },
    {
      level: 2,
      name: locale === 'hi' ? 'श्री. अजय कुमार जैन' : 'Shri. Ashok Sharma',
      designation: locale === 'hi' ? 'वरिषीय अधिकारी' : 'Assistant Manager',
      email: 'assistant.manager@mnsbankbhopal.com',
      phone: '0755-1234568',
      address: locale === 'hi' ? 'मुख्य नगर नागरिक सहकारी बैंक, बैरागर, म.प. - 462001' : 'Mukhya Nagar, Nagrik Sahakari Bank, Bairagarh, M.P. - 462001',
      resolutionTat: locale === 'hi' ? '15 दिनों' : '15 days'
    },
    {
      level: 3,
      name: locale === 'hi' ? 'श्री. वेंक कुमार जैन' : 'Shri. Rajendra Singh',
      designation: locale === 'hi' ? 'मुख्य प्रबंधक' : 'Chief Manager',
      email: 'chief.manager@mnsbankbhopal.com',
      phone: '0755-1234569',
      address: locale === 'hi' ? 'मुख्य नगर नागरिक सहकारी बैंक, बैरागर, म.प. - 462001' : 'Mukhya Nagar, Nagrik Sahakari Bank, Bairagarh, M.P. - 462001',
      resolutionTat: locale === 'hi' ? '30 दिनों' : '30 days'
    }
  ];

  const complaintTypes = [
    { value: 'service', label: locale === 'hi' ? 'सेवा संबंधित' : 'Service Related' },
    { value: 'product', label: locale === 'hi' ? 'उत्पाद संबंधित' : 'Product Related' },
    { value: 'transaction', label: locale === 'hi' ? 'लेन-देन व्यवहार संबंधित' : 'Transaction Related' },
    { value: 'staff', label: locale === 'hi' ? 'कर्मचारी संबंधित' : 'Staff Related' },
    { value: 'atm', label: locale === 'hi' ? 'एटीएम संबंधित' : 'ATM Related' },
    { value: 'other', label: locale === 'hi' ? 'अन्य संबंधित' : 'Other' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      setError(locale === 'hi' ? 'कृपया नाम और मोबाइल नंबर आवश्यक हैं' : 'Full name and mobile number are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await api.submitInquiry({
        complaintType: formData.complaintType,
        subject: formData.subject,
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        message: formData.message,
        referenceNumber: formData.referenceNumber
      });

      if (response.success && response.data) {
        const data = response.data as any;
        setSubmitted(true);
        setFormData(prev => ({ ...prev, referenceNumber: data.referenceNumber || '' }));
        trackFormSubmission('grievance', data.referenceNumber);
      } else {
        setError(response.error?.message || 'Failed to submit grievance');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-bank px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-h2 text-gray-900">
          {t('compliance.grievanceRedressal')}
        </h1>
        <p className="text-body text-gray-600 mb-6">
          {locale === 'hi' 
            ? 'हमारे नागरिक सहकारी बैंक में आपकी शिकायतों को सुनिश्चित करने के लिए एक तीन-स्तर त्रीव संबंधन और उचित निवारण है।'
            : 'We are committed to providing excellent service to our customers. If you have any grievances or suggestions, please use this form to register your complaint. We will address your concerns promptly and fairly.'}
        </p>
      </div>

      {/* RBI Ombudsman Link */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v4H8a1 1 0 011-1.293 1.293-1.293z" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              {locale === 'hi' ? 'आरबीआई ओम्बड्समैन' : 'RBI Ombudsman'}
            </h3>
            <p className="text-blue-800">
              {locale === 'hi' 
                ? 'यदि किसी बात समाधान के लिए हमारे सीधे से संपर्क करें, तो आप सीधे से संपर्क कर सकते हैं।'
                : 'If you are not satisfied with our response, you may approach the Banking Ombudsman for resolution.'}
            </p>
            <a
              href="https://rbi.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block mt-4"
            >
              {locale === 'hi' ? 'आरबीआई ओम्बड्समैन पर जाएं' : 'Visit RBI Ombudsman'}
            </a>
          </div>
        </div>
      </div>

      {/* Escalation Matrix */}
      <div className="mb-8">
        <h2 className="text-h3 text-gray-900 mb-6">
          {locale === 'hi' ? 'तीन-स्तर त्रीव मैट्रिक्स' : 'Escalation Matrix'}
        </h2>
        <p className="text-body text-gray-600 mb-6">
          {locale === 'hi' 
            ? 'यदि आपकी शिकायत का समाधान न हो, तो आप निम्नलित तौर पर संपर्क कर सकते हैं:'
            : 'If your complaint is not resolved within the specified time, you may escalate to the next level:'}
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-card border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? 'स्तर' : 'Level'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? 'अधिकारी' : 'Name'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? 'पदेशी' : 'Designation'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? 'ईमेल' : 'Email'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? 'फोन' : 'Phone'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? 'पता' : 'Address'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {locale === 'hi' ? 'समाधान समय' : 'Resolution Time'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {grievanceOfficers.map((officer, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {officer.level}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {officer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {officer.designation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {officer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {officer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {officer.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {officer.resolutionTat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grievance Form */}
      <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="complaintType" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'शिकायत प्रकार' : 'Complaint Type'}
            </label>
            <select
              id="complaintType"
              name="complaintType"
              value={formData.complaintType}
              onChange={handleInputChange}
              className="input-field"
              aria-required="true"
            >
              {complaintTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'विषय' : 'Subject'}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder={locale === 'hi' ? 'विषय दर्ज करें...' : 'Enter subject...'}
              className="input-field"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'पूरा नाम' : 'Full Name'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={locale === 'hi' ? 'अपना नाम दर्ज करें...' : 'Enter your full name...'}
              className="input-field"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder={locale === 'hi' ? '10-अंक अंक मोबाइल नंबर दर्ज करें...' : 'Enter your 10-digit mobile number...'}
              className="input-field"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'ईमेल' : 'Email'}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={locale === 'hi' ? 'ईमेल दर्ज करें...' : 'Enter your email address...'}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'संदेश' : 'Message'}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder={locale === 'hi' ? 'अपना संदेश यहां दर्ज करें...' : 'Describe your grievance in detail...'}
              className="input-field"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'संदर्भंक' : 'Reference Number'}
            </label>
            <input
              type="text"
              id="referenceNumber"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleInputChange}
              placeholder={locale === 'hi' ? 'संदर्भंक दर्ज करें...' : 'Enter reference number if available...'}
              className="input-field"
              disabled={true}
              readOnly
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0-4-4.585-4.585a2 2 0 011-1.293 1.293-1.293z" />
                </svg>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || submitted}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-2 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018 8v4a8 8 0 014-8 0-4.58-4.585z" />
                  </svg>
                  {locale === 'hi' ? 'जमा कर रहे...' : 'Submitting...'}
                </>
              ) : submitted ? (
                <>
                  <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4 4 4L2 17l-4-4 4-4-4.585-4.585z" />
                  </svg>
                  {locale === 'hi' ? 'जमा कर दिया गया!' : 'Submitted Successfully!'}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 3 3h6v-6a2 2 0 012-2v6a2 2 0 012-2z" />
                  </svg>
                  {locale === 'hi' ? 'जमा करें' : 'Submit Grievance'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 2a2 2 0 012-2v6a2 2 0 012-2z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                {locale === 'hi' ? 'सफलतय!' : 'Grievance Submitted Successfully!'}
              </h3>
              <p className="text-green-800">
                {locale === 'hi' 
                  ? `आपकी शिकायत क्रमांक संख्या: ${formData.referenceNumber}`
                  : `Your grievance has been submitted successfully. Reference number: ${formData.referenceNumber}`
                }
              </p>
              <p className="text-green-700 text-sm">
                {locale === 'hi' 
                  ? 'हमारे सीधे से �ल्ज करने के लिए एक तीन-स्तर त्रीव संबंधन और उचित निवारण है।'
                  : 'We will review your grievance and get back to you within the specified time frame. Please save your reference number for future correspondence.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrievanceRedressalPage;
