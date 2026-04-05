import { NextRequest, NextResponse } from 'next/server';

// Import all business logic from src/lib
import { 
  calculateEMI, 
  getLoanPresets,
  EMICalculationInput 
} from '@/lib/calculator/emi';

import { 
  getProductRecommendations 
} from '@/lib/products/recommendations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const type = searchParams.get('type') || '';
    const action = searchParams.get('action') || '';

    // Handle different data types
    switch (type) {
      case 'calculator':
        return handleCalculatorAPI(searchParams, locale);
      
      case 'products':
        return handleProductsAPI(searchParams, locale);
      
      case 'quick-links':
        return handleQuickLinksAPI(locale);
      
      case 'carousel':
        return handleCarouselAPI(locale);
      
      case 'news':
        return handleNewsAPI(searchParams, locale);
      
      case 'rates':
        return handleRatesAPI(locale);
      
      case 'charges':
        return handleChargesAPI(locale);
      
      case 'locations':
        return handleLocationsAPI(locale);
      
      case 'compliance':
        return handleComplianceAPI(searchParams, locale);
      
      case 'alerts':
        return handleAlertsAPI(locale);
      
      case 'trust':
        return handleTrustAPI(searchParams, locale);
      
      case 'bookmarks':
        return handleBookmarksAPI(request, searchParams, locale);
      
      case 'inquiries':
        return handleInquiriesAPI(request, searchParams, locale);
      
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid data type requested'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

async function handleCalculatorAPI(searchParams: URLSearchParams, locale: string) {
  const action = searchParams.get('action') || 'calculate';
  
  switch (action) {
    case 'presets':
      return NextResponse.json({
        success: true,
        data: {
          presets: getLoanPresets().map(preset => ({
            ...preset,
            name: locale === 'hi' ? preset.nameHi : preset.name
          }))
        }
      });
    
    case 'calculate':
      const principal = parseFloat(searchParams.get('principal') || '0');
      const rate = parseFloat(searchParams.get('rate') || '0');
      const tenure = parseInt(searchParams.get('tenure') || '0');
      
      const emiResult = calculateEMI({
        principal,
        rate,
        tenure,
        frequency: 'monthly'
      });
      
      return NextResponse.json({
        success: true,
        data: { ...emiResult, principal, rate, tenure }
      });
    
    default:
      return NextResponse.json({
        success: false,
        error: 'Invalid calculator action'
      }, { status: 400 });
  }
}

async function handleProductsAPI(searchParams: URLSearchParams, locale: string) {
  const category = searchParams.get('category') || 'all';
  const featured = searchParams.get('featured') === 'true';
  
  // For now, return mock data since getProductRecommendations has different signature
  const recommendations = [
    {
      id: 'savings-account',
      name: locale === 'hi' ? 'बचत खाता' : 'Savings Account',
      nameHi: 'बचत खाता',
      description: locale === 'hi' ? 'आकर्षक ब्याज दरें' : 'Attractive interest rates',
      descriptionHi: 'आकर्षक ब्याज दरें',
      image: '/images/products/savings-account.png',
      link: `/${locale}/personal/accounts`,
      category: 'personal',
      categoryHi: 'व्यक्तिगत',
      interestRate: locale === 'hi' ? '4% - 6%' : '4% - 6%',
      interestRateHi: '4% - 6%',
      features: [
        locale === 'hi' ? 'कोई न्यूनतम शेष नहीं' : 'No minimum balance',
        locale === 'hi' ? 'ऑनलाइन बैंकिंग' : 'Online banking',
        locale === 'hi' ? 'डेबिट कार्ड' : 'Debit card'
      ],
      featuresHi: [
        'कोई न्यूनतम शेष नहीं',
        'ऑनलाइन बैंकिंग',
        'डेबिट कार्ड'
      ],
      popular: true
    },
    {
      id: 'personal-loan',
      name: locale === 'hi' ? 'व्यक्तिगत ऋण' : 'Personal Loan',
      nameHi: 'व्यक्तिगत ऋण',
      description: locale === 'hi' ? 'तुरंत ऋण स्वीकृति' : 'Instant loan approval',
      descriptionHi: 'तुरंत ऋण स्वीकृति',
      image: '/images/products/personal-loan.png',
      link: `/${locale}/personal/loans`,
      category: 'personal',
      categoryHi: 'व्यक्तिगत',
      interestRate: locale === 'hi' ? '10.5% - 14%' : '10.5% - 14%',
      interestRateHi: '10.5% - 14%',
      features: [
        locale === 'hi' ? 'न्यूनतम दस्तावेज़' : 'Minimal documentation',
        locale === 'hi' ? 'तेज़ स्वीकृति' : 'Quick approval',
        locale === 'hi' ? 'लचीली भुगतान' : 'Flexible repayment'
      ],
      featuresHi: [
        'न्यूनतम दस्तावेज़',
        'तेज़ स्वीकृति',
        'लचीली भुगतान'
      ],
      popular: true
    },
    {
      id: 'home-loan',
      name: locale === 'hi' ? 'होम लोन' : 'Home Loan',
      nameHi: 'होम लोन',
      description: locale === 'hi' ? 'कम ब्याज दरें' : 'Low interest rates',
      descriptionHi: 'कम ब्याज दरें',
      image: '/images/products/home-loan.png',
      link: `/${locale}/personal/loans`,
      category: 'personal',
      categoryHi: 'व्यक्तिगत',
      interestRate: locale === 'hi' ? '6.5% - 8.5%' : '6.5% - 8.5%',
      interestRateHi: '6.5% - 8.5%',
      features: [
        locale === 'hi' ? 'लंबी अवधि' : 'Long tenure',
        locale === 'hi' ? 'कम ईएमआई' : 'Low EMI',
        locale === 'hi' ? 'त्वरित संसाधन' : 'Quick processing'
      ],
      featuresHi: [
        'लंबी अवधि',
        'कम ईएमआई',
        'त्वरित संसाधन'
      ],
      popular: false
    },
    {
      id: 'credit-card',
      name: locale === 'hi' ? 'क्रेडिट कार्ड' : 'Credit Card',
      nameHi: 'क्रेडिट कार्ड',
      description: locale === 'hi' ? 'प्रीमियम कार्ड' : 'Premium cards',
      descriptionHi: 'प्रीमियम कार्ड',
      image: '/images/products/credit-card.png',
      link: `/${locale}/personal/cards`,
      category: 'personal',
      categoryHi: 'व्यक्तिगत',
      features: [
        locale === 'hi' ? 'रिवॉर्ड पॉइंट' : 'Reward points',
        locale === 'hi' ? 'ईएमआई परिवर्तन' : 'EMI conversion',
        locale === 'hi' ? 'विश्व स्तरीय स्वीकृति' : 'Worldwide acceptance'
      ],
      featuresHi: [
        'रिवॉर्ड पॉइंट',
        'ईएमआई परिवर्तन',
        'विश्व स्तरीय स्वीकृति'
      ],
      popular: false
    },
    {
      id: 'current-account',
      name: locale === 'hi' ? 'चालू खाता' : 'Current Account',
      nameHi: 'चालू खाता',
      description: locale === 'hi' ? 'व्यवसाय खाता' : 'Business account',
      descriptionHi: 'व्यवसाय खाता',
      image: '/images/products/current-account.png',
      link: `/${locale}/business/accounts`,
      category: 'business',
      categoryHi: 'व्यवसाय',
      features: [
        locale === 'hi' ? 'ओवरड्राफ्ट सुविधा' : 'Overdraft facility',
        locale === 'hi' ? 'बहु-शाखा बैंकिंग' : 'Multi-branch banking',
        locale === 'hi' ? 'ऑनलाइन लेनदेन' : 'Online transactions'
      ],
      featuresHi: [
        'ओवरड्राफ्ट सुविधा',
        'बहु-शाखा बैंकिंग',
        'ऑनलाइन लेनदेन'
      ],
      popular: false
    },
    {
      id: 'fixed-deposit',
      name: locale === 'hi' ? 'सावधि जमा' : 'Fixed Deposit',
      nameHi: 'सावधि जमा',
      description: locale === 'hi' ? 'उच्च ब्याज दरें' : 'High interest rates',
      descriptionHi: 'उच्च ब्याज दरें',
      image: '/images/products/fixed-deposit.png',
      link: `/${locale}/personal/deposits`,
      category: 'personal',
      categoryHi: 'व्यक्तिगत',
      interestRate: locale === 'hi' ? '7% - 8.5%' : '7% - 8.5%',
      interestRateHi: '7% - 8.5%',
      features: [
        locale === 'hi' ? 'लचीली अवधि' : 'Flexible tenure',
        locale === 'hi' ? 'ऋण के विरुद्ध' : 'Loan against deposit',
        locale === 'hi' ? 'कर बचत' : 'Tax benefits'
      ],
      featuresHi: [
        'लचीली अवधि',
        'ऋण के विरुद्ध',
        'कर बचत'
      ],
      popular: false
    }
  ];
  
  return NextResponse.json({
    success: true,
    data: recommendations
  });
}

async function handleQuickLinksAPI(locale: string) {
  const quickLinks = [
    {
      id: '1',
      title: locale === 'hi' ? 'खाता खोलें' : 'Open Account',
      titleHi: 'खाता खोलें',
      description: locale === 'hi' ? 'नया बैंक खाता खोलें' : 'Open a new bank account',
      descriptionHi: 'नया बैंक खाता खोलें',
      link: `/${locale}/apply/account`,
      icon: 'account-plus',
      color: 'blue',
      featured: true
    },
    {
      id: '2',
      title: locale === 'hi' ? 'ऋण आवेदन' : 'Apply for Loan',
      titleHi: 'ऋण आवेदन',
      description: locale === 'hi' ? 'व्यक्तिगत ऋण के लिए आवेदन करें' : 'Apply for personal loan',
      descriptionHi: 'व्यक्तिगत ऋण के लिए आवेदन करें',
      link: `/${locale}/apply/loan`,
      icon: 'currency-dollar',
      color: 'green',
      featured: true
    },
    {
      id: '3',
      title: locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking',
      titleHi: 'डिजिटल बैंकिंग',
      description: locale === 'hi' ? 'ऑनलाइन बैंकिंग सेवाएं' : 'Online banking services',
      descriptionHi: 'ऑनलाइन बैंकिंग सेवाएं',
      link: `/${locale}/digital-banking`,
      icon: 'mobile',
      color: 'purple',
      featured: true
    },
    {
      id: '4',
      title: locale === 'hi' ? 'क्रेडिट कार्ड' : 'Credit Cards',
      titleHi: 'क्रेडिट कार्ड',
      description: locale === 'hi' ? 'प्रीमियम क्रेडिट कार्ड' : 'Premium credit cards',
      descriptionHi: 'प्रीमियम क्रेडिट कार्ड',
      link: `/${locale}/personal/cards`,
      icon: 'credit-card',
      color: 'orange',
      featured: true
    },
    {
      id: '5',
      title: locale === 'hi' ? 'निवेश' : 'Investments',
      titleHi: 'निवेश',
      description: locale === 'hi' ? 'अपनी संपत्ति बढ़ाएं' : 'Grow your wealth',
      descriptionHi: 'अपनी संपत्ति बढ़ाएं',
      link: `/${locale}/products`,
      icon: 'trending-up',
      color: 'indigo',
      featured: false
    },
    {
      id: '6',
      title: locale === 'hi' ? 'बीमा' : 'Insurance',
      titleHi: 'बीमा',
      description: locale === 'hi' ? 'बीमा समाधान' : 'Insurance solutions',
      descriptionHi: 'बीमा समाधान',
      link: `/${locale}/products`,
      icon: 'shield',
      color: 'red',
      featured: false
    },
    {
      id: '7',
      title: locale === 'hi' ? 'शाखा ढूंढें' : 'Find Branch',
      titleHi: 'शाखा ढूंढें',
      description: locale === 'hi' ? 'निकटतम शाखा ढूंढें' : 'Locate nearest branch',
      descriptionHi: 'निकटतम शाखा ढूंढें',
      link: `/${locale}/locate-us`,
      icon: 'location-marker',
      color: 'teal',
      featured: false
    },
    {
      id: '8',
      title: locale === 'hi' ? 'ग्राहक सहायता' : 'Customer Support',
      titleHi: 'ग्राहक सहायता',
      description: locale === 'hi' ? '24/7 सहायता' : '24/7 support',
      descriptionHi: '24/7 सहायता',
      link: `/${locale}/contact`,
      icon: 'headphones',
      color: 'gray',
      featured: false
    }
  ];
  
  return NextResponse.json({
    success: true,
    data: { quickLinks, linkCount: quickLinks.length }
  });
}

async function handleCarouselAPI(locale: string) {
  const carouselItems = [
    {
      id: 1,
      title: locale === 'hi' ? 'बचत खाता' : 'Savings Account',
      description: locale === 'hi' ? 'आकर्षक ब्याज दरें' : 'Attractive interest rates',
      image: '/images/carousel/savings-account.png',
      link: `/${locale}/personal/savings-account`
    },
    {
      id: 2,
      title: locale === 'hi' ? 'होम लोन' : 'Home Loan',
      description: locale === 'hi' ? 'कम ब्याज दरें' : 'Low interest rates',
      image: '/images/carousel/home-loan.png',
      link: `/${locale}/personal/loans/home-loan`
    },
    {
      id: 3,
      title: locale === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking',
      description: locale === 'hi' ? '24/7 बैंकिंग' : '24/7 Banking',
      image: '/images/carousel/digital-banking.png',
      link: `/${locale}/digital-banking`
    },
    {
      id: 4,
      title: locale === 'hi' ? 'व्यवसाय बैंकिंग' : 'Business Banking',
      description: locale === 'hi' ? 'व्यावसायिक समाधान' : 'Business solutions',
      image: '/images/carousel/business-banking.png',
      link: `/${locale}/business`
    }
  ];
  
  return NextResponse.json({
    success: true,
    data: { carouselItems, itemCount: carouselItems.length }
  });
}

async function handleNewsAPI(searchParams: URLSearchParams, locale: string) {
  const category = searchParams.get('category') || 'all';
  
  const newsItems = [
    {
      id: 1,
      title: locale === 'hi' ? 'नई ब्याज दरें घोषित' : 'New Interest Rates Announced',
      summary: locale === 'hi' ? 'बचत खातों पर ब्याज दरें बढ़ी' : 'Interest rates increased on savings accounts',
      date: '2024-03-20',
      category: 'rates'
    },
    {
      id: 2,
      title: locale === 'hi' ? 'डिजिटल बैंकिंग अपडेट' : 'Digital Banking Update',
      summary: locale === 'hi' ? 'नए फीचर्स जोड़े गए' : 'New features added',
      date: '2024-03-18',
      category: 'digital'
    }
  ];
  
  return NextResponse.json({
    success: true,
    data: { 
      newsItems: category === 'all' ? newsItems : newsItems.filter(item => item.category === category),
      category,
      itemCount: newsItems.length
    }
  });
}

async function handleRatesAPI(locale: string) {
  const rates = [
    { type: 'savings', min: 4.0, max: 6.0 },
    { type: 'fixed-deposit', min: 6.5, max: 7.5 },
    { type: 'personal-loan', min: 10.5, max: 14.0 },
    { type: 'home-loan', min: 8.5, max: 11.0 }
  ];
  
  return NextResponse.json({
    success: true,
    data: { rates }
  });
}

async function handleChargesAPI(locale: string) {
  const charges = [
    { service: 'account-maintenance', amount: 500 },
    { service: 'cheque-book', amount: 100 },
    { service: 'debit-card', amount: 200 }
  ];
  
  return NextResponse.json({
    success: true,
    data: { charges }
  });
}

async function handleLocationsAPI(locale: string) {
  const locations = [
    {
      id: 1,
      name: locale === 'hi' ? 'मुख्य शाखा' : 'Main Branch',
      address: '123, Banking Street, Bhopal',
      type: 'branch',
      coordinates: { lat: 23.2599, lng: 77.4126 }
    },
    {
      id: 2,
      name: locale === 'hi' ? 'रेलवे स्टेशन एटीएम' : 'Railway Station ATM',
      address: 'Bhopal Railway Station',
      type: 'atm',
      coordinates: { lat: 23.2599, lng: 77.4126 }
    }
  ];
  
  return NextResponse.json({
    success: true,
    data: { locations }
  });
}

async function handleComplianceAPI(searchParams: URLSearchParams, locale: string) {
  const action = searchParams.get('action') || 'info';
  
  switch (action) {
    case 'info':
      return NextResponse.json({
        success: true,
        data: {
          compliance: {
            rbi: locale === 'hi' ? 'आरबीआई विनियमित' : 'RBI Regulated',
            license: locale === 'hi' ? 'बैंकिंग लाइसेंस' : 'Banking License',
            audit: locale === 'hi' ? 'वार्षिक ऑडिट' : 'Annual Audit'
          }
        }
      });
    
    default:
      return NextResponse.json({
        success: false,
        error: 'Invalid compliance action'
      }, { status: 400 });
  }
}

async function handleGrievancesAPI(searchParams: URLSearchParams, locale: string) {
  const action = searchParams.get('action') || 'submit';
  
  switch (action) {
    case 'submit':
      // Handle grievance submission
      return NextResponse.json({
        success: true,
        data: { message: 'Grievance submitted successfully' }
      });
    
    case 'track':
      // Handle grievance tracking
      return NextResponse.json({
        success: true,
        data: { status: 'In Progress' }
      });
    
    default:
      return NextResponse.json({
        success: false,
        error: 'Invalid grievances action'
      }, { status: 400 });
  }
}

async function handleAlertsAPI(locale: string) {
  const alerts = [
    {
      id: 1,
      title: locale === 'hi' ? 'धोखाधड़ी चेतावनी' : 'Fraud Alert',
      message: locale === 'hi' 
        ? 'कृपया किसी अजनबी से बैंकिंग जानकारी साझा न करें' 
        : 'Never share banking details with strangers',
      type: 'warning'
    },
    {
      id: 2,
      title: locale === 'hi' ? 'सुरक्षा अपडेट' : 'Security Update',
      message: locale === 'hi' 
        ? 'हमारे सुरक्षा उपाय अपडेट किए गए हैं' 
        : 'Our security measures have been updated',
      type: 'info'
    }
  ];
  
  return NextResponse.json({
    success: true,
    data: { alerts }
  });
}

async function handleTrustAPI(searchParams: URLSearchParams, locale: string) {
  const type = searchParams.get('type') || 'all';
  
  const trustData = {
    security: [
      {
        id: 1,
        title: locale === 'hi' ? 'एन्क्रिप्शन सुरक्षा' : 'Encryption Security',
        description: locale === 'hi' ? '256-बिट एन्क्रिप्शन' : '256-bit encryption',
        status: 'active'
      }
    ],
    certifications: [
      {
        id: 1,
        name: locale === 'hi' ? 'आरबीआई प्रमाणित' : 'RBI Certified',
        type: 'certification',
        valid: true
      }
    ]
  };
  
  return NextResponse.json({
    success: true,
    data: type === 'all' ? trustData : (trustData as any)[type] || []
  });
}

async function handleBookmarksAPI(request: NextRequest, searchParams: URLSearchParams, locale: string) {
  const method = request.method;
  const id = searchParams.get('id');
  
  if (method === 'GET') {
    // Return mock bookmarks data
    return NextResponse.json({
      success: true,
      data: { bookmarks: [] }
    });
  }
  
  if (method === 'POST') {
    // Handle bookmark creation
    return NextResponse.json({
      success: true,
      data: { message: 'Bookmark created' }
    });
  }
  
  if (method === 'DELETE' && id) {
    // Handle bookmark deletion
    return NextResponse.json({
      success: true,
      data: { message: 'Bookmark deleted' }
    });
  }
  
  return NextResponse.json({
    success: false,
    error: 'Invalid request'
  }, { status: 400 });
}

async function handleInquiriesAPI(request: NextRequest, searchParams: URLSearchParams, locale: string) {
  if (request.method === 'POST') {
    // Handle inquiry submission
    return NextResponse.json({
      success: true,
      data: { message: 'Inquiry submitted successfully' }
    });
  }
  
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}
