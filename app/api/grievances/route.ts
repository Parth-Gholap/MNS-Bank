import { NextRequest, NextResponse } from 'next/server';

// Mock grievance storage
const grievanceStore: any[] = [];

// Generate unique reference number
const generateReferenceNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `GRV${timestamp}${random}`;
};

// Mock email service
const sendNotificationEmail = async (email: string, referenceNumber: string, locale: string) => {
  console.log(`Sending notification email to ${email} with reference ${referenceNumber}`);
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

// Mock SMS service for high priority grievances
const sendSMSNotification = async (mobileNumber: string, referenceNumber: string, priority: string) => {
  if (priority === 'high') {
    console.log(`Sending SMS notification to ${mobileNumber} for high priority grievance ${referenceNumber}`);
    // Simulate SMS sending delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
  return false;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const searchParams = new URL(request.url);
    const locale = searchParams.searchParams.get('locale') || 'en';

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'mobileNumber', 'complaintType', 'complaintCategory', 'description', 'consent'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: locale === 'hi' 
            ? 'आवश्यक फील्ड गुम हैं: ' + missingFields.join(', ')
            : 'Missing required fields: ' + missingFields.join(', ')
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
          message: locale === 'hi' ? 'अमान्य ईमेल प्रारूप' : 'Invalid email format'
        },
        { status: 400 }
      );
    }

    // Validate mobile number format
    const mobileRegex = /^[6-9]\d{10}$/;
    if (!mobileRegex.test(body.mobileNumber)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid mobile number format',
          message: locale === 'hi' ? 'अमान्य मोबाइल नंबर प्रारूप' : 'Invalid mobile number format'
        },
        { status: 400 }
      );
    }

    // Validate description length
    if (body.description.length < 50 || body.description.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Description length invalid',
          message: locale === 'hi' ? 'विवरण 50-1000 अक्षरों के बीच होना चाहिए' : 'Description must be between 50-1000 characters'
        },
        { status: 400 }
      );
    }

    // Generate reference number
    const referenceNumber = generateReferenceNumber();

    // Create grievance object
    const grievance = {
      id: Date.now().toString(),
      referenceNumber,
      fullName: body.fullName,
      email: body.email,
      mobileNumber: body.mobileNumber,
      accountNumber: body.accountNumber || '',
      complaintType: body.complaintType,
      complaintCategory: body.complaintCategory,
      description: body.description,
      priority: body.priority || 'medium',
      attachments: body.attachments || [],
      consent: body.consent,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale,
      escalationLevel: 0,
      resolutionDetails: null,
      resolutionDate: null,
      resolvedBy: null
    };

    // Store grievance
    grievanceStore.push(grievance);

    // Send notifications
    try {
      await Promise.all([
        sendNotificationEmail(body.email, referenceNumber, locale),
        sendSMSNotification(body.mobileNumber, referenceNumber, body.priority)
      ]);
    } catch (notificationError) {
      console.error('Notification error:', notificationError);
      // Continue even if notification fails
    }

    // Log grievance for analytics
    console.log('Grievance submitted:', {
      referenceNumber,
      type: body.complaintType,
      category: body.complaintCategory,
      priority: body.priority,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        referenceNumber,
        message: locale === 'hi' 
          ? 'आपका शिकायत सफलताय दर्ज किया गया है। आपको जल्द ही संपर्क किया जाएगा।'
          : 'Your grievance has been successfully submitted. You will be contacted shortly.',
        estimatedResolutionTime: body.priority === 'high' ? '24 hours' : '3-5 working days',
        nextSteps: [
          locale === 'hi' ? 'आपको संदर्भ संख्या मिलेगी' : 'You will receive a reference number',
          locale === 'hi' ? 'हम 24 घंटे के भीतर समीक्षा करेंगे' : 'We will review within 24 hours',
          locale === 'hi' ? '3-5 कार्य दिनों में समाधान' : 'Resolution within 3-5 working days'
        ]
      },
      grievance: {
        id: grievance.id,
        referenceNumber,
        status: grievance.status,
        createdAt: grievance.createdAt
      }
    });

  } catch (error) {
    console.error('Grievance submission error:', error);
    const searchParams = new URL(request.url);
    const locale = searchParams.searchParams.get('locale') || 'en';
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: locale === 'hi' 
          ? 'शिकायत दर्ज करने में त्रुटि हुई। कृपया बाद में प्रयास करें।'
          : 'Error submitting grievance. Please try again later.'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { 
      locale = 'en',
      status,
      page = '1',
      limit = '10'
    } = Object.fromEntries(searchParams.entries());

    // Convert page and limit to numbers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Filter grievances based on query parameters
    let filteredGrievances = [...grievanceStore];

    if (status) {
      filteredGrievances = filteredGrievances.filter(g => g.status === status);
    }

    if (locale) {
      filteredGrievances = filteredGrievances.filter(g => g.locale === locale);
    }

    // Sort by creation date (newest first)
    filteredGrievances.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedGrievances = filteredGrievances.slice(startIndex, endIndex);

    // Remove sensitive data for public API
    const publicGrievances = paginatedGrievances.map(g => ({
      id: g.id,
      referenceNumber: g.referenceNumber,
      fullName: g.fullName,
      complaintType: g.complaintType,
      complaintCategory: g.complaintCategory,
      priority: g.priority,
      status: g.status,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt,
      // Exclude sensitive fields like email, mobile, description for public API
    }));

    return NextResponse.json({
      success: true,
      data: {
        grievances: publicGrievances,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: filteredGrievances.length,
          totalPages: Math.ceil(filteredGrievances.length / limitNum)
        }
      }
    });

  } catch (error) {
    console.error('Grievance listing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch grievances',
        message: 'An error occurred while fetching grievance data'
      },
      { status: 500 }
    );
  }
}
