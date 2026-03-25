import { NextRequest, NextResponse } from 'next/server';

// DEAF Records API Route Handler
export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url);
  const page = searchParams.searchParams.get('page') || '1';
  const limit = searchParams.searchParams.get('limit') || '10';
  const search = searchParams.searchParams.get('search') || '';
  const locale = request.headers.get('accept-language') || 'en';

  try {
    // Mock DEAF data for now - replace with actual API call
    const mockDEAFRecords = [
      {
        id: 'DEAF001',
        customerId: 'CUST001',
        glCode: 'GL001',
        newAccountNumber: 'NEW001',
        deafAccountNumber: 'DEAF001',
        accountName: 'John Doe',
        accountNameHi: 'जॉन डो',
        address: '123 Main Street, Bhopal, MP 462001',
        addressHi: '१२३ मेन स्ट्रीट, भोपाल, म.प. 462001',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        transactionDate: '2023-01-15',
        deafAmount: 50000,
        lastUpdated: '2023-01-15'
      },
      {
        id: 'DEAF002',
        customerId: 'CUST002',
        glCode: 'GL002',
        newAccountNumber: 'NEW002',
        deafAccountNumber: 'DEAF002',
        accountName: 'Jane Smith',
        accountNameHi: 'जेन स्मिथ',
        address: '456 Park Avenue, Bhopal, MP 462001',
        addressHi: '४५६ एवेन्यू, भोपाल, म.प. 462001',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        transactionDate: '2023-01-10',
        deafAmount: 75000,
        lastUpdated: '2023-01-10'
      }
    ];

    // Filter records based on search
    let filteredRecords = mockDEAFRecords;
    if (search) {
      filteredRecords = mockDEAFRecords.filter(record => 
        record.accountName.toLowerCase().includes(search.toLowerCase()) ||
        record.accountNameHi.toLowerCase().includes(search.toLowerCase()) ||
        record.glCode.toLowerCase().includes(search.toLowerCase()) ||
        record.newAccountNumber.toLowerCase().includes(search.toLowerCase()) ||
        record.deafAccountNumber.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        records: paginatedRecords,
        total: filteredRecords.length,
        page: pageNum,
        totalPages: Math.ceil(filteredRecords.length / limitNum)
      }
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept-Language'
      }
    });
  } catch (error) {
    console.error('DEAF API Error:', error);
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
