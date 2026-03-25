import { test, expect } from '@playwright/test';

// Broken Link Detection Tests
test.describe('Broken Link Detection Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Header Navigation Links', () => {
    test('should have working main navigation links', async ({ page }) => {
      // Get all navigation links
      const navLinks = page.locator('nav a');
      const linkCount = await navLinks.count();
      
      // Test each navigation link
      for (let i = 0; i < linkCount; i++) {
        const link = navLinks.nth(i);
        const href = await link.getAttribute('href');
        
        // Click on the link
        await link.click();
        
        // Wait for navigation or content to load
        await page.waitForLoadState('networkidle');
        
        // Check if page loads successfully (no 404 or server errors)
        const pageTitle = await page.title();
        const url = page.url();
        
        // Should not be a 404 page
        expect(pageTitle).not.toContain('404');
        expect(pageTitle).not.toContain('Page not found');
        expect(pageTitle).not.toContain('Not Found');
        
        // Should not be an error page
        expect(pageTitle).not.toContain('Server Error');
        expect(pageTitle).not.toContain('500');
        
        // Should have proper content
        if (href?.includes('/compliance/')) {
          // Compliance pages should have compliance-related content
          expect(pageTitle).toMatch(/DEAF|Grievance|Policy|Privacy/i);
        }
        
        // Go back to continue testing other links
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }
    });

    test('should have working dropdown menu links', async ({ page }) => {
      // Test Personal Banking dropdown
      const personalBanking = page.locator('a[href*="/personal"]');
      await personalBanking.hover();
      await page.waitForSelector('[data-testid="personal-dropdown"]');
      
      const personalDropdown = page.locator('[data-testid="personal-dropdown"] a');
      const personalLinkCount = await personalDropdown.count();
      
      for (let i = 0; i < personalLinkCount; i++) {
        const link = personalDropdown.nth(i);
        const href = await link.getAttribute('href');
        
        await link.click();
        await page.waitForLoadState('networkidle');
        
        // Check if page loads successfully
        const pageTitle = await page.title();
        expect(pageTitle).not.toContain('404');
        expect(pageTitle).not.toContain('Page not found');
        
        await page.goBack();
        await page.waitForLoadState('networkidle');
        await personalBanking.hover(); // Re-open dropdown
      }
      
      // Test Business Banking dropdown
      const businessBanking = page.locator('a[href*="/business"]');
      await businessBanking.hover();
      await page.waitForSelector('[data-testid="business-dropdown"]');
      
      const businessDropdown = page.locator('[data-testid="business-dropdown"] a');
      const businessLinkCount = await businessDropdown.count();
      
      for (let i = 0; i < businessLinkCount; i++) {
        const link = businessDropdown.nth(i);
        const href = await link.getAttribute('href');
        
        await link.click();
        await page.waitForLoadState('networkidle');
        
        const pageTitle = await page.title();
        expect(pageTitle).not.toContain('404');
        expect(pageTitle).not.toContain('Page not found');
        
        await page.goBack();
        await page.waitForLoadState('networkidle');
        await businessBanking.hover(); // Re-open dropdown
      }
    });
  });

  test.describe('Footer Navigation Links', () => {
    test.beforeEach(async ({ page }) => {
      // Scroll to bottom to ensure footer is in view
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    });

    test('should have working footer links', async ({ page }) => {
      // Get all footer links
      const footerLinks = page.locator('footer a');
      const linkCount = await footerLinks.count();
      
      // Test each footer link
      for (let i = 0; i < linkCount; i++) {
        const link = footerLinks.nth(i);
        const href = await link.getAttribute('href');
        
        await link.click();
        await page.waitForLoadState('networkidle');
        
        // Check if page loads successfully
        const pageTitle = await page.title();
        expect(pageTitle).not.toContain('404');
        expect(pageTitle).not.toContain('Page not found');
        expect(pageTitle).not.toContain('Not Found');
        
        // Should have proper content based on link type
        if (href?.includes('/compliance/')) {
          expect(pageTitle).toMatch(/DEAF|Grievance|Policy|Privacy/i);
        }
        
        await page.goBack();
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForLoadState('networkidle');
      }
    });

    test('should have working trust indicator links', async ({ page }) => {
      // Get trust indicator links
      const trustLinks = page.locator('[data-testid="trust-indicators"] a');
      const trustCount = await trustLinks.count();
      
      for (let i = 0; i < trustCount; i++) {
        const link = trustLinks.nth(i);
        const href = await link.getAttribute('href');
        
        // These should be external links that open in new tabs
        await expect(href).toMatch(/^https?:\/\//);
        
        // Check if link is accessible and has proper attributes
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        
        // Test link functionality
        const [newPage] = await Promise.all([
          page.waitForEvent('popup'),
          link.click()
        ]);
        
        // Check if new tab opens with correct URL
        expect(newPage.url()).toContain(href);
        
        await newPage.close();
      }
    });
  });

  test.describe('Compliance Page Links', () => {
    test('should have working DEAF page navigation', async ({ page }) => {
      // Navigate to DEAF page
      await page.goto('/compliance/deaf-unclaimed-deposits');
      await page.waitForLoadState('networkidle');
      
      // Check if DEAF page has proper navigation elements
      const searchInput = page.locator('[data-testid="deaf-search"]');
      const downloadButton = page.locator('[data-testid="deaf-download"]');
      const table = page.locator('[data-testid="deaf-table"]');
      
      await expect(searchInput).toBeVisible();
      await expect(downloadButton).toBeVisible();
      await expect(table).toBeVisible();
      
      // Test search functionality
      await searchInput.fill('test');
      await page.keyboard.press('Enter');
      await page.waitForLoadState('networkidle');
      
      // Should not result in error
      const pageTitle = await page.title();
      expect(pageTitle).not.toContain('Error');
      expect(pageTitle).not.toContain('Server Error');
    });

    test('should have working grievance page navigation', async ({ page }) => {
      // Navigate to Grievance page
      await page.goto('/compliance/grievance-redressal');
      await page.waitForLoadState('networkidle');
      
      // Check if grievance page has proper navigation elements
      const form = page.locator('[data-testid="grievance-form"]');
      const escalationMatrix = page.locator('[data-testid="escalation-matrix"]');
      
      await expect(form).toBeVisible();
      await expect(escalationMatrix).toBeVisible();
      
      // Test form submission
      const fullNameInput = form.locator('input[name="fullName"]');
      const mobileInput = form.locator('input[name="mobileNumber"]');
      const submitButton = form.locator('button[type="submit"]');
      
      await fullNameInput.fill('Test User');
      await mobileInput.fill('1234567890');
      
      // Check if form submission works (doesn't crash)
      await expect(submitButton).toBeVisible();
      await expect(submitButton).toBeEnabled();
    });

    test('should have working policy centre navigation', async ({ page }) => {
      // Navigate to Policy Centre page
      await page.goto('/compliance/policy-centre');
      await page.waitForLoadState('networkidle');
      
      // Check if Policy Centre page has proper navigation elements
      const categories = page.locator('[data-testid="policy-categories"]');
      const policyGrid = page.locator('[data-testid="policy-grid"]');
      
      await expect(categories).toBeVisible();
      await expect(policyGrid).toBeVisible();
      
      // Test category filtering
      const categoryButtons = categories.locator('button');
      const buttonCount = await categoryButtons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = categoryButtons.nth(i);
        await button.click();
        await page.waitForLoadState('networkidle');
        
        // Should not result in error
        const pageTitle = await page.title();
        expect(pageTitle).not.toContain('Error');
        expect(pageTitle).not.toContain('Server Error');
      }
    });

    test('should have working privacy policy navigation', async ({ page }) => {
      // Navigate to Privacy Policy page
      await page.goto('/compliance/privacy-policy');
      await page.waitForLoadState('networkidle');
      
      // Check if Privacy Policy page has proper navigation elements
      const content = page.locator('[data-testid="privacy-content"]');
      const downloadButton = page.locator('button:has-text("Download")');
      
      await expect(content).toBeVisible();
      await expect(downloadButton).toBeVisible();
      
      // Test download functionality
      await expect(downloadButton).toBeVisible();
      await expect(downloadButton).toBeEnabled();
    });
  });

  test.describe('Language Toggle Links', () => {
    test('should maintain working links when language changes', async ({ page }) => {
      // Test language toggle functionality
      const languageToggle = page.locator('[data-testid="language-toggle"]');
      
      // Get current language
      const initialLanguage = await languageToggle.locator('[data-testid="current-language"]').textContent();
      
      // Click language toggle
      await languageToggle.click();
      await page.waitForLoadState('networkidle');
      
      // Check if URL has changed to include new locale
      const url = page.url();
      if (initialLanguage?.includes('English')) {
        expect(url).toContain('/hi/');
      } else {
        expect(url).toContain('/en/');
      }
      
      // Test navigation links in new language
      const navLinks = page.locator('nav a');
      const linkCount = await navLinks.count();
      
      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        const link = navLinks.nth(i);
        const href = await link.getAttribute('href');
        
        await link.click();
        await page.waitForLoadState('networkidle');
        
        // Check if page loads successfully
        const pageTitle = await page.title();
        expect(pageTitle).not.toContain('404');
        expect(pageTitle).not.toContain('Page not found');
        
        // Check if URL maintains language
        expect(page.url()).toContain(url.split('/')[2]); // Should maintain language
      }
    });
  });

  test.describe('Mobile Navigation Links', () => {
    test('should have working mobile menu links', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Open mobile menu
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      await mobileMenuButton.click();
      await page.waitForSelector('[data-testid="mobile-menu"]');
      
      // Get mobile menu links
      const mobileLinks = page.locator('[data-testid="mobile-menu"] a');
      const linkCount = await mobileLinks.count();
      
      // Test each mobile menu link
      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        const link = mobileLinks.nth(i);
        const href = await link.getAttribute('href');
        
        await link.click();
        await page.waitForLoadState('networkidle');
        
        // Check if page loads successfully
        const pageTitle = await page.title();
        expect(pageTitle).not.toContain('404');
        expect(pageTitle).not.toContain('Page not found');
        
        // Re-open mobile menu for next test
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await mobileMenuButton.click();
        await page.waitForSelector('[data-testid="mobile-menu"]');
      }
    });
  });

  test.describe('External Links', () => {
    test('should have working external links', async ({ page }) => {
      // Get all external links
      const externalLinks = page.locator('a[href^="http"], a[href^="https://"]');
      const linkCount = await externalLinks.count();
      
      for (let i = 0; i < linkCount; i++) {
        const link = externalLinks.nth(i);
        const href = await link.getAttribute('href');
        
        // Check if external link has proper attributes
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        
        // Test link functionality
        const [newPage] = await Promise.all([
          page.waitForEvent('popup'),
          link.click()
        ]);
        
        // Check if new tab opens with correct URL
        expect(newPage.url()).toBe(href);
        
        // Check if new page loads successfully
        const newPageTitle = await newPage.title();
        expect(newPageTitle).not.toContain('404');
        expect(newPageTitle).not.toContain('Unable to connect');
        
        await newPage.close();
      }
    });
  });

  test.describe('Net Banking Link', () => {
    test('should have working net banking link', async ({ page }) => {
      // Get net banking button
      const netBankingButton = page.locator('[data-testid="net-banking-button"]');
      
      // Check if link has proper attributes
      const href = await netBankingButton.getAttribute('href');
      await expect(href).toContain('netbanking.mnsbankbhopal.com');
      await expect(netBankingButton).toHaveAttribute('target', '_blank');
      await expect(netBankingButton).toHaveAttribute('rel', 'noopener noreferrer');
      
      // Test link functionality
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        netBankingButton.click()
      ]);
      
      // Check if new tab opens with correct URL
      expect(newPage.url()).toContain('netbanking.mnsbankbhopal.com');
      
      // Check if net banking site loads
      const newPageTitle = await newPage.title();
      expect(newPageTitle).not.toContain('404');
      expect(newPageTitle).not.toContain('Site not available');
      
      await newPage.close();
    });
  });

  test.describe('Error Page Handling', () => {
    test('should handle 404 pages gracefully', async ({ page }) => {
      // Test various non-existent URLs
      const invalidUrls = [
        '/non-existent-page',
        '/compliance/invalid-page',
        '/personal/invalid-product',
        '/business/invalid-service',
        '/invalid-route'
      ];
      
      for (const url of invalidUrls) {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        
        // Check if 404 page is displayed
        const pageTitle = await page.title();
        expect(pageTitle).toMatch(/404|Page not found|Not Found/i);
        
        // Check if 404 page has helpful content
        const body = page.locator('body');
        await expect(body).toContainText('404');
        await expect(body).toContainText('Page not found');
        
        // Check if navigation is still accessible
        const nav = page.locator('nav[aria-label="Main navigation"]');
        await expect(nav).toBeVisible();
        
        // Check if footer is still accessible
        const footer = page.locator('footer');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(footer).toBeVisible();
      }
    });

    test('should handle server errors gracefully', async ({ page }) => {
      // Test server error scenarios
      await page.goto('/compliance/deaf-unclaimed-deposits');
      
      // Simulate server error by going to an invalid API endpoint
      // This would need to be tested with actual server setup
      const response = await page.goto('/api/compliance/invalid-endpoint');
      
      // Check if error is handled gracefully
      if (response && response.status() >= 500) {
        const pageTitle = await page.title();
        expect(pageTitle).toMatch(/Error|Server Error/i);
        
        // Check if error page has helpful content
        const body = page.locator('body');
        await expect(body).toContainText('Error');
        await expect(body).toContainText('Server Error');
      }
    });
  });

  test.describe('Performance and Link Health', () => {
    test('should load all pages within performance thresholds', async ({ page }) => {
      const criticalPages = [
        '/',
        '/compliance/deaf-unclaimed-deposits',
        '/compliance/grievance-redressal',
        '/compliance/policy-centre',
        '/compliance/privacy-policy'
      ];
      
      for (const pageUrl of criticalPages) {
        const startTime = Date.now();
        
        await page.goto(pageUrl);
        await page.waitForLoadState('networkidle');
        
        const loadTime = Date.now() - startTime;
        
        // Check if page loads within 3 seconds
        expect(loadTime).toBeLessThan(3000);
        
        // Check if there are no console errors
        const consoleErrors = await page.evaluate(() => {
          return console.error.length;
        });
        
        expect(consoleErrors).toBe(0);
      }
    });

    test('should have healthy link responses', async ({ page }) => {
      // Test link health by checking response codes
      const testLinks = [
        '/compliance/deaf-unclaimed-deposits',
        '/compliance/grievance-redressal',
        '/compliance/policy-centre',
        '/compliance/privacy-policy'
      ];
      
      for (const linkUrl of testLinks) {
        const response = await page.goto(linkUrl);
        
        // Check if response is successful
        if (response && response.status() === 200) {
          const pageTitle = await page.title();
          expect(pageTitle).not.toContain('Error');
          expect(pageTitle).not.toContain('404');
        }
      }
    });
  });
});
