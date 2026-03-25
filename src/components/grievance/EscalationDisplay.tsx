'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface EscalationDisplayProps {
  locale: 'en' | 'hi';
  currentLevel: number;
  canEscalate: boolean;
  onEscalate?: () => void;
  className?: string;
}

interface EscalationLevel {
  level: number;
  title: string;
  titleHi: string;
  timeline: string;
  timelineHi: string;
  contact: string;
  phone: string;
  description: string;
  descriptionHi: string;
}

const EscationDisplay: React.FC<EscalationDisplayProps> = ({ 
  locale, 
  currentLevel, 
  canEscalate, 
  onEscalate,
  className = '' 
}) => {
  const { t } = useTranslation(locale);
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    trackPageView('Escalation Matrix', locale === 'hi' ? 'एस्केलेशन मैट्रिक्स' : 'Escalation Matrix');
  }, [locale]);

  const escalationLevels: EscalationLevel[] = [
    {
      level: 0,
      title: 'Branch Manager',
      titleHi: 'शाखा प्रबंधक',
      timeline: '24 hours',
      timelineHi: '24 घंटे',
      contact: 'branch.manager@bank.com',
      phone: '1800-123-4567',
      description: 'First point of contact for grievance resolution at branch level',
      descriptionHi: 'शाखा स्तर पर शिकायत समाधान के लिए पहला संपर्क बिंदु'
    },
    {
      level: 1,
      title: 'Regional Manager',
      titleHi: 'क्षेत्रीय प्रबंधक',
      timeline: '48 hours',
      timelineHi: '48 घंटे',
      contact: 'regional.manager@bank.com',
      phone: '1800-234-5678',
      description: 'Regional authority for escalated grievances requiring higher intervention',
      descriptionHi: 'उच्च हस्तक्षेप की आवश्यकता वाले एस्केलेटेड शिकायतों के लिए क्षेत्रीय अधिकारी'
    },
    {
      level: 2,
      title: 'Head of Customer Service',
      titleHi: 'ग्राहक सेवा प्रमुख',
      timeline: '72 hours',
      timelineHi: '72 घंटे',
      contact: 'head.customer@bank.com',
      phone: '1800-345-6789',
      description: 'Senior management authority for complex or unresolved grievances',
      descriptionHi: 'जटिल या अनसुलव शिकायतों के लिए वरिष्ठ अधिकारी'
    },
    {
      level: 3,
      title: 'RBI Ombudsman',
      titleHi: 'आरबीआई ओम्बड्समैन',
      timeline: '30 days',
      timelineHi: '30 दिन',
      contact: 'https://rbi.org.in',
      phone: '1800-456-7890',
      description: 'Final authority for grievance resolution as per RBI guidelines',
      descriptionHi: 'आरबीआई दिशानिर्देश के अनुसार अंतिम अधिकारी'
    }
  ];

  const handleEscalate = async () => {
    if (!canEscalate || !onEscalate) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onEscalate();
    } catch (error) {
      console.error('Escalation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLevelExpansion = (level: number) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  const getLevelStatus = (level: number) => {
    if (level < currentLevel) return 'completed';
    if (level === currentLevel) return 'current';
    if (level === currentLevel + 1 && canEscalate) return 'available';
    return 'locked';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'current':
        return 'bg-blue-100 text-blue-800';
      case 'available':
        return 'bg-yellow-100 text-yellow-800';
      case 'locked':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { en: string; hi: string }> = {
      'completed': { en: 'Completed', hi: 'पूर्ण' },
      'current': { en: 'Current Level', hi: 'वर्तमान स्तर' },
      'available': { en: 'Available', hi: 'उपलब्ध' },
      'locked': { en: 'Not Available', hi: 'अनुपलब्ध' }
    };
    return statusMap[status]?.[locale] || status;
  };

  const getLevelIcon = (level: number) => {
    const icons = [
      '🏢', // Branch
      '🏢', // Regional
      '🏢', // Head Office
      '🏛️'  // RBI
    ];
    return icons[level] || '🏢';
  };

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'hi' ? 'एस्केलेशन मैट्रिक्स' : 'Escalation Matrix'}
        </h2>
        <p className="text-gray-600">
          {locale === 'hi' 
            ? 'शिकायत समाधान के लिए एस्केलेशन पथ और समयरेखा'
            : 'Grievance resolution escalation path and timeline'
          }
        </p>
      </div>

      {/* Current Status */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          {locale === 'hi' ? 'वर्तमान स्थिति' : 'Current Status'}
        </h3>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <span className="text-2xl mr-2">{getLevelIcon(currentLevel)}</span>
            <div>
              <p className="font-medium text-blue-900">
                {escalationLevels[currentLevel]?.[`title${locale === 'hi' ? 'Hi' : ''}` as keyof EscalationLevel]}
              </p>
              <p className="text-sm text-blue-700">
                {locale === 'hi' ? 'स्तर' : 'Level'} {currentLevel + 1}
              </p>
            </div>
          </div>
          <div className="text-blue-700">
            <p className="font-medium">
              {locale === 'hi' ? 'समयरेखा समय' : 'Response Time'}: {escalationLevels[currentLevel]?.[`timeline${locale === 'hi' ? 'Hi' : ''}` as keyof EscalationLevel]}
            </p>
            <p className="text-sm">
              {locale === 'hi' ? 'संपर्क' : 'Contact'}: {escalationLevels[currentLevel]?.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Escalation Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === 'hi' ? 'एस्केलेशन पथ' : 'Escalation Path'}
        </h3>

        {escalationLevels.map((level, index) => {
          const status = getLevelStatus(level.level);
          const isExpanded = expandedLevel === level.level;
          const isClickable = status === 'available' && canEscalate;

          return (
            <div
              key={level.level}
              className={`border rounded-lg transition-all ${isExpanded ? 'border-bank-blue-300 bg-bank-blue-50' : 'border-gray-200'}`}
            >
              <div
                className={`p-4 cursor-pointer ${isClickable ? 'hover:bg-gray-50' : ''}`}
                onClick={() => toggleLevelExpansion(level.level)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{getLevelIcon(level.level)}</span>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-semibold text-gray-900 mr-2">
                          {level[`title${locale === 'hi' ? 'Hi' : ''}` as keyof EscalationLevel]}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {getStatusText(status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {locale === 'hi' ? 'स्तर' : 'Level'} {level.level + 1} • {level[`timeline${locale === 'hi' ? 'Hi' : ''}` as keyof EscalationLevel]}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">
                        {locale === 'hi' ? 'विवरण' : 'Description'}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {level[`description${locale === 'hi' ? 'Hi' : ''}` as keyof EscalationLevel]}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">
                        {locale === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
                      </h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">{locale === 'hi' ? 'ईमेल' : 'Email'}:</span> {level.contact}
                        </p>
                        <p>
                          <span className="font-medium">{locale === 'hi' ? 'फोन' : 'Phone'}:</span> {level.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Escalate Button for Available Level */}
                  {status === 'available' && canEscalate && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-yellow-700 font-medium">
                            {locale === 'hi' 
                              ? 'इस स्तर पर एस्केलेट करने के लिए तैयार है'
                              : 'Ready to escalate to this level'
                            }
                          </p>
                          <p className="text-xs text-yellow-600">
                            {locale === 'hi' 
                              ? 'एस्केलेशन अपरिवर्तनीय होगी और समय बढ़ सकता है'
                              : 'Escalation will be confirmed and timeline may extend'
                            }
                          </p>
                        </div>
                        <button
                          onClick={handleEscalate}
                          disabled={loading}
                          className="btn-warning px-6 py-2 disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-2 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a2 2 0 012-2z" />
                              </svg>
                              {locale === 'hi' ? 'एस्केलेट हो रहा है...' : 'Escalating...'}
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18l-1 7-7v4a2 2 0 012-2z" />
                              </svg>
                              {locale === 'hi' ? 'एस्केलेट करें' : 'Escalate to This Level'}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Completion Status for Completed Levels */}
                  {status === 'completed' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center text-green-700">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a2 2 0 012 2v6a2 2 0 012-2z" />
                        </svg>
                        <span className="font-medium">
                          {locale === 'hi' ? 'इस स्तर पर पहले ही एस्केलेट किया गया' : 'Already escalated to this level'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Locked Status for Higher Levels */}
                  {status === 'locked' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center text-gray-500">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 012-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10 10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="font-medium">
                          {locale === 'hi' 
                            ? 'पिछले स्तरों को पूरा करने के बाद उपलब्ध होगा'
                            : 'This level becomes available after completing previous levels'
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Important Notes */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-900 mb-3">
          {locale === 'hi' ? 'महत्वपूर्ण नोट्स' : 'Important Notes'}
        </h3>
        <ul className="space-y-2 text-sm text-yellow-700">
          <li className="flex items-start">
            <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {locale === 'hi' 
                ? 'प्रत्येक एस्केलेशन स्तर में अलग-अलग समय लग सकता है'
                : 'Each escalation level has its own timeline and may extend the resolution time'
              }
            </span>
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {locale === 'hi' 
                ? 'आरबीआई ओम्बड्समैन अंतिम अधिकारी है और केवल तब ही उपयोग किया जा सकता है जब सभी पिछले स्तर पूरे हो जाएं'
                : 'RBI Ombudsman is the final authority and can only be approached after all previous levels are completed'
              }
            </span>
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {locale === 'hi' 
                ? 'सभी एस्केलेशन अनुरोध और दस्तावेज रखे जाते हैं'
                : 'All escalations are documented and tracked for audit purposes'
              }
            </span>
          </li>
        </ul>
      </div>

      {/* Help Section */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {locale === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Help with Escalation?'}
        </h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            {locale === 'hi' 
              ? 'यदि आपको एस्केलेशन प्रक्रिया में कोई कठिनाई है, तो कृपया हमारे ग्राहक सेवा केंदर्ज करें:'
              : 'If you have any questions about the escalation process, please contact our customer service:'
            }
          </p>
          <div className="space-y-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2v3.28a2.491 2.491 0 011.014.322l.868.868c.283.228.514.5.868.868h.328c.491 0 .912.165 1.243.352l.868.868c.283.228.514.5.868.868h.328z" />
              </svg>
              <span>{locale === 'hi' ? 'ग्राहक सेवा' : 'Customer Service'}: 1800-123-4567</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22.37 1.48l.816.816a2 2 0 001.48.22.37L21 8a2 2 0 00-1-1.73l-.778-4.088V4a2 2 0 00-2-2H4a2 2 0 00-2 2v4.01z" />
              </svg>
              <span>{locale === 'hi' ? 'ईमेल' : 'Email'}: escalation@bank.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscationDisplay;
