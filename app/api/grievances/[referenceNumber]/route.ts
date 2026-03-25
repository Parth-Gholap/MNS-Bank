import { NextRequest, NextResponse } from 'next/server';

// Mock grievance database
const grievanceStore: any[] = [
  {
    id: '1',
    referenceNumber: 'GRV1648123456789',
    fullName: 'John Doe',
    email: 'john@example.com',
    mobileNumber: '9876543210',
    accountNumber: '1234567890',
    complaintType: 'service',
    complaintCategory: 'banking-services',
    description: 'Issue with online banking service not working properly',
    priority: 'medium',
    status: 'under-review',
    createdAt: '2024-03-20T10:30:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    escalationLevel: 0,
    resolutionDetails: null,
    resolutionDate: null,
    resolvedBy: null,
    locale: 'en'
  },
  {
    id: '2',
    referenceNumber: 'GRV1648123456790',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    mobileNumber: '9876543211',
    accountNumber: '0987654321',
    complaintType: 'transaction',
    complaintCategory: 'loan-services',
    description: 'Loan disbursement delay issue',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2024-03-19T09:15:00Z',
    updatedAt: '2024-03-20T11:45:00Z',
    escalationLevel: 1,
    resolutionDetails: 'Loan processing team is reviewing the case. Expected resolution within 24 hours.',
    resolutionDate: null,
    resolvedBy: null,
    locale: 'en'
  },
  {
    id: '3',
    referenceNumber: 'GRV1648123456791',
    fullName: 'Raj Kumar',
    email: 'raj@example.com',
    mobileNumber: '9876543212',
    accountNumber: '1122334455',
    complaintType: 'atm',
    complaintCategory: 'card-services',
    description: 'ATM card not working at specific location',
    priority: 'low',
    status: 'resolved',
    createdAt: '2024-03-18T16:20:00Z',
    updatedAt: '2024-03-19T10:30:00Z',
    escalationLevel: 0,
    resolutionDetails: 'Card replaced and activated successfully. ATM functionality verified.',
    resolutionDate: '2024-03-19T10:30:00Z',
    resolvedBy: 'Support Team Lead',
    locale: 'hi'
  }
];

// Mock escalation matrix
const escalationMatrix = {
  level0: {
    title: 'Branch Manager',
    titleHi: 'शाखा प्रबंधक',
    timeline: '24 hours',
    timelineHi: '24 घंटे',
    contact: 'branch.manager@bank.com',
    phone: '1800-123-4567'
  },
  level1: {
    title: 'Regional Manager',
    titleHi: 'क्षेत्रीय प्रबंधक',
    timeline: '48 hours',
    timelineHi: '48 घंटे',
    contact: 'regional.manager@bank.com',
    phone: '1800-234-5678'
  },
  level2: {
    title: 'Head of Customer Service',
    titleHi: 'ग्राहक सेवा प्रमुख',
    timeline: '72 hours',
    timelineHi: '72 घंटे',
    contact: 'head.customer@bank.com',
    phone: '1800-345-6789'
  },
  level3: {
    title: 'RBI Ombudsman',
    titleHi: 'आरबीआई ओम्बड्समैन',
    timeline: '30 days',
    timelineHi: '30 दिन',
    contact: 'https://rbi.org.in',
    phone: '1800-456-7890'
  }
};

// Mock notification service
const sendStatusUpdate = async (email: string, status: string, locale: string) => {
  console.log(`Sending status update to ${email}: ${status}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { referenceNumber: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const referenceNumber = params.referenceNumber;

    if (!referenceNumber) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reference number is required',
          message: locale === 'hi' ? 'संदर्भ संख्या आवश्यक है' : 'Reference number is required'
        },
        { status: 400 }
      );
    }

    // Find grievance by reference number
    const grievance = grievanceStore.find(g => g.referenceNumber === referenceNumber);

    if (!grievance) {
      return NextResponse.json(
        {
          success: false,
          error: 'Grievance not found',
          message: locale === 'hi' ? 'शिकायत नहीं मिली' : 'Grievance not found'
        },
        { status: 404 }
      );
    }

    // Get current escalation level info
    const currentEscalation = escalationMatrix[`level${grievance.escalationLevel}` as keyof typeof escalationMatrix];

    // Calculate next escalation eligibility
    const canEscalate = grievance.status === 'submitted' || grievance.status === 'under-review';
    const nextEscalationLevel = grievance.escalationLevel + 1;
    const nextEscalation = escalationMatrix[`level${nextEscalationLevel}` as keyof typeof escalationMatrix];

    // Status timeline
    const statusTimeline = [
      {
        status: 'submitted',
        date: grievance.createdAt,
        description: locale === 'hi' ? 'शिकायत दर्ज की गई' : 'Grievance submitted',
        descriptionHi: 'शिकायत दर्ज की गई'
      }
    ];

    if (grievance.updatedAt !== grievance.createdAt) {
      statusTimeline.push({
        status: grievance.status,
        date: grievance.updatedAt,
        description: getStatusDescription(grievance.status, locale),
        descriptionHi: getStatusDescription(grievance.status, 'hi')
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        grievance: {
          ...grievance,
          statusText: getStatusText(grievance.status, locale),
          priorityText: getPriorityText(grievance.priority, locale),
          formattedCreatedAt: formatDate(grievance.createdAt, locale),
          formattedUpdatedAt: formatDate(grievance.updatedAt, locale)
        },
        escalation: {
          currentLevel: grievance.escalationLevel,
          currentInfo: currentEscalation,
          canEscalate,
          nextLevel: nextEscalationLevel,
          nextInfo: nextEscalation,
          escalationMatrix: Object.keys(escalationMatrix).map(key => ({
            level: parseInt(key.replace('level', '')),
            ...escalationMatrix[key as keyof typeof escalationMatrix]
          }))
        },
        statusTimeline,
        actions: {
          canTrackUpdates: true,
          canEscalate,
          canContact: true,
          canReopen: grievance.status === 'resolved' || grievance.status === 'closed'
        }
      }
    });

  } catch (error) {
    console.error('Grievance status API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching grievance status'
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { referenceNumber: string } }
) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const referenceNumber = params.referenceNumber;
    const { action } = body;

    if (!referenceNumber) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reference number is required',
          message: locale === 'hi' ? 'संदर्भ संख्या आवश्यक है' : 'Reference number is required'
        },
        { status: 400 }
      );
    }

    // Find grievance
    const grievanceIndex = grievanceStore.findIndex(g => g.referenceNumber === referenceNumber);
    
    if (grievanceIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Grievance not found',
          message: locale === 'hi' ? 'शिकायत नहीं मिली' : 'Grievance not found'
        },
        { status: 404 }
      );
    }

    const grievance = grievanceStore[grievanceIndex];

    // Handle different actions
    switch (action) {
      case 'escalate':
        if (grievance.escalationLevel >= 3) {
          return NextResponse.json(
            {
              success: false,
              error: 'Maximum escalation level reached',
              message: locale === 'hi' 
                ? 'अधिकतम एस्केलेशन स्तर पर पहुंच गया है। कृपया आरबीआई ओम्बड्समैन से संपर्क करें।'
                : 'Maximum escalation level reached. Please contact RBI Ombudsman.'
            },
            { status: 400 }
          );
        }

        // Update escalation level
        grievanceStore[grievanceIndex] = {
          ...grievance,
          escalationLevel: grievance.escalationLevel + 1,
          status: 'escalated',
          updatedAt: new Date().toISOString()
        };

        // Send notification
        await sendStatusUpdate(grievance.email, 'escalated', locale);

        return NextResponse.json({
          success: true,
          message: locale === 'hi' 
            ? 'शिकायत एस्केलेट की गई'
            : 'Grievance escalated successfully',
          data: {
            newLevel: grievance.escalationLevel + 1,
            nextContact: escalationMatrix[`level${grievance.escalationLevel + 1}` as keyof typeof escalationMatrix]
          }
        });

      case 'reopen':
        if (grievance.status !== 'resolved' && grievance.status !== 'closed') {
          return NextResponse.json(
            {
              success: false,
              error: 'Cannot reopen grievance',
              message: locale === 'hi' 
                ? 'इस शिकायत को फिर से खोला नहीं जा सकता'
                : 'This grievance cannot be reopened'
            },
            { status: 400 }
          );
        }

        grievanceStore[grievanceIndex] = {
          ...grievance,
          status: 'under-review',
          resolutionDetails: null,
          resolutionDate: null,
          resolvedBy: null,
          updatedAt: new Date().toISOString()
        };

        await sendStatusUpdate(grievance.email, 'reopened', locale);

        return NextResponse.json({
          success: true,
          message: locale === 'hi' ? 'शिकायत फिर से खोली गई' : 'Grievance reopened successfully'
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            message: locale === 'hi' ? 'अमान्य कार्रवाई' : 'Invalid action'
          },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Grievance action API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while processing grievance action'
      },
      { status: 500 }
    );
  }
}

// Helper functions
function getStatusText(status: string, locale: string) {
  const statusMap: Record<string, { en: string; hi: string }> = {
    'submitted': { en: 'Submitted', hi: 'दर्ज किया गया' },
    'under-review': { en: 'Under Review', hi: 'समीक्षा में' },
    'in-progress': { en: 'In Progress', hi: 'प्रगति में' },
    'resolved': { en: 'Resolved', hi: 'समाधित' },
    'escalated': { en: 'Escalated', hi: 'एस्केलेटेड' },
    'closed': { en: 'Closed', hi: 'बंद' }
  };
  return statusMap[status as keyof typeof statusMap]?.[locale as keyof typeof statusMap[keyof typeof statusMap]] || status;
}

function getPriorityText(priority: string, locale: string) {
  const priorityMap: Record<string, { en: string; hi: string }> = {
    'high': { en: 'High', hi: 'उच्च' },
    'medium': { en: 'Medium', hi: 'मध्यम' },
    'low': { en: 'Low', hi: 'कम' }
  };
  return priorityMap[priority as keyof typeof priorityMap]?.[locale as keyof typeof priorityMap[keyof typeof priorityMap]] || priority;
}

function getStatusDescription(status: string, locale: string) {
  const descriptionMap: Record<string, { en: string; hi: string }> = {
    'submitted': { en: 'Grievance submitted successfully', hi: 'शिकायत सफलताय से दर्ज की गई' },
    'under-review': { en: 'Grievance is under review', hi: 'शिकायत समीक्षा में है' },
    'in-progress': { en: 'Resolution in progress', hi: 'समाधान का कार्य प्रगति में है' },
    'resolved': { en: 'Grievance resolved successfully', hi: 'शिकायत सफलताय से समाधित' },
    'escalated': { en: 'Grievance escalated to higher authority', hi: 'शिकायत उच्च अधिकारी को एस्केलेट की गई' },
    'closed': { en: 'Grievance closed', hi: 'शिकायत बंद' }
  };
  return descriptionMap[status as keyof typeof descriptionMap]?.[locale as keyof typeof descriptionMap[keyof typeof descriptionMap]] || status;
}

function formatDate(dateString: string, locale: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
