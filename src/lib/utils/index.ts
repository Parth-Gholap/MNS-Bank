// Utility Functions for Mahanagar Bank Website

export const utils = {
  // String utilities
  truncate: (str: string, length: number): string => {
    return str.length > length ? `${str.substring(0, length)}...` : str;
  },

  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  formatCurrency: (amount: number, currency = '₹'): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  formatNumber: (num: number, locale = 'en-IN'): string => {
    return new Intl.NumberFormat(locale).format(num);
  },

  formatDate: (date: Date, locale = 'en-IN'): string => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  },

  // Validation utilities
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidMobile: (mobile: string): boolean => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  },

  isValidPincode: (pincode: string): boolean => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  },

  // URL utilities
  getBaseUrl: (url: string): string => {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}`;
  },

  // Storage utilities
  storage: {
    get: (key: string): string | null => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    },

    set: (key: string, value: string): void => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    },

    remove: (key: string): void => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    },

    clear: (): void => {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
    }
  },

  // Debounce utility
  debounce: <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: any[]) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle utility
  throttle: <T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): ((...args: any[]) => void) => {
    let inThrottle: boolean;
    return (...args: any[]) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Generate unique ID
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Scroll utilities
  scrollToTop: (): void => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  },

  scrollToElement: (element: HTMLElement): void => {
    if (typeof window !== 'undefined') {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  // Copy to clipboard
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const result = document.execCommand('copy');
        textArea.remove();
        return result;
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  },

  // Download file
  downloadFile: (data: string, filename: string, type = 'text/plain'): void => {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  // Check if mobile device
  isMobile: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  },

  // Check if tablet device
  isTablet: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  },

  // Check if desktop device
  isDesktop: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 1024;
  }
};

export default utils;
