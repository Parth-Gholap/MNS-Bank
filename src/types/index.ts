// Core Types for Mahanagar Bank Website

export interface ProductBase {
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

export interface KeyFactsStatement {
  indicativeRate: number;
  processingFee: number;
  repaymentTenure: string;
  monthlyEmi: number;
  totalCostOfCredit: number;
  prepaymentCharges: string;
  disclaimer: string;
}

export interface ProductFeature {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon?: string;
  highlighted: boolean;
}

export interface EligibilityCriteria {
  id: string;
  criterion: string;
  criterionHi: string;
  required: boolean;
  description?: string;
  descriptionHi?: string;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  nameHi: string;
  required: boolean;
  description?: string;
  descriptionHi?: string;
  downloadUrl?: string;
}

export interface InterestRate {
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

export interface ServiceCharge {
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

export interface DEAFRecord {
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

export interface GrievanceOfficer {
  level: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  address: string;
  resolutionTat: string;
}

export interface PolicyDocument {
  id: string;
  title: string;
  titleHi: string;
  category: PolicyCategory;
  description: string;
  descriptionHi: string;
  downloadUrl: string;
  fileSize?: string;
  tags?: string[];
  important?: boolean;
  effectiveDate: Date;
  lastUpdated: Date;
  version: string;
}

export interface InquirySubmission {
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

export interface Branch {
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

export interface BusinessHours {
  day: string;
  dayHi: string;
  openTime: string;
  closeTime: string;
  closed: boolean;
}

export interface NewsArticle {
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

export interface CarouselSlide {
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

export interface SEOData {
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

export interface StructuredData {
  type: 'WebPage' | 'Product' | 'FinancialService' | 'LocalBusiness';
  data: Record<string, any>;
}

// Enums
export enum ProductCategory {
  SAVINGS = 'savings',
  CURRENT = 'current',
  DEPOSIT = 'deposit',
  PERSONAL_LOAN = 'personal-loan',
  BUSINESS_LOAN = 'business-loan',
  DIGITAL_SERVICE = 'digital-service'
}

export enum ProductType {
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

export enum RateType {
  FIXED = 'fixed',
  FLOATING = 'floating',
  DIMINISHING = 'diminishing'
}

export enum ChargeCategory {
  ACCOUNT_CHARGES = 'account-charges',
  LOAN_CHARGES = 'loan-charges',
  DIGITAL_CHARGES = 'digital-charges',
  OTHER_CHARGES = 'other-charges'
}

export enum ChargeType {
  PROCESSING_FEE = 'processing-fee',
  ANNUAL_CHARGE = 'annual-charge',
  TRANSACTION_CHARGE = 'transaction-charge',
  PENAL_CHARGE = 'penal-charge',
  SERVICE_CHARGE = 'service-charge'
}

export enum AmountType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  PER_1000 = 'per-1000'
}

export enum PolicyCategory {
  FAIR_PRACTICES = 'fair-practices',
  KYC_CKYC = 'kyc-ckyc',
  PENAL_CHARGES = 'penal-charges',
  CITIZENS_CHARTER = 'citizens-charter',
  KFS_TEMPLATES = 'kfs-templates',
  PRIVACY_POLICY = 'privacy-policy',
  GRIEVANCE_POLICY = 'grievance-policy'
}

export enum BranchType {
  HEAD_OFFICE = 'head-office',
  BRANCH = 'branch',
  ATM = 'atm'
}

export enum InquiryStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

export enum NewsCategory {
  ANNOUNCEMENT = 'announcement',
  RATE_CHANGE = 'rate-change',
  NEW_PRODUCT = 'new-product',
  HOLIDAY_NOTICE = 'holiday-notice',
  GENERAL = 'general'
}

// Form Types
export interface InquiryFormData {
  productType?: string;
  productName?: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  preferredBranch: string;
  message?: string;
  recaptchaToken: string;
}

export interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  message?: string;
  recaptchaToken?: string;
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  message?: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  requestId: string;
}

// Component Props
export interface LanguageToggleProps {
  currentLocale: 'en' | 'hi';
  onToggle: (locale: 'en' | 'hi') => void;
}

export interface NavigationProps {
  currentPath: string;
  locale: 'en' | 'hi';
}

export interface BreadcrumbItem {
  label: string;
  labelHi: string;
  href: string;
}

export interface TrustBadge {
  name: string;
  icon: string;
  url: string;
  alt: string;
}

export interface AccessibilityToolbarProps {
  onIncreaseText: () => void;
  onDecreaseText: () => void;
  onHighContrast: () => void;
  onReset: () => void;
}

// Calculator Types
export interface EMICalculatorInputs {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  tenureType: 'years' | 'months';
}

export interface EMICalculatorResults {
  monthlyEmi: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  year: number;
  principal: number;
  interest: number;
  totalPayment: number;
  balance: number;
}
