# API Contracts: Banking Website

**Phase 1 Contracts** | **Date**: 2026-03-23 | **Status**: Complete

## Public API Endpoints

### Products API

```typescript
// GET /api/products
interface ProductsResponse {
  products: ProductBase[];
  total: number;
  page: number;
  limit: number;
}

// GET /api/products/[slug]
interface ProductResponse {
  product: ProductBase;
  relatedProducts: ProductBase[];
}

interface ProductQuery {
  category?: ProductCategory;
  type?: ProductType;
  language?: 'en' | 'hi';
  featured?: boolean;
  page?: number;
  limit?: number;
}
```

### Rates & Charges API

```typescript
// GET /api/rates
interface RatesResponse {
  rates: InterestRate[];
  lastUpdated: Date;
  effectiveFrom: Date;
}

// GET /api/charges
interface ChargesResponse {
  charges: ServiceCharge[];
  categories: ChargeCategory[];
  lastUpdated: Date;
}
```

### Compliance API

```typescript
// GET /api/deaf
interface DEAFResponse {
  records: DEAFRecord[];
  total: number;
  lastUpdated: Date;
  searchQuery?: string;
}

interface DEAFQuery {
  search?: string;
  limit?: number;
  offset?: number;
}

// GET /api/grievance-officers
interface GrievanceOfficersResponse {
  officers: GrievanceOfficer[];
  escalationMatrix: EscalationLevel[];
}

// GET /api/policies
interface PoliciesResponse {
  policies: PolicyDocument[];
  categories: PolicyCategory[];
}
```

### Content API

```typescript
// GET /api/news
interface NewsResponse {
  articles: NewsArticle[];
  total: number;
  featured: NewsArticle[];
}

// GET /api/carousel
interface CarouselResponse {
  slides: CarouselSlide[];
  active: CarouselSlide[];
}
```

### Forms API

```typescript
// POST /api/inquiries
interface InquirySubmissionRequest {
  productType?: string;
  productName?: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  preferredBranch: string;
  message?: string;
  recaptchaToken: string;
}

interface InquirySubmissionResponse {
  success: boolean;
  referenceNumber: string;
  message: string;
  estimatedResponseTime: string;
}

// GET /api/inquiries/[referenceNumber]
interface InquiryStatusResponse {
  inquiry: InquirySubmission;
  status: InquiryStatus;
  timeline: InquiryTimeline[];
}
```

## Internal API Endpoints

### CMS Integration

```typescript
// Strapi CMS API endpoints
interface CMSEndpoints {
  products: '/api/products';
  rates: '/api/interest-rates';
  charges: '/api/service-charges';
  deaf: '/api/deaf-records';
  policies: '/api/policy-documents';
  news: '/api/news-articles';
  carousel: '/api/carousel-slides';
  branches: '/api/branches';
  grievanceOfficers: '/api/grievance-officers';
}
```

### Analytics Events

```typescript
interface AnalyticsEvent {
  event: string;
  parameters: Record<string, any>;
  timestamp: Date;
  userId?: string;
  sessionId: string;
}

interface AnalyticsEvents {
  pageview: {
    page: string;
    title: string;
    language: string;
  };
  form_submit: {
    formType: string;
    productCategory?: string;
    referenceNumber?: string;
  };
  cta_click: {
    ctaType: string;
    destination: string;
    productCategory?: string;
  };
  calculator_use: {
    calculatorType: string;
    loanAmount: number;
    tenure: number;
    rate: number;
  };
  language_toggle: {
    fromLanguage: string;
    toLanguage: string;
    page: string;
  };
}
```

## Error Responses

```typescript
interface APIError {
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: Date;
    requestId: string;
  };
}

interface ErrorCodes {
  VALIDATION_ERROR: 'VALIDATION_ERROR';
  NOT_FOUND: 'NOT_FOUND';
  UNAUTHORIZED: 'UNAUTHORIZED';
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED';
  SERVER_ERROR: 'SERVER_ERROR';
  CMS_ERROR: 'CMS_ERROR';
  RECAPTCHA_FAILED: 'RECAPTCHA_FAILED';
}
```

## Rate Limiting

```typescript
interface RateLimitConfig {
  inquiries: {
    window: '15m';
    max: 5;
    perIp: true;
  };
  search: {
    window: '1m';
    max: 30;
    perIp: true;
  };
  content: {
    window: '1m';
    max: 100;
    perIp: true;
  };
}
```

## Webhook Contracts

### Form Submission Webhooks

```typescript
interface InquiryWebhook {
  event: 'inquiry.submitted';
  data: InquirySubmission;
  timestamp: Date;
  signature: string;
}

interface WebhookConfig {
  url: string;
  secret: string;
  events: string[];
  active: boolean;
}
```

## Security Headers

```typescript
interface SecurityHeaders {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains';
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' www.google.com www.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' www.google-analytics.com";
  'X-Frame-Options': 'DENY';
  'X-Content-Type-Options': 'nosniff';
  'Referrer-Policy': 'strict-origin-when-cross-origin';
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()';
}
```

## Cache Headers

```typescript
interface CacheConfig {
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable';
    'ETag': 'auto-generated';
  };
  dynamic: {
    'Cache-Control': 'public, max-age=300, must-revalidate';
    'Vary': 'Accept-Language, Cookie';
  };
  personal: {
    'Cache-Control': 'no-cache, no-store, must-revalidate';
    'Pragma': 'no-cache';
    'Expires': '0';
  };
}
```

## Request/Response Examples

### Product Listing Request

```typescript
// Request
GET /api/products?category=personal-loan&language=en&page=1&limit=10

// Response
{
  "products": [
    {
      "id": "gold-loan",
      "name": "Gold Loan",
      "nameHi": "गोल्ड लोन",
      "slug": "gold-loan",
      "category": "personal-loan",
      "type": "gold-loan",
      "description": "Quick gold loan against gold ornaments...",
      "descriptionHi": "गोल्ड आभूषणों के विरुद्ध त्वरित गोल्ड लोन...",
      "features": [...],
      "eligibility": [...],
      "documents": [...],
      "kfs": {
        "indicativeRate": 9.5,
        "processingFee": 1.0,
        "repaymentTenure": "12-36 months",
        "monthlyEmi": 0,
        "totalCostOfCredit": 0,
        "prepaymentCharges": "2% of outstanding",
        "disclaimer": "Rates are indicative..."
      },
      "relatedProducts": ["personal-loan", "loan-against-property"],
      "seo": {...},
      "lastUpdated": "2026-03-23T10:30:00Z"
    }
  ],
  "total": 12,
  "page": 1,
  "limit": 10
}
```

### Inquiry Submission Request

```typescript
// Request
POST /api/inquiries
{
  "productType": "personal-loan",
  "productName": "gold-loan",
  "fullName": "Ramesh Kumar",
  "mobileNumber": "9876543210",
  "email": "ramesh.kumar@email.com",
  "preferredBranch": "bairagarhi-ho",
  "message": "I need a gold loan of ₹5,00,000 against my gold ornaments.",
  "recaptchaToken": "03AGdBq25..."
}

// Response
{
  "success": true,
  "referenceNumber": "MNS2026032300001",
  "message": "Your inquiry has been submitted successfully. Our representative will contact you within 24 hours.",
  "estimatedResponseTime": "24 hours"
}
```

---
**API Contracts Status**: ✅ Complete - All endpoints and schemas defined
**Ready for Implementation**: Backend API development and frontend integration
