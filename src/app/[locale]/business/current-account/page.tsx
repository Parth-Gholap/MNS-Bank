'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView, trackFormSubmission } from '@/lib/analytics';
import ProductPageShell from '@/components/product/ProductPageShell';
import ProductTabs from '@/components/product/ProductTabs';
import ProductHero from '@/components/product/ProductHero';
import RelatedProducts from '@/components/product/RelatedProducts';
import KFSPanel from '@/components/product/KFSPanel';

interface CurrentAccountPageProps {
  locale: 'en' | 'hi';
}

const CurrentAccountPage: React.FC<CurrentAccountPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    businessName: '',
    businessType: 'proprietorship',
    annualTurnover: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    trackPageView('Current Account', locale === 'hi' ? 'वर्तमान खाता' : 'Current Account');
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

    if (!formData.businessName.trim()) {
      newErrors.businessName = locale === 'hi' ? 'व्यापार नाम आवश्यक है' : 'Business name is required';
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = locale === 'hi' ? 'व्यापार प्रकार आवश्यक है' : 'Business type is required';
    }

    if (!formData.annualTurnover.trim()) {
      newErrors.annualTurnover = locale === 'hi' ? 'वार्षिक कारोबर आवश्यक है' : 'Annual turnover is required';
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
      trackFormSubmission('current-account', JSON.stringify(formData));
      
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        businessName: '',
        businessType: 'proprietorship',
        annualTurnover: '',
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
    { label: 'Business Banking', labelHi: 'व्यापार बैंकिंग', href: `/${locale}/business` },
    { label: 'Current Account', labelHi: 'वर्तमान खाता', href: `/${locale}/business/current-account` }
  ];

  const heroData = {
    title: locale === 'hi' ? 'वर्तमान खाता' : 'Current Account',
    subtitle: locale === 'hi' 
      ? 'हमारे व्यापार-अनुकूल वर्तमान खातों के साथ अपना व्यापार बढ़ाएं'
      : 'Manage your daily business operations with our feature-rich current account',
    ctaText: locale === 'hi' ? 'अभी खाता खोलें' : 'Open Account Now',
    ctaHref: `/${locale}/business/current-account#apply`,
    image: '/images/current-account-hero.jpg',
    features: [
      {
        icon: '💼',
        title: locale === 'hi' ? 'शून्य बैंकिंग' : 'Online Banking',
        description: locale === 'hi' ? '24/7 ऑनलाइन बैंकिंग सुविधाएं' : '24/7 online banking services'
      },
      {
        icon: '📱',
        title: locale === 'hi' ? 'मोबाइल बैंकिंग' : 'Mobile Banking',
        description: locale === 'hi' ? 'चलते बैंकिंग ऐप' : 'Banking on the go with mobile app'
      },
      {
        icon: '🏦',
        title: locale === 'hi' ? 'ओवरड्राफ्ट' : 'Overdraft Facility',
        description: locale === 'hi' ? 'नकदी प्रोटेक्शन सुविधा' : 'Overdraft protection facility'
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
              {locale === 'hi' ? 'वर्तमान खाता के लाभ' : 'Current Account Benefits'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'शून्य लेनदेन' : 'Zero balance requirement'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'फ्री लेनदेन' : 'Free quarterly statements'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'ओवरड्राफ्ट' : 'Overdraft facility'}
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
                    {locale === 'hi' ? 'ऑनलाइन बैंकिंग' : 'Online banking'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'मोबाइल बैंकिंग' : 'Mobile banking'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'बहु-चानल भुगतान' : 'Multi-city banking'}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'hi' ? 'व्यापार विशेष' : 'Business Features'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'बहु-चानल लेनदेन' : 'Bulk payment processing'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'वेतावेधन चेक' : 'Payroll services'}
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-bank-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === 'hi' ? 'ई-चेक' : 'E-cheque facility'}
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
                  {locale === 'hi' ? 'पंजीकृत व्यापार' : 'Registered business entity'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                </svg>
                <span className="text-gray-700">
                  {locale === 'hi' ? 'न्यूनतम वार्षिक कारोबार' : 'Minimum annual turnover: ₹10,00,000'}
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
                  {locale === 'hi' ? 'वैध व्यवसाय पता' : 'Valid business address'}
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
              {locale === 'hi' ? 'वर्तमान खाता खोलने के लिए आवेदन करें' : 'Apply for Current Account'}
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
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'व्यापार नाम' : 'Business Name'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder={locale === 'hi' ? 'व्यापार नाम दर्ज करें' : 'Enter your business name'}
                    className={`input-field ${errors.businessName ? 'border-red-500' : ''}`}
                    aria-required="true"
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'व्यापार प्रकार' : 'Business Type'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="proprietorship">{locale === 'hi' ? 'स्वामित्व' : 'Proprietorship'}</option>
                    <option value="partnership">{locale === 'hi' ? 'साझीदारी' : 'Partnership'}</option>
                    <option value="llp">{locale === 'hi' ? 'एलएलपी' : 'LLP'}</option>
                    <option value="private-limited">{locale === 'hi' ? 'प्राइवेट लिमिटेड' : 'Private Limited'}</option>
                    <option value="public-limited">{locale === 'hi' ? 'पब्लिक लिमिटेड' : 'Public Limited'}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="annualTurnover" className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'वार्षिक कारोबर' : 'Annual Turnover'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    id="annualTurnover"
                    name="annualTurnover"
                    value={formData.annualTurnover}
                    onChange={handleInputChange}
                    placeholder={locale === 'hi' ? 'वार्षिक कारोबर दर्ज करें' : 'Enter annual turnover'}
                    className={`input-field ${errors.annualTurnover ? 'border-red-500' : ''}`}
                    aria-required="true"
                  />
                  {errors.annualTurnover && (
                    <p className="text-red-500 text-sm mt-1">{errors.annualTurnover}</p>
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
      id: 'business-deposit',
      name: 'Business Deposit',
      nameHi: 'व्यापार जमा',
      description: 'Earn returns on your business deposits',
      descriptionHi: 'अपने व्यापार जमाओं पर ब्याज अर्जित करें',
      image: '/images/business-deposit.jpg',
      interestRate: 5.5,
      ctaText: 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: `/${locale}/business/deposits/business-deposit`,
      badge: {
        text: 'Business',
        textHi: 'व्यापार',
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
      title={locale === 'hi' ? 'वर्तमान खाता' : 'Current Account'}
      titleHi={locale === 'hi' ? 'वर्तमान खाता' : 'Current Account'}
      description={locale === 'hi' 
        ? 'हमारे व्यापार-अनुकूल वर्तमान खातों के साथ अपना व्यापार बढ़ाएं'
        : 'Manage your daily business operations with our feature-rich current account offering online banking, mobile banking, and overdraft facilities.'
      }
      descriptionHi={locale === 'hi' 
        ? 'हमारे व्यापार-अनुकूल वर्तमान खातों के साथ अपना व्यापार बढ़ाएं'
        : 'हमारे व्यापार-अनुकूल वर्तमान खातों के साथ अपना व्यापार बढ़ाएं'
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
          ? 'वर्तमान खाता खोलने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
          : 'Please read all important information before opening your current account'
        }
        subtitleHi={locale === 'hi' 
          ? 'वर्तमान खाता खोलने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
          : 'वर्तमान खाता खोलने से पहले सभी महत्वपूर्ण जानकारी पढ़ें'
        }
        downloadUrl="/documents/current-account-kfs.pdf"
        items={[
          {
            label: 'Interest Rate',
            labelHi: 'ब्याज दर',
            value: '3.5% p.a.',
            description: locale === 'hi' ? 'वार्षिक ब्याज दर' : 'Annual interest rate'
          },
          {
            label: 'Minimum Balance',
            labelHi: 'न्यूनतम शेष',
            value: '₹0',
            description: locale === 'hi' ? 'न्यूनतम शेष' : 'Minimum balance requirement'
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
        subtitle={locale === 'hi' ? 'अन्य व्यापार उत्पाद' : 'Explore other business products'}
        subtitleHi={locale === 'hi' ? 'अन्य व्यापार उत्पाद' : 'अन्य व्यापार उत्पाद'}
        products={relatedProducts}
        showInterestRates={true}
      />
    </ProductPageShell>
  );
};

export default CurrentAccountPage;
