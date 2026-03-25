'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView, trackFormSubmission } from '@/lib/analytics';
import ProductPageShell from '@/components/product/ProductPageShell';
import ProductTabs from '@/components/product/ProductTabs';
import ProductHero from '@/components/product/ProductHero';
import RelatedProducts from '@/components/product/RelatedProducts';
import KFSPanel from '@/components/product/KFSPanel';

interface DoubleDepositPageProps {
  locale: 'en' | 'hi';
}

const DoubleDepositPage: React.FC<DoubleDepositPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    depositAmount: '',
    tenure: '12',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    trackPageView('Double Deposit', locale === 'hi' ? 'डबल जमा' : 'Double Deposit');
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

    if (!formData.depositAmount.trim()) {
      newErrors.depositAmount = locale === 'hi' ? 'जमा राशि आवश्यक है' : 'Deposit amount is required';
    } else if (isNaN(Number(formData.depositAmount)) || Number(formData.depositAmount) <= 0) {
      newErrors.depositAmount = locale === 'hi' ? 'राशि राशि अधिक है' : 'Deposit amount must be a positive number';
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
      trackFormSubmission('double-deposit', JSON.stringify(formData));
      
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        depositAmount: '',
        tenure: '12',
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
    { label: 'Deposits', labelHi: 'जमा', href: `/${locale}/personal/deposits` },
    { label: 'Double Deposit', labelHi: 'डबल जमा', href: `/${locale}/personal/deposits/double-deposit` }
  ];

  const heroData = {
    title: locale === 'hi' ? 'डबल जमा योजना' : 'Double Deposit Scheme',
    subtitle: locale === 'hi' 
      ? 'हमारे डबल जमा योजनाओं के साथ अपना धन दोगुना और अधिक ब्याज अर्जित करें'
      : 'Maximize your savings with our attractive double deposit schemes',
    ctaText: locale === 'hi' ? 'अभी जमा करें' : 'Apply Now',
    ctaHref: `/${locale}/personal/deposits/double-deposit#apply`,
    image: '/images/double-deposit-hero.jpg',
    features: [
      {
        icon: '💰',
        title: locale === 'hi' ? 'दोगुना ब्याज' : 'Attractive Interest Rates',
        description: locale === 'hi' ? 'विशेष ब्याज दरें पर आकर्षिव ब्याज' : 'Earn higher interest rates than regular savings'
      },
      {
        icon: '🔒',
        title: locale === 'hi' ? 'सुरक्षित निवेश्ट' : 'Secure Investment',
        description: locale === 'hi' ? 'आपका धन पूर्ण सुरक्षा' : 'Your deposits are fully secured'
      },
      {
        icon: '📅',
        title: locale === 'hi' ? 'लचबीत अवधि' : 'Flexible Tenure',
        description: locale === 'hi' ? 'विभिन्न अवधि विकल्पों' : 'Choose from various tenure options'
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
              {locale === 'hi' ? 'डबल जमा योजना के लाभ' : 'Double Deposit Benefits'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'उच्च ब्याज दरें' : 'Higher interest rates'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'कम जोख' : 'Low minimum deposit'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'आसान निकासी पहुंच' : 'Easy online application'}
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
                    {locale === 'hi' ? 'आकर्षिव ब्याज दरें' : 'Competitive rates'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'विभिन्न अवधि' : 'Flexible tenure'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'ऑनलाइन बैंकिंग' : 'Online management'}
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
                    {locale === 'hi' ? 'डिजीसी जीसी बीमा' : 'DICGC insured'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? '24/7 सहायता' : '24/7 support'}
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
                  {locale === 'hi' ? 'न्यूनतम न्यूनतम' : 'Valid KYC documents'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'न्यूनतम न्यूनतम नंबर' : 'Valid mobile number'}
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
              {locale === 'hi' ? 'डबल जमा खोलने के लिए आवेदन करें' : 'Apply for Double Deposit'}
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
                        : 'We will contact you soon. Your application has been recorded.'
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
                  <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'जमा राशि' : 'Deposit Amount'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    id="depositAmount"
                    name="depositAmount"
                    value={formData.depositAmount}
                    onChange={handleInputChange}
                    placeholder={locale === 'hi' ? 'जमा राशि दर्ज करें' : 'Enter deposit amount'}
                    className={`input-field ${errors.depositAmount ? 'border-red-500' : ''}`}
                    aria-required="true"
                  />
                  {errors.depositAmount && (
                    <p className="text-red-500 text-sm mt-1">{errors.depositAmount}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'अवधि' : 'Tenure'}
                </label>
                <select
                  id="tenure"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="6">{locale === 'hi' ? '6 महीने' : '6 months'}</option>
                  <option value="12">{locale === 'hi' ? '12 महीने' : '12 months'}</option>
                  <option value="18">{locale === 'hi' ? '18 महीने' : '18 months'}</option>
                  <option value="24">{locale === 'hi' ? '24 महीने' : '24 months'}</option>
                  <option value="36">{locale === 'hi' ? '36 महीने' : '36 months'}</option>
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
      id: 'fixed-deposit',
      name: 'Fixed Deposit',
      nameHi: 'निर्धारित जमा',
      description: 'Earn guaranteed returns with fixed deposit',
      descriptionHi: 'निर्धारित जमा के साथ गारंटीड रिटर्न',
      image: '/images/fixed-deposit.jpg',
      interestRate: 7.5,
      ctaText: 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: `/${locale}/personal/deposits/fixed-deposit`,
      badge: {
        text: 'Guaranteed',
        textHi: 'गारंटीड',
        color: 'green'
      }
    },
    {
      id: 'recurring-deposit',
      name: 'Recurring Deposit',
      nameHi: 'आवर्त जमा',
      description: 'Build wealth with systematic savings',
      descriptionHi: 'व्यवस्थिक बचत बढ़ाएं के लिए',
      image: '/images/recurring-deposit.jpg',
      interestRate: 6.5,
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
      title={locale === 'hi' ? 'डबल जमा योजना' : 'Double Deposit Scheme'}
      titleHi={locale === 'hi' ? 'डबल जमा योजना' : 'Double Deposit Scheme'}
      description={locale === 'hi' 
        ? 'हमारे डबल जमा योजनाओं के साथ अपना धन दोगुना और अधिक ब्याज अर्जित करें'
        : 'Maximize your savings with our attractive double deposit schemes offering competitive interest rates and secure investment options.'
      }
      descriptionHi={locale === 'hi' 
        ? 'हमारे डबल जमा योजनाओं के साथ अपना धन दोगुना और अधिक ब्याज अर्जित करें'
        : 'हमारे डबल जमा योजनाओं के साथ अपना धन दोगुना और अधिक ब्याज अर्जित करें'
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
          ? 'डबल जमा खोलने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
          : 'Please read all important information before investing'
        }
        subtitleHi={locale === 'hi' 
          ? 'डबल जमा खोलने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
          : 'डबल जमा खोलने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
        }
        downloadUrl="/documents/double-deposit-kfs.pdf"
        items={[
          {
            label: 'Interest Rate',
            labelHi: 'ब्याज दर',
            value: '7.5% p.a.',
            description: locale === 'hi' ? 'वार्षिक ब्याज दर' : 'Annual interest rate'
          },
          {
            label: 'Minimum Deposit',
            labelHi: 'न्यूनतम राशि',
            value: '₹1,000',
            description: locale === 'hi' ? 'न्यूनतम राशि' : 'Minimum deposit amount'
          },
          {
            label: 'Maximum Deposit',
            labelHi: 'अधिकतम राशि',
            value: '₹10,00,000',
            description: locale === 'hi' ? 'अधिकतम राशि' : 'Maximum deposit amount'
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
        subtitle={locale === 'hi' ? 'अन्य बचत उत्पाद' : 'Explore other deposit options'}
        subtitleHi={locale === 'hi' ? 'अन्य बचत उत्पाद' : 'अन्य बचत उत्पाद'}
        products={relatedProducts}
        showInterestRates={true}
      />
    </ProductPageShell>
  );
};

export default DoubleDepositPage;
