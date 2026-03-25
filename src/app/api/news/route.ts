import { NextRequest, NextResponse } from 'next/server';

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
  author: string;
  authorHi: string;
  readTime: number;
  tags: string[];
  tagsHi: string[];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const category = searchParams.get('category') || 'all';

    // Mock news data
    const newsItems: NewsItem[] = [
      {
        id: '1',
        title: 'New Digital Banking Platform Launched',
        titleHi: 'नया डिजिटल बैंकिंग प्लेटफॉर्म लॉन्च',
        description: 'Experience our revolutionary digital banking platform with enhanced features, improved security, and seamless user experience.',
        descriptionHi: 'बेहतर सुविधाओं के साथ हमारे क्रांतिकारी डिजिटल बैंकिंग प्लेटफॉर्म का अनुभव करें।',
        date: '2024-03-15',
        category: 'digital-banking',
        categoryHi: 'डिजिटल बैंकिंग',
        link: '/news/digital-banking-platform',
        featured: true,
        author: 'Bank Management',
        authorHi: 'बैंक प्रबंधन',
        readTime: 3,
        tags: ['digital', 'platform', 'launch'],
        tagsHi: ['डिजिटल', 'प्लेटफॉर्म', 'लॉन्च']
      },
      {
        id: '2',
        title: 'Home Loan Interest Rates Reduced',
        titleHi: 'होम लोन ब्याज दरें कम हुई',
        description: 'Now get home loans at historically low interest rates starting from 6.5% with flexible repayment options.',
        descriptionHi: 'अब 6.5% से शुरू होम लोन पर ऐतिहासिक रूप से कम ब्याज दरें प्राप्त करें।',
        date: '2024-03-10',
        category: 'loans',
        categoryHi: 'ऋण',
        link: '/news/home-loan-rates-reduced',
        featured: true,
        author: 'Loan Department',
        authorHi: 'ऋण विभाग',
        readTime: 2,
        tags: ['home-loan', 'interest-rates', 'reduction'],
        tagsHi: ['होम-लोन', 'ब्याज-दरें', 'कमी']
      },
      {
        id: '3',
        title: 'Mobile Banking App Updated',
        titleHi: 'मोबाइल बैंकिंग ऐप अपडेट',
        description: 'Enhanced mobile banking app with new features including UPI payments, bill payments, and investment tracking.',
        descriptionHi: 'यूपीआई भुगतान, बिल भुगतान, और निवेशन ट्रैकिंग के साथ बेहतर मोबाइल बैंकिंग ऐप अपडेट।',
        date: '2024-03-05',
        category: 'digital-banking',
        categoryHi: 'डिजिटल बैंकिंग',
        link: '/news/mobile-banking-app-updated',
        featured: false,
        author: 'Digital Team',
        authorHi: 'डिजिटल टीम',
        readTime: 4,
        tags: ['mobile', 'app', 'update', 'upi'],
        tagsHi: ['मोबाइल', 'ऐप', 'अपडेट', 'यूपीआई']
      },
      {
        id: '4',
        title: 'New Credit Card Benefits',
        titleHi: 'नए क्रेडिट कार्ड लाभ',
        description: 'Exclusive benefits and cashback offers on our premium credit cards including airport lounge access and travel insurance.',
        descriptionHi: 'हमारे प्रीमियम क्रेडिट कार्ड पर एयरपोर्ट लाउंज एक्सेस और ट्रैवल इंश्योरें सहित अनन्य लाभ।',
        date: '2024-03-01',
        category: 'cards',
        categoryHi: 'कार्ड',
        link: '/news/new-credit-card-benefits',
        featured: false,
        author: 'Cards Division',
        authorHi: 'कार्ड विभाग',
        readTime: 5,
        tags: ['credit-card', 'benefits', 'cashback'],
        tagsHi: ['क्रेडिट-कार्ड', 'लाभ', 'कैशबैक']
      },
      {
        id: '5',
        title: 'Business Banking Solutions Enhanced',
        titleHi: 'व्यवसाय बैंकिंग समाधान बेहतर',
        description: 'Comprehensive banking solutions designed specifically for modern businesses with unlimited transactions and overdraft facility.',
        descriptionHi: 'आधुनिक व्यवसायों के लिए डिजाइन किए गए व्यापक बैंकिंग समाधान जिसमें असीमित लेनदेन और ओवरड्राफ्ट सुविधा शामिल है।',
        date: '2024-02-28',
        category: 'business-banking',
        categoryHi: 'व्यवसाय बैंकिंग',
        link: '/news/business-banking-solutions',
        featured: false,
        author: 'Business Banking',
        authorHi: 'व्यवसाय बैंकिंग',
        readTime: 6,
        tags: ['business', 'solutions', 'overdraft'],
        tagsHi: ['व्यवसाय', 'समाधान', 'ओवरड्राफ्ट']
      }
    ];

    // Filter by locale and category
    const filteredItems = category === 'all' 
      ? newsItems 
      : newsItems.filter(item => item.category.toLowerCase().replace(' ', '-') === category);

    // Sort by date (newest first) and featured items first
    const sortedItems = filteredItems.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Log for analytics
    console.log('News API accessed:', {
      locale,
      category,
      itemCount: sortedItems.length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        items: sortedItems,
        summary: {
          totalItems: newsItems.length,
          filteredItems: sortedItems.length,
          categories: Array.from(new Set(newsItems.map(item => item.category))),
          locale,
          lastUpdated: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching news items'
      },
      { status: 500 }
    );
  }
}
