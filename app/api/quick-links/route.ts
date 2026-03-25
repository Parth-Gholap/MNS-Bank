import { NextRequest, NextResponse } from 'next/server';

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
  order: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Mock quick links data
    const quickLinks: QuickLink[] = [
      {
        id: '1',
        title: 'Open Account',
        titleHi: 'खाता खोलें',
        description: 'Start banking with us in minutes',
        descriptionHi: 'मिनटों में हमारे साथ बैंकिंग शुरू करें',
        icon: 'account-plus',
        link: '/personal/savings-account',
        color: 'blue',
        featured: true,
        order: 1
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
        featured: true,
        order: 2
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
        featured: true,
        order: 3
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
        featured: false,
        order: 4
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
        featured: false,
        order: 5
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
        featured: false,
        order: 6
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
        featured: false,
        order: 7
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
        featured: false,
        order: 8
      }
    ];

    // Sort by order
    const sortedLinks = quickLinks.sort((a, b) => a.order - b.order);

    // Log for analytics
    console.log('Quick Links API accessed:', {
      locale,
      linkCount: sortedLinks.length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        links: sortedLinks,
        summary: {
          totalLinks: quickLinks.length,
          featuredLinks: quickLinks.filter(link => link.featured).length,
          locale,
          lastUpdated: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Quick Links API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching quick links'
      },
      { status: 500 }
    );
  }
}
