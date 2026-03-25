import { NextRequest, NextResponse } from 'next/server';
import { Location, LocationSearchParams, LocationSearchResult, LocationStats } from '@/lib/location/types';

// Mock location data
const mockBranches: Location[] = [
  {
    id: 'branch-001',
    type: 'branch',
    name: 'Main Branch - Connaught Place',
    nameHi: 'मुख्य शाखा - कनॉट प्लेस',
    address: {
      line1: 'A-Block, Connaught Place',
      line1Hi: 'ए-ब्लॉक, कनॉट प्लेस',
      line2: 'New Delhi - 110001',
      line2Hi: 'नई दिल्ली - 110001',
      city: 'New Delhi',
      cityHi: 'नई दिल्ली',
      state: 'Delhi',
      stateHi: 'दिल्ली',
      pincode: '110001',
      country: 'India',
      countryHi: 'भारत',
      latitude: 28.6304,
      longitude: 77.2180
    },
    contact: {
      phone: '+91-11-23456789',
      email: 'connaughtplace@mnsbank.com',
      fax: '+91-11-23456790'
    },
    hours: {
      monday: '9:00 AM - 6:00 PM',
      mondayHi: 'सुबह 9:00 पूर्वाह्न - 6:00 शाम',
      tuesday: '9:00 AM - 6:00 PM',
      tuesdayHi: 'मंगलवार 9:00 पूर्वाह्न - 6:00 शाम',
      wednesday: '9:00 AM - 6:00 PM',
      wednesdayHi: 'बुधवार 9:00 पूर्वाह्न - 6:00 शाम',
      thursday: '9:00 AM - 6:00 PM',
      thursdayHi: 'गुरुवार 9:00 पूर्वाह्न - 6:00 शाम',
      friday: '9:00 AM - 6:00 PM',
      fridayHi: 'शुक्रवार 9:00 पूर्वाह्न - 6:00 शाम',
      saturday: '9:00 AM - 2:00 PM',
      saturdayHi: 'शनिवार 9:00 पूर्वाह्न - 2:00 शाम',
      sunday: 'Closed',
      sundayHi: 'बंद'
    },
    services: ['Savings Account', 'Current Account', 'Personal Loan', 'Home Loan'],
    servicesHi: ['बचत खाता', 'चालू खाता', 'व्यक्तिग ऋण', 'होम लोन'],
    features: [
      { id: 'wifi', name: 'Free WiFi', nameHi: 'मुफ्त वाईफाई', icon: 'wifi', available: true },
      { id: 'parking', name: 'Parking Available', nameHi: 'पार्किंग उपलब्ध', icon: 'car', available: true },
      { id: 'wheelchair', name: 'Wheelchair Accessible', nameHi: 'व्हीलचेयर पहुंच', icon: 'wheelchair', available: true }
    ],
    status: 'active',
    rating: 4.5,
    reviewCount: 156,
    images: ['/images/branches/connaught-place-1.jpg', '/images/branches/connaught-place-2.jpg'],
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: 'branch-002',
    type: 'branch',
    name: 'Karol Bagh Branch',
    nameHi: 'करोल बाग शाखा',
    address: {
      line1: '15, Ajmal Khan Road',
      line1Hi: '15, अजमल खान रोड',
      line2: 'Karol Bagh - 110005',
      line2Hi: 'करोल बाग - 110005',
      city: 'New Delhi',
      cityHi: 'नई दिल्ली',
      state: 'Delhi',
      stateHi: 'दिल्ली',
      pincode: '110005',
      country: 'India',
      countryHi: 'भारत',
      latitude: 28.6470,
      longitude: 77.1930
    },
    contact: {
      phone: '+91-11-45678901',
      email: 'karolbagh@mnsbank.com'
    },
    hours: {
      monday: '9:00 AM - 7:00 PM',
      mondayHi: 'सुबह 9:00 पूर्वाह्न - 7:00 शाम',
      tuesday: '9:00 AM - 7:00 PM',
      tuesdayHi: 'मंगलवार 9:00 पूर्वाह्न - 7:00 शाम',
      wednesday: '9:00 AM - 7:00 PM',
      wednesdayHi: 'बुधवार 9:00 पूर्वाह्न - 7:00 शाम',
      thursday: '9:00 AM - 7:00 PM',
      thursdayHi: 'गुरुवार 9:00 पूर्वाह्न - 7:00 शाम',
      friday: '9:00 AM - 7:00 PM',
      fridayHi: 'शुक्रवार 9:00 पूर्वाह्न - 7:00 शाम',
      saturday: '9:00 AM - 5:00 PM',
      saturdayHi: 'शनिवार 9:00 पूर्वाह्न - 5:00 शाम',
      sunday: 'Closed',
      sundayHi: 'बंद'
    },
    services: ['Savings Account', 'Current Account', 'Fixed Deposit'],
    servicesHi: ['बचत खाता', 'चालू खाता', 'सावध जमा'],
    features: [
      { id: 'wifi', name: 'Free WiFi', nameHi: 'मुफ्त वाईफाई', icon: 'wifi', available: true },
      { id: 'parking', name: 'Parking Available', nameHi: 'पार्किंग उपलब्ध', icon: 'car', available: false },
      { id: 'wheelchair', name: 'Wheelchair Accessible', nameHi: 'व्हीलचेयर पहुंच', icon: 'wheelchair', available: true }
    ],
    status: 'active',
    rating: 4.2,
    reviewCount: 89,
    images: ['/images/branches/karol-bagh-1.jpg'],
    lastUpdated: '2024-01-14T14:20:00Z'
  }
];

const mockATMs: Location[] = [
  {
    id: 'atm-001',
    type: 'atm',
    name: 'Connaught Place ATM',
    nameHi: 'कनॉट प्लेस एटीएम',
    address: {
      line1: 'Outer Circle, Connaught Place',
      line1Hi: 'आउटर सर्कल, कनॉट प्लेस',
      line2: 'New Delhi - 110001',
      line2Hi: 'नई दिल्ली - 110001',
      city: 'New Delhi',
      cityHi: 'नई दिल्ली',
      state: 'Delhi',
      stateHi: 'दिल्ली',
      pincode: '110001',
      country: 'India',
      countryHi: 'भारत',
      latitude: 28.6310,
      longitude: 77.2190
    },
    contact: {
      phone: '+91-11-23456789'
    },
    hours: {
      monday: '24/7',
      mondayHi: '24/7',
      tuesday: '24/7',
      tuesdayHi: '24/7',
      wednesday: '24/7',
      wednesdayHi: '24/7',
      thursday: '24/7',
      thursdayHi: '24/7',
      friday: '24/7',
      fridayHi: '24/7',
      saturday: '24/7',
      saturdayHi: '24/7',
      sunday: '24/7',
      sundayHi: '24/7'
    },
    services: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement'],
    servicesHi: ['नकद निकासी', 'शेष जांच', 'मिनी स्टेटमेंट'],
    features: [
      { id: '247', name: '24/7 Service', nameHi: '24/7 सेवा', icon: 'clock', available: true },
      { id: 'wheelchair', name: 'Wheelchair Accessible', nameHi: 'व्हीलचेयर पहुंच', icon: 'wheelchair', available: true },
      { id: 'cctv', name: 'CCTV Security', nameHi: 'सीसीटीवी सुरक्षा', icon: 'camera', available: true }
    ],
    status: 'active',
    images: ['/images/atms/connaught-place-1.jpg'],
    lastUpdated: '2024-01-15T08:00:00Z'
  },
  {
    id: 'atm-002',
    type: 'atm',
    name: 'Karol Bagh Market ATM',
    nameHi: 'करोल बाग मार्केट एटीएम',
    address: {
      line1: 'Ajmal Khan Road, Near Karol Bagh Market',
      line1Hi: 'अजमल खान रोड, करोल बाग मार्केट के पास',
      line2: 'New Delhi - 110005',
      line2Hi: 'नई दिल्ली - 110005',
      city: 'New Delhi',
      cityHi: 'नई दिल्ली',
      state: 'Delhi',
      stateHi: 'दिल्ली',
      pincode: '110005',
      country: 'India',
      countryHi: 'भारत',
      latitude: 28.6475,
      longitude: 77.1935
    },
    contact: {
      phone: '+91-11-45678901'
    },
    hours: {
      monday: '24/7',
      mondayHi: '24/7',
      tuesday: '24/7',
      tuesdayHi: '24/7',
      wednesday: '24/7',
      wednesdayHi: '24/7',
      thursday: '24/7',
      thursdayHi: '24/7',
      friday: '24/7',
      fridayHi: '24/7',
      saturday: '24/7',
      saturdayHi: '24/7',
      sunday: '24/7',
      sundayHi: '24/7'
    },
    services: ['Cash Withdrawal', 'Balance Inquiry'],
    servicesHi: ['नकद निकासी', 'शेष जांच'],
    features: [
      { id: '247', name: '24/7 Service', nameHi: '24/7 सेवा', icon: 'clock', available: true },
      { id: 'wheelchair', name: 'Wheelchair Accessible', nameHi: 'व्हीलचेयर पहुंच', icon: 'wheelchair', available: false },
      { id: 'cctv', name: 'CCTV Security', nameHi: 'सीसीटीवी सुरक्षा', icon: 'camera', available: true }
    ],
    status: 'active',
    images: ['/images/atms/karol-bagh-1.jpg'],
    lastUpdated: '2024-01-14T08:00:00Z'
  }
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function searchLocations(params: LocationSearchParams): LocationSearchResult {
  let locations = [...mockBranches, ...mockATMs];
  
  // Filter by type
  if (params.filters?.type && params.filters.type !== 'all') {
    locations = locations.filter(loc => loc.type === params.filters!.type);
  }
  
  // Filter by status
  if (params.filters?.status === 'active') {
    locations = locations.filter(loc => loc.status === 'active');
  }
  
  // Filter by city
  if (params.filters?.city) {
    locations = locations.filter(loc =>
      loc.address.city.toLowerCase().includes(params.filters!.city!.toLowerCase()) ||
      loc.address.cityHi.toLowerCase().includes(params.filters!.city!.toLowerCase())
    );
  }
  
  // Filter by state
  if (params.filters?.state) {
    locations = locations.filter(loc =>
      loc.address.state.toLowerCase().includes(params.filters!.state!.toLowerCase()) ||
      loc.address.stateHi.toLowerCase().includes(params.filters!.state!.toLowerCase())
    );
  }
  
  // Filter by wheelchair accessibility
  if (params.filters?.wheelchairAccessible) {
    locations = locations.filter(loc => 
      loc.features.some(feature => feature.id === 'wheelchair' && feature.available)
    );
  }
  
  // Text search
  if (params.query) {
    const query = params.query.toLowerCase();
    locations = locations.filter(loc => 
      loc.name.toLowerCase().includes(query) ||
      loc.nameHi.toLowerCase().includes(query) ||
      loc.address.line1.toLowerCase().includes(query) ||
      loc.address.line1Hi.toLowerCase().includes(query) ||
      loc.address.city.toLowerCase().includes(query) ||
      loc.address.cityHi.toLowerCase().includes(query) ||
      loc.services.some(service => service.toLowerCase().includes(query)) ||
      loc.servicesHi.some(service => service.toLowerCase().includes(query))
    );
  }
  
  // Calculate distances and filter by radius
  if (params.latitude && params.longitude) {
    locations = locations.map(loc => ({
      ...loc,
      distance: calculateDistance(params.latitude!, params.longitude!, loc.address.latitude, loc.address.longitude)
    }));
    
    if (params.filters?.radius) {
      locations = locations.filter(loc => (loc.distance || 0) <= params.filters!.radius!);
    }
    
    // Sort by distance if coordinates are provided
    locations.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  } else {
    // Sort by relevance for text search
    if (params.query) {
      locations.sort((a, b) => {
        const aScore = (a.name.toLowerCase().includes(params.query!.toLowerCase()) ? 1 : 0) +
                        (a.nameHi.toLowerCase().includes(params.query!.toLowerCase()) ? 1 : 0);
        const bScore = (b.name.toLowerCase().includes(params.query!.toLowerCase()) ? 1 : 0) +
                        (b.nameHi.toLowerCase().includes(params.query!.toLowerCase()) ? 1 : 0);
        return bScore - aScore;
      });
    }
  }
  
  // Apply sorting
  if (params.sortBy) {
    switch (params.sortBy) {
      case 'name':
        locations.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        locations.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'distance':
        // Already sorted by distance if coordinates provided
        break;
    }
    
    if (params.sortOrder === 'desc') {
      locations.reverse();
    }
  }
  
  // Apply pagination
  const totalCount = locations.length;
  const offset = params.offset || 0;
  const limit = params.limit || 20;
  const paginatedLocations = locations.slice(offset, offset + limit);
  
  return {
    locations: paginatedLocations,
    totalCount,
    searchRadius: params.filters?.radius || 50,
    searchCenter: {
      latitude: params.latitude || 28.6139,
      longitude: params.longitude || 77.2090
    },
    filters: params.filters || {}
  };
}

export async function GET(request: NextRequest) {
  try {
    const urlSearchParams = new URL(request.url);
    const query = urlSearchParams.searchParams.get('query') || undefined;
    const latitude = urlSearchParams.searchParams.get('latitude') ? parseFloat(urlSearchParams.searchParams.get('latitude')!) : undefined;
    const longitude = urlSearchParams.searchParams.get('longitude') ? parseFloat(urlSearchParams.searchParams.get('longitude')!) : undefined;
    const radius = urlSearchParams.searchParams.get('radius') ? parseFloat(urlSearchParams.searchParams.get('radius')!) : undefined;
    const type = urlSearchParams.searchParams.get('type') as 'branch' | 'atm' | 'all' | undefined;
    const city = urlSearchParams.searchParams.get('city') || undefined;
    const state = urlSearchParams.searchParams.get('state') || undefined;
    const limit = urlSearchParams.searchParams.get('limit') ? parseInt(urlSearchParams.searchParams.get('limit')!) : 20;
    const offset = urlSearchParams.searchParams.get('offset') ? parseInt(urlSearchParams.searchParams.get('offset')!) : 0;
    const sortBy = urlSearchParams.searchParams.get('sortBy') as 'distance' | 'name' | 'rating' | 'relevance' | undefined;
    const sortOrder = urlSearchParams.searchParams.get('sortOrder') as 'asc' | 'desc' | undefined;
    
    const searchParams: LocationSearchParams = {
      query,
      latitude,
      longitude,
      radius,
      filters: {
        type,
        city,
        state,
        radius,
        status: 'active'
      },
      limit,
      offset,
      sortBy,
      sortOrder
    };
    
    const result = searchLocations(searchParams);
    
    console.log('Locations API accessed:', {
      query,
      latitude,
      longitude,
      radius,
      type,
      resultCount: result.locations.length,
      totalCount: result.totalCount,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('Locations API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching locations'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, locationId, data } = body;
    
    switch (action) {
      case 'getDirections':
        // Mock directions response
        return NextResponse.json({
          success: true,
          data: {
            distance: {
              text: '2.5 km',
              value: 2500
            },
            duration: {
              text: '8 mins',
              value: 480
            },
            steps: [
              {
                instruction: 'Head north on Connaught Place',
                instructionHi: 'कनॉट प्लेस पर उत्तर की ओर जाएं',
                distance: '0.5 km',
                duration: '2 mins',
                maneuver: 'straight',
                startLocation: { latitude: 28.6304, longitude: 77.2180 },
                endLocation: { latitude: 28.6354, longitude: 77.2180 }
              },
              {
                instruction: 'Turn right onto Ajmal Khan Road',
                instructionHi: 'अजमल खान रोड पर दाहिन मुड़ें',
                distance: '1.5 km',
                duration: '4 mins',
                maneuver: 'turn-right',
                startLocation: { latitude: 28.6354, longitude: 77.2180 },
                endLocation: { latitude: 28.6470, longitude: 77.1930 }
              },
              {
                instruction: 'Destination will be on your left',
                instructionHi: 'गंतवय आपके बाएं होगा',
                distance: '0.5 km',
                duration: '2 mins',
                maneuver: 'arrival',
                startLocation: { latitude: 28.6470, longitude: 77.1930 },
                endLocation: { latitude: 28.6470, longitude: 77.1930 }
              }
            ],
            polyline: 'encoded_polyline_string',
            overviewPath: [
              { latitude: 28.6304, longitude: 77.2180 },
              { latitude: 28.6354, longitude: 77.2180 },
              { latitude: 28.6470, longitude: 77.1930 }
            ]
          }
        });
        
      case 'getLocation':
        // Get specific location details
        const location = [...mockBranches, ...mockATMs].find(loc => loc.id === locationId);
        if (location) {
          return NextResponse.json({
            success: true,
            data: location
          });
        } else {
          return NextResponse.json(
            {
              success: false,
              error: 'Location not found',
              message: 'The requested location could not be found'
            },
            { status: 404 }
          );
        }
        
      case 'getStats':
        // Mock location statistics
        const stats: LocationStats = {
          totalLocations: mockBranches.length + mockATMs.length,
          totalBranches: mockBranches.length,
          totalATMs: mockATMs.length,
          locationsByState: {
            'Delhi': mockBranches.length + mockATMs.length
          },
          locationsByCity: {
            'New Delhi': mockBranches.length + mockATMs.length
          },
          averageRating: 4.35,
          totalReviews: 245,
          activeLocations: mockBranches.length + mockATMs.length,
          locationsWithWheelchairAccess: 3,
          locationsWith24HourService: 2
        };
        
        return NextResponse.json({
          success: true,
          data: stats
        });
        
      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            message: 'The specified action is not supported'
          },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Locations POST API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while processing the request'
      },
      { status: 500 }
    );
  }
}
