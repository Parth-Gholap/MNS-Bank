import React, { useState, useEffect } from 'react';

interface AccessibilityProps {
  locale: 'en' | 'hi';
  children: React.ReactNode;
}

const AccessibilityWrapper: React.FC<AccessibilityProps> = ({ locale, children }) => {
  const [skipToContent, setSkipToContent] = useState(false);

  useEffect(() => {
    // Announce page changes to screen readers
    const announcement = locale === 'hi' 
      ? 'पृष्ठ लोड हो गई है'
      : 'Page loaded';
    
    const announcementElement = document.getElementById('page-announcement');
    if (announcementElement) {
      announcementElement.textContent = announcement;
    }
  }, [locale]);

  const handleSkipToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <button
        onClick={handleSkipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-bank-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-bank-blue-500"
      >
        {locale === 'hi' ? 'मुख्य सामग्री पर जाएं' : 'Skip to main content'}
      </button>

      {/* Screen reader announcements */}
      <div
        id="page-announcement"
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Main content with proper semantic markup */}
      <main id="main-content" role="main" tabIndex={-1}>
        {children}
      </main>

      {/* Accessibility footer */}
      <footer role="contentinfo" className="bg-gray-100 py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            <p>
              {locale === 'hi' 
                ? 'यह वेबसाइट WCAG 2.1 AA मानकों के अनुसार बनाई गई है'
                : 'This website is built to WCAG 2.1 AA standards'
              }
            </p>
            <div className="mt-2 space-x-4">
              <button
                onClick={() => {
                  // Increase font size
                  document.documentElement.style.fontSize = '120%';
                }}
                className="text-bank-blue-600 hover:text-bank-blue-800 underline"
                aria-label={locale === 'hi' ? 'फ़ॉंट आकार बढ़ाएं' : 'Increase font size'}
              >
                {locale === 'hi' ? 'फ़ॉन्ट बढ़ाएं' : 'Increase Font'}
              </button>
              <button
                onClick={() => {
                  // Reset font size
                  document.documentElement.style.fontSize = '100%';
                }}
                className="text-bank-blue-600 hover:text-bank-blue-800 underline"
                aria-label={locale === 'hi' ? 'फ़ॉन्ट आकार रीसेट करें' : 'Reset font size'}
              >
                {locale === 'hi' ? 'फ़ॉन्ट रीसेट' : 'Reset Font'}
              </button>
              <button
                onClick={() => {
                  // Toggle high contrast
                  document.body.classList.toggle('high-contrast');
                }}
                className="text-bank-blue-600 hover:text-bank-blue-800 underline"
                aria-label={locale === 'hi' ? 'उच्च कंट्रास्ट टॉगल करें' : 'Toggle high contrast'}
              >
                {locale === 'hi' ? 'उच्च कंट्रास्ट' : 'High Contrast'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* High contrast styles */}
      <style jsx>{`
        .high-contrast {
          filter: contrast(1.5);
        }
        .high-contrast img {
          filter: grayscale(1) contrast(1.5);
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .focus\\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: 0.5rem 1rem;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `}</style>
    </>
  );
};

// Accessible form input component
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const AccessibleInput: React.FC<AccessibleInputProps> = ({ 
  label, 
  error, 
  hint, 
  required = false, 
  id, 
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className="mb-4">
      <label 
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      <input
        id={inputId}
        aria-describedby={[
          hint && hintId,
          error && errorId
        ].filter(Boolean).join(' ')}
        aria-invalid={!!error}
        aria-required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-bank-blue-500 focus:border-bank-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {hint && (
        <p id={hintId} className="mt-1 text-sm text-gray-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Accessible button component
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  loadingText?: string;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({ 
  children, 
  variant = 'primary', 
  loading = false, 
  loadingText,
  disabled,
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-bank-blue-600 text-white hover:bg-bank-blue-700 focus:ring-bank-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden="true"></span>
          {loadingText || (typeof children === 'string' ? children : 'Loading...')}
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Accessible modal component
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  locale: 'en' | 'hi';
}

const AccessibleModal: React.FC<AccessibleModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  locale 
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (isOpen) {
      // Focus trap
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
          aria-label={locale === 'hi' ? 'मोडल बंद करें' : 'Close modal'}
        />
        
        {/* Modal panel */}
        <div 
          ref={modalRef}
          className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
          tabIndex={-1}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-bank-blue-500 rounded-full p-1"
            aria-label={locale === 'hi' ? 'मोडल बंद करें' : 'Close modal'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal header */}
          <h2 id={titleId} className="text-xl font-semibold text-gray-900 mb-4">
            {title}
          </h2>

          {/* Modal content */}
          <div className="text-gray-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AccessibilityWrapper, AccessibleInput, AccessibleButton, AccessibleModal };
export default AccessibilityWrapper;
