import { NextRequest, NextResponse } from 'next/server';
import { validateInquiryForm, InquiryFormData } from '@/lib/validations/inquiry';
import { verifyReCAPTCHAServerSide } from '@/lib/recaptcha';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Return inquiry form configuration
    return NextResponse.json({
      success: true,
      data: {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        maxFiles: 10,
        allowedFileTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'],
        reCAPTCHAEnabled: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        inquiryTypes: [
          { value: 'general', label: locale === 'hi' ? 'सामान्य' : 'General' },
          { value: 'product', label: locale === 'hi' ? 'उत्पाद' : 'Product' },
          { value: 'service', label: locale === 'hi' ? 'सेवा' : 'Service' },
          { value: 'complaint', label: locale === 'hi' ? 'शिकायत' : 'Complaint' },
          { value: 'branch', label: locale === 'hi' ? 'शाखा' : 'Branch' },
          { value: 'digital', label: locale === 'hi' ? 'डिजिटल' : 'Digital' }
        ]
      }
    });

  } catch (error) {
    console.error('Inquiry API GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching inquiry configuration'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Parse form data (could be multipart/form-data)
    const formData = await request.formData();
    
    // Extract form fields
    const inquiryData: InquiryFormData = {
      fullName: formData.get('fullName') as string || '',
      email: formData.get('email') as string || '',
      mobileNumber: formData.get('mobileNumber') as string || '',
      subject: formData.get('subject') as string || '',
      message: formData.get('message') as string || '',
      category: formData.get('category') as string || '',
      priority: ((formData.get('priority') as string) || 'medium') as 'high' | 'medium' | 'low',
      preferredContact: ((formData.get('preferredContact') as string) || 'email') as 'email' | 'phone' | 'both'
    };

    // Extract attachments
    const attachments: File[] = [];
    for (let i = 0; i < 10; i++) {
      const file = formData.get(`attachment${i}`) as File;
      if (file) {
        attachments.push(file);
      }
    }
    
    if (attachments.length > 0) {
      inquiryData.attachment = attachments;
    }

    // Validate form data
    const validation = validateInquiryForm(inquiryData, locale as 'en' | 'hi' | undefined);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: locale === 'hi' ? 'इनपुट सत्यापन में विफल' : 'Input validation failed',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA if enabled
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      const recaptchaToken = formData.get('recaptchaToken') as string;
      
      if (!recaptchaToken) {
        return NextResponse.json(
          {
            success: false,
            error: 'reCAPTCHA required',
            message: locale === 'hi' ? 'reCAPTCHA सत्यापन आवश्यक है' : 'reCAPTCHA verification is required'
          },
          { status: 400 }
        );
      }

      const recaptchaResult = await verifyReCAPTCHAServerSide(
        recaptchaToken,
        process.env.RECAPTCHA_SECRET_KEY || ''
      );

      if (!recaptchaResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: 'reCAPTCHA verification failed',
            message: locale === 'hi' ? 'reCAPTCHA सत्यापन विफल' : 'reCAPTCHA verification failed'
          },
          { status: 400 }
        );
      }
    }

    // Generate unique reference number
    const referenceNumber = generateInquiryReference('general');

    // Store inquiry in mock database (in production, this would be saved to a real database)
    const savedInquiry = await saveInquiry({
      ...inquiryData,
      referenceNumber,
      attachments: attachments.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      })),
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      locale
    });

    // Send notifications (in production)
    await sendInquiryNotifications(savedInquiry, locale as 'en' | 'hi');

    // Log for analytics
    console.log('Inquiry submitted:', {
      referenceNumber,
      type: 'general',
      category: inquiryData.category,
      priority: inquiryData.priority,
      locale,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        referenceNumber,
        message: locale === 'hi' 
          ? 'आपकी पूछताछ सफलताय से जमा कर दी गई है। हम जल्द ही आपसे संपर्क करेंगे।'
          : 'Your inquiry has been submitted successfully. We will contact you shortly.',
        estimatedResponseTime: getEstimatedResponseTime(inquiryData.priority, locale as 'en' | 'hi')
      }
    });

  } catch (error) {
    console.error('Inquiry API POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while submitting your inquiry'
      },
      { status: 500 }
    );
  }
}

// Helper functions
function generateInquiryReference(type: string): string {
  const typePrefixes: Record<string, string> = {
    general: 'INQ',
    product: 'PRD',
    service: 'SRV',
    complaint: 'CPL',
    branch: 'BRN',
    digital: 'DIG'
  };

  const prefix = typePrefixes[type] || 'INQ';
  const timestamp = Date.now().toString();
  const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}${timestamp.slice(-6)}${randomSuffix}`;
}

function getEstimatedResponseTime(priority: string, locale: 'en' | 'hi'): string {
  const responseTimes: Record<string, { en: string; hi: string }> = {
    low: { en: '24-48 hours', hi: '24-48 घंटे' },
    medium: { en: '12-24 hours', hi: '12-24 घंटे' },
    high: { en: '2-6 hours', hi: '2-6 घंटे' }
  };

  return responseTimes[priority]?.[locale] || responseTimes.medium[locale];
}

async function saveInquiry(inquiry: any): Promise<any> {
  // Mock database save - in production, this would save to a real database
  const mockDatabase = (global as any).inquiryDatabase || [];
  
  const newInquiry = {
    id: Date.now().toString(),
    ...inquiry,
    createdAt: new Date().toISOString()
  };

  mockDatabase.push(newInquiry);
  (global as any).inquiryDatabase = mockDatabase;

  return newInquiry;
}

async function sendInquiryNotifications(inquiry: any, locale: 'en' | 'hi'): Promise<void> {
  // Mock notification sending - in production, this would send real emails/SMS
  
  // Send email notification
  console.log('Email notification sent to:', inquiry.email);
  console.log('Inquiry details:', {
    referenceNumber: inquiry.referenceNumber,
    type: inquiry.inquiryType,
    category: inquiry.category,
    priority: inquiry.priority,
    subject: inquiry.subject
  });

  // Send SMS notification for high priority inquiries
  if (inquiry.priority === 'high') {
    console.log('SMS notification sent to:', inquiry.mobileNumber);
    console.log('Message:', locale === 'hi' 
      ? `आपकी पूछताछ ${inquiry.referenceNumber} प्राप्त हो गई है। हम जल्द ही आपसे संपर्क करेंगे।`
      : `Your inquiry ${inquiry.referenceNumber} has been received. We will contact you shortly.`
    );
  }

  // Send internal notification to relevant department
  const departmentEmails: Record<string, string> = {
    general: 'general@bank.com',
    product: 'products@bank.com',
    service: 'services@bank.com',
    complaint: 'complaints@bank.com',
    branch: 'branches@bank.com',
    digital: 'digital@bank.com'
  };

  const departmentEmail = departmentEmails[inquiry.inquiryType] || 'general@bank.com';
  
  console.log('Internal notification sent to:', departmentEmail);
  console.log('Department:', inquiry.inquiryType);
  console.log('Priority:', inquiry.priority);
}

// Mock database for development
if (typeof global !== 'undefined') {
  (global as any).inquiryDatabase = (global as any).inquiryDatabase || [];
}
