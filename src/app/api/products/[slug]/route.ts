import { NextRequest, NextResponse } from 'next/server';

// Mock product data
const mockProducts = {
  'savings-account': {
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
    },
    kfsItems: [
      {
        label: 'Interest Rate',
        labelHi: 'ब्याज दर',
        value: '6.5% p.a.',
        description: 'Annual interest rate'
      },
      {
        label: 'Minimum Balance',
        labelHi: 'न्यूनतम शेष',
        value: '₹500',
        description: 'Minimum balance to maintain'
      },
      {
        label: 'Service Charges',
        labelHi: 'सेवा शुल्क',
        value: 'Nil',
        description: 'No service charges'
      }
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        labelHi: 'अवलोक',
        content: 'Benefits of our savings account include competitive interest rates, secure banking, and 24/7 online access.'
      },
      {
        id: 'features',
        label: 'Features',
        labelHi: 'विशेष',
        content: 'Key features include competitive interest rates, secure banking, and mobile banking access.'
      },
      {
        id: 'eligibility',
        label: 'Eligibility',
        labelHi: 'पात्रता',
        content: 'Must be 18 years and above with valid KYC documents.'
      },
      {
        id: 'documents',
        label: 'Documents',
        labelHi: 'दस्तावेज',
        content: 'Required documents include PAN card, Aadhaar card, address proof, and passport photo.'
      },
      {
        id: 'apply',
        label: 'Apply',
        labelHi: 'आवेदन करें',
        content: 'Apply online for savings account with our simple application form.'
      }
    ]
  },
  'personal-loan': {
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
    },
    kfsItems: [
      {
        label: 'Interest Rate',
        labelHi: 'ब्याज दर',
        value: '11.5% p.a.',
        description: 'Annual interest rate'
      },
      {
        label: 'Loan Amount',
        labelHi: 'ऋण राशि',
        value: '₹50,000 - ₹10,00,000',
        description: 'Loan amount range'
      },
      {
        label: 'Processing Fee',
        labelHi: 'प्रोसेसिंग शुल्क',
        value: '1% of loan amount',
        description: 'One-time processing fee'
      }
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        labelHi: 'अवलोक',
        content: 'Benefits of our personal loan include low interest rates, flexible tenure, and quick processing.'
      },
      {
        id: 'features',
        label: 'Features',
        labelHi: 'विशेष',
        content: 'Key features include competitive rates, flexible tenure, and no hidden charges.'
      },
      {
        id: 'eligibility',
        label: 'Eligibility',
        labelHi: 'पात्रता',
        content: 'Must be 21 years and above with valid credit score and KYC documents.'
      },
      {
        id: 'documents',
        label: 'Documents',
        labelHi: 'दस्तावेज',
        content: 'Required documents include PAN card, Aadhaar card, income proof, and address proof.'
      },
      {
        id: 'apply',
        label: 'Apply',
        labelHi: 'आवेदन करें',
        content: 'Apply online for personal loan with our simple application form.'
      }
    ]
  },
  'current-account': {
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
    },
    kfsItems: [
      {
        label: 'Interest Rate',
        labelHi: 'ब्याज दर',
        value: '3.5% p.a.',
        description: 'Annual interest rate'
      },
      {
        label: 'Minimum Balance',
        labelHi: 'न्यूनतम शेष',
        value: '₹0',
        description: 'Minimum balance requirement'
      },
      {
        label: 'Service Charges',
        labelHi: 'सेवा शुल्क',
        value: 'Nil',
        description: 'No service charges'
      }
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        labelHi: 'अवलोक',
        content: 'Benefits of our current account include zero balance requirement, free quarterly statements, and overdraft facility.'
      },
      {
        id: 'features',
        label: 'Features',
        labelHi: 'विशेष',
        content: 'Key features include online banking, mobile banking, and multi-city banking.'
      },
      {
        id: 'eligibility',
        label: 'Eligibility',
        labelHi: 'पात्रता',
        content: 'Must be a registered business entity with valid KYC documents.'
      },
      {
        id: 'apply',
        label: 'Apply',
        labelHi: 'आवेदन करें',
        content: 'Apply online for current account with our simple application form.'
      }
    ]
  },
  'business-loan': {
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
    },
    kfsItems: [
      {
        label: 'Interest Rate',
        labelHi: 'ब्याज दर',
        value: '10.5% p.a.',
        description: 'Annual interest rate'
      },
      {
        label: 'Loan Amount',
        labelHi: 'ऋण राशि',
        value: '₹1,00,000 - ₹50,00,000',
        description: 'Loan amount range'
      },
      {
        label: 'Processing Fee',
        labelHi: 'प्रोसेसिंग शुल्क',
        value: '1% of loan amount',
        description: 'One-time processing fee'
      }
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        labelHi: 'अवलोक',
        content: 'Benefits of our business loan include high loan amounts, flexible tenure, and quick processing.'
      },
      {
        id: 'features',
        label: 'Features',
        labelHi: 'विशेष',
        content: 'Key features include competitive rates, flexible tenure, and transparent terms.'
      },
      {
        id: 'eligibility',
        label: 'Eligibility',
        labelHi: 'पात्रता',
        content: 'Must be 21 years and above with minimum annual turnover and valid KYC documents.'
      },
      {
        id: 'apply',
        label: 'Apply',
        labelHi: 'आवेदन करें',
        content: 'Apply online for business loan with our simple application form.'
      }
    ]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const slug = params.slug;

    // Find product by slug
    const product = mockProducts[slug as keyof typeof mockProducts];

    if (!product) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Product not found',
          message: 'The requested product does not exist'
        },
        { status: 404 }
      );
    }

    // Add locale-specific content
    const productWithLocale = {
      ...product,
      name: locale === 'hi' ? product.nameHi : product.name,
      description: locale === 'hi' ? product.descriptionHi : product.description,
      features: locale === 'hi' ? product.featuresHi : product.features,
      eligibility: {
        ...product.eligibility,
        age: locale === 'hi' ? product.eligibility.ageHi : product.eligibility.age,
        documents: locale === 'hi' ? product.eligibility.documentsHi : product.eligibility.documents
      },
      kfsItems: product.kfsItems.map(item => ({
        ...item,
        label: locale === 'hi' ? item.labelHi : item.label
      })),
      tabs: product.tabs.map(tab => ({
        ...tab,
        label: locale === 'hi' ? tab.labelHi : tab.label
      })),
      badge: {
        ...product.badge,
        text: locale === 'hi' ? product.badge.textHi : product.badge.text
      }
    };

    return NextResponse.json({
      success: true,
      data: productWithLocale
    });

  } catch (error) {
    console.error('Product detail API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch product details',
        message: 'An error occurred while fetching product details'
      },
      { status: 500 }
    );
  }
}
