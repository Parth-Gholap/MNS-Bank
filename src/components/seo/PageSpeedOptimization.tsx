import Head from 'next/head';

interface PageSpeedOptimizationProps {
  locale: string;
}

const PageSpeedOptimization: React.FC<PageSpeedOptimizationProps> = ({ locale }) => {
  return (
    <Head>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Resource hints */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Critical CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Critical CSS for above-the-fold content */
          body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; }
          .bg-gray-50 { background-color: #f9fafb; }
          .text-center { text-align: center; }
          .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .max-w-6xl { max-width: 72rem; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .font-bold { font-weight: 700; }
          .text-gray-900 { color: #111827; }
          .mb-4 { margin-bottom: 1rem; }
          .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .text-gray-600 { color: #4b5563; }
          @media (min-width: 640px) {
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          }
          @media (min-width: 1024px) {
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
          }
        `
      }} />
      
      {/* Meta tags for performance */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Open Graph tags for social sharing */}
      <meta property="og:title" content={locale === 'hi' ? 'महानगर नागरिक सहकारी बैंक' : 'Mahanagar Nagrik Sahakari Bank'} />
      <meta property="og:description" content={locale === 'hi' ? 'भोपाल की अग्रणी सहकारी बैंक' : 'Leading cooperative bank in Bhopal'} />
      <meta property="og:image" content="/images/og-image.jpg" />
      <meta property="og:url" content={`https://mnsbankbhopal.com/${locale}`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale === 'hi' ? 'hi_IN' : 'en_US'} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={locale === 'hi' ? 'महानगर नागरिक सहकारी बैंक' : 'Mahanagar Nagrik Sahakari Bank'} />
      <meta name="twitter:description" content={locale === 'hi' ? 'भोपाल की अग्रणी सहकारी बैंक' : 'Leading cooperative bank in Bhopal'} />
      <meta name="twitter:image" content="/images/twitter-card.jpg" />
      
      {/* Security headers */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com www.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com; img-src 'self' data: https:; font-src fonts.gstatic.com; connect-src 'self' www.google-analytics.com;" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Performance optimization */}
      <link rel="canonical" href={`https://mnsbankbhopal.com/${locale}`} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
    </Head>
  );
};

export default PageSpeedOptimization;
