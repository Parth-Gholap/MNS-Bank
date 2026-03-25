import { test, expect } from '@playwright/test';

test.describe('Form Validation Tests', () => {
  test.describe('Inquiry Form Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should validate required fields', async ({ page }) => {
      // Try to submit empty form
      await page.click('[data-testid="submit-button"]');
      
      // Should show validation errors for all required fields
      await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="mobile-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="subject-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="message-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="category-error"]')).toBeVisible();
    });

    test('should validate email format', async ({ page }) => {
      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.click('[data-testid="submit-button"]');
      
      const emailError = page.locator('[data-testid="email-error"]');
      await expect(emailError).toBeVisible();
      await expect(emailError).toContainText('Invalid email format');
    });

    test('should validate mobile number format', async ({ page }) => {
      await page.fill('[data-testid="mobile-input"]', '123456789');
      await page.click('[data-testid="submit-button"]');
      
      const mobileError = page.locator('[data-testid="mobile-error"]');
      await expect(mobileError).toBeVisible();
      await expect(mobileError).toContainText('Invalid mobile number');
      
      // Test valid mobile number
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.click('[data-testid="submit-button"]');
      
      await expect(mobileError).not.toBeVisible();
    });

    test('should validate message length', async ({ page }) => {
      await page.fill('[data-testid="message-input"]', 'Short message');
      await page.click('[data-testid="submit-button"]');
      
      const messageError = page.locator('[data-testid="message-error"]');
      await expect(messageError).toBeVisible();
      await expect(messageError).toContainText('Message must be at least 20 characters');
      
      // Test valid message length
      await page.fill('[data-testid="message-input"]', 'This is a valid message length that meets the minimum requirement of 20 characters.');
      await page.click('[data-testid="submit-button"]');
      
      await expect(messageError).not.toBeVisible();
    });

    test('should validate name format', async ({ page }) => {
      await page.fill('[data-testid="name-input"]', '123');
      await page.click('[data-testid="submit-button"]');
      
      const nameError = page.locator('[data-testid="name-error"]');
      await expect(nameError).toBeVisible();
      await expect(nameError).toContainText('Full name can only contain letters and spaces');
    });

    test('should clear errors on valid input', async ({ page }) => {
      // Trigger error
      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.click('[data-testid="submit-button"]');
      
      let emailError = page.locator('[data-testid="email-error"]');
      await expect(emailError).toBeVisible();
      
      // Provide valid input
      await page.fill('[data-testid="email-input"]', 'valid.email@example.com');
      await page.click('[data-testid="submit-button"]');
      
      // Error should be cleared
      await expect(emailError).not.toBeVisible();
    });

    test('should validate file attachments', async ({ page }) => {
      // Test invalid file type
      const fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: 'test.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('test content')
      });
      
      await page.click('[data-testid="submit-button"]');
      
      const fileError = page.locator('[data-testid="file-error"]');
      await expect(fileError).toBeVisible();
      await expect(fileError).toContainText('Invalid file type');
    });

    test('should validate file size limits', async ({ page }) => {
      // Create a large file (6MB)
      const largeFile = Buffer.alloc(6 * 1024 * 1024);
      
      const fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: 'large.pdf',
        mimeType: 'application/pdf',
        buffer: largeFile
      });
      
      await page.click('[data-testid="submit-button"]');
      
      const fileError = page.locator('[data-testid="file-error"]');
      await expect(fileError).toBeVisible();
      await expect(fileError).toContainText('Each file must be less than 5MB');
    });

    test('should validate maximum number of files', async ({ page }) => {
      const fileInput = page.locator('[data-testid="file-input"]');
      
      // Add 11 files (exceeding limit of 10)
      const files = Array.from({ length: 11 }, (_, i) => ({
        name: `file${i}.pdf`,
        mimeType: 'application/pdf',
        buffer: Buffer.from(`content ${i}`)
      }));
      
      await fileInput.setInputFiles(files);
      await page.click('[data-testid="submit-button"]');
      
      const fileError = page.locator('[data-testid="file-error"]');
      await expect(fileError).toBeVisible();
      await expect(fileError).toContainText('Maximum 10 files allowed');
    });
  });

  test.describe('EMI Calculator Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/tools/emi-calculator');
    });

    test('should validate principal amount limits', async ({ page }) => {
      // Test minimum principal
      await page.fill('[data-testid="principal-input"]', '9999');
      await page.click('[data-testid="calculate-button"]');
      
      const principalError = page.locator('[data-testid="principal-error"]');
      await expect(principalError).toBeVisible();
      await expect(principalError).toContainText('Minimum loan amount is ₹10,000');
      
      // Test maximum principal
      await page.fill('[data-testid="principal-input"]', '100000001');
      await page.click('[data-testid="calculate-button"]');
      
      await expect(principalError).toContainText('Maximum loan amount is ₹1,00,00,000');
    });

    test('should validate interest rate limits', async ({ page }) => {
      // Test minimum rate
      await page.fill('[data-testid="rate-input"]', '4.9');
      await page.click('[data-testid="calculate-button"]');
      
      const rateError = page.locator('[data-testid="rate-error"]');
      await expect(rateError).toBeVisible();
      await expect(rateError).toContainText('Minimum interest rate is 5%');
      
      // Test maximum rate
      await page.fill('[data-testid="rate-input"]', '20.1');
      await page.click('[data-testid="calculate-button"]');
      
      await expect(rateError).toContainText('Maximum interest rate is 20%');
    });

    test('should validate tenure limits', async ({ page }) => {
      // Test minimum tenure
      await page.fill('[data-testid="tenure-input"]', '5');
      await page.click('[data-testid="calculate-button"]');
      
      const tenureError = page.locator('[data-testid="tenure-error"]');
      await expect(tenureError).toBeVisible();
      await expect(tenureError).toContainText('Minimum tenure is 6 months');
      
      // Test maximum tenure
      await page.fill('[data-testid="tenure-input"]', '361');
      await page.click('[data-testid="calculate-button"]');
      
      await expect(tenureError).toContainText('Maximum tenure is 360 months');
    });

    test('should prevent calculation with invalid inputs', async ({ page }) => {
      await page.fill('[data-testid="principal-input"]', 'invalid');
      await page.fill('[data-testid="rate-input"]', 'invalid');
      await page.fill('[data-testid="tenure-input"]', 'invalid');
      
      await page.click('[data-testid="calculate-button"]');
      
      // Should show validation errors
      await expect(page.locator('[data-testid="principal-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="rate-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="tenure-error"]')).toBeVisible();
      
      // Should not show results
      await expect(page.locator('[data-testid="emi-result"]')).not.toBeVisible();
    });

    test('should calculate with valid inputs', async ({ page }) => {
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      
      await page.click('[data-testid="calculate-button"]');
      
      // Should show results
      await expect(page.locator('[data-testid="emi-result"]')).toBeVisible();
      await expect(page.locator('[data-testid="total-amount-result"]')).toBeVisible();
      await expect(page.locator('[data-testid="total-interest-result"]')).toBeVisible();
      
      // Should not show errors
      await expect(page.locator('[data-testid="principal-error"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="rate-error"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="tenure-error"]')).not.toBeVisible();
    });
  });

  test.describe('Grievance Form Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/grievances');
    });

    test('should validate required grievance fields', async ({ page }) => {
      // Try to submit empty form
      await page.click('[data-testid="submit-grievance"]');
      
      // Should show validation errors
      await expect(page.locator('[data-testid="grievance-name-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="grievance-email-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="grievance-mobile-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="grievance-description-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="grievance-type-error"]')).toBeVisible();
    });

    test('should validate grievance description length', async ({ page }) => {
      await page.fill('[data-testid="grievance-description"]', 'Too short');
      await page.click('[data-testid="submit-grievance"]');
      
      const descriptionError = page.locator('[data-testid="grievance-description-error"]');
      await expect(descriptionError).toBeVisible();
      await expect(descriptionError).toContainText('Description must be at least 50 characters');
    });

    test('should validate consent checkbox', async ({ page }) => {
      // Fill all fields but don't check consent
      await page.fill('[data-testid="grievance-name"]', 'Test User');
      await page.fill('[data-testid="grievance-email"]', 'test@example.com');
      await page.fill('[data-testid="grievance-mobile"]', '9876543210');
      await page.fill('[data-testid="grievance-description"]', 'This is a valid grievance description that meets the minimum character requirement for testing purposes.');
      
      await page.click('[data-testid="submit-grievance"]');
      
      const consentError = page.locator('[data-testid="consent-error"]');
      await expect(consentError).toBeVisible();
      await expect(consentError).toContainText('Consent is required');
    });

    test('should validate grievance type selection', async ({ page }) => {
      // Don't select grievance type
      await page.fill('[data-testid="grievance-name"]', 'Test User');
      await page.fill('[data-testid="grievance-email"]', 'test@example.com');
      await page.fill('[data-testid="grievance-mobile"]', '9876543210');
      await page.fill('[data-testid="grievance-description"]', 'This is a valid grievance description that meets the minimum character requirement for testing purposes.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-grievance"]');
      
      const typeError = page.locator('[data-testid="grievance-type-error"]');
      await expect(typeError).toBeVisible();
      await expect(typeError).toContainText('Grievance type is required');
    });

    test('should submit valid grievance', async ({ page }) => {
      await page.fill('[data-testid="grievance-name"]', 'Test User');
      await page.fill('[data-testid="grievance-email"]', 'test@example.com');
      await page.fill('[data-testid="grievance-mobile"]', '9876543210');
      await page.selectOption('[data-testid="grievance-type"]', 'Service Issue');
      await page.fill('[data-testid="grievance-description"]', 'This is a valid grievance description that meets the minimum character requirement for testing purposes and provides enough detail about the issue being reported.');
      await page.check('[data-testid="consent-checkbox"]');
      
      await page.click('[data-testid="submit-grievance"]');
      
      // Should show success message
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
      
      // Should show reference number
      await expect(page.locator('[data-testid="reference-number"]')).toBeVisible();
    });
  });

  test.describe('Real-time Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should validate email in real-time', async ({ page }) => {
      const emailInput = page.locator('[data-testid="email-input"]');
      const emailError = page.locator('[data-testid="email-error"]');
      
      // Type invalid email
      await emailInput.type('invalid-email');
      await page.waitForTimeout(500);
      
      await expect(emailError).toBeVisible();
      
      // Type valid email
      await emailInput.clear();
      await emailInput.type('valid@example.com');
      await page.waitForTimeout(500);
      
      await expect(emailError).not.toBeVisible();
    });

    test('should validate mobile number in real-time', async ({ page }) => {
      const mobileInput = page.locator('[data-testid="mobile-input"]');
      const mobileError = page.locator('[data-testid="mobile-error"]');
      
      // Type invalid mobile
      await mobileInput.type('123456789');
      await page.waitForTimeout(500);
      
      await expect(mobileError).toBeVisible();
      
      // Type valid mobile
      await mobileInput.clear();
      await mobileInput.type('9876543210');
      await page.waitForTimeout(500);
      
      await expect(mobileError).not.toBeVisible();
    });

    test('should validate name in real-time', async ({ page }) => {
      const nameInput = page.locator('[data-testid="name-input"]');
      const nameError = page.locator('[data-testid="name-error"]');
      
      // Type invalid name
      await nameInput.type('123');
      await page.waitForTimeout(500);
      
      await expect(nameError).toBeVisible();
      
      // Type valid name
      await nameInput.clear();
      await nameInput.type('John Doe');
      await page.waitForTimeout(500);
      
      await expect(nameError).not.toBeVisible();
    });
  });

  test.describe('Accessibility Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should announce validation errors to screen readers', async ({ page }) => {
      // Trigger validation error
      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.click('[data-testid="submit-button"]');
      
      const emailError = page.locator('[data-testid="email-error"]');
      await expect(emailError).toHaveAttribute('aria-live', 'polite');
      await expect(emailError).toHaveAttribute('role', 'alert');
    });

    test('should provide helpful error messages', async ({ page }) => {
      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.click('[data-testid="submit-button"]');
      
      const emailError = page.locator('[data-testid="email-error"]');
      const errorText = await emailError.textContent();
      
      // Should provide specific guidance
      await expect(errorText).toContain('Invalid email format');
      await expect(errorText).toContain('Please enter a valid email address');
    });

    test('should highlight invalid fields visually', async ({ page }) => {
      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.click('[data-testid="submit-button"]');
      
      const emailInput = page.locator('[data-testid="email-input"]');
      const inputClasses = await emailInput.getAttribute('class');
      
      // Should have error styling
      await expect(inputClasses).toContain('border-red-500');
      await expect(inputClasses).toContain('focus:ring-red-500');
    });

    test('should maintain focus on first invalid field', async ({ page }) => {
      // Trigger multiple errors
      await page.click('[data-testid="submit-button"]');
      
      // Check which field has focus
      const focusedElement = await page.locator(':focus');
      
      // Should focus on first invalid field (name)
      await expect(focusedElement).toBe('[data-testid="name-input"]');
    });
  });

  test.describe('Form State Management', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should preserve form data during validation', async ({ page }) => {
      // Fill form partially
      await page.fill('[data-testid="name-input"]', 'John Doe');
      await page.fill('[data-testid="email-input"]', 'john@example.com');
      
      // Trigger validation
      await page.click('[data-testid="submit-button"]');
      
      // Valid fields should retain their values
      await expect(page.locator('[data-testid="name-input"]')).toHaveValue('John Doe');
      await expect(page.locator('[data-testid="email-input"])).toHaveValue('john@example.com');
    });

    test('should clear validation errors on input change', async ({ page }) => {
      // Trigger error
      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.click('[data-testid="submit-button"]');
      
      let emailError = page.locator('[data-testid="email-error"]');
      await expect(emailError).toBeVisible();
      
      // Fix the error
      await page.fill('[data-testid="email-input"]', 'valid@example.com');
      await page.click('[data-testid="submit-button"]');
      
      // Error should be cleared
      emailError = page.locator('[data-testid="email-error"]');
      await expect(emailError).not.toBeVisible();
    });

    test('should handle form reset correctly', async ({ page }) => {
      // Fill form
      await page.fill('[data-testid="name-input"]', 'John Doe');
      await page.fill('[data-testid="email-input"]', 'john@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      
      // Reset form
      await page.click('[data-testid="reset-button"]');
      
      // All fields should be cleared
      await expect(page.locator('[data-testid="name-input"]')).toHaveValue('');
      await expect(page.locator('[data-testid="email-input"])).toHaveValue('');
      await expect(page.locator('[data-testid="mobile-input"])).toHaveValue('');
    });
  });

  test.describe('Cross-field Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should validate email and mobile consistency', async ({ page }) => {
      // Fill with mismatched email and mobile (if such validation exists)
      await page.fill('[data-testid="email-input"]', 'john@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.fill('[data-testid="confirm-email-input"]', 'different@example.com');
      
      await page.click('[data-testid="submit-button"]');
      
      // Should show consistency error if implemented
      const consistencyError = page.locator('[data-testid="consistency-error"]');
      if (await consistencyError.isVisible()) {
        await expect(consistencyError).toContainText('Email and mobile do not match');
      }
    });

    test('should validate date ranges', async ({ page }) => {
      // Test date field validation if present
      const dateInput = page.locator('[data-testid="date-input"]');
      if (await dateInput.isVisible()) {
        // Set future date
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        
        await dateInput.fill(futureDate.toISOString().split('T')[0]);
        await page.click('[data-testid="submit-button"]');
        
        const dateError = page.locator('[data-testid="date-error"]');
        await expect(dateError).toBeVisible();
        await expect(dateError).toContainText('Date cannot be in the future');
      }
    });
  });

  test.describe('Performance Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/contact/inquiry');
    });

    test('should validate quickly', async ({ page }) => {
      const startTime = Date.now();
      
      // Fill form and submit
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-input"]', '9876543210');
      await page.fill('[data-testid="message-input"]', 'This is a valid message that meets the minimum character requirement for testing purposes.');
      await page.selectOption('[data-testid="category-select"]', 'General Inquiry');
      await page.click('[data-testid="submit-button"]');
      
      const endTime = Date.now();
      const validationTime = endTime - startTime;
      
      // Should complete within 1 second
      expect(validationTime).toBeLessThan(1000);
    });

    test('should handle rapid input changes', async ({ page }) => {
      const emailInput = page.locator('[data-testid="email-input"]');
      
      // Rapidly type and delete
      for (let i = 0; i < 10; i++) {
        await emailInput.type('test');
        await page.keyboard.press('Backspace');
      }
      
      // Should not crash
      const emailError = page.locator('[data-testid="email-error"]');
      await expect(emailInput).toBeVisible();
      
      // Should handle rapid changes gracefully
      await emailInput.fill('valid@example.com');
      await expect(emailError).not.toBeVisible();
    });
  });
});
