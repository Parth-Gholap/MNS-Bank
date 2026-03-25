import { NextRequest, NextResponse } from 'next/server';

// Policy Documents API Route Handler
export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url);
  const category = searchParams.searchParams.get('category') || '';
  const locale = request.headers.get('accept-language') || 'en';

  try {
    // Mock policy documents data for now - replace with actual API call
    const mockPolicyDocuments = [
      {
        id: 'POL001',
        title: locale === 'hi' ? 'निष्प अभ्यास नीति' : 'Fair Practices Code',
        category: 'fair-practices',
        description: locale === 'hi' 
          ? 'हमारे नागरिक सहकारी बैंक की निष्प अभ्यास नीति और प्रक्रियाओं का विवरण।'
          : 'Our bank\'s Fair Practices Code and procedures for customer service and operations.',
        effectiveDate: '2023-01-01',
        lastUpdated: '2023-01-01',
        version: '1.0',
        fileSize: 1024 * 500, // 500KB
        tags: locale === 'hi' ? ['ग्राहक', 'सेवा', 'नीति'] : ['customer', 'service', 'policy'],
        important: true
      },
      {
        id: 'POL002',
        title: locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy',
        category: 'privacy',
        description: locale === 'hi' 
          ? 'हमारे नागरिक सहकारी बैंक की गोपनीयता नीति और आपके व्यक्तिगत अधिकार जानकारी की सुरक्षा के बारे में जानकारी है।'
          : 'Our bank\'s privacy policy and how we protect your personal information.',
        effectiveDate: '2023-01-01',
        lastUpdated: '2023-01-01',
        version: '2.0',
        fileSize: 1024 * 750, // 750KB
        tags: locale === 'hi' ? ['गोपनीयता', 'डेटा', 'सुरक्षा'] : ['privacy', 'data', 'security'],
        important: true
      },
      {
        id: 'POL003',
        title: locale === 'hi' ? 'शिकायत निवारण नीति' : 'Grievance Redressal Policy',
        category: 'grievance',
        description: locale === 'hi' 
          ? 'हमारे नागरिक सहकारी बैंक में शिकायतों को सुनिश्चित करने की प्रक्रिया और तीन-स्तर त्रीव संबंधन।'
          : 'Our bank\'s grievance redressal procedure and three-level escalation matrix.',
        effectiveDate: '2023-01-01',
        lastUpdated: '2023-01-01',
        version: '1.0',
        fileSize: 1024 * 600, // 600KB
        tags: locale === 'hi' ? ['शिकायत', 'समाधान', 'तीन-स्तर'] : ['grievance', 'resolution', 'escalation'],
        important: true
      },
      {
        id: 'POL004',
        title: locale === 'hi' ? 'दंड शुल्क' : 'Penal Charges',
        category: 'penal-charges',
        description: locale === 'hi' 
          ? 'हमारे नागरिक सहकारी बैंक द्वारा विभिन्न दंड शुल्कों की जानकारी।'
          : 'Information about penal charges applicable to various banking services.',
        effectiveDate: '2023-01-01',
        lastUpdated: '2023-01-01',
        version: '1.0',
        fileSize: 1024 * 400, // 400KB
        tags: locale === 'hi' ? ['दंड', 'शुल्क', 'विभिन्न'] : ['penal', 'charges', 'fees'],
        important: false
      },
      {
        id: 'POL005',
        title: locale === 'hi' ? 'नागरिकों की चार्टर' : 'Citizens Charter',
        category: 'citizens-charter',
        description: locale === 'hi' 
          ? 'हमारे नागरिक सहकारी बैंक के ग्राहकों के अधिकार और उनके अधिकारों की जानकारी।'
          : 'Our bank\'s commitment to customers and their rights and responsibilities.',
        effectiveDate: '2023-01-01',
        lastUpdated: '2023-01-01',
        version: '1.0',
        fileSize: 1024 * 550, // 550KB
        tags: locale === 'hi' ? ['ग्राहक', 'अधिकार', 'जिम्मेदारी'] : ['customer', 'rights', 'responsibilities'],
        important: false
      },
      {
        id: 'POL006',
        title: locale === 'hi' ? 'केएफएस टेम्पलेट' : 'KFS Templates',
        category: 'kfs-templates',
        description: locale === 'hi' 
          ? 'विभिन्न बैंकिंग उत्पादों के लिए मुख्य तथ्य विवरण विवरण (केएफएस) टेम्पलेट।'
          : 'Key Facts Statement (KFS) templates for various banking products.',
        effectiveDate: '2023-01-01',
        lastUpdated: '2023-01-01',
        version: '1.0',
        fileSize: 1024 * 800, // 800KB
        tags: locale === 'hi' ? ['केएफएस', 'टेम्पलेट', 'जानकारी'] : ['kfs', 'templates', 'disclosure'],
        important: false
      }
    ];

    // Filter policies based on category
    let filteredPolicies = mockPolicyDocuments;
    if (category && category !== 'all') {
      filteredPolicies = mockPolicyDocuments.filter(policy => policy.category === category);
    }

    return NextResponse.json({
      success: true,
      data: filteredPolicies
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800', // 30 minutes cache
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept-Language'
      }
    });
  } catch (error) {
    console.error('Policy Documents API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        code: 'SERVER_ERROR'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Accept-Language'
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept-Language'
    }
  });
}
