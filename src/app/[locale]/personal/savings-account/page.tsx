'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView, trackFormSubmission } from '@/lib/analytics';
import ProductPageShell from '@/components/product/ProductPageShell';
import ProductTabs from '@/components/product/ProductTabs';
import ProductHero from '@/components/product/ProductHero';
import RelatedProducts from '@/components/product/RelatedProducts';
import KFSPanel from '@/components/product/KFSPanel';

interface SavingsAccountPageProps {
  locale: 'en' | 'hi';
}

const SavingsAccountPage: React.FC<SavingsAccountPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    accountType: 'savings',
    initialDeposit: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    trackPageView('Savings Account', locale === 'hi' ? 'बचत खाता' : 'Savings Account');
  }, [locale]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
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

    if (!formData.initialDeposit.trim()) {
      newErrors.initialDeposit = locale === 'hi' ? 'प्रारंभिक राशि आवश्यक है' : 'Initial deposit amount is required';
    } else if (isNaN(Number(formData.initialDeposit)) || Number(formData.initialDeposit) <= 0) {
      newErrors.initialDeposit = locale === 'hi' ? 'राशि राशि अधिक है' : 'Initial deposit must be a positive number';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
      trackFormSubmission('savings-account', JSON.stringify(formData));
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        accountType: 'savings',
        initialDeposit: '',
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
    { label: 'Savings Account', labelHi: 'बचत खाता', href: `/${locale}/personal/savings-account` }
  ];

  const heroData = {
    title: locale === 'hi' ? 'बचत खाता' : 'Savings Account',
    subtitle: locale === 'hi' 
      ? 'हमारे नागरिक सहकारी बैंक में अपना भविष्य जमा करें और अपने वित्त बढ़ाएं'
      : 'Grow your savings with our secure and flexible savings account options',
    ctaText: locale === 'hi' ? 'अभी जमा करें' : 'Open Account Now',
    ctaHref: `/${locale}/personal/savings-account#apply`,
    image: '/images/savings-account-hero.jpg',
    features: [
      {
        icon: '💰',
        title: locale === 'hi' ? 'आकर्षिव ब्याज' : 'Competitive Interest Rates',
        description: locale === 'hi' ? 'बाजार की दरें पर आकर्षिव ब्याज' : 'Earn competitive interest rates on your savings'
      },
      {
        icon: '🏦',
        title: locale === 'hi' ? 'शाखा बीमा' : 'Secure Banking',
        description: locale === 'hi' ? 'आपके धन की पूर्ण सुरक्षा' : 'Your deposits are fully secured and insured'
      },
      {
        icon: '📱',
        title: locale === 'hi' ? 'ऑनलाइन बैंकिंग' : 'Online Banking',
        description: locale === 'hi' ? 'कही भी जगह बैंकिंग का उपयोग' : 'Access your account anytime, anywhere'
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
              {locale === 'hi' ? 'बचत खाता के लाभ' : 'Savings Account Benefits'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'आकर्षिव ब्याज अर्जित' : 'Competitive interest rates'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'न्यूनतम न्यूनतम जमा' : 'Minimum balance requirements'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'आसान निकासी पहुंच' : 'Easy online access'}
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
                {locale === 'hi' ? 'प्रकार प्रकार' : 'Key Features'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'आकर्षिव ब्याज' : 'Competitive interest rates'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'शाखा बीमा' : 'Secure banking'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'ऑनलाइन बैंकिंग' : '24/7 online access'}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'खाता प्रकार' : 'Account Benefits'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'डिजीसी जीसी बीमा' : 'DICGC insured'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'न्यूनतम निकासी' : 'Mobile banking'}
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
                  {locale === 'hi' ? 'आयु: 18 वर्ष या उससे' : 'Age: 18 years and above'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'पहचान: वैध फोटो, पैन कार्ड, आधार कार्ड' : 'Valid ID proof required'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'न्यूनतम पता: भारतीय पता' : 'Valid address proof'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'न्यूनतम न्यूनतम नंबर: 10-अंक अंक' : 'Valid mobile number'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'documents',
      label: locale === 'hi' ? 'दस्तावेज' : 'Documents',
      labelHi: 'दस्तावेज',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">
              {locale === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'फोटो पहचान' : 'Passport size photograph'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'पैन कार्ड' : 'PAN card'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'आधार कार्ड' : 'Aadhaar card'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'भारतीय पता' : 'Address proof'}
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
              {locale === 'hi' ? 'बचत खाता खोलने के लिए आवेदन करें' : 'Apply for Savings Account'}
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
                  <label htmlFor="initialDeposit" className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'प्रारंभिक राशि' : 'Initial Deposit Amount'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    id="initialDeposit"
                    name="initialDeposit"
                    value={formData.initialDeposit}
                    onChange={handleInputChange}
                    placeholder={locale === 'hi' ? 'प्रारंभिक राशि राशि दर्ज करें' : 'Enter initial deposit amount'}
                    className={`input-field ${errors.initialDeposit ? 'border-red-500' : ''}`}
                    aria-required="true"
                  />
                  {errors.initialDeposit && (
                    <p className="text-red-500 text-sm mt-1">{errors.initialDeposit}</p>
                  )}
                </div>
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
      id: 'current-account',
      name: 'Current Account',
      nameHi: 'वर्तमान खाता',
      description: 'Manage your daily banking with our current account',
      descriptionHi: 'हमारे वर्तमान खाते के साथ अपना दैनिक बैंकिंग प्रबंध करें',
      image: '/images/current-account.jpg',
      interestRate: 3.5,
      ctaText: 'Open Account',
      ctaTextHi: 'खाता खोलें',
      ctaHref: `/${locale}/business/current-account`,
      badge: {
        text: 'Popular',
        textHi: 'लोकप्रिय',
        color: 'blue'
      }
    },
    {
      id: 'fixed-deposit',
      name: 'Fixed Deposit',
      nameHi: 'निर्धारित जमा',
      description: 'Earn higher interest rates with fixed deposit schemes',
      descriptionHi: 'निर्धारित जमा योजनाओं के साथ अधिक ब्याज अर्जित करें',
      image: '/images/fixed-deposit.jpg',
      interestRate: 6.5,
      ctaText: 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: `/${locale}/personal/deposits/fixed-deposit`,
      badge: {
        text: 'High Yield',
        textHi: 'उच्च ब्याज',
        color: 'green'
      }
    },
    {
      id: 'recurring-deposit',
      name: 'Recurring Deposit',
      nameHi: 'आवर्त जमा',
      description: 'Build savings with regular recurring deposits',
      descriptionHi: 'नियमित आवर्त जमा के साथ बचत बढ़ाएं',
      image: '/images/recurring-deposit.jpg',
      interestRate: 5.5,
      ctaText: 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: `/${locale}/personal/deposits/recurring-deposit`,
      badge: {
        text: 'Flexible',
        textHi: 'लचबील',
        color: 'yellow'
      }
    }
  ];

  return (
    <ProductPageShell
      locale={locale}
      title={locale === 'hi' ? 'बचत खाता' : 'Savings Account'}
      titleHi={locale === 'hi' ? 'बचत खाता' : 'Savings Account'}
      description={locale === 'hi' 
        ? 'हमारे नागरिक सहकारी बैंक में अपना भविष्य जमा करें और अपने वित्त बढ़ाएं'
        : 'Open a savings account with Mahanagar Nagrik Sahakari Bank and enjoy competitive interest rates, secure banking, and flexible features.'
      }
      descriptionHi={locale === 'hi' 
        ? 'हमारे नागरिक सहकारी बैंक में अपना भविष्य जमा करें और अपने वित्त बढ़ाएं'
        : 'हमारे नागरिक सहकारी बैंक में अपना भविष्य जमा करें और अपने वित्त बढ़ाएं'
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
          ? 'बचत खाता खोलने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
          : 'Please read all important information before opening your savings account'
        }
        subtitleHi={locale === 'hi' 
          ? 'बचत खाता खोलने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
          : 'बचत खाता खोलने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
        }
        downloadUrl="/documents/savings-account-kfs.pdf"
        items={[
          {
            label: 'Interest Rate',
            labelHi: 'ब्याज दर',
            value: '6.5% p.a.',
            description: locale === 'hi' ? 'वार्षिक ब्याज दर' : 'Annual interest rate'
          },
          {
            label: 'Minimum Balance',
            labelHi: 'न्यूनतम शेष',
            value: '₹500',
            description: locale === 'hi' ? 'न्यूनतम शेष' : 'Minimum balance to maintain'
          },
          {
            label: 'Service Charges',
            labelHi: 'सेवा शुल्क',
            value: 'Nil',
            description: locale === 'hi' ? 'कोई सेवा शुल्क नहीं' : 'No service charges'
          }
        ]}
      />

      <RelatedProducts
        locale={locale}
        title={locale === 'hi' ? 'संबंधित उत्पाद' : 'Related Products'}
        titleHi={locale === 'hi' ? 'संबंधित उत्पाद' : 'संबंधित उत्पाद'}
        subtitle={locale === 'hi' ? 'अन्य बैंकिंग उत्पाद' : 'Explore other banking products'}
        subtitleHi={locale === 'hi' ? 'अन्य बैंकिंग उत्पाद' : 'अन्य बैंकिंग उत्पाद'}
        products={relatedProducts}
        showInterestRates={true}
      />
    </ProductPageShell>
  );
};

export default SavingsAccountPage;
