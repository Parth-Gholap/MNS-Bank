'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView, trackFormSubmission } from '@/lib/analytics';
import ProductPageShell from '@/components/product/ProductPageShell';
import ProductTabs from '@/components/product/ProductTabs';
import ProductHero from '@/components/product/ProductHero';
import RelatedProducts from '@/components/product/RelatedProducts';
import KFSPanel from '@/components/product/KFSPanel';

interface LoanAgainstSecuritiesPageProps {
  locale: 'en' | 'hi';
}

const LoanAgainstSecuritiesPage: React.FC<LoanAgainstSecuritiesPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    securityType: 'fixed-deposit',
    securityAmount: '',
    loanAmount: '',
    tenure: '24',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    trackPageView('Loan Against Securities', locale === 'hi' ? 'प्रतिभूत ऋण' : 'Loan Against Securities');
  }, [locale]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = locale === 'hi' ? 'नाम आवश्यक है' : 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = locale === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'hi' ? 'ईमेल अधिक है' : 'Invalid email format';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = locale === 'hi' ? 'मोबाइल नंबर आवश्यक है' : 'Mobile number is required';
    } else if (!/^[6-9]\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = locale === 'hi' ? 'मोबाइल नंबर अधिक है' : 'Invalid mobile number format';
    }

    if (!formData.securityType.trim()) {
      newErrors.securityType = locale === 'hi' ? 'प्रतिभूत प्रकार आवश्यक है' : 'Security type is required';
    }

    if (!formData.securityAmount.trim()) {
      newErrors.securityAmount = locale === 'hi' ? 'प्रतिभूत राशि आवश्यक है' : 'Security amount is required';
    } else if (isNaN(Number(formData.securityAmount)) || Number(formData.securityAmount) <= 0) {
      newErrors.securityAmount = locale === 'hi' ? 'राशि राशि अधिक है' : 'Security amount must be a positive number';
    }

    if (!formData.loanAmount.trim()) {
      newErrors.loanAmount = locale === 'hi' ? 'ऋण राशि आवश्यक है' : 'Loan amount is required';
    } else if (isNaN(Number(formData.loanAmount)) || Number(formData.loanAmount) <= 0) {
      newErrors.loanAmount = locale === 'hi' ? 'राशि राशि अधिक है' : 'Loan amount must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitted(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
      trackFormSubmission('loan-against-securities', JSON.stringify(formData));
      
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        securityType: 'fixed-deposit',
        securityAmount: '',
        loanAmount: '',
        tenure: '24',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        submit: locale === 'hi' ? 'जमा करने में त्रुटि हुई' : 'Error submitting form'
      });
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { label: 'Home', labelHi: 'होम', href: `/${locale}` },
    { label: 'Personal Banking', labelHi: 'व्यक्तिगत बैंकिंग', href: `/${locale}/personal` },
    { label: 'Loans', labelHi: 'ऋण', href: `/${locale}/personal/loans` },
    { label: 'Loan Against Securities', labelHi: 'प्रतिभूत ऋण', href: `/${locale}/personal/loans/loan-against-securities` }
  ];

  const heroData = {
    title: locale === 'hi' ? 'प्रतिभूत ऋण' : 'Loan Against Securities',
    subtitle: locale === 'hi' 
      ? 'अपने प्रतिभूतों के खिलाफ ऋण प्राप्त करें'
      : 'Get loans against your securities with attractive rates',
    ctaText: locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now',
    ctaHref: `/${locale}/personal/loans/loan-against-securities#apply`,
    image: '/images/loan-against-securities-hero.jpg',
    features: [
      {
        icon: '🏦',
        title: locale === 'hi' ? 'उच्च ऋण-टू-वैल्यू' : 'High Loan-to-Value',
        description: locale === 'hi' ? 'अपने प्रतिभूतों के खिलाफ उच्च ऋण प्राप्त करें' : 'Get higher loans against your securities'
      },
      {
        icon: '⚡',
        title: locale === 'hi' ? 'तेज प्रोसेसिंग' : 'Quick Processing',
        description: locale === 'hi' ? 'तेज ऋण स्वीकृति' : 'Fast loan approval and disbursal'
      },
      {
        icon: '🔒',
        title: locale === 'hi' ? 'सुरक्षित प्रतिभूत' : 'Secure Processing',
        description: locale === 'hi' ? 'आपके प्रतिभूतों की पूर्ण सुरक्षा' : 'Your securities remain safely with us'
      }
    ]
  };

  const tabs = [
    {
      id: 'overview',
      label: locale === 'hi' ? 'अवलोक' : 'Overview',
      labelHi: 'अवलोक',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              {locale === 'hi' ? 'प्रतिभूत ऋण के लाभ' : 'Loan Against Securities Benefits'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'उच्च ऋण-टू-वैल्यू' : 'High loan-to-value ratio'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'कम ब्याज दरें' : 'Competitive interest rates'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'लचबील अवधि' : 'Flexible repayment options'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'features',
      label: locale === 'hi' ? 'विशेष' : 'Features',
      labelHi: 'विशेष',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'प्रमुख विशेष' : 'Key Features'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'विभिन्न प्रतिभूत' : 'Multiple security options'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'लचबील अवधि' : 'Flexible tenure'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'सुरक्षित प्रतिभूत' : 'Secure collateral management'}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'सुरक्षा विशेष' : 'Security Features'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'सुरक्षित संग्रहण' : 'Secure storage of securities'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'बीमा कवर' : 'Insurance coverage'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'eligibility',
      label: locale === 'hi' ? 'पात्रता' : 'Eligibility',
      labelHi: 'पात्रता',
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">
              {locale === 'hi' ? 'पात्रता मानदंड' : 'Eligibility Criteria'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'आयु: 21 वर्ष या उससे' : 'Age: 21 years and above'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'स्वामित प्रतिभूत' : 'Self-owned securities required'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'वैध केवाईसी दस्तावेज' : 'Valid KYC documents'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'वैध मोबाइल नंबर' : 'Valid mobile number'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'apply',
      label: locale === 'hi' ? 'आवेदन करें' : 'Apply',
      labelHi: 'आवेदन करें',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {locale === 'hi' ? 'प्रतिभूत ऋण के लिए आवेदन करें' : 'Apply for Loan Against Securities'}
            </h3>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <div>
                    <h4 className="text-green-900 font-semibold">
                      {locale === 'hi' ? 'आवेदन सफलतय!' : 'Application Submitted Successfully!'}
                    </h4>
                    <p className="text-green-700">
                      {locale === 'hi' 
                        ? 'हम जल्द ही आपसे संपर्क करेंगे। आपका आवेदन संख्या जा रहा है।'
                        : 'We will contact you soon. Your application reference has been recorded.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder={locale === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
                    className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
                    aria-required="true"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
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
                    placeholder={locale === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email address'}
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder={locale === 'hi' ? '10-अंक अंक मोबाइल नंबर' : '10-digit mobile number'}
                    className={`input-field ${errors.mobileNumber ? 'border-red-500' : ''}`}
                    aria-required="true"
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="securityType" className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'प्रतिभूत प्रकार' : 'Security Type'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    id="securityType"
                    name="securityType"
                    value={formData.securityType}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="fixed-deposit">{locale === 'hi' ? 'निर्धारित जमा' : 'Fixed Deposit'}</option>
                    <option value="time-deposit">{locale === 'hi' ? 'समय जमा' : 'Time Deposit'}</option>
                    <option value="recurring-deposit">{locale === 'hi' ? 'आवर्त जमा' : 'Recurring Deposit'}</option>
                    <option value="savings-account">{locale === 'hi' ? 'बचत खाता' : 'Savings Account'}</option>
                    <option value="property">{locale === 'hi' ? 'संपत्ति' : 'Property'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="securityAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'प्रतिभूत राशि' : 'Security Amount'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    id="securityAmount"
                    name="securityAmount"
                    value={formData.securityAmount}
                    onChange={handleInputChange}
                    placeholder={locale === 'hi' ? 'प्रतिभूत राशि दर्ज करें' : 'Enter security amount'}
                    className={`input-field ${errors.securityAmount ? 'border-red-500' : ''}`}
                    aria-required="true"
                  />
                  {errors.securityAmount && (
                    <p className="text-red-500 text-sm mt-1">{errors.securityAmount}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'ऋण राशि' : 'Loan Amount'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    placeholder={locale === 'hi' ? 'ऋण राशि दर्ज करें' : 'Enter loan amount'}
                    className={`input-field ${errors.loanAmount ? 'border-red-500' : ''}`}
                    aria-required="true"
                  />
                  {errors.loanAmount && (
                    <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'ऋण अवधि' : 'Loan Tenure'}
                </label>
                <select
                  id="tenure"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="12">{locale === 'hi' ? '12 महीने' : '12 months'}</option>
                  <option value="24">{locale === 'hi' ? '24 महीने' : '24 months'}</option>
                  <option value="36">{locale === 'hi' ? '36 महीने' : '36 months'}</option>
                  <option value="48">{locale === 'hi' ? '48 महीने' : '48 months'}</option>
                  <option value="60">{locale === 'hi' ? '60 महीने' : '60 months'}</option>
                </select>
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
                  placeholder={locale === 'hi' ? 'कोई भी संदेश' : 'Any additional message'}
                  className={`input-field ${errors.message ? 'border-red-500' : ''}`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
              </div>

              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{errors.submit}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-8 py-3 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-2 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a2 2 0 012-2z" />
                      </svg>
                      {locale === 'hi' ? 'जमा कर रहा है...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                      </svg>
                      {locale === 'hi' ? 'आवेदन जमा करें' : 'Submit Application'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  ];

  const relatedProducts = [
    {
      id: 'personal-loan',
      name: 'Personal Loan',
      nameHi: 'व्यक्तिगत ऋण',
      description: 'Get personal loans for your needs',
      descriptionHi: 'अपनी आवश्यकताओं के लिए व्यक्तिगत ऋण प्राप्त करें',
      image: '/images/personal-loan.jpg',
      interestRate: 11.5,
      ctaText: 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: `/${locale}/personal/loans/personal-loan`,
      badge: {
        text: 'Popular',
        textHi: 'लोकप्रिय',
        color: 'blue'
      }
    },
    {
      id: 'business-loan',
      name: 'Business Loan',
      nameHi: 'व्यापार ऋण',
      description: 'Grow your business with our loan options',
      descriptionHi: 'हमारे ऋण विकल्पों के साथ अपना व्यापार बढ़ाएं',
      image: '/images/business-loan.jpg',
      interestRate: 10.5,
      ctaText: 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: `/${locale}/business/loans/business-loan`,
      badge: {
        text: 'High Amount',
        textHi: 'उच्च राशि',
        color: 'green'
      }
    }
  ];

  return (
    <ProductPageShell
      locale={locale}
      title={locale === 'hi' ? 'प्रतिभूत ऋण' : 'Loan Against Securities'}
      titleHi={locale === 'hi' ? 'प्रतिभूत ऋण' : 'Loan Against Securities'}
      description={locale === 'hi' 
        ? 'अपने प्रतिभूतों के खिलाफ ऋण प्राप्त करें'
        : 'Get loans against your securities with attractive rates and flexible repayment options.'
      }
      descriptionHi={locale === 'hi' 
        ? 'अपने प्रतिभूतों के खिलाफ ऋण प्राप्त करें'
        : 'अपने प्रतिभूतों के खिलाफ ऋण प्राप्त करें'
      }
      breadcrumbs={breadcrumbs}
      heroData={heroData}
    >
      <ProductTabs
        locale={locale}
        tabs={tabs}
        defaultTab="overview"
      />

      <KFSPanel
        locale={locale}
        title={locale === 'hi' ? 'मुख्य तथ्य विवरण' : 'Key Facts Statement'}
        titleHi={locale === 'hi' ? 'मुख्य तथ्य विवरण' : 'मुख्य तथ्य विवरण'}
        subtitle={locale === 'hi' 
          ? 'प्रतिभूत ऋण लेने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
          : 'Please read all important information before applying for your loan'
        }
        subtitleHi={locale === 'hi' 
          ? 'प्रतिभूत ऋण लेने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
          : 'प्रतिभूत ऋण लेने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
        }
        downloadUrl="/documents/loan-against-securities-kfs.pdf"
        items={[
          {
            label: 'Interest Rate',
            labelHi: 'ब्याज दर',
            value: '9.5% p.a.',
            description: locale === 'hi' ? 'वार्षिक ब्याज दर' : 'Annual interest rate'
          },
          {
            label: 'Loan-to-Value',
            labelHi: 'ऋण-टू-वैल्यू',
            value: 'Up to 75%',
            description: locale === 'hi' ? 'ऋण-टू-वैल्यू अनुपात' : 'Maximum loan-to-value ratio'
          },
          {
            label: 'Processing Fee',
            labelHi: 'प्रोसेसिंग शुल्क',
            value: '0.5% of loan amount',
            description: locale === 'hi' ? 'प्रोसेसिंग शुल्क' : 'Low processing fee'
          }
        ]}
      />

      <RelatedProducts
        locale={locale}
        title={locale === 'hi' ? 'संबंधित उत्पाद' : 'Related Products'}
        titleHi={locale === 'hi' ? 'संबंधित उत्पाद' : 'संबंधित उत्पाद'}
        subtitle={locale === 'hi' ? 'अन्य ऋण विकल्प' : 'Explore other loan options'}
        subtitleHi={locale === 'hi' ? 'अन्य ऋण विकल्प' : 'अन्य ऋण विकल्प'}
        products={relatedProducts}
        showInterestRates={true}
      />
    </ProductPageShell>
  );
};

export default LoanAgainstSecuritiesPage;
