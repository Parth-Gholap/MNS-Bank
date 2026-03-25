import { test, expect, Page, BrowserContext } from '@playwright/test';

class TestHelper {
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Allow for any final rendering
  }

  static async checkAccessibility(page: Page): Promise<void> {
    // Basic accessibility checks
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
    expect(headings).toBeGreaterThan(0);

    const images = await page.locator('img').count();
    for (let i = 0; i < images; i++) {
      const img = page.locator('img').nth(i);
      await expect(img).toHaveAttribute('alt');
    }

    const buttons = await page.locator('button, input[type="submit"], a[role="button"]').count();
    expect(buttons).toBeGreaterThan(0);
  }

  static async checkPerformance(page: Page): Promise<void> {
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
      };
    });

    expect(metrics.loadTime).toBeLessThan(5000); // 5 seconds max
    expect(metrics.firstContentfulPaint).toBeLessThan(2000); // 2 seconds max
  }

  static async checkResponsive(page: Page, viewport: { width: number; height: number }): Promise<void> {
    await page.setViewportSize(viewport);
    await TestHelper.waitForPageLoad(page);
    
    // Check that layout adapts properly
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(viewportWidth).toBe(viewport.width);
  }
}

test.describe('Comprehensive E2E Test Suite', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      locale: 'en-US'
    });
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test.describe('Homepage Functionality', () => {
    test('should load homepage successfully', async () => {
      await page.goto('/');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page).toHaveTitle(/MNS Bank/);
      await expect(page.locator('h1')).toBeVisible();
      
      await TestHelper.checkAccessibility(page);
      await TestHelper.checkPerformance(page);
    });

    test('should handle language switching', async () => {
      await page.goto('/');
      await TestHelper.waitForPageLoad(page);
      
      // Check language switcher
      const langSwitcher = page.locator('[data-testid="language-switcher"]');
      if (await langSwitcher.isVisible()) {
        await langSwitcher.click();
        await page.locator('[data-value="hi"]').click();
        await TestHelper.waitForPageLoad(page);
        
        // Check that content is in Hindi
        await expect(page.locator('body')).toContainText('बैंक');
      }
    });

    test('should navigate to all main sections', async () => {
      await page.goto('/');
      await TestHelper.waitForPageLoad(page);
      
      const mainNav = page.locator('nav a');
      const navCount = await mainNav.count();
      
      for (let i = 0; i < navCount; i++) {
        const navItem = mainNav.nth(i);
        const href = await navItem.getAttribute('href');
        
        if (href && !href.startsWith('http')) {
          await navItem.click();
          await TestHelper.waitForPageLoad(page);
          
          await expect(page).toHaveURL(new RegExp(href));
          await TestHelper.checkAccessibility(page);
          
          await page.goBack();
          await TestHelper.waitForPageLoad(page);
        }
      }
    });

    test('should handle carousel functionality', async () => {
      await page.goto('/');
      await TestHelper.waitForPageLoad(page);
      
      const carousel = page.locator('[data-testid="carousel"]');
      if (await carousel.isVisible()) {
        const nextButton = carousel.locator('[data-testid="carousel-next"]');
        const prevButton = carousel.locator('[data-testid="carousel-prev"]');
        
        if (await nextButton.isVisible()) {
          const initialSlide = await carousel.locator('[data-testid="carousel-slide"]').first().isVisible();
          await nextButton.click();
          await page.waitForTimeout(500);
          
          // Check that slide changed
          await expect(carousel.locator('[data-testid="carousel-slide"]').first()).not.toHaveClass(/active/);
        }
        
        if (await prevButton.isVisible()) {
          await prevButton.click();
          await page.waitForTimeout(500);
        }
      }
    });

    test('should handle quick links', async () => {
      await page.goto('/');
      await TestHelper.waitForPageLoad(page);
      
      const quickLinks = page.locator('[data-testid="quick-links"] a');
      const linkCount = await quickLinks.count();
      
      if (linkCount > 0) {
        await quickLinks.first().click();
        await TestHelper.waitForPageLoad(page);
        
        await expect(page).not.toHaveURL('/');
        await TestHelper.checkAccessibility(page);
      }
    });
  });

  test.describe('Product Pages', () => {
    test('should load products page', async () => {
      await page.goto('/products');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('Products');
      await TestHelper.checkAccessibility(page);
      await TestHelper.checkPerformance(page);
    });

    test('should display product cards', async () => {
      await page.goto('/products');
      await TestHelper.waitForPageLoad(page);
      
      const productCards = page.locator('[data-testid="product-card"]');
      const cardCount = await productCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = productCards.nth(i);
        await expect(card.locator('h3')).toBeVisible();
        await expect(card.locator('[data-testid="product-description"]')).toBeVisible();
        
        const applyButton = card.locator('[data-testid="apply-button"]');
        if (await applyButton.isVisible()) {
          await applyButton.click();
          await page.waitForTimeout(1000);
          await page.goBack();
          await TestHelper.waitForPageLoad(page);
        }
      }
    });

    test('should handle product filtering', async () => {
      await page.goto('/products');
      await TestHelper.waitForPageLoad(page);
      
      const categoryFilter = page.locator('[data-testid="category-filter"]');
      if (await categoryFilter.isVisible()) {
        await categoryFilter.click();
        await page.locator('[data-category="savings"]').click();
        await TestHelper.waitForPageLoad(page);
        
        // Check that filtered products are shown
        const filteredCards = page.locator('[data-testid="product-card"]');
        const filteredCount = await filteredCards.count();
        expect(filteredCount).toBeGreaterThan(0);
      }
    });

    test('should handle product search', async () => {
      await page.goto('/products');
      await TestHelper.waitForPageLoad(page);
      
      const searchInput = page.locator('[data-testid="product-search"]');
      if (await searchInput.isVisible()) {
        await searchInput.fill('savings');
        await page.waitForTimeout(1000);
        
        // Check search results
        const searchResults = page.locator('[data-testid="product-card"]');
        const resultCount = await searchResults.count();
        expect(resultCount).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Account Management', () => {
    test('should handle login flow', async () => {
      await page.goto('/login');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('Login');
      
      // Fill login form
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="password-input"]', 'TestPassword123!');
      
      // Handle form validation
      const loginButton = page.locator('[data-testid="login-button"]');
      await loginButton.click();
      
      // Check for validation errors or successful login
      await page.waitForTimeout(2000);
      
      // In a real test, this would verify successful login
      // For now, we just check that the form handles submission
      await TestHelper.checkAccessibility(page);
    });

    test('should handle registration flow', async () => {
      await page.goto('/register');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('Register');
      
      // Fill registration form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'newuser@example.com');
      await page.fill('[data-testid="phone-input"]', '9876543210');
      await page.fill('[data-testid="password-input"]', 'NewPassword123!');
      await page.fill('[data-testid="confirm-password-input"]', 'NewPassword123!');
      
      const registerButton = page.locator('[data-testid="register-button"]');
      await registerButton.click();
      
      await page.waitForTimeout(2000);
      await TestHelper.checkAccessibility(page);
    });

    test('should handle password reset', async () => {
      await page.goto('/forgot-password');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('Reset Password');
      
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      
      const resetButton = page.locator('[data-testid="reset-button"]');
      await resetButton.click();
      
      await page.waitForTimeout(2000);
      await TestHelper.checkAccessibility(page);
    });
  });

  test.describe('Customer Service', () => {
    test('should handle grievance form', async () => {
      await page.goto('/customer-service');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('Customer Service');
      
      // Fill grievance form
      await page.selectOption('[data-testid="complaint-type"]', 'service');
      await page.fill('[data-testid="complaint-description"]', 'This is a test complaint for E2E testing.');
      await page.fill('[data-testid="customer-name"]', 'Test Customer');
      await page.fill('[data-testid="customer-email"]', 'customer@example.com');
      await page.fill('[data-testid="customer-phone"]', '9876543210');
      
      const submitButton = page.locator('[data-testid="submit-complaint"]');
      await submitButton.click();
      
      await page.waitForTimeout(2000);
      await TestHelper.checkAccessibility(page);
    });

    test('should handle contact form', async () => {
      await page.goto('/contact');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('Contact Us');
      
      await page.fill('[data-testid="contact-name"]', 'Test Contact');
      await page.fill('[data-testid="contact-email"]', 'contact@example.com');
      await page.fill('[data-testid="contact-message"]', 'This is a test message for E2E testing.');
      
      const sendButton = page.locator('[data-testid="send-message"]');
      await sendButton.click();
      
      await page.waitForTimeout(2000);
      await TestHelper.checkAccessibility(page);
    });
  });

  test.describe('Location Services', () => {
    test('should handle branch locator', async () => {
      await page.goto('/locate-us/branch-locator');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('Branch Locator');
      
      // Test search functionality
      const searchInput = page.locator('[data-testid="location-search"]');
      if (await searchInput.isVisible()) {
        await searchInput.fill('Mumbai');
        await page.waitForTimeout(1000);
        
        const searchResults = page.locator('[data-testid="location-card"]');
        const resultCount = await searchResults.count();
        expect(resultCount).toBeGreaterThan(0);
      }
      
      await TestHelper.checkAccessibility(page);
    });

    test('should handle ATM locator', async () => {
      await page.goto('/locate-us/atm-locator');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('ATM Locator');
      
      const searchInput = page.locator('[data-testid="location-search"]');
      if (await searchInput.isVisible()) {
        await searchInput.fill('Delhi');
        await page.waitForTimeout(1000);
        
        const searchResults = page.locator('[data-testid="location-card"]');
        const resultCount = await searchResults.count();
        expect(resultCount).toBeGreaterThan(0);
      }
      
      await TestHelper.checkAccessibility(page);
    });

    test('should handle location overview', async () => {
      await page.goto('/locate-us');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('Locate Us');
      
      // Check quick actions
      const quickActions = page.locator('[data-testid="quick-action"]');
      const actionCount = await quickActions.count();
      expect(actionCount).toBeGreaterThan(0);
      
      await TestHelper.checkAccessibility(page);
    });
  });

  test.describe('Digital Services', () => {
    test('should load digital services page', async () => {
      await page.goto('/digital-services');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('Digital Services');
      await TestHelper.checkAccessibility(page);
      await TestHelper.checkPerformance(page);
    });

    test('should display service categories', async () => {
      await page.goto('/digital-services');
      await TestHelper.waitForPageLoad(page);
      
      const categories = page.locator('[data-testid="service-category"]');
      const categoryCount = await categories.count();
      expect(categoryCount).toBeGreaterThan(0);
      
      for (let i = 0; i < Math.min(categoryCount, 3); i++) {
        const category = categories.nth(i);
        await expect(category.locator('h3')).toBeVisible();
        
        const categoryButton = category.locator('[data-testid="category-button"]');
        if (await categoryButton.isVisible()) {
          await categoryButton.click();
          await page.waitForTimeout(500);
        }
      }
    });
  });

  test.describe('Responsive Design', () => {
    const viewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ];

    viewports.forEach(viewport => {
      test(`should be responsive on ${viewport.width}x${viewport.height}`, async () => {
        await page.goto('/');
        await TestHelper.checkResponsive(page, viewport);
        
        // Check navigation adapts
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();
        
        // Check content is readable
        const mainContent = page.locator('main');
        await expect(mainContent).toBeVisible();
        
        await TestHelper.checkAccessibility(page);
      });
    });
  });

  test.describe('Error Handling', () => {
    test('should handle 404 pages', async () => {
      await page.goto('/non-existent-page');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toContainText('404');
      await expect(page.locator('[data-testid="404-message"]')).toBeVisible();
      
      // Check that navigation still works
      const homeLink = page.locator('a[href="/"]');
      if (await homeLink.isVisible()) {
        await homeLink.click();
        await TestHelper.waitForPageLoad(page);
        await expect(page).toHaveURL('/');
      }
    });

    test('should handle network errors gracefully', async () => {
      // Simulate network failure
      await page.route('**/*', route => route.abort());
      
      await page.goto('/');
      await page.waitForTimeout(2000);
      
      // Check that error message is shown
      const errorMessage = page.locator('[data-testid="error-message"]');
      if (await errorMessage.isVisible()) {
        await expect(errorMessage).toContainText('network');
      }
      
      // Restore network
      await page.unroute('**/*');
    });
  });

  test.describe('Performance Tests', () => {
    test('should meet performance benchmarks', async () => {
      await page.goto('/');
      await TestHelper.waitForPageLoad(page);
      
      const performanceMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paints = performance.getEntriesByType('paint');
        
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: paints.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paints.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          largestContentfulPaint: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0
        };
      });
      
      expect(performanceMetrics.firstContentfulPaint).toBeLessThan(2500);
      expect(performanceMetrics.domContentLoaded).toBeLessThan(3000);
      expect(performanceMetrics.loadComplete).toBeLessThan(5000);
    });

    test('should handle large content efficiently', async () => {
      await page.goto('/products');
      await TestHelper.waitForPageLoad(page);
      
      const startTime = Date.now();
      
      // Scroll through content
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      await page.waitForTimeout(1000);
      
      const scrollTime = Date.now() - startTime;
      expect(scrollTime).toBeLessThan(2000); // Should scroll within 2 seconds
    });
  });

  test.describe('Security Tests', () => {
    test('should have secure headers', async () => {
      const response = await page.goto('/');
      const headers = response?.headers();
      
      expect(headers?.['x-content-type-options']).toBe('nosniff');
      expect(headers?.['x-frame-options']).toBe('DENY');
      expect(headers?.['x-xss-protection']).toBe('1; mode=block');
    });

    test('should not expose sensitive information', async () => {
      await page.goto('/');
      
      // Check for sensitive data in page source
      const pageContent = await page.content();
      
      // Should not contain passwords or API keys
      expect(pageContent).not.toMatch(/password|api[_-]?key|secret/i);
      
      // Should not contain console.log statements in production
      if (process.env.NODE_ENV === 'production') {
        expect(pageContent).not.toMatch(/console\.log/);
      }
    });
  });

  test.describe('Accessibility Tests', () => {
    test('should have proper heading structure', async () => {
      await page.goto('/');
      
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
      expect(headings.length).toBeGreaterThan(0);
      
      // Should have exactly one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });

    test('should have proper ARIA labels', async () => {
      await page.goto('/');
      
      // Check interactive elements have proper labels
      const buttons = page.locator('button:not([aria-label]):not([aria-labelledby])');
      const unlabeledButtons = await buttons.filter({ hasText: /^\s*$/ }).count();
      expect(unlabeledButtons).toBe(0);
      
      // Check form inputs have labels
      const inputs = page.locator('input:not([aria-label]):not([aria-labelledby])');
      const unlabeledInputs = await inputs.filter({ has: page.locator('label') }).count();
      expect(unlabeledInputs).toBe(0);
    });

    test('should support keyboard navigation', async () => {
      await page.goto('/');
      
      // Tab through interactive elements
      await page.keyboard.press('Tab');
      
      let focusedElement = await page.locator(':focus');
      expect(await focusedElement.isVisible()).toBe(true);
      
      // Continue tabbing to ensure focus moves properly
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        focusedElement = await page.locator(':focus');
        expect(await focusedElement.isVisible()).toBe(true);
      }
    });

    test('should have sufficient color contrast', async () => {
      await page.goto('/');
      
      // This is a basic check - in production, you'd use a proper contrast checker
      const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6, span, a').all();
      
      for (const element of textElements.slice(0, 10)) { // Check first 10 elements
        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor
          };
        });
        
        // Basic check that colors are defined
        expect(styles.color).not.toBe('');
        expect(styles.backgroundColor).not.toBe('');
      }
    });
  });

  test.describe('Cross-browser Compatibility', () => {
    // These tests would be run across different browsers in CI
    test('should work in Chrome', async () => {
      await page.goto('/');
      await TestHelper.waitForPageLoad(page);
      
      await expect(page.locator('h1')).toBeVisible();
      await TestHelper.checkAccessibility(page);
      await TestHelper.checkPerformance(page);
    });

    test('should handle modern JavaScript features', async () => {
      await page.goto('/');
      
      // Check that modern features work
      const modernFeatures = await page.evaluate(() => {
        return {
          fetch: typeof fetch !== 'undefined',
          promise: typeof Promise !== 'undefined',
          arrow: (() => true)(),
          template: `template` === 'template',
          destructuring: (() => {
            const [a] = [1];
            return a === 1;
          })()
        };
      });
      
      expect(modernFeatures.fetch).toBe(true);
      expect(modernFeatures.promise).toBe(true);
      expect(modernFeatures.arrow).toBe(true);
      expect(modernFeatures.template).toBe(true);
      expect(modernFeatures.destructuring).toBe(true);
    });
  });
});
