'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface FeedbackPageProps {
  locale: 'en' | 'hi';
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  complaintType: string;
  subject: string;
  message: string;
  attachment: File | null;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  useEffect(() => {
    trackPageView('Feedback/Complaint', locale === 'hi' ? 'प्रतिक्रिया/शिकायत' : 'Feedback/Complaint');
  }, [locale]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    accountNumber: '',
    complaintType: 'general',
    subject: '',
    message: '',
    attachment: null
  });

  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const complaintTypes = [
    { value: 'general', label: locale === 'hi' ? 'सामान्य प्रतिक्रिया' : 'General Feedback' },
    { value: 'service', label: locale === 'hi' ? 'सेवा संबंधी शिकायत' : 'Service Related Complaint' },
    { value: 'product', label: locale === 'hi' ? 'उत्पाद संबंधी शिकायत' : 'Product Related Complaint' },
    { value: 'staff', label: locale === 'hi' ? 'कर्मचारी संबंधी शिकायत' : 'Staff Related Complaint' },
    { value: 'technical', label: locale === 'hi' ? 'तकनीकी समस्या' : 'Technical Issue' },
    { value: 'fraud', label: locale === 'hi' ? 'धोखाधड़ी की शिकायत' : 'Fraud Complaint' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        attachment: e.target.files![0]
      }));
    }
  };

  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `MNS${timestamp}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const refNum = generateReferenceNumber();
      setReferenceNumber(refNum);
      setShowSuccess(true);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        accountNumber: '',
        complaintType: 'general',
        subject: '',
        message: '',
        attachment: null
      });
    }, 2000);
  };

  const downloadReceipt = () => {
    const content = locale === 'hi' 
      ? `महानगर नागरिक सहकारी बैंक\nशिकायत/प्रतिक्रिया पावती\n\nसंदर्भ संख्या: ${referenceNumber}\nदिनांक: ${new Date().toLocaleDateString('hi-IN')}\nनाम: ${formData.name}\nईमेल: ${formData.email}\nफोन: ${formData.phone}\nखाता संख्या: ${formData.accountNumber}\nशिकायत प्रकार: ${complaintTypes.find(t => t.value === formData.complaintType)?.label}\nविषय: ${formData.subject}\nसंदेश: ${formData.message}\n\nआपकी शिकायत दर्ज कर ली गई है। हम 7 कार्यदिवसों के भीतर आपको जवाब देंगे।\n\nधन्यवाद,\nमहानगर नागरिक सहकारी बैंक`
      : `Mahanagar Nagrik Sahakari Bank\nComplaint/Feedback Receipt\n\nReference Number: ${referenceNumber}\nDate: ${new Date().toLocaleDateString('en-US')}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAccount Number: ${formData.accountNumber}\nComplaint Type: ${complaintTypes.find(t => t.value === formData.complaintType)?.label}\nSubject: ${formData.subject}\nMessage: ${formData.message}\n\nYour complaint has been registered. We will respond within 7 working days.\n\nThank you,\nMahanagar Nagrik Sahakari Bank`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `complaint-receipt-${referenceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'hi' ? 'शिकायत सफलतापूर्वक दर्ज!' : 'Complaint Registered Successfully!'}
            </h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-lg font-semibold text-blue-800 mb-2">
                {locale === 'hi' ? 'संदर्भ संख्या' : 'Reference Number'}
              </p>
              <p className="text-2xl font-bold text-blue-900">{referenceNumber}</p>
            </div>
            <p className="text-gray-600 mb-6">
              {locale === 'hi' 
                ? 'आपकी शिकायत दर्ज कर ली गई है। हम 7 कार्यदिवसों के भीतर आपको जवाब देंगे।'
                : 'Your complaint has been registered. We will respond within 7 working days.'
              }
            </p>
            <div className="space-y-4">
              <button
                onClick={downloadReceipt}
                className="bg-bank-blue-600 text-white px-6 py-3 rounded hover:bg-bank-blue-700 transition-colors"
              >
                {locale === 'hi' ? 'पावती डाउनलोड करें' : 'Download Receipt'}
              </button>
              <br />
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setReferenceNumber('');
                }}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300 transition-colors"
              >
                {locale === 'hi' ? 'नई शिकायत दर्ज करें' : 'Register New Complaint'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'प्रतिक्रिया/शिकायत' : 'Feedback/Complaint'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'हमें अपनी प्रतिक्रिया या शिकायत साझा करें। हम आपकी समस्याओं का शीघ्र समाधान करेंगे।'
              : 'Share your feedback or complaint with us. We will resolve your issues promptly.'
            }
          </p>
        </div>

        {/* Grievance Redressal Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mb-4">
            {locale === 'hi' ? 'शिकायत निवारण सूचना' : 'Grievance Redressal Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700">
            <div>
              <h3 className="font-semibold mb-2">
                {locale === 'hi' ? 'शिकायत अधिकारी' : 'Grievance Officer'}
              </h3>
              <p className="text-sm">
                {locale === 'hi' ? 'श्री राजेश कुमार' : 'Mr. Rajesh Kumar'}
                <br />
                {locale === 'hi' ? 'फोन: 0755-1234567' : 'Phone: 0755-1234567'}
                <br />
                {locale === 'hi' ? 'ईमेल: grievance@mnsbankbhopal.com' : 'Email: grievance@mnsbankbhopal.com'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {locale === 'hi' ? 'प्रतिक्रिया समय' : 'Response Time'}
              </h3>
              <p className="text-sm">
                {locale === 'hi' 
                  ? 'सामान्य शिकायतों के लिए: 7 कार्यदिवस'
                  : 'For general complaints: 7 working days'
                }
                <br />
                {locale === 'hi' 
                  ? 'गंभीर शिकायतों के लिए: 3 कार्यदिवस'
                  : 'For serious complaints: 3 working days'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Complaint Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'नाम *' : 'Name *'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
                  placeholder={locale === 'hi' ? 'आपका पूरा नाम' : 'Your full name'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'ईमेल *' : 'Email *'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
                  placeholder={locale === 'hi' ? 'आपका ईमेल पता' : 'Your email address'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'फोन नंबर *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
                  placeholder={locale === 'hi' ? 'आपका फोन नंबर' : 'Your phone number'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'hi' ? 'खाता संख्या' : 'Account Number'}
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
                  placeholder={locale === 'hi' ? 'आपका खाता संख्या (वैकल्पिक)' : 'Your account number (optional)'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'शिकायत प्रकार *' : 'Complaint Type *'}
              </label>
              <select
                name="complaintType"
                value={formData.complaintType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
              >
                {complaintTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'विषय *' : 'Subject *'}
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
                placeholder={locale === 'hi' ? 'शिकायत का विषय' : 'Subject of your complaint'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'संदेश *' : 'Message *'}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
                placeholder={locale === 'hi' ? 'अपनी शिकायत विस्तार से लिखें' : 'Describe your complaint in detail'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === 'hi' ? 'संलग्नक (वैकल्पिक)' : 'Attachment (Optional)'}
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                {locale === 'hi' 
                  ? 'PDF, DOC, DOCX, JPG, JPEG, PNG फाइलें (अधिकतम 5MB)'
                  : 'PDF, DOC, DOCX, JPG, JPEG, PNG files (Max 5MB)'
                }
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                {locale === 'hi' ? 'महत्वपूर्ण निर्देश' : 'Important Instructions'}
              </h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• {locale === 'hi' ? 'सभी चिह्नित फील्ड (*) भरें' : 'Fill all marked fields (*)'}</li>
                <li>• {locale === 'hi' ? 'शिकायत का विवरण स्पष्ट रूप से लिखें' : 'Write complaint details clearly'}</li>
                <li>• {locale === 'hi' ? 'संदर्भ संख्या सुरक्षित रखें' : 'Keep reference number safe'}</li>
                <li>• {locale === 'hi' ? 'गलत जानकारी देने पर कार्रवाई होगी' : 'Action will be taken for false information'}</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-bank-blue-600 text-white px-8 py-3 rounded-lg hover:bg-bank-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? (locale === 'hi' ? 'जमा हो रहा है...' : 'Submitting...')
                  : (locale === 'hi' ? 'शिकायत दर्ज करें' : 'Register Complaint')
                }
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'अन्य संपर्क विधियां' : 'Other Contact Methods'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'हेल्पलाइन' : 'Helpline'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? '1800-123-4567' : '1800-123-4567'}
                <br />
                {locale === 'hi' ? 'सोमवार - शुक्रवार: 9:30 AM - 6:00 PM' : 'Monday - Friday: 9:30 AM - 6:00 PM'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✉️</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'ईमेल' : 'Email'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? 'support@mnsbankbhopal.com' : 'support@mnsbankbhopal.com'}
                <br />
                {locale === 'hi' ? '24-48 घंटे में जवाब' : 'Response within 24-48 hours'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'शाखा में जाएं' : 'Visit Branch'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? 'निकटतम शाखा में जाएं' : 'Visit nearest branch'}
                <br />
                {locale === 'hi' ? 'तत्काल सहायता उपलब्ध' : 'Immediate assistance available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
