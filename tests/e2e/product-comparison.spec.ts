import { test, expect } from '@playwright/test';

test.describe('Product Comparison', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to comparison page
    await page.goto('/products/compare');
  });

  test('should display comparison interface', async ({ page }) => {
    // Check if comparison component exists
    await expect(page.locator('[data-testid="product-comparison"]')).toBeVisible();
    
    // Check if product selection area exists
    await expect(page.locator('[data-testid="comparison-selection"]')).toBeVisible();
    
    // Check if available products are displayed
    const selectableProducts = page.locator('[data-testid="selectable-product"]');
    await expect(selectableProducts).toHaveCount.greaterThan(0);
  });

  test('should allow product selection for comparison', async ({ page }) => {
    // Select first product
    const firstProduct = page.locator('[data-testid="selectable-product"]:first-child');
    await firstProduct.click();
    
    // Check if product is selected
    await expect(firstProduct).toHaveClass(/selected/);
    
    // Select second product
    const secondProduct = page.locator('[data-testid="selectable-product"]:nth-child(2)');
    await secondProduct.click();
    
    // Check if both products are selected
    await expect(page.locator('[data-testid="selectable-product"].selected)).toHaveCount(2);
  });

  test('should limit comparison to 4 products', async ({ page }) => {
    // Try to select 5 products
    const products = page.locator('[data-testid="selectable-product"]');
    for (let i = 0; i < 5; i++) {
      await products.nth(i).click();
      await page.waitForTimeout(500);
    }
    
    // Check if only 4 products are selected
    const selectedProducts = page.locator('[data-testid="selectable-product"].selected');
    await expect(selectedProducts).toHaveCount(4);
    
    // Check if limit message appears
    await expect(page.locator('[data-testid="selection-limit-message"]')).toBeVisible();
  });

  test('should show comparison table when products selected', async ({ page }) => {
    // Select 2 products
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    
    // Wait for comparison table to appear
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    // Check if comparison table is visible
    await expect(page.locator('[data-testid="comparison-table"]')).toBeVisible();
    
    // Check if selected products are in table headers
    const tableHeaders = page.locator('[data-testid="comparison-table"] th');
    await expect(tableHeaders).toHaveCount(4); // 2 products + Feature + Winner columns
  });

  test('should display product features in comparison', async ({ page }) => {
    // Select products and wait for table
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    // Check if features row exists
    const featuresRow = page.locator('[data-testid="comparison-features-row"]');
    await expect(featuresRow).toBeVisible();
    
    // Check if product features are displayed
    const featureCells = featuresRow.locator('td');
    await expect(featureCells).toHaveCount(4); // Feature name + 2 products + Winner
  });

  test('should display interest rates comparison', async ({ page }) => {
    // Select products with interest rates
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    // Check if interest rate row exists
    const interestRow = page.locator('[data-testid="comparison-interest-row"]');
    await expect(interestRow).toBeVisible();
    
    // Check if interest rates are displayed
    const interestCells = interestRow.locator('td');
    await expect(interestCells).toHaveCount(4);
    
    // Check if rates contain percentages
    await expect(interestCells.nth(1)).toMatch(/\d+\.\d+%/);
    await expect(interestCells.nth(2)).toMatch(/\d+\.\d+%/);
  });

  test('should highlight comparison winners', async ({ page }) => {
    // Select 3 products for comparison
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    await page.click('[data-testid="selectable-product"]:nth-child(3)');
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    // Check if winner badges are displayed
    const winnerBadges = page.locator('[data-testid="comparison-winner"]');
    await expect(winnerBadges).toHaveCount.greaterThan(0);
    
    // Check if winners are properly highlighted
    const firstWinner = winnerBadges.first();
    await expect(firstWinner).toContainText('Winner');
  });

  test('should allow comparison criteria selection', async ({ page }) => {
    // Select products first
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    // Check if criteria buttons exist
    await expect(page.locator('[data-testid="comparison-criteria"]')).toBeVisible();
    
    // Toggle features comparison
    await page.click('[data-testid="criteria-features"]');
    await page.waitForTimeout(500);
    
    // Check if features row is hidden
    await expect(page.locator('[data-testid="comparison-features-row"]')).not.toBeVisible();
    
    // Toggle features back
    await page.click('[data-testid="criteria-features"]');
    await page.waitForTimeout(500);
    
    // Check if features row is visible again
    await expect(page.locator('[data-testid="comparison-features-row"]')).toBeVisible();
  });

  test('should display pros and cons comparison', async ({ page }) => {
    // Select products
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    // Check if pros row exists
    const prosRow = page.locator('[data-testid="comparison-pros-row"]');
    await expect(prosRow).toBeVisible();
    
    // Check if cons row exists
    const consRow = page.locator('[data-testid="comparison-cons-row"]');
    await expect(consRow).toBeVisible();
    
    // Check if pros/cons are displayed with checkmarks/crosses
    const prosCells = prosRow.locator('td');
    const checkmarks = prosCells.locator('[data-testid="checkmark"]');
    await expect(checkmarks).toHaveCount.greaterThan(0);
  });

  test('should provide apply buttons for compared products', async ({ page }) => {
    // Select products
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    // Check if apply buttons exist
    const applyButtons = page.locator('[data-testid="apply-button"]');
    await expect(applyButtons).toHaveCount(2);
    
    // Check if buttons have correct text
    await expect(applyButtons.first()).toContainText('Apply Now');
  });

  test('should allow clearing comparison', async ({ page }) => {
    // Select products first
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    
    // Clear comparison
    await page.click('[data-testid="clear-comparison"]');
    
    // Check if selection is cleared
    await expect(page.locator('[data-testid="selectable-product"].selected)).toHaveCount(0);
    
    // Check if comparison table is hidden
    await expect(page.locator('[data-testid="comparison-table"]')).not.toBeVisible();
  });

  test('should handle empty comparison state', async ({ page }) => {
    // Check if empty state is displayed
    await expect(page.locator('[data-testid="empty-comparison"]')).toBeVisible();
    
    // Check if empty state message is appropriate
    await expect(page.locator('[data-testid="empty-comparison"]')).toContainText('Select Products to Compare');
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Focus on first product
    await page.focus('[data-testid="selectable-product"]:first-child');
    
    // Select product with keyboard
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    // Check if product is selected
    await expect(page.locator('[data-testid="selectable-product"]:first-child')).toHaveClass(/selected/);
    
    // Navigate to next product
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="selectable-product"]:nth-child(2)')).toBeFocused();
    
    // Select with space
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);
    
    // Check if second product is selected
    await expect(page.locator('[data-testid="selectable-product"]:nth-child(2)')).toHaveClass(/selected/);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check comparison section ARIA attributes
    const comparisonSection = page.locator('[data-testid="product-comparison"]');
    await expect(comparisonSection).toHaveAttribute('role', 'region');
    await expect(comparisonSection).toHaveAttribute('aria-label', 'Product Comparison');
    
    // Check product cards ARIA attributes
    const productCards = page.locator('[data-testid="selectable-product"]');
    const firstCard = productCards.first();
    await expect(firstCard).toHaveAttribute('role', 'button');
    await expect(firstCard).toHaveAttribute('aria-label');
    await expect(firstCard).toHaveAttribute('aria-pressed', 'false');
    
    // Check comparison table ARIA attributes
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    const comparisonTable = page.locator('[data-testid="comparison-table"]');
    await expect(comparisonTable).toHaveAttribute('role', 'table');
    await expect(comparisonTable).toHaveAttribute('aria-label', 'Product comparison table');
  });

  test('should be responsive', async ({ page }) => {
    // Select products on desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.click('[data-testid="selectable-product"]:first-child');
    await page.click('[data-testid="selectable-product"]:nth-child(2)');
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    // Check desktop layout
    await expect(page.locator('[data-testid="comparison-table"]')).toBeVisible();
    const desktopColumns = page.locator('[data-testid="comparison-table"] th');
    await expect(desktopColumns).toHaveCount(4);
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('[data-testid="comparison-table"]')).toBeVisible();
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="comparison-table"]')).toBeVisible();
    
    // On mobile, table might be scrollable or stacked
    const mobileTable = page.locator('[data-testid="comparison-table"]');
    await expect(mobileTable).toBeVisible();
  });
});

test.describe('Product Comparison Performance', () => {
  test('should load comparison interface quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/products/compare');
    await page.waitForSelector('[data-testid="product-comparison"]');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000); // 2 seconds max
  });

  test('should handle rapid product selection', async ({ page }) => {
    await page.goto('/products/compare');
    
    // Rapid selection test
    for (let i = 0; i < 4; i++) {
      await page.click(`[data-testid="selectable-product"]:nth-child(${i})`);
      await page.waitForTimeout(200);
    }
    
    // Check if all products are selected
    await expect(page.locator('[data-testid="selectable-product"].selected)).toHaveCount(4);
    
    // Check if comparison table appears
    await expect(page.locator('[data-testid="comparison-table"]')).toBeVisible();
  });

  test('should handle comparison calculations efficiently', async ({ page }) => {
    await page.goto('/products/compare');
    
    // Select maximum products
    for (let i = 0; i < 4; i++) {
      await page.click(`[data-testid="selectable-product"]:nth-child(${i})`);
    }
    
    // Wait for comparison to complete
    await page.waitForSelector('[data-testid="comparison-table"]');
    
    // Check if winners are calculated
    const winnerBadges = page.locator('[data-testid="comparison-winner"]');
    await expect(winnerBadges).toHaveCount.greaterThan(0);
    
    // Check if calculation completes within reasonable time
    const calculationStart = Date.now();
    await page.waitForSelector('[data-testid="comparison-winner"]');
    const calculationTime = Date.now() - calculationStart;
    expect(calculationTime).toBeLessThan(1000); // 1 second max
  });
});
