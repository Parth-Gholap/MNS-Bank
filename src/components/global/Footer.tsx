'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { config } from '@/lib/config';

interface FooterProps {
  locale: 'en' | 'hi';
}

const Footer: React.FC<FooterProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
      
      // Show success message
      alert(locale === 'hi' ? 'सफलतापूर्वक सदस्यता ली गई!' : 'Successfully subscribed!');
    }
  };

  const handleSocialClick = (platform: string) => {
    console.log(`Social media clicked: ${platform}`);
    // Handle social media navigation
    alert(`${locale === 'hi' ? `${platform} पर जा रहे हैं` : `Navigating to ${platform}`}`);
  };

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

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                {locale === 'hi' ? 'न्यूज़लेटर की सदस्यता लें' : 'Subscribe to Newsletter'}
              </h4>
              <p className="text-gray-400 mb-4">
                {locale === 'hi' 
                  ? 'नवीनतम बैंकिंग अपडेट और प्रस्ताव प्राप्त करें'
                  : 'Get latest banking updates and offers'
                }
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === 'hi' ? 'आपका ईमेल' : 'Your email'}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {locale === 'hi' ? 'सदस्यता लें' : 'Subscribe'}
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 text-green-400 text-sm">
                  {locale === 'hi' ? 'सफलतापूर्वक सदस्यता ली गई!' : 'Successfully subscribed!'}
                </p>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                {locale === 'hi' ? 'हमसे जुड़ें' : 'Connect With Us'}
              </h4>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSocialClick('Facebook')}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <span className="text-sm font-bold">f</span>
                </button>
                <button
                  onClick={() => handleSocialClick('Twitter')}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <span className="text-sm font-bold">𝕏</span>
                </button>
                <button
                  onClick={() => handleSocialClick('Instagram')}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <span className="text-lg">📷</span>
                </button>
                <button
                  onClick={() => handleSocialClick('LinkedIn')}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <span className="text-sm font-bold">in</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {/* Trust Indicators */}
              <div className="mb-4 md:mb-0">
                <h4 className="text-sm font-semibold mb-2 text-gray-400">
                  {t('common.trust')}
                </h4>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={config.dicgcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="text-xs">🛡️ DICGC Insured</span>
                  </a>
                  <a
                    href={config.rbiOmbudsmanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="text-xs">🏦 RBI Regulated</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="text-xs">🔒 Secure Banking</span>
                  </a>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-400">
                  © {currentYear} {config.bankName}. {t('common.allRightsReserved')}
                </p>
                <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-end">
                  <Link href={`/${locale}/privacy-policy`} className="text-xs text-gray-400 hover:text-white transition-colors duration-200">
                    {locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                  </Link>
                  <Link href={`/${locale}/terms-of-service`} className="text-xs text-gray-400 hover:text-white transition-colors duration-200">
                    {locale === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
                  </Link>
                  <Link href={`/${locale}/sitemap`} className="text-xs text-gray-400 hover:text-white transition-colors duration-200">
                    {locale === 'hi' ? 'साइटमैप' : 'Sitemap'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
