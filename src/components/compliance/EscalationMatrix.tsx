'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface EscalationMatrixProps {
  locale: 'en' | 'hi';
}

const EscalationMatrix: React.FC<EscalationMatrixProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  const escalationLevels = [
    {
      level: 1,
      title: locale === 'hi' ? 'स्तर 1: शाखा स्तर पर' : 'Level 1: Branch Level',
      description: locale === 'hi' 
        ? 'आपकी शिकायत शाखा सहकारी बैंक में उठाया जाता है। शाखा प्रबंधक प्रथम से आपकी समस्या का समाधान किया जाता है।'
        : 'Your complaint is first addressed at the branch level where you initially raised the issue. The branch manager is primarily responsible for resolving your concern.',
      timeline: locale === 'hi' ? '7 दिनों' : '7 days',
      actions: [
        locale === 'hi' ? 'शाखा प्रबंधक से सीधे लेना' : 'Discussion with branch manager',
        locale === 'hi' ? 'जांच करना' : 'Investigation',
        locale === 'hi' ? 'समाधान' : 'Resolution',
        locale === 'hi' ? 'प्रतिक्रिय' : 'Follow-up'
      ]
    },
    {
      level: 2,
      title: locale === 'hi' ? 'स्तर 2: सहाया अधिकारी' : 'Level 2: Assistant Manager',
      description: locale === 'hi' 
        ? 'यदि स्तर 1 पर समाधान नहीं हो, तो आपकी शिकायत सहाया अधिकारी को भेज दिया जाता है। अधिकारी अधिकारी शाखा सहकारी बैंक में आपकी समस्या का अधिक निवारण किया जाता है।'
        : 'If your complaint is not resolved at Level 1 within 7 days, it is escalated to the Assistant Manager for further investigation and resolution.',
      timeline: locale === 'hi' ? '15 दिनों' : '15 days',
      actions: [
        locale === 'hi' ? 'अधिक जांच' : 'Detailed review',
        locale === 'hi' ? 'विश्लेषण' : 'Analysis',
        locale === 'hi' ? 'समाधान प्रस्ताव' : 'Resolution proposal',
        locale === 'hi' ? 'अंतिम दिनाम' : 'Final decision'
      ]
    },
    {
      level: 3,
      title: locale === 'hi' ? 'स्तर 3: मुख्य प्रबंधक' : 'Level 3: Chief Manager',
      description: locale === 'hi' 
        ? 'यदि स्तर 2 पर भी समाधान नहीं हो, तो आपकी शिकायत मुख्य प्रबंधक को भेज दिया जाता है। मुख्य प्रबंधक शाखा सहकारी बैंक में आपकी समस्या का अंतिम निर्ण किया जाता है।'
        : 'If your complaint remains unresolved at Level 2 within 15 days, it is escalated to the Chief Manager for final review and decision.',
      timeline: locale === 'hi' ? '30 दिनों' : '30 days',
      actions: [
        locale === 'hi' ? 'वरिष्ल समीक्षण' : 'Comprehensive review',
        locale === 'hi' ? 'नीति निर्धारण' : 'Policy evaluation',
        locale === 'hi' ? 'अंतिम निर्णय' : 'Final resolution',
        locale === 'hi' ? 'आरबीआई ओम्बड्समैन' : 'Ombudsman referral'
      ]
    }
  ];

  const escalationProcess = [
    {
      step: 1,
      title: locale === 'hi' ? 'शिकायत दर्ज करें' : 'Complaint Registration',
      description: locale === 'hi' 
        ? 'आप अपनी शिकायत किसी भाषा में शिकायत दर्ज कर सकते हैं।'
        : 'You can register your complaint in your preferred language (English or Hindi).'
    },
    {
      step: 2,
      title: locale === 'hi' ? 'संदर्भंक नंबर' : 'Acknowledgment',
      description: locale === 'hi' 
        ? 'आपकी शिकायत प्राप्त करने के बाद में आपको एक संदर्भंक नंबर दिया जाता है।'
        : 'After registration, you will receive an acknowledgment with a unique reference number.'
    },
    {
      step: 3,
      title: locale === 'hi' ? 'जांच' : 'Investigation',
      description: locale === 'hi' 
        ? 'शाखा प्रबंधक आपकी शिकायत की जांच करेगा और उसका समाधान खोजेगा।'
        : 'The concerned department investigates your complaint thoroughly.'
    },
    {
      step: 4,
      title: locale === 'hi' ? 'समाधान' : 'Resolution',
      description: locale === 'hi' 
        ? 'शाखा प्रबंधक आपको समाधान के साथ संपर्क करता है।'
        : 'The bank communicates the resolution to you with appropriate actions.'
    },
    {
      step: 5,
      title: locale === 'hi' ? 'बंद' : 'Closure',
      description: locale === 'hi' 
        ? 'शिकायत का समाधान कर दिया जाता है और फाइल को बंद कर दिया जाता है।'
        : 'The complaint file is closed after confirmation of resolution.'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-h3 text-gray-900 mb-4">
          {locale === 'hi' ? 'तीन-स्तर त्रीव मैट्रिक्स' : 'Escalation Matrix'}
        </h2>
        <p className="text-body text-gray-600">
          {locale === 'hi' 
            ? 'यदि आपकी शिकायत का उचित निवारण नहीं हो, तो आप नीचे तौर पर शिकायत उठा सकते हैं। नीचे तौर पर आपकी शिकायत का समाधान कैसे होता है।'
            : 'If your complaint is not resolved within the specified timeline, you can escalate to higher levels. Here is our escalation process:'}
        </p>
      </div>

      {/* Escalation Levels */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === 'hi' ? 'तीन-स्तर स्तर' : 'Escalation Levels'}
        </h3>
        
        <div className="space-y-6">
          {escalationLevels.map((level, index) => (
            <div key={level.level} className="border-l-4 border-gray-200 pl-4">
              {/* Level Header */}
              <div className="flex items-center mb-2">
                <div className="flex items-center justify-center w-8 h-8 bg-bank-blue-600 text-white rounded-full font-bold text-sm">
                  {level.level}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {level.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {locale === 'hi' ? `समया समया समया: ${level.timeline}` : `Resolution Time: ${level.timeline}`}
                  </p>
                </div>
              </div>

              {/* Level Description */}
              <p className="text-body text-gray-600 mb-4">
                {level.description}
              </p>

              {/* Actions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">
                  {locale === 'hi' ? 'संभाव्य कार्य:' : 'Key Actions:'}
                </h5>
                <ul className="space-y-1">
                  {level.actions.map((action, actionIndex) => (
                    <li key={actionIndex} className="flex items-start">
                      <svg className="w-4 h-4 text-bank-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 2a2 2 0 012-2v6a2 2 0 012-2z" />
                      </svg>
                      <span className="text-sm text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation Process */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === 'hi' ? 'तीन-स्तर प्रक्रिया' : 'Escalation Process'}
        </h3>
        
        <div className="space-y-4">
          {escalationProcess.map((step, index) => (
            <div key={step.step} className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-bank-gold-600 text-white rounded-full font-bold text-sm mr-4">
                {step.step}
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  {step.title}
                </h4>
                <p className="text-body text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v4H8a1 1 0 011-1.293 1.293-1.293z" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              {locale === 'hi' ? 'महत्वपूर्ण नोट:' : 'Important Notes:'}
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                {locale === 'hi' 
                  ? 'सभी सभी शिकायतों के लिए संदर्भंक नंबर दिया जाता है।'
                  : 'All complaints are acknowledged within 24 hours.'}
              </li>
              <li>
                {locale === 'hi' 
                  ? 'प्रत्येक संदर्भंक नंबर का उल्लेखण किया जाता है।'
                  : 'You will receive regular updates on your complaint status.'}
              </li>
              <li>
                {locale === 'hi' 
                  ? 'यदि �प संतुष्ट नहीं हैं, तो आप आरबीआई ओम्बड्समैन तक पहुंच सकते हैं।'
                  : 'If you are not satisfied with the resolution, you can approach the Banking Ombudsman.'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalationMatrix;
