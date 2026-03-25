import { test, expect } from '@playwright/test';

test.describe('Digital Services Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to digital services hub
    await page.goto('/digital-services');
  });

  test('should display digital services hub', async ({ page }) => {
    // Check if hub page loads correctly
    await expect(page.locator('h1')).toContainText('Digital Services');
    
    // Check if service categories are displayed
    await expect(page.locator('[data-testid="service-categories"]')).toBeVisible();
    
    // Check if featured services section exists
    await expect(page.locator('[data-testid="featured-services"]')).toBeVisible();
    
    // Check if all services section exists
    await expect(page.locator('[data-testid="all-services"]')).toBeVisible();
  });

  test('should filter services by category', async ({ page }) => {
    // Click on payments category
    await page.click('[data-testid="category-payments"]');
    
    // Wait for filtering to apply
    await page.waitForTimeout(1000);
    
    // Check if only payment services are shown
    const paymentServices = page.locator('[data-testid="service-card"][data-category="payments"]');
    await expect(paymentServices).toHaveCount.greaterThan(0);
  });

  test('should navigate to individual service pages', async ({ page }) => {
    // Click on UPI/QR service
    await page.click('[data-testid="service-upi-qr"]');
    
    // Check if navigation works
    await expect(page.url()).toContain('/digital-services/upi-qr');
    
    // Check if service page loads
    await expect(page.locator('h1')).toContainText('UPI & QR Services');
  });

  test('should display service cards with proper information', async ({ page }) => {
    // Check first service card
    const firstCard = page.locator('[data-testid="service-card"]').first();
    
    // Check if card has title
    await expect(firstCard.locator('[data-testid="service-title"]')).toBeVisible();
    
    // Check if card has description
    await expect(firstCard.locator('[data-testid="service-description"]')).toBeVisible();
    
    // Check if card has download/guide buttons
    await expect(firstCard.locator('[data-testid="download-button"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="guide-button"]')).toBeVisible();
  });

  test('should handle featured services differently', async ({ page }) => {
    // Check featured service cards
    const featuredCards = page.locator('[data-testid="service-card"].featured');
    
    // Check if featured cards have special styling
    await expect(featuredCards).toHaveClass(/featured/);
    
    // Check if featured badge is present
    await expect(featuredCards.first().locator('[data-testid="featured-badge"]')).toBeVisible();
  });
});

test.describe('UPI/QR Services Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/digital-services/upi-qr');
  });

  test('should display UPI apps correctly', async ({ page }) => {
    // Check if page loads
    await expect(page.locator('h1')).toContainText('UPI & QR Services');
    
    // Check if UPI apps are displayed
    const upiApps = page.locator('[data-testid="upi-app"]');
    await expect(upiApps).toHaveCount.greaterThan(0);
    
    // Check first app details
    const firstApp = upiApps.first();
    await expect(firstApp.locator('[data-testid="app-name"]')).toBeVisible();
    await expect(firstApp.locator('[data-testid="app-description"]')).toBeVisible();
    await expect(firstApp.locator('[data-testid="app-features"]')).toBeVisible();
  });

  test('should handle app downloads', async ({ page }) => {
    // Click download button for first app
    const firstApp = page.locator('[data-testid="upi-app"]').first();
    await firstApp.locator('[data-testid="download-button"]').click();
    
    // Check if download verification appears
    await expect(page.locator('[data-testid="download-verification"]')).toBeVisible();
  });

  test('should display app guides', async ({ page }) => {
    // Click guide button for first app
    const firstApp = page.locator('[data-testid="upi-app"]').first();
    await firstApp.locator('[data-testid="guide-button"]').click();
    
    // Check if guide modal appears
    await expect(page.locator('[data-testid="guide-modal"]')).toBeVisible();
  });
});

test.describe('BBPS Bill Payments Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/digital-services/bbps');
  });

  test('should display bill categories', async ({ page }) => {
    // Check if page loads
    await expect(page.locator('h1')).toContainText('BBPS Bill Payments');
    
    // Check if bill categories are displayed
    const categories = page.locator('[data-testid="bill-category"]');
    await expect(categories).toHaveCount.greaterThan(0);
    
    // Check first category details
    const firstCategory = categories.first();
    await expect(firstCategory.locator('[data-testid="category-name"]')).toBeVisible();
    await expect(firstCategory.locator('[data-testid="category-services"]')).toBeVisible();
  });

  test('should handle bill payment flow', async ({ page }) => {
    // Click on first category
    const firstCategory = page.locator('[data-testid="bill-category"]').first();
    await firstCategory.locator('[data-testid="pay-bill-button"]').click();
    
    // Check if payment page loads
    await expect(page.url()).toContain('/digital-services/bbps/');
    await expect(page.locator('[data-testid="bill-payment-form"]')).toBeVisible();
  });

  test('should display service availability', async ({ page }) => {
    // Check if service availability is shown
    const services = page.locator('[data-testid="service-availability"]');
    await expect(services).toHaveCount.greaterThan(0);
    
    // Check if available/unavailable status is shown
    const firstService = services.first();
    await expect(firstService.locator('[data-testid="availability-status"]')).toBeVisible();
  });
});

test.describe('Mobile Banking Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/digital-services/mobile-banking');
  });

  test('should display mobile banking apps', async ({ page }) => {
    // Check if page loads
    await expect(page.locator('h1')).toContainText('Mobile Banking');
    
    // Check if mobile apps are displayed
    const apps = page.locator('[data-testid="mobile-app"]');
    await expect(apps).toHaveCount.greaterThan(0);
    
    // Check app details
    const firstApp = apps.first();
    await expect(firstApp.locator('[data-testid="app-name"]')).toBeVisible();
    await expect(firstApp.locator('[data-testid="app-features"]')).toBeVisible();
    await expect(firstApp.locator('[data-testid="app-rating"]')).toBeVisible();
  });

  test('should display mobile banking benefits', async ({ page }) => {
    // Check if benefits section exists
    await expect(page.locator('[data-testid="mobile-banking-benefits"]')).toBeVisible();
    
    // Check if benefit cards are displayed
    const benefits = page.locator('[data-testid="benefit-card"]');
    await expect(benefits).toHaveCount.greaterThan(0);
    
    // Check benefit details
    const firstBenefit = benefits.first();
    await expect(firstBenefit.locator('[data-testid="benefit-icon"]')).toBeVisible();
    await expect(firstBenefit.locator('[data-testid="benefit-title"]')).toBeVisible();
    await expect(firstBenefit.locator('[data-testid="benefit-description"]')).toBeVisible();
  });
});

test.describe('Download Verification', () => {
  test('should verify download links', async ({ page }) => {
    await page.goto('/digital-services/upi-qr');
    
    // Click download for first app
    const firstApp = page.locator('[data-testid="upi-app"]').first();
    await firstApp.locator('[data-testid="download-button"]').click();
    
    // Check if verification component appears
    await expect(page.locator('[data-testid="download-verification"]')).toBeVisible();
    
    // Check if file information is displayed
    await expect(page.locator('[data-testid="file-info"]')).toBeVisible();
    await expect(page.locator('[data-testid="checksum"]')).toBeVisible();
  });

  test('should handle download progress', async ({ page }) => {
    await page.goto('/digital-services/upi-qr');
    
    // Start download
    const firstApp = page.locator('[data-testid="upi-app"]').first();
    await firstApp.locator('[data-testid="download-button"]').click();
    
    // Click download button in verification
    await page.click('[data-testid="download-start-button"]');
    
    // Check if progress bar appears
    await expect(page.locator('[data-testid="download-progress"]')).toBeVisible();
  });

  test('should verify file integrity', async ({ page }) => {
    await page.goto('/digital-services/upi-qr');
    
    // Start download
    const firstApp = page.locator('[data-testid="upi-app"]').first();
    await firstApp.locator('[data-testid="download-button"]').click();
    
    // Click verify button
    await page.click('[data-testid="verify-button"]');
    
    // Check if verification status appears
    await expect(page.locator('[data-testid="verification-status"]')).toBeVisible();
  });
});

test.describe('How-to Guide Component', () => {
  test('should display step-by-step guides', async ({ page }) => {
    await page.goto('/digital-services/upi-qr');
    
    // Open guide for first app
    const firstApp = page.locator('[data-testid="upi-app"]').first();
    await firstApp.locator('[data-testid="guide-button"]').click();
    
    // Check if guide modal appears
    await expect(page.locator('[data-testid="guide-modal"]')).toBeVisible();
    
    // Check if steps are displayed
    const steps = page.locator('[data-testid="guide-step"]');
    await expect(steps).toHaveCount.greaterThan(0);
  });

  test('should navigate through guide steps', async ({ page }) => {
    await page.goto('/digital-services/upi-qr');
    
    // Open guide
    const firstApp = page.locator('[data-testid="upi-app"]').first();
    await firstApp.locator('[data-testid="guide-button"]').click();
    
    // Check if navigation buttons work
    await expect(page.locator('[data-testid="prev-step-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="next-step-button"]')).toBeVisible();
    
    // Navigate to next step
    await page.click('[data-testid="next-step-button"]');
    
    // Check if step indicator updates
    await expect(page.locator('[data-testid="step-indicator"]')).toContainText('2');
  });

  test('should complete guide successfully', async ({ page }) => {
    await page.goto('/digital-services/upi-qr');
    
    // Open guide
    const firstApp = page.locator('[data-testid="upi-app"]').first();
    await firstApp.locator('[data-testid="guide-button"]').click();
    
    // Navigate through all steps
    const nextButton = page.locator('[data-testid="next-step-button"]');
    
    // Click next until disabled
    while (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(500);
    }
    
    // Check if completion message appears
    await expect(page.locator('[data-testid="guide-complete"]')).toBeVisible();
  });
});

test.describe('Service Completeness', () => {
  test('should have all required service pages', async ({ page }) => {
    const services = [
      '/digital-services/upi-qr',
      '/digital-services/bbps',
      '/digital-services/mobile-banking',
      '/digital-services/atm',
      '/digital-services/cards',
      '/digital-services/imps',
      '/digital-services/sms',
      '/digital-services/pan',
      '/digital-services/locker',
      '/digital-services/neft-rtgs',
      '/digital-services/pm-schemes'
    ];

    for (const service of services) {
      await page.goto(service);
      
      // Check if page loads without errors
      await expect(page.locator('h1')).toBeVisible();
      
      // Check if page has proper content
      await expect(page.locator('[data-testid="service-content"]')).toBeVisible();
    }
  });

  test('should have proper service descriptions', async ({ page }) => {
    const services = [
      '/digital-services/upi-qr',
      '/digital-services/bbps',
      '/digital-services/mobile-banking'
    ];

    for (const service of services) {
      await page.goto(service);
      
      // Check if service has description
      await expect(page.locator('[data-testid="service-description"]')).toBeVisible();
      
      // Check if service has features
      await expect(page.locator('[data-testid="service-features"]')).toBeVisible();
    }
  });

  test('should have download and guide options', async ({ page }) => {
    const services = [
      '/digital-services/upi-qr',
      '/digital-services/bbps',
      '/digital-services/mobile-banking'
    ];

    for (const service of services) {
      await page.goto(service);
      
      // Check if download option exists
      await expect(page.locator('[data-testid="download-option"]')).toBeVisible();
      
      // Check if guide option exists
      await expect(page.locator('[data-testid="guide-option"]')).toBeVisible();
    }
  });
});

test.describe('Accessibility', () => {
  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/digital-services');
    
    // Tab through service cards
    await page.keyboard.press('Tab');
    
    // Check if first service card is focused
    await expect(page.locator('[data-testid="service-card"]:first-child')).toBeFocused();
    
    // Navigate with keyboard
    await page.keyboard.press('Enter');
    
    // Check if navigation works
    await expect(page.url()).toContain('/digital-services/');
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/digital-services');
    
    // Check if service cards have proper ARIA labels
    const serviceCards = page.locator('[data-testid="service-card"]');
    const firstCard = serviceCards.first();
    
    await expect(firstCard).toHaveAttribute('role', 'article');
    await expect(firstCard).toHaveAttribute('aria-label');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/digital-services');
    
    // Check if main heading is h1
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    
    // Check if section headings are h2 or h3
    const sectionHeadings = page.locator('h2, h3');
    await expect(sectionHeadings).toHaveCount.greaterThan(0);
  });
});

test.describe('Performance', () => {
  test('should load pages quickly', async ({ page }) => {
    const services = [
      '/digital-services',
      '/digital-services/upi-qr',
      '/digital-services/bbps',
      '/digital-services/mobile-banking'
    ];

    for (const service of services) {
      const startTime = Date.now();
      
      await page.goto(service);
      await page.waitForSelector('[data-testid="service-content"]');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // 3 seconds max
    }
  });

  test('should handle rapid navigation', async ({ page }) => {
    // Navigate rapidly between services
    const services = [
      '/digital-services/upi-qr',
      '/digital-services/bbps',
      '/digital-services/mobile-banking'
    ];

    for (let i = 0; i < 3; i++) {
      for (const service of services) {
        await page.goto(service);
        await page.waitForTimeout(100);
      }
    }
    
    // Check if last page loads correctly
    await expect(page.locator('[data-testid="service-content"]')).toBeVisible();
  });
});
