import { Organization, LocalBusiness, FinancialService, WebSite, BreadcrumbList, ListItem } from 'schema-dts';

export interface BankStructuredData {
  name: string;
  description: string;
  url: string;
  logo: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  openingHours: string[];
  priceRange: string;
  sameAs: string[];
}

export interface BranchStructuredData {
  name: string;
  description: string;
  url: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  openingHours: string[];
  geo: {
    latitude: number;
    longitude: number;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const generateOrganizationStructuredData = (data: BankStructuredData) => ({
  '@type': 'Organization',
  name: data.name,
  description: data.description,
  url: data.url,
  logo: data.logo,
  address: {
    '@type': 'PostalAddress',
    streetAddress: data.address.streetAddress,
    addressLocality: data.address.addressLocality,
    addressRegion: data.address.addressRegion,
    postalCode: data.address.postalCode,
    addressCountry: data.address.addressCountry,
  },
  telephone: data.telephone,
  email: data.email,
  sameAs: data.sameAs,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: data.telephone,
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
});

export const generateLocalBusinessStructuredData = (data: BranchStructuredData) => ({
  '@type': 'LocalBusiness',
  name: data.name,
  description: data.description,
  url: data.url,
  address: {
    '@type': 'PostalAddress',
    streetAddress: data.address.streetAddress,
    addressLocality: data.address.addressLocality,
    addressRegion: data.address.addressRegion,
    postalCode: data.address.postalCode,
    addressCountry: data.address.addressCountry,
  },
  telephone: data.telephone,
  email: data.email,
  openingHours: data.openingHours,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: data.geo.latitude,
    longitude: data.geo.longitude,
  },
});

export const generateFinancialServiceStructuredData = (name: string, description: string, provider: string) => ({
  '@type': 'FinancialService',
  name: name,
  description: description,
  provider: {
    '@type': 'Organization',
    name: provider,
  },
});

export const generateWebsiteStructuredData = (name: string, url: string, description: string) => ({
  '@type': 'WebSite',
  name: name,
  url: url,
  description: description,
});

export const generateBreadcrumbStructuredData = (items: BreadcrumbItem[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const bankStructuredData: BankStructuredData = {
  name: 'Mahanagar Nagrik Sahakari Bank Ltd.',
  description: 'Mahanagar Nagrik Sahakari Bank Ltd. Bhopal offers comprehensive banking services, loans, deposits, and digital banking solutions.',
  url: 'https://mnsbankbhopal.com',
  logo: 'https://mnsbankbhopal.com/logo.png',
  address: {
    streetAddress: 'M.P. Nagar, Bhopal',
    addressLocality: 'Bhopal',
    addressRegion: 'Madhya Pradesh',
    postalCode: '462011',
    addressCountry: 'IN',
  },
  telephone: '+91-755-2471133',
  email: 'info@mnsbankbhopal.com',
  openingHours: [
    'Mo-Fr 10:00-16:30',
    'Sa 10:00-16:30',
    'Su Closed',
  ],
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/mnsbankbhopal',
    'https://www.twitter.com/mnsbankbhopal',
    'https://www.linkedin.com/company/mnsbankbhopal',
  ],
};

export const branchStructuredData: BranchStructuredData = {
  name: 'Mahanagar Nagrik Sahakari Bank - Main Branch',
  description: 'Main branch of Mahanagar Nagrik Sahakari Bank in Bhopal offering all banking services.',
  url: 'https://mnsbankbhopal.com/locate-us/branch-locator',
  address: {
    streetAddress: 'M.P. Nagar, Bhopal',
    addressLocality: 'Bhopal',
    addressRegion: 'Madhya Pradesh',
    postalCode: '462011',
    addressCountry: 'IN',
  },
  telephone: '+91-755-2471133',
  email: 'main@mnsbankbhopal.com',
  openingHours: [
    'Mo-Fr 10:00-16:30',
    'Sa 10:00-16:30',
    'Su Closed',
  ],
  geo: {
    latitude: 23.2599,
    longitude: 77.4126,
  },
};
