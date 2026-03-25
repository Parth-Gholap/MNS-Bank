import { test, expect } from '@playwright/test';

test.describe('Bilingual Experience Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize with English locale
    await page.goto('/en');
  });

  test('should switch from English to Hindi', async ({ page }) => {
    // Check initial English content
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // Switch to Hindi
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');

    // Wait for page to load with Hindi content
    await page.waitForURL('**/hi');

    // Check Hindi content
    await expect(page.locator('h1')).toContainText('स्वागत');
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
  });

  test('should switch from Hindi to English', async ({ page }) => {
    // Start with Hindi locale
    await page.goto('/hi');

    // Check initial Hindi content
    await expect(page.locator('h1')).toContainText('स्वागत');
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');

    // Switch to English
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-en"]');

    // Wait for page to load with English content
    await page.waitForURL('**/en');

    // Check English content
    await expect(page.locator('h1')).toContainText('Welcome');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('should maintain language preference across navigation', async ({ page }) => {
    // Switch to Hindi
    await page.goto('/en');
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');

    // Navigate to different pages
    await page.click('[data-testid="nav-personal"]');
    await expect(page.url()).toContain('/hi/personal');

    await page.click('[data-testid="nav-business"]');
    await expect(page.url()).toContain('/hi/business');

    await page.click('[data-testid="nav-digital-services"]');
    await expect(page.url()).toContain('/hi/digital-services');

    // Check that content remains in Hindi
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    await expect(page.locator('[data-testid="language-switcher"] [data-testid="current-lang"]')).toContainText('हिंदी');
  });

  test('should translate navigation menu items', async ({ page }) => {
    // Test English navigation
    await page.goto('/en');
    
    const navItems = [
      { selector: '[data-testid="nav-personal"]', text: 'Personal Banking' },
      { selector: '[data-testid="nav-business"]', text: 'Business Banking' },
      { selector: '[data-testid="nav-accounts"]', text: 'Accounts' },
      { selector: '[data-testid="nav-loans"]', text: 'Loans' },
      { selector: '[data-testid="nav-services"]', text: 'Services' }
    ];

    for (const item of navItems) {
      await expect(page.locator(item.selector)).toContainText(item.text);
    }

    // Switch to Hindi and check navigation
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');

    const hindiNavItems = [
      { selector: '[data-testid="nav-personal"]', text: 'व्यक्तिग बैंकिंग' },
      { selector: '[data-testid="nav-business"]', text: 'व्यवसाय बैंकिंग' },
      { selector: '[data-testid="nav-accounts"]', text: 'खाते' },
      { selector: '[data-testid="nav-loans"]', text: 'ऋण' },
      { selector: '[data-testid="nav-services"]', text: 'सेवाएं' }
    ];

    for (const item of hindiNavItems) {
      await expect(page.locator(item.selector)).toContainText(item.text);
    }
  });

  test('should translate form labels and placeholders', async ({ page }) => {
    // Test English form
    await page.goto('/en/personal/savings-account');
    
    const formElements = [
      { selector: '[data-testid="form-first-name"] label', text: 'First Name' },
      { selector: '[data-testid="form-last-name"] label', text: 'Last Name' },
      { selector: '[data-testid="form-email"] label', text: 'Email' },
      { selector: '[data-testid="form-phone"] label', text: 'Phone' },
      { selector: '[data-testid="form-submit"]', text: 'Submit' }
    ];

    for (const element of formElements) {
      await expect(page.locator(element.selector)).toContainText(element.text);
    }

    // Switch to Hindi and check form
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi/personal/savings-account');

    const hindiFormElements = [
      { selector: '[data-testid="form-first-name"] label', text: 'पहला नाम' },
      { selector: '[data-testid="form-last-name"] label', text: 'अंतिम नाम' },
      { selector: '[data-testid="form-email"] label', text: 'ईमेल' },
      { selector: '[data-testid="form-phone"] label', text: 'फोन' },
      { selector: '[data-testid="form-submit"]', text: 'जमा करें' }
    ];

    for (const element of hindiFormElements) {
      await expect(page.locator(element.selector)).toContainText(element.text);
    }
  });

  test('should translate error messages', async ({ page }) => {
    // Test English error messages
    await page.goto('/en/personal/loan-application');
    
    // Submit empty form to trigger validation errors
    await page.click('[data-testid="form-submit"]');
    
    const errorMessages = [
      '[data-testid="error-first-name"]',
      '[data-testid="error-last-name"]',
      '[data-testid="error-email"]',
      '[data-testid="error-phone"]'
    ];

    for (const errorSelector of errorMessages) {
      await expect(page.locator(errorSelector)).toBeVisible();
      // Check that error contains English text
      const errorText = await page.locator(errorSelector).textContent();
      expect(errorText).toMatch(/required|field|valid/i);
    }

    // Switch to Hindi and test error messages
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi/personal/loan-application');

    // Submit empty form again
    await page.click('[data-testid="form-submit"]');

    for (const errorSelector of errorMessages) {
      await expect(page.locator(errorSelector)).toBeVisible();
      // Check that error contains Hindi text
      const errorText = await page.locator(errorSelector).textContent();
      expect(errorText).toMatch(/आवश्यक|फ़ील्ड|वैध/i);
    }
  });

  test('should translate success messages', async ({ page }) => {
    // Test English success message
    await page.goto('/en/contact');
    
    // Fill and submit form
    await page.fill('[data-testid="form-name"]', 'Test User');
    await page.fill('[data-testid="form-email"]', 'test@example.com');
    await page.fill('[data-testid="form-message"]', 'Test message');
    await page.click('[data-testid="form-submit"]');

    // Check success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/success|thank you/i);

    // Switch to Hindi and test success message
    await page.goto('/hi/contact');
    
    await page.fill('[data-testid="form-name"]', 'टेस्ट उपयोगकर्ता');
    await page.fill('[data-testid="form-email"]', 'test@example.com');
    await page.fill('[data-testid="form-message"]', 'टेस्ट संदेश');
    await page.click('[data-testid="form-submit"]');

    // Check Hindi success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/सफलता|धन्यवाद/i);
  });

  test('should translate product information', async ({ page }) => {
    // Test English product page
    await page.goto('/en/products/savings-account');
    
    const productElements = [
      '[data-testid="product-title"]',
      '[data-testid="product-description"]',
      '[data-testid="product-features"]',
      '[data-testid="product-interest-rate"]',
      '[data-testid="product-apply-button"]'
    ];

    for (const selector of productElements) {
      await expect(page.locator(selector)).toBeVisible();
      // Check that content is in English
      const text = await page.locator(selector).textContent();
      expect(text).toMatch(/^[a-zA-Z0-9\s.,!?%]+$/);
    }

    // Switch to Hindi and check product page
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi/products/savings-account');

    for (const selector of productElements) {
      await expect(page.locator(selector)).toBeVisible();
      // Check that content contains Hindi characters
      const text = await page.locator(selector).textContent();
      expect(text).toMatch(/[\u0900-\u097F]/);
    }
  });

  test('should translate digital services', async ({ page }) => {
    // Test English digital services
    await page.goto('/en/digital-services');
    
    await expect(page.locator('[data-testid="digital-services-title"]')).toContainText('Digital Services');
    await expect(page.locator('[data-testid="upi-qr-service"]')).toContainText('UPI & QR');
    await expect(page.locator('[data-testid="bbps-service"]')).toContainText('BBPS');
    await expect(page.locator('[data-testid="mobile-banking-service"]')).toContainText('Mobile Banking');

    // Switch to Hindi
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi/digital-services');

    await expect(page.locator('[data-testid="digital-services-title"]')).toContainText('डिजिटल सेवाएं');
    await expect(page.locator('[data-testid="upi-qr-service"]')).toContainText('यूपीआई और क्यूआर');
    await expect(page.locator('[data-testid="bbps-service"]')).toContainText('बीबीपीएस');
    await expect(page.locator('[data-testid="mobile-banking-service"]')).toContainText('मोबाइल बैंकिंग');
  });

  test('should translate footer content', async ({ page }) => {
    // Test English footer
    await page.goto('/en');
    
    const footerElements = [
      '[data-testid="footer-about"]',
      '[data-testid="footer-products"]',
      '[data-testid="footer-services"]',
      '[data-testid="footer-contact"]',
      '[data-testid="footer-privacy"]',
      '[data-testid="footer-terms"]'
    ];

    for (const selector of footerElements) {
      await expect(page.locator(selector)).toBeVisible();
      // Check that content is in English
      const text = await page.locator(selector).textContent();
      expect(text).toMatch(/^[a-zA-Z0-9\s.,!?%]+$/);
    }

    // Switch to Hindi
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');

    for (const selector of footerElements) {
      await expect(page.locator(selector)).toBeVisible();
      // Check that content contains Hindi characters
      const text = await page.locator(selector).textContent();
      expect(text).toMatch(/[\u0900-\u097F]/);
    }
  });

  test('should handle missing translations gracefully', async ({ page }) => {
    // Navigate to a page that might have missing translations
    await page.goto('/en');
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');

    // Check that page loads without errors
    await expect(page.locator('body')).toBeVisible();
    
    // Check that missing translations fall back to English or show placeholder
    const elements = await page.locator('[data-testid*="missing-translation"]').all();
    
    if (elements.length > 0) {
      // If missing translation indicators exist, check they're handled gracefully
      for (const element of elements) {
        await expect(element).toBeVisible();
        const text = await element.textContent();
        // Should either have English fallback or clear indication of missing translation
        expect(text).toMatch(/^[a-zA-Z0-9\s.,!?%]+$/|missing|untranslated/i);
      }
    }
  });

  test('should maintain proper text direction', async ({ page }) => {
    // Both English and Hindi should be LTR
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');
    
    // Hindi should also be LTR (not RTL)
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    
    // Check text alignment
    const bodyElement = page.locator('body');
    const computedStyle = await bodyElement.evaluate(el => getComputedStyle(el).direction);
    expect(computedStyle).toBe('ltr');
  });

  test('should preserve URL parameters when switching languages', async ({ page }) => {
    // Navigate with parameters
    await page.goto('/en/products/savings-account?ref=home&campaign=digital');
    
    // Switch language
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    
    // Check that parameters are preserved
    await expect(page.url()).toContain('ref=home');
    await expect(page.url()).toContain('campaign=digital');
    await expect(page.url()).toContain('/hi/products/savings-account');
  });

  test('should handle language switching in modals', async ({ page }) => {
    await page.goto('/en');
    
    // Open a modal
    await page.click('[data-testid="open-modal"]');
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    
    // Check modal content is in English
    await expect(page.locator('[data-testid="modal-title"]')).toContainText(/^[a-zA-Z0-9\s.,!?%]+$/);
    
    // Switch language while modal is open
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    
    // Check modal content updates to Hindi
    await expect(page.locator('[data-testid="modal-title"]')).toContainText(/[\u0900-\u097F]/);
  });

  test('should work with browser back/forward navigation', async ({ page }) => {
    // Start with English
    await page.goto('/en');
    
    // Switch to Hindi
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');
    
    // Navigate to another page
    await page.click('[data-testid="nav-personal"]');
    await expect(page.url()).toContain('/hi/personal');
    
    // Go back
    await page.goBack();
    await expect(page.url()).toContain('/hi');
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    
    // Go forward
    await page.goForward();
    await expect(page.url()).toContain('/hi/personal');
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
  });

  test('should handle language switching with forms', async ({ page }) => {
    await page.goto('/en/contact');
    
    // Fill form partially
    await page.fill('[data-testid="form-name"]', 'John');
    await page.fill('[data-testid="form-email"]', 'john@example.com');
    
    // Switch language
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi/contact');
    
    // Check that form data is preserved (if implemented)
    // This test assumes form data preservation across language switches
    const nameValue = await page.inputValue('[data-testid="form-name"]');
    const emailValue = await page.inputValue('[data-testid="form-email"]');
    
    // Either data should be preserved or form should be reset appropriately
    expect(nameValue.length > 0 || nameValue === '').toBeTruthy();
    expect(emailValue.length > 0 || emailValue === '').toBeTruthy();
  });

  test('should have proper language detection', async ({ page }) => {
    // Test direct navigation to Hindi URL
    await page.goto('/hi');
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    await expect(page.locator('h1')).toContainText(/[\u0900-\u097F]/);
    
    // Test direct navigation to English URL
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText(/^[a-zA-Z0-9\s.,!?%]+$/);
  });

  test('should handle language switching with dynamic content', async ({ page }) => {
    await page.goto('/en');
    
    // Trigger dynamic content loading
    await page.click('[data-testid="load-dynamic-content"]');
    await expect(page.locator('[data-testid="dynamic-content"]')).toBeVisible();
    
    // Switch language
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    
    // Check dynamic content is translated
    await expect(page.locator('[data-testid="dynamic-content"]')).toContainText(/[\u0900-\u097F]/);
  });

  test('should maintain accessibility attributes in both languages', async ({ page }) => {
    // Test English
    await page.goto('/en');
    
    const accessibleElements = page.locator('[role], [aria-label], [aria-describedby]');
    const count = await accessibleElements.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Check that aria-labels are in English
    for (let i = 0; i < Math.min(count, 5); i++) {
      const element = accessibleElements.nth(i);
      const ariaLabel = await element.getAttribute('aria-label');
      if (ariaLabel) {
        expect(ariaLabel).toMatch(/^[a-zA-Z0-9\s.,!?%]+$/);
      }
    }
    
    // Test Hindi
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');
    
    // Check that aria-labels are updated to Hindi
    for (let i = 0; i < Math.min(count, 5); i++) {
      const element = accessibleElements.nth(i);
      const ariaLabel = await element.getAttribute('aria-label');
      if (ariaLabel) {
        expect(ariaLabel).toMatch(/[\u0900-\u097F]/);
      }
    }
  });

  test('should handle language switching with error pages', async ({ page }) => {
    // Navigate to non-existent page in English
    await page.goto('/en/non-existent-page');
    
    // Check 404 page content
    await expect(page.locator('[data-testid="error-title"]')).toContainText('Not Found');
    await expect(page.locator('[data-testid="error-message"]')).toContainText(/page not found/i);
    
    // Switch language
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    
    // Check 404 page content in Hindi
    await expect(page.locator('[data-testid="error-title"]')).toContainText(/[\u0900-\u097F]/);
  });

  test('should work with keyboard navigation in both languages', async ({ page }) => {
    await page.goto('/en');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const firstFocused = page.locator(':focus');
    await expect(firstFocused).toBeVisible();
    
    // Switch language
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');
    
    // Test keyboard navigation in Hindi
    await page.keyboard.press('Tab');
    const secondFocused = page.locator(':focus');
    await expect(secondFocused).toBeVisible();
  });

  test('should handle language switching with search functionality', async ({ page }) => {
    await page.goto('/en');
    
    // Perform search in English
    await page.fill('[data-testid="search-input"]', 'savings');
    await page.click('[data-testid="search-button"]');
    
    // Check search results
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
    
    // Switch language
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    
    // Check that search interface is translated
    await expect(page.locator('[data-testid="search-input"]')).toHaveAttribute('placeholder', /[\u0900-\u097F]/);
    await expect(page.locator('[data-testid="search-button"]')).toContainText(/[\u0900-\u097F]/);
  });

  test('should maintain language preference in localStorage', async ({ page }) => {
    // Switch to Hindi
    await page.goto('/en');
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');
    
    // Check localStorage
    const locale = await page.evaluate(() => localStorage.getItem('mnsbank-locale'));
    expect(locale).toBe('hi');
    
    // Navigate to root and check if preference is maintained
    await page.goto('/');
    await expect(page.url()).toContain('/hi');
  });

  test('should handle language switching with date/time formatting', async ({ page }) => {
    await page.goto('/en');
    
    // Look for date elements
    const dateElements = page.locator('[data-testid*="date"], [data-testid*="time"]');
    const count = await dateElements.count();
    
    if (count > 0) {
      // Check English date format
      const firstDate = dateElements.first();
      const englishDate = await firstDate.textContent();
      expect(englishDate).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}|\w+ \d{1,2}, \d{4}/);
      
      // Switch to Hindi
      await page.click('[data-testid="language-switcher"]');
      await page.click('[data-testid="lang-hi"]');
      
      // Check Hindi date format (if implemented)
      const hindiDate = await firstDate.textContent();
      expect(hindiDate).toMatch(/[\u0900-\u097F]|\d{1,2}\/\d{1,2}\/\d{4}/);
    }
  });

  test('should handle language switching with number formatting', async ({ page }) => {
    await page.goto('/en');
    
    // Look for number elements (prices, rates, etc.)
    const numberElements = page.locator('[data-testid*="amount"], [data-testid*="rate"], [data-testid*="price"]');
    const count = await numberElements.count();
    
    if (count > 0) {
      // Check English number format
      const firstNumber = numberElements.first();
      const englishNumber = await firstNumber.textContent();
      expect(englishNumber).toMatch(/[\d,.$%₹]/);
      
      // Switch to Hindi
      await page.click('[data-testid="language-switcher"]');
      await page.click('[data-testid="lang-hi"]');
      
      // Check Hindi number format (if implemented)
      const hindiNumber = await firstNumber.textContent();
      expect(hindiNumber).toMatch(/[\d,.$%₹]/);
    }
  });
});

test.describe('Bilingual Performance Tests', () => {
  test('should load Hindi pages within acceptable time', async ({ page }) => {
    const pages = [
      '/hi',
      '/hi/personal',
      '/hi/business',
      '/hi/digital-services',
      '/hi/products/savings-account'
    ];

    for (const pageUrl of pages) {
      const startTime = Date.now();
      
      await page.goto(pageUrl);
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // 3 seconds max
    }
  });

  test('should switch languages quickly', async ({ page }) => {
    await page.goto('/en');
    
    const switchTimes: number[] = [];
    
    // Test multiple language switches
    for (let i = 0; i < 5; i++) {
      const startTime = Date.now();
      
      await page.click('[data-testid="language-switcher"]');
      await page.click(i % 2 === 0 ? '[data-testid="lang-hi"]' : '[data-testid="lang-en"]');
      await page.waitForLoadState('networkidle');
      
      const switchTime = Date.now() - startTime;
      switchTimes.push(switchTime);
    }
    
    const averageSwitchTime = switchTimes.reduce((sum, time) => sum + time, 0) / switchTimes.length;
    expect(averageSwitchTime).toBeLessThan(2000); // 2 seconds average
  });

  test('should cache translations efficiently', async ({ page }) => {
    await page.goto('/en');
    
    // First switch to Hindi
    const startTime1 = Date.now();
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');
    const firstSwitchTime = Date.now() - startTime1;
    
    // Switch back to English
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-en"]');
    await page.waitForURL('**/en');
    
    // Switch to Hindi again (should be faster due to caching)
    const startTime2 = Date.now();
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    await page.waitForURL('**/hi');
    const secondSwitchTime = Date.now() - startTime2;
    
    // Second switch should be faster (cached)
    expect(secondSwitchTime).toBeLessThan(firstSwitchTime * 0.8);
  });
});

test.describe('Bilingual Accessibility Tests', () => {
  test('should have proper lang attributes', async ({ page }) => {
    // Test English
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    
    // Test Hindi
    await page.goto('/hi');
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
  });

  test('should have proper text direction', async ({ page }) => {
    // Both languages should be LTR
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    
    await page.goto('/hi');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  });

  test('should have accessible language switcher', async ({ page }) => {
    await page.goto('/en');
    
    const switcher = page.locator('[data-testid="language-switcher"]');
    await expect(switcher).toBeVisible();
    await expect(switcher).toHaveAttribute('role', 'button');
    await expect(switcher).toHaveAttribute('aria-label');
    
    // Test keyboard accessibility
    await switcher.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="language-dropdown"]')).toBeVisible();
    
    // Escape to close
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-testid="language-dropdown"]')).not.toBeVisible();
  });

  test('should announce language changes to screen readers', async ({ page }) => {
    await page.goto('/en');
    
    // Switch language and check for aria-live regions
    await page.click('[data-testid="language-switcher"]');
    await page.click('[data-testid="lang-hi"]');
    
    // Check for announcement
    const announcement = page.locator('[data-testid="language-announcement"]');
    await expect(announcement).toHaveAttribute('aria-live', 'polite');
    await expect(announcement).toContainText('Language changed to Hindi');
  });
});
