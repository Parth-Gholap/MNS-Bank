import { NextRequest, NextResponse } from 'next/server';

interface TrustBadge {
  id: string;
  type: 'regulatory' | 'certification' | 'security' | 'membership';
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  link: string;
  linkText: string;
  linkTextHi: string;
  verified: boolean;
  issueDate?: string;
  expiryDate?: string;
  category: string;
  categoryHi: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    // Mock trust badges data
    const trustBadges: TrustBadge[] = [
      {
        id: '1',
        type: 'regulatory',
        name: 'RBI Regulated',
        nameHi: 'आरबीआई विनियमित',
        description: 'Regulated by Reserve Bank of India ensuring complete compliance with banking regulations',
        descriptionHi: 'भारतीय रिजर्व बैंक द्वारा बैंकिंग नियमों के अनुपालन पूर्ण अनुपालन सुनिश्चित',
        icon: 'shield-check',
        link: 'https://rbi.org.in',
        linkText: 'View Certificate',
        linkTextHi: 'प्रमाणपत्र देखें',
        verified: true,
        category: 'Regulatory',
        categoryHi: 'विनियामक'
      },
      {
        id: '2',
        type: 'certification',
        name: 'ISO 27001 Certified',
        nameHi: 'ISO 27001 प्रमाणपत्र',
        description: 'Internationally recognized information security management system certification',
        descriptionHi: 'अंतर्राष्ट्रिय रूप से मान्यता सूचना जानकारी सुरक्षा प्रबंधन प्रणाली',
        icon: 'certificate',
        link: '/certifications/iso-27001',
        linkText: 'View Details',
        linkTextHi: 'विवरण देखें',
        verified: true,
        issueDate: '2023-06-15',
        expiryDate: '2026-06-14',
        category: 'Security',
        categoryHi: 'सुरक्षा'
      },
      {
        id: '3',
        type: 'security',
        name: 'PCI DSS Compliant',
        nameHi: 'PCI DSS अनुपालन',
        description: 'Payment Card Industry Data Security Standard compliance for secure payment processing',
        descriptionHi: 'सुरक्ष भुगतान प्रसंस्करण के लिए भुगतान उद्योग मानक',
        icon: 'lock-closed',
        link: '/security/pci-dss',
        linkText: 'Security Details',
        linkTextHi: 'सुरक्षा विवरण',
        verified: true,
        category: 'Security',
        categoryHi: 'सुरक्षा'
      },
      {
        id: '4',
        type: 'membership',
        name: 'DICGC Member',
        nameHi: 'DICGC सदस्य',
        description: 'Deposit Insurance and Credit Guarantee Corporation member protecting customer deposits',
        descriptionHi: 'जमा बीमा और क्रेडिट गारंटी निगम का सदस्य ग्राहक ग्राहकों की रक्षा में ग्राहक ग्राहक',
        icon: 'building',
        link: 'https://dicgc.org.in',
        linkText: 'Verify Membership',
        linkTextHi: 'सदस्यता सत्यापित करें',
        verified: true,
        category: 'Insurance',
        categoryHi: 'बीमा'
      },
      {
        id: '5',
        type: 'certification',
        name: 'NPCI Certified',
        nameHi: 'एनपीसीआई प्रमाणपत्र',
        description: 'National Payments Corporation of India certified for secure digital payments',
        descriptionHi: 'राष्ट्रीय भुगतान निगम (एनपीसीआई) द्वारा सुरक्षा डिजिटल भुगतानों के लिए प्रमाणपत्र',
        icon: 'check-circle',
        link: '/certifications/npci',
        linkText: 'View Certificate',
        linkTextHi: 'प्रमाणपत्र देखें',
        verified: true,
        category: 'Payments',
        categoryHi: 'भुगतान'
      },
      {
        id: '6',
        type: 'certification',
        name: 'RuPay Enabled',
        nameHi: 'रूपे सक्षम',
        description: 'Unified Payments Interface for seamless digital transactions across all banks',
        descriptionHi: 'सभी बैंकों में निर्बाध रूप से डिजिटल लेनदेन के लिए एकीकृत भुगतान इंटरफेस',
        icon: 'smartphone',
        link: '/payments/rupay',
        linkText: 'Learn More',
        linkTextHi: 'और जानें',
        verified: true,
        category: 'Payments',
        categoryHi: 'भुगतान'
      }
    ];

    // Log for analytics
    console.log('Trust Badges API accessed:', {
      locale,
      badgeCount: trustBadges.length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        badges: trustBadges,
        summary: {
          totalBadges: trustBadges.length,
          verifiedBadges: trustBadges.filter(badge => badge.verified).length,
          categories: Array.from(new Set(trustBadges.map(badge => badge.category))),
          locale,
          lastUpdated: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Trust Badges API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching trust badges'
      },
      { status: 500 }
    );
  }
}
