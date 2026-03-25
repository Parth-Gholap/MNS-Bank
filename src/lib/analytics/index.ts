// Google Analytics 4 Configuration
import { config } from '@/lib/config';

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

// Analytics Events
export const analyticsEvents = {
  pageview: 'page_view',
  formSubmit: 'form_submit',
  ctaClick: 'cta_click',
  calculatorUse: 'calculator_use',
  languageToggle: 'language_toggle',
  navigationClick: 'navigation_click',
  grievanceSubmit: 'grievance_submit',
  accessibilityToolUse: 'accessibility_tool_use',
  error: 'error',
  search: 'search',
  filter: 'filter',
  sort: 'sort',
  download: 'download',
  view: 'view',
  edit: 'edit',
  delete: 'delete',
  close: 'close',
  cancel: 'cancel',
  save: 'save',
  next: 'next',
  previous: 'previous',
  first: 'first',
  last: 'last',
  page: 'page',
  of: 'of',
  results: 'results'
};

// Initialize Google Analytics
export const initializeGA = (): void => {
  if (typeof window !== 'undefined' && config.gaMeasurementId) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaMeasurementId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(arguments);
    };

    // Initialize with default pageview
    window.gtag('js', new Date(), {
      config: config.gaMeasurementId,
      page_title: document.title,
      page_location: window.location.href
    });
  }
};

// Track page view
export const trackPageView = (title: string, location?: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      config: config.gaMeasurementId,
      page_title: title,
      page_location: location || window.location.href
    });
  }
};

// Track custom events
export const trackEvent = (action: string, parameters?: Record<string, any>): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      config: config.gaMeasurementId,
      ...parameters
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formType: string, referenceNumber?: string): void => {
  trackEvent('form_submit', {
    form_type: formType,
    reference_number: referenceNumber
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaType: string, destination: string, productCategory?: string): void => {
  trackEvent('cta_click', {
    cta_type: ctaType,
    destination,
    product_category: productCategory
  });
};

// Track EMI calculator usage
export const trackCalculatorUse = (loanAmount: number, tenure: number, rate: number): void => {
  trackEvent('calculator_use', {
    loan_amount: loanAmount,
    tenure,
    rate
  });
};

// Track language toggle
export const trackLanguageToggle = (fromLanguage: string, toLanguage: string, page: string): void => {
  trackEvent('language_toggle', {
    from_language: fromLanguage,
    to_language: toLanguage,
    page
  });
};

// Track navigation clicks
export const trackNavigationClick = (section: string, item: string): void => {
  trackEvent('navigation_click', {
    section,
    item
  });
};

// Track grievance submissions
export const trackGrievanceSubmission = (referenceNumber?: string): void => {
  trackEvent('grievance_submit', {
    reference_number: referenceNumber
  });
};

// Track accessibility tool usage
export const trackAccessibilityToolUse = (tool: string): void => {
  trackEvent('accessibility_tool_use', {
    tool
  });
};

// Track errors
export const trackError = (error: string, context?: string): void => {
  trackEvent('error', {
    error_message: error,
    context
  });
};

// Track searches
export const trackSearch = (query: string, results: number): void => {
  trackEvent('search', {
    search_query: query,
    results_count: results
  });
};

// Track filters
export const trackFilter = (filterType: string, value: string): void => {
  trackEvent('filter', {
    filter_type: filterType,
    filter_value: value
  });
};

// Track sorts
export const trackSort = (sortBy: string, order: string): void => {
  trackEvent('sort', {
    sort_by: sortBy,
    sort_order: order
  });
};

// Track downloads
export const trackDownload = (fileName: string, fileType: string): void => {
  trackEvent('download', {
    file_name: fileName,
    file_type: fileType
  });
};

export default {
  initializeGA,
  trackPageView,
  trackEvent,
  trackFormSubmission,
  trackCTAClick,
  trackCalculatorUse,
  trackLanguageToggle,
  trackNavigationClick,
  trackGrievanceSubmission,
  trackAccessibilityToolUse,
  trackError,
  trackSearch,
  trackFilter,
  trackSort,
  trackDownload
};
