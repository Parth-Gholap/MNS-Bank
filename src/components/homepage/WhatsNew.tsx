'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface NewsItem {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  date: string;
  category: string;
  categoryHi: string;
  link: string;
  featured: boolean;
}

interface WhatsNewProps {
  locale: 'en' | 'hi';
  className?: string;
}

const WhatsNew: React.FC<WhatsNewProps> = ({ locale, className = '' }) => {
  const { t } = useTranslation(locale);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    trackPageView('Whats New Section', locale === 'hi' ? 'नया क्या है' : 'What\'s New');
    fetchNewsItems();
  }, [locale]);

  const fetchNewsItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bank-data?type=news&locale=${locale}&category=${selectedCategory}`);
      const result = await response.json();
      
      if (result.success) {
        setNewsItems(result.data.newsItems || []);
      }
    } catch (error) {
      console.error('Error fetching news items:', error);
      // Fallback to static items
      setNewsItems(getStaticNewsItems());
    } finally {
      setLoading(false);
    }
  };

  const getStaticNewsItems = (): NewsItem[] => {
    return [
      {
        id: '1',
        title: 'New Digital Banking Platform Launched',
        titleHi: 'नया डिजिटल बैंकिंग प्लेटफॉर्म लॉन्च',
        description: 'Experience our revolutionary digital banking platform with enhanced features',
        descriptionHi: 'बेहतर सुविधाओं के साथ हमारे क्रांतिकारी डिजिटल बैंकिंग प्लेटफॉर्म का अनुभव करें',
        date: '2024-03-15',
        category: 'Digital Banking',
        categoryHi: 'डिजिटल बैंकिंग',
        link: '/news/digital-banking-platform',
        featured: true
      },
      {
        id: '2',
        title: 'Home Loan Interest Rates Reduced',
        titleHi: 'होम लोन ब्याज दरें कम हुई',
        description: 'Now get home loans at historically low interest rates starting from 6.5%',
        descriptionHi: 'अब 6.5% से शुरू होम लोन पर ऐतिहासिक रूप से कम ब्याज दरें प्राप्त करें',
        date: '2024-03-10',
        category: 'Loans',
        categoryHi: 'ऋण',
        link: '/news/home-loan-rates-reduced',
        featured: true
      },
      {
        id: '3',
        title: 'Mobile Banking App Updated',
        titleHi: 'मोबाइल बैंकिंग ऐप अपडेट',
        description: 'Enhanced mobile banking app with new features and improved user experience',
        descriptionHi: 'नए सुविधाओं और बेहतर उपयोगक अनुभव के साथ बेहतर मोबाइल बैंकिंग ऐप',
        date: '2024-03-05',
        category: 'Digital Banking',
        categoryHi: 'डिजिटल बैंकिंग',
        link: '/news/mobile-banking-app-updated',
        featured: false
      },
      {
        id: '4',
        title: 'New Credit Card Benefits',
        titleHi: 'नए क्रेडिट कार्ड लाभ',
        description: 'Exclusive benefits and cashback offers on our premium credit cards',
        descriptionHi: 'हमारे प्रीमियम क्रेडिट कार्ड पर अनन्य लाभ और कैशबैक ऑफर',
        date: '2024-03-01',
        category: 'Cards',
        categoryHi: 'कार्ड',
        link: '/news/new-credit-card-benefits',
        featured: false
      },
      {
        id: '5',
        title: 'Business Banking Solutions Enhanced',
        titleHi: 'व्यवसाय बैंकिंग समाधान बेहतर',
        description: 'Comprehensive banking solutions designed for modern businesses',
        descriptionHi: 'आधुनिक व्यवसायों के लिए डिजाइन किए गए व्यापक बैंकिंग समाधान',
        date: '2024-02-28',
        category: 'Business Banking',
        categoryHi: 'व्यवसाय बैंकिंग',
        link: '/news/business-banking-solutions',
        featured: false
      }
    ];
  };

  const categories = [
    { value: 'all', label: locale === 'hi' ? 'सभी' : 'All', labelHi: 'सभी' },
    { value: 'digital-banking', label: locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking', labelHi: 'डिजिटल बैंकिंग' },
    { value: 'loans', label: locale === 'hi' ? 'ऋण' : 'Loans', labelHi: 'ऋण' },
    { value: 'cards', label: locale === 'hi' ? 'कार्ड' : 'Cards', labelHi: 'कार्ड' },
    { value: 'business-banking', label: locale === 'hi' ? 'व्यवसाय बैंकिंग' : 'Business Banking', labelHi: 'व्यवसाय बैंकिंग' }
  ];

  const filteredNewsItems = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category.toLowerCase().replace(' ', '-') === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'hi' ? 'en-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'digital-banking': 'bg-blue-100 text-blue-800',
      'loans': 'bg-green-100 text-green-800',
      'cards': 'bg-purple-100 text-purple-800',
      'business-banking': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {locale === 'hi' ? 'नया क्या है' : 'What\'s New'}
        </h2>
        <a
          href="/news"
          className="text-bank-blue-600 hover:text-bank-blue-700 font-medium"
        >
          {locale === 'hi' ? 'सभी देखें' : 'View All'}
        </a>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category.value
                ? getCategoryColor(category.value)
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {locale === 'hi' ? category.labelHi : category.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bank-blue-600"></div>
          <span className="ml-4 text-gray-600">
            {locale === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
          </span>
        </div>
      )}

      {/* News Items */}
      {!loading && (
        <div className="space-y-4">
          {filteredNewsItems.map((item) => (
            <div
              key={item.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${
                item.featured 
                  ? 'border-bank-blue-200 bg-bank-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Category Badge */}
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(item.category)}`}>
                    {locale === 'hi' ? item.categoryHi : item.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {locale === 'hi' ? item.titleHi : item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {locale === 'hi' ? item.descriptionHi : item.description}
                  </p>
                  
                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m2 0v4m0 4h2M5 7h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    {formatDate(item.date)}
                  </div>
                </div>
                
                {/* Featured Badge */}
                {item.featured && (
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.322 0 .639.139.858.529l8.117 8.117a2 2 0 01.587.935.695.653l-8.116-8.116a2 2 0 01-.587-.935-.693-.653z" />
                      </svg>
                      {locale === 'hi' ? 'विशेष' : 'Featured'}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Read More Link */}
              <div className="ml-4">
                <a
                  href={item.link}
                  className="text-bank-blue-600 hover:text-bank-blue-700 font-medium text-sm"
                >
                  {locale === 'hi' ? 'और पढ़ें' : 'Read More'}
                  <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Items State */}
      {!loading && filteredNewsItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2v2a2 2 0 002-2h-2a2 2 0 00-2-2z" />
            </svg>
          </div>
          <p className="text-gray-600">
            {locale === 'hi' ? 'इस श्रेणी में कोई नई खबर नहीं' : 'No news items in this category'}
          </p>
        </div>
      )}
    </div>
  );
};

export default WhatsNew;
