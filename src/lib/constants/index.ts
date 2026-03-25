// Constants for Mahanagar Bank Website

export const constants = {
  // Bank Information
  bankName: 'Mahanagar Nagrik Sahakari Bank',
  bankNameHi: 'महानगर नागरिक सहकारी बैंक',
  bankShortName: 'MNS Bank',
  bankShortNameHi: 'एमएनएस बैंक',
  
  // Contact Information
  supportEmail: 'support@mnsbankbhopal.com',
  supportPhone: '1800-123-4567',
  tollFreeNumber: '14448',
  customerCareEmail: 'customercare@mnsbankbhopal.com',
  
  // External Links
  rbiOmbudsmanUrl: 'https://cms.rbi.org.in',
  dicgcUrl: 'https://dicgc.gov.in',
  npciUrl: 'https://npci.org.in',
  
  // File and Form Limits
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxFormMessageLength: 250,
  maxUploadSize: 10 * 1024 * 1024, // 10MB
  maxImageSize: 2 * 1024 * 1024, // 2MB
  
  // Pagination and Display
  paginationLimit: 10,
  searchResultsLimit: 50,
  carouselAutoPlayInterval: 5000, // 5 seconds
  
  // Error Messages
  ERROR_MESSAGES: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_PINCODE: 'Please enter a valid 6-digit PIN code',
    INVALID_AADHAR: 'Please enter a valid 12-digit Aadhaar number',
    INVALID_PAN: 'Please enter a valid PAN number',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
    PASSWORD_TOO_WEAK: 'Password must contain uppercase, lowercase, number and special character',
    FILE_TOO_LARGE: 'File size exceeds the maximum limit',
    INVALID_FILE_TYPE: 'Invalid file type',
    INVALID_AMOUNT: 'Please enter a valid amount',
    INVALID_DATE: 'Please enter a valid date',
    INVALID_URL: 'Please enter a valid URL',
    INVALID_IFSC: 'Please enter a valid IFSC code',
    INVALID_ACCOUNT_NUMBER: 'Please enter a valid account number'
  },
  
  ERROR_CODES: {
    REQUIRED_FIELD: 'REQUIRED_FIELD',
    INVALID_EMAIL: 'INVALID_EMAIL',
    INVALID_PHONE: 'INVALID_PHONE',
    INVALID_PINCODE: 'INVALID_PINCODE',
    INVALID_AADHAR: 'INVALID_AADHAR',
    INVALID_PAN: 'INVALID_PAN',
    PASSWORD_TOO_SHORT: 'PASSWORD_TOO_SHORT',
    PASSWORD_TOO_WEAK: 'PASSWORD_TOO_WEAK',
    FILE_TOO_LARGE: 'FILE_TOO_LARGE',
    INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
    INVALID_AMOUNT: 'INVALID_AMOUNT',
    INVALID_DATE: 'INVALID_DATE',
    INVALID_URL: 'INVALID_URL',
    INVALID_IFSC: 'INVALID_IFSC',
    INVALID_ACCOUNT_NUMBER: 'INVALID_ACCOUNT_NUMBER'
  },
  newsItemsPerPage: 6,
  
  // Timeouts and Durations
  cacheTimeout: 15 * 60 * 1000, // 15 minutes
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  formSubmissionTimeout: 10 * 1000, // 10 seconds
  apiRequestTimeout: 30 * 1000, // 30 seconds
  
  // Interest Rates and Charges
  minLoanAmount: 10000,
  maxLoanAmount: 50000000,
  minEmiAmount: 500,
  maxInterestRate: 25,
  minInterestRate: 4,
  
  // Mobile and Responsive Breakpoints
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
  desktopBreakpoint: 1280,
  
  // Error Messages
  errors: {
    networkError: 'Network error. Please try again.',
    serverError: 'Server error. Please try again later.',
    validationError: 'Please check your input and try again.',
    fileUploadError: 'File upload failed. Please try again.',
    formSubmissionError: 'Form submission failed. Please try again.',
    sessionExpired: 'Your session has expired. Please log in again.',
    accessDenied: 'Access denied. You do not have permission to access this resource.',
    pageNotFound: 'Page not found.',
    serverMaintenance: 'Server is under maintenance. Please try again later.'
  },
  
  // Success Messages
  success: {
    formSubmitted: 'Your form has been submitted successfully.',
    inquirySubmitted: 'Your inquiry has been submitted. We will contact you soon.',
    grievanceSubmitted: 'Your grievance has been submitted. Reference number: {referenceNumber}',
    fileDownloaded: 'File downloaded successfully.',
    profileUpdated: 'Your profile has been updated successfully.',
    passwordChanged: 'Your password has been changed successfully.',
    emailVerified: 'Your email has been verified successfully.',
    mobileVerified: 'Your mobile number has been verified successfully.'
  },
  
  // Form Placeholders
  placeholders: {
    fullName: 'Enter your full name',
    mobileNumber: 'Enter your 10-digit mobile number',
    email: 'Enter your email address',
    message: 'Enter your message here',
    search: 'Search products, services, or information...',
    loanAmount: 'Enter loan amount',
    interestRate: 'Enter interest rate',
    tenure: 'Enter loan tenure',
    pincode: 'Enter 6-digit pincode',
    address: 'Enter your address',
    city: 'Enter your city',
    state: 'Enter your state'
  },
  
  // Regular Expressions
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobile: /^[6-9]\d{9}$/,
    pincode: /^\d{6}$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
    aadhaar: /^\d{12}$/,
    ifsc: /^[A-Z]{4}0\d{6}$/,
    accountNumber: /^\d{10,17}$/
  },
  
  // CSS Classes
  classes: {
    loading: 'animate-pulse',
    error: 'border-red-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    info: 'border-blue-500',
    disabled: 'opacity-50 cursor-not-allowed',
    active: 'bg-bank-blue-600 text-white',
    inactive: 'bg-gray-100 text-gray-600'
  },
  
  // Animation Durations
  animations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  },
  
  // Accessibility Labels
  accessibility: {
    skipLink: 'Skip to main content',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    increaseText: 'Increase text size',
    decreaseText: 'Decrease text size',
    highContrast: 'Toggle high contrast mode',
    reset: 'Reset accessibility settings'
  }
};

export default constants;
