'use client';

import React, { useState, useEffect } from 'react';

interface FraudAlert {
  id: string;
  type: 'phishing' | 'scam' | 'fraud' | 'security';
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  link?: string;
}

interface FraudBannerProps {
  locale: 'en' | 'hi';
  className?: string;
}

const getStaticAlerts = (): FraudAlert[] => {
  return [
    {
      id: '1',
      type: 'phishing',
      title: 'Beware of Phishing Attempts',
      titleHi: 'फिशिंग के प्रयास से बचें',
      description: 'Fraudsters may impersonate bank officials via email or SMS asking for account details',
      descriptionHi: 'धोखाधारी ईमेल या एसएमएस के माध्यम से बैंक अधिकारी खाता विवरण मांग सकते हैं',
      severity: 'high',
      date: '2024-03-15',
      link: '/security/phishing-awareness'
    },
    {
      id: '2',
      type: 'scam',
      title: 'Fake Loan Offers',
      titleHi: 'नकली लोन ऑफर',
      description: 'Be cautious of unsolicited loan offers with guaranteed approval and advance fees',
      descriptionHi: 'गारंटीड स्वीकृति और अग्रिम शुल्क के साथ अवांछनिक लोन ऑफर से बचें',
      severity: 'medium',
      date: '2024-03-12',
      link: '/security/loan-scam-awareness'
    },
    {
      id: '3',
      type: 'fraud',
      title: 'UPI Payment Scams',
      titleHi: 'यूपीआई भुगतान स्कैम',
      description: 'Never share UPI PIN or OTP with anyone. Bank never asks for these details',
      descriptionHi: 'किसी के साथ भी यूपीआई पिन या ओटीपी साझा न करें। बैंक कभी यह जानकारी नहीं मांगता है',
      severity: 'critical',
      date: '2024-03-10',
      link: '/security/upi-safety'
    }
  ];
};

const FraudBanner: React.FC<FraudBannerProps> = ({ locale, className = '' }) => {
  const [alerts, setAlerts] = useState<FraudAlert[]>(getStaticAlerts());
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    fetchFraudAlerts();
  }, [locale]);

  const fetchFraudAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bank-data?type=alerts&locale=${locale}`);
      const result = await response.json();
      
      if (result.success && result.data && result.data.alerts && Array.isArray(result.data.alerts)) {
        setAlerts(result.data.alerts);
      }
    } catch (error) {
      console.error('Error fetching fraud alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      low: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
      medium: { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200' },
      high: { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
      critical: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' }
    };
    return colors[severity] || colors.low;
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      phishing: '🎣',
      scam: '⚠️',
      fraud: '🛡️',
      security: '🔒'
    };
    return icons[type] || icons.security;
  };

  const dismissAlert = (alertId: string) => {
    setDismissed([...dismissed, alertId]);
  };

  const isDismissed = (alertId: string) => dismissed.includes(alertId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'hi' ? 'en-IN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const activeAlerts = alerts.filter(alert => alert.id && !isDismissed(alert.id));

  // Loading state
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // No alerts state
  if (activeAlerts.length === 0) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-3xl">✅</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              {locale === 'hi' ? 'कोई सक्रिय धोखाधारत अलर्ट नहीं' : 'No Current Security Alerts'}
            </h3>
            <p className="text-green-700">
              {locale === 'hi' 
                ? 'वर्तमान में कोई सक्रिय धोखाधारत अलर्ट नहीं। हमारी सुरक्षा प्रणाली पर काम कर रहे हैं।'
                : 'There are currently no security alerts. We are continuously monitoring for threats.'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {locale === 'hi' ? 'धोखाधारत अलर्ट' : 'Security Alerts'}
        </h2>
        <a
          href="/security"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          {locale === 'hi' ? 'सभी सुरक्षा युक्तियां' : 'View All Security Tips'}
        </a>
      </div>

      {/* Alert Items */}
      {activeAlerts.map((alert) => {
        const severityColors = getSeverityColor(alert.severity || 'low');
        
        return (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${severityColors.bg} ${severityColors.border}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start flex-1">
                {/* Alert Icon */}
                <div className={`p-2 rounded-full ${severityColors.text} mr-3`}>
                  <span className="text-lg">{getTypeIcon(alert.type)}</span>
                </div>
                
                {/* Alert Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className={`text-lg font-semibold ${severityColors.text}`}>
                      {locale === 'hi' ? (alert.titleHi || alert.title) : (alert.title || 'Security Alert')}
                    </h3>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${severityColors.bg} ${severityColors.text}`}>
                      {(alert.severity || 'low').toUpperCase()}
                    </span>
                  </div>
                  
                  <p className={`${severityColors.text} mb-3`}>
                    {locale === 'hi' ? (alert.descriptionHi || alert.description) : (alert.description || 'Security alert description')}
                  </p>
                  
                  <div className="flex items-center text-sm opacity-75">
                    <span className="text-lg mr-2">📅</span>
                    {formatDate(alert.date || new Date().toISOString())}
                  </div>
                </div>
              </div>
              
              {/* Dismiss Button */}
              {alert.id && (
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className={`p-2 rounded-full ${severityColors.text} hover:bg-white hover:bg-opacity-20 transition-colors duration-200`}
                  aria-label={locale === 'hi' ? 'अलर्ट खारिज करें' : 'Dismiss alert'}
                >
                  <span className="text-lg">✕</span>
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Security Tips Link */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl">🔒</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              {locale === 'hi' ? 'सुरक्षा युक्तियां' : 'Security Best Practices'}
            </h4>
            <p className="text-blue-700 mb-3">
              {locale === 'hi' 
                ? 'अपने बैंकिंग खाते को सुरक्ष रखने के लिए हमारे सुरक्षा युक्तियां देखें।'
                : 'View our security best practices to keep your banking safe.'
              }
            </p>
            <a
              href="/security/tips"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              {locale === 'hi' ? 'युक्तियां देखें' : 'View Tips'}
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudBanner;
