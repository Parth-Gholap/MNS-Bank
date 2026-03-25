import React from 'react';

export interface ReCAPTCHAConfig {
  siteKey: string;
  secretKey: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
  language?: string;
  callback?: (response: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
}

export interface ReCAPTCHAValidationResult {
  success: boolean;
  challenge_ts?: number;
  hostname?: string;
  'error-codes'?: string[];
}

export interface ReCAPTCHAWidget {
  render: (container: string | HTMLElement, parameters: ReCAPTCHAConfig) => void;
  reset: () => void;
  getResponse: () => string;
}

declare global {
  interface Window {
    grecaptcha: ReCAPTCHAWidget;
  }
}

class ReCAPTCHA {
  private static instance: ReCAPTCHA;
  private config: ReCAPTCHAConfig;
  private isLoaded: boolean = false;
  private loadPromise: Promise<void> | null = null;

  constructor(config: ReCAPTCHAConfig) {
    this.config = {
      theme: 'light',
      size: 'normal',
      language: 'en',
      ...config
    };
  }

  static getInstance(config: ReCAPTCHAConfig): ReCAPTCHA {
    if (!ReCAPTCHA.instance) {
      ReCAPTCHA.instance = new ReCAPTCHA(config);
    }
    return ReCAPTCHA.instance;
  }

  async load(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise((resolve, reject) => {
      // Check if grecaptcha is already loaded
      if (typeof window !== 'undefined' && window.grecaptcha) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // Load reCAPTCHA script
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${this.config.language}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load reCAPTCHA'));
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  async renderWidget(container: string | HTMLElement): Promise<string> {
    await this.load();

    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA not loaded');
    }

    return new Promise((resolve, reject) => {
      try {
        window.grecaptcha.render(container, {
          siteKey: this.config.siteKey,
          theme: this.config.theme,
          size: this.config.size,
          secretKey: this.config.secretKey,
          callback: (response: string) => {
            resolve(response);
          },
          'expired-callback': () => {
            reject(new Error('reCAPTCHA expired'));
          },
          'error-callback': () => {
            reject(new Error('reCAPTCHA error'));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  reset(): void {
    if (this.isLoaded && window.grecaptcha) {
      window.grecaptcha.reset();
    }
  }

  getResponse(): string | null {
    if (this.isLoaded && window.grecaptcha) {
      return window.grecaptcha.getResponse();
    }
    return null;
  }

  async verifyToken(token: string): Promise<ReCAPTCHAValidationResult> {
    try {
      const response = await fetch('/api/recaptcha/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          secret: this.config.secretKey
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return {
        success: false,
        'error-codes': ['verification-failed']
      };
    }
  }

  isReady(): boolean {
    return this.isLoaded && typeof window !== 'undefined' && !!window.grecaptcha;
  }
}

// Default configuration
const defaultConfig: ReCAPTCHAConfig = {
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAG_c-vXJeOVTiTmjlgUNESY4aWZ',
  secretKey: process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGAJUc5rW33RzOZcJnR-IxEk',
  theme: 'light',
  size: 'normal',
  language: 'en'
};

// Export singleton instance
export const recaptcha = ReCAPTCHA.getInstance(defaultConfig);

// Helper functions
export const loadReCAPTCHA = async (): Promise<void> => {
  await recaptcha.load();
};

export const renderReCAPTCHA = async (container: string | HTMLElement): Promise<string> => {
  return await recaptcha.renderWidget(container);
};

export const resetReCAPTCHA = (): void => {
  recaptcha.reset();
};

export const getReCAPTCHAResponse = (): string | null => {
  return recaptcha.getResponse();
};

export const verifyReCAPTCHAToken = async (token: string): Promise<ReCAPTCHAValidationResult> => {
  return await recaptcha.verifyToken(token);
};

// React Hook
export const useReCAPTCHA = (config?: Partial<ReCAPTCHAConfig>) => {
  const [isReady, setIsReady] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const instance = ReCAPTCHA.getInstance({ ...defaultConfig, ...config });
    
    const init = async () => {
      try {
        setIsLoading(true);
        await instance.load();
        setIsReady(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reCAPTCHA');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [config]);

  const execute = async (container: string | HTMLElement): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await recaptcha.renderWidget(container);
      setToken(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to render reCAPTCHA';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verify = async (): Promise<boolean> => {
    if (!token) {
      setError('No reCAPTCHA token available');
      return false;
    }

    try {
      setIsLoading(true);
      const result = await recaptcha.verifyToken(token);
      
      if (result.success) {
        setError(null);
        return true;
      } else {
        setError('reCAPTCHA verification failed');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    recaptcha.reset();
    setToken(null);
    setError(null);
  };

  return {
    isReady,
    token,
    isLoading,
    error,
    execute,
    verify,
    reset
  };
};

// Server-side verification
export const verifyReCAPTCHAServerSide = async (token: string, secret: string): Promise<ReCAPTCHAValidationResult> => {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret,
      response: token
    })
  });

  const result = await response.json();
  return result;
};

// Utility functions
export const getReCAPTCHAScriptUrl = (language: string = 'en'): string => {
  return `https://www.google.com/recaptcha/api.js?render=explicit&hl=${language}`;
};

export const isValidReCAPTCHAToken = (token: string): boolean => {
  // Basic validation - token should be a non-empty string
  return typeof token === 'string' && token.length > 0;
};

export const formatReCAPTCHAErrorMessage = (error: string, locale: 'en' | 'hi' = 'en'): string => {
  const errorMessages: Record<string, { en: string; hi: string }> = {
    'missing-input-secret': {
      en: 'The secret parameter is missing',
      hi: 'सीक्रेट पैरामीटर गुम है'
    },
    'invalid-input-secret': {
      en: 'The secret parameter is invalid or malformed',
      hi: 'सीक्रेट पैरामीटर अमान्य या विकृत है'
    },
    'invalid-input-response': {
      en: 'The response parameter is invalid or malformed',
      hi: 'प्रतिक्रिया पैरामीटर अमान्य या विकृत है'
    },
    'timeout-or-duplicate': {
      en: 'The response is no longer valid',
      hi: 'प्रतिक्रिया अब वैध नहीं है'
    },
    'verification-failed': {
      en: 'reCAPTCHA verification failed',
      hi: 'reCAPTCHA सत्यापन विफल'
    }
  };

  return errorMessages[error]?.[locale] || error;
};

// Export for testing
export const mockReCAPTCHA = {
  load: () => Promise.resolve(),
  renderWidget: () => Promise.resolve('mock-token'),
  reset: () => {},
  getResponse: () => 'mock-token',
  verifyToken: () => Promise.resolve({ success: true }),
  isReady: () => true
};
