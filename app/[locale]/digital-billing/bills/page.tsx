import React from 'react';
import { Metadata } from 'next';

interface BillsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BillsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'hi'
      ? 'बिल भुगतान - महानगर नागरिक सहकारी बैंक'
      : 'Bill Payments - Mahanager Nagrik Sahakari Bank',
    description: locale === 'hi'
      ? 'आसान बिल भुगतान सेवाएं'
      : 'Easy bill payment services',
  };
}

export default async function BillsPage({ params }: BillsPageProps) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'hi' ? 'बिल भुगतान' : 'Bill Payments'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'hi'
              ? 'आसान बिल भुगतान सेवाएं'
              : 'Easy bill payment services'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-6 0h1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'बिजली भुगतान' : 'Electricity Bills'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi'
                  ? 'अपने बिजली बिलों का भुगतान करें'
                  : 'Pay your electricity bills online'}
              </p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3-.448-3-1s1.343.448-3 1-3 .448 3 3 3 3-.448 3-3 1.343 3 3 3zm0 8h16M7 8v8m-4-4h8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'पानी बिल' : 'Water Bills'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi'
                  ? 'अपने पानी बिलों का भुगतान करें'
                  : 'Pay your water bills online'}
              </p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4-4m-4 4l-4-4m14 4l-4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'गैस बिल' : 'Gas Bills'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi'
                  ? 'अपने गैस बिलों का भुगतान करें'
                  : 'Pay your gas bills online'}
              </p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707L19.586 6.414A1 1 0 0119 7.121V16a1 1 0 01-1 1h-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'hi' ? 'फोन बिल' : 'Phone Bills'}
              </h3>
              <p className="text-gray-600">
                {locale === 'hi'
                  ? 'अपने फोन बिलों का भुगतान करें'
                  : 'Pay your phone bills online'}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-bank-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-bank-blue-700 transition-colors">
              {locale === 'hi' ? 'अभी भुगतान शुरू करें' : 'Start Paying Bills'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
