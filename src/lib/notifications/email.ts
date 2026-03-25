import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailTemplate {
  subject: string;
  subjectHi: string;
  html: string;
  htmlHi: string;
  text: string;
  textHi: string;
}

interface GrievanceEmailData {
  referenceNumber: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  complaintType: string;
  complaintCategory: string;
  priority: 'low' | 'medium' | 'high';
  status: string;
  locale: 'en' | 'hi';
  escalationLevel?: number;
  resolutionDetails?: string;
}

// Email configuration (should come from environment variables)
const emailConfig: EmailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'noreply@bank.com',
    pass: process.env.SMTP_PASS || 'password'
  }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Email templates
const getEmailTemplates = (data: GrievanceEmailData): EmailTemplate => {
  const isHindi = data.locale === 'hi';
  
  const baseTemplate = {
    subject: isHindi 
      ? `शिकायत संदर्भ संख्या: ${data.referenceNumber}`
      : `Grievance Reference: ${data.referenceNumber}`,
    subjectHi: `शिकायत संदर्भ संख्या: ${data.referenceNumber}`,
    text: isHindi 
      ? `प्रिय ${data.fullName},\n\nआपका शिकायत (संदर्भ संख्या: ${data.referenceNumber}) हमारे पास सफलताय से दर्ज किया गया है।\n\nशिकायत विवरण:\nप्रकार: ${data.complaintType}\nश्रेणी: ${data.complaintCategory}\nप्राथमिकता: ${data.priority}\nस्थिति: ${data.status}\n\nहम आपके शिकायत को गंभीरता से देखने और हल करने के लिए प्रतिबद्ध हैं।\n\nधन्यवाद करें,\n${isHindi ? 'बैंक' : 'Bank'} ग्राहक सेवा`
      : `Dear ${data.fullName},\n\nYour grievance (Reference: ${data.referenceNumber}) has been successfully submitted to our system.\n\nGrievance Details:\nType: ${data.complaintType}\nCategory: ${data.complaintCategory}\nPriority: ${data.priority}\nStatus: ${data.status}\n\nWe are committed to addressing your concerns promptly and efficiently.\n\nThank you,\n${isHindi ? 'बैंक' : 'Bank'} Customer Service`,
    textHi: `प्रिय ${data.fullName},\n\nआपका शिकायत (संदर्भ संख्या: ${data.referenceNumber}) हमारे पास सफलताय से दर्ज किया गया है।\n\nशिकायत विवरण:\nप्रकार: ${data.complaintType}\nश्रेणी: ${data.complaintCategory}\nप्राथमिकता: ${data.priority}\nस्थिति: ${data.status}\n\nहम आपके शिकायत को गंभीरता से देखने और हल करने के लिए प्रतिबद्ध हैं।\n\nधन्यवाद करें,\n${isHindi ? 'बैंक' : 'Bank'} ग्राहक सेवा`
    };

  // HTML templates based on status
  const htmlTemplates: Record<string, (data: GrievanceEmailData) => string> = {
    'submitted': (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${baseTemplate.subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
          .content { background: #ffffff; padding: 30px; border-radius: 8px; margin-top: 20px; }
          .details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; }
          .detail-row { margin-bottom: 10px; }
          .label { font-weight: bold; color: #555; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
          .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #007bff; margin: 0;">
              ${isHindi ? '🏦 शिकायत सफलताय' : '🏦 Grievance Submitted'}
            </h1>
            <p style="margin: 10px 0 0 0; color: #666;">
              ${isHindi ? 'संदर्भ संख्या' : 'Reference'}: <strong>${data.referenceNumber}</strong>
            </p>
          </div>
          
          <div class="content">
            <h2>${isHindi ? 'प्रिय' : 'Dear'} ${data.fullName},</h2>
            <p>
              ${isHindi 
                ? 'आपका शिकायत हमारे पास सफलताय से दर्ज किया गया है। हम इसे गंभीरता से देखने और हल करेंगे।'
                : 'Your grievance has been successfully submitted to our system. We will review it promptly and work towards a resolution.'
              }
            </p>
          </div>
          
          <div class="details">
            <h3>${isHindi ? 'शिकायत विवरण' : 'Grievance Details'}</h3>
            <div class="detail-row">
              <span class="label">${isHindi ? 'संदर्भ संख्या' : 'Reference'}:</span> ${data.referenceNumber}
            </div>
            <div class="detail-row">
              <span class="label">${isHindi ? 'प्रकार' : 'Type'}:</span> ${data.complaintType}
            </div>
            <div class="detail-row">
              <span class="label">${isHindi ? 'श्रेणी' : 'Category'}:</span> ${data.complaintCategory}
            </div>
            <div class="detail-row">
              <span class="label">${isHindi ? 'प्राथमिकता' : 'Priority'}:</span> 
              <span style="color: ${data.priority === 'high' ? '#dc3545' : data.priority === 'medium' ? '#ffc107' : '#28a745'}">
                ${data.priority.toUpperCase()}
              </span>
            </div>
            <div class="detail-row">
              <span class="label">${isHindi ? 'वर्तमान स्थिति' : 'Current Status'}:</span> ${data.status}
            </div>
          </div>
          
          <div class="footer">
            <p style="color: #666; font-size: 14px;">
              ${isHindi 
                ? 'यदि आपको कोई प्रश्न है, तो कृपया हमारे ग्राहक सेवा से संपर्क करें।'
                : 'If you have any questions, please contact our customer service.'
              }
            </p>
            <p style="color: #666; font-size: 14px;">
              ${isHindi ? 'ग्राहक सेवा' : 'Customer Service'}: 1800-123-4567
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    
    'under-review': (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${baseTemplate.subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #e3f2fd; padding: 20px; border-radius: 8px; text-align: center; }
          .content { background: #ffffff; padding: 30px; border-radius: 8px; margin-top: 20px; }
          .timeline { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #007bff; margin: 0;">
              ${isHindi ? '🔍 शिकायत समीक्षा में' : '🔍 Grievance Under Review'}
            </h1>
            <p style="margin: 10px 0 0 0; color: #666;">
              ${isHindi ? 'संदर्भ संख्या' : 'Reference'}: <strong>${data.referenceNumber}</strong>
            </p>
          </div>
          
          <div class="content">
            <h2>${isHindi ? 'प्रिय' : 'Dear'} ${data.fullName},</h2>
            <p>
              ${isHindi 
                ? 'आपका शिकायत अब समीक्षा में है। हमारे टीम इसे ध्यानपूर्वक रूप से देख रही है।'
                : 'Your grievance is currently under review. Our team is examining it thoroughly.'
              }
            </p>
          </div>
          
          <div class="timeline">
            <h3>${isHindi ? 'अगला समयरेखा' : 'Expected Timeline'}</h3>
            <p>
              ${isHindi 
                ? 'आपको 24 घंटे के भीतर अपडेट मिलेगी।'
                : 'You will receive an update within 24 hours.'
              }
            </p>
          </div>
          
          <div class="footer">
            <p style="color: #666; font-size: 14px;">
              ${isHindi 
                ? 'शिकायत ट्रैक करने के लिए: <a href="https://bank.com/grievances/${data.referenceNumber}" style="color: #007bff;">यहां क्लिक करें</a>'
                : 'Track your grievance: <a href="https://bank.com/grievances/${data.referenceNumber}" style="color: #007bff;">Click here</a>'
              }
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    
    'resolved': (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${baseTemplate.subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #28a745; padding: 20px; border-radius: 8px; text-align: center; }
          .content { background: #ffffff; padding: 30px; border-radius: 8px; margin-top: 20px; }
          .resolution { background: #d4edda; padding: 20px; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: white; margin: 0;">
              ${isHindi ? '✅ शिकायत समाधित' : '✅ Grievance Resolved'}
            </h1>
            <p style="margin: 10px 0 0 0; color: white;">
              ${isHindi ? 'संदर्भ संख्या' : 'Reference'}: <strong>${data.referenceNumber}</strong>
            </p>
          </div>
          
          <div class="content">
            <h2>${isHindi ? 'प्रिय' : 'Dear'} ${data.fullName},</h2>
            <p>
              ${isHindi 
                ? 'आपका शिकायत सफलताय से समाधित कर दिया गया है।'
                : 'Your grievance has been successfully resolved.'
              }
            </p>
          </div>
          
          <div class="resolution">
            <h3>${isHindi ? 'समाधान विवरण' : 'Resolution Details'}</h3>
            <p>${data.resolutionDetails || 'The issue has been resolved and the grievance is now closed.'}</p>
          </div>
          
          <div class="footer">
            <p style="color: #666; font-size: 14px;">
              ${isHindi 
                ? 'कृपया हमारी सेवा से संतुष्ट होने के लिए रेटिंग दें: <a href="https://bank.com/feedback" style="color: #28a745;">रेटिंग दें</a>'
                : 'Please rate our service: <a href="https://bank.com/feedback" style="color: #28a745;">Rate Service</a>'
              }
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  const html = htmlTemplates[data.status]?.(data) || htmlTemplates['submitted'](data);
  const htmlHi = htmlTemplates[data.status]?.(data) || htmlTemplates['submitted'](data);

  return {
    ...baseTemplate,
    html,
    htmlHi
  };
};

// Main email sending function
export const sendGrievanceEmail = async (
  to: string,
  data: GrievanceEmailData,
  type: 'submission' | 'status-update' | 'escalation' | 'resolution' = 'status-update'
): Promise<{ success: boolean; error?: string; messageId?: string }> => {
  try {
    const templates = getEmailTemplates(data);
    
    const mailOptions = {
      from: `"${data.locale === 'hi' ? 'बैंक' : 'Bank'} Customer Service" <${emailConfig.auth.user}>`,
      to,
      subject: data.locale === 'hi' ? templates.subjectHi : templates.subject,
      html: data.locale === 'hi' ? templates.htmlHi : templates.html,
      text: data.locale === 'hi' ? templates.textHi : templates.text,
      headers: {
        'X-Priority': data.priority === 'high' ? '1' : '3',
        'X-Mailer': 'Bank Grievance System',
        'X-Grievance-Ref': data.referenceNumber,
        'X-Grievance-Type': type
      }
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log(`Email sent successfully to ${to}:`, result.messageId);
    
    return {
      success: true,
      messageId: result.messageId
    };

  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Send acknowledgment email
export const sendAcknowledgmentEmail = async (data: GrievanceEmailData): Promise<{ success: boolean; error?: string }> => {
  return sendGrievanceEmail(data.email, data, 'submission');
};

// Send status update email
export const sendStatusUpdateEmail = async (data: GrievanceEmailData): Promise<{ success: boolean; error?: string }> => {
  return sendGrievanceEmail(data.email, data, 'status-update');
};

// Send escalation notification email
export const sendEscalationEmail = async (data: GrievanceEmailData): Promise<{ success: boolean; error?: string }> => {
  return sendGrievanceEmail(data.email, data, 'escalation');
};

// Send resolution email
export const sendResolutionEmail = async (data: GrievanceEmailData): Promise<{ success: boolean; error?: string }> => {
  return sendGrievanceEmail(data.email, data, 'resolution');
};

// Send notification to internal teams
export const sendInternalNotification = async (
  data: GrievanceEmailData,
  recipients: string[] = ['branch.manager@bank.com', 'compliance@bank.com']
): Promise<{ success: boolean; error?: string }> => {
  try {
    const isHindi = data.locale === 'hi';
    
    const internalMailOptions = {
      from: `"Grievance System" <${emailConfig.auth.user}>`,
      to: recipients.join(', '),
      subject: isHindi 
        ? `नई शिकायत: ${data.referenceNumber} - ${data.priority.toUpperCase()} प्राथमिकता`
        : `New Grievance: ${data.referenceNumber} - ${data.priority.toUpperCase()} Priority`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f9fa;">
          <h2 style="color: #dc3545;">${isHindi ? 'नई शिकायत अलर्ट' : 'New Grievance Alert'}</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 10px;">
            <p><strong>${isHindi ? 'संदर्भ संख्या' : 'Reference'}:</strong> ${data.referenceNumber}</p>
            <p><strong>${isHindi ? 'नाम' : 'Name'}:</strong> ${data.fullName}</p>
            <p><strong>${isHindi ? 'ईमेल' : 'Email'}:</strong> ${data.email}</p>
            <p><strong>${isHindi ? 'मोबाइल' : 'Mobile'}:</strong> ${data.mobileNumber}</p>
            <p><strong>${isHindi ? 'प्रकार' : 'Type'}:</strong> ${data.complaintType}</p>
            <p><strong>${isHindi ? 'श्रेणी' : 'Category'}:</strong> ${data.complaintCategory}</p>
            <p><strong>${isHindi ? 'प्राथमिकता' : 'Priority'}:</strong> 
              <span style="color: ${data.priority === 'high' ? '#dc3545' : data.priority === 'medium' ? '#ffc107' : '#28a745'}; font-weight: bold;">
                ${data.priority.toUpperCase()}
              </span>
            </p>
            <p><strong>${isHindi ? 'स्थिति' : 'Status'}:</strong> ${data.status}</p>
            <div style="margin-top: 20px;">
              <a href="https://bank.com/admin/grievances/${data.referenceNumber}" 
                 style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                ${isHindi ? 'शिकायत देखें' : 'View Grievance'}
              </a>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(internalMailOptions);
    
    return {
      success: true
    };

  } catch (error) {
    console.error('Internal notification error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Test email configuration
export const testEmailConfiguration = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await transporter.verify();
    console.log('Email configuration verified successfully');
    return { success: true };
  } catch (error) {
    console.error('Email configuration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Email configuration failed'
    };
  }
};
