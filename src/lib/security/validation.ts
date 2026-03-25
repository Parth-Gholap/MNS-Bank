import React, { useState, useCallback } from 'react';

export interface ValidationRule {
  name: string;
  validate: (value: any) => boolean | string;
  message?: string;
}

export interface SanitizationRule {
  name: string;
  sanitize: (value: any) => any;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  sanitized: any;
  timestamp?: number;
}

export interface ValidationSchema {
  [field: string]: {
    rules: ValidationRule[];
    sanitizers?: SanitizationRule[];
    required?: boolean;
    defaultValue?: any;
  };
}

class InputValidator {
  private static instance: InputValidator;
  private schemas: Map<string, ValidationSchema> = new Map();
  private validationHistory: Map<string, ValidationResult[]> = new Map();

  private constructor() {
    this.initializeDefaultRules();
  }

  static getInstance(): InputValidator {
    if (!InputValidator.instance) {
      InputValidator.instance = new InputValidator();
    }
    return InputValidator.instance;
  }

  private initializeDefaultRules(): void {
    // Common validation rules
    this.registerSchema('user', {
      email: {
        rules: [
          {
            name: 'required',
            validate: (value) => value && value.trim().length > 0,
            message: 'Email is required'
          },
          {
            name: 'email',
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Invalid email format'
          },
          {
            name: 'maxLength',
            validate: (value) => value.length <= 255,
            message: 'Email must be less than 255 characters'
          }
        ],
        required: true
      },
      password: {
        rules: [
          {
            name: 'required',
            validate: (value) => value && value.length > 0,
            message: 'Password is required'
          },
          {
            name: 'minLength',
            validate: (value) => value.length >= 8,
            message: 'Password must be at least 8 characters'
          },
          {
            name: 'strongPassword',
            validate: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value),
            message: 'Password must contain uppercase, lowercase, number, and special character'
          }
        ],
        required: true
      },
      name: {
        rules: [
          {
            name: 'required',
            validate: (value) => value && value.trim().length > 0,
            message: 'Name is required'
          },
          {
            name: 'minLength',
            validate: (value) => value.trim().length >= 2,
            message: 'Name must be at least 2 characters'
          },
          {
            name: 'maxLength',
            validate: (value) => value.length <= 100,
            message: 'Name must be less than 100 characters'
          },
          {
            name: 'alphaNumeric',
            validate: (value) => /^[a-zA-Z\s]+$/.test(value),
            message: 'Name can only contain letters and spaces'
          }
        ],
        sanitizers: [
          {
            name: 'trim',
            sanitize: (value) => value.trim()
          },
          {
            name: 'escape',
            sanitize: (value) => this.escapeHtml(value)
          }
        ],
        required: true
      },
      phone: {
        rules: [
          {
            name: 'phone',
            validate: (value) => /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, '')),
            message: 'Invalid phone number format'
          }
        ],
        sanitizers: [
          {
            name: 'normalizePhone',
            sanitize: (value) => value.replace(/[\s\-\(\)]/g, '')
          }
        ]
      },
      amount: {
        rules: [
          {
            name: 'required',
            validate: (value) => value !== null && value !== undefined,
            message: 'Amount is required'
          },
          {
            name: 'positive',
            validate: (value) => value > 0,
            message: 'Amount must be positive'
          },
          {
            name: 'maxAmount',
            validate: (value) => value <= 1000000,
            message: 'Amount cannot exceed 1,000,000'
          },
          {
            name: 'decimalPlaces',
            validate: (value) => /^\d+(\.\d{1,2})?$/.test(value.toString()),
            message: 'Amount can have maximum 2 decimal places'
          }
        ],
        sanitizers: [
          {
            name: 'parseFloat',
            sanitize: (value) => parseFloat(value)
          }
        ],
        required: true
      }
    });

    this.registerSchema('transaction', {
      amount: {
        rules: [
          {
            name: 'required',
            validate: (value) => value !== null && value !== undefined,
            message: 'Amount is required'
          },
          {
            name: 'positive',
            validate: (value) => value > 0,
            message: 'Amount must be positive'
          },
          {
            name: 'maxAmount',
            validate: (value) => value <= 10000000,
            message: 'Transaction amount cannot exceed 10,000,000'
          }
        ],
        sanitizers: [
          {
            name: 'parseFloat',
            sanitize: (value) => parseFloat(value)
          }
        ],
        required: true
      },
      accountNumber: {
        rules: [
          {
            name: 'required',
            validate: (value) => value && value.trim().length > 0,
            message: 'Account number is required'
          },
          {
            name: 'accountNumber',
            validate: (value) => /^\d{10,16}$/.test(value.replace(/[\s\-]/g, '')),
            message: 'Invalid account number format'
          }
        ],
        sanitizers: [
          {
            name: 'normalizeAccount',
            sanitize: (value) => value.replace(/[\s\-]/g, '')
          }
        ],
        required: true
      },
      description: {
        rules: [
          {
            name: 'maxLength',
            validate: (value) => !value || value.length <= 500,
            message: 'Description must be less than 500 characters'
          }
        ],
        sanitizers: [
          {
            name: 'trim',
            sanitize: (value) => value ? value.trim() : ''
          },
          {
            name: 'escape',
            sanitize: (value) => this.escapeHtml(value || '')
          }
        ]
      }
    });

    this.registerSchema('search', {
      query: {
        rules: [
          {
            name: 'maxLength',
            validate: (value) => !value || value.length <= 100,
            message: 'Search query must be less than 100 characters'
          },
          {
            name: 'noSqlInjection',
            validate: (value) => !this.containsSqlInjection(value),
            message: 'Invalid characters in search query'
          }
        ],
        sanitizers: [
          {
            name: 'trim',
            sanitize: (value) => value ? value.trim() : ''
          },
          {
            name: 'escape',
            sanitize: (value) => this.escapeHtml(value || '')
          }
        ]
      },
      filters: {
        rules: [
          {
            name: 'validFilters',
            validate: (value) => {
              if (!value || typeof value !== 'object') return true;
              const validFilters = ['type', 'category', 'date', 'amount', 'status'];
              return Object.keys(value).every(key => validFilters.includes(key));
            },
            message: 'Invalid filter parameters'
          }
        ],
        sanitizers: [
          {
            name: 'sanitizeFilters',
            sanitize: (value) => {
              if (!value || typeof value !== 'object') return {};
              const sanitized: any = {};
              Object.entries(value).forEach(([key, val]) => {
                sanitized[key] = this.escapeHtml(String(val));
              });
              return sanitized;
            }
          }
        ]
      }
    });
  }

  private escapeHtml(value: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };
    
    return value.replace(/[&<>"'/]/g, (m) => map[m]);
  }

  private containsSqlInjection(value: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
      /(\b(OR|AND)\s+['"]?\w+['"]?\s*=\s*['"]?\w+['"]?)/i,
      /(\b(OR|AND)\s+TRUE|FALSE\b)/i,
      /(\b(UNION|SELECT)\s+.*\s+FROM\b)/i,
      /(--|\#|\/\*|\*\/)/,
      /(\b(LOAD_FILE|INTO\s+OUTFILE|INTO\s+DUMPFILE)\b)/i
    ];
    
    return sqlPatterns.some(pattern => pattern.test(value));
  }

  private containsXss(value: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<img[^>]*src[^>]*javascript:/gi,
      /<\s*script/gi,
      /<\s*object/gi,
      /<\s*embed/gi,
      /<\s*link/gi,
      /<\s*meta/gi
    ];
    
    return xssPatterns.some(pattern => pattern.test(value));
  }

  registerSchema(name: string, schema: ValidationSchema): void {
    this.schemas.set(name, schema);
  }

  validate(schemaName: string, data: any): ValidationResult {
    const schema = this.schemas.get(schemaName);
    if (!schema) {
      return {
        valid: false,
        errors: [`Schema '${schemaName}' not found`],
        warnings: [],
        sanitized: data
      };
    }

    const result: ValidationResult = {
      valid: true,
      errors: [],
      warnings: [],
      sanitized: { ...data }
    };

    Object.entries(schema).forEach(([field, fieldSchema]) => {
      let value = data[field];

      // Check if required
      if (fieldSchema.required && (value === undefined || value === null || value === '')) {
        result.valid = false;
        result.errors.push(`${field} is required`);
        
        // Use default value if available
        if (fieldSchema.defaultValue !== undefined) {
          result.sanitized[field] = fieldSchema.defaultValue;
        }
        return;
      }

      // Skip validation if field is not provided and not required
      if (value === undefined || value === null) {
        return;
      }

      // Apply sanitizers
      if (fieldSchema.sanitizers) {
        fieldSchema.sanitizers.forEach(sanitizer => {
          value = sanitizer.sanitize(value);
        });
        result.sanitized[field] = value;
      }

      // Apply validation rules
      fieldSchema.rules.forEach(rule => {
        const ruleResult = rule.validate(value);
        if (ruleResult !== true) {
          result.valid = false;
          const message = typeof ruleResult === 'string' ? ruleResult : (rule.message || `${field} validation failed`);
          result.errors.push(message);
        }
      });
    });

    // Store validation history
    const history = this.validationHistory.get(schemaName) || [];
    history.push({
      ...result,
      timestamp: Date.now()
    });
    
    // Keep only last 100 validations
    if (history.length > 100) {
      history.splice(0, history.length - 100);
    }
    
    this.validationHistory.set(schemaName, history);

    return result;
  }

  sanitize(value: any, type: 'html' | 'sql' | 'xss' | 'all' = 'all'): any {
    if (typeof value !== 'string') {
      return value;
    }

    let sanitized = value;

    switch (type) {
      case 'html':
        sanitized = this.escapeHtml(sanitized);
        break;
      case 'sql':
        if (this.containsSqlInjection(sanitized)) {
          throw new Error('Potential SQL injection detected');
        }
        break;
      case 'xss':
        if (this.containsXss(sanitized)) {
          sanitized = this.escapeHtml(sanitized);
        }
        break;
      case 'all':
        sanitized = this.escapeHtml(sanitized);
        if (this.containsSqlInjection(sanitized)) {
          throw new Error('Potential SQL injection detected');
        }
        if (this.containsXss(sanitized)) {
          sanitized = this.escapeHtml(sanitized);
        }
        break;
    }

    return sanitized;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  validatePassword(password: string): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    if (password.length < 8) {
      issues.push('Password must be at least 8 characters');
    }
    
    if (!/[a-z]/.test(password)) {
      issues.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[A-Z]/.test(password)) {
      issues.push('Password must contain at least one uppercase letter');
    }
    
    if (!/\d/.test(password)) {
      issues.push('Password must contain at least one number');
    }
    
    if (!/[@$!%*?&]/.test(password)) {
      issues.push('Password must contain at least one special character');
    }
    
    return {
      valid: issues.length === 0,
      issues
    };
  }

  validateAccountNumber(accountNumber: string): boolean {
    const normalized = accountNumber.replace(/[\s\-]/g, '');
    return /^\d{10,16}$/.test(normalized);
  }

  validateAmount(amount: number | string): { valid: boolean; error?: string } {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    if (isNaN(num)) {
      return { valid: false, error: 'Invalid number format' };
    }
    
    if (num <= 0) {
      return { valid: false, error: 'Amount must be positive' };
    }
    
    if (num > 10000000) {
      return { valid: false, error: 'Amount exceeds maximum limit' };
    }
    
    if (!/^\d+(\.\d{1,2})?$/.test(num.toString())) {
      return { valid: false, error: 'Amount can have maximum 2 decimal places' };
    }
    
    return { valid: true };
  }

  validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  validateDate(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return false;
    }
    
    const parsed = new Date(date);
    return parsed instanceof Date && !isNaN(parsed.getTime());
  }

  validateTime(time: string): boolean {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  validateIndianPincode(pincode: string): boolean {
    return /^\d{6}$/.test(pincode);
  }

  validateIndianPAN(pan: string): boolean {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());
  }

  validateIndianAadhaar(aadhaar: string): boolean {
    return /^\d{12}$/.test(aadhaar.replace(/[\s\-]/g, ''));
  }

  getValidationHistory(schemaName: string): ValidationResult[] {
    return this.validationHistory.get(schemaName) || [];
  }

  clearValidationHistory(schemaName?: string): void {
    if (schemaName) {
      this.validationHistory.delete(schemaName);
    } else {
      this.validationHistory.clear();
    }
  }

  // React hook for form validation
  useFormValidation(schemaName: string, initialData: any = {}) {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState<string[]>([]);
    const [isValid, setIsValid] = useState(false);
    const [touched, setTouched] = useState<Set<string>>(new Set());

    const validate = useCallback((formData: any = data) => {
      const result = this.validate(schemaName, formData);
      setErrors(result.errors);
      setIsValid(result.valid);
      setData(result.sanitized);
      return result;
    }, [schemaName, data]);

    const setFieldValue = useCallback((field: string, value: any) => {
      const newData = { ...data, [field]: value };
      setData(newData);
      setTouched(prev => new Set(Array.from(prev).concat([field])));
      
      if (touched.has(field) || touched.size > 0) {
        validate(newData);
      }
    }, [data, touched, validate]);

    const setFieldTouched = useCallback((field: string) => {
      setTouched(prev => new Set(Array.from(prev).concat([field])));
      validate(data);
    }, [data, validate]);

    const reset = useCallback(() => {
      setData(initialData);
      setErrors([]);
      setIsValid(false);
      setTouched(new Set());
    }, [initialData]);

    return {
      data,
      errors,
      isValid,
      touched,
      setFieldValue,
      setFieldTouched,
      validate,
      reset
    };
  }
}

// React hook
export function useFormValidation(schemaName: string, initialData: any = {}) {
  const validator = InputValidator.getInstance();
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const validate = useCallback((formData: any = data) => {
    const result = validator.validate(schemaName, formData);
    setErrors(result.errors);
    setIsValid(result.valid);
    setData(result.sanitized);
    return result;
  }, [schemaName, data]);

  const setFieldValue = useCallback((field: string, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    setTouched(prev => new Set(Array.from(prev).concat([field])));
    
    if (touched.has(field) || touched.size > 0) {
      validate(newData);
    }
  }, [data, touched, validate]);

  const setFieldTouched = useCallback((field: string) => {
    setTouched(prev => new Set(Array.from(prev).concat([field])));
    validate(data);
  }, [data, validate]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors([]);
    setIsValid(false);
    setTouched(new Set());
  }, [initialData]);

  return {
    data,
    errors,
    isValid,
    touched,
    setFieldValue,
    setFieldTouched,
    validate,
    reset
  };
}

// Export singleton
export const inputValidator = InputValidator.getInstance();
export default InputValidator;
