import { test, expect } from '@playwright/test';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '9876543210',
  aadhaar: '123456789012',
  address: '123 Test Street',
  city: 'Bhopal',
  state: 'Madhya Pradesh',
  pincode: '462001'
};

const branchData = {
  search: 'Bhopal',
  city: 'Bhopal'
};

const atmData = {
  search: 'ATM',
  city: 'Bhopal',
  type: 'on-site'
};

class MNSBankE2ETests {
  // Homepage Tests
  static async testHomepage(page) {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Mahanagar Nagrik Sahakari Bank|महानगर नागरिक सहकारी बैंक/);
    
    // Check main navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Check main sections
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=About Us')).toBeVisible();
    await expect(page.locator('text=Products')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    
    // Test language toggle
    const langToggle = page.locator('[data-testid="language-toggle"]');
    if (await langToggle.isVisible()) {
      await langToggle.click();
      await expect(page.locator('h1')).toContainText('महानगर नागरिक सहकारी बैंक');
    }
  }

  // Branch Locator Tests
  static async testBranchLocator(page) {
    await page.goto('/en/locate-us/branch-locator');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Branch Locator');
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill(branchData.search);
    
    // Check results
    const branchCards = page.locator('[data-testid="branch-card"]');
    await expect(branchCards.first()).toBeVisible();
    
    // Test city filter
    const cityFilter = page.locator('select[aria-label*="City"]');
    await cityFilter.selectOption(branchData.city);
    
    // Test branch details modal
    const firstBranch = branchCards.first();
    await firstBranch.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('text=Branch Details')).toBeVisible();
    
    // Test directions button
    const directionsBtn = page.locator('button:has-text("Get Directions")');
    if (await directionsBtn.isVisible()) {
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        directionsBtn.click()
      ]);
      await newPage.close();
    }
    
    // Close modal
    await page.keyboard.press('Escape');
  }

  // ATM Locator Tests
  static async testATMLocator(page) {
    await page.goto('/en/locate-us/atm-locator');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('ATM Locator');
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill(atmData.search);
    
    // Check results
    const atmCards = page.locator('[data-testid="atm-card"]');
    await expect(atmCards.first()).toBeVisible();
    
    // Test filters
    const cityFilter = page.locator('select[aria-label*="City"]');
    await cityFilter.selectOption(atmData.city);
    
    const typeFilter = page.locator('select[aria-label*="Type"]');
    await typeFilter.selectOption(atmData.type);
    
    // Test ATM details modal
    const firstATM = atmCards.first();
    await firstATM.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('text=ATM Details')).toBeVisible();
    
    // Close modal
    await page.keyboard.press('Escape');
  }

  // Feedback Form Tests
  static async testFeedbackForm(page) {
    await page.goto('/en/contact/feedback');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Feedback/Complaint');
    
    // Fill form
    await page.fill('input[name="name"]', testUser.name);
    await page.fill('input[name="email"]', testUser.email);
    await page.fill('input[name="phone"]', testUser.phone);
    await page.fill('textarea[name="message"]', 'This is a test feedback message');
    
    // Select category
    await page.selectOption('select[name="category"]', 'General Inquiry');
    
    // Submit form
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    
    // Check success message
    await expect(page.locator('text=Thank you for your feedback')).toBeVisible();
    await expect(page.locator('text=Reference Number:')).toBeVisible();
    
    // Test receipt download
    const downloadBtn = page.locator('button:has-text("Download Receipt")');
    if (await downloadBtn.isVisible()) {
      const downloadPromise = page.waitForEvent('download');
      await downloadBtn.click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toContain('feedback-receipt');
    }
  }

  // Download Forms Tests
  static async testDownloadForms(page) {
    await page.goto('/en/other-services/download-forms');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Download Forms');
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('account');
    
    // Check results
    const formCards = page.locator('[data-testid="form-card"]');
    await expect(formCards.first()).toBeVisible();
    
    // Test category filter
    const categoryFilter = page.locator('select[aria-label*="Category"]');
    await categoryFilter.selectOption('Account Opening');
    
    // Test form download
    const firstForm = formCards.first();
    const downloadBtn = firstForm.locator('button:has-text("Download")');
    
    const downloadPromise = page.waitForEvent('download');
    await downloadBtn.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.(pdf|doc|docx)$/);
  }

  // PAN Services Tests
  static async testPANServices(page) {
    await page.goto('/en/digital-services/pan');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('PAN Services');
    
    // Test application form
    await page.fill('input[name="name"]', testUser.name);
    await page.fill('input[name="email"]', testUser.email);
    await page.fill('input[name="phone"]', testUser.phone);
    await page.fill('input[name="aadhaar"]', testUser.aadhaar);
    await page.fill('input[name="address"]', testUser.address);
    await page.fill('input[name="city"]', testUser.city);
    await page.fill('input[name="state"]', testUser.state);
    await page.fill('input[name="pincode"]', testUser.pincode);
    
    // Select PAN type
    await page.selectOption('select[name="panType"]', 'new');
    
    // Submit form
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    
    // Check success message
    await expect(page.locator('text=PAN Application Registered Successfully')).toBeVisible();
    await expect(page.locator('text=Reference Number:')).toBeVisible();
    
    // Test receipt download
    const downloadBtn = page.locator('button:has-text("Download Receipt")');
    if (await downloadBtn.isVisible()) {
      const downloadPromise = page.waitForEvent('download');
      await downloadBtn.click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toContain('pan-application');
    }
  }

  // Navigation Tests
  static async testNavigation(page) {
    // Test main navigation links
    const navLinks = [
      { selector: 'a[href*="about-us"]', text: /About Us|हमारे बारे में/ },
      { selector: 'a[href*="products"]', text: /Products|उत्पाद/ },
      { selector: 'a[href*="services"]', text: /Services|सेवाएं/ },
      { selector: 'a[href*="locate-us"]', text: /Locate Us|हमें खोजें/ },
      { selector: 'a[href*="contact"]', text: /Contact|संपर्क करें/ }
    ];

    for (const link of navLinks) {
      await page.click(link.selector);
      await expect(page.locator('h1')).toBeVisible();
    }
  }

  // Responsive Design Tests
  static async testResponsiveDesign(page) {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile navigation
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click();
      await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
    }
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('nav')).toBeVisible();
  }

  // Performance Tests
  static async testPerformance(page) {
    // Test page load performance
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Check if page loads within reasonable time (3 seconds)
    expect(loadTime).toBeLessThan(3000);
    
    // Check Core Web Vitals
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
      };
    });
    
    expect(metrics.loadTime).toBeLessThan(3000);
    expect(metrics.domContentLoaded).toBeLessThan(2000);
  }
}

// Accessibility Tests
class AccessibilityTests {
  static async testKeyboardNavigation(page) {
    await page.goto('/');
    
    // Test Tab navigation
    await page.keyboard.press('Tab');
    let focusableElements = 0;
    
    // Count focusable elements
    const focusableElementsList = await page.locator('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').all();
    
    // Navigate through all focusable elements
    for (let i = 0; i < focusableElementsList.length; i++) {
      await page.keyboard.press('Tab');
      const focusedElement = await page.locator(':focus');
      expect(focusedElement).toBeVisible();
    }
  }

  static async testScreenReaders(page) {
    await page.goto('/');
    
    // Check for proper semantic HTML
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Check for ARIA labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const hasAriaLabel = await button.getAttribute('aria-label');
      const hasText = await button.textContent();
      
      // Each button should have either aria-label or text content
      expect(hasAriaLabel || (hasText && hasText.trim().length > 0)).toBeTruthy();
    }
  }

  static async testColorContrast(page) {
    await page.goto('/');
    
    // Check contrast ratios for important elements
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    for (let i = 0; i < headingCount; i++) {
      const heading = headings.nth(i);
      const styles = await heading.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor
        };
      });
      
      // Basic contrast check (simplified)
      expect(styles.color).not.toBe(styles.backgroundColor);
    }
  }
}

// Cross-browser compatibility tests
class CrossBrowserTests {
  static async testBasicFunctionality(page) {
    await page.goto('/');
    
    // Test basic functionality across browsers
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Test form interactions
    await page.click('a[href*="contact"]');
    await expect(page.locator('h1')).toContainText(/Contact|संपर्क/);
    
    // Test language toggle
    const langToggle = page.locator('[data-testid="language-toggle"]');
    if (await langToggle.isVisible()) {
      await langToggle.click();
      await page.waitForTimeout(1000);
    }
  }
}

export {
  MNSBankE2ETests,
  AccessibilityTests,
  CrossBrowserTests
};
