import { NextRequest, NextResponse } from 'next/server';

// Mock related products data
const getRelatedProducts = (productId: string, locale: string = 'en') => {
  const allProducts = [
    {
      id: 'savings-account',
      name: locale === 'hi' ? 'बचत खाता' : 'Savings Account',
      nameHi: 'बचत खाता',
      description: locale === 'hi' 
        ? 'आकर्षिव ब्याज दरों और सुरक्षित बैंकिंग के साथ बचत खाता खोलें'
        : 'Open a savings account with competitive interest rates and secure banking',
      image: '/images/savings-account.jpg',
      interestRate: 6.5,
      ctaText: locale === 'hi' ? 'अधिक जानें' : 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: locale === 'hi' ? '/hi/personal/savings-account' : '/en/personal/savings-account',
      badge: {
        text: 'Popular',
        textHi: 'लोकप्रिय',
        color: 'blue'
      }
    },
    {
      id: 'personal-loan',
      name: locale === 'hi' ? 'व्यक्तिगत ऋण' : 'Personal Loan',
      nameHi: 'व्यक्तिगत ऋण',
      description: locale === 'hi' 
        ? 'हमारे लचबील व्यक्तिगत ऋण विकल्पों के साथ अपने सपने को पूरा करें'
        : 'Fulfill your dreams with our flexible personal loan options',
      image: '/images/personal-loan.jpg',
      interestRate: 11.5,
      ctaText: locale === 'hi' ? 'अधिक जानें' : 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: locale === 'hi' ? '/hi/personal/loans/personal-loan' : '/en/personal/loans/personal-loan',
      badge: {
        text: 'Flexible',
        textHi: 'लचबील',
        color: 'yellow'
      }
    },
    {
      id: 'current-account',
      name: locale === 'hi' ? 'वर्तमान खाता' : 'Current Account',
      nameHi: 'वर्तमान खाता',
      description: locale === 'hi' 
        ? 'हमारे विशेष-समृद्ध वर्तमान खाते के साथ अपना दैनिक व्यापार संचालन करें'
        : 'Manage your daily business operations with our feature-rich current account',
      image: '/images/current-account.jpg',
      interestRate: 3.5,
      ctaText: locale === 'hi' ? 'अधिक जानें' : 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: locale === 'hi' ? '/hi/business/current-account' : '/en/business/current-account',
      badge: {
        text: 'Business',
        textHi: 'व्यापार',
        color: 'blue'
      }
    },
    {
      id: 'business-loan',
      name: locale === 'hi' ? 'व्यापार ऋण' : 'Business Loan',
      nameHi: 'व्यापार ऋण',
      description: locale === 'hi' 
        ? 'हमारे लचबील व्यापार ऋण विकल्पों के साथ अपना व्यापार बढ़ाएं'
        : 'Grow your business with our flexible business loan options',
      image: '/images/business-loan.jpg',
      interestRate: 10.5,
      ctaText: locale === 'hi' ? 'अधिक जानें' : 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: locale === 'hi' ? '/hi/business/loans/business-loan' : '/en/business/loans/business-loan',
      badge: {
        text: 'High Amount',
        textHi: 'उच्च राशि',
        color: 'green'
      }
    },
    {
      id: 'fixed-deposit',
      name: locale === 'hi' ? 'निर्धारित जमा' : 'Fixed Deposit',
      nameHi: 'निर्धारित जमा',
      description: locale === 'hi' 
        ? 'गारंटीड रिटर्न के साथ निर्धारित जमा पर ब्याज अर्जित करें'
        : 'Earn guaranteed returns with fixed deposit schemes',
      image: '/images/fixed-deposit.jpg',
      interestRate: 7.0,
      ctaText: locale === 'hi' ? 'अधिक जानें' : 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: locale === 'hi' ? '/hi/personal/deposits/fixed-deposit' : '/en/personal/deposits/fixed-deposit',
      badge: {
        text: 'Guaranteed',
        textHi: 'गारंटीड',
        color: 'green'
      }
    },
    {
      id: 'business-deposit',
      name: locale === 'hi' ? 'व्यापार जमा' : 'Business Deposit',
      nameHi: 'व्यापार जमा',
      description: locale === 'hi' 
        ? 'हमारे व्यापार जमा योजनाओं के साथ अपने धन दोगुना करें'
        : 'Maximize your business returns with our attractive deposit schemes',
      image: '/images/business-deposit.jpg',
      interestRate: 5.5,
      ctaText: locale === 'hi' ? 'अधिक जानें' : 'Learn More',
      ctaTextHi: 'अधिक जानें',
      ctaHref: locale === 'hi' ? '/hi/business/deposits/business-deposit' : '/en/business/deposits/business-deposit',
      badge: {
        text: 'Business',
        textHi: 'व्यापार',
        color: 'blue'
      }
    }
  ];

  // Define related products for each product
  const relatedProductsMap: Record<string, string[]> = {
    'savings-account': ['current-account', 'fixed-deposit', 'personal-loan'],
    'personal-loan': ['loan-against-securities', 'business-loan', 'savings-account'],
    'current-account': ['business-deposit', 'business-loan', 'savings-account'],
    'business-loan': ['current-account', 'business-deposit', 'personal-loan'],
    'fixed-deposit': ['recurring-deposit', 'double-deposit', 'savings-account'],
    'business-deposit': ['current-account', 'business-loan', 'fixed-deposit']
  };

  const relatedProductIds = relatedProductsMap[productId] || [];
  const relatedProducts = allProducts.filter(product => 
    relatedProductIds.includes(product.id) && product.id !== productId
  );

  return relatedProducts.slice(0, 3); // Return max 3 related products
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const productId = params.id;

    const relatedProducts = getRelatedProducts(productId, locale);

    return NextResponse.json({
      success: true,
      data: relatedProducts,
      count: relatedProducts.length,
      productId: productId
    });

  } catch (error) {
    console.error('Related products API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch related products',
        message: 'An error occurred while fetching related products'
      },
      { status: 500 }
    );
  }
}
