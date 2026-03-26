'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface CitizensCharterPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function CitizensCharterPage({ params }: CitizensCharterPageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {localeTyped === 'hi' ? 'नागरिक चार्टर' : 'Citizens Charter'}
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'हमारी प्रतिबद्धता' : 'Our Commitment'}
              </h2>
              <p className="text-gray-700">
                {localeTyped === 'hi' 
                  ? 'महानगर नागरिक सहकारी बैंक अपने ग्राहकों को उच्च गुणवत्ता वाली बैंकिंग सेवाएं प्रदान करने के लिए प्रतिबद्ध है।'
                  : 'Mahanager Nagrik Sahakari Bank is committed to providing high-quality banking services to our customers.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'सेवा के मानक' : 'Service Standards'}
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold mb-2">
                    {localeTyped === 'hi' ? 'खाता खोलना' : 'Account Opening'}
                  </h3>
                  <p className="text-gray-700">
                    {localeTyped === 'hi' ? 'सभी आवश्यक दस्तावेजों के साथ, खाता 2 कार्य दिवसों के भीतर खोला जाएगा।' : 'With all required documents, account will be opened within 2 working days.'}
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold mb-2">
                    {localeTyped === 'hi' ? 'ऋण आवेदन' : 'Loan Applications'}
                  </h3>
                  <p className="text-gray-700">
                    {localeTyped === 'hi' ? 'ऋण आवेदन 15 कार्य दिवसों के भीतर प्रक्रिया किए जाएंगे।' : 'Loan applications will be processed within 15 working days.'}
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-2">
                    {localeTyped === 'hi' ? 'शिकायत निवारण' : 'Grievance Redressal'}
                  </h3>
                  <p className="text-gray-700">
                    {localeTyped === 'hi' ? 'शिकायतों को 7 कार्य दिवसों के भीतर हल किया जाएगा।' : 'Grievances will be resolved within 7 working days.'}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'ग्राहक अधिकार' : 'Customer Rights'}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{localeTyped === 'hi' ? 'स्पष्ट और निष्पक्ष जानकारी' : 'Clear and fair information'}</li>
                <li>{localeTyped === 'hi' ? 'गोपनीयता की सुरक्षा' : 'Privacy protection'}</li>
                <li>{localeTyped === 'hi' ? 'उचित व्यवहार' : 'Fair treatment'}</li>
                <li>{localeTyped === 'hi' ? 'शिकायत दर्ज करने का अधिकार' : 'Right to complain'}</li>
                <li>{localeTyped === 'hi' ? 'त्वरित सेवा' : 'Prompt service'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'ग्राहक जिम्मेदारियां' : 'Customer Responsibilities'}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{localeTyped === 'hi' ? 'सही जानकारी प्रदान करें' : 'Provide correct information'}</li>
                <li>{localeTyped === 'hi' ? 'खाता विवरण अपडेट रखें' : 'Keep account details updated'}</li>
                <li>{localeTyped === 'hi' ? 'बैंक के नियमों का पालन करें' : 'Follow bank rules'}</li>
                <li>{localeTyped === 'hi' ? 'धोखाधड़ी से बचें' : 'Avoid fraud'}</li>
                <li>{localeTyped === 'hi' ? 'समय पर भुगतान करें' : 'Make timely payments'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      {localeTyped === 'hi' ? 'मुख्य कार्यालय' : 'Head Office'}
                    </h4>
                    <p className="text-gray-700">
                      123 Main Street, Bhopal<br />
                      {localeTyped === 'hi' ? 'मध्य प्रदेश, भारत' : 'Madhya Pradesh, India'}<br />
                      {localeTyped === 'hi' ? 'फोन:' : 'Phone:'} 0755-1234567
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      {localeTyped === 'hi' ? 'ग्राहक सेवा' : 'Customer Service'}
                    </h4>
                    <p className="text-gray-700">
                      {localeTyped === 'hi' ? 'टोल फ्री:' : 'Toll Free:'} 1800-123-4567<br />
                      {localeTyped === 'hi' ? 'ईमेल:' : 'Email:'} support@mnsbank.com<br />
                      {localeTyped === 'hi' ? 'समय:' : 'Hours:'} 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
