import { test, expect } from '@playwright/test';

// E2E Tests for Navigation Flow
test.describe('Navigation Flow Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Desktop Navigation', () => {
    test('should display main navigation menu', async ({ page }) => {
      // Check if main navigation is visible
      const mainNav = page.locator('nav[aria-label="Main navigation"]');
      await expect(mainNav).toBeVisible();
      
      // Check if Personal Banking link is visible
      const personalBanking = page.locator('a[href*="/personal"]');
      await expect(personalBanking).toBeVisible();
      
      // Check if Business Banking link is visible
      const businessBanking = page.locator('a[href*="/business"]');
      await expect(businessBanking).toBeVisible();
      
      // Check if About Us link is visible
      const aboutUs = page.locator('a[href*="/about-us"]');
      await expect(aboutUs).toBeVisible();
      
      // Check if Compliance link is visible
      const compliance = page.locator('a[href*="/compliance"]');
      await expect(compliance).toBeVisible();
      
      // Check if Contact link is visible
      const contact = page.locator('a[href*="/contact"]');
      await expect(contact).toBeVisible();
    });

    test('should show dropdown menus on hover', async ({ page }) => {
      // Hover over Personal Banking
      const personalBanking = page.locator('a[href*="/personal"]');
      await personalBanking.hover();
      
      // Check if dropdown appears
      const personalDropdown = page.locator('[data-testid="personal-dropdown"]');
      await expect(personalDropdown).toBeVisible();
      
      // Check if dropdown contains expected items
      const accountsLink = page.locator('[data-testid="personal-dropdown"] a[href*="/accounts"]');
      const depositsLink = page.locator('[data-testid="personal-dropdown"] a[href*="/deposits"]');
      const loansLink = page.locator('[data-testid="personal-dropdown"] a[href*="/loans"]');
      const servicesLink = page.locator('[data-testid="personal-dropdown"] a[href*="/services"]');
      
      await expect(accountsLink).toBeVisible();
      await expect(depositsLink).toBeVisible();
      await expect(loansLink).toBeVisible();
      await expect(servicesLink).toBeVisible();
      
      // Test Business Banking dropdown
      const businessBanking = page.locator('a[href*="/business"]');
      await businessBanking.hover();
      
      const businessDropdown = page.locator('[data-testid="business-dropdown"]');
      await expect(businessDropdown).toBeVisible();
      
      // Check if business dropdown contains expected items
      const businessAccountsLink = page.locator('[data-testid="business-dropdown"] a[href*="/accounts"]');
      const businessDepositsLink = page.locator('[data-testid="business-dropdown"] a[href*="/deposits"]');
      const businessLoansLink = page.locator('[data-testid="business-dropdown"] a[href*="/loans"]');
      const businessServicesLink = page.locator('[data-testid="business-dropdown"] a[href*="/services"]');
      
      await expect(businessAccountsLink).toBeVisible();
      await expect(businessDepositsLink).toBeVisible();
      await expect(businessLoansLink).toBeVisible();
      await expect(businessServicesLink).toBeVisible();
    });

    test('should navigate to compliance pages', async ({ page }) => {
      // Click Compliance link
      const complianceLink = page.locator('a[href*="/compliance"]');
      await complianceLink.click();
      
      // Wait for navigation to complete
      await page.waitForURL('**/compliance');
      
      // Check if DEAF link is visible and clickable
      const deafLink = page.locator('a[href*="/deaf-unclaimed-deposits"]');
      await expect(deafLink).toBeVisible();
      await expect(deafLink).toBeEnabled();
      
      // Check if Grievance Redressal link is visible and clickable
      const grievanceLink = page.locator('a[href*="/grievance-redressal"]');
      await expect(grievanceLink).toBeVisible();
      await expect(grievanceLink).toBeEnabled();
      
      // Check if Policy Centre link is visible and clickable
      const policyCentreLink = page.locator('a[href*="/policy-centre"]');
      await expect(policyCentreLink).toBeVisible();
      await expect(policyCentreLink).toBeEnabled();
      
      // Check if Privacy Policy link is visible and clickable
      const privacyPolicyLink = page.locator('a[href*="/privacy-policy"]');
      await expect(privacyPolicyLink).toBeVisible();
      await expect(privacyPolicyLink).toBeEnabled();
    });

    test('should navigate through compliance pages', async ({ page }) => {
      // Navigate to DEAF page
      await page.goto('/compliance/deaf-unclaimed-deposits');
      await page.waitForLoadState('networkidle');
      
      // Check if DEAF page loads correctly
      await expect(page.locator('h1')).toContainText('DEAF');
      await expect(page.locator('[data-testid="deaf-search"]')).toBeVisible();
      await expect(page.locator('[data-testid="deaf-table"]')).toBeVisible();
      
      // Navigate to Grievance Redressal page
      await page.goto('/compliance/grievance-redressal');
      await page.waitForLoadState('networkidle');
      
      // Check if Grievance page loads correctly
      await expect(page.locator('h1')).toContainText('Grievance Redressal');
      await expect(page.locator('[data-testid="grievance-form"]')).toBeVisible();
      await expect(page.locator('[data-testid="escalation-matrix"]')).toBeVisible();
      
      // Navigate to Policy Centre page
      await page.goto('/compliance/policy-centre');
      await page.waitForLoadState('networkidle');
      
      // Check if Policy Centre page loads correctly
      await expect(page.locator('h1')).toContainText('Policy Centre');
      await expect(page.locator('[data-testid="policy-categories"]')).toBeVisible();
      await expect(page.locator('[data-testid="policy-grid"]')).toBeVisible();
      
      // Navigate to Privacy Policy page
      await page.goto('/compliance/privacy-policy');
      await page.waitForLoadState('networkidle');
      
      // Check if Privacy Policy page loads correctly
      await expect(page.locator('h1')).toContainText('Privacy Policy');
      await expect(page.locator('[data-testid="privacy-content"]')).toBeVisible();
    });
  });

  test.describe('Mobile Navigation', () => {
    test('should display mobile menu button on small screens', async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check if mobile menu button is visible
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      await expect(mobileMenuButton).toBeVisible();
      
      // Check if desktop navigation is hidden
      const desktopNav = page.locator('nav[aria-label="Main navigation"]');
      await expect(desktopNav).not.toBeVisible();
    });

    test('should open mobile menu when clicked', async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Click mobile menu button
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      await mobileMenuButton.click();
      
      // Check if mobile menu drawer opens
      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      await expect(mobileMenu).toBeVisible();
      
      // Check if menu contains navigation items
      const personalBanking = page.locator('[data-testid="mobile-menu"] a[href*="/personal"]');
      const businessBanking = page.locator('[data-testid="mobile-menu"] a[href*="/business"]');
      const aboutUs = page.locator('[data-testid="mobile-menu"] a[href*="/about-us"]');
      const compliance = page.locator('[data-testid="mobile-menu"] a[href*="/compliance"]');
      const contact = page.locator('[data-testid="mobile-menu"] a[href*="/contact"]');
      
      await expect(personalBanking).toBeVisible();
      await expect(businessBanking).toBeVisible();
      await expect(aboutUs).toBeVisible();
      await expect(compliance).toBeVisible();
      await expect(contact).toBeVisible();
    });

    test('should close mobile menu when close button is clicked', async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Open mobile menu
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      await mobileMenuButton.click();
      await page.waitForSelector('[data-testid="mobile-menu"]');
      
      // Click close button
      const closeButton = page.locator('[data-testid="mobile-menu-close"]');
      await closeButton.click();
      
      // Check if mobile menu closes
      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      await expect(mobileMenu).not.toBeVisible();
    });
  });

  test.describe('Language Toggle', () => {
    test('should display language toggle button', async ({ page }) => {
      // Check if language toggle is visible
      const languageToggle = page.locator('[data-testid="language-toggle"]');
      await expect(languageToggle).toBeVisible();
      
      // Check if current language is displayed
      const currentLanguage = page.locator('[data-testid="current-language"]');
      await expect(currentLanguage).toBeVisible();
    });

    test('should switch language when clicked', async ({ page }) => {
      // Get current language
      const languageToggle = page.locator('[data-testid="language-toggle"]');
      const currentLanguage = await languageToggle.locator('[data-testid="current-language"]').textContent();
      
      // Click language toggle
      await languageToggle.click();
      
      // Wait for language to change
      await page.waitForTimeout(1000);
      
      // Check if language has changed
      const newLanguage = await languageToggle.locator('[data-testid="current-language"]').textContent();
      await expect(newLanguage).not.toBe(currentLanguage);
      
      // Check if URL has been updated with new locale
      const url = page.url();
      if (currentLanguage?.includes('English')) {
        await expect(url).toContain('/hi/');
      } else {
        await expect(url).toContain('/en/');
      }
    });
  });

  test.describe('Accessibility Features', () => {
    test('should display accessibility toolbar', async ({ page }) => {
      // Check if accessibility toolbar is visible
      const accessibilityToolbar = page.locator('[data-testid="accessibility-toolbar"]');
      await expect(accessibilityToolbar).toBeVisible();
      
      // Check if accessibility controls are present
      const increaseText = page.locator('[data-testid="increase-text"]');
      const decreaseText = page.locator('[data-testid="decrease-text"]');
      const highContrast = page.locator('[data-testid="high-contrast"]');
      const resetAccessibility = page.locator('[data-testid="reset-accessibility"]');
      
      await expect(increaseText).toBeVisible();
      await expect(decreaseText).toBeVisible();
      await expect(highContrast).toBeVisible();
      await expect(resetAccessibility).toBeVisible();
    });

    test('should adjust text size when controls are clicked', async ({ page }) => {
      // Get initial text size
      const body = page.locator('body');
      const initialFontSize = await body.evaluate((el) => 
        window.getComputedStyle(el).fontSize
      );
      
      // Click increase text button
      const increaseText = page.locator('[data-testid="increase-text"]');
      await increaseText.click();
      
      // Check if text size increased
      const increasedFontSize = await body.evaluate((el) => 
        window.getComputedStyle(el).fontSize
      );
      await expect(increasedFontSize).not.toBe(initialFontSize);
      
      // Click decrease text button
      const decreaseText = page.locator('[data-testid="decrease-text"]');
      await decreaseText.click();
      
      // Check if text size decreased
      const decreasedFontSize = await body.evaluate((el) => 
        window.getComputedStyle(el).fontSize
      );
      await expect(decreasedFontSize).not.toBe(increasedFontSize);
    });

    test('should toggle high contrast mode', async ({ page }) => {
      // Click high contrast button
      const highContrast = page.locator('[data-testid="high-contrast"]');
      await highContrast.click();
      
      // Check if high contrast class is applied
      const body = page.locator('body');
      const hasHighContrast = await body.evaluate((el) => 
        el.classList.contains('high-contrast')
      );
      await expect(hasHighContrast).toBe(true);
      
      // Click again to remove high contrast
      await highContrast.click();
      
      const hasNoHighContrast = await body.evaluate((el) => 
        !el.classList.contains('high-contrast')
      );
      await expect(hasNoHighContrast).toBe(true);
    });
  });

  test.describe('Footer Navigation', () => {
    test('should display footer with all required sections', async ({ page }) => {
      // Scroll to bottom to ensure footer is in view
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Check if footer is visible
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      
      // Check if footer contains About Us section
      const aboutUsSection = footer.locator('[data-testid="footer-about-us"]');
      await expect(aboutUsSection).toBeVisible();
      
      // Check if footer contains Personal Banking section
      const personalSection = footer.locator('[data-testid="footer-personal"]');
      await expect(personalSection).toBeVisible();
      
      // Check if footer contains Business Banking section
      const businessSection = footer.locator('[data-testid="footer-business"]');
      await expect(businessSection).toBeVisible();
      
      // Check if footer contains Compliance section
      const complianceSection = footer.locator('[data-testid="footer-compliance"]');
      await expect(complianceSection).toBeVisible();
      
      // Check if footer contains Contact section
      const contactSection = footer.locator('[data-testid="footer-contact"]');
      await expect(contactSection).toBeVisible();
      
      // Check if footer contains trust indicators
      const trustIndicators = footer.locator('[data-testid="trust-indicators"]');
      await expect(trustIndicators).toBeVisible();
    });

    test('should navigate to footer links', async ({ page }) => {
      // Scroll to bottom to ensure footer is in view
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Click on DEAF link in footer
      const deafLink = page.locator('[data-testid="footer-compliance"] a[href*="/deaf-unclaimed-deposits"]');
      await deafLink.click();
      
      // Check if navigation to DEAF page works
      await page.waitForURL('**/deaf-unclaimed-deposits');
      await expect(page.locator('h1')).toContainText('DEAF');
      
      // Go back and test other footer links
      await page.goBack();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Click on Grievance link in footer
      const grievanceLink = page.locator('[data-testid="footer-compliance"] a[href*="/grievance-redressal"]');
      await grievanceLink.click();
      
      // Check if navigation to Grievance page works
      await page.waitForURL('**/grievance-redressal');
      await expect(page.locator('h1')).toContainText('Grievance Redressal');
    });
  });

  test.describe('Net Banking Button', () => {
    test('should display net banking button', async ({ page }) => {
      // Check if net banking button is visible
      const netBankingButton = page.locator('[data-testid="net-banking-button"]');
      await expect(netBankingButton).toBeVisible();
      
      // Check if button has correct text
      await expect(netBankingButton).toContainText('Net Banking');
    });

    test('should open net banking portal when clicked', async ({ page }) => {
      const netBankingButton = page.locator('[data-testid="net-banking-button"]');
      
      // Click net banking button
      await netBankingButton.click();
      
      // Check if new tab opens with net banking URL
      const newPage = await page.waitForEvent('popup');
      await expect(newPage.url()).toContain('netbanking.mnsbankbhopal.com');
    });
  });

  test.describe('Responsive Design', () => {
    test('should adapt layout for different screen sizes', async ({ page }) => {
      // Test desktop layout
      await page.setViewportSize({ width: 1920, height: 1080 });
      const desktopNav = page.locator('nav[aria-label="Main navigation"]');
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      
      await expect(desktopNav).toBeVisible();
      await expect(mobileMenuButton).not.toBeVisible();
      
      // Test tablet layout
      await page.setViewportSize({ width: 768, height: 1024 });
      const tabletNav = page.locator('nav[aria-label="Main navigation"]');
      const tabletMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      
      await expect(tabletNav).toBeVisible();
      await expect(tabletMenuButton).not.toBeVisible();
      
      // Test mobile layout
      await page.setViewportSize({ width: 375, height: 667 });
      const mobileNav = page.locator('nav[aria-label="Main navigation"]');
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      
      await expect(mobileNav).not.toBeVisible();
      await expect(mobileMenuButton).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load pages within acceptable time limits', async ({ page }) => {
      const startTime = Date.now();
      
      // Navigate to various pages and measure load time
      const pages = [
        '/',
        '/compliance/deaf-unclaimed-deposits',
        '/compliance/grievance-redressal',
        '/compliance/policy-centre',
        '/compliance/privacy-policy'
      ];
      
      for (const pageUrl of pages) {
        const pageStartTime = Date.now();
        await page.goto(pageUrl);
        await page.waitForLoadState('networkidle');
        const pageLoadTime = Date.now() - pageStartTime;
        
        // Assert page loads within 3 seconds (3000ms)
        expect(pageLoadTime).toBeLessThan(3000);
      }
      
      const totalTime = Date.now() - startTime;
      
      // Assert overall test completes within reasonable time
      expect(totalTime).toBeLessThan(10000); // 10 seconds for all pages
    });
  });
});
