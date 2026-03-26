'use client';

import React, { useState, useEffect } from 'react';

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

const getStaticQuickLinks = (): QuickLink[] => {
  return [
    {
      id: '1',
      title: 'Open Account',
      titleHi: 'खाता खोलें',
      description: 'Start banking with us in minutes',
      descriptionHi: 'मिनटों में हमारे साथ बैंकिंग शुरू करें',
      icon: '👤',
      link: '/apply/account',
      color: 'blue',
      featured: true
    },
    {
      id: '2',
      title: 'Apply for Loan',
      titleHi: 'ऋण आवेदन करें',
      description: 'Get instant approval on personal and business loans',
      descriptionHi: 'व्यक्ति और व्यवसाय ऋणों पर तुरंत स्वीकृति प्राप्त करें',
      icon: '💰',
      link: '/apply/loan',
      color: 'green',
      featured: true
    },
    {
      id: '3',
      title: 'Digital Banking',
      titleHi: 'डिजिटल बैंकिंग',
      description: '24/7 banking at your fingertips',
      descriptionHi: 'आपकी उंगलियों पर 24/7 बैंकिंग',
      icon: '📱',
      link: '/digital-banking',
      color: 'purple',
      featured: true
    },
    {
      id: '4',
      title: 'Credit Cards',
      titleHi: 'क्रेडिट कार्ड',
      description: 'Premium credit cards with exclusive benefits',
      descriptionHi: 'अनन्य लाभों के साथ प्रीमियम क्रेडिट कार्ड',
      icon: '💳',
      link: '/personal/cards',
      color: 'orange',
      featured: true
    },
    {
      id: '5',
      title: 'Investments',
      titleHi: 'निवेश',
      description: 'Grow your wealth with our investment options',
      descriptionHi: 'हमारे निवेशन विकल्पों के साथ अपनी संपत्ति बढ़ाएं',
      icon: '📈',
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
      icon: '🛡️',
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
      icon: '📍',
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
      icon: '🎧',
      link: '/contact',
      color: 'gray',
      featured: false
    }
  ];
};

const QuickLinks: React.FC<QuickLinksProps> = ({ locale, className = '' }) => {
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>(getStaticQuickLinks());
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchQuickLinks();
  }, [locale]);

  const fetchQuickLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bank-data?type=quick-links&locale=${locale}`);
      const result = await response.json();
      
      if (result.success && result.data && result.data.quickLinks && Array.isArray(result.data.quickLinks)) {
        setQuickLinks(result.data.quickLinks);
      }
    } catch (error) {
      console.error('Error fetching quick links:', error);
    } finally {
      setLoading(false);
    }
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

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className={`flex items-center justify-center space-x-4 py-4 ${className}`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-16 h-2 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

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
      {quickLinks && quickLinks.length > 0 ? (
        quickLinks.map((link) => (
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
              <span className="text-xl">{link.icon}</span>
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
        ))
      ) : (
        // Fallback to static links if no data
        getStaticQuickLinks().map((link) => (
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
              <span className="text-xl">{link.icon}</span>
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
        ))
      )}
    </div>
  );
};

export default QuickLinks;
