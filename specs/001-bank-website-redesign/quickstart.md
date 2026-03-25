# Quickstart Guide: Banking Website Redesign

**Phase 1 Quickstart** | **Date**: 2026-03-23 | **Status**: Complete

## Prerequisites

### Development Environment
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: Latest version
- **VS Code**: Recommended with extensions listed below

### Required Accounts
- **Google Cloud**: For reCAPTCHA and Analytics
- **Strapi Cloud** (or self-hosted): For CMS
- **Vercel**: For deployment (optional)

## Project Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd mnsbankbhopal.com
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env.local` file:
```env
# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Google Services
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-measurement-id

# CMS Configuration
STRAPI_API_TOKEN=your-strapi-api-token

# Security
NEXT_PUBLIC_NET_BANKING_URL=https://netbanking.mnsbankbhopal.com
```

### 4. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to see the application.

## Development Workflow

### 1. Feature Branch Development
```bash
git checkout -b feature/component-name
# Develop your feature
git commit -m "feat: add component-name"
git push origin feature/component-name
```

### 2. Component Development
```bash
# Create new component
mkdir -p src/components/ui
touch src/components/ui/ComponentName.tsx

# Add styles (TailwindCSS)
# Components use utility classes from design system
```

### 3. Content Management
```bash
# Access Strapi CMS at http://localhost:1337/admin
# Use content types defined in data-model.md
# All content must be bilingual (en/hi)
```

## Key Development Patterns

### 1. Component Structure
```typescript
// src/components/product/ProductCard.tsx
import React from 'react';
import { ProductBase } from '@/types/product';

interface ProductCardProps {
  product: ProductBase;
  language: 'en' | 'hi';
  onInquiry?: (product: ProductBase) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onInquiry
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {/* Component implementation */}
    </div>
  );
};
```

### 2. API Integration
```typescript
// src/lib/api/products.ts
import { ProductBase, ProductQuery } from '@/types/product';

export async function getProducts(query?: ProductQuery): Promise<ProductBase[]> {
  const params = new URLSearchParams();
  if (query?.category) params.append('category', query.category);
  if (query?.language) params.append('language', query.language);
  
  const response = await fetch(`/api/products?${params}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  
  return response.json();
}
```

### 3. Form Handling
```typescript
// src/components/forms/InquiryForm.tsx
import { useForm } from 'react-hook-form';
import { InquiryFormData } from '@/types/forms';

export const InquiryForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<InquiryFormData>();
  
  const onSubmit = async (data: InquiryFormData) => {
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      // Handle response
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields with validation */}
    </form>
  );
};
```

## Design System Usage

### 1. Color Palette
```css
/* Primary Colors */
.text-primary-blue-600 { color: #1e40af; }
.bg-primary-blue-600 { background-color: #1e40af; }

/* Secondary Colors */
.text-secondary-gold-600 { color: #d97706; }
.bg-secondary-gold-600 { background-color: #d97706; }

/* Neutral Colors */
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
```

### 2. Typography
```css
/* Headings */
.text-h1 { @apply text-3xl font-bold text-gray-900; }
.text-h2 { @apply text-2xl font-bold text-gray-900; }
.text-h3 { @apply text-xl font-semibold text-gray-900; }

/* Body Text */
.text-body { @apply text-base text-gray-600; }
.text-caption { @apply text-sm text-gray-500; }
```

### 3. Component Classes
```css
/* Cards */
.card { @apply bg-white rounded-lg shadow-md border border-gray-200; }
.card-hover { @apply card hover:shadow-lg transition-shadow; }

/* Buttons */
.btn-primary { @apply bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700; }
.btn-secondary { @apply bg-gray-200 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-300; }

/* Forms */
.input-field { @apply w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500; }
.input-error { @apply input-field border-red-500 focus:ring-red-500 focus:border-red-500; }
```

## Internationalization (i18n)

### 1. Language Toggle
```typescript
// src/components/ui/LanguageToggle.tsx
import { useRouter, usePathname } from 'next/navigation';

export const LanguageToggle: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const toggleLanguage = () => {
    const currentLang = pathname.split('/')[1];
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };
  
  return (
    <button onClick={toggleLanguage}>
      {pathname.split('/')[1] === 'en' ? 'हिंदी' : 'English'}
    </button>
  );
};
```

### 2. Content Translation
```typescript
// src/lib/i18n.ts
export const t = (key: string, language: 'en' | 'hi') => {
  const translations = {
    en: { 'products.savings': 'Savings Account' },
    hi: { 'products.savings': 'बचत खाता' }
  };
  
  return translations[language][key] || key;
};
```

## Testing Guidelines

### 1. Unit Testing
```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage
```

### 2. E2E Testing
```bash
# Run E2E tests
npm run test:e2e

# Run specific test
npx playwright test --grep "Product Page"
```

### 3. Accessibility Testing
```bash
# Run accessibility tests
npm run test:a11y

# Manual testing checklist
npm run test:a11y:manual
```

## Performance Optimization

### 1. Image Optimization
```typescript
// src/components/ui/OptimizedImage.tsx
import Image from 'next/image';

export const OptimizedImage: React.FC<ImageProps> = (props) => {
  return (
    <Image
      {...props}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};
```

### 2. Code Splitting
```typescript
// Dynamic imports for heavy components
const EMICalculator = dynamic(() => import('@/components/calculator/EMICalculator'), {
  loading: () => <div>Loading calculator...</div>,
  ssr: false
});
```

## Deployment

### 1. Build for Production
```bash
# Build application
npm run build

# Start production server
npm run start
```

### 2. Environment Variables for Production
```env
# Production environment
NEXT_PUBLIC_SITE_URL=https://mnsbankbhopal.com
NEXT_PUBLIC_STRAPI_URL=https://cms.mnsbankbhopal.com
NEXT_PUBLIC_NET_BANKING_URL=https://netbanking.mnsbankbhopal.com
```

### 3. Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

## Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript types and environment variables
2. **CMS Connection**: Verify Strapi URL and API tokens
3. **reCAPTCHA**: Ensure domain is configured in Google reCAPTCHA admin
4. **Performance**: Run Lighthouse audit for optimization suggestions

### Debug Commands
```bash
# Check build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## Next Steps

1. **Phase 1 Development**: Set up components and basic pages
2. **CMS Configuration**: Set up Strapi with content types
3. **Design System**: Implement design tokens and components
4. **Testing Setup**: Configure test environments
5. **CI/CD Pipeline**: Set up automated testing and deployment

---
**Quickstart Status**: ✅ Complete - Development environment ready
**Ready for Development**: Component implementation and feature development
