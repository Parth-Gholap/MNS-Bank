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
      structuredData = generateLocalBusinessStructuredData(data);
      break;
    case 'financialService':
      structuredData = generateFinancialServiceStructuredData(data.name, data.description, data.provider);
      break;
    case 'breadcrumb':
      structuredData = generateBreadcrumbStructuredData(data);
      break;
    case 'website':
      structuredData = generateWebsiteStructuredData(data.name, data.url, data.description);
      break;
    case 'organization':
      structuredData = generateOrganizationStructuredData(data);
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
