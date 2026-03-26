import React from 'react';
import { Metadata } from 'next';

interface HistoryPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: HistoryPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'इतिहास - महानगर नागरिक सहकारी बैंक'
      : 'History - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'हमारी यात्रा, उपलब्धियां, विकास की कहानी'
      : 'Our Journey, Achievements, Growth Story',
  };
}

export default async function HistoryPage({ params }: HistoryPageProps) {
  const { locale } = await params;
  const localeTyped = locale as 'en' | 'hi';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'हमारा इतिहास' : 'Our History'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? '1998 से भोपाल के विकास में भागीदारी'
              : 'Partnering in Bhopal\'s growth since 1998'}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
          
          <div className="space-y-12">
            {/* 1998 - Foundation */}
            <div className="flex items-center">
              <div className="flex-1 text-right pr-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {locale === 'hi' ? '1998 - स्थापना' : '1998 - Foundation'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi'
                      ? 'महानगर नागरिक सहकारी बैंक की स्थापना भोपाल में हुई'
                      : 'Mahanager Nagrik Sahakari Bank was established in Bhopal'}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1 pl-8"></div>
            </div>

            {/* 2005 - First Branch */}
            <div className="flex items-center">
              <div className="flex-1 pr-8"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1 text-left pl-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {locale === 'hi' ? '2005 - पहली शाखा' : '2005 - First Branch'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi'
                      ? 'भोपाल में पहली शाखा का उद्घाटन'
                      : 'Opening of first branch in Bhopal'}
                  </p>
                </div>
              </div>
            </div>

            {/* 2010 - Digital Banking */}
            <div className="flex items-center">
              <div className="flex-1 text-right pr-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {locale === 'hi' ? '2010 - डिजिटल बैंकिंग' : '2010 - Digital Banking'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi'
                      ? 'इंटरनेट बैंकिंग सेवाओं की शुरुआत'
                      : 'Launch of internet banking services'}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1 pl-8"></div>
            </div>

            {/* 2015 - 10 Branches */}
            <div className="flex items-center">
              <div className="flex-1 pr-8"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1 text-left pl-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {locale === 'hi' ? '2015 - 10 शाखाएं' : '2015 - 10 Branches'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi'
                      ? 'मध्य प्रदेश में 10 शाखाओं का नेटवर्क'
                      : 'Network of 10 branches across Madhya Pradesh'}
                  </p>
                </div>
              </div>
            </div>

            {/* 2020 - Mobile Banking */}
            <div className="flex items-center">
              <div className="flex-1 text-right pr-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {locale === 'hi' ? '2020 - मोबाइल बैंकिंग' : '2020 - Mobile Banking'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi'
                      ? 'मोबाइल बैंकिंग ऐप का लॉन्च'
                      : 'Launch of mobile banking app'}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1 pl-8"></div>
            </div>

            {/* 2024 - Present */}
            <div className="flex items-center">
              <div className="flex-1 pr-8"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1 text-left pl-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {locale === 'hi' ? '2024 - वर्तमान' : '2024 - Present'}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'hi'
                      ? '25+ शाखाओं के साथ विस्तार जारी'
                      : 'Continued expansion with 25+ branches'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'उपलब्धियां' : 'Milestones'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <p className="text-gray-600">
                {locale === 'hi' ? 'शाखाएं' : 'Branches'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1 लाख+</div>
              <p className="text-gray-600">
                {locale === 'hi' ? 'ग्राहक' : 'Customers'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">500 करोड़+</div>
              <p className="text-gray-600">
                {locale === 'hi' ? 'जमा' : 'Deposits'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">300 करोड़+</div>
              <p className="text-gray-600">
                {locale === 'hi' ? 'ऋण' : 'Loans'}
              </p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'hi' ? 'हमारा दृष्टिकोण' : 'Our Vision'}
          </h2>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-gray-600 text-lg">
              {locale === 'hi'
                ? 'मध्य प्रदेश के सबसे भरोसेमंद और ग्राहक-केंद्रित सहकारी बैंक बनना'
                : 'To become the most trusted and customer-centric cooperative bank in Madhya Pradesh'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
