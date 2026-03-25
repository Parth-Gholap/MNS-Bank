import { NextRequest, NextResponse } from 'next/server';

interface InterestRate {
  id: string;
  category: string;
  categoryHi: string;
  product: string;
  productHi: string;
  rateType: string;
  rateTypeHi: string;
  minRate: number;
  maxRate: number;
  effectiveRate: number;
  tenure: string;
  tenureHi: string;
  specialFeatures: string[];
  specialFeaturesHi: string[];
  lastUpdated: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Mock interest rates data
    const rates: InterestRate[] = [
      {
        id: '1',
        category: 'Savings Account',
        categoryHi: 'बचत खाता',
        product: 'Regular Savings',
        productHi: 'नियमित बचत',
        rateType: 'Floating',
        rateTypeHi: 'फ्लोटिंग',
        minRate: 2.75,
        maxRate: 3.50,
        effectiveRate: 3.25,
        tenure: 'Daily Balance',
        tenureHi: 'दैनिक शेष',
        specialFeatures: ['Zero Balance', 'Mobile Banking', 'Free ATM'],
        specialFeaturesHi: ['जीरो शेष', 'मोबाइल बैंकिंग', 'मुफ्त एटीएम'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        category: 'Savings Account',
        categoryHi: 'बचत खाता',
        product: 'Senior Citizen Savings',
        productHi: 'वरिष्ठ नागरिक बचत',
        rateType: 'Fixed',
        rateTypeHi: 'निश्चित',
        minRate: 4.00,
        maxRate: 4.00,
        effectiveRate: 4.00,
        tenure: 'Daily Balance',
        tenureHi: 'दैनिक शेष',
        specialFeatures: ['Higher Interest', 'Priority Service', 'Free Cheques'],
        specialFeaturesHi: ['उच्च ब्याज', 'प्राथमिकता सेवा', 'मुफ्त चेक'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        category: 'Current Account',
        categoryHi: 'चालू खाता',
        product: 'Regular Current',
        productHi: 'नियमित चालू',
        rateType: 'No Interest',
        rateTypeHi: 'कोई ब्याज नहीं',
        minRate: 0,
        maxRate: 0,
        effectiveRate: 0,
        tenure: 'N/A',
        tenureHi: 'लागू नहीं',
        specialFeatures: ['Unlimited Transactions', 'Overdraft Facility', 'Business Tools'],
        specialFeaturesHi: ['असीमित लेनदेन', 'ओवरड्राफ्ट सुविधा', 'व्यवसाय उपकरण'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '4',
        category: 'Personal Loan',
        categoryHi: 'व्यक्ति लोन',
        product: 'Personal Loan',
        productHi: 'व्यक्ति लोन',
        rateType: 'Fixed',
        rateTypeHi: 'निश्चित',
        minRate: 10.50,
        maxRate: 14.00,
        effectiveRate: 12.25,
        tenure: '6-60 months',
        tenureHi: '6-60 महीने',
        specialFeatures: ['Quick Approval', 'Flexible EMI', 'No Prepayment Charges'],
        specialFeaturesHi: ['त्वरित स्वीकृति', 'लचीला EMI', 'कोई पूर्वभुगतान शुल्क नहीं'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '5',
        category: 'Personal Loan',
        categoryHi: 'व्यक्ति लोन',
        product: 'Education Loan',
        productHi: 'शिक्षा लोन',
        rateType: 'Floating',
        rateTypeHi: 'फ्लोटिंग',
        minRate: 8.50,
        maxRate: 11.50,
        effectiveRate: 10.00,
        tenure: '12-120 months',
        tenureHi: '12-120 महीने',
        specialFeatures: ['Tax Benefits', 'Study Abroad', 'Moratorium Period'],
        specialFeaturesHi: ['कर लाभ', 'विदेशी अध्ययन', 'मोरेटोरियम अवधि'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '6',
        category: 'Home Loan',
        categoryHi: 'होम लोन',
        product: 'Home Loan',
        productHi: 'होम लोन',
        rateType: 'Floating',
        rateTypeHi: 'फ्लोटिंग',
        minRate: 7.50,
        maxRate: 9.50,
        effectiveRate: 8.50,
        tenure: '5-30 years',
        tenureHi: '5-30 वर्ष',
        specialFeatures: ['Tax Benefits', 'Long Tenure', 'Property Insurance'],
        specialFeaturesHi: ['कर लाभ', 'लंबा कार्यकाल', 'प्रॉपर्टी बीमा'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '7',
        category: 'Home Loan',
        categoryHi: 'होम लोन',
        product: 'Home Loan - Pradhan Mantri',
        productHi: 'होम लोन - प्रधानमंत्री',
        rateType: 'Fixed',
        rateTypeHi: 'निश्चित',
        minRate: 6.50,
        maxRate: 6.50,
        effectiveRate: 6.50,
        tenure: '20 years',
        tenureHi: '20 वर्ष',
        specialFeatures: ['Subsidy', 'Government Scheme', 'Low Processing Fee'],
        specialFeaturesHi: ['सब्सिडी', 'सरकार योजना', 'कम प्रसंस्करण शुल्क'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '8',
        category: 'Car Loan',
        categoryHi: 'कार लोन',
        product: 'New Car Loan',
        productHi: 'नई कार लोन',
        rateType: 'Fixed',
        rateTypeHi: 'निश्चित',
        minRate: 8.50,
        maxRate: 11.00,
        effectiveRate: 9.75,
        tenure: '1-7 years',
        tenureHi: '1-7 वर्ष',
        specialFeatures: ['100% Finance', 'Quick Disbursal', 'Insurance Cover'],
        specialFeaturesHi: ['100% वित्त', 'त्वरित वितरण', 'बीमा कवर'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '9',
        category: 'Car Loan',
        categoryHi: 'कार लोन',
        product: 'Used Car Loan',
        productHi: 'पुरानी कार लोन',
        rateType: 'Fixed',
        rateTypeHi: 'निश्चित',
        minRate: 11.00,
        maxRate: 14.50,
        effectiveRate: 12.75,
        tenure: '1-5 years',
        tenureHi: '1-5 वर्ष',
        specialFeatures: ['Vehicle Inspection', 'Flexible Tenure', 'Quick Approval'],
        specialFeaturesHi: ['वाहन निरीक्षण', 'लचीला कार्यकाल', 'त्वरित स्वीकृति'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '10',
        category: 'Business Loan',
        categoryHi: 'व्यवसाय लोन',
        product: 'Business Loan',
        productHi: 'व्यवसाय लोन',
        rateType: 'Floating',
        rateTypeHi: 'फ्लोटिंग',
        minRate: 9.50,
        maxRate: 13.00,
        effectiveRate: 11.25,
        tenure: '12-84 months',
        tenureHi: '12-84 महीने',
        specialFeatures: ['Collateral Free', 'Working Capital', 'Business Advisory'],
        specialFeaturesHi: ['बंधक मुक्त', 'कार्यशील पूंजी', 'व्यवसाय सलाह'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '11',
        category: 'Business Loan',
        categoryHi: 'व्यवसाय लोन',
        product: 'MSME Loan',
        productHi: 'MSME लोन',
        rateType: 'Fixed',
        rateTypeHi: 'निश्चित',
        minRate: 8.00,
        maxRate: 10.50,
        effectiveRate: 9.25,
        tenure: '36-120 months',
        tenureHi: '36-120 महीने',
        specialFeatures: ['Government Backed', 'Low Interest', 'Quick Processing'],
        specialFeaturesHi: ['सरकार समर्थित', 'कम ब्याज', 'त्वरित प्रसंस्करण'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '12',
        category: 'Fixed Deposit',
        categoryHi: 'सावध जमा',
        product: 'Fixed Deposit',
        productHi: 'सावध जमा',
        rateType: 'Fixed',
        rateTypeHi: 'निश्चित',
        minRate: 5.50,
        maxRate: 7.25,
        effectiveRate: 6.50,
        tenure: '7 days - 10 years',
        tenureHi: '7 दिन - 10 वर्ष',
        specialFeatures: ['Guaranteed Returns', 'Tax Benefits', 'Loan Against FD'],
        specialFeaturesHi: ['गारंटीड रिटर्न', 'कर लाभ', 'FD के खिलाफ लोन'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '13',
        category: 'Fixed Deposit',
        categoryHi: 'सावध जमा',
        product: 'Senior Citizen FD',
        productHi: 'वरिष्ठ नागरिक FD',
        rateType: 'Fixed',
        rateTypeHi: 'निश्चित',
        minRate: 6.00,
        maxRate: 8.00,
        effectiveRate: 7.00,
        tenure: '1-5 years',
        tenureHi: '1-5 वर्ष',
        specialFeatures: ['Higher Interest', 'Quarterly Payout', 'Special Service'],
        specialFeaturesHi: ['उच्च ब्याज', 'त्रैमासिक भुगतान', 'विशेष सेवा'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '14',
        category: 'Recurring Deposit',
        categoryHi: 'आवर्ती जमा',
        product: 'Recurring Deposit',
        productHi: 'आवर्ती जमा',
        rateType: 'Fixed',
        rateTypeHi: 'निश्चित',
        minRate: 5.25,
        maxRate: 6.75,
        effectiveRate: 6.00,
        tenure: '6-120 months',
        tenureHi: '6-120 महीने',
        specialFeatures: ['Regular Savings', 'Flexible Amount', 'Auto Debit'],
        specialFeaturesHi: ['नियमित बचत', 'लचीला राशि', 'ऑटो डेबिट'],
        lastUpdated: new Date().toISOString()
      }
    ];

    // Log for analytics
    console.log('Rates API accessed:', {
      locale,
      count: rates.length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        rates,
        summary: {
          totalRates: rates.length,
          categories: Array.from(new Set(rates.map(r => r.category))),
          minRate: Math.min(...rates.map(r => r.effectiveRate)),
          maxRate: Math.max(...rates.map(r => r.effectiveRate)),
          lastUpdated: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Rates API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching interest rates'
      },
      { status: 500 }
    );
  }
}
