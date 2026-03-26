'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface CertificationLink {
  id: string;
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
  certificateNumber?: string;
  authority: string;
  authorityHi: string;
}

interface CertificationLinksProps {
  locale: 'en' | 'hi';
  className?: string;
}

const CertificationLinks: React.FC<CertificationLinksProps> = ({ locale, className = '' }) => {
  const { t } = useTranslation(locale);
  const [certifications, setCertifications] = useState<CertificationLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('Certification Links', locale === 'hi' ? 'प्रमाणपत्र लिंक' : 'Certification Links');
    fetchCertifications();
  }, [locale]);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bank-data?type=trust&locale=${locale}&type=certification`);
      const result = await response.json();
      
      if (result.success) {
        setCertifications(result.data.badges.filter((badge: any) => badge.type === 'certification'));
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      // Fallback to static certifications
      setCertifications(getStaticCertifications());
    } finally {
      setLoading(false);
    }
  };

  const getStaticCertifications = (): CertificationLink[] => {
    return [
      {
        id: '1',
        name: 'ISO 27001:2013',
        nameHi: 'ISO 27001:2013',
        description: 'Information Security Management System certification ensuring data protection and security controls',
        descriptionHi: 'सूचना सुरक्षा प्रबंधन प्रणाली प्रमाणपत्र जो डेटा सुरक्षा और सुरक्षा नियंत्रण सुनिश्चित करती है',
        icon: 'certificate',
        link: '/certifications/iso-27001',
        linkText: 'View Certificate',
        linkTextHi: 'प्रमाणपत्र देखें',
        verified: true,
        issueDate: '2023-06-15',
        expiryDate: '2026-06-14',
        category: 'Security',
        categoryHi: 'सुरक्षा',
        certificateNumber: 'ISMS-2023-001',
        authority: 'SGS',
        authorityHi: 'एसजीएस'
      },
      {
        id: '2',
        name: 'PCI DSS v3.2.1',
        nameHi: 'PCI DSS v3.2.1',
        description: 'Payment Card Industry Data Security Standard compliance for secure card transactions',
        descriptionHi: 'सुरक्ष कार्ड लेनदेन के लिए भुगतान उद्योग मानक अनुपालन',
        icon: 'lock-closed',
        link: '/certifications/pci-dss',
        linkText: 'View Compliance',
        linkTextHi: 'अनुपालन देखें',
        verified: true,
        category: 'Security',
        categoryHi: 'सुरक्षा',
        certificateNumber: 'PCI-DSS-2023-002',
        authority: 'PCI SSC',
        authorityHi: 'PCI एसएससी'
      },
      {
        id: '3',
        name: 'NPCI Certified',
        nameHi: 'एनपीसीआई प्रमाणपत्र',
        description: 'National Payments Corporation of India certification for UPI and digital payment systems',
        descriptionHi: 'यूपीआई और डिजिटल भुगतान प्रणाली के लिए राष्ट्रीय भुगतान निगम प्रमाणपत्र',
        icon: 'check-circle',
        link: '/certifications/npci',
        linkText: 'View Certification',
        linkTextHi: 'प्रमाणपत्र देखें',
        verified: true,
        category: 'Payments',
        categoryHi: 'भुगतान',
        certificateNumber: 'NPCI-2023-003',
        authority: 'NPCI',
        authorityHi: 'एनपीसीआई'
      },
      {
        id: '4',
        name: 'ISO 9001:2015',
        nameHi: 'ISO 9001:2015',
        description: 'Quality Management System certification for consistent service delivery',
        descriptionHi: 'निरंतरित सेवा प्रदान के लिए गुणवत्वा प्रबंधन प्रणाली प्रमाणपत्र',
        icon: 'award',
        link: '/certifications/iso-9001',
        linkText: 'View Certificate',
        linkTextHi: 'प्रमाणपत्र देखें',
        verified: true,
        issueDate: '2022-12-01',
        expiryDate: '2025-12-01',
        category: 'Quality',
        categoryHi: 'गुणवत्वा',
        certificateNumber: 'QMS-2022-001',
        authority: 'TUV SUD',
        authorityHi: 'टीयूवी एसयूडी'
      }
    ];
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      Security: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
      Payments: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
      Quality: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' }
    };
    return colors[category] || colors.Security;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'hi' ? 'en-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-full w-12 mb-4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="flex space-x-2">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {locale === 'hi' ? 'प्रमाणपत्र लिंक' : 'Certification Links'}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {locale === 'hi' 
            ? 'हमारे अंतर्राष्ट्रिय रूप से मान्यता प्रमाणपत्र प्राप्त हैं'
            : 'We maintain internationally recognized certifications for quality and security.'
          }
        </p>
      </div>

      {/* Certification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => {
          const categoryColors = getCategoryColor(cert.category);
          
          return (
            <div
              key={cert.id}
              className="bg-white rounded-lg shadow-card border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
            >
              {/* Certificate Header */}
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${categoryColors.bg} ${categoryColors.text} mr-3`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h12a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 00-2-2v-6a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${categoryColors.text}`}>
                    {locale === 'hi' ? cert.nameHi : cert.name}
                  </h3>
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${categoryColors.bg} ${categoryColors.text}`}>
                    {locale === 'hi' ? cert.categoryHi : cert.category}
                  </span>
                </div>
              </div>

              {/* Certificate Number */}
              {cert.certificateNumber && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    {locale === 'hi' ? 'प्रमाणपत्र संख्या:' : 'Certificate Number:'}
                  </span>
                  <span className="ml-2 text-sm text-gray-900 font-mono">
                    {cert.certificateNumber}
                  </span>
                </div>
              )}

              {/* Authority */}
              {cert.authority && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    {locale === 'hi' ? 'प्राधिकरता:' : 'Issuing Authority:'}
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {locale === 'hi' ? cert.authorityHi : cert.authority}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {locale === 'hi' ? cert.descriptionHi : cert.description}
              </p>

              {/* Validity Period */}
              {(cert.issueDate || cert.expiryDate) && (
                <div className="text-sm text-gray-500 space-y-1 mb-4">
                  {cert.issueDate && (
                    <div>
                      <span className="font-medium">{locale === 'hi' ? 'जारी तिथि:' : 'Issued:'}</span> {formatDate(cert.issueDate)}
                    </div>
                  )}
                  {cert.expiryDate && (
                    <div>
                      <span className="font-medium">{locale === 'hi' ? 'समाप्त तिथि:' : 'Expires:'}</span> {formatDate(cert.expiryDate)}
                    </div>
                  )}
                </div>
              )}

              {/* Verification Status */}
              <div className="flex items-center mb-4">
                {cert.verified ? (
                  <div className="flex items-center text-sm text-green-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{locale === 'hi' ? 'सत्यापित' : 'Verified'}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-yellow-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{locale === 'hi' ? 'समीक्षण' : 'Pending'}</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <a
                href={cert.link}
                className={`btn-primary w-full text-center group-hover:bg-opacity-90 ${
                  cert.link.startsWith('http') ? 'inline-flex items-center justify-center' : ''
                }`}
              >
                {locale === 'hi' ? cert.linkTextHi : cert.linkText}
                {cert.link.startsWith('http') && (
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2V8a2 2 0 002-2H6a2 2 0 00-2-2v-6a2 2 0 002 2z" />
                  </svg>
                )}
              </a>
            </div>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            {locale === 'hi' ? 'प्रमाणपत्र सत्यापन' : 'Certificate Verification'}
          </h3>
          <p className="text-blue-700 mb-4">
            {locale === 'hi' 
              ? 'आप हमारी प्रमाणपत्रों को सत्यापित कर सकते हैं। कृपया प्रमाणपत्र संख्या दर्ज करें।'
              : 'You can verify our certificates online. Enter the certificate number to verify authenticity.'
            }
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/verify-certificate"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h12a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 00-2-2v-6a2 2 0 002 2z" />
              </svg>
              {locale === 'hi' ? 'प्रमाणपत्र सत्यापित करें' : 'Verify Certificate'}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 001.79 2.79l6.5 6.5a2 2 0 002.79-2.79L12 5.26 8 8z" />
              </svg>
              {locale === 'hi' ? 'सहायता प्राप्त करें' : 'Contact Support'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationLinks;
