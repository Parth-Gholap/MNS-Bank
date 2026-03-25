# Data Model: Banking Website Redesign

**Phase 1 Design** | **Date**: 2026-03-23 | **Status**: Complete

## Core Entities

### Product Information

```typescript
interface ProductBase {
  id: string;
  name: string;
  nameHi: string;
  slug: string;
  category: ProductCategory;
  type: ProductType;
  description: string;
  descriptionHi: string;
  features: ProductFeature[];
  eligibility: EligibilityCriteria[];
  documents: DocumentRequirement[];
  applyUrl?: string;
  inquiryForm: boolean;
  kfs?: KeyFactsStatement;
  relatedProducts: string[];
  seo: SEOData;
  lastUpdated: Date;
}

interface KeyFactsStatement {
  indicativeRate: number;
  processingFee: number;
  repaymentTenure: string;
  monthlyEmi: number;
  totalCostOfCredit: number;
  prepaymentCharges: string;
  disclaimer: string;
}

interface ProductFeature {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon?: string;
  highlighted: boolean;
}

interface EligibilityCriteria {
  id: string;
  criterion: string;
  criterionHi: string;
  required: boolean;
  description?: string;
  descriptionHi?: string;
}

interface DocumentRequirement {
  id: string;
  name: string;
  nameHi: string;
  required: boolean;
  description?: string;
  descriptionHi?: string;
  downloadUrl?: string;
}
```

### Interest Rates & Charges

```typescript
interface InterestRate {
  id: string;
  productType: ProductCategory;
  productName: string;
  productNameHi: string;
  tenure: string;
  rateType: RateType;
  generalRate: number;
  seniorCitizenRate?: number;
  staffRate?: number;
  effectiveFrom: Date;
  lastUpdated: Date;
}

interface ServiceCharge {
  id: string;
  category: ChargeCategory;
  serviceName: string;
  serviceNameHi: string;
  chargeType: ChargeType;
  amount: number;
  amountType: AmountType;
  description: string;
  descriptionHi: string;
  applicableFrom: Date;
  lastUpdated: Date;
}
```

### Compliance Data

```typescript
interface DEAFRecord {
  id: string;
  customerId: string;
  glCode: string;
  newAccountNumber: string;
  deafAccountNumber: string;
  accountName: string;
  accountNameHi: string;
  address: string;
  addressHi: string;
  state: string;
  district: string;
  transactionDate: Date;
  deafAmount: number;
  lastUpdated: Date;
}

interface GrievanceOfficer {
  level: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  address: string;
  resolutionTat: string;
}

interface PolicyDocument {
  id: string;
  title: string;
  titleHi: string;
  category: PolicyCategory;
  description: string;
  descriptionHi: string;
  downloadUrl: string;
  effectiveDate: Date;
  lastUpdated: Date;
  version: string;
}
```

### User Inquiries

```typescript
interface InquirySubmission {
  id: string;
  referenceNumber: string;
  productType?: ProductCategory;
  productName?: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  preferredBranch: Branch;
  message?: string;
  submissionDate: Date;
  status: InquiryStatus;
  confirmationSent: boolean;
  followUpRequired: boolean;
}

interface Branch {
  id: string;
  name: string;
  nameHi: string;
  type: BranchType;
  address: string;
  addressHi: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  businessHours: BusinessHours[];
  services: string[];
  ifscCode?: string;
  micrCode?: string;
}

interface BusinessHours {
  day: string;
  dayHi: string;
  openTime: string;
  closeTime: string;
  closed: boolean;
}
```

### Content Management

```typescript
interface NewsArticle {
  id: string;
  title: string;
  titleHi: string;
  slug: string;
  excerpt: string;
  excerptHi: string;
  content: string;
  contentHi: string;
  category: NewsCategory;
  publishDate: Date;
  author: string;
  featured: boolean;
  imageUrl?: string;
  tags: string[];
  seo: SEOData;
  lastUpdated: Date;
}

interface CarouselSlide {
  id: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  description: string;
  descriptionHi: string;
  imageUrl: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaTextHi?: string;
  ctaUrl?: string;
  order: number;
  active: boolean;
  startDate?: Date;
  endDate?: Date;
}
```

## Enums and Types

```typescript
enum ProductCategory {
  SAVINGS = 'savings',
  CURRENT = 'current',
  DEPOSIT = 'deposit',
  PERSONAL_LOAN = 'personal-loan',
  BUSINESS_LOAN = 'business-loan',
  DIGITAL_SERVICE = 'digital-service'
}

enum ProductType {
  // Personal Banking
  SAVINGS_ACCOUNT = 'savings-account',
  DOUBLE_DEPOSIT = 'double-deposit',
  TIME_DEPOSIT = 'time-deposit',
  RECURRING_DEPOSIT = 'recurring-deposit',
  GOLD_LOAN = 'gold-loan',
  CAR_LOAN = 'car-loan',
  CONSUMER_LOAN = 'consumer-loan',
  PERSONAL_LOAN = 'personal-loan',
  FESTIVAL_LOAN = 'festival-loan',
  EDUCATION_LOAN = 'education-loan',
  HOME_LOAN = 'home-loan',
  HOUSE_CONSTRUCTION_LOAN = 'house-construction-loan',
  LOAN_AGAINST_FD = 'loan-against-fd',
  LOAN_AGAINST_NSC = 'loan-against-nsc',
  LOAN_AGAINST_PROPERTY = 'loan-against-property',
  MORTGAGE_OVERDRAFT = 'mortgage-overdraft',
  
  // Business Banking
  CURRENT_ACCOUNT = 'current-account',
  BIZ_DOUBLE_DEPOSIT = 'biz-double-deposit',
  BIZ_TIME_DEPOSIT = 'biz-time-deposit',
  BIZ_RECURRING_DEPOSIT = 'biz-recurring-deposit',
  WORKING_CAPITAL_LOAN = 'working-capital-loan',
  TRANSPORT_LOAN = 'transport-loan',
  PROFESSIONAL_LOAN = 'professional-loan',
  MICRO_FINANCE = 'micro-finance',
  SELF_EMPLOYED_LOAN = 'self-employed-loan',
  OVERDRAFT_FACILITY = 'overdraft-facility',
  
  // Digital Services
  NET_BANKING = 'net-banking',
  MOBILE_BANKING = 'mobile-banking',
  ATM_SERVICES = 'atm-services',
  DEBIT_CARDS = 'debit-cards',
  UPI_QR = 'upi-qr',
  IMPS = 'imps',
  BBPS = 'bbps',
  SMS_BANKING = 'sms-banking',
  PAN_SERVICES = 'pan-services',
  LOCKER_SERVICES = 'locker-services',
  NEFT_RTGS = 'neft-rtgs',
  PM_JEEVAN_YOJANA = 'pm-jeevan-yojana',
  PM_SURAKSHA_YOJANA = 'pm-suraksha-yojana'
}

enum RateType {
  FIXED = 'fixed',
  FLOATING = 'floating',
  DIMINISHING = 'diminishing'
}

enum ChargeCategory {
  ACCOUNT_CHARGES = 'account-charges',
  LOAN_CHARGES = 'loan-charges',
  DIGITAL_CHARGES = 'digital-charges',
  OTHER_CHARGES = 'other-charges'
}

enum ChargeType {
  PROCESSING_FEE = 'processing-fee',
  ANNUAL_CHARGE = 'annual-charge',
  TRANSACTION_CHARGE = 'transaction-charge',
  PENAL_CHARGE = 'penal-charge',
  SERVICE_CHARGE = 'service-charge'
}

enum AmountType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  PER_1000 = 'per-1000'
}

enum PolicyCategory {
  FAIR_PRACTICES = 'fair-practices',
  KYC_CKYC = 'kyc-ckyc',
  PENAL_CHARGES = 'penal-charges',
  CITIZENS_CHARTER = 'citizens-charter',
  KFS_TEMPLATES = 'kfs-templates',
  PRIVACY_POLICY = 'privacy-policy',
  GRIEVANCE_POLICY = 'grievance-policy'
}

enum BranchType {
  HEAD_OFFICE = 'head-office',
  BRANCH = 'branch',
  ATM = 'atm'
}

enum InquiryStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

enum NewsCategory {
  ANNOUNCEMENT = 'announcement',
  RATE_CHANGE = 'rate-change',
  NEW_PRODUCT = 'new-product',
  HOLIDAY_NOTICE = 'holiday-notice',
  GENERAL = 'general'
}
```

## Validation Rules

### Form Validations

```typescript
interface FormValidation {
  fullName: {
    required: true;
    minLength: 3;
    maxLength: 100;
    pattern: /^[a-zA-Z\s]+$/;
  };
  mobileNumber: {
    required: true;
    pattern: /^[6-9]\d{9}$/;
    length: 10;
  };
  email: {
    required: false;
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    maxLength: 100;
  };
  message: {
    required: false;
    maxLength: 250;
    minLength: 10;
  };
}
```

### Data Constraints

```typescript
interface DataConstraints {
  // Interest Rates
  minimumRate: 0;
  maximumRate: 25;
  ratePrecision: 2;
  
  // Service Charges
  maximumChargeAmount: 10000;
  chargePrecision: 2;
  
  // DEAF Records
  minimumAmount: 0;
  maximumAmount: 10000000;
  
  // Content
  maxTitleLength: 100;
  maxContentLength: 10000;
  maxExcerptLength: 300;
}
```

## State Management

### Global State Structure

```typescript
interface AppState {
  user: {
    language: 'en' | 'hi';
    preferences: UserPreferences;
  };
  content: {
    products: ProductBase[];
    rates: InterestRate[];
    charges: ServiceCharge[];
    news: NewsArticle[];
    carousel: CarouselSlide[];
  };
  forms: {
    inquiry: InquiryFormData;
    submission: InquirySubmission | null;
    loading: boolean;
    errors: FormErrors;
  };
  ui: {
    menuOpen: boolean;
    searchOpen: boolean;
    accessibility: AccessibilitySettings;
  };
}
```

## API Contracts

### CMS API Endpoints

```typescript
// Products
GET /api/products?category={category}&type={type}&language={lang}
GET /api/products/{slug}
GET /api/products/related/{id}

// Rates & Charges
GET /api/rates?category={category}
GET /api/charges?category={category}

// Compliance
GET /api/deaf?search={query}
GET /api/grievance-officers
GET /api/policies?category={category}

// Content
GET /api/news?limit={limit}&language={lang}
GET /api/carousel?active={boolean}

// Forms
POST /api/inquiries
GET /api/inquiries/{referenceNumber}
```

### Form Submission Schema

```typescript
interface InquiryFormData {
  productType?: string;
  productName?: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  preferredBranch: string;
  message?: string;
  recaptchaToken: string;
}
```

## SEO and Metadata

```typescript
interface SEOData {
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  keywords: string[];
  keywordsHi: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  structuredData?: StructuredData;
}

interface StructuredData {
  type: 'WebPage' | 'Product' | 'FinancialService' | 'LocalBusiness';
  data: Record<string, any>;
}
```

---
**Data Model Status**: ✅ Complete - All entities and relationships defined
**Ready for Implementation**: Component development and API integration
