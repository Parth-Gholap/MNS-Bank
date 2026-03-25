interface SMSConfig {
  apiKey: string;
  sender: string;
  provider: 'twilio' | 'messagebird' | 'aws-sns';
  apiUrl: string;
}

interface SMSMessage {
  to: string;
  body: string;
  priority?: 'high' | 'normal';
}

interface GrievanceSMSData {
  referenceNumber: string;
  fullName: string;
  mobileNumber: string;
  priority: 'low' | 'medium' | 'high';
  status: string;
  locale: 'en' | 'hi';
  escalationLevel?: number;
}

// SMS configuration (should come from environment variables)
const smsConfig: SMSConfig = {
  apiKey: process.env.SMS_API_KEY || 'your-api-key',
  sender: process.env.SMS_SENDER || 'BANK',
  provider: (process.env.SMS_PROVIDER as any) || 'twilio',
  apiUrl: process.env.SMS_API_URL || 'https://api.twilio.com/2010-04-01/Accounts'
};

// SMS templates
const getSMSTemplates = (data: GrievanceSMSData) => {
  const isHindi = data.locale === 'hi';
  
  const templates = {
    'submission': {
      en: `Bank: Grievance ${data.referenceNumber} submitted successfully. We will contact you within 24 hours. Track status: bank.com/grievances/${data.referenceNumber}`,
      hi: `बैंक: शिकायत ${data.referenceNumber} सफलताय से दर्ज किया गया। हम 24 घंटे के भीतर आपसे संपर्क करेंगे। स्थिति ट्रैक: bank.com/grievances/${data.referenceNumber}`
    },
    
    'under-review': {
      en: `Bank: Your grievance ${data.referenceNumber} is under review. Update will be sent within 24 hours.`,
      hi: `बैंक: आपका शिकायत ${data.referenceNumber} समीक्षा में है। 24 घंटे के भीतर अपडेट भेजा जाएगा।`
    },
    
    'escalated': {
      en: `Bank: Your grievance ${data.referenceNumber} has been escalated. Response time: ${data.escalationLevel === 1 ? '48 hours' : data.escalationLevel === 2 ? '72 hours' : '30 days'}`,
      hi: `बैंक: आपका शिकायत ${data.referenceNumber} एस्केलेट किया गया है। प्रतिक्रिय समय: ${data.escalationLevel === 1 ? '48 घंटे' : data.escalationLevel === 2 ? '72 घंटे' : '30 दिन'}`
    },
    
    'status-update': {
      en: `Bank: Your grievance ${data.referenceNumber} status has been updated. Current status: ${data.status}.`,
      hi: `बैंक: आपका शिकायत ${data.referenceNumber} की स्थिति अपडेट गई है। वर्तमान स्थिति: ${data.status}`
    },
    
    'resolution': {
      en: `Bank: Your grievance ${data.referenceNumber} has been resolved. Thank you for your patience.`,
      hi: `बैंक: आपका शिकायत ${data.referenceNumber} समाधित हो गया है। आपके धैर्य के लिए धन्यवाद।`
    },
    
    'resolved': {
      en: `Bank: Your grievance ${data.referenceNumber} has been resolved. Thank you for your patience. Rate our service: bank.com/feedback`,
      hi: `बैंक: आपका शिकायत ${data.referenceNumber} समाधित हो गया है। आपके धैर्य के लिए धन्यवाद। हमारी सेवा रेट करें: bank.com/feedback`
    },
    
    'high-priority-alert': {
      en: `URGENT: High priority grievance ${data.referenceNumber} requires immediate attention. Please check email for details.`,
      hi: `तात: उच्च प्राथमिकता शिकायत ${data.referenceNumber} को तत्काल ध्यान की आवश्यकता है। विवरण के लिए ईमेल जांचें।`
    }
  };

  return templates;
};

// Main SMS sending function
export const sendSMS = async (
  message: SMSMessage
): Promise<{ success: boolean; error?: string; messageId?: string }> => {
  try {
    // Different implementations based on provider
    switch (smsConfig.provider) {
      case 'twilio':
        return await sendTwilioSMS(message);
      case 'messagebird':
        return await sendMessageBirdSMS(message);
      case 'aws-sns':
        return await sendAWSSNS(message);
      default:
        throw new Error(`Unsupported SMS provider: ${smsConfig.provider}`);
    }
  } catch (error) {
    console.error('SMS sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Twilio implementation
const sendTwilioSMS = async (
  message: SMSMessage
): Promise<{ success: boolean; error?: string; messageId?: string }> => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioNumber) {
      throw new Error('Twilio configuration missing');
    }

    const twilio = require('twilio')(accountSid, authToken);
    
    const result = await twilio.messages.create({
      body: message.body,
      to: message.to,
      from: twilioNumber,
      priority: message.priority || 'normal'
    });

    console.log(`Twilio SMS sent successfully to ${message.to}:`, result.sid);
    
    return {
      success: true,
      messageId: result.sid
    };

  } catch (error) {
    console.error('Twilio SMS error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Twilio SMS failed'
    };
  }
};

// MessageBird implementation
const sendMessageBirdSMS = async (
  message: SMSMessage
): Promise<{ success: boolean; error?: string; messageId?: string }> => {
  try {
    const response = await fetch(`${smsConfig.apiUrl}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `AccessKey ${smsConfig.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipients: [{ recipient: message.to }],
        message: message.body,
        originator: smsConfig.sender
      })
    });

    const data = await response.json();
    
    if (response.ok && data.items && data.items.length > 0) {
      console.log(`MessageBird SMS sent successfully to ${message.to}:`, data.items[0].id);
      
      return {
        success: true,
        messageId: data.items[0].id
      };
    } else {
      throw new Error(data.error?.description || 'MessageBird SMS failed');
    }

  } catch (error) {
    console.error('MessageBird SMS error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'MessageBird SMS failed'
    };
  }
};

// AWS SNS implementation
const sendAWSSNS = async (
  message: SMSMessage
): Promise<{ success: boolean; error?: string; messageId?: string }> => {
  try {
    const AWS = require('aws-sdk');
    const sns = new AWS.SNS({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1'
    });

    const params = {
      Message: message.body,
      PhoneNumber: message.to,
      MessageAttributes: {
        priority: {
          DataType: 'String',
          StringValue: message.priority || 'normal'
        }
      }
    };

    const result = await sns.publish(params).promise();
    
    console.log(`AWS SNS SMS sent successfully to ${message.to}:`, result.MessageId);
    
    return {
      success: true,
      messageId: result.MessageId
    };

  } catch (error) {
    console.error('AWS SNS SMS error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'AWS SNS SMS failed'
    };
  }
};

// Send grievance-related SMS
export const sendGrievanceSMS = async (
  to: string,
  data: GrievanceSMSData,
  type: 'submission' | 'status-update' | 'escalated' | 'resolution' | 'high-priority-alert' = 'status-update'
): Promise<{ success: boolean; error?: string; messageId?: string }> => {
  const templates = getSMSTemplates(data);
  const template = templates[type];
  
  if (!template) {
    return {
      success: false,
      error: 'Invalid SMS template type'
    };
  }

  const message: SMSMessage = {
    to,
    body: data.locale === 'hi' ? template.hi : template.en,
    priority: data.priority === 'high' ? 'high' : 'normal'
  };

  return sendSMS(message);
};

// Send high-priority grievance alert to internal team
export const sendHighPriorityAlert = async (
  data: GrievanceSMSData,
  recipients: string[] = ['+919876543210', '+919876543211'] // Internal team numbers
): Promise<{ success: boolean; errors?: string[] }> => {
  const templates = getSMSTemplates(data);
  const alertTemplate = templates['high-priority-alert'];
  
  const results = await Promise.allSettled(
    recipients.map(recipient => 
      sendSMS({
        to: recipient,
        body: data.locale === 'hi' ? alertTemplate.hi : alertTemplate.en,
        priority: 'high'
      })
    )
  );

  const errors: string[] = [];
  let successCount = 0;

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      successCount++;
    } else {
      errors.push(`Failed to send to ${recipients[index]}: ${result.status === 'rejected' ? 'Request failed' : (result as any).reason || 'Unknown error'}`);
    }
  });

  console.log(`High priority alert sent to ${successCount}/${recipients.length} recipients`);
  
  return {
    success: successCount === recipients.length,
    errors: errors.length > 0 ? errors : undefined
  };
};

// Send SMS to multiple recipients (bulk SMS)
export const sendBulkSMS = async (
  messages: SMSMessage[]
): Promise<{ success: boolean; error?: string; results?: any[] }> => {
  try {
    const results = await Promise.allSettled(
      messages.map(message => sendSMS(message))
    );

    const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const errors = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success));

    console.log(`Bulk SMS sent: ${successCount}/${messages.length} successful`);

    return {
      success: successCount === messages.length,
      results: results.map(r => r.status === 'fulfilled' ? r.value : r.reason),
      error: errors.length > 0 ? `${errors.length} messages failed` : undefined
    };

  } catch (error) {
    console.error('Bulk SMS error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Bulk SMS failed'
    };
  }
};

// Get SMS delivery status
export const getSMSStatus = async (
  messageId: string
): Promise<{ success: boolean; status?: string; error?: string }> => {
  try {
    // This would depend on the SMS provider's API
    switch (smsConfig.provider) {
      case 'twilio':
        return await getTwilioSMSStatus(messageId);
      case 'messagebird':
        return await getMessageBirdSMSStatus(messageId);
      case 'aws-sns':
        return await getAWSSNSStatus(messageId);
      default:
        throw new Error(`Unsupported SMS provider: ${smsConfig.provider}`);
    }
  } catch (error) {
    console.error('SMS status check error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Status check failed'
    };
  }
};

// Provider-specific status check functions
const getTwilioSMSStatus = async (messageId: string) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilio = require('twilio')(accountSid, authToken);
  
  const message = await twilio.messages(messageId).fetch();
  
  return {
    success: true,
    status: message.status
  };
};

const getMessageBirdSMSStatus = async (messageId: string) => {
  const response = await fetch(`${smsConfig.apiUrl}/messages/${messageId}`, {
    headers: {
      'Authorization': `AccessKey ${smsConfig.apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  
  return {
    success: response.ok,
    status: data.status?.toLowerCase()
  };
};

const getAWSSNSStatus = async (messageId: string) => {
  const AWS = require('aws-sdk');
  const sns = new AWS.SNS({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
  });

  const params = {
    MessageId: messageId
  };

  const attributes = await sns.getMessageAttributes(params).promise();
  
  return {
    success: true,
    status: attributes.OriginalSMSSMessageStatus?.StringValue || 'unknown'
  };
};

// Validate mobile number for SMS
export const validateMobileNumber = (mobileNumber: string): { valid: boolean; error?: string } => {
  // Remove any non-digit characters
  const cleanNumber = mobileNumber.replace(/\D/g, '');
  
  // Check if it's a valid mobile number (10 digits, starts with 6-9 for India)
  const mobileRegex = /^[6-9]\d{9}$/;
  
  if (!mobileRegex.test(cleanNumber)) {
    return {
      valid: false,
      error: 'Invalid mobile number format. Must be 10 digits starting with 6-9'
    };
  }
  
  return {
    valid: true
  };
};

// Test SMS configuration
export const testSMSConfiguration = async (): Promise<{ success: boolean; error?: string; provider?: string }> => {
  try {
    // Test with a simple message to a test number
    const testResult = await sendSMS({
      to: process.env.SMS_TEST_NUMBER || '+919876543210',
      body: 'Test message from grievance system'
    });

    return {
      success: testResult.success,
      provider: smsConfig.provider,
      error: testResult.error
    };

  } catch (error) {
    console.error('SMS configuration test error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'SMS configuration test failed'
    };
  }
};
