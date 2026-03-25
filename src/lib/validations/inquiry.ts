export interface InquiryFormData {
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

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateInquiryForm = (data: InquiryFormData, locale: 'en' | 'hi' = 'en'): ValidationResult => {
  const errors: Record<string, string> = {};

  // Full Name validation
  if (!data.fullName || data.fullName.trim().length === 0) {
    errors.fullName = locale === 'hi' ? 'पूरा नाम आवश्यक है' : 'Full name is required';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = locale === 'hi' ? 'पूरा नाम कम से कम 2 अक्षर होना चाहिए' : 'Full name must be at least 2 characters';
  } else if (data.fullName.trim().length > 100) {
    errors.fullName = locale === 'hi' ? 'पूरा नाम 100 अक्षरों से अधिक नहीं हो सकता' : 'Full name cannot exceed 100 characters';
  } else if (!/^[a-zA-Z\s\u0900-\u097F]+$/.test(data.fullName)) {
    errors.fullName = locale === 'hi' ? 'पूरा नाम केवल अक्षरों में होना चाहिए' : 'Full name can only contain letters and spaces';
  }

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.email = locale === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = locale === 'hi' ? 'अमान्य ईमेल प्रारूप' : 'Invalid email format';
  } else if (data.email.length > 254) {
    errors.email = locale === 'hi' ? 'ईमेल 254 अक्षरों से अधिक नहीं हो सकती' : 'Email cannot exceed 254 characters';
  }

  // Mobile Number validation
  if (!data.mobileNumber || data.mobileNumber.trim().length === 0) {
    errors.mobileNumber = locale === 'hi' ? 'मोबाइल नंबर आवश्यक है' : 'Mobile number is required';
  } else if (!/^[6-9]\d{9}$/.test(data.mobileNumber)) {
    errors.mobileNumber = locale === 'hi' ? 'अमान्य मोबाइल नंबर' : 'Invalid mobile number format';
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length === 0) {
    errors.subject = locale === 'hi' ? 'विषय आवश्यक है' : 'Subject is required';
  } else if (data.subject.trim().length < 5) {
    errors.subject = locale === 'hi' ? 'विषय कम से कम 5 अक्षर होना चाहिए' : 'Subject must be at least 5 characters';
  } else if (data.subject.trim().length > 200) {
    errors.subject = locale === 'hi' ? 'विषय 200 अक्षरों से अधिक नहीं हो सकता' : 'Subject cannot exceed 200 characters';
  }

  // Message validation
  if (!data.message || data.message.trim().length === 0) {
    errors.message = locale === 'hi' ? 'संदेश आवश्यक है' : 'Message is required';
  } else if (data.message.trim().length < 20) {
    errors.message = locale === 'hi' ? 'संदेश कम से कम 20 अक्षर होनी चाहिए' : 'Message must be at least 20 characters';
  } else if (data.message.trim().length > 2000) {
    errors.message = locale === 'hi' ? 'संदेश 2000 अक्षरों से अधिक नहीं हो सकती' : 'Message cannot exceed 2000 characters';
  }

  // Category validation
  if (!data.category || data.category.trim().length === 0) {
    errors.category = locale === 'hi' ? 'श्रेणी आवश्यक है' : 'Category is required';
  }

  // Priority validation (enum validation handled by TypeScript)
  if (!data.priority) {
    errors.priority = locale === 'hi' ? 'प्राथमिकता आवश्यक है' : 'Priority is required';
  }

  // Preferred Contact validation (enum validation handled by TypeScript)
  if (!data.preferredContact) {
    errors.preferredContact = locale === 'hi' ? 'पसंदीद संपर्क आवश्यक है' : 'Preferred contact method is required';
  }

  // Attachment validation
  if (data.attachment && data.attachment.length > 0) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const maxFiles = 10;
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];

    if (data.attachment.length > maxFiles) {
      errors.attachment = locale === 'hi' ? `अधिकतम ${maxFiles} फाइलें` : `Maximum ${maxFiles} files allowed`;
    }

    for (const file of data.attachment) {
      if (file.size > maxSize) {
        errors.attachment = locale === 'hi' ? 'प्रत्येक फाइल 5MB से बड़ी नहीं हो सकती' : 'Each file must be less than 5MB';
        break;
      }

      if (!allowedTypes.includes(file.type)) {
        errors.attachment = locale === 'hi' ? 'अमान्य फाइल प्रकार' : 'Invalid file type. Only PDF, DOC, DOCX, JPG, JPEG, PNG allowed';
        break;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .slice(0, 2000); // Prevent extremely long inputs
};

export const validateEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMobileNumber = (mobile: string): boolean => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s\u0900-\u097F]+$/;
  return nameRegex.test(name) && name.trim().length >= 2 && name.trim().length <= 100;
};

export const getInquiryCategories = (inquiryType: string, locale: 'en' | 'hi' = 'en'): Array<{ value: string; label: string }> => {
  const categories: Record<string, Record<string, { en: string; hi: string }>> = {
    general: {
      'account-info': { en: 'Account Information', hi: 'खाता जानकारी' },
      'banking-services': { en: 'Banking Services', hi: 'बैंकिंग सेवाएं' },
      'digital-banking': { en: 'Digital Banking', hi: 'डिजिटल बैंकिंग' },
      'branch-services': { en: 'Branch Services', hi: 'शाखा सेवाएं' },
      'other': { en: 'Other', hi: 'अन्य' }
    },
    product: {
      'savings-account': { en: 'Savings Account', hi: 'बचत खाता' },
      'current-account': { en: 'Current Account', hi: 'चालू खाता' },
      'personal-loan': { en: 'Personal Loan', hi: 'व्यक्ति लोन' },
      'home-loan': { en: 'Home Loan', hi: 'होम लोन' },
      'car-loan': { en: 'Car Loan', hi: 'कार लोन' },
      'business-loan': { en: 'Business Loan', hi: 'व्यवसाय लोन' }
    },
    service: {
      'net-banking': { en: 'Net Banking', hi: 'नेट बैंकिंग' },
      'mobile-banking': { en: 'Mobile Banking', hi: 'मोबाइल बैंकिंग' },
      'atm-services': { en: 'ATM Services', hi: 'एटीएम सेवाएं' },
      'card-services': { en: 'Card Services', hi: 'कार्ड सेवाएं' },
      'upi-services': { en: 'UPI Services', hi: 'यूपीआई सेवाएं' }
    },
    complaint: {
      'service-issue': { en: 'Service Issue', hi: 'सेवा समस्या' },
      'transaction-issue': { en: 'Transaction Issue', hi: 'लेनदेन समस्या' },
      'card-issue': { en: 'Card Issue', hi: 'कार्ड समस्या' },
      'online-banking-issue': { en: 'Online Banking Issue', hi: 'ऑनलाइन बैंकिंग समस्या' }
    },
    branch: {
      'branch-location': { en: 'Branch Location', hi: 'शाखा स्थान' },
      'branch-services': { en: 'Branch Services', hi: 'शाखा सेवाएं' },
      'branch-timing': { en: 'Branch Timing', hi: 'शाखा समय' },
      'appointment-request': { en: 'Appointment Request', hi: 'अपॉइंटमेंट अनुरोध' }
    },
    digital: {
      'mobile-app': { en: 'Mobile App', hi: 'मोबाइल ऐप' },
      'internet-banking': { en: 'Internet Banking', hi: 'इंटरनेट बैंकिंग' },
      'upi-services': { en: 'UPI Services', hi: 'यूपीआई सेवाएं' },
      'digital-services': { en: 'Digital Services', hi: 'डिजिटल सेवाएं' }
    }
  };

  const typeCategories = categories[inquiryType] || categories.general;
  
  return Object.entries(typeCategories).map(([value, labels]) => ({
    value,
    label: locale === 'hi' ? labels.hi : labels.en
  }));
};

export const validateFileSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

export const validateFileType = (file: File): boolean => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ];
  return allowedTypes.includes(file.type);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const createInquirySummary = (data: InquiryFormData): string => {
  return `
Inquiry Summary:
- Name: ${data.fullName}
- Email: ${data.email}
- Mobile: ${data.mobileNumber}
- Category: ${data.category}
- Priority: ${data.priority}
- Subject: ${data.subject}
- Message: ${data.message.substring(0, 200)}${data.message.length > 200 ? '...' : ''}
- Preferred Contact: ${data.preferredContact}
- Attachments: ${data.attachment?.length || 0} files
  `.trim();
};

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-red-600 bg-red-50 border-red-200'
  };
  return colors[priority] || colors.medium;
};

export const getPriorityLabel = (priority: string, locale: 'en' | 'hi' = 'en'): string => {
  const labels: Record<string, { en: string; hi: string }> = {
    low: { en: 'Low', hi: 'कम' },
    medium: { en: 'Medium', hi: 'मध्यम' },
    high: { en: 'High', hi: 'उच्च' }
  };
  return labels[priority]?.[locale] || priority;
};
