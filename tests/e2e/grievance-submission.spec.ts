import { test, expect } from '@playwright/test';

test.describe('Grievance Submission Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/grievances');
  });

  test.describe('Form Accessibility and Structure', () => {
    test('should have proper heading and page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Grievance Form/);
      
      const mainHeading = page.locator('h1');
      await expect(mainHeading).toBeVisible();
      await expect(mainHeading).toContainText('File a Grievance');
    });

    test('should have all required form fields', async ({ page }) => {
      const form = page.locator('form');
      await expect(form).toBeVisible();
      
      // Check all required fields are present
      await expect(page.locator('input[name="fullName"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="mobileNumber"]')).toBeVisible();
      await expect(page.locator('select[name="complaintType"]')).toBeVisible();
      await expect(page.locator('select[name="complaintCategory"]')).toBeVisible();
      await expect(page.locator('textarea[name="description"]')).toBeVisible();
      await expect(page.locator('input[type="checkbox"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('should have proper form labels and placeholders', async ({ page }) => {
      // Check labels
      await expect(page.locator('label[for="fullName"]')).toContainText('Full Name');
      await expect(page.locator('label[for="email"]')).toContainText('Email');
      await expect(page.locator('label[for="mobileNumber"]')).toContainText('Mobile Number');
      await expect(page.locator('label[for="complaintType"]')).toContainText('Complaint Type');
      await expect(page.locator('label[for="complaintCategory"]')).toContainText('Complaint Category');
      await expect(page.locator('label[for="description"]')).toContainText('Description');
      
      // Check placeholders
      await expect(page.locator('input[name="fullName"]')).toHaveAttribute('placeholder', /Enter your full name/);
      await expect(page.locator('input[name="email"]')).toHaveAttribute('placeholder', /Enter your email address/);
      await expect(page.locator('input[name="mobileNumber"]')).toHaveAttribute('placeholder', /10-digit mobile number/);
      await expect(page.locator('textarea[name="description"]')).toHaveAttribute('placeholder', /Provide detailed description/);
    });

    test('should have proper ARIA attributes', async ({ page }) => {
      const form = page.locator('form');
      await expect(form).toHaveAttribute('role', 'form');
      
      // Check required fields have aria-required
      await expect(page.locator('input[name="fullName"]')).toHaveAttribute('aria-required', 'true');
      await expect(page.locator('input[name="mobileNumber"]')).toHaveAttribute('aria-required', 'true');
      await expect(page.locator('select[name="complaintType"]')).toHaveAttribute('aria-required', 'true');
      await expect(page.locator('select[name="complaintCategory"]')).toHaveAttribute('aria-required', 'true');
      await expect(page.locator('textarea[name="description"]')).toHaveAttribute('aria-required', 'true');
      
      // Check form fields have proper IDs
      await expect(page.locator('input[name="fullName"]')).toHaveAttribute('id', 'fullName');
      await expect(page.locator('input[name="email"]')).toHaveAttribute('id', 'email');
      await expect(page.locator('textarea[name="description"]')).toHaveAttribute('id', 'description');
    });
  });

  test.describe('Form Validation', () => {
    test('should validate required fields on submission', async ({ page }) => {
      const form = page.locator('form');
      const submitButton = page.locator('button[type="submit"]');
      
      // Try to submit empty form
      await submitButton.click();
      await page.waitForTimeout(1000);
      
      // Check for validation errors
      await expect(page.locator('input[name="fullName"] + ' + .error')).toBeVisible();
      await expect(page.locator('input[name="mobileNumber"] + ' + .error')).toBeVisible();
      await expect(page.locator('select[name="complaintType"] + ' + .error')).toBeVisible();
      await expect(page.locator('select[name="complaintCategory"] + ' + .error')).toBeVisible();
      await expect(page.locator('textarea[name="description"] + ' + .error')).toBeVisible();
      
      // Check error messages
      await expect(page.locator('input[name="fullName"] + ' + .error')).toContainText('Full name is required');
      await expect(page.locator('input[name="mobileNumber"] + ' + .error')).toContainText('Mobile number is required');
      await expect(page.locator('textarea[name="description"] + ' + .error')).toContainText('Description must be at least 50 characters');
    });

    test('should validate email format', async ({ page }) => {
      const form = page.locator('form');
      const submitButton = page.locator('button[type="submit"]');
      
      // Fill form with invalid email
      await page.fill('input[name="fullName"]', 'John Doe');
      await page.fill('input[name="mobileNumber"]', '9876543210');
      await page.fill('input[name="email"]', 'invalid-email');
      await page.selectOption('select[name="complaintType"]', 'service');
      await page.selectOption('select[name="complaintCategory"]', 'banking-services');
      await page.fill('textarea[name="description"]', 'This is a test grievance with sufficient length to pass validation. '.repeat(10));
      await page.check('input[type="checkbox"]');
      
      await submitButton.click();
      await page.waitForTimeout(1000);
      
      // Check email validation error
      await expect(page.locator('input[name="email"] + ' + .error')).toBeVisible();
      await expect(page.locator('input[name="email"] + ' + .error')).toContainText('Invalid email format');
    });

    test('should validate mobile number format', async ({ page }) => {
      const form = page.locator('form');
      const submitButton = page.locator('button[type="submit"]');
      
      // Fill form with invalid mobile number
      await page.fill('input[name="fullName"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="mobileNumber"]', '1234567890');
      await page.selectOption('select[name="complaintType"]', 'service');
      await page.selectOption('select[name="complaintCategory"]', 'banking-services');
      await page.fill('textarea[name="description"]', 'This is a test grievance with sufficient length to pass validation. '.repeat(10));
      await page.check('input[type="checkbox"]');
      
      await submitButton.click();
      await page.waitForTimeout(1000);
      
      // Check mobile validation error
      await expect(page.locator('input[name="mobileNumber"] + ' + .error')).toBeVisible();
      await expect(page.locator('input[name="mobileNumber"] + ' + .error')).toContainText('Invalid mobile number format');
    });

    test('should validate description length', async ({ page }) => {
      const form = page.locator('form');
      const submitButton = page.locator('button[type="submit"]');
      
      // Fill form with short description
      await page.fill('input[name="fullName"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="mobileNumber"]', '9876543210');
      await page.selectOption('select[name="complaintType"]', 'service');
      await page.selectOption('select[name="complaintCategory"]', 'banking-services');
      await page.fill('textarea[name="description"]', 'Short description');
      await page.check('input[type="checkbox"]');
      
      await submitButton.click();
      await page.waitForTimeout(1000);
      
      // Check description validation error
      await expect(page.locator('textarea[name="description"] + ' + .error')).toBeVisible();
      await expect(page.locator('textarea[name="description"] + ' + .error')).toContainText('Description must be at least 50 characters');
    });

    test('should validate consent checkbox', async ({ page }) => {
      const form = page.locator('form');
      const submitButton = page.locator('button[type="submit"]');
      
      // Fill form without checking consent
      await page.fill('input[name="fullName"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="mobileNumber"]', '9876543210');
      await page.selectOption('select[name="complaintType"]', 'service');
      await page.selectOption('select[name="complaintCategory"]', 'banking-services');
      await page.fill('textarea[name="description"]', 'This is a test grievance with sufficient length to pass validation. '.repeat(10));
      
      await submitButton.click();
      await page.waitForTimeout(1000);
      
      // Check consent validation error
      await expect(page.locator('input[type="checkbox"] + ' + .error')).toBeVisible();
      await expect(page.locator('input[type="checkbox"] + ' + .error')).toContainText('Consent is required');
    });

    test('should clear validation errors when corrected', async ({ page }) => {
      const form = page.locator('form');
      const submitButton = page.locator('button[type="submit"]');
      
      // Fill form with valid data
      await page.fill('input[name="fullName"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="mobileNumber"]', '9876543210');
      await page.selectOption('select[name="complaintType"]', 'service');
      await page.selectOption('select[name="complaintCategory"]', 'banking-services');
      await page.fill('textarea[name="description"]', 'This is a test grievance with sufficient length to pass validation. '.repeat(10));
      await page.check('input[type="checkbox"]');
      
      await submitButton.click();
      await page.waitForTimeout(2000);
      
      // Check that validation errors are cleared
      await expect(page.locator(`input[name="fullName"] + .error`)).not.toBeVisible();
      await expect(page.locator(`input[name="email"] + .error`)).not.toBeVisible();
      await expect(page.locator(`input[name="mobileNumber"] + .error`)).not.toBeVisible();
      await expect(page.locator(`textarea[name="description"] + .error`)).not.toBeVisible();
    });
  });

  test.describe('Form Submission', () => {
    test('should show loading state during submission', async ({ page }) => {
      const form = page.locator('form');
      const submitButton = page.locator('button[type="submit"]');
      
      // Fill form with valid data
      await page.fill('input[name="fullName"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="mobileNumber"]', '9876543210');
      await page.selectOption('select[name="complaintType"]', 'service');
      await page.selectOption('select[name="complaintCategory"]', 'banking-services');
      await page.fill('textarea[name="description"]', 'This is a test grievance with sufficient length to pass validation. '.repeat(10));
      await page.check('input[type="checkbox"]');
      
      // Submit form
      await submitButton.click();
      
      // Check loading state
      await expect(page.locator('.animate-spin')).toBeVisible();
      await expect(submitButton).toBeDisabled();
      await expect(submitButton).toContainText('Submitting...');
    });

    test('should show success message on successful submission', async ({ page }) => {
      const form = page.locator('form');
      const submitButton = page.locator('button[type="submit"]');
      
      // Fill form with valid data
      await page.fill('input[name="fullName"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="mobileNumber"]', '9876543210');
      await page.selectOption('select[name="complaintType"]', 'service');
      await page.selectOption('select[name="complaintCategory"]', 'banking-services');
      await page.fill('textarea[name="description"]', 'This is a test grievance with sufficient length to pass validation. '.repeat(10));
      await page.check('input[type="checkbox"]');
      
      await submitButton.click();
      
      // Wait for submission to complete
      await page.waitForTimeout(3000);
      
      // Check success message
      await expect(page.locator('.bg-green-50')).toBeVisible();
      await expect(page.locator('text-green-900')).toContainText('Grievance Submitted Successfully!');
      await expect(page.locator('text-green-700')).toContainText('Your grievance has been successfully submitted');
      await expect(page.locator('text-green-700')).toContainText('Reference Number:');
      
      // Check that reference number is generated
      const referenceNumber = page.locator('text-green-700').filter({ hasText: 'Reference Number:' }).first();
      await expect(referenceNumber).toContainText('GRV');
      
      // Check form is reset after successful submission
      await expect(page.locator('input[name="fullName"]')).toHaveValue('');
      await expect(page.locator('input[name="email"]')).toHaveValue('');
      await expect(page.locator('input[name="mobileNumber"]')).toHaveValue('');
      await expect(page.locator('textarea[name="description"]')).toHaveValue('');
      await expect(page.locator('input[type="checkbox"]')).not.toBeChecked();
    });

    test('should handle submission errors gracefully', async ({ page }) => {
      // Mock network error by intercepting the request
      await page.route('**/api/grievances', route => {
        return route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            error: 'Internal server error',
            message: 'Error submitting form'
          })
        });
      });
      
      const form = page.locator('form');
      const submitButton = page.locator('button[type="submit"]');
      
      // Fill form with valid data
      await page.fill('input[name="fullName"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="mobileNumber"]', '9876543210');
      await page.selectOption('select[name="complaintType"]', 'service');
      await page.selectOption('select[name="complaintCategory"]', 'banking-services');
      await page.fill('textarea[name="description"]', 'This is a test grievance with sufficient length to pass validation. '.repeat(10));
      await page.check('input[type="checkbox"]');
      
      await submitButton.click();
      await page.waitForTimeout(2000);
      
      // Check error message
      await expect(page.locator('.bg-red-50')).toBeVisible();
      await expect(page.locator('text-red-800')).toContainText('Error submitting form');
      
      // Check button is re-enabled
      await expect(submitButton).not.toBeDisabled();
    });
  });

  test.describe('Form Functionality', () => {
    test('should allow file attachments', async ({ page }) => {
      const fileInput = page.locator('input[type="file"]');
      await expect(fileInput).toBeVisible();
      await expect(fileInput).toHaveAttribute('multiple');
      await expect(fileInput).toHaveAttribute('accept', '.pdf,.doc,.docx,.jpg,.jpeg,.png');
      
      // Check file upload help text
      await expect(page.locator('text-sm')).toContainText('PDF, DOC, DOCX, JPG, JPEG, PNG files');
      await expect(page.locator('text-sm')).toContainText('Max 5MB per file, max 10 files');
    });

    test('should have optional fields working correctly', async ({ page }) => {
      // Account number should be optional
      const accountNumber = page.locator('input[name="accountNumber"]');
      await expect(accountNumber).toBeVisible();
      
      // Should be able to submit without account number
      await page.fill('input[name="fullName"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="mobileNumber"]', '9876543210');
      await page.selectOption('select[name="complaintType"]', 'service');
      await page.selectOption('select[name="complaintCategory"]', 'banking-services');
      await page.fill('textarea[name="description"]', 'This is a test grievance with sufficient length to pass validation. '.repeat(10));
      await page.check('input[type="checkbox"]');
      
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
      await page.waitForTimeout(2000);
      
      await expect(page.locator('.bg-green-50')).toBeVisible();
    });

    test('should have priority selection working', async ({ page }) => {
      const prioritySelect = page.locator('select[name="priority"]');
      await expect(prioritySelect).toBeVisible();
      
      // Check all priority options are available
      const options = await prioritySelect.locator('option').all();
      const optionValues = await Promise.all(options.map(option => option.getAttribute('value')));
      expect(optionValues).toContain('low');
      expect(optionValues).toContain('medium');
      expect(optionValues).toContain('high');
      
      // Should be able to select different priorities
      await prioritySelect.selectOption({ value: 'high' });
      await expect(prioritySelect).toHaveValue('high');
    });

    test('should have complaint type and category working', async ({ page }) => {
      const complaintTypeSelect = page.locator('select[name="complaintType"]');
      const complaintCategorySelect = page.locator('select[name="complaintCategory"]');
      
      await expect(complaintTypeSelect).toBeVisible();
      await expect(complaintCategorySelect).toBeVisible();
      
      // Check complaint type options
      const typeOptions = await complaintTypeSelect.locator('option').all();
      const typeValues = await Promise.all(typeOptions.map(option => option.getAttribute('value')));
      expect(typeValues).toContain('service');
      expect(typeValues).toContain('transaction');
      expect(typeValues).toContain('account');
      expect(typeValues).toContain('atm');
      expect(typeValues).toContain('digital');
      expect(typeValues).toContain('staff');
      
      // Check complaint category options
      const categoryOptions = await complaintCategorySelect.locator('option').all();
      const categoryValues = await Promise.all(categoryOptions.map(option => option.getAttribute('value')));
      expect(categoryValues).toContain('banking-services');
      expect(categoryValues).toContain('loan-services');
      expect(categoryValues).toContain('deposit-services');
      expect(categoryValues).toContain('card-services');
      expect(categoryValues).toContain('online-banking');
      expect(categoryValues).toContain('branch-services');
    });
  });

  test.describe('Form Accessibility', () => {
    test('should be keyboard navigable', async ({ page }) => {
      const form = page.locator('form');
      
      // Tab through form fields
      await page.keyboard.press('Tab');
      await expect(page.locator('input[name="fullName"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('input[name="email"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('input[name="mobileNumber"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('select[name="complaintType"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('select[name="complaintCategory"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('textarea[name="description"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('input[type="checkbox"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('button[type="submit"]')).toBeFocused();
    });

    test('should have proper focus management', async ({ page }) => {
      const fullNameInput = page.locator('input[name="fullName"]');
      const emailInput = page.locator('input[name="email"]');
      
      // Focus on first field
      await fullNameInput.focus();
      await expect(fullNameInput).toBeFocused();
      
      // Click on second field
      await emailInput.click();
      await expect(emailInput).toBeFocused();
      await expect(fullNameInput).not.toBeFocused();
      
      // Focus should be visible
      await expect(fullNameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
    });

    test('should have proper color contrast', async ({ page }) => {
      const submitButton = page.locator('button[type="submit"]');
      const requiredFields = page.locator('input[aria-required="true"], select[aria-required="true"], textarea[aria-required="true"]');
      
      // Check button has sufficient contrast
      const buttonStyles = await submitButton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      });
      
      expect(buttonStyles.backgroundColor).not.toBe('rgb(255, 255, 255)'); // Not white on white
      expect(buttonStyles.color).not.toBe('rgb(128, 128, 128)'); // Not gray on gray
      
      // Check required fields have indicators
      const firstRequiredField = requiredFields.first();
      const fieldStyles = await firstRequiredField.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          borderColor: styles.borderColor
        };
      });
      
      // Should have visible border indication for required fields
      expect(fieldStyles.borderColor).not.toBe('rgb(128, 128, 128)'); // Not gray
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check form is accessible on mobile
      const form = page.locator('form');
      await expect(form).toBeVisible();
      
      // Check all fields are visible and properly sized
      await expect(page.locator('input[name="fullName"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="mobileNumber"]')).toBeVisible();
      await expect(page.locator('select[name="complaintType"]')).toBeVisible();
      await expect(page.locator('textarea[name="description"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
      
      // Check mobile-specific layout adjustments
      const formContainer = page.locator('.bg-white.rounded-lg');
      const containerStyles = await formContainer.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          padding: styles.padding,
          fontSize: styles.fontSize
        };
      });
      
      // Should have appropriate padding for mobile
      expect(containerStyles.padding).toContain('16px');
    });

    test('should work on tablet devices', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Check form layout on tablet
      const form = page.locator('form');
      await expect(form).toBeVisible();
      
      // Check grid layout is working
      const gridContainer = page.locator('.grid.grid-cols-1');
      const gridStyles = await gridContainer.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display
        };
      });
      
      // Should use grid layout on tablet
      expect(gridStyles.display).toContain('grid');
    });
  });
});
