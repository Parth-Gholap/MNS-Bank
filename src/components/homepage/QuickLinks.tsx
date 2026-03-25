'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface QuickLink {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  link: string;
  color: string;
  featured?: boolean;
}

interface QuickLinksProps {
  locale: 'en' | 'hi';
  className?: string;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ locale, className = '' }) => {
  const { t } = useTranslation(locale);
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Quick Links Bar', locale === 'hi' ? 'त्वरित लिंक' : 'Quick Links');
    fetchQuickLinks();
  }, [locale]);

  const fetchQuickLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/quick-links?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setQuickLinks(result.data.links);
      }
    } catch (error) {
      console.error('Error fetching quick links:', error);
      // Fallback to static links
      setQuickLinks(getStaticQuickLinks());
    } finally {
      setLoading(false);
    }
  };

  const getStaticQuickLinks = (): QuickLink[] => {
    return [
      {
        id: '1',
        title: 'Open Account',
        titleHi: 'खाता खोलें',
        description: 'Start banking with us in minutes',
        descriptionHi: 'मिनटों में हमारे साथ बैंकिंग शुरू करें',
        icon: 'account-plus',
        link: '/personal/savings-account',
        color: 'blue',
        featured: true
      },
      {
        id: '2',
        title: 'Apply for Loan',
        titleHi: 'ऋण आवेदन करें',
        description: 'Get instant approval on personal and business loans',
        descriptionHi: 'व्यक्ति और व्यवसाय ऋणों पर तुरंत स्वीकृति प्राप्त करें',
        icon: 'currency-dollar',
        link: '/personal/loans/personal-loan',
        color: 'green',
        featured: true
      },
      {
        id: '3',
        title: 'Digital Banking',
        titleHi: 'डिजिटल बैंकिंग',
        description: 'Bank anytime, anywhere with our mobile app',
        descriptionHi: 'हमारे मोबाइल ऐप से कहीं भी कहीं बैंकिंग करें',
        icon: 'mobile',
        link: '/digital-banking',
        color: 'purple',
        featured: true
      },
      {
        id: '4',
        title: 'Credit Cards',
        titleHi: 'क्रेडिट कार्ड',
        description: 'Exclusive offers and cashback on premium cards',
        descriptionHi: 'प्रीमियम कार्ड पर अनन्य लाभ और कैशबैक ऑफर',
        icon: 'credit-card',
        link: '/personal/loans/credit-cards',
        color: 'orange',
        featured: false
      },
      {
        id: '5',
        title: 'Investments',
        titleHi: 'निवेश',
        description: 'Grow your wealth with our investment options',
        descriptionHi: 'हमारे निवेशन विकल्पों के साथ अपनी संपत्ति बढ़ाएं',
        icon: 'trending-up',
        link: '/investments',
        color: 'indigo',
        featured: false
      },
      {
        id: '6',
        title: 'Insurance',
        titleHi: 'बीमा',
        description: 'Comprehensive insurance solutions for your family',
        descriptionHi: 'आपके परिवार के लिए व्यापक बीमा समाधान',
        icon: 'shield',
        link: '/insurance',
        color: 'red',
        featured: false
      },
      {
        id: '7',
        title: 'Find Branch',
        titleHi: 'शाखा ढूंढें',
        description: 'Locate your nearest branch or ATM',
        descriptionHi: 'अपने निकटतम शाखा या एटीएम ढूंढें',
        icon: 'location-marker',
        link: '/branch-locator',
        color: 'teal',
        featured: false
      },
      {
        id: '8',
        title: 'Customer Support',
        titleHi: 'ग्राहक सहायता',
        description: '24/7 support for all your banking needs',
        descriptionHi: 'आपकी सभी बैंकिंग आवश्यकताओं के लिए 24/7 सहायता',
        icon: 'headphones',
        link: '/contact',
        color: 'gray',
        featured: false
      }
    ];
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> = {
      blue: { bg: 'bg-blue-500', text: 'text-white', hover: 'hover:bg-blue-600' },
      green: { bg: 'bg-green-500', text: 'text-white', hover: 'hover:bg-green-600' },
      purple: { bg: 'bg-purple-500', text: 'text-white', hover: 'hover:bg-purple-600' },
      orange: { bg: 'bg-orange-500', text: 'text-white', hover: 'hover:bg-orange-600' },
      indigo: { bg: 'bg-indigo-500', text: 'text-white', hover: 'hover:bg-indigo-600' },
      red: { bg: 'bg-red-500', text: 'text-white', hover: 'hover:bg-red-600' },
      teal: { bg: 'bg-teal-500', text: 'text-white', hover: 'hover:bg-teal-600' },
      gray: { bg: 'bg-gray-500', text: 'text-white', hover: 'hover:bg-gray-600' }
    };
    return colors[color] || colors.blue;
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      'account-plus': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-2H8a2 2 0 00-2-2V6a2 2 0 00-2-2h8a2 2 0 002 2v2a2 2 0 002 2zm-2 2h8v12H8a2 2 0 01-2-2v-8a2 2 0 00-2-2z" />
        </svg>
      ),
      'currency-dollar': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.11 0-2-.89-2-2H4a2 2 0 00-2 2v5.74L3.74 18c-.53.21-1 .89-1h5.11c.53 0 1 .89 1l2.74 5.26V10c0 1.11-.89 2-2h8a2 2 0 012 2z" />
        </svg>
      ),
      'mobile': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M16.5 12h-8.5a2 2 0 00-2-2v6a2 2 0 002 2h8.5a2 2 0 002 2v6a2 2 0 002-2h-8.5a2 2 0 00-2-2z" />
        </svg>
      ),
      'credit-card': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1l3 3h3l3-3h1a2 2 0 002 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 002 2z" />
        </svg>
      ),
      'trending-up': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0l-4-4m4 4v8m0 0l4 4m-4-4H7a2 2 0 00-2-2v6a2 2 0 002 2h8a2 2 0 002 2v-6a2 2 0 00-2-2z" />
        </svg>
      ),
      'shield': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'location-marker': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a8 8 0 00-5.657-5.657l8.483 8.483a8 8 0 015.657 5.657l-8.483 8.483a8 8 0 01.657-5.657l-8.483-8.483zM12 14a1 1 0 011-1V7a1 1 0 011-1h-2a1 1 0 00-1-1v6a1 1 0 001 1h2a1 1 0 001 1v-6a1 1 0 001-1z" />
        </svg>
      ),
      'headphones': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2v10a2 2 0 01-2 2h14a2 2 0 002-2V7a2 2 0 002-2h-4m0 0h6v2h6a2 2 0 002 2v2a2 2 0 002-2h-4m0 0h6v2h6a2 2 0 002 2v2a2 2 0 002-2h-4" />
        </svg>
      )
    };
    return icons[iconName] || icons['account-plus'];
  };

  // Loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center space-x-4 py-4 ${className}`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-16 h-2 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center space-x-2 md:space-x-4 py-4 ${className}`}>
      {quickLinks.map((link) => (
        <a
          key={link.id}
          href={link.link}
          className={`group flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
            link.featured 
              ? 'bg-white shadow-lg border border-gray-200 hover:shadow-xl' 
              : 'bg-white border border-transparent hover:bg-gray-50'
          }`}
          title={locale === 'hi' ? link.titleHi : link.title}
        >
          {/* Icon */}
          <div className={`p-2 rounded-full ${getColorClasses(link.color).bg} mb-2`}>
            {getIconComponent(link.icon)}
          </div>
          
          {/* Title */}
          <span className={`text-xs font-medium text-center ${getColorClasses(link.color).text}`}>
            {locale === 'hi' ? link.titleHi : link.title}
          </span>
          
          {/* Description on hover */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-gray-900 text-white text-xs rounded p-2 whitespace-nowrap">
              {locale === 'hi' ? link.descriptionHi : link.description}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default QuickLinks;
