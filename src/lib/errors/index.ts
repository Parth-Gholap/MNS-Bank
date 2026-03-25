// Error Handling Utilities for Mahanagar Bank Website

export class APIError extends Error {
  public code: string;
  public details?: any;
  public timestamp: Date;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', details?: any) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

export class ValidationError extends Error {
  public field: string;
  public value: any;
  public rule: string;

  constructor(message: string, field: string, value: any, rule: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
    this.rule = rule;
  }
}

export class NetworkError extends Error {
  public status?: number;
  public statusText?: string;

  constructor(message: string, status?: number, statusText?: string) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
    this.statusText = statusText;
  }
}

export class AuthenticationError extends Error {
  public code: string;

  constructor(message: string, code: string = 'AUTH_ERROR') {
    super(message);
    this.name = 'AuthenticationError';
    this.code = code;
  }
}

export class FileUploadError extends Error {
  public fileName?: string;
  public fileSize?: number;
  public fileType?: string;

  constructor(message: string, fileName?: string, fileSize?: number, fileType?: string) {
    super(message);
    this.name = 'FileUploadError';
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.fileType = fileType;
  }
}

export class FormSubmissionError extends Error {
  public formType?: string;
  public formData?: any;

  constructor(message: string, formType?: string, formData?: any) {
    super(message);
    this.name = 'FormSubmissionError';
    this.formType = formType;
    this.formData = formData;
  }
}

// Error codes
export const ERROR_CODES = {
  // API Errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  
  // Form Validation Errors
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_MOBILE: 'INVALID_MOBILE',
  INVALID_PINCODE: 'INVALID_PINCODE',
  INVALID_AADHAAR: 'INVALID_AADHAAR',
  INVALID_PAN: 'INVALID_PAN',
  INVALID_IFSC: 'INVALID_IFSC',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  INVALID_TENURE: 'INVALID_TENURE',
  INVALID_RATE: 'INVALID_RATE',
  
  // File Upload Errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  
  // Business Logic Errors
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  ACCOUNT_SUSPENDED: 'ACCOUNT_SUSPENDED',
  TRANSACTION_FAILED: 'TRANSACTION_FAILED',
  DUPLICATE_REQUEST: 'DUPLICATE_REQUEST',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  ACCESS_DENIED: 'ACCESS_DENIED',
  
  // System Errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  CACHE_ERROR: 'CACHE_ERROR',
  EMAIL_SEND_FAILED: 'EMAIL_SEND_FAILED',
  SMS_SEND_FAILED: 'SMS_SEND_FAILED',
  RECAPTCHA_FAILED: 'RECAPTCHA_FAILED'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  [ERROR_CODES.NETWORK_ERROR]: 'Network connection failed. Please check your internet connection and try again.',
  [ERROR_CODES.SERVER_ERROR]: 'Server error occurred. Please try again later.',
  [ERROR_CODES.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ERROR_CODES.AUTHENTICATION_ERROR]: 'Authentication failed. Please check your credentials and try again.',
  [ERROR_CODES.AUTHORIZATION_ERROR]: 'You do not have permission to perform this action.',
  [ERROR_CODES.NOT_FOUND]: 'The requested resource was not found.',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Too many requests. Please try again later.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  
  [ERROR_CODES.REQUIRED_FIELD]: 'This field is required.',
  [ERROR_CODES.INVALID_EMAIL]: 'Please enter a valid email address.',
  [ERROR_CODES.INVALID_MOBILE]: 'Please enter a valid 10-digit mobile number.',
  [ERROR_CODES.INVALID_PINCODE]: 'Please enter a valid 6-digit pincode.',
  [ERROR_CODES.INVALID_AADHAAR]: 'Please enter a valid 12-digit Aadhaar number.',
  [ERROR_CODES.INVALID_PAN]: 'Please enter a valid PAN number.',
  [ERROR_CODES.INVALID_IFSC]: 'Please enter a valid IFSC code.',
  [ERROR_CODES.INVALID_AMOUNT]: 'Please enter a valid amount.',
  [ERROR_CODES.INVALID_TENURE]: 'Please enter a valid tenure.',
  [ERROR_CODES.INVALID_RATE]: 'Please enter a valid interest rate.',
  
  [ERROR_CODES.FILE_TOO_LARGE]: 'File size exceeds the maximum allowed limit.',
  [ERROR_CODES.INVALID_FILE_TYPE]: 'Invalid file type. Please upload a valid file.',
  [ERROR_CODES.UPLOAD_FAILED]: 'File upload failed. Please try again.',
  
  [ERROR_CODES.INSUFFICIENT_BALANCE]: 'Insufficient balance in your account.',
  [ERROR_CODES.ACCOUNT_SUSPENDED]: 'Your account has been suspended. Please contact support.',
  [ERROR_CODES.TRANSACTION_FAILED]: 'Transaction failed. Please try again.',
  [ERROR_CODES.DUPLICATE_REQUEST]: 'Duplicate request. Please wait before trying again.',
  [ERROR_CODES.SESSION_EXPIRED]: 'Your session has expired. Please log in again.',
  [ERROR_CODES.ACCESS_DENIED]: 'Access denied. You do not have permission to access this resource.',
  
  [ERROR_CODES.DATABASE_ERROR]: 'Database error occurred. Please try again later.',
  [ERROR_CODES.CACHE_ERROR]: 'Cache error occurred. Please refresh the page.',
  [ERROR_CODES.EMAIL_SEND_FAILED]: 'Failed to send email. Please try again later.',
  [ERROR_CODES.SMS_SEND_FAILED]: 'Failed to send SMS. Please try again later.',
  [ERROR_CODES.RECAPTCHA_FAILED]: 'reCAPTCHA verification failed. Please try again.'
} as const;

// Error handling utilities
export const errorUtils = {
  // Create specific error types
  createAPIError: (message: string, code?: string, details?: any): APIError => {
    return new APIError(message, code || ERROR_CODES.NETWORK_ERROR, details);
  },

  createValidationError: (message: string, field: string, value: any, rule: string): ValidationError => {
    return new ValidationError(message, field, value, rule);
  },

  createNetworkError: (message: string, status?: number, statusText?: string): NetworkError => {
    return new NetworkError(message, status, statusText);
  },

  createAuthenticationError: (message: string, code?: string): AuthenticationError => {
    return new AuthenticationError(message, code || ERROR_CODES.AUTHENTICATION_ERROR);
  },

  createFileUploadError: (message: string, fileName?: string, fileSize?: number, fileType?: string): FileUploadError => {
    return new FileUploadError(message, fileName, fileSize, fileType);
  },

  createFormSubmissionError: (message: string, formType?: string, formData?: any): FormSubmissionError => {
    return new FormSubmissionError(message, formType, formData);
  },

  // Error logging
  logError: (error: Error, context?: Record<string, any>): void => {
    console.error('Error occurred:', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
  },

  // Error formatting
  formatErrorMessage: (error: Error | APIError): string => {
    if (error instanceof APIError) {
      return error.details?.message || error.message;
    }
    return error.message;
  },

  // Check if error is network related
  isNetworkError: (error: Error): boolean => {
    return error instanceof NetworkError || 
           error.message.includes('Network') || 
           error.message.includes('fetch');
  },

  // Check if error is validation related
  isValidationError: (error: Error): boolean => {
    return error instanceof ValidationError;
  },

  // Check if error is authentication related
  isAuthenticationError: (error: Error): boolean => {
    return error instanceof AuthenticationError;
  },

  // Get user-friendly error message
  getUserMessage: (error: Error | APIError): string => {
    const message = errorUtils.formatErrorMessage(error);
    return ERROR_MESSAGES[error.name as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR] || message;
  }
};

export default {
  APIError,
  ValidationError,
  NetworkError,
  AuthenticationError,
  FileUploadError,
  FormSubmissionError,
  ERROR_CODES,
  ERROR_MESSAGES,
  errorUtils
};
