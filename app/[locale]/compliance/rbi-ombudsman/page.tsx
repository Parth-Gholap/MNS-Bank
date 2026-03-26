import React from 'react';
import { Metadata } from 'next';

interface RBIOmbudsmanPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: RBIOmbudsmanPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'आरबीआई लोकपाल - महानगर नागरिक सहकारी बैंक'
      : 'RBI Ombudsman - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'आरबीआई बैंकिंग लोकपाल योजना और शिकायत निवारण'
      : 'RBI Banking Ombudsman Scheme and Complaint Resolution',
  };
}

export default async function RBIOmbudsmanPage({ params }: RBIOmbudsmanPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'आरबीआई लोकपाल' : 'RBI Ombudsman'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'बैंकिंग शिकायतों के त्वरित और निःशुल्क समाधान'
              : 'Quick and free resolution of banking complaints'}
          </p>
        </div>

        {/* What is RBI Ombudsman */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'आरबीआई लोकपाल क्या है?' : 'What is RBI Ombudsman?'}
          </h2>
          <p className="text-gray-600 mb-4">
            {locale === 'hi'
              ? 'आरबीआई बैंकिंग लोकपाल योजना भारतीय रिजर्व बैंक द्वारा बैंक ग्राहकों की शिकायतों के निवारण के लिए बनाई गई एक स्वतंत्र निकाय है।'
              : 'The RBI Banking Ombudsman Scheme is an independent body created by the Reserve Bank of India for resolution of complaints by bank customers.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'उद्देश्य' : 'Purpose'}
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>• {locale === 'hi' ? 'ग्राहक शिकायतों का समाधान' : 'Resolve customer complaints'}</li>
                <li>• {locale === 'hi' ? 'बैंकिंग सेवाओं में सुधार' : 'Improve banking services'}</li>
                <li>• {locale === 'hi' ? 'ग्राहकों के अधिकारों की सुरक्षा' : 'Protect customer rights'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'शक्तियां' : 'Powers'}
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>• {locale === 'hi' ? 'मध्यस्थता और समाधान' : 'Mediation and resolution'}</li>
                <li>• {locale === 'hi' ? 'नुकसान का मुआवजा' : 'Compensation for damages'}</li>
                <li>• {locale === 'hi' ? 'बैंकों पर जुर्माना लगाना' : 'Impose penalties on banks'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Types of Complaints */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'शिकायतों के प्रकार' : 'Types of Complaints'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'खाता संबंधी' : 'Account Related'}
              </h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• {locale === 'hi' ? 'खाता नहीं खोलना' : 'Non-opening of accounts'}</li>
                <li>• {locale === 'hi' ? 'खाता बंद करना' : 'Account closure'}</li>
                <li>• {locale === 'hi' ? 'शेष राशि में गलती' : 'Errors in balance'}</li>
              </ul>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'ऋण संबंधी' : 'Loan Related'}
              </h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• {locale === 'hi' ? 'ण अस्वीकृति' : 'Loan rejection'}</li>
                <li>• {locale === 'hi' ? '्याज दरें' : 'Interest rates'}</li>
                <li>• {locale === 'hi' ? 'ऋण वसूली' : 'Loan recovery'}</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'कार्ड संबंधी' : 'Card Related'}
              </h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• {locale === 'hi' ? 'कार्ड जारी नहीं करना' : 'Non-issuance of cards'}</li>
                <li>• {locale === 'hi' ? 'चार्जबैक विवाद' : 'Chargeback disputes'}</li>
                <li>• {locale === 'hi' ? 'अनधिकृत लेनदेन' : 'Unauthorized transactions'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to File Complaint */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'शिकायत कैसे दर्ज करें' : 'How to File a Complaint'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'ऑनलाइन शिकायत' : 'Online Complaint'}
              </h3>
              <ol className="text-gray-600 space-y-2">
                <li>{locale === 'hi' ? '1. आरबीआई वेबसाइट पर जाएं' : '1. Visit RBI website'}</li>
                <li>{locale === 'hi' ? '2. लोकपाल पोर्टल पर क्लिक करें' : '2. Click on Ombudsman portal'}</li>
                <li>{locale === 'hi' ? '3. शिकायत पत्र भरें' : '3. Fill complaint form'}</li>
                <li>{locale === 'hi' ? '4. दस्तावेज अपलोड करें' : '4. Upload documents'}</li>
                <li>{locale === 'hi' ? '5. सबमिट करें' : '5. Submit'}</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === 'hi' ? 'ऑफलाइन शिकायत' : 'Offline Complaint'}
              </h3>
              <ol className="text-gray-600 space-y-2">
                <li>{locale === 'hi' ? '1. शिकायत पत्र डाउनलोड करें' : '1. Download complaint form'}</li>
                <li>{locale === 'hi' ? '2. फॉर्म भरें' : '2. Fill the form'}</li>
                <li>{locale === 'hi' ? '3. दस्तावेज संलग्न करें' : '3. Attach documents'}</li>
                <li>{locale === 'hi' ? '4. लोकपाल कार्यालय में भेजें' : '4. Send to Ombudsman office'}</li>
                <li>{locale === 'hi' ? '5. पावति प्राप्त करें' : '5. Get acknowledgement'}</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'महत्वपूर्ण जानकारी' : 'Important Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'समय सीमा' : 'Time Limit'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi'
                  ? 'शिकायत दर्ज करने के लिए: बैंक से जवाब मिलने के 30 दिनों के भीतर'
                  : 'For filing complaint: Within 30 days of receiving bank\'s response'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'शुल्क' : 'Fees'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi'
                  ? 'शिकायत दर्ज करने के लिए कोई शुल्क नहीं'
                  : 'No fee for filing complaint'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'पता' : 'Address'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi'
                  ? 'आरबीआई लोकपाल, भोपाल क्षेत्रीय कार्यालय'
                  : 'RBI Ombudsman, Bhopal Regional Office'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'संपर्क' : 'Contact'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi'
                  ? 'फोन: 1800-425-0019, ईमेल: ombudsman@rbi.org.in'
                  : 'Phone: 1800-425-0019, Email: ombudsman@rbi.org.in'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
