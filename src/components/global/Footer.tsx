'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { config } from '@/lib/config';

interface FooterProps {
  locale: 'en' | 'hi';
}

const Footer: React.FC<FooterProps> = ({ locale }) => {
  const { t } = useTranslation(locale);

  const footerStructure = {
    column1: {
      title: t('navigation.aboutUs'),
      links: [
        { label: t('navigation.management'), href: `/${locale}/about-us/management` },
        { label: t('navigation.history'), href: `/${locale}/about-us/history` },
        { label: t('navigation.board'), href: `/${locale}/about-us/board` },
        { label: t('navigation.committees'), href: `/${locale}/about-us/committees` },
      ]
    },
    column2: {
      title: t('navigation.personal'),
      links: [
        { label: t('products.accounts'), href: `/${locale}/personal/accounts` },
        { label: t('products.deposits'), href: `/${locale}/personal/deposits` },
        { label: t('products.loans'), href: `/${locale}/personal/loans` },
        { label: t('navigation.services'), href: `/${locale}/personal/services` },
      ]
    },
    column3: {
      title: t('navigation.business'),
      links: [
        { label: t('products.accounts'), href: `/${locale}/business/accounts` },
        { label: t('products.deposits'), href: `/${locale}/business/deposits` },
        { label: t('products.loans'), href: `/${locale}/business/loans` },
        { label: t('navigation.services'), href: `/${locale}/business/services` },
      ]
    },
    column4: {
      title: t('navigation.compliance'),
      links: [
        { label: t('compliance.privacyPolicy'), href: `/${locale}/compliance/privacy-policy` },
        { label: t('compliance.policyCentre'), href: `/${locale}/compliance/policy-centre` },
        { label: t('compliance.grievancePolicy'), href: `/${locale}/compliance/grievance-policy` },
        { label: t('compliance.kycCkyc'), href: `/${locale}/compliance/kyc-ckyc` },
        { label: t('compliance.citizensCharter'), href: `/${locale}/compliance/citizens-charter` },
      ]
    },
    column5: {
      title: t('navigation.contact'),
      links: [
        { label: t('contact.headOffice'), href: `/${locale}/contact/head-office` },
        { label: t('contact.branches'), href: `/${locale}/contact/branches` },
        { label: t('contact.atms'), href: `/${locale}/contact/atms` },
        { label: t('contact.support'), href: `/${locale}/contact/support` },
        { label: t('contact.grievance'), href: `/${locale}/contact/grievance` },
      ]
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-bank px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {footerStructure.column1.title}
            </h3>
            <ul className="space-y-2">
              {footerStructure.column1.links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Personal Banking */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {footerStructure.column2.title}
            </h3>
            <ul className="space-y-2">
              {footerStructure.column2.links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Business Banking */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {footerStructure.column3.title}
            </h3>
            <ul className="space-y-2">
              {footerStructure.column3.links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Compliance & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {footerStructure.column4.title}
            </h3>
            <ul className="space-y-2">
              {footerStructure.column4.links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {footerStructure.column5.title}
            </h3>
            <ul className="space-y-2">
              {footerStructure.column5.links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Trust Indicators */}
            <div className="mb-4 md:mb-0">
              <h4 className="text-sm font-semibold mb-2 text-gray-400">
                {t('common.trust')}
              </h4>
              <div className="flex space-x-4">
                <a
                  href={config.dicgcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="text-xs">DICGC Insured</span>
                </a>
                <a
                  href={config.rbiOmbudsmanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="text-xs">RBI</span>
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {currentYear} {config.bankName}. {t('common.allRightsReserved')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
