import { NextRequest, NextResponse } from 'next/server';

interface DigitalService {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  link: string;
  category: string;
  categoryHi: string;
  featured: boolean;
  downloadAvailable: boolean;
  guideAvailable: boolean;
}

// Mock digital services data
const digitalServices: DigitalService[] = [
  {
    id: 'upi-qr',
    title: 'UPI & QR Services',
    titleHi: 'यूपीआई और क्यूआर सेवाएं',
    description: 'Unified Payments Interface and QR code-based payments for instant money transfers',
    descriptionHi: 'तुरंत पैसा ट्रांसफर और क्यूआर कोड-आधारित भुगतान के लिए तत्काल धनर हस्तांतर',
    icon: 'qr-code',
    link: '/digital-services/upi-qr',
    category: 'payments',
    categoryHi: 'भुगतान',
    featured: true,
    downloadAvailable: true,
    guideAvailable: true
  },
  {
    id: 'bbps',
    title: 'BBPS Bill Payments',
    titleHi: 'बीबीपीएस बिल भुगतान',
    description: 'Bharat Bill Payment System for utility bill payments across India',
    descriptionHi: 'भारत बिल भुगतान प्रणाली भारत भर में उपयोगिता बिल भुगतान के लिए',
    icon: 'receipt',
    link: '/digital-services/bbps',
    category: 'payments',
    categoryHi: 'भुगतान',
    featured: true,
    downloadAvailable: true,
    guideAvailable: true
  },
  {
    id: 'mobile-banking',
    title: 'Mobile Banking',
    titleHi: 'मोबाइल बैंकिंग',
    description: 'Complete mobile banking app for account management and transactions',
    descriptionHi: 'खाता प्रबंधन और लेनदेन के लिए पूर्ण मोबाइल बैंकिंग ऐप',
    icon: 'smartphone',
    link: '/digital-services/mobile-banking',
    category: 'banking',
    categoryHi: 'बैंकिंग',
    featured: true,
    downloadAvailable: true,
    guideAvailable: true
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const category = searchParams.get('category');

    let filteredServices = digitalServices;
    
    if (category && category !== 'all') {
      filteredServices = digitalServices.filter(service => service.category === category);
    }

    console.log('Digital Services API accessed:', {
      locale,
      category,
      serviceCount: filteredServices.length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        services: filteredServices,
        summary: {
          totalServices: digitalServices.length,
          filteredServices: filteredServices.length,
          locale: locale,
          categories: Array.from(new Set(digitalServices.map(s => s.category)))
        }
      }
    });

  } catch (error) {
    console.error('Digital Services API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching digital services'
      },
      { status: 500 }
    );
  }
}
