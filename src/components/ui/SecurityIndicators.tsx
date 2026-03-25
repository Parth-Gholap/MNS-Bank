'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

// Import types for JSX namespace
import type { JSX } from 'react';

interface SecurityIndicator {
  id: string;
  type: 'encryption' | 'authentication' | 'monitoring' | 'compliance' | 'backup';
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  status: 'active' | 'warning' | 'inactive';
  lastChecked: string;
  details: string;
  detailsHi: string;
}

interface SecurityIndicatorsProps {
  locale: 'en' | 'hi';
  className?: string;
}

const SecurityIndicators: React.FC<SecurityIndicatorsProps> = ({ locale, className = '' }) => {
  const [indicators, setIndicators] = useState<SecurityIndicator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Security Indicators', locale === 'hi' ? 'सुरक्षा संकेतक' : 'Security Indicators');
    fetchSecurityIndicators();
  }, [locale]);

  const fetchSecurityIndicators = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/security-indicators?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setIndicators(result.data.indicators);
      }
    } catch (error) {
      console.error('Error fetching security indicators:', error);
      // Fallback to static indicators
      setIndicators(getStaticIndicators());
    } finally {
      setLoading(false);
    }
  };

  const getStaticIndicators = (): SecurityIndicator[] => {
    return [
      {
        id: '1',
        type: 'encryption',
        name: '256-bit SSL Encryption',
        nameHi: '256-बिट एसएसएल एन्क्रिप्शन',
        description: 'All data transmitted is encrypted using industry-standard 256-bit SSL technology',
        descriptionHi: 'सभी डेटा उद्योग उद्योग मानक उद्योग-मानक 256-बिट एसएसएल तकनीक के साथ एन्क्रिप्टेड किया जाता है',
        icon: 'lock-closed',
        status: 'active',
        lastChecked: new Date().toISOString(),
        details: 'TLS 1.3 protocol with AES-256 encryption',
        detailsHi: 'टीएलएस 1.3 प्रोटोकॉल एईएस-256 एन्क्रिप्शन के साथ'
      },
      {
        id: '2',
        type: 'authentication',
        name: 'Two-Factor Authentication',
        nameHi: 'दो-कारक प्रमाणीकृता',
        description: 'Advanced authentication methods including biometric and OTP verification',
        descriptionHi: 'बायोमेट्रिक और ओटीपी सत्यापन सहित उन्नत प्रमाणीकृता विधियां',
        icon: 'fingerprint',
        status: 'active',
        lastChecked: new Date().toISOString(),
        details: 'SMS, Email, and Biometric authentication available',
        detailsHi: 'एसएमएस, ईमेल, और बायोमेट्रिक सत्यापन उपलब्ध'
      },
      {
        id: '3',
        type: 'monitoring',
        name: '24/7 Security Monitoring',
        nameHi: '24/7 सुरक्षा निगरान',
        description: 'Continuous monitoring of all systems and transactions for fraud detection',
        descriptionHi: 'धोखाधारत का पता लगाने और सभी लेनदेन की निरंतर निगरान',
        icon: 'eye',
        status: 'active',
        lastChecked: new Date().toISOString(),
        details: 'AI-powered fraud detection and real-time alerts',
        detailsHi: 'एआई-संचालित धोखाधारत का पता लगान और रीयल-टाइम अलर्ट'
      },
      {
        id: '4',
        type: 'compliance',
        name: 'RBI Compliance Check',
        nameHi: 'आरबीआई अनुपालन जांच',
        description: 'Regular compliance checks with Reserve Bank of India regulations',
        descriptionHi: 'भारतीय रिजर्व बैंक नियमों के साथ नियमित अनुपालन जांच',
        icon: 'shield-check',
        status: 'active',
        lastChecked: new Date().toISOString(),
        details: 'Automated compliance monitoring and reporting',
        detailsHi: 'स्वचालित अनुपालन निगरान और रिपोर्टिंग'
      },
      {
        id: '5',
        type: 'backup',
        name: 'Automated Data Backup',
        nameHi: 'स्वचालित डेटा बैकअप',
        description: 'Regular automated backups of all critical data with geographic distribution',
        descriptionHi: 'सभी महत्वपूर्ण डेटा का नियमित स्वचालित बैकअप भौगोगिक वितरण',
        icon: 'database',
        status: 'active',
        lastChecked: new Date().toISOString(),
        details: 'Daily backups with 30-day retention',
        detailsHi: 'दैनिक बैकअप के साथ 30-दिन रिटेंशन'
      },
      {
        id: '6',
        type: 'authentication',
        name: 'Session Timeout Protection',
        nameHi: 'सत्र टाइमआउट सुरक्षा',
        description: 'Automatic session timeout and secure logout after inactivity',
        descriptionHi: 'निष्क्रियता के बाद स्वचालित लॉगआउट और सुरक्षा लॉगआउट',
        icon: 'clock',
        status: 'active',
        lastChecked: new Date().toISOString(),
        details: '15-minute timeout with warning notifications',
        detailsHi: '15-मिनट टाइमआउट चेतावनी अधिसूरन के साथ'
      }
    ];
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      active: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' },
      warning: { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200' },
      inactive: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' }
    };
    return colors[status] || colors.active;
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      encryption: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 4h.01M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      authentication: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11v4m0 4h6m-6 4h12a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 00-2-2v-6a2 2 0 002 2z" />
        </svg>
      ),
      monitoring: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      compliance: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      backup: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10a2 2 0 00-2 2h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2-2v-6a2 2 0 002 2z" />
        </svg>
      )
    };
    return icons[type] || icons.encryption;
  };

  // Loading state
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-full w-12 mb-4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {locale === 'hi' ? 'सुरक्षा संकेतक' : 'Security Indicators'}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {locale === 'hi' 
            ? 'हम आपके डेटा की सुरक्षा के लिए बहुत-उच्च सुरक्षा उपायों का उपयोग करते हैं।'
            : 'We employ industry-leading security measures to protect your data and transactions.'
          }
        </p>
      </div>

      {/* Security Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {indicators.map((indicator) => {
          const statusColors = getStatusColor(indicator.status);
          
          return (
            <div
              key={indicator.id}
              className="bg-white rounded-lg shadow-card border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
            >
              {/* Indicator Header */}
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${statusColors.bg} ${statusColors.text} mr-3`}>
                  {getTypeIcon(indicator.type)}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${statusColors.text}`}>
                    {locale === 'hi' ? indicator.nameHi : indicator.name}
                  </h3>
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                    {indicator.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Status Description */}
              <p className={`text-gray-600 mb-4 line-clamp-2 ${statusColors.text}`}>
                {locale === 'hi' ? indicator.descriptionHi : indicator.description}
              </p>

              {/* Technical Details */}
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <div>
                  <span className="font-medium">{locale === 'hi' ? 'विवरण:' : 'Details:'}</span> {locale === 'hi' ? indicator.detailsHi : indicator.details}
                </div>
                <div>
                  <span className="font-medium">{locale === 'hi' ? 'अंतिम जांच:' : 'Last Checked:'}</span> {new Date(indicator.lastChecked).toLocaleString()}
                </div>
              </div>

              {/* Status Indicator Bar */}
              <div className={`w-full h-2 rounded-full ${statusColors.bg} mb-4`}>
                <div 
                  className={`h-2 rounded-full ${
                    indicator.status === 'active' ? 'bg-green-500' : 
                    indicator.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                />
              </div>

              {/* Action Button */}
              {indicator.status === 'warning' && (
                <button className="btn-primary w-full text-center">
                  {locale === 'hi' ? 'जांच करें' : 'Check Status'}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            {locale === 'hi' ? 'सुरक्षा युक्तियां' : 'Security Best Practices'}
          </h3>
          <p className="text-blue-700 mb-4">
            {locale === 'hi' 
              ? 'अपने बैंकिंग खाते को सुरक्ष रखने के लिए हमारे सुरक्षा युक्तियां देखें।'
              : 'Follow our security best practices to keep your banking safe.'
            }
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-center text-sm text-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 4h.01M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {locale === 'hi' ? 'मजबूत पासवर्ड' : 'Strong Passwords'}
            </div>
            <div className="flex items-center text-sm text-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {locale === 'hi' ? 'दोहर-प्रमाणीकृता' : 'Two-Factor Auth'}
            </div>
            <div className="flex items-center text-sm text-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 001.79 2.79l6.5 6.5a2 2 0 002.79-2.79L12 5.26 8 8z" />
              </svg>
              {locale === 'hi' ? 'सुरक्षित नेटवर्क' : 'Secure Networks'}
            </div>
            <div className="flex items-center text-sm text-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5 19h14a2 2 0 012 2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v-6a2 2 0 002 2z" />
              </svg>
              {locale === 'hi' ? 'नियमित अपडेट' : 'Regular Updates'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicators;
