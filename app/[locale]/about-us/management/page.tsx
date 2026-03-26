import React from 'react';
import { Metadata } from 'next';

interface ManagementPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ManagementPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'प्रबंधन - महानगर नागरिक सहकारी बैंक'
      : 'Management - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'हमारे प्रबंधन टीम, निदेशक मंडल, वरिष्ठ अधिकारी'
      : 'Our Management Team, Board of Directors, Senior Officers',
  };
}

export default async function ManagementPage({ params }: ManagementPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'प्रबंधन टीम' : 'Management Team'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'हमारे अनुभवी और समर्पित प्रबंधन टीम से मिलें'
              : 'Meet our experienced and dedicated management team'}
          </p>
        </div>

        {/* Board of Directors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'hi' ? 'निदेशक मंडल' : 'Board of Directors'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'श्री राजेश कुमार शर्मा' : 'Shri Rajesh Kumar Sharma'}
              </h3>
              <p className="text-gray-600 mb-2">
                {locale === 'hi' ? 'अध्यक्ष' : 'Chairman'}
              </p>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? '35+ वर्ष बैंकिंग अनुभव' : '35+ years banking experience'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'श्रीमती अंजलि देवी' : 'Smt. Anjali Devi'}
              </h3>
              <p className="text-gray-600 mb-2">
                {locale === 'hi' ? 'उपाध्यक्ष' : 'Vice Chairman'}
              </p>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? '28+ वर्ष वित्त अनुभव' : '28+ years finance experience'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'श्री अमित कुमार सिंह' : 'Shri Amit Kumar Singh'}
              </h3>
              <p className="text-gray-600 mb-2">
                {locale === 'hi' ? 'निदेशक' : 'Director'}
              </p>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? '20+ वर्ष व्यवसाय अनुभव' : '20+ years business experience'}
              </p>
            </div>
          </div>
        </div>

        {/* Senior Management */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'hi' ? 'वरिष्ठ प्रबंधन' : 'Senior Management'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'श्री प्रकाश मेहता' : 'Shri Prakash Mehta'}
              </h3>
              <p className="text-gray-600 mb-2">
                {locale === 'hi' ? 'प्रबंधक निदेशक' : 'Managing Director'}
              </p>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? '25+ वर्ष बैंकिंग अनुभव' : '25+ years banking experience'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'श्रीमती प्रिया शर्मा' : 'Smt. Priya Sharma'}
              </h3>
              <p className="text-gray-600 mb-2">
                {locale === 'hi' ? 'मुख्य प्रबंधक' : 'Chief Manager'}
              </p>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? '18+ वर्ष बैंकिंग अनुभव' : '18+ years banking experience'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'श्री राहुल वर्मा' : 'Shri Rahul Verma'}
              </h3>
              <p className="text-gray-600 mb-2">
                {locale === 'hi' ? 'शाखा प्रबंधक' : 'Branch Manager'}
              </p>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? '12+ वर्ष बैंकिंग अनुभव' : '12+ years banking experience'}
              </p>
            </div>
          </div>
        </div>

        {/* Management Philosophy */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'प्रबंधन दर्शन' : 'Management Philosophy'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'विश्वास' : 'Trust'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'ग्राहकों का विश्वास हमारी संपत्ति है' : 'Customer trust is our asset'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7l7 2 17 17l5 5-11h11l11-9 9-9l-3 10.5 2.5L21 8l-12 2.5L4 7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'नवाचार' : 'Innovation'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'लगातार सुधार और नवाचार' : 'Continuous improvement and innovation'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'समुदाय' : 'Community'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'hi' ? 'समुदाय के विकास में योगदान' : 'Contributing to community development'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
