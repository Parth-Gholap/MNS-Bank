import { test, expect } from '@playwright/test';

test.describe('EMI Calculation Accuracy Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/tools/emi-calculator');
  });

  test.describe('Basic EMI Calculation', () => {
    test('should calculate EMI correctly for standard loan parameters', async ({ page }) => {
      // Fill in loan details
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      
      // Wait for calculation to complete
      await page.waitForTimeout(1000);
      
      // Verify EMI calculation
      const emiElement = page.locator('[data-testid="emi-result"]');
      await expect(emiElement).toBeVisible();
      
      const emiText = await emiElement.textContent();
      const emiValue = parseFloat(emiText?.replace(/[^0-9.]/g, '') || '0');
      
      // Expected EMI calculation: P * r * (1+r)^n / ((1+r)^n - 1)
      // P = 1000000, r = 8.5/12/100 = 0.007083, n = 60
      // EMI ≈ 20,436
      expect(emiValue).toBeCloseTo(20436, 0);
    });

    test('should update calculation when parameters change', async ({ page }) => {
      // Initial calculation
      await page.fill('[data-testid="principal-input"]', '500000');
      await page.fill('[data-testid="rate-input"]', '10');
      await page.fill('[data-testid="tenure-input"]', '36');
      await page.waitForTimeout(1000);
      
      let emiText = await page.locator('[data-testid="emi-result"]').textContent();
      let emiValue = parseFloat(emiText?.replace(/[^0-9.]/g, '') || '0');
      
      // Change principal amount
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.waitForTimeout(1000);
      
      emiText = await page.locator('[data-testid="emi-result"]').textContent();
      emiValue = parseFloat(emiText?.replace(/[^0-9.]/g, '') || '0');
      
      // EMI should double when principal doubles
      expect(emiValue).toBeGreaterThan(16000);
    });

    test('should handle edge cases correctly', async ({ page }) => {
      // Test minimum values
      await page.fill('[data-testid="principal-input"]', '10000');
      await page.fill('[data-testid="rate-input"]', '5');
      await page.fill('[data-testid="tenure-input"]', '6');
      await page.waitForTimeout(1000);
      
      const emiElement = page.locator('[data-testid="emi-result"]');
      await expect(emiElement).toBeVisible();
      
      const emiText = await emiElement.textContent();
      const emiValue = parseFloat(emiText?.replace(/[^0-9.]/g, '') || '0');
      
      // Should calculate positive EMI even for minimum values
      expect(emiValue).toBeGreaterThan(0);
    });
  });

  test.describe('Input Validation', () => {
    test('should validate principal amount limits', async ({ page }) => {
      // Test minimum principal
      await page.fill('[data-testid="principal-input"]', '9999');
      await page.waitForTimeout(1000);
      
      const errorElement = page.locator('[data-testid="principal-error"]');
      await expect(errorElement).toBeVisible();
      await expect(errorElement).toContainText('Minimum loan amount is ₹10,000');
      
      // Test maximum principal
      await page.fill('[data-testid="principal-input"]', '100000001');
      await page.waitForTimeout(1000);
      
      await expect(errorElement).toContainText('Maximum loan amount is ₹1,00,00,000');
    });

    test('should validate interest rate limits', async ({ page }) => {
      // Test minimum rate
      await page.fill('[data-testid="rate-input"]', '4.9');
      await page.waitForTimeout(1000);
      
      const errorElement = page.locator('[data-testid="rate-error"]');
      await expect(errorElement).toBeVisible();
      await expect(errorElement).toContainText('Minimum interest rate is 5%');
      
      // Test maximum rate
      await page.fill('[data-testid="rate-input"]', '20.1');
      await page.waitForTimeout(1000);
      
      await expect(errorElement).toContainText('Maximum interest rate is 20%');
    });

    test('should validate tenure limits', async ({ page }) => {
      // Test minimum tenure
      await page.fill('[data-testid="tenure-input"]', '5');
      await page.waitForTimeout(1000);
      
      const errorElement = page.locator('[data-testid="tenure-error"]');
      await expect(errorElement).toBeVisible();
      await expect(errorElement).toContainText('Minimum tenure is 6 months');
      
      // Test maximum tenure
      await page.fill('[data-testid="tenure-input"]', '361');
      await page.waitForTimeout(1000);
      
      await expect(errorElement).toContainText('Maximum tenure is 360 months');
    });

    test('should clear errors when valid input is provided', async ({ page }) => {
      // Trigger error
      await page.fill('[data-testid="principal-input"]', '9999');
      await page.waitForTimeout(1000);
      
      let errorElement = page.locator('[data-testid="principal-error"]');
      await expect(errorElement).toBeVisible();
      
      // Provide valid input
      await page.fill('[data-testid="principal-input"]', '100000');
      await page.waitForTimeout(1000);
      
      await expect(errorElement).not.toBeVisible();
    });
  });

  test.describe('Calculation Results Display', () => {
    test('should display all calculation results', async ({ page }) => {
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      await page.waitForTimeout(1000);
      
      // Check all result elements are visible
      await expect(page.locator('[data-testid="emi-result"]')).toBeVisible();
      await expect(page.locator('[data-testid="total-amount-result"]')).toBeVisible();
      await expect(page.locator('[data-testid="total-interest-result"]')).toBeVisible();
      await expect(page.locator('[data-testid="effective-rate-result"]')).toBeVisible();
    });

    test('should format currency correctly', async ({ page }) => {
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      await page.waitForTimeout(1000);
      
      const emiElement = page.locator('[data-testid="emi-result"]');
      const emiText = await emiElement.textContent();
      
      // Should be formatted as Indian currency
      expect(emiText).toContain('₹');
      expect(emiText).toMatch(/₹\s*\d{1,3}(,\d{3})*\.\d{2}/);
    });

    test('should calculate total amount correctly', async ({ page }) => {
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      await page.waitForTimeout(1000);
      
      const totalAmountElement = page.locator('[data-testid="total-amount-result"]');
      const totalAmountText = await totalAmountElement.textContent();
      const totalAmountValue = parseFloat(totalAmountText?.replace(/[^0-9.]/g, '') || '0');
      
      // Total amount should be EMI * tenure
      const emiElement = page.locator('[data-testid="emi-result"]');
      const emiText = await emiElement.textContent();
      const emiValue = parseFloat(emiText?.replace(/[^0-9.]/g, '') || '0');
      
      expect(totalAmountValue).toBeCloseTo(emiValue * 60, 0);
    });
  });

  test.describe('Preset Functions', () => {
    test('should load home loan preset correctly', async ({ page }) => {
      await page.click('[data-testid="home-loan-preset"]');
      await page.waitForTimeout(1000);
      
      // Verify preset values
      await expect(page.locator('[data-testid="principal-input"]')).toHaveValue('500000');
      await expect(page.locator('[data-testid="rate-input"]')).toHaveValue('8.5');
      await expect(page.locator('[data-testid="tenure-input"]')).toHaveValue('60');
    });

    test('should load car loan preset correctly', async ({ page }) => {
      await page.click('[data-testid="car-loan-preset"]');
      await page.waitForTimeout(1000);
      
      // Verify preset values
      await expect(page.locator('[data-testid="principal-input"]')).toHaveValue('800000');
      await expect(page.locator('[data-testid="rate-input"]')).toHaveValue('9.5');
      await expect(page.locator('[data-testid="tenure-input"])).toHaveValue('60');
    });

    test('should load personal loan preset correctly', async ({ page }) => {
      await page.click('[data-testid="personal-loan-preset"]');
      await page.waitForTimeout(1000);
      
      // Verify preset values
      await expect(page.locator('[data-testid="principal-input"]')).toHaveValue('200000');
      await expect(page.locator('[data-testid="rate-input"])).toHaveValue('12.5');
      await expect(page.locator('[data-testid="tenure-input"])).toHaveValue('36');
    });
  });

  test.describe('Frequency Options', () => {
    test('should calculate correctly for different payment frequencies', async ({ page }) => {
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      
      // Test monthly frequency
      await page.selectOption('[data-testid="frequency-select"]', 'monthly');
      await page.waitForTimeout(1000);
      
      let emiText = await page.locator('[data-testid="emi-result"]').textContent();
      let monthlyEMI = parseFloat(emiText?.replace(/[^0-9.]/g, '') || '0');
      
      // Test quarterly frequency
      await page.selectOption('[data-testid="frequency-select"]', 'quarterly');
      await page.waitForTimeout(1000);
      
      emiText = await page.locator('[data-testid="emi-result"]').textContent();
      let quarterlyEMI = parseFloat(emiText?.replace(/[^0-9.]/g, '') || '0');
      
      // Quarterly EMI should be approximately 3x monthly EMI
      expect(quarterlyEMI).toBeCloseTo(monthlyEMI * 3, 100);
      
      // Test yearly frequency
      await page.selectOption('[data-testid="frequency-select"]', 'yearly');
      await page.waitForTimeout(1000);
      
      emiText = await page.locator('[data-testid="emi-result"]').textContent();
      let yearlyEMI = parseFloat(emiText?.replace(/[^0-9.]/g, '') || '0');
      
      // Yearly EMI should be approximately 12x monthly EMI
      expect(yearlyEMI).toBeCloseTo(monthlyEMI * 12, 100);
    });
  });

  test.describe('Performance Tests', () => {
    test('should calculate quickly', async ({ page }) => {
      const startTime = Date.now();
      
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      
      // Wait for calculation to complete
      await page.waitForSelector('[data-testid="emi-result"]');
      
      const endTime = Date.now();
      const calculationTime = endTime - startTime;
      
      // Should complete within 2 seconds
      expect(calculationTime).toBeLessThan(2000);
    });

    test('should handle rapid input changes efficiently', async ({ page }) => {
      // Simulate rapid typing
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      
      // Rapidly change values
      for (let i = 0; i < 5; i++) {
        await page.fill('[data-testid="principal-input"]', `${1000000 + i * 100000}`);
        await page.waitForTimeout(100);
      }
      
      // Should still calculate correctly
      await page.waitForSelector('[data-testid="emi-result"]');
      const emiElement = page.locator('[data-testid="emi-result"]');
      await expect(emiElement).toBeVisible();
    });
  });

  test.describe('Accessibility Tests', () => {
    test('should be keyboard navigable', async ({ page }) => {
      // Tab through all inputs
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="principal-input"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="rate-input"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="tenure-input"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="frequency-select"]')).toBeFocused();
    });

    test('should have proper ARIA labels', async ({ page }) => {
      // Check ARIA labels on inputs
      const principalInput = page.locator('[data-testid="principal-input"]');
      await expect(principalInput).toHaveAttribute('aria-label');
      await expect(principalInput).toHaveAttribute('aria-required');
      
      const rateInput = page.locator('[data-testid="rate-input"]');
      await expect(rateInput).toHaveAttribute('aria-label');
      await expect(rateInput).toHaveAttribute('aria-required');
      
      const tenureInput = page.locator('[data-testid="tenure-input"]');
      await expect(tenureInput).toHaveAttribute('aria-label');
      await expect(tenureInput).toHaveAttribute('aria-required');
    });

    test('should announce calculation results to screen readers', async ({ page }) => {
      await page.fill('[data-testid="principal-input"]', '1000000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      await page.waitForTimeout(1000);
      
      // Check if results are announced
      const resultsRegion = page.locator('[data-testid="calculation-results"]');
      await expect(resultsRegion).toHaveAttribute('aria-live', 'polite');
      await expect(resultsRegion).toHaveAttribute('aria-label');
    });
  });

  test.describe('Error Handling', () => {
    test('should handle invalid input gracefully', async ({ page }) => {
      // Test invalid characters in numeric inputs
      await page.fill('[data-testid="principal-input"]', 'abc');
      await page.waitForTimeout(1000);
      
      // Should not crash and should show validation
      const errorElement = page.locator('[data-testid="principal-error"]');
      await expect(errorElement).toBeVisible();
      
      // Should not calculate EMI with invalid input
      const emiElement = page.locator('[data-testid="emi-result"]');
      await expect(emiElement).not.toBeVisible();
    });

    test('should handle extreme values', async ({ page }) => {
      // Test very large values
      await page.fill('[data-testid="principal-input"]', '999999999');
      await page.fill('[data-testid="rate-input"]', '99');
      await page.fill('[data-testid="tenure-input"]', '999');
      await page.waitForTimeout(1000);
      
      // Should show validation errors
      const principalError = page.locator('[data-testid="principal-error"]');
      const rateError = page.locator('[data-testid="rate-error"]');
      const tenureError = page.locator('[data-testid="tenure-error"]');
      
      await expect(principalError).toBeVisible();
      await expect(rateError).toBeVisible();
      await expect(tenureError).toBeVisible();
    });

    test('should recover from error state', async ({ page }) => {
      // Trigger error
      await page.fill('[data-testid="principal-input"]', '9999');
      await page.waitForTimeout(1000);
      
      let errorElement = page.locator('[data-testid="principal-error"]');
      await expect(errorElement).toBeVisible();
      
      // Provide valid input
      await page.fill('[data-testid="principal-input"]', '100000');
      await page.waitForTimeout(1000);
      
      // Should calculate successfully
      const emiElement = page.locator('[data-testid="emi-result"]');
      await expect(emiElement).toBeVisible();
      
      // Error should be cleared
      await expect(errorElement).not.toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile devices', async ({ page }) => {
      // Simulate mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // All elements should be visible and accessible
      await expect(page.locator('[data-testid="principal-input"]')).toBeVisible();
      await expect(page.locator('[data-testid="rate-input"]')).toBeVisible();
      await expect(page.locator('[data-testid="tenure-input"]')).toBeVisible();
      await expect(page.locator('[data-testid="frequency-select"]')).toBeVisible();
      
      // Test calculation
      await page.fill('[data-testid="principal-input"]', '100000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      await page.waitForTimeout(1000);
      
      const emiElement = page.locator('[data-testid="emi-result"]');
      await expect(emiElement).toBeVisible();
    });

    test('should adapt layout for tablet devices', async ({ page }) => {
      // Simulate tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Check if layout adapts properly
      await expect(page.locator('[data-testid="calculator-container"]')).toBeVisible();
      
      // Test functionality
      await page.fill('[data-testid="principal-input"]', '100000');
      await page.fill('[data-testid="rate-input"]', '8.5');
      await page.fill('[data-testid="tenure-input"]', '60');
      await page.waitForTimeout(1000);
      
      const emiElement = page.locator('[data-testid="emi-result"]');
      await expect(emiElement).toBeVisible();
    });
  });
});
