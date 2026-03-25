import { NextRequest, NextResponse } from 'next/server';

// Mock product data
const mockProducts = [
  {
    id: 'savings-account',
    slug: 'savings-account',
    name: 'Savings Account',
    nameHi: 'बचत खाता',
    category: 'personal',
    description: 'Open a savings account with competitive interest rates and secure banking',
    descriptionHi: 'आकर्षिव ब्याज दरों और सुरक्षित बैंकिंग के साथ बचत खाता खोलें',
    interestRate: 6.5,
    minAmount: 500,
    maxAmount: null,
    features: ['Competitive interest rates', 'Secure banking', '24/7 online access'],
    featuresHi: ['आकर्षिव ब्याज दरें', 'सुरक्षित बैंकिंग', '24/7 ऑनलाइन एक्सेस'],
    eligibility: {
      age: '18 years and above',
      ageHi: '18 वर्ष या उससे',
      documents: ['PAN card', 'Aadhaar card', 'Address proof', 'Passport photo'],
      documentsHi: ['पैन कार्ड', 'आधार कार्ड', 'पता प्रमाण', 'पासपोर्ट फोटो']
    },
    image: '/images/savings-account.jpg',
    badge: {
      text: 'Popular',
      textHi: 'लोकप्रिय',
      color: 'blue'
    }
  },
  {
    id: 'personal-loan',
    slug: 'personal-loan',
    name: 'Personal Loan',
    nameHi: 'व्यक्तिगत ऋण',
    category: 'personal',
    description: 'Fulfill your dreams with our flexible personal loan options',
    descriptionHi: 'हमारे लचबील व्यक्तिगत ऋण विकल्पों के साथ अपने सपने को पूरा करें',
    interestRate: 11.5,
    minAmount: 50000,
    maxAmount: 1000000,
    features: ['Low interest rates', 'Flexible tenure', 'Quick processing'],
    featuresHi: ['कम ब्याज दरें', 'लचबील अवधि', 'तेज प्रोसेसिंग'],
    eligibility: {
      age: '21 years and above',
      ageHi: '21 वर्ष या उससे',
      documents: ['PAN card', 'Aadhaar card', 'Income proof', 'Address proof'],
      documentsHi: ['पैन कार्ड', 'आधार कार्ड', 'आय प्रूफ', 'पता प्रमाण']
    },
    image: '/images/personal-loan.jpg',
    badge: {
      text: 'Flexible',
      textHi: 'लचबील',
      color: 'yellow'
    }
  },
  {
    id: 'current-account',
    slug: 'current-account',
    name: 'Current Account',
    nameHi: 'वर्तमान खाता',
    category: 'business',
    description: 'Manage your daily business operations with our feature-rich current account',
    descriptionHi: 'हमारे विशेष-समृद्ध वर्तमान खाते के साथ अपना दैनिक व्यापार संचालन करें',
    interestRate: 3.5,
    minAmount: 0,
    maxAmount: null,
    features: ['Zero balance requirement', 'Free quarterly statements', 'Overdraft facility'],
    featuresHi: ['शून्य लेनदेन', 'फ्री त्रैमासिक स्टेटमेंट', 'ओवरड्राफ्ट सुविधा'],
    eligibility: {
      age: '18 years and above',
      ageHi: '18 वर्ष या उससे',
      documents: ['Business registration', 'PAN card', 'Aadhaar card', 'Address proof'],
      documentsHi: ['व्यापार पंजीकरण', 'पैन कार्ड', 'आधार कार्ड', 'पता प्रमाण']
    },
    image: '/images/current-account.jpg',
    badge: {
      text: 'Business',
      textHi: 'व्यापार',
      color: 'blue'
    }
  },
  {
    id: 'business-loan',
    slug: 'business-loan',
    name: 'Business Loan',
    nameHi: 'व्यापार ऋण',
    category: 'business',
    description: 'Grow your business with our flexible business loan options',
    descriptionHi: 'हमारे लचबील व्यापार ऋण विकल्पों के साथ अपना व्यापार बढ़ाएं',
    interestRate: 10.5,
    minAmount: 100000,
    maxAmount: 5000000,
    features: ['High loan amounts', 'Flexible tenure', 'Quick processing'],
    featuresHi: ['उच्च ऋण राशि', 'लचबील अवधि', 'तेज प्रोसेसिंग'],
    eligibility: {
      age: '21 years and above',
      ageHi: '21 वर्ष या उससे',
      documents: ['Business registration', 'PAN card', 'Income proof', 'Address proof'],
      documentsHi: ['व्यापार पंजीकरण', 'पैन कार्ड', 'आय प्रूफ', 'पता प्रमाण']
    },
    image: '/images/business-loan.jpg',
    badge: {
      text: 'High Amount',
      textHi: 'उच्च राशि',
      color: 'green'
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const locale = searchParams.get('locale') || 'en';

    // Filter products by category if specified
    let filteredProducts = mockProducts;
    if (category && category !== 'all') {
      filteredProducts = mockProducts.filter(product => product.category === category);
    }

    // Add locale-specific content
    const productsWithLocale = filteredProducts.map(product => ({
      ...product,
      name: locale === 'hi' ? product.nameHi : product.name,
      description: locale === 'hi' ? product.descriptionHi : product.description,
      features: locale === 'hi' ? product.featuresHi : product.features,
      eligibility: {
        ...product.eligibility,
        age: locale === 'hi' ? product.eligibility.ageHi : product.eligibility.age,
        documents: locale === 'hi' ? product.eligibility.documentsHi : product.eligibility.documents
      },
      badge: {
        ...product.badge,
        text: locale === 'hi' ? product.badge.textHi : product.badge.text
      }
    }));

    return NextResponse.json({
      success: true,
      data: productsWithLocale,
      count: productsWithLocale.length
    });

  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch products',
        message: 'An error occurred while fetching product listings'
      },
      { status: 500 }
    );
  }
}
