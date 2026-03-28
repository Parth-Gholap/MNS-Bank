'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface PanPageProps {
  locale: 'en' | 'hi';
}

interface PanApplication {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  idProofType: string;
  idProofNumber: string;
  serviceType: string;
  accountNumber: string;
}

const PanPage: React.FC<PanPageProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState<PanApplication>({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    idProofType: '',
    idProofNumber: '',
    serviceType: '',
    accountNumber: ''
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  useEffect(() => {
    trackPageView('PAN Services', locale === 'hi' ? 'पैन सेवाएं' : 'PAN Services');
  }, [locale]);

  const services = [
    {
      id: 'new-pan',
      title: locale === 'hi' ? 'नया पैन कार्ड' : 'New PAN Card',
      description: locale === 'hi' 
        ? 'पहली बार पैन कार्ड के लिए आवेदन'
        : 'Apply for first-time PAN card',
      processingTime: locale === 'hi' ? '15-20 कार्यदिवस' : '15-20 working days',
      fees: locale === 'hi' ? '₹107 (भारत में)' : '₹107 (within India)',
      documents: [
        locale === 'hi' ? 'पहचान प्रमाण' : 'Identity Proof',
        locale === 'hi' ? 'पता प्रमाण' : 'Address Proof',
        locale === 'hi' ? 'फोटोग्राफ' : 'Photograph',
        locale === 'hi' ? 'जन्म प्रमाण' : 'Birth Proof'
      ]
    },
    {
      id: 'correction',
      title: locale === 'hi' ? 'पैन में सुधार' : 'PAN Correction',
      description: locale === 'hi' 
        ? 'पैन कार्ड में गलती सुधार के लिए'
        : 'For corrections in PAN card',
      processingTime: locale === 'hi' ? '7-10 कार्यदिवस' : '7-10 working days',
      fees: locale === 'hi' ? '₹107 (भारत में)' : '₹107 (within India)',
      documents: [
        locale === 'hi' ? 'मौजूदा पैन कार्ड' : 'Existing PAN card',
        locale === 'hi' ? 'सुधार प्रमाण' : 'Proof of correction',
        locale === 'hi' ? 'फोटोग्राफ' : 'Photograph'
      ]
    },
    {
      id: 'duplicate',
      title: locale === 'hi' ? 'डुप्लिकेट पैन' : 'Duplicate PAN',
      description: locale === 'hi' 
        ? 'ोए हुए पैन कार्ड के लिए'
        : 'For lost or damaged PAN card',
      processingTime: locale === 'hi' ? '15-20 कार्यदिवस' : '15-20 working days',
      fees: locale === 'hi' ? '₹107 (भारत में)' : '₹107 (within India)',
      documents: [
        locale === 'hi' ? 'मौजूदा पैन कार्ड' : 'Existing PAN card',
        locale === 'hi' ? 'रिपोर्ट' : 'FIR (if lost)',
        locale === 'hi' ? 'फोटोग्राफ' : 'Photograph'
      ]
    }
  ];

  const benefits = [
    {
      icon: '🏦',
      title: locale === 'hi' ? 'बैंक शाखा सेवा' : 'Branch Service',
      description: locale === 'hi' 
        ? 'हमारी बैंक शाखाओं में पैन सेवाएं'
        : 'PAN services at our bank branches'
    },
    {
      icon: '📱',
      title: locale === 'hi' ? 'ऑनलाइन सहायता' : 'Online Assistance',
      description: locale === 'hi' 
        ? 'ऑनलाइन आवेदन में सहायता'
        : 'Assistance with online applications'
    },
    {
      icon: '📋',
      title: locale === 'hi' ? 'फॉर्म भरण' : 'Form Filling',
      description: locale === 'hi' 
        ? 'फॉर्म भरने में पूरी सहायता'
        : 'Help with form filling'
    },
    {
      icon: '📞',
      title: locale === 'hi' ? 'ट्रैसिंग सेवाएं' : 'Tracking Services',
      description: locale === 'hi' 
        ? 'आवेदन स्थिति की जानकारी'
        : 'Application status information'
    },
    {
      icon: '🔒',
      title: locale === 'hi' ? 'सुरक्षित प्रक्रिया' : 'Secure Process',
      description: locale === 'hi' 
        ? 'सुरक्षित और भरोसी आवेदन प्रक्रिया'
        : 'Secure and confidential application process'
    },
    {
      icon: '💼',
      title: locale === 'hi' ? 'त्वरित शुल्क' : 'Reasonable Fees',
      description: locale === 'hi' 
        ? 'उचित और प्रतिस्पर्धत शुल्क'
        : 'Reasonable and transparent fees'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: locale === 'hi' ? 'आवेदन भरें' : 'Fill Application',
      description: locale === 'hi' 
        ? 'बैंक में पैन आवेदन फॉर्म भरें'
        : 'Fill PAN application form at bank'
    },
    {
      step: 2,
      title: locale === 'hi' ? 'दस्तावेज जमा करें' : 'Submit Documents',
      description: locale === 'hi' 
        ? 'आवश्यक दस्तावेज जमा करें'
        : 'Submit required documents'
    },
    {
      step: 3,
      title: locale === 'hi' ? 'शुल्क भुगतान' : 'Fee Payment',
      description: locale === 'hi' 
        ? 'पैन शुल्क भुगतान करें'
        : 'Pay PAN application fee'
    },
    {
      step: 4,
      title: locale === 'hi' ? 'सत्यापन' : 'Verification',
      description: locale === 'hi' 
        ? 'बैंक द्वारा दस्तावेज सत्यापित'
        : 'Documents verified by bank'
    },
    {
      step: 5,
      title: locale === 'hi' ? 'आवेदन प्रेषित' : 'Application Sent',
      description: locale === 'hi' 
        ? 'आवेदन आयकर विभाग को भेजा'
        : 'Application sent to Income Tax Department'
    },
    {
      step: 6,
      title: locale === 'hi' ? 'पैन कार्ड प्राप्त' : 'PAN Card Received',
      description: locale === 'hi' 
        ? 'पैन कार्ड आपके पते पर भेजा'
        : 'PAN card delivered to your address'
    }
  ];

  const faqs = [
    {
      question: locale === 'hi' ? 'पैन कार्ड के लिए क्या आवश्यक है?' : 'What is required for PAN card?',
      answer: locale === 'hi' 
        ? 'पहचान प्रमाण, पता प्रमाण, फोटोग्राफ और जन्म प्रमाण आवश्यक हैं।'
        : 'Identity proof, address proof, photograph and birth proof are required.'
    },
    {
      question: locale === 'hi' ? 'पैन कार्ड कितने समय लगता है?' : 'How long does it take to get PAN card?',
      answer: locale === 'hi' 
        ? 'नया पैन कार्ड के लिए 15-20 कार्यदिवस और अन्य अन्य सेवाओं के लिए 7-10 कार्यदिवस लगता है।'
        : '15-20 working days for new PAN and 7-10 days for other services.'
    },
    {
      question: locale === 'hi' ? 'क्या मैं बैंक के माध्यम से पैन कार्ड बनवा सकता हूँ?' : 'Can I apply for PAN card through bank?',
      answer: locale === 'hi' 
        ? 'हाँ, हमारी बैंक पैन सेवाएं प्रदान करती हैं। आप हमारी किसी भी शाखा में आवेदन कर सकते हैं।'
        : 'Yes, we provide PAN services. You can apply at any of our branches.'
    },
    {
      question: locale === 'hi' ? 'पैन कार्ड का उपयोग क्या है?' : 'What is PAN card used for?',
      answer: locale === 'hi' 
        ? 'पैन कार्ड आयकर रिपोर्टिंग, बैंकिंग, निवेश, और कई अन्य सरकारी गतिविधियों के लिए आवश्यक है।'
        : 'PAN card is required for income tax filing, banking, investments, and many other activities.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `PAN${timestamp}${random}`;
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const refNumber = generateReferenceNumber();
    setReferenceNumber(refNumber);
    setApplicationSubmitted(true);
    
    // In a real application, this would submit to a backend service
    console.log('PAN Application Submitted:', { ...applicationData, referenceNumber: refNumber });
  };

  const handleApplyNow = () => {
    setShowApplicationForm(true);
  };

  const handleResetForm = () => {
    setApplicationData({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      mobileNumber: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      idProofType: '',
      idProofNumber: '',
      serviceType: '',
      accountNumber: ''
    });
    setApplicationSubmitted(false);
    setReferenceNumber('');
    setShowApplicationForm(false);
  };

  if (showApplicationForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {locale === 'hi' ? 'पैन कार्ड आवेदन' : 'PAN Card Application'}
              </h1>
              <p className="text-gray-600">
                {locale === 'hi' 
                  ? 'महानगर नागरिक सहकारी बैंक के माध्यम से पैन कार्ड के लिए आवेदन करें'
                  : 'Apply for PAN card through Mahanagar Nagrik Sahakari Bank'
                }
              </p>
            </div>

            {applicationSubmitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  {locale === 'hi' ? 'आवेदन सफलतापूर्वक जमा!' : 'Application Submitted Successfully!'}
                </h2>
                <div className="bg-gray-100 rounded-lg p-6 mb-6 max-w-md mx-auto">
                  <p className="text-sm text-gray-600 mb-2">
                    {locale === 'hi' ? 'संदर्भ संख्या:' : 'Reference Number:'}
                  </p>
                  <p className="text-2xl font-bold text-bank-blue-600">{referenceNumber}</p>
                </div>
                <p className="text-gray-600 mb-8">
                  {locale === 'hi' 
                    ? 'हम जल्द ही आपसे संपर्क करेंगे और आपके आवेदन की प्रक्रिया शुरू करेंगे।'
                    : 'We will contact you soon and begin processing your application.'
                  }
                </p>
                <button
                  onClick={handleResetForm}
                  className="bg-bank-blue-600 text-white px-6 py-3 rounded-lg hover:bg-bank-blue-700 transition-colors"
                >
                  {locale === 'hi' ? 'नया आवेदन' : 'New Application'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'पूरा नाम' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={applicationData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'जन्म तिथि' : 'Date of Birth'} *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={applicationData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'लिंग' : 'Gender'} *
                    </label>
                    <select
                      name="gender"
                      value={applicationData.gender}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    >
                      <option value="">{locale === 'hi' ? 'चुनें' : 'Select'}</option>
                      <option value="male">{locale === 'hi' ? 'पुरुष' : 'Male'}</option>
                      <option value="female">{locale === 'hi' ? 'महिला' : 'Female'}</option>
                      <option value="other">{locale === 'hi' ? 'अन्य' : 'Other'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'} *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={applicationData.mobileNumber}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      placeholder="9876543210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'ईमेल' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'सेवा प्रकार' : 'Service Type'} *
                    </label>
                    <select
                      name="serviceType"
                      value={applicationData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    >
                      <option value="">{locale === 'hi' ? 'चुनें' : 'Select'}</option>
                      <option value="new-pan">{locale === 'hi' ? 'नया पैन कार्ड' : 'New PAN Card'}</option>
                      <option value="correction">{locale === 'hi' ? 'पैन सुधार' : 'PAN Correction'}</option>
                      <option value="duplicate">{locale === 'hi' ? 'डुप्लिकेट पैन' : 'Duplicate PAN'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'पता' : 'Address'} *
                  </label>
                  <textarea
                    name="address"
                    value={applicationData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'शहर' : 'City'} *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={applicationData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'राज्य' : 'State'} *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={applicationData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'पिनकोड' : 'Pincode'} *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={applicationData.pincode}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{6}"
                      placeholder="462011"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'पहचान प्रमाण प्रकार' : 'ID Proof Type'} *
                    </label>
                    <select
                      name="idProofType"
                      value={applicationData.idProofType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    >
                      <option value="">{locale === 'hi' ? 'चुनें' : 'Select'}</option>
                      <option value="aadhaar">{locale === 'hi' ? 'आधार कार्ड' : 'Aadhaar Card'}</option>
                      <option value="pan">{locale === 'hi' ? 'पैन कार्ड' : 'PAN Card'}</option>
                      <option value="voter">{locale === 'hi' ? 'वोटर आईडी' : 'Voter ID'}</option>
                      <option value="passport">{locale === 'hi' ? 'पासपोर्ट' : 'Passport'}</option>
                      <option value="driving">{locale === 'hi' ? 'ड्राइविंग लाइसेंस' : 'Driving License'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'hi' ? 'पहचान प्रमाण संख्या' : 'ID Proof Number'} *
                    </label>
                    <input
                      type="text"
                      name="idProofNumber"
                      value={applicationData.idProofNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'hi' ? 'बैंक खाता नंबर' : 'Bank Account Number'}
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={applicationData.accountNumber}
                    onChange={handleInputChange}
                    placeholder={locale === 'hi' ? 'वैकल्पिक' : 'Optional'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {locale === 'hi' 
                      ? 'यदि आप हमारे बैंक में खाता धारक हैं तो भरें'
                      : 'Fill if you have an account with our bank'
                    }
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{locale === 'hi' ? 'पहचान प्रमाण' : 'Identity Proof'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{locale === 'hi' ? 'पता प्रमाण' : 'Address Proof'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{locale === 'hi' ? 'पासपोर्ट आकार का फोटो' : 'Passport Size Photo'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{locale === 'hi' ? 'जन्म प्रमाण' : 'Birth Proof'}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    {locale === 'hi' 
                      ? 'कृपया इन दस्तावेजों की प्रतियां हमारी किसी भी शाखा में जमा करें।'
                      : 'Please submit copies of these documents at any of our branches.'
                    }
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-bank-blue-600 text-white px-6 py-3 rounded-lg hover:bg-bank-blue-700 transition-colors"
                  >
                    {locale === 'hi' ? 'आवेदन जमा करें' : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    {locale === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'पैन सेवाएं' : 'PAN Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi' 
              ? 'महानगर नागरिक सहकारी बैंक में पैन कार्ड सेवाएं - तेज़, सरल और सुविधाजनक'
              : 'PAN card services at Mahanagar Nagrik Sahakari Bank - Fast, reliable and convenient'
            }
          </p>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'पैन सेवाएं' : 'PAN Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  <div className="text-sm text-gray-500 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {service.processingTime}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">{locale === 'hi' ? 'शुल्क:' : 'Fees:'}</div>
                  <div className="font-semibold text-green-600">{service.fees}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">{locale === 'hi' ? 'आवश्यक दस्तावेज:' : 'Required Documents:'}</div>
                  <div className="space-y-1">
                    {service.documents.map((doc, docIndex) => (
                      <div key={docIndex} className="text-sm text-gray-600">• {doc}</div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleApplyNow}
                  className="w-full mt-4 bg-bank-blue-600 text-white px-4 py-2 rounded-lg hover:bg-bank-blue-700 transition-colors"
                >
                  {locale === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'लाभ' : 'Benefits'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'आवेदन प्रक्रिया' : 'Application Process'}
          </h2>
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-bank-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'अक्सर बार प्रश्न' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'संपर्क करें' : 'Contact Us'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'पैन सेवाएं' : 'PAN Services'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{locale === 'hi' ? 'फोन:' : 'Phone:'}</strong> +91-755-2471133
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'ईमेल:' : 'Email:'}</strong> pan@mnsbankbhopal.com
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'समय:' : 'Hours:'}</strong> {locale === 'hi' ? 'सुबह 10 बजे - शाम 4:30 बजे' : '10:00 AM - 4:30 PM'}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'शाखाएं' : 'Branches'}
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{locale === 'hi' ? 'मुख्य शाखा:' : 'Main Branch:'}</strong> M.P. Nagar, Bhopal
                </p>
                <p>
                  <strong>{locale === 'hi' ? 'अन्य शाखा:' : 'Other Branches:'}</strong> {locale === 'hi' ? 'भोपाल में' : 'Across Bhopal'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanPage;