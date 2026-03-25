'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView, trackFormSubmission } from '@/lib/analytics';

interface GrievanceFormProps {
  locale: 'en' | 'hi';
  onSubmit?: (data: GrievanceData) => void;
  className?: string;
}

interface GrievanceData {
  fullName: string;
  email: string;
  mobileNumber: string;
  accountNumber?: string;
  complaintType: string;
  complaintCategory: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  attachments?: File[];
  consent: boolean;
  referenceNumber?: string;
}

const GrievanceForm: React.FC<GrievanceFormProps> = ({ locale, onSubmit, className = '' }) => {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState<GrievanceData>({
    fullName: '',
    email: '',
    mobileNumber: '',
    accountNumber: '',
    complaintType: 'service',
    complaintCategory: 'banking-services',
    description: '',
    priority: 'medium',
    attachments: [],
    consent: false
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [referenceNumber, setReferenceNumber] = useState('');

  React.useEffect(() => {
    trackPageView('Grievance Form', locale === 'hi' ? 'शिकायत फार्म' : 'Grievance Form');
  }, [locale]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, attachments: files }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = locale === 'hi' ? 'नाम आवश्यक है' : 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = locale === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'hi' ? 'ईमेल अमान्य है' : 'Invalid email format';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = locale === 'hi' ? 'मोबाइल नंबर आवश्यक है' : 'Mobile number is required';
    } else if (!/^[6-9]\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = locale === 'hi' ? 'मोबाइल नंबर अमान्य है' : 'Invalid mobile number format';
    }

    if (!formData.complaintType) {
      newErrors.complaintType = locale === 'hi' ? 'शिकायत प्रकार आवश्यक है' : 'Complaint type is required';
    }

    if (!formData.complaintCategory) {
      newErrors.complaintCategory = locale === 'hi' ? 'शिकायत श्रेणी आवश्यक है' : 'Complaint category is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = locale === 'hi' ? 'विवरण आवश्यक है' : 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = locale === 'hi' ? 'विवरण कम से कम 50 अक्षर होना चाहिए' : 'Description must be at least 50 characters';
    } else if (formData.description.length > 1000) {
      newErrors.description = locale === 'hi' ? 'विवरण 1000 अक्षरों से अधिक नहीं हो सकता' : 'Description must not exceed 1000 characters';
    }

    if (!formData.consent) {
      newErrors.consent = locale === 'hi' ? 'सहमति आवश्यक है' : 'Consent is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `GRV${timestamp}${random}`;
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
      
      const refNumber = generateReferenceNumber();
      setReferenceNumber(refNumber);
      setSubmitted(true);
      
      // Track form submission
      trackFormSubmission('grievance-form', JSON.stringify(formData));
      
      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit({ ...formData, referenceNumber: refNumber });
      }
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        accountNumber: '',
        complaintType: 'service',
        complaintCategory: 'banking-services',
        description: '',
        priority: 'medium',
        attachments: [],
        consent: false
      });
      setErrors({});
    } catch (error) {
      console.error('Grievance form submission error:', error);
      setErrors({
        submit: locale === 'hi' ? 'जमा करने में त्रुटि हुई' : 'Error submitting form'
      });
    } finally {
      setLoading(false);
    }
  };

  const complaintTypes = [
    {
      value: 'service',
      label: locale === 'hi' ? 'सेवा' : 'Service',
      labelHi: 'सेवा'
    },
    {
      value: 'transaction',
      label: locale === 'hi' ? 'लेनदेन' : 'Transaction',
      labelHi: 'लेनदेन'
    },
    {
      value: 'account',
      label: locale === 'hi' ? 'खाता' : 'Account',
      labelHi: 'खाता'
    },
    {
      value: 'atm',
      label: locale === 'hi' ? 'एटीएम' : 'ATM',
      labelHi: 'एटीएम'
    },
    {
      value: 'digital',
      label: locale === 'hi' ? 'डिजिटल' : 'Digital Banking',
      labelHi: 'डिजिटल'
    },
    {
      value: 'staff',
      label: locale === 'hi' ? 'कर्मचारी' : 'Staff Behavior',
      labelHi: 'कर्मचारी'
    }
  ];

  const complaintCategories = [
    {
      value: 'banking-services',
      label: locale === 'hi' ? 'बैंकिंग सेवाएं' : 'Banking Services',
      labelHi: 'बैंकिंग सेवाएं'
    },
    {
      value: 'loan-services',
      label: locale === 'hi' ? 'ऋण सेवाएं' : 'Loan Services',
      labelHi: 'ऋण सेवाएं'
    },
    {
      value: 'deposit-services',
      label: locale === 'hi' ? 'जमा सेवाएं' : 'Deposit Services',
      labelHi: 'जमा सेवाएं'
    },
    {
      value: 'card-services',
      label: locale === 'hi' ? 'कार्ड सेवाएं' : 'Card Services',
      labelHi: 'कार्ड सेवाएं'
    },
    {
      value: 'online-banking',
      label: locale === 'hi' ? 'ऑनलाइन बैंकिंग' : 'Online Banking',
      labelHi: 'ऑनलाइन बैंकिंग'
    },
    {
      value: 'branch-services',
      label: locale === 'hi' ? 'शाखा सेवाएं' : 'Branch Services',
      labelHi: 'शाखा सेवाएं'
    }
  ];

  const priorityLevels = [
    {
      value: 'low',
      label: locale === 'hi' ? 'कम' : 'Low',
      labelHi: 'कम'
    },
    {
      value: 'medium',
      label: locale === 'hi' ? 'मध्यम' : 'Medium',
      labelHi: 'मध्यम'
    },
    {
      value: 'high',
      label: locale === 'hi' ? 'उच्च' : 'High',
      labelHi: 'उच्च'
    }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'hi' ? 'शिकायत दर्ज करें' : 'File a Grievance'}
        </h2>
        <p className="text-gray-600">
          {locale === 'hi' 
            ? 'हम आपकी शिकायतों को गंभीरता से देखने और हल करने के लिए प्रतिबद्ध हैं'
            : 'We are committed to addressing your concerns promptly and efficiently'
          }
        </p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-green-900 font-semibold mb-2">
                {locale === 'hi' ? 'शिकायत सफलताय!' : 'Grievance Submitted Successfully!'}
              </h3>
              <div className="text-green-700 space-y-1">
                <p>
                  {locale === 'hi' 
                    ? 'आपका शिकायत सफलताय दर्ज किया गया है।'
                    : 'Your grievance has been successfully submitted.'
                  }
                </p>
                <p className="font-medium">
                  {locale === 'hi' ? 'संदर्भ संख्या:' : 'Reference Number:'} {referenceNumber}
                </p>
                <p className="text-sm">
                  {locale === 'hi' 
                    ? 'कृपया इस संदर्भ संख्या को अपने पास सुरक्षित रखें। हम 24 घंटे के भीतर आपसे संपर्क करेंगे।'
                    : 'Please keep this reference number safe for future correspondence. We will contact you within 24 hours.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              disabled={loading}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'ईमेल' : 'Email'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={locale === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email address'}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder={locale === 'hi' ? '10-अंक मोबाइल नंबर' : '10-digit mobile number'}
              className={`input-field ${errors.mobileNumber ? 'border-red-500' : ''}`}
              aria-required="true"
              disabled={loading}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'खाता संख्या' : 'Account Number'}
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder={locale === 'hi' ? 'अपना खाता संख्या दर्ज करें' : 'Enter your account number'}
              className="input-field"
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="complaintType" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'शिकायत प्रकार' : 'Complaint Type'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="complaintType"
              name="complaintType"
              value={formData.complaintType}
              onChange={handleInputChange}
              className={`input-field ${errors.complaintType ? 'border-red-500' : ''}`}
              aria-required="true"
              disabled={loading}
            >
              <option value="">
                {locale === 'hi' ? 'शिकायत प्रकार चुनें' : 'Select complaint type'}
              </option>
              {complaintTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.complaintType && (
              <p className="text-red-500 text-sm mt-1">{errors.complaintType}</p>
            )}
          </div>

          <div>
            <label htmlFor="complaintCategory" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'शिकायत श्रेणी' : 'Complaint Category'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="complaintCategory"
              name="complaintCategory"
              value={formData.complaintCategory}
              onChange={handleInputChange}
              className={`input-field ${errors.complaintCategory ? 'border-red-500' : ''}`}
              aria-required="true"
              disabled={loading}
            >
              <option value="">
                {locale === 'hi' ? 'शिकायत श्रेणी चुनें' : 'Select complaint category'}
              </option>
              {complaintCategories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.complaintCategory && (
              <p className="text-red-500 text-sm mt-1">{errors.complaintCategory}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'प्राथमिकता' : 'Priority'}
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="input-field"
              disabled={loading}
            >
              {priorityLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'संलग्नक' : 'Attachments'}
            </label>
            <input
              type="file"
              id="attachments"
              name="attachments"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="input-field"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              {locale === 'hi' 
                ? 'PDF, DOC, DOCX, JPG, JPEG, PNG फाइलें (अधिकतम 5MB, अधिकतम 10 फाइलें)'
                : 'PDF, DOC, DOCX, JPG, JPEG, PNG files (Max 5MB per file, max 10 files)'
              }
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'विवरण' : 'Description'}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            placeholder={locale === 'hi' 
              ? 'कृपया अपनी शिकायत का विस्तृत विवरण दें (कम से कम 50 अक्षर)'
              : 'Please provide detailed description of your grievance (minimum 50 characters)'
            }
            className={`input-field ${errors.description ? 'border-red-500' : ''}`}
            aria-required="true"
            disabled={loading}
          />
          <div className="flex justify-between mt-1">
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
            <p className="text-sm text-gray-500">
              {formData.description.length}/1000 {locale === 'hi' ? 'अक्षर' : 'characters'}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {locale === 'hi' ? 'शिकायत प्रक्रिया' : 'Grievance Process'}
          </h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="font-medium text-gray-900 mr-2">1.</span>
              <span>
                {locale === 'hi' 
                  ? 'आपका शिकायत दर्ज करने के 24 घंटे के भीतर आपको एक संदर्भ संख्या मिलेगी'
                  : 'You will receive a reference number within 24 hours of submission'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-medium text-gray-900 mr-2">2.</span>
              <span>
                {locale === 'hi' 
                  ? 'हम 3-5 कार्य दिनों के भीतर आपकी शिकायत का समाधान करेंगे'
                  : 'We will resolve your grievance within 3-5 working days'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-medium text-gray-900 mr-2">3.</span>
              <span>
                {locale === 'hi' 
                  ? 'यदि आप संतुष्ट नहीं हैं, तो आप शिकायत अधिकारी को जा सकते हैं'
                  : 'If not satisfied, you can escalate to higher authorities'
                }
              </span>
            </li>
          </ol>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={(e) => handleInputChange(e)}
            className="mt-1 h-4 w-4 text-bank-blue-600 border-gray-300 rounded focus:ring-bank-blue-500"
            disabled={loading}
          />
          <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
            {locale === 'hi' 
              ? 'मैं इस बात में दी गई जानकारी की सत्यापना करता हूं और शिकायत दर्ज करने के लिए अधिकृत देता हूं।'
              : 'I consent to the information provided and authorize the submission of this grievance.'
            }
            <span className="text-red-500 ml-1">*</span>
          </label>
        </div>
        {errors.consent && (
          <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
        )}

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
                {locale === 'hi' ? 'शिकायत दर्ज करें' : 'Submit Grievance'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrievanceForm;
