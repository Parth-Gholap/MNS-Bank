import { test, expect } from '@playwright/test';

test.describe('Inquiry Submission Flow Tests', () => {
  test.describe('Form Submission Process', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should submit valid inquiry successfully', async ({ page }) => {
      // Fill all required fields
      await page.fill('[data-testid="name-input"]', 'John Doe');
      await page.fill('[data-testid="email-input"]', 'john.doe@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'Test Inquiry Subject');
      await page.fill('[data-testid="message-input"]', 'This is a test inquiry message that meets the minimum character requirement for testing purposes and provides sufficient detail about the inquiry being submitted.');
      await page.check('[data-testid="consent-checkbox"]');
      
      // Submit form
      await page.click('[data-testid="submit-button"]');
      
      // Should show success message
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
      await expect(page.locator('[data-testid="success-message"]')).toContainText('Inquiry submitted successfully');
      
      // Should show reference number
      await expect(page.locator('[data-testid="reference-number"]')).toBeVisible();
      const referenceNumber = await page.locator('[data-testid="reference-number"]').textContent();
      expect(referenceNumber).toMatch(/^[A-Z]{3}\d{9}$/); // INQ123456789 format
    });

    test('should redirect to confirmation page', async ({ page }) => {
      // Fill and submit form
      await page.fill('[data-testid="name-input"]', 'Jane Smith');
      await page.fill('[data-testid="email-input"]', 'jane.smith@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543211');
      await page.selectOption('[data-testid="category-select"]', 'Product Information');
      await page.fill('[data-testid="subject-input"]', 'Product Inquiry');
      await page.fill('[data-testid="message-input"]', 'I would like to know more about your savings account products and the current interest rates being offered.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should redirect to confirmation page
      await page.waitForURL(/\/contact\/confirmation/);
      await expect(page.locator('[data-testid="confirmation-page"]')).toBeVisible();
      
      // Should display inquiry details
      await expect(page.locator('[data-testid="inquiry-details"]')).toBeVisible();
      await expect(page.locator('[data-testid="inquiry-details"]')).toContainText('Jane Smith');
      await expect(page.locator('[data-testid="inquiry-details"]')).toContainText('jane.smith@example.com');
    });

    test('should send email confirmation', async ({ page }) => {
      // Mock email service
      await page.route('**/api/inquiries', route => {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
              referenceNumber: 'INQ123456789',
              message: 'Inquiry submitted successfully'
            }
          })
        });
      });
      
      // Submit form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'Test Subject');
      await page.fill('[data-testid="message-input"]', 'Test message content that meets requirements.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Check if email notification was triggered
      const requests = await page.waitForEvent('requestfinished');
      const emailRequest = requests.find(req => req.url().includes('/api/notifications/email'));
      expect(emailRequest).toBeTruthy();
    });

    test('should handle submission errors gracefully', async ({ page }) => {
      // Mock server error
      await page.route('**/api/inquiries', route => {
        return route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            error: 'Internal server error'
          })
        });
      });
      
      // Submit form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'Test Subject');
      await page.fill('[data-testid="message-input"]', 'Test message content that meets requirements.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should show error message
      await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
      await expect(page.locator('[data-testid="error-message"]')).toContainText('Internal server error');
      
      // Should allow retry
      await expect(page.locator('[data-testid="submit-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="submit-button"]')).not.toBeDisabled();
    });
  });

  test.describe('File Upload Process', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should handle file upload correctly', async ({ page }) => {
      // Create a test file
      const testFile = Buffer.from('Test file content');
      
      // Upload file
      const fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: 'test.pdf',
        mimeType: 'application/pdf',
        buffer: testFile
      });
      
      // Should show file name
      await expect(page.locator('[data-testid="file-name"]')).toBeVisible();
      await expect(page.locator('[data-testid="file-name"]')).toContainText('test.pdf');
      
      // Should show file size
      await expect(page.locator('[data-testid="file-size"]')).toBeVisible();
      
      // Submit form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'Test Subject');
      await page.fill('[data-testid="message-input"]', 'Test message content that meets requirements.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should submit successfully
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    });

    test('should handle multiple file uploads', async ({ page }) => {
      // Create multiple test files
      const files = Array.from({ length: 3 }, (_, i) => ({
        name: `file${i}.pdf`,
        mimeType: 'application/pdf',
        buffer: Buffer.from(`Content ${i}`)
      }));
      
      // Upload files
      const fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles(files);
      
      // Should show all file names
      await expect(page.locator('[data-testid="file-list"]')).toBeVisible();
      const fileCount = await page.locator('[data-testid="file-item"]').count();
      expect(fileCount).toBe(3);
      
      // Submit form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'Test Subject');
      await page.fill('[data-testid="message-input"]', 'Test message content that meets requirements.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should submit successfully
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    });

    test('should remove uploaded files', async ({ page }) => {
      // Upload a file first
      const testFile = Buffer.from('Test file content');
      const fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: 'test.pdf',
        mimeType: 'application/pdf',
        buffer: testFile
      });
      
      await expect(page.locator('[data-testid="file-item"]')).toHaveCount(1);
      
      // Remove file
      await page.click('[data-testid="remove-file"]');
      
      // File should be removed
      await expect(page.locator('[data-testid="file-item"]')).toHaveCount(0);
    });

    test('should validate file types', async ({ page }) => {
      // Try to upload invalid file type
      const invalidFile = Buffer.from('Test content');
      await fileInput.setInputFiles({
        name: 'test.txt',
        mimeType: 'text/plain',
        buffer: invalidFile
      });
      
      await page.click('[data-testid="submit-button"]');
      
      // Should show file type error
      await expect(page.locator('[data-testid="file-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="file-error"]')).toContainText('Invalid file type');
    });
  });

  test.describe('Category-specific Flows', () => {
    test('should handle product inquiry flow', async ({ page }) => {
      await page.goto('/en/contact/inquiry');
      
      // Select product category
      await page.selectOption('[data-testid="category-select"]', 'Product Information');
      
      // Should show product-specific fields
      await expect(page.locator('[data-testid="product-select"]')).toBeVisible();
      await expect(page.locator('[data-testid="product-type-select"]')).toBeVisible();
      
      // Select product
      await page.selectOption('[data-testid="product-select"]', 'Savings Account');
      await page.selectOption('[data-testid="product-type-select"]', 'Regular Savings');
      
      // Fill form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.fill('[data-testid="subject-input"]', 'Savings Account Inquiry');
      await page.fill('[data-testid="message-input"]', 'I am interested in opening a savings account with your bank. Please provide information about the current interest rates and any promotional offers available.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should submit successfully with product context
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
      
      // Should show product-specific confirmation
      await expect(page.locator('[data-testid="product-confirmation"]')).toBeVisible();
      await expect(page.locator('[data-testid="product-confirmation"]')).toContainText('Savings Account');
    });

    test('should handle complaint flow', async ({ page }) => {
      await page.goto('/en/contact/inquiry');
      
      // Select complaint category
      await page.selectOption('[data-testid="category-select"]', 'Complaint');
      
      // Should show complaint-specific fields
      await expect(page.locator('[data-testid="complaint-type-select"]')).toBeVisible();
      await expect(page.locator('[data-testid="urgency-select"]')).toBeVisible();
      await expect(page.locator('[data-testid="previous-reference-input"]')).toBeVisible();
      
      // Fill complaint form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="complaint-type-select"]', 'Service Issue');
      await page.selectOption('[data-testid="urgency-select"]', 'High');
      await page.fill('[data-testid="subject-input"]', 'ATM Transaction Issue');
      await page.fill('[data-testid="message-input"]', 'I am writing to complain about an ATM transaction that was declined but my account was debited. This happened on [date] at [time] at ATM location [location]. The amount was [amount] but I did not receive the cash. Please investigate this matter and refund my account.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should submit with high priority
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
      
      // Should show priority confirmation
      await expect(page.locator('[data-testid="priority-confirmation"]')).toBeVisible();
      await expect(page.locator('[data-testid="priority-confirmation"]')).toContainText('High priority');
    });

    test('should handle branch inquiry flow', async ({ page }) => {
      await page.goto('/en/contact/inquiry');
      
      // Select branch category
      await page.selectOption('[data-testid="category-select"]', 'Branch Services');
      
      // Should show branch-specific fields
      await expect(page.locator('[data-testid="branch-select"]')).toBeVisible();
      await page.selectOption('[data-testid="appointment-date-input"]')).toBeVisible();
      await page.selectOption('[data-testid="appointment-time-input"]')).toBeVisible();
      
      // Fill branch inquiry form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="branch-select"]', 'Main Branch');
      await page.fill('[data-testid="subject-input"]', 'Branch Visit Request');
      await page.fill('[data-testid="message-input"]', 'I would like to schedule an appointment to discuss opening a business account for my small business. I need information about the required documents, minimum balance requirements, and any special offers for new business accounts.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should submit successfully
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
      
      // Should show appointment confirmation
      await expect(page.locator('[data-testid="appointment-confirmation"]')).toBeVisible();
    });
  });

  test.describe('Progress Tracking', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should show loading state during submission', async ({ page }) => {
      // Mock slow response
      await page.route('**/api/inquiries', route => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({
                success: true,
                data: {
                  referenceNumber: 'INQ123456789'
                }
              })
            }));
          }, 2000); // 2 second delay
        });
      });
      
      // Fill and submit form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'Test Subject');
      await page.fill('[data-testid="message-input"]', 'Test message content that meets requirements.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should show loading state
      await expect(page.locator('[data-testid="submit-button"]')).toBeDisabled();
      await expect(page.locator('[data-testid="loading-spinner"]')).toBeVisible();
      
      // Should show loading message
      await expect(page.locator('[data-testid="loading-message"]')).toBeVisible();
      await expect(page.locator('[data-testid="loading-message"]')).toContainText('Submitting your inquiry...');
      
      // Should complete after loading
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
      await expect(page.locator('[data-testid="loading-spinner"]')).not.toBeVisible();
    });

    test('should track submission progress', async ({ page }) => {
      // Fill form step by step
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.waitForTimeout(500);
      
      // Should show progress indicator
      await expect(page.locator('[data-testid="progress-indicator"]')).toBeVisible();
      await expect(page.locator('[data-testid="progress-indicator"]')).toContainText('25%');
      
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.waitForTimeout(500);
      
      await expect(page.locator('[data-testid="progress-indicator"]')).toContainText('50%');
      
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.waitForTimeout(500);
      
      await expect(page.locator('[data-testid="progress-indicator"]')).toContainText('75%');
      
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.waitForTimeout(500);
      
      await expect(page.locator('[data-testid="progress-indicator"]')).toContainText('100%');
    });
  });

  test.describe('Error Recovery', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should allow retry after failed submission', async ({ page }) => {
      // Mock server error
      await page.route('**/api/inquiries', route => {
        return route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            error: 'Internal server error'
          })
        });
      });
      
      // Submit form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'Test Subject');
      await page.fill('[data-testid="message-input"]', 'Test message content that meets requirements.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should show error message
      await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
      
      // Should allow retry
      await expect(page.locator('[data-testid="submit-button"]')).not.toBeDisabled();
      
      // Fix the mock and retry
      await page.unroute('**/api/inquiries');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should succeed on retry
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    });

    test('should preserve form data during retry', async ({ page }) => {
      // Fill form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'Test Subject');
      await page.fill('[data-testid="message-input"]', 'Test message content that meets requirements.');
      
      // Mock error
      await page.route('**/api/inquiries', route => {
        return route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            error: 'Internal server error'
          })
        });
      });
      
      await page.click('[data-testid="submit-button"]');
      
      // Should show error
      await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
      
      // Form data should be preserved
      await expect(page.locator('[data-testid="name-input"]')).toHaveValue('Test User');
      await expect(page.locator('[data-testid="email-input"])).toHaveValue('test@example.com');
      await expect(page.locator('[data-testid="mobile-input"])).toHaveValue('9876543210');
    });
  });

  test.describe('Confirmation Flow', () => {
    test('should display confirmation details correctly', async ({ page }) => {
      // Submit valid inquiry
      await page.fill('[data-testid="name-input"]', 'John Doe');
      await page.fill('[data-testid="email-input"]', 'john.doe@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'Test Inquiry');
      await page.fill('[data-testid="message-input"]', 'This is a test inquiry message that meets the minimum character requirement for testing purposes.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should show confirmation page
      await page.waitForURL(/\/contact\/confirmation/);
      
      // Should display all details
      await expect(page.locator('[data-testid="confirmation-details"]')).toBeVisible();
      await expect(page.locator('[data-testid="confirmation-details"]')).toContainText('John Doe');
      await expect(page.locator('[data-testid="confirmation-details"]')).toContainText('john.doe@example.com');
      await expect(page.locator('[data-testid="confirmation-details"]')).toContainText('9876543210');
      await expect(page.locator('[data-testid="confirmation-details"]')).toContainText('General Inquiry');
      await expect(page.locator('[data-testid="confirmation-details"]')).toContainText('Test Inquiry');
    });

    test('should provide next steps information', async ({ page }) => {
      // Submit inquiry
      await page.fill('[data-testid="name-input"]', 'Jane Smith');
      await page.fill('[data-testid="email-input"]', 'jane.smith@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543211');
      await page.selectOption('[data-testid="category-select"]', 'Product Information');
      await page.fill('[data-testid="subject-input"]', 'Product Information Request');
      await page.fill('[data-testid="message-input"]', 'I would like to receive information about your current savings account products and interest rates.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should show next steps
      await expect(page.locator('[data-testid="next-steps"]')).toBeVisible();
      await expect(page.locator('[data-testid="next-steps"]')).toContainText('What happens next');
      await expect(page.locator('[data-testid="next-steps"]')).toContainText('Email confirmation');
      await expect(page.locator('[data-testid="next-steps"]')).toContainText('Response timeline');
    });

    test('should allow new inquiry submission', async ({ page }) => {
      // Submit first inquiry
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.fill('[data-testid="subject-input"]', 'First Inquiry');
      await page.fill('[data-testid="message-input"]', 'First test inquiry message that meets requirements.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should show confirmation
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
      
      // Should allow new inquiry
      await expect(page.locator('[data-testid="new-inquiry-button"]')).toBeVisible();
      
      // Click new inquiry
      await page.click('[data-testid="new-inquiry-button"]');
      
      // Should return to form
      await expect(page.locator('[data-testid="inquiry-form"]')).toBeVisible();
      
      // Form should be reset
      await expect(page.locator('[data-testid="name-input"]')).toHaveValue('');
      await expect(page.locator('[data-testid="email-input"])).toHaveValue('');
    });
  });
});
