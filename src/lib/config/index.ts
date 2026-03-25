// Environment Configuration
export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || '',
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  strapiApiToken: process.env.STRAPI_API_TOKEN || '',
  netBankingUrl: process.env.NEXT_PUBLIC_NET_BANKING_URL || 'https://netbanking.mnsbankbhopal.com',
  isDevelopment: process.env.NODE_ENV === 'development',
  bankName: 'Mahanagar Nagrik Sahakari Bank',
  bankNameHi: 'महानगर नागरिक सहकारी बैंक',
  supportEmail: 'support@mnsbankbhopal.com',
  supportPhone: '1800-123-4567',
  tollFreeNumber: '14448',
  rbiOmbudsmanUrl: 'https://cms.rbi.org.in',
  dicgcUrl: 'https://dicgc.gov.in',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxFormMessageLength: 250,
  paginationLimit: 10,
  cacheTimeout: 15 * 60 * 1000, // 15 minutes
};

// API Endpoints
export const apiEndpoints = {
  products: '/api/products',
  rates: '/api/rates',
  charges: '/api/charges',
  compliance: '/api/compliance',
  inquiries: '/api/inquiries',
  carousel: '/api/carousel',
  news: '/api/news',
  grievance: '/api/grievances',
  branches: '/api/branches',
};

// Constants
export const constants = {
  bankName: 'Mahanagar Nagrik Sahakari Bank',
  bankNameHi: 'महानगर नागरिक सहकारी बैंक',
  supportEmail: 'support@mnsbankbhopal.com',
  supportPhone: '1800-123-4567',
  tollFreeNumber: '14448',
  rbiOmbudsmanUrl: 'https://cms.rbi.org.in',
  dicgcUrl: 'https://dicgc.gov.in',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxFormMessageLength: 250,
  paginationLimit: 10,
  cacheTimeout: 15 * 60 * 1000, // 15 minutes
};

export default config;
