'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface InquiryFormProps {
  locale: 'en' | 'hi';
  inquiryType?: 'general' | 'product' | 'service' | 'complaint' | 'branch' | 'digital';
  className?: string;
}

interface InquiryFormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  subject: string;
  message: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  preferredContact: 'email' | 'phone' | 'both';
  attachment?: File[];
}

const InquiryForm: React.FC<InquiryFormProps> = ({ 
  locale, 
  inquiryType = 'general', 
  className = '' 
}) => {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    mobileNumber: '',
    subject: '',
    message: '',
    category: '',
    priority: 'medium',
    preferredContact: 'email',
    attachment: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    trackPageView('Inquiry Form', locale === 'hi' ? 'पूछताछ फॉर्म' : 'Inquiry Form');
  }, [locale, inquiryType]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = locale === 'hi' ? 'पूरा नाम आवश्यक है' : 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = locale === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'hi' ? 'अमान्य ईमेल प्रारूप' : 'Invalid email format';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = locale === 'hi' ? 'मोबाइल नंबर आवश्यक है' : 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = locale === 'hi' ? 'अमान्य मोबाइल नंबर' : 'Invalid mobile number';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = locale === 'hi' ? 'विषय आवश्यक है' : 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = locale === 'hi' ? 'संदेश आवश्यक है' : 'Message is required';
    } else if (formData.message.length < 20) {
      newErrors.message = locale === 'hi' ? 'संदेश कम से कम 20 अक्षर होनी चाहिए' : 'Message must be at least 20 characters';
    }
    
    if (!formData.category) {
      newErrors.category = locale === 'hi' ? 'श्रेणी आवश्यक है' : 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof InquiryFormData, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('mobileNumber', formData.mobileNumber);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('priority', formData.priority);
      formDataToSend.append('preferredContact', formData.preferredContact);
      formDataToSend.append('inquiryType', inquiryType);
      formDataToSend.append('locale', locale);

      if (formData.attachment && formData.attachment.length > 0) {
        Array.from(formData.attachment).forEach((file, index) => {
          formDataToSend.append(`attachment${index}`, file);
        });
      }

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          mobileNumber: '',
          subject: '',
          message: '',
          category: '',
          priority: 'medium',
          preferredContact: 'email',
          attachment: []
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryOptions = () => {
    const options: Record<string, { en: string; hi: string }[]> = {
      general: [
        { en: 'Account Information', hi: 'खाता जानकारी' },
        { en: 'Banking Services', hi: 'बैंकिंग सेवाएं' },
        { en: 'Digital Banking', hi: 'डिजिटल बैंकिंग' },
        { en: 'Branch Services', hi: 'शाखा सेवाएं' },
        { en: 'Other', hi: 'अन्य' }
      ],
      product: [
        { en: 'Savings Account', hi: 'बचत खाता' },
        { en: 'Current Account', hi: '�ालू खाता' },
        { en: 'Personal Loan', hi: 'व्यक्ति लोन' },
        { en: 'Home Loan', hi: 'होम लोन' },
        { en: 'Car Loan', hi: 'कार लोन' },
        { en: 'Business Loan', hi: 'व्यवसाय लोन' }
      ],
      service: [
        { en: 'Net Banking', hi: 'नेट बैंकिंग' },
        { en: 'Mobile Banking', hi: 'मोबाइल बैंकिंग' },
        { en: 'ATM Services', hi: 'एटीएम सेवाएं' },
        { en: 'Card Services', hi: 'कार्ड सेवाएं' },
        { en: 'UPI Services', hi: 'यूपीआई सेवाएं' }
      ],
      complaint: [
        { en: 'Service Issue', hi: 'सेवा समस्या' },
        { en: 'Transaction Issue', hi: 'लेनदेन समस्या' },
        { en: 'Card Issue', hi: 'कार्ड समस्या' },
        { en: 'Online Banking Issue', hi: 'ऑनलाइन बैंकिंग समस्या' }
      ],
      branch: [
        { en: 'Branch Location', hi: 'शाखा स्थान' },
        { en: 'Branch Services', hi: 'शाखा सेवाएं' },
        { en: 'Branch Timing', hi: 'शाखा समय' },
        { en: 'Appointment Request', hi: 'अपॉइंटमेंट अनुरोध' }
      ],
      digital: [
        { en: 'Mobile App', hi: 'मोबाइल ऐप' },
        { en: 'Internet Banking', hi: 'इंटरनेट बैंकिंग' },
        { en: 'UPI Services', hi: 'यूपीआई सेवाएं' },
        { en: 'Digital Services', hi: 'डिजिटल सेवाएं' }
      ]
    };

    return options[inquiryType] || options.general;
  };

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'hi' ? 'पूछताछ फॉर्म' : 'Inquiry Form'}
        </h2>
        <p className="text-gray-600">
          {locale === 'hi' 
            ? 'हमसे संपर्क करने के लिए नीचे दिए गए फॉर्म को भरें'
            : 'Fill out the form below to contact us'
          }
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-green-900 font-semibold mb-2">
            {locale === 'hi' ? 'पूछताछ सफलताय सबमिट हुई!' : 'Inquiry Submitted Successfully!'}
          </h3>
          <p className="text-green-700">
            {locale === 'hi' 
              ? 'हम जल्द ही आपसे संपर्क करेंगे। आपको जल्द ही एक ईमेल प्राप्त होगी।'
              : 'We will contact you shortly. You will receive an email confirmation soon.'
            }
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-900 font-semibold mb-2">
            {locale === 'hi' ? 'सबमिशन में त्रुटि' : 'Submission Error'}
          </h3>
          <p className="text-red-700">
            {locale === 'hi' 
              ? 'आपकी पूछताछ सबमिट करने में कोई समस्या आई। कृपया बाद में प्रयास करें।'
              : 'There was an error submitting your inquiry. Please try again later.'
            }
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'पूरा नाम' : 'Full Name'} *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
              placeholder={locale === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'ईमेल' : 'Email'} *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              placeholder={locale === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'} *
            </label>
            <input
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
              className={`input-field ${errors.mobileNumber ? 'border-red-500' : ''}`}
              placeholder={locale === 'hi' ? '10 अंकीय मोबाइल नंबर' : '10-digit mobile number'}
              maxLength={10}
            />
            {errors.mobileNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'श्रेणी' : 'Category'} *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`input-field ${errors.category ? 'border-red-500' : ''}`}
            >
              <option value="">
                {locale === 'hi' ? 'श्रेणी चुनें' : 'Select category'}
              </option>
              {getCategoryOptions().map((option, index) => (
                <option key={index} value={option.en}>
                  {locale === 'hi' ? option.hi : option.en}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'विषय' : 'Subject'} *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={`input-field ${errors.subject ? 'border-red-500' : ''}`}
              placeholder={locale === 'hi' ? 'आपकी पूछताछ का विषय' : 'Subject of your inquiry'}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'प्राथमिकता' : 'Priority'}
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleInputChange('priority', e.target.value)}
              className="input-field"
            >
              <option value="low">{locale === 'hi' ? 'कम' : 'Low'}</option>
              <option value="medium">{locale === 'hi' ? 'मध्यम' : 'Medium'}</option>
              <option value="high">{locale === 'hi' ? 'उच्च' : 'High'}</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'संदेश' : 'Message'} *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`input-field ${errors.message ? 'border-red-500' : ''}`}
            rows={6}
            placeholder={locale === 'hi' ? 'अपना संदेश यहां विस्तृत करें...' : 'Type your message here...'}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Preferred Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'पसंदीद संपर्क' : 'Preferred Contact'}
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                {locale === 'hi' ? 'ईमेल' : 'Email'}
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                {locale === 'hi' ? 'फोन' : 'Phone'}
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="both"
                checked={formData.preferredContact === 'both'}
                onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                {locale === 'hi' ? 'दोनों' : 'Both'}
              </span>
            </label>
          </div>
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === 'hi' ? 'अटैचमेंट (वैकल्पिक)' : 'Attachments (Optional)'}
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => handleInputChange('attachment', Array.from(e.target.files || []))}
            className="input-field"
          />
          <p className="mt-1 text-xs text-gray-500">
            {locale === 'hi' 
              ? 'PDF, DOC, DOCX, JPG, JPEG, PNG फाइलें। अधिकतम 5MB प्रति फाइल, 10 फाइलें तक।'
              : 'PDF, DOC, DOCX, JPG, JPEG, PNG files. Max 5MB per file, up to 10 files.'
            }
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-2 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a2 2 0 012-2z" />
                </svg>
                {locale === 'hi' ? 'सबमिट हो रहा है...' : 'Submitting...'}
              </>
            ) : (
              locale === 'hi' ? 'पूछताछ सबमिट करें' : 'Submit Inquiry'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;
