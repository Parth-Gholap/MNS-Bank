'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface RechargeGuidePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function RechargeGuidePage({ params }: RechargeGuidePageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {localeTyped === 'hi' ? 'मोबाइल रिचार्ज गाइड' : 'Mobile Recharge Guide'}
          </h1>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold mb-2">
                {localeTyped === 'hi' ? 'रिचार्ज कैसे करें?' : 'How to Recharge?'}
              </h2>
              <ol className="space-y-2 text-gray-700">
                <li>1. {localeTyped === 'hi' ? 'अपना मोबाइल नंबर दर्ज करें' : 'Enter your mobile number'}</li>
                <li>2. {localeTyped === 'hi' ? 'अपना ऑपरेटर चुनें' : 'Select your operator'}</li>
                <li>3. {localeTyped === 'hi' ? 'ाशि दर्ज करें' : 'Enter the amount'}</li>
                <li>4. {localeTyped === 'hi' ? 'भुगतान करें' : 'Make the payment'}</li>
                <li>5. {localeTyped === 'hi' ? 'रिचार्ज पुष्टि प्राप्त करें' : 'Receive recharge confirmation'}</li>
              </ol>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h2 className="text-xl font-semibold mb-2">
                {localeTyped === 'hi' ? 'समर्थित ऑपरेटर' : 'Supported Operators'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 p-3 rounded text-center">Airtel</div>
                <div className="bg-gray-100 p-3 rounded text-center">Jio</div>
                <div className="bg-gray-100 p-3 rounded text-center">Vi</div>
                <div className="bg-gray-100 p-3 rounded text-center">BSNL</div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h2 className="text-xl font-semibold mb-2">
                {localeTyped === 'hi' ? 'रिचार्ज प्लान' : 'Recharge Plans'}
              </h2>
              <div className="space-y-3">
                <div className="bg-gray-100 p-4 rounded">
                  <h3 className="font-semibold">₹99</h3>
                  <p className="text-sm text-gray-600">
                    {localeTyped === 'hi' ? '28 दिनों के लिए असीमित कॉलिंग' : 'Unlimited calling for 28 days'}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <h3 className="font-semibold">₹199</h3>
                  <p className="text-sm text-gray-600">
                    {localeTyped === 'hi' ? '56 दिनों के लिए असीमित कॉलिंग' : 'Unlimited calling for 56 days'}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <h3 className="font-semibold">₹319</h3>
                  <p className="text-sm text-gray-600">
                    {localeTyped === 'hi' ? '84 दिनों के लिए असीमित कॉलिंग' : 'Unlimited calling for 84 days'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
