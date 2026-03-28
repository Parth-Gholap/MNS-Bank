import { Metadata } from 'next';

export function generateLocalBusinessStructuredData(branch: any, locale: string) {
  const baseUrl = 'https://mnsbankbhopal.com';
  const isHindi = locale === 'hi';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BankOrCreditUnion',
    name: isHindi ? 'महानगर नागरिक सहकारी बैंक' : 'Mahanagar Nagrik Sahakari Bank',
    description: isHindi 
      ? 'भोपाल, मध्य प्रदेश में स्थित एक अग्रणी सहकारी बैंक'
      : 'A leading cooperative bank based in Bhopal, Madhya Pradesh',
    url: `${baseUrl}/${locale}/locate-us/branch-locator`,
    telephone: branch.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
      postalCode: branch.pincode
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: branch.latitude || '23.2599',
      longitude: branch.longitude || '77.4126'
    },
    openingHours: [
      'Mo-Fr 10:00-16:30',
      'Sa 10:00-13:30'
    ],
    paymentAccepted: [
      'Cash',
      'Credit Card',
      'Debit Card',
      'Bank Transfer'
    ],
    currenciesAccepted: 'INR',
    servicesServed: [
      isHindi ? 'बैंकिंग सेवाएं' : 'Banking Services',
      isHindi ? 'ऋण सेवाएं' : 'Loan Services',
      isHindi ? 'जमा सेवाएं' : 'Deposit Services',
      isHindi ? 'डिजिटल बैंकिंग' : 'Digital Banking'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '128'
    },
    priceRange: '$$',
    image: `${baseUrl}/images/branch-${branch.id}.jpg`,
    hasMap: `${baseUrl}/${locale}/locate-us/branch-locator`,
    sameAs: [
      'https://www.facebook.com/mnsbankbhopal',
      'https://twitter.com/mnsbankbhopal',
      'https://www.linkedin.com/company/mnsbankbhopal'
    ]
  };
}

export function generateFinancialServiceStructuredData(service: any, locale: string) {
  const isHindi = locale === 'hi';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: service.name[locale],
    description: service.description[locale],
    provider: {
      '@type': 'BankOrCreditUnion',
      name: isHindi ? 'महानगर नागरिक सहकारी बैंक' : 'Mahanagar Nagrik Sahakari Bank',
      url: 'https://mnsbankbhopal.com'
    },
    serviceType: service.category,
    areaServed: {
      '@type': 'Place',
      name: isHindi ? 'भोपाल, मध्य प्रदेश' : 'Bhopal, Madhya Pradesh'
    },
    offers: {
      '@type': 'Offer',
      price: service.fees || '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock'
    }
  };
}

export function generateBreadcrumbStructuredData(breadcrumbs: any[], locale: string) {
  const isHindi = locale === 'hi';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name[locale] || crumb.name,
      item: crumb.url
    }))
  };
}

export function generateWebsiteStructuredData(locale: string) {
  const isHindi = locale === 'hi';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isHindi ? 'महानगर नागरिक सहकारी बैंक' : 'Mahanagar Nagrik Sahakari Bank',
    url: `https://mnsbankbhopal.com/${locale}`,
    description: isHindi 
      ? 'भोपाल, मध्य प्रदेश में स्थित एक अग्रणी सहकारी बैंक - सभी बैंकिंग सेवाएं, ऋण, जमा, और डिजिटल बैंकिंग समाधान'
      : 'A leading cooperative bank in Bhopal, Madhya Pradesh - offering all banking services, loans, deposits, and digital banking solutions',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://mnsbankbhopal.com/${locale}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    sameAs: [
      'https://www.facebook.com/mnsbankbhopal',
      'https://twitter.com/mnsbankbhopal',
      'https://www.linkedin.com/company/mnsbankbhopal',
      'https://www.instagram.com/mnsbankbhopal'
    ]
  };
}

export function generateOrganizationStructuredData(locale: string) {
  const isHindi = locale === 'hi';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isHindi ? 'महानगर नागरिक सहकारी बैंक' : 'Mahanagar Nagrik Sahakari Bank',
    alternateName: 'MNS Bank Bhopal',
    url: 'https://mnsbankbhopal.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://mnsbankbhopal.com/images/logo.png',
      width: 200,
      height: 200
    },
    description: isHindi 
      ? 'भोपाल, मध्य प्रदेश में स्थित एक अग्रणी सहकारी बैंक जो वित्तीय समावेशन और बैंकिंग सेवाएं प्रदान करता है'
      : 'A leading cooperative bank in Bhopal, Madhya Pradesh providing financial inclusion and banking services',
    foundingDate: '1985',
    areaServed: {
      '@type': 'Place',
      name: isHindi ? 'भोपाल, मध्य प्रदेश, भारत' : 'Bhopal, Madhya Pradesh, India'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-755-2471133',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['Hindi', 'English']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'M.P. Nagar, Bhopal',
      addressLocality: 'Bhopal',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
      postalCode: '462011'
    },
    sameAs: [
      'https://www.facebook.com/mnsbankbhopal',
      'https://twitter.com/mnsbankbhopal',
      'https://www.linkedin.com/company/mnsbankbhopal',
      'https://www.instagram.com/mnsbankbhopal'
    ]
  };
}
