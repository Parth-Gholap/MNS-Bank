import { NextRequest, NextResponse } from 'next/server';

interface CarouselItem {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  image: string;
  link: string;
  linkText: string;
  linkTextHi: string;
  order: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Mock carousel data
    const carouselItems: CarouselItem[] = [
      {
        id: '1',
        title: 'Digital Banking Revolution',
        titleHi: 'डिजिटल बैंकिंग क्रांति',
        description: 'Experience the future of banking with our cutting-edge digital platform featuring instant transfers, bill payments, and investment tools.',
        descriptionHi: 'त्वरित डिजिटल प्लेटफॉर्म के साथ बैंकिंग का भविष्य अनुभव करें जिसमें त्वरित ट्रांसफर, बिल भुगतान, और निवेशन उपकरण शामिल हैं।',
        image: '/images/carousel/digital-banking.jpg',
        link: '/digital-banking',
        linkText: 'Learn More',
        linkTextHi: 'और जानें',
        order: 1,
        active: true,
        startDate: '2024-03-01',
        endDate: '2024-12-31'
      },
      {
        id: '2',
        title: 'Home Loan at 6.5%',
        titleHi: '6.5% पर होम लोन',
        description: 'Get your dream home with India\'s lowest home loan interest rates starting from just 6.5% with flexible tenure options.',
        descriptionHi: 'भारत के सबसे कम होम लोन ब्याज दरों से सिर्फ 6.5% से शुरू होम लोन पर अपना सपना घर लें।',
        image: '/images/carousel/home-loan.jpg',
        link: '/personal/loans/home-loan',
        linkText: 'Apply Now',
        linkTextHi: 'अभी आवेदन करें',
        order: 2,
        active: true,
        startDate: '2024-03-01',
        endDate: '2024-12-31'
      },
      {
        id: '3',
        title: 'Zero Balance Savings Account',
        titleHi: 'जीरो शेष बचत खाता',
        description: 'Banking without minimum balance requirements. Enjoy complete freedom with our zero balance savings account.',
        descriptionHi: 'न्यूनतम शेष आवश्यकता के बिना बैंकिंग। हमारे जीरो शेष बचत खाते के साथ पूर्ण आजादी का अनुभव करें।',
        image: '/images/carousel/savings-account.jpg',
        link: '/personal/savings-account',
        linkText: 'Open Account',
        linkTextHi: 'खाता खोलें',
        order: 3,
        active: true,
        startDate: '2024-03-01',
        endDate: '2024-12-31'
      },
      {
        id: '4',
        title: 'Business Banking Solutions',
        titleHi: 'व्यवसाय बैंकिंग समाधान',
        description: 'Comprehensive banking solutions designed specifically for modern businesses with unlimited transactions and overdraft facility.',
        descriptionHi: 'आधुनिक व्यवसायों के लिए डिजाइन किए गए व्यापक बैंकिंग समाधान जिसमें असीमित लेनदेन और ओवरड्राफ्ट सुविधा शामिल है।',
        image: '/images/carousel/business-banking.jpg',
        link: '/business/current-account',
        linkText: 'Explore',
        linkTextHi: 'अन्वेषण करें',
        order: 4,
        active: true,
        startDate: '2024-03-01',
        endDate: '2024-12-31'
      }
    ];

    // Filter by locale and active status
    const filteredItems = carouselItems
      .filter(item => item.active)
      .sort((a, b) => a.order - b.order);

    // Log for analytics
    console.log('Carousel API accessed:', {
      locale,
      itemCount: filteredItems.length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        items: filteredItems,
        summary: {
          totalItems: carouselItems.length,
          activeItems: filteredItems.length,
          locale,
          lastUpdated: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Carousel API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching carousel items'
      },
      { status: 500 }
    );
  }
}
