import { NextRequest, NextResponse } from 'next/server';

// Grievance Officers API Route Handler
export async function GET(request: NextRequest) {
  const locale = request.headers.get('accept-language') || 'en';

  try {
    // Mock grievance officers data for now - replace with actual API call
    const mockGrievanceOfficers = [
      {
        level: 1,
        name: locale === 'hi' ? 'श्री. रमेश कुमार जैन' : 'Shri. Ramesh Kumar Jain',
        designation: locale === 'hi' ? 'वरिषीय अधिकारी' : 'Branch Manager',
        email: 'manager@mnsbankbhopal.com',
        phone: '0755-1234567',
        address: locale === 'hi' ? 'मुख्य नगर नागरिक सहकारी बैंक, बैरागर, म.प. - 462001' : 'Mukhya Nagar, Nagrik Sahakari Bank, Bairagarh, M.P. - 462001',
        resolutionTat: locale === 'hi' ? '7 दिनों' : '7 days'
      },
      {
        level: 2,
        name: locale === 'hi' ? 'श्री. अजय कुमार जैन' : 'Shri. Ashok Sharma',
        designation: locale === 'hi' ? 'वरिषीय अधिकारी' : 'Assistant Manager',
        email: 'assistant.manager@mnsbankbhopal.com',
        phone: '0755-1234568',
        address: locale === 'hi' ? 'मुख्य नगर नागरिक सहकारी बैंक, बैरागर, म.प. - 462001' : 'Mukhya Nagar, Nagrik Sahakari Bank, Bairagarh, M.P. - 462001',
        resolutionTat: locale === 'hi' ? '15 दिनों' : '15 days'
      },
      {
        level: 3,
        name: locale === 'hi' ? 'श्री. वेंक कुमार जैन' : 'Shri. Rajendra Singh',
        designation: locale === 'hi' ? 'मुख्य प्रबंधक' : 'Chief Manager',
        email: 'chief.manager@mnsbankbhopal.com',
        phone: '0755-1234569',
        address: locale === 'hi' ? 'मुख्य नगर नागरिक सहकारी बैंक, बैरागर, म.प. - 462001' : 'Mukhya Nagar, Nagrik Sahakari Bank, Bairagarh, M.P. - 462001',
        resolutionTat: locale === 'hi' ? '30 दिनों' : '30 days'
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockGrievanceOfficers
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // 1 hour cache
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept-Language'
      }
    });
  } catch (error) {
    console.error('Grievance Officers API Error:', error);
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
