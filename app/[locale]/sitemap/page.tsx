'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';

interface SitemapPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function SitemapPage({ params }: SitemapPageProps) {
  const { locale } = React.use(params);
  const localeTyped = locale as 'en' | 'hi';
  const { t } = useTranslation(localeTyped);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {localeTyped === 'hi' ? 'साइटमैप' : 'Sitemap'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'व्यक्तिग बैंकिंग' : 'Personal Banking'}
              </h2>
              <ul className="space-y-2">
                <li><Link href={`/${localeTyped}/personal/accounts`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'खाते' : 'Accounts'}
                </Link></li>
                <li><Link href={`/${localeTyped}/personal/loans`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'ऋण' : 'Loans'}
                </Link></li>
                <li><Link href={`/${localeTyped}/personal/deposits`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'जमा' : 'Deposits'}
                </Link></li>
                <li><Link href={`/${localeTyped}/personal/cards`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'कार्ड' : 'Cards'}
                </Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'व्यवसाय बैंकिंग' : 'Business Banking'}
              </h2>
              <ul className="space-y-2">
                <li><Link href={`/${localeTyped}/business/accounts`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'व्यवसाय खाते' : 'Business Accounts'}
                </Link></li>
                <li><Link href={`/${localeTyped}/business/loans`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'व्यवसाय ऋण' : 'Business Loans'}
                </Link></li>
                <li><Link href={`/${localeTyped}/business/deposits`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'व्यवसाय जमा' : 'Business Deposits'}
                </Link></li>
                <li><Link href={`/${localeTyped}/business/services`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'व्यवसाय सेवाएं' : 'Business Services'}
                </Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'डिजिटल सेवाएं' : 'Digital Services'}
              </h2>
              <ul className="space-y-2">
                <li><Link href={`/${localeTyped}/digital-banking`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking'}
                </Link></li>
                <li><Link href={`/${localeTyped}/digital-billing`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'डिजिटल बिलिंग' : 'Digital Billing'}
                </Link></li>
                <li><Link href={`/${localeTyped}/digital-billing/recharge`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'मोबाइल रिचार्ज' : 'Mobile Recharge'}
                </Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'आवेदन' : 'Applications'}
              </h2>
              <ul className="space-y-2">
                <li><Link href={`/${localeTyped}/apply/account`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'खाता खोलें' : 'Open Account'}
                </Link></li>
                <li><Link href={`/${localeTyped}/apply/loan`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'ऋण आवेदन' : 'Apply Loan'}
                </Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'सहायता' : 'Support'}
              </h2>
              <ul className="space-y-2">
                <li><Link href={`/${localeTyped}/contact`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'संपर्क करें' : 'Contact Us'}
                </Link></li>
                <li><Link href={`/${localeTyped}/locate-us`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'शाखा ढूंढें' : 'Find Branch'}
                </Link></li>
                <li><Link href={`/${localeTyped}/contact/atms`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'एटीएम ढूंढें' : 'Find ATM'}
                </Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                {localeTyped === 'hi' ? 'कानूनी' : 'Legal'}
              </h2>
              <ul className="space-y-2">
                <li><Link href={`/${localeTyped}/privacy-policy`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                </Link></li>
                <li><Link href={`/${localeTyped}/terms-of-service`} className="text-blue-600 hover:underline">
                  {localeTyped === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
                </Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
