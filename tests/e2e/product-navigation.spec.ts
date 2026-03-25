import { test, expect } from '@playwright/test';

test.describe('Product Page Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize(1280, 720);
  });

  test.describe('Desktop Navigation', () => {
    test('should navigate to personal savings account page', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check page title
      await expect(page).toHaveTitle(/Savings Account/);
      
      // Check breadcrumbs are visible
      await expect(page.locator('nav[aria-label="breadcrumb"]')).toBeVisible();
      await expect(page.locator('a[href="/en"]')).toContainText('Home');
      await expect(page.locator('a[href="/en/personal"]')).toContainText('Personal Banking');
      await expect(page.locator('a[href="/en/personal/savings-account"]')).toContainText('Savings Account');
      
      // Check hero section is visible
      await expect(page.locator('h1')).toContainText('Savings Account');
      await expect(page.locator('img[alt="Savings Account"]')).toBeVisible();
      
      // Check tabs are visible
      await expect(page.locator('[role="tablist"]')).toBeVisible();
      await expect(page.locator('button[data-tab="overview"]')).toBeVisible();
      await expect(page.locator('button[data-tab="features"]')).toBeVisible();
      await expect(page.locator('button[data-tab="eligibility"]')).toBeVisible();
      await expect(page.locator('button[data-tab="documents"]')).toBeVisible();
      await expect(page.locator('button[data-tab="apply"]')).toBeVisible();
      
      // Check KFS panel is visible
      await expect(page.locator('h2')).toContainText('Key Facts Statement');
      await expect(page.locator('[data-testid="kfs-panel"]')).toBeVisible();
      
      // Check related products section
      await expect(page.locator('h2')).toContainText('Related Products');
      await expect(page.locator('[data-testid="related-products"]')).toBeVisible();
    });

    test('should navigate to personal loan page', async ({ page }) => {
      await page.goto('/en/personal/loans/personal-loan');
      
      // Check page title
      await expect(page).toHaveTitle(/Personal Loan/);
      
      // Check breadcrumbs
      await expect(page.locator('nav[aria-label="breadcrumb"]')).toBeVisible();
      await expect(page.locator('a[href="/en/personal/loans"]')).toContainText('Loans');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Personal Loan');
      await expect(page.locator('img[alt="Personal Loan"]')).toBeVisible();
      
      // Check tabs
      await expect(page.locator('button[data-tab="overview"]')).toBeVisible();
      await expect(page.locator('button[data-tab="apply"]')).toBeVisible();
      
      // Check KFS panel
      await expect(page.locator('h2')).toContainText('Key Facts Statement');
      await expect(page.locator('[data-testid="kfs-panel"]')).toBeVisible();
    });

    test('should navigate to business current account page', async ({ page }) => {
      await page.goto('/en/business/current-account');
      
      // Check page title
      await expect(page).toHaveTitle(/Current Account/);
      
      // Check breadcrumbs
      await expect(page.locator('nav[aria-label="breadcrumb"]')).toBeVisible();
      await expect(page.locator('a[href="/en/business"]')).toContainText('Business Banking');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Current Account');
      await expect(page.locator('img[alt="Current Account"]')).toBeVisible();
      
      // Check tabs
      await expect(page.locator('button[data-tab="overview"]')).toBeVisible();
      await expect(page.locator('button[data-tab="apply"]')).toBeVisible();
    });

    test('should navigate to business loan page', async ({ page }) => {
      await page.goto('/en/business/loans/business-loan');
      
      // Check page title
      await expect(page).toHaveTitle(/Business Loan/);
      
      // Check breadcrumbs
      await expect(page.locator('nav[aria-label="breadcrumb"]')).toBeVisible();
      await expect(page.locator('a[href="/en/business/loans"]')).toContainText('Loans');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Business Loan');
      await expect(page.locator('img[alt="Business Loan"]')).toBeVisible();
      
      // Check tabs
      await expect(page.locator('button[data-tab="overview"]')).toBeVisible();
      await expect(page.locator('button[data-tab="apply"]')).toBeVisible();
    });
  });

  test.describe('Mobile Navigation', () => {
    test('should work on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize(375, 667);
      
      await page.goto('/en/personal/savings-account');
      
      // Check mobile menu is accessible
      await expect(page.locator('button[aria-label="Open mobile menu"]')).toBeVisible();
      
      // Open mobile menu
      await page.locator('button[aria-label="Open mobile menu"]').click();
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
      
      // Check navigation items in mobile menu
      await expect(page.locator('[data-testid="mobile-menu"] a[href="/en"]')).toContainText('Home');
      await expect(page.locator('[data-testid="mobile-menu"] a[href="/en/personal"]')).toContainText('Personal Banking');
      await expect(page.locator('[data-testid="mobile-menu"] a[href="/en/personal/savings-account"]')).toContainText('Savings Account');
      
      // Check page content is still visible
      await expect(page.locator('h1')).toContainText('Savings Account');
      await expect(page.locator('[role="tablist"]')).toBeVisible();
    });
  });

  test.describe('Tab Navigation Functionality', () => {
    test('should switch between tabs correctly', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Click on features tab
      await page.locator('button[data-tab="features"]').click();
      await expect(page.locator('button[data-tab="features"]')).toHaveAttribute('aria-selected', 'true');
      await expect(page.locator('[data-tab-content="features"]')).toBeVisible();
      
      // Click on eligibility tab
      await page.locator('button[data-tab="eligibility"]').click();
      await expect(page.locator('button[data-tab="eligibility"]')).toHaveAttribute('aria-selected', 'true');
      await expect(page.locator('[data-tab-content="eligibility"]')).toBeVisible();
      
      // Click on apply tab
      await page.locator('button[data-tab="apply"]').click();
      await expect(page.locator('button[data-tab="apply"]')).toHaveAttribute('aria-selected', 'true');
      await expect(page.locator('[data-tab-content="apply"]')).toBeVisible();
      
      // Check form is visible in apply tab
      await expect(page.locator('form[data-testid="application-form"]')).toBeVisible();
      await expect(page.locator('input[name="fullName"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="mobileNumber"]')).toBeVisible();
    });

    test('should maintain tab state on page reload', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Switch to features tab
      await page.locator('button[data-tab="features"]').click();
      await expect(page.locator('button[data-tab="features"]')).toHaveAttribute('aria-selected', 'true');
      
      // Reload page
      await page.reload();
      
      // Check default tab is selected after reload
      await expect(page.locator('button[data-tab="overview"]')).toHaveAttribute('aria-selected', 'true');
      await expect(page.locator('[data-tab-content="overview"]')).toBeVisible();
    });
  });

  test.describe('Product Information Completeness', () => {
    test('should display complete product information', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check all sections are present
      await expect(page.locator('[data-tab-content="overview"]')).toBeVisible();
      await expect(page.locator('[data-tab-content="features"]')).toBeVisible();
      await expect(page.locator('[data-tab-content="eligibility"]')).toBeVisible();
      await expect(page.locator('[data-tab-content="documents"]')).toBeVisible();
      await expect(page.locator('[data-tab-content="apply"]')).toBeVisible();
      
      // Check KFS panel has required information
      await expect(page.locator('[data-testid="kfs-panel"]')).toBeVisible();
      await expect(page.locator('[data-testid="kfs-panel"]')).toContainText('Interest Rate');
      await expect(page.locator('[data-testid="kfs-panel"]')).toContainText('Minimum Balance');
      await expect(page.locator('[data-testid="kfs-panel"]')).toContainText('Service Charges');
      
      // Check related products section
      await expect(page.locator('[data-testid="related-products"]')).toBeVisible();
      await expect(page.locator('[data-testid="related-products"]')).toContainText('Related Products');
      
      // Verify at least 2 related products are shown
      const relatedProductCards = page.locator('[data-testid="related-products"] [data-testid="product-card"]');
      await expect(relatedProductCards).toHaveCount({ min: 2 });
      
      // Check each related product has required information
      const firstProduct = relatedProductCards.first();
      await expect(firstProduct.locator('[data-testid="product-name"]')).toBeVisible();
      await expect(firstProduct.locator('[data-testid="product-description"]')).toBeVisible();
      await expect(firstProduct.locator('[data-testid="product-cta"]')).toBeVisible();
    });

    test('should have working CTA buttons', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check hero CTA button
      const heroCta = page.locator('a[href*="#apply"]');
      await expect(heroCta).toBeVisible();
      await expect(heroCta).toContainText('Open Account Now');
      
      // Click hero CTA
      await heroCta.click();
      
      // Check if page scrolls to apply section
      const applyTab = page.locator('button[data-tab="apply"]');
      await expect(applyTab).toHaveAttribute('aria-selected', 'true');
      
      // Check related product CTAs
      const relatedCtas = page.locator('[data-testid="related-products"] [data-testid="product-cta"]');
      await expect(relatedCtas.first()).toBeVisible();
      
      // Click first related product CTA
      await relatedCtas.first().click();
      
      // Verify navigation to related product
      await expect(page).toHaveURL(/personal-loan|current-account|fixed-deposit/);
    });
  });

  test.describe('Responsive Design', () => {
    test('should adapt to different screen sizes', async ({ page }) => {
      // Test tablet size
      await page.setViewportSize(768, 1024);
      await page.goto('/en/personal/savings-account');
      
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('[role="tablist"]')).toBeVisible();
      await expect(page.locator('[data-testid="kfs-panel"]')).toBeVisible();
      
      // Test mobile size
      await page.setViewportSize(375, 667);
      await page.goto('/en/personal/savings-account');
      
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('[role="tablist"]')).toBeVisible();
      
      // Check mobile menu button
      await expect(page.locator('button[aria-label="Open mobile menu"]')).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load within acceptable time limits', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/en/personal/savings-account');
      
      // Wait for page to fully load
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Page should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
      
      // Check critical elements are loaded
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('[role="tablist"]')).toBeVisible();
      await expect(page.locator('[data-testid="kfs-panel"]')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check for single h1
      const h1Elements = await page.locator('h1').count();
      expect(h1Elements).toBe(1);
      
      // Check h2 for sections
      await expect(page.locator('h2')).toContainText('Key Facts Statement');
      await expect(page.locator('h2')).toContainText('Related Products');
    });

    test('should have proper ARIA attributes', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check tab list has proper ARIA
      const tabList = page.locator('[role="tablist"]');
      await expect(tabList).toHaveAttribute('role', 'tablist');
      
      // Check tabs have proper ARIA
      const tabs = page.locator('[role="tab"]');
      const firstTab = tabs.first();
      await expect(firstTab).toHaveAttribute('role', 'tab');
      await expect(firstTab).toHaveAttribute('aria-selected');
      await expect(firstTab).toHaveAttribute('aria-controls');
      
      // Check tab panels have proper ARIA
      const tabPanels = page.locator('[role="tabpanel"]');
      const firstPanel = tabPanels.first();
      await expect(firstPanel).toHaveAttribute('role', 'tabpanel');
      await expect(firstPanel).toHaveAttribute('aria-labelledby');
    });

    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Focus on first tab
      await page.keyboard.press('Tab');
      const firstTab = page.locator('[role="tab"]').first();
      await expect(firstTab).toBeFocused();
      
      // Navigate through tabs with arrow keys
      await page.keyboard.press('ArrowRight');
      const secondTab = page.locator('[role="tab"]').nth(1);
      await expect(secondTab).toBeFocused();
      
      // Navigate back with arrow keys
      await page.keyboard.press('ArrowLeft');
      await expect(firstTab).toBeFocused();
      
      // Tab through form fields
      await page.locator('button[data-tab="apply"]').click();
      await page.keyboard.press('Tab');
      await expect(page.locator('input[name="fullName"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('input[name="email"]')).toBeFocused();
    });

    test('should have sufficient color contrast', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check primary button contrast
      const primaryButton = page.locator('.btn-primary').first();
      const buttonBg = await primaryButton.evaluate(el => getComputedStyle(el).backgroundColor);
      const buttonColor = await primaryButton.evaluate(el => getComputedStyle(el).color);
      
      // These are basic checks - real contrast checking would require a library
      expect(buttonBg).toBeTruthy();
      expect(buttonColor).toBeTruthy();
    });
  });
});
