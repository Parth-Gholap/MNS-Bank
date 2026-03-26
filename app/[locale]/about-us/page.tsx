import React from 'react';
import { Metadata } from 'next';

interface AboutUsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: AboutUsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'हमारे बारे में - महानगर नागरिक सहकारी बैंक'
      : 'About Us - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'हमारा इतिहास, दर्शन, और नेतृत्व'
      : 'Our history, vision, and leadership',
  };
}

export default async function AboutUsPage({ params }: AboutUsPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'हमारे बारे में' : 'About Us'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'भारत के प्रमुख सहकारी बैंक में से एक'
              : 'One of India\'s leading cooperative banks'}
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'हमारी कहानी' : 'Our Story'}
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              {locale === 'hi'
                ? 'महानगर नागरिक सहकारी बैंक की स्थापना 1987 में भोपाल में एक छोटी पहल के रूप में हुई थी। आज, हम मध्य प्रदेश के सबसे भरोसेमंद वित्तीय संस्थानों में से एक हैं।'
                : 'Mahanager Nagrik Sahakari Bank was established in 1987 in Bhopal as a small initiative. Today, we are one of the most trusted financial institutions in Madhya Pradesh.'}
            </p>
            <p className="mb-4">
              {locale === 'hi'
                ? 'हमारा मिशन हमेशा से आम जनता को वित्तीय सेवाएं प्रदान करना और समाज के आर्थिक विकास में योगदान देना रहा है।'
                : 'Our mission has always been to provide financial services to the common people and contribute to the economic development of society.'}
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === 'hi' ? 'हमारा दर्शन' : 'Our Vision'}
            </h3>
            <p className="text-gray-600">
              {locale === 'hi'
                ? 'सभी के लिए वित्तीय समावेशिता और समृद्धि का निर्माण करना।'
                : 'To create financial inclusion and prosperity for all.'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === 'hi' ? 'हमारा मिशन' : 'Our Mission'}
            </h3>
            <p className="text-gray-600">
              {locale === 'hi'
                ? 'ग्राहक-केंद्रित बैंकिंग सेवाएं प्रदान करके समुदाय का विकास करना।'
                : 'To empower communities through customer-centric banking services.'}
            </p>
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'हमारा नेतृत्व' : 'Our Leadership'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'अध्यक्ष' : 'Chairman'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? '25+ वर्षों का बैंकिंग अनुभव' : '25+ years of banking experience'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'प्रबंधक निदेशक' : 'Managing Director'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? '20+ वर्षों का वित्तीय अनुभव' : '20+ years of finance experience'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'मुख्य प्रबंधक' : 'Chief Manager'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi' ? '15+ वर्षों का संचालन अनुभव' : '15+ years of operations experience'}
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {locale === 'hi' ? 'उपलब्धियां' : 'Achievements'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">35+</div>
              <p className="text-gray-600">
                {locale === 'hi' ? 'वर्षों की सेवा' : 'Years of Service'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
              <p className="text-gray-600">
                {locale === 'hi' ? 'ग्राहक' : 'Customers'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
              <p className="text-gray-600">
                {locale === 'hi' ? 'शाखाएं' : 'Branches'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100+</div>
              <p className="text-gray-600">
                {locale === 'hi' ? 'एटीएम' : 'ATMs'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
