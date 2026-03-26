import enMessages from '@/messages/en.json';
import hiMessages from '@/messages/hi.json';

export type Locale = 'en' | 'hi';

// Use a more flexible type to handle differences between message files
export type Messages = typeof enMessages & Partial<typeof hiMessages>;

export const messages: Record<Locale, any> = {
  en: enMessages as any,
  hi: hiMessages as any,
};

export const defaultLocale: Locale = 'en';

export function getLocale(): Locale {
  if (typeof window !== 'undefined') {
    const storedLocale = localStorage.getItem('mnsbank-locale') as Locale;
    if (storedLocale && ['en', 'hi'].includes(storedLocale)) {
      return storedLocale;
    }
  }
  return defaultLocale;
}

export function setLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mnsbank-locale', locale);
  }
}

export function useTranslation(locale: Locale = defaultLocale) {
  return {
    ...messages[locale] || messages[defaultLocale],
    t: (key: string, params?: Record<string, string | number>) => {
      return t(key, locale, params);
    }
  };
}

export function t(key: string, locale?: Locale, params?: Record<string, string | number>): string {
  const currentLocale = locale || getLocale();
  const messageSet = messages[currentLocale];
  
  // Nested key access (e.g., 'navigation.personal')
  const keys = key.split('.');
  let value: any = messageSet;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  let result = value || key;
  
  // Replace parameters in the message
  if (params && typeof result === 'string') {
    Object.entries(params).forEach(([param, replacement]) => {
      result = result.replace(new RegExp(`{{${param}}}`, 'g'), String(replacement));
    });
  }
  
  return result;
}

export function formatMessage(key: string, locale?: Locale, params?: Record<string, string | number>): string {
  return t(key, locale, params);
}

export function getTranslationKeys(obj: any, prefix = ''): string[] {
  const keys: string[] = [];
  
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...getTranslationKeys(obj[key], prefix ? `${prefix}.${key}` : key));
    } else {
      keys.push(prefix ? `${prefix}.${key}` : key);
    }
  }
  
  return keys;
}

export function validateTranslations(): { missing: string[]; extra: string[] } {
  const enKeys = getTranslationKeys(messages.en);
  const hiKeys = getTranslationKeys(messages.hi);
  
  const missing = enKeys.filter(key => !hiKeys.includes(key));
  const extra = hiKeys.filter(key => !enKeys.includes(key));
  
  return { missing, extra };
}

export function getTranslationStats(): { en: number; hi: number; total: number; completion: number } {
  const enKeys = getTranslationKeys(messages.en);
  const hiKeys = getTranslationKeys(messages.hi);
  
  return {
    en: enKeys.length,
    hi: hiKeys.length,
    total: enKeys.length,
    completion: (hiKeys.length / enKeys.length) * 100
  };
}

export function detectBrowserLocale(): Locale {
  if (typeof window !== 'undefined' && navigator.language) {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('hi')) {
      return 'hi';
    }
  }
  return defaultLocale;
}

export function initLocale(): Locale {
  const storedLocale = getLocale();
  if (storedLocale === defaultLocale) {
    const browserLocale = detectBrowserLocale();
    if (browserLocale !== defaultLocale) {
      setLocale(browserLocale);
      return browserLocale;
    }
  }
  return storedLocale;
}

export function isRTL(locale: Locale): boolean {
  // Hindi is not RTL, but function is ready for future RTL languages
  return false;
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

export function formatDate(date: Date | string, locale: Locale = defaultLocale, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const localeString = locale === 'hi' ? 'hi-IN' : 'en-US';
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return dateObj.toLocaleDateString(localeString, defaultOptions);
}

export function formatNumber(number: number, locale: Locale = defaultLocale, options?: Intl.NumberFormatOptions): string {
  const localeString = locale === 'hi' ? 'hi-IN' : 'en-US';
  return number.toLocaleString(localeString, options);
}

export function formatCurrency(amount: number, locale: Locale = defaultLocale, currency = 'INR'): string {
  const localeString = locale === 'hi' ? 'hi-IN' : 'en-US';
  return new Intl.NumberFormat(localeString, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export function pluralize(count: number, key: string, locale: Locale = defaultLocale): string {
  const pluralKey = count === 1 ? key : `${key}s`;
  return t(pluralKey, locale, { count });
}
