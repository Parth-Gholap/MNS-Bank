'use client';

import Head from 'next/head';
import { generateLocalBusinessStructuredData, generateFinancialServiceStructuredData, generateBreadcrumbStructuredData, generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/structured-data';

interface StructuredDataProps {
  type: 'localBusiness' | 'financialService' | 'breadcrumb' | 'website' | 'organization';
  data: any;
  locale: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data, locale }) => {
  let structuredData: any = {};

  switch (type) {
    case 'localBusiness':
      structuredData = generateLocalBusinessStructuredData(data, locale);
      break;
    case 'financialService':
      structuredData = generateFinancialServiceStructuredData(data, locale);
      break;
    case 'breadcrumb':
      structuredData = generateBreadcrumbStructuredData(data, locale);
      break;
    case 'website':
      structuredData = generateWebsiteStructuredData(locale);
      break;
    case 'organization':
      structuredData = generateOrganizationStructuredData(locale);
      break;
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </Head>
  );
};

export default StructuredData;
