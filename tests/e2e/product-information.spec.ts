import { test, expect } from '@playwright/test';

test.describe('Product Information Completeness Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(1280, 720);
  });

  test.describe('Personal Banking Products', () => {
    test('should have complete savings account information', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Savings Account');
      await expect(page.locator('img[alt="Savings Account"]')).toBeVisible();
      
      // Check all tabs are present
      const tabs = page.locator('[role="tab"]');
      await expect(tabs).toHaveCount(5);
      await expect(tabs.nth(0)).toContainText('Overview');
      await expect(tabs.nth(1)).toContainText('Features');
      await expect(tabs.nth(2)).toContainText('Eligibility');
      await expect(tabs.nth(3)).toContainText('Documents');
      await expect(tabs.nth(4)).toContainText('Apply');
      
      // Check overview content
      await tabs.nth(0).click();
      const overviewContent = page.locator('[data-tab-content="overview"]');
      await expect(overviewContent).toContainText('Benefits of our savings account');
      await expect(overviewContent.locator('li')).toHaveCount({ min: 3 });
      
      // Check features content
      await tabs.nth(1).click();
      const featuresContent = page.locator('[data-tab-content="features"]');
      await expect(featuresContent).toContainText('Key Features');
      await expect(featuresContent.locator('h4')).toHaveCount({ min: 2 });
      
      // Check eligibility content
      await tabs.nth(2).click();
      const eligibilityContent = page.locator('[data-tab-content="eligibility"]');
      await expect(eligibilityContent).toContainText('Eligibility Criteria');
      await expect(eligibilityContent.locator('li')).toHaveCount({ min: 3 });
      
      // Check documents content
      await tabs.nth(3).click();
      const documentsContent = page.locator('[data-tab-content="documents"]');
      await expect(documentsContent).toContainText('Required Documents');
      await expect(documentsContent.locator('li')).toHaveCount({ min: 3 });
      
      // Check apply content
      await tabs.nth(4).click();
      const applyContent = page.locator('[data-tab-content="apply"]');
      await expect(applyContent).toContainText('Apply for Savings Account');
      await expect(applyContent.locator('form')).toBeVisible();
      
      // Check form fields
      const form = applyContent.locator('form');
      await expect(form.locator('input[name="fullName"]')).toBeVisible();
      await expect(form.locator('input[name="email"]')).toBeVisible();
      await expect(form.locator('input[name="mobileNumber"]')).toBeVisible();
      await expect(form.locator('input[name="initialDeposit"]')).toBeVisible();
      await expect(form.locator('textarea[name="message"]')).toBeVisible();
      await expect(form.locator('button[type="submit"]')).toBeVisible();
    });

    test('should have complete personal loan information', async ({ page }) => {
      await page.goto('/en/personal/loans/personal-loan');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Personal Loan');
      await expect(page.locator('img[alt="Personal Loan"]')).toBeVisible();
      
      // Check all tabs are present
      const tabs = page.locator('[role="tab"]');
      await expect(tabs).toHaveCount(5);
      
      // Check apply form has loan-specific fields
      await tabs.nth(4).click();
      const form = page.locator('form');
      await expect(form.locator('input[name="loanAmount"]')).toBeVisible();
      await expect(form.locator('select[name="tenure"]')).toBeVisible();
      await expect(form.locator('select[name="loanPurpose"]')).toBeVisible();
      await expect(form.locator('input[name="monthlyIncome"]')).toBeVisible();
    });

    test('should have complete loan against securities information', async ({ page }) => {
      await page.goto('/en/personal/loans/loan-against-securities');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Loan Against Securities');
      
      // Check apply form has security-specific fields
      await page.locator('[data-tab="apply"]').click();
      const form = page.locator('form');
      await expect(form.locator('select[name="securityType"]')).toBeVisible();
      await expect(form.locator('input[name="securityAmount"]')).toBeVisible();
      await expect(form.locator('input[name="loanAmount"]')).toBeVisible();
    });
  });

  test.describe('Business Banking Products', () => {
    test('should have complete current account information', async ({ page }) => {
      await page.goto('/en/business/current-account');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Current Account');
      await expect(page.locator('img[alt="Current Account"]')).toBeVisible();
      
      // Check all tabs are present
      const tabs = page.locator('[role="tab"]');
      await expect(tabs).toHaveCount(4);
      
      // Check apply form has business-specific fields
      await tabs.nth(3).click();
      const form = page.locator('form');
      await expect(form.locator('input[name="businessName"]')).toBeVisible();
      await expect(form.locator('select[name="businessType"]')).toBeVisible();
      await expect(form.locator('input[name="annualTurnover"]')).toBeVisible();
    });

    test('should have complete business loan information', async ({ page }) => {
      await page.goto('/en/business/loans/business-loan');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Business Loan');
      
      // Check apply form has business loan fields
      await page.locator('[data-tab="apply"]').click();
      const form = page.locator('form');
      await expect(form.locator('input[name="businessName"]')).toBeVisible();
      await expect(form.locator('select[name="businessType"]')).toBeVisible();
      await expect(form.locator('input[name="loanAmount"]')).toBeVisible();
      await expect(form.locator('select[name="loanPurpose"]')).toBeVisible();
      await expect(form.locator('input[name="annualTurnover"]')).toBeVisible();
    });

    test('should have complete business deposit information', async ({ page }) => {
      await page.goto('/en/business/deposits/business-deposit');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Business Deposit');
      
      // Check apply form has deposit-specific fields
      await page.locator('[data-tab="apply"]').click();
      const form = page.locator('form');
      await expect(form.locator('input[name="businessName"]')).toBeVisible();
      await expect(form.locator('input[name="depositAmount"]')).toBeVisible();
      await expect(form.locator('select[name="tenure"]')).toBeVisible();
    });
  });

  test.describe('KFS Panel Completeness', () => {
    test('should have complete KFS information for savings account', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      const kfsPanel = page.locator('[data-testid="kfs-panel"]');
      await expect(kfsPanel).toBeVisible();
      await expect(kfsPanel.locator('h2')).toContainText('Key Facts Statement');
      
      // Check KFS items
      const kfsItems = kfsPanel.locator('[data-testid="kfs-item"]');
      await expect(kfsItems).toHaveCount(3);
      
      // Check specific KFS items
      await expect(kfsPanel).toContainText('Interest Rate');
      await expect(kfsPanel).toContainText('Minimum Balance');
      await expect(kfsPanel).toContainText('Service Charges');
      
      // Check values are present
      await expect(kfsPanel).toContainText('6.5% p.a.');
      await expect(kfsPanel).toContainText('₹500');
      await expect(kfsPanel).toContainText('Nil');
      
      // Check download link
      await expect(kfsPanel.locator('a[href*="kfs.pdf"]')).toBeVisible();
    });

    test('should have complete KFS information for personal loan', async ({ page }) => {
      await page.goto('/en/personal/loans/personal-loan');
      
      const kfsPanel = page.locator('[data-testid="kfs-panel"]');
      await expect(kfsPanel).toContainText('Interest Rate');
      await expect(kfsPanel).toContainText('Loan Amount');
      await expect(kfsPanel).toContainText('Processing Fee');
      
      await expect(kfsPanel).toContainText('11.5% p.a.');
      await expect(kfsPanel).toContainText('₹50,000 - ₹10,00,000');
      await expect(kfsPanel).toContainText('1% of loan amount');
    });

    test('should have complete KFS information for business products', async ({ page }) => {
      await page.goto('/en/business/current-account');
      
      const kfsPanel = page.locator('[data-testid="kfs-panel"]');
      await expect(kfsPanel).toContainText('Interest Rate');
      await expect(kfsPanel).toContainText('Minimum Balance');
      await expect(kfsPanel).toContainText('Service Charges');
      
      await expect(kfsPanel).toContainText('3.5% p.a.');
      await expect(kfsPanel).toContainText('₹0');
    });
  });

  test.describe('Related Products Completeness', () => {
    test('should show relevant related products for savings account', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      const relatedProducts = page.locator('[data-testid="related-products"]');
      await expect(relatedProducts).toBeVisible();
      await expect(relatedProducts.locator('h2')).toContainText('Related Products');
      
      // Check product cards
      const productCards = relatedProducts.locator('[data-testid="product-card"]');
      await expect(productCards).toHaveCount({ min: 2, max: 3 });
      
      // Check each product card has required elements
      const firstCard = productCards.first();
      await expect(firstCard.locator('[data-testid="product-name"]')).toBeVisible();
      await expect(firstCard.locator('[data-testid="product-description"]')).toBeVisible();
      await expect(firstCard.locator('[data-testid="product-image"]')).toBeVisible();
      await expect(firstCard.locator('[data-testid="product-cta"]')).toBeVisible();
      await expect(firstCard.locator('[data-testid="product-badge"]')).toBeVisible();
      
      // Check interest rate is shown
      await expect(firstCard).toContainText('% p.a.');
    });

    test('should show relevant related products for personal loan', async ({ page }) => {
      await page.goto('/en/personal/loans/personal-loan');
      
      const relatedProducts = page.locator('[data-testid="related-products"]');
      const productCards = relatedProducts.locator('[data-testid="product-card"]');
      
      // Should show loan-related products
      await expect(productCards).toHaveCount({ min: 2 });
      
      // Check if related products are relevant
      const firstCard = productCards.first();
      const productName = await firstCard.locator('[data-testid="product-name"]').textContent();
      expect(productName).toMatch(/loan|securities/i);
    });

    test('should show relevant related products for business account', async ({ page }) => {
      await page.goto('/en/business/current-account');
      
      const relatedProducts = page.locator('[data-testid="related-products"]');
      const productCards = relatedProducts.locator('[data-testid="product-card"]');
      
      // Should show business-related products
      await expect(productCards).toHaveCount({ min: 2 });
      
      // Check if related products are relevant
      const firstCard = productCards.first();
      const productName = await firstCard.locator('[data-testid="product-name"]').textContent();
      expect(productName).toMatch(/business|deposit|loan/i);
    });
  });

  test.describe('Form Validation Completeness', () => {
    test('should validate savings account form correctly', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      await page.locator('[data-tab="apply"]').click();
      
      const form = page.locator('form');
      const submitButton = form.locator('button[type="submit"]');
      
      // Try to submit empty form
      await submitButton.click();
      
      // Check validation errors
      await expect(form.locator('input[name="fullName"] + .error')).toBeVisible();
      await expect(form.locator('input[name="mobileNumber"] + .error')).toBeVisible();
      await expect(form.locator('input[name="initialDeposit"] + .error')).toBeVisible();
      
      // Fill in invalid data
      await form.locator('input[name="email"]').fill('invalid-email');
      await form.locator('input[name="mobileNumber"]').fill('123');
      await form.locator('input[name="initialDeposit"]').fill('-100');
      
      await submitButton.click();
      
      // Check specific validation errors
      await expect(form.locator('input[name="email"] + .error')).toBeVisible();
      await expect(form.locator('input[name="mobileNumber"] + .error')).toBeVisible();
      await expect(form.locator('input[name="initialDeposit"] + .error')).toBeVisible();
    });

    test('should validate loan form correctly', async ({ page }) => {
      await page.goto('/en/personal/loans/personal-loan');
      await page.locator('[data-tab="apply"]').click();
      
      const form = page.locator('form');
      const submitButton = form.locator('button[type="submit"]');
      
      // Try to submit empty form
      await submitButton.click();
      
      // Check loan-specific validation
      await expect(form.locator('input[name="loanAmount"] + .error')).toBeVisible();
      await expect(form.locator('input[name="monthlyIncome"] + .error')).toBeVisible();
      
      // Fill in valid data and submit
      await form.locator('input[name="fullName"]').fill('John Doe');
      await form.locator('input[name="email"]').fill('john@example.com');
      await form.locator('input[name="mobileNumber"]').fill('9876543210');
      await form.locator('input[name="loanAmount"]').fill('100000');
      await form.locator('input[name="monthlyIncome"]').fill('50000');
      
      // Mock successful submission
      await form.evaluate(() => {
        const form = document.querySelector('form');
        if (form) {
          form.dispatchEvent(new Event('submit'));
        }
      });
      
      // Check success message (would appear after successful submission)
      await page.waitForTimeout(2000);
      // Note: This would need to be implemented based on actual form submission behavior
    });
  });

  test.describe('Content Localization', () => {
    test('should display Hindi content correctly', async ({ page }) => {
      await page.goto('/hi/personal/savings-account');
      
      // Check Hindi content
      await expect(page.locator('h1')).toContainText('बचत खाता');
      await expect(page.locator('[data-tab="overview"]')).toContainText('अवलोक');
      await expect(page.locator('[data-tab="features"]')).toContainText('विशेष');
      await expect(page.locator('[data-tab="eligibility"]')).toContainText('पात्रता');
      await expect(page.locator('[data-tab="documents"]')).toContainText('दस्तावेज');
      await expect(page.locator('[data-tab="apply"]')).toContainText('आवेदन करें');
      
      // Check KFS panel in Hindi
      await expect(page.locator('[data-testid="kfs-panel"] h2')).toContainText('मुख्य तथ्य विवरण');
      
      // Check related products in Hindi
      await expect(page.locator('[data-testid="related-products"] h2')).toContainText('संबंधित उत्पाद');
    });

    test('should switch between English and Hindi correctly', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check English content
      await expect(page.locator('h1')).toContainText('Savings Account');
      
      // Switch to Hindi
      await page.goto('/hi/personal/savings-account');
      
      // Check Hindi content
      await expect(page.locator('h1')).toContainText('बचत खाता');
      
      // Switch back to English
      await page.goto('/en/personal/savings-account');
      
      // Check English content again
      await expect(page.locator('h1')).toContainText('Savings Account');
    });
  });

  test.describe('SEO and Meta Information', () => {
    test('should have proper meta tags', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check title
      const title = await page.title();
      expect(title).toContain('Savings Account');
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription).toContain('savings account');
      
      // Check canonical URL
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toContain('/en/personal/savings-account');
    });

    test('should have proper structured data', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check for JSON-LD structured data
      const structuredData = await page.locator('script[type="application/ld+json"]').count();
      expect(structuredData).toBeGreaterThan(0);
      
      // Check for Open Graph tags
      await expect(page.locator('meta[property="og:title"]')).toBeVisible();
      await expect(page.locator('meta[property="og:description"]')).toBeVisible();
      await expect(page.locator('meta[property="og:image"]')).toBeVisible();
    });
  });
});
