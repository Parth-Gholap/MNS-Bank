import { NextRequest, NextResponse } from 'next/server';

interface ServiceCharge {
  id: string;
  category: string;
  categoryHi: string;
  service: string;
  serviceHi: string;
  chargeType: string;
  chargeTypeHi: string;
  amount: number;
  amountType: string;
  amountTypeHi: string;
  description: string;
  descriptionHi: string;
  applicableTo: string[];
  applicableToHi: string[];
  frequency: string;
  frequencyHi: string;
  lastUpdated: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Mock service charges data
    const charges: ServiceCharge[] = [
      {
        id: '1',
        category: 'Account Services',
        categoryHi: 'खाता सेवाएं',
        service: 'Account Opening',
        serviceHi: 'खाता खोलना',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'No charges for opening savings or current account',
        descriptionHi: 'बचत या चालू खाता खोलने पर कोई शुल्क नहीं',
        applicableTo: ['Savings Account', 'Current Account'],
        applicableToHi: ['बचत खाता', 'चालू खाता'],
        frequency: 'One-time',
        frequencyHi: 'एक बार',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        category: 'Account Services',
        categoryHi: 'खाता सेवाएं',
        service: 'Minimum Balance',
        serviceHi: 'न्यूनतम शेष',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'No minimum balance requirement for basic savings account',
        descriptionHi: 'बुनियादी बचत खाते के लिए कोई न्यूनतम शेष आवश्यकता नहीं',
        applicableTo: ['Savings Account'],
        applicableToHi: ['बचत खाता'],
        frequency: 'Ongoing',
        frequencyHi: 'निरंतर',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        category: 'Account Services',
        categoryHi: 'खाता सेवाएं',
        service: 'Cheque Book',
        serviceHi: 'चेक बुक',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'First cheque book free, subsequent books at nominal charge',
        descriptionHi: 'पहला चेक बुक मुफ्त, बाद की पुस्तकें नाममात्र शुल्क पर',
        applicableTo: ['Savings Account', 'Current Account'],
        applicableToHi: ['बचत खाता', 'चालू खाता'],
        frequency: 'Per book',
        frequencyHi: 'प्रति पुस्तक',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '4',
        category: 'Account Services',
        categoryHi: 'खाता सेवाएं',
        service: 'Debit Card',
        serviceHi: 'डेबिट कार्ड',
        chargeType: 'Nominal',
        chargeTypeHi: 'नाममात्र',
        amount: 150,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Annual fee for debit card issuance and maintenance',
        descriptionHi: 'डेबिट कार्ड जारी और रखरखाव के लिए वार्षिक शुल्क',
        applicableTo: ['Savings Account', 'Current Account'],
        applicableToHi: ['बचत खाता', 'चालू खाता'],
        frequency: 'Annual',
        frequencyHi: 'वार्षिक',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '5',
        category: 'Account Services',
        categoryHi: 'खाता सेवाएं',
        service: 'Account Statement',
        serviceHi: 'खाता विवरण',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Free monthly statements via email or SMS',
        descriptionHi: 'ईमेल या SMS के माध्यम से मुफ्त मासिक विवरण',
        applicableTo: ['All Accounts'],
        applicableToHi: ['सभी खाते'],
        frequency: 'Monthly',
        frequencyHi: 'मासिक',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '6',
        category: 'Transaction Services',
        categoryHi: 'लेनदेन सेवाएं',
        service: 'NEFT/RTGS',
        serviceHi: 'NEFT/RTGS',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Free online NEFT and RTGS transactions',
        descriptionHi: 'मुफ्त ऑनलाइन NEFT और RTGS लेनदेन',
        applicableTo: ['All Accounts'],
        applicableToHi: ['सभी खाते'],
        frequency: 'Per transaction',
        frequencyHi: 'प्रति लेनदेन',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '7',
        category: 'Transaction Services',
        categoryHi: 'लेनदेन सेवाएं',
        service: 'IMPS',
        serviceHi: 'IMPS',
        chargeType: 'Nominal',
        chargeTypeHi: 'नाममात्र',
        amount: 5,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Small charge for IMPS transactions above ₹1000',
        descriptionHi: '₹1000 से अधिक IMPS लेनदेन के लिए छोटी शुल्क',
        applicableTo: ['All Accounts'],
        applicableToHi: ['सभी खाते'],
        frequency: 'Per transaction',
        frequencyHi: 'प्रति लेनदेन',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '8',
        category: 'Transaction Services',
        categoryHi: 'लेनदेन सेवाएं',
        service: 'UPI Transactions',
        serviceHi: 'UPI लेनदेन',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Free UPI transactions for all account holders',
        descriptionHi: 'सभी खाताधारकों के लिए मुफ्त UPI लेनदेन',
        applicableTo: ['All Accounts'],
        applicableToHi: ['सभी खाते'],
        frequency: 'Per transaction',
        frequencyHi: 'प्रति लेनदेन',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '9',
        category: 'Transaction Services',
        categoryHi: 'लेनदेन सेवाएं',
        service: 'Cash Withdrawal',
        serviceHi: 'नकद निकासी',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Free cash withdrawals at home branch',
        descriptionHi: 'घर की शाखा पर मुफ्त नकद निकासी',
        applicableTo: ['All Accounts'],
        applicableToHi: ['सभी खाते'],
        frequency: 'Per transaction',
        frequencyHi: 'प्रति लेनदेन',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '10',
        category: 'Transaction Services',
        categoryHi: 'लेनदेन सेवाएं',
        service: 'ATM Withdrawal',
        serviceHi: 'ATM निकासी',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'First 5 ATM withdrawals free per month',
        descriptionHi: 'प्रति माह पहले 5 ATM निकासी मुफ्त',
        applicableTo: ['Savings Account', 'Current Account'],
        applicableToHi: ['बचत खाता', 'चालू खाता'],
        frequency: 'Per transaction after 5',
        frequencyHi: '5 के बाद प्रति लेनदेन',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '11',
        category: 'Loan Services',
        categoryHi: 'लोन सेवाएं',
        service: 'Loan Processing Fee',
        serviceHi: 'लोन प्रसंस्करण शुल्क',
        chargeType: 'Standard',
        chargeTypeHi: 'मानक',
        amount: 1,
        amountType: 'percentage',
        amountTypeHi: 'प्रतिशत',
        description: 'Processing fee applicable on all loan amounts',
        descriptionHi: 'सभी लोन राशियों पर लागू प्रसंस्करण शुल्क',
        applicableTo: ['Personal Loan', 'Home Loan', 'Car Loan', 'Business Loan'],
        applicableToHi: ['व्यक्ति लोन', 'होम लोन', 'कार लोन', 'व्यवसाय लोन'],
        frequency: 'One-time',
        frequencyHi: 'एक बार',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '12',
        category: 'Loan Services',
        categoryHi: 'लोन सेवाएं',
        service: 'Prepayment Charges',
        serviceHi: 'पूर्वभुगतान शुल्क',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'No prepayment charges on floating rate loans',
        descriptionHi: 'फ्लोटिंग दर लोन पर कोई पूर्वभुगतान शुल्क नहीं',
        applicableTo: ['Personal Loan', 'Home Loan'],
        applicableToHi: ['व्यक्ति लोन', 'होम लोन'],
        frequency: 'One-time',
        frequencyHi: 'एक बार',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '13',
        category: 'Loan Services',
        categoryHi: 'लोन सेवाएं',
        service: 'Late Payment Charges',
        serviceHi: 'देर से भुगतानी शुल्क',
        chargeType: 'Standard',
        chargeTypeHi: 'मानक',
        amount: 2,
        amountType: 'percentage',
        amountTypeHi: 'प्रतिशत',
        description: 'Late payment charges on overdue EMI amounts',
        descriptionHi: 'बकाया EMI राशि पर देर से भुगतानी शुल्क',
        applicableTo: ['All Loans'],
        applicableToHi: ['सभी लोन'],
        frequency: 'Per instance',
        frequencyHi: 'प्रति उदाहरण',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '14',
        category: 'Digital Services',
        categoryHi: 'डिजिटल सेवाएं',
        service: 'Mobile Banking',
        serviceHi: 'मोबाइल बैंकिंग',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Free mobile banking app with all features',
        descriptionHi: 'सभी सुविधाओं के साथ मुफ्त मोबाइल बैंकिंग ऐप',
        applicableTo: ['All Accounts'],
        applicableToHi: ['सभी खाते'],
        frequency: 'Ongoing',
        frequencyHi: 'निरंतर',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '15',
        category: 'Digital Services',
        categoryHi: 'डिजिटल सेवाएं',
        service: 'Net Banking',
        serviceHi: 'नेट बैंकिंग',
        chargeType: 'Free',
        chargeTypeHi: 'मुफ्त',
        amount: 0,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Free internet banking with complete features',
        descriptionHi: 'पूर्ण सुविधाओं के साथ मुफ्त इंटरनेट बैंकिंग',
        applicableTo: ['All Accounts'],
        applicableToHi: ['सभी खाते'],
        frequency: 'Ongoing',
        frequencyHi: 'निरंतर',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '16',
        category: 'Digital Services',
        categoryHi: 'डिजिटल सेवाएं',
        service: 'SMS Alerts',
        serviceHi: 'SMS अलर्ट',
        chargeType: 'Nominal',
        chargeTypeHi: 'नाममात्र',
        amount: 15,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Quarterly charges for SMS banking alerts',
        descriptionHi: 'SMS बैंकिंग अलर्ट के लिए त्रैमासिक शुल्क',
        applicableTo: ['All Accounts'],
        applicableToHi: ['सभी खाते'],
        frequency: 'Quarterly',
        frequencyHi: 'त्रैमासिक',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '17',
        category: 'Card Services',
        categoryHi: 'कार्ड सेवाएं',
        service: 'Card Replacement',
        serviceHi: 'कार्ड प्रतिस्थापन',
        chargeType: 'Standard',
        chargeTypeHi: 'मानक',
        amount: 200,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Charges for lost or damaged card replacement',
        descriptionHi: 'खोए हुए या क्षतिग्रस्त कार्ड प्रतिस्थापन के लिए शुल्क',
        applicableTo: ['Debit Card', 'Credit Card'],
        applicableToHi: ['डेबिट कार्ड', 'क्रेडिट कार्ड'],
        frequency: 'Per instance',
        frequencyHi: 'प्रति उदाहरण',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '18',
        category: 'Card Services',
        categoryHi: 'कार्ड सेवाएं',
        service: 'Annual Card Fee',
        serviceHi: 'वार्षिक कार्ड शुल्क',
        chargeType: 'Premium',
        chargeTypeHi: 'प्रीमियम',
        amount: 500,
        amountType: 'fixed',
        amountTypeHi: 'निश्चित',
        description: 'Annual fee for premium credit cards',
        descriptionHi: 'प्रीमियम क्रेडिट कार्ड के लिए वार्षिक शुल्क',
        applicableTo: ['Credit Card'],
        applicableToHi: ['क्रेडिट कार्ड'],
        frequency: 'Annual',
        frequencyHi: 'वार्षिक',
        lastUpdated: new Date().toISOString()
      }
    ];

    // Log for analytics
    console.log('Charges API accessed:', {
      locale,
      count: charges.length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        charges,
        summary: {
          totalCharges: charges.length,
          categories: Array.from(new Set(charges.map(c => c.category))),
          freeServices: charges.filter(c => c.amount === 0).length,
          paidServices: charges.filter(c => c.amount > 0).length,
          lastUpdated: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Charges API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching service charges'
      },
      { status: 500 }
    );
  }
}
