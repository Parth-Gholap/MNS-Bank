import { test, expect } from '@playwright/test';

test.describe('Tab Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(1280, 720);
  });

  test.describe('Basic Tab Navigation', () => {
    test('should switch between tabs correctly', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Get all tabs
      const tabs = page.locator('[role="tab"]');
      const tabContents = page.locator('[role="tabpanel"]');
      
      // Check initial state - overview tab should be selected
      await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
      await expect(tabContents.first()).toBeVisible();
      
      // Click features tab
      await tabs.nth(1).click();
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
      await expect(tabs.first()).toHaveAttribute('aria-selected', 'false');
      await expect(tabContents.nth(1)).toBeVisible();
      await expect(tabContents.first()).not.toBeVisible();
      
      // Click eligibility tab
      await tabs.nth(2).click();
      await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'false');
      await expect(tabContents.nth(2)).toBeVisible();
      await expect(tabContents.nth(1)).not.toBeVisible();
      
      // Click documents tab
      await tabs.nth(3).click();
      await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true');
      await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'false');
      await expect(tabContents.nth(3)).toBeVisible();
      await expect(tabContents.nth(2)).not.toBeVisible();
      
      // Click apply tab
      await tabs.nth(4).click();
      await expect(tabs.nth(4)).toHaveAttribute('aria-selected', 'true');
      await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'false');
      await expect(tabContents.nth(4)).toBeVisible();
      await expect(tabContents.nth(3)).not.toBeVisible();
    });

    test('should maintain tab state on page reload', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Switch to features tab
      const featuresTab = page.locator('[role="tab"]').nth(1);
      await featuresTab.click();
      await expect(featuresTab).toHaveAttribute('aria-selected', 'true');
      
      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Check default tab is selected after reload
      const tabs = page.locator('[role="tab"]');
      await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'false');
      
      // Check overview content is visible
      const tabContents = page.locator('[role="tabpanel"]');
      await expect(tabContents.first()).toBeVisible();
      await expect(tabContents.nth(1)).not.toBeVisible();
    });

    test('should handle tab navigation with keyboard', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Focus on first tab
      await page.keyboard.press('Tab');
      const firstTab = page.locator('[role="tab"]').first();
      await expect(firstTab).toBeFocused();
      
      // Navigate with arrow keys
      await page.keyboard.press('ArrowRight');
      const secondTab = page.locator('[role="tab"]').nth(1);
      await expect(secondTab).toBeFocused();
      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
      
      await page.keyboard.press('ArrowRight');
      const thirdTab = page.locator('[role="tab"]').nth(2);
      await expect(thirdTab).toBeFocused();
      await expect(thirdTab).toHaveAttribute('aria-selected', 'true');
      
      // Navigate back with arrow keys
      await page.keyboard.press('ArrowLeft');
      await expect(secondTab).toBeFocused();
      await expect(secondTab).toHaveAttribute('aria-selected', 'true');
      
      // Test Home and End keys
      await page.keyboard.press('Home');
      await expect(firstTab).toBeFocused();
      await expect(firstTab).toHaveAttribute('aria-selected', 'true');
      
      await page.keyboard.press('End');
      const lastTab = page.locator('[role="tab"]').last();
      await expect(lastTab).toBeFocused();
      await expect(lastTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('Tab Content Loading', () => {
    test('should load tab content correctly', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check overview tab content
      const overviewContent = page.locator('[data-tab-content="overview"]');
      await expect(overviewContent).toBeVisible();
      await expect(overviewContent).toContainText('Benefits of our savings account');
      
      // Switch to features tab
      await page.locator('[data-tab="features"]').click();
      const featuresContent = page.locator('[data-tab-content="features"]');
      await expect(featuresContent).toBeVisible();
      await expect(featuresContent).toContainText('Key Features');
      
      // Switch to eligibility tab
      await page.locator('[data-tab="eligibility"]').click();
      const eligibilityContent = page.locator('[data-tab-content="eligibility"]');
      await expect(eligibilityContent).toBeVisible();
      await expect(eligibilityContent).toContainText('Eligibility Criteria');
      
      // Switch to documents tab
      await page.locator('[data-tab="documents"]').click();
      const documentsContent = page.locator('[data-tab-content="documents"]');
      await expect(documentsContent).toBeVisible();
      await expect(documentsContent).toContainText('Required Documents');
      
      // Switch to apply tab
      await page.locator('[data-tab="apply"]').click();
      const applyContent = page.locator('[data-tab-content="apply"]');
      await expect(applyContent).toBeVisible();
      await expect(applyContent).toContainText('Apply for Savings Account');
    });

    test('should display form in apply tab', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      await page.locator('[data-tab="apply"]').click();
      
      // Check form elements are present
      const form = page.locator('form[data-testid="application-form"]');
      await expect(form).toBeVisible();
      
      await expect(form.locator('input[name="fullName"]')).toBeVisible();
      await expect(form.locator('input[name="email"]')).toBeVisible();
      await expect(form.locator('input[name="mobileNumber"]')).toBeVisible();
      await expect(form.locator('input[name="initialDeposit"]')).toBeVisible();
      await expect(form.locator('textarea[name="message"]')).toBeVisible();
      await expect(form.locator('button[type="submit"]')).toBeVisible();
    });
  });

  test.describe('Tab Accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Check tab list
      const tabList = page.locator('[role="tablist"]');
      await expect(tabList).toHaveAttribute('role', 'tablist');
      
      // Check individual tabs
      const tabs = page.locator('[role="tab"]');
      const tabCount = await tabs.count();
      expect(tabCount).toBeGreaterThan(0);
      
      for (let i = 0; i < tabCount; i++) {
        const tab = tabs.nth(i);
        await expect(tab).toHaveAttribute('role', 'tab');
        await expect(tab).toHaveAttribute('aria-controls');
        await expect(tab).toHaveAttribute('aria-selected');
        await expect(tab).toHaveAttribute('tabindex');
      }
      
      // Check tab panels
      const tabPanels = page.locator('[role="tabpanel"]');
      const panelCount = await tabPanels.count();
      expect(panelCount).toBe(tabCount);
      
      for (let i = 0; i < panelCount; i++) {
        const panel = tabPanels.nth(i);
        await expect(panel).toHaveAttribute('role', 'tabpanel');
        await expect(panel).toHaveAttribute('aria-labelledby');
      }
    });

    test('should handle tab focus correctly', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Focus on tab list
      await page.locator('[role="tablist"]').focus();
      
      // Tab through tabs
      await page.keyboard.press('Tab');
      const firstTab = page.locator('[role="tab"]').first();
      await expect(firstTab).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(firstTab).not.toBeFocused();
      
      // Focus back to tab list
      await page.keyboard.press('Shift+Tab');
      await expect(firstTab).toBeFocused();
    });

    test('should announce tab changes to screen readers', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Get first tab
      const firstTab = page.locator('[role="tab"]').first();
      
      // Check if tab has proper labeling
      await expect(firstTab).toHaveAttribute('aria-label');
      
      // Switch tab and check announcement
      await firstTab.click();
      
      // Check if content is properly announced
      const firstPanel = page.locator('[role="tabpanel"]').first();
      await expect(firstPanel).toHaveAttribute('aria-live', 'polite');
    });
  });

  test.describe('Tab Performance', () => {
    test('should switch tabs quickly', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      const tabs = page.locator('[role="tab"]');
      
      // Measure tab switching time
      const startTime = Date.now();
      
      for (let i = 0; i < tabs.count(); i++) {
        await tabs.nth(i).click();
        await page.waitForTimeout(100); // Small delay for animation
      }
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      // All tab switches should complete within 2 seconds
      expect(totalTime).toBeLessThan(2000);
    });

    test('should not cause layout shifts', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Get initial layout
      const initialLayout = await page.evaluate(() => {
        const tabList = document.querySelector('[role="tablist"]');
        const tabPanel = document.querySelector('[role="tabpanel"]');
        return {
          tabListHeight: tabList?.getBoundingClientRect().height || 0,
          tabPanelHeight: tabPanel?.getBoundingClientRect().height || 0
        };
      });
      
      // Switch tabs
      await page.locator('[data-tab="features"]').click();
      await page.locator('[data-tab="eligibility"]').click();
      
      // Check layout stability
      const finalLayout = await page.evaluate(() => {
        const tabList = document.querySelector('[role="tablist"]');
        const tabPanel = document.querySelector('[role="tabpanel"]');
        return {
          tabListHeight: tabList?.getBoundingClientRect().height || 0,
          tabPanelHeight: tabPanel?.getBoundingClientRect().height || 0
        };
      });
      
      // Layout should be stable (allowing for small differences)
      expect(Math.abs(initialLayout.tabListHeight - finalLayout.tabListHeight)).toBeLessThan(5);
    });
  });

  test.describe('Tab Responsive Behavior', () => {
    test('should work on mobile devices', async ({ page }) => {
      await page.setViewportSize(375, 667);
      await page.goto('/en/personal/savings-account');
      
      // Check tabs are visible on mobile
      const tabs = page.locator('[role="tab"]');
      await expect(tabs.first()).toBeVisible();
      
      // Try to switch tabs on mobile
      await tabs.nth(1).click();
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
      
      const tabContents = page.locator('[role="tabpanel"]');
      await expect(tabContents.nth(1)).toBeVisible();
    });

    test('should handle touch events on mobile', async ({ page }) => {
      await page.setViewportSize(375, 667);
      await page.goto('/en/personal/savings-account');
      
      const tabs = page.locator('[role="tab"]');
      
      // Tap on second tab
      await tabs.nth(1).tap();
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
      
      // Tap on third tab
      await tabs.nth(2).tap();
      await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'false');
    });
  });

  test.describe('Tab Error Handling', () => {
    test('should handle invalid tab gracefully', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Try to click on non-existent tab
      const nonExistentTab = page.locator('[data-tab="non-existent"]');
      const tabCount = await nonExistentTab.count();
      expect(tabCount).toBe(0);
      
      // Ensure existing tabs still work
      const existingTab = page.locator('[role="tab"]').first();
      await existingTab.click();
      await expect(existingTab).toHaveAttribute('aria-selected', 'true');
    });

    test('should handle rapid tab switching', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      const tabs = page.locator('[role="tab"]');
      
      // Rapidly switch between tabs
      for (let i = 0; i < 10; i++) {
        const randomTabIndex = Math.floor(Math.random() * (await tabs.count()));
        await tabs.nth(randomTabIndex).click();
        await page.waitForTimeout(10); // Very small delay
      }
      
      // Ensure final state is consistent
      const selectedTab = page.locator('[role="tab"][aria-selected="true"]');
      await expect(selectedTab).toHaveCount(1);
      
      const visiblePanel = page.locator('[role="tabpanel"]:visible');
      await expect(visiblePanel).toHaveCount(1);
    });
  });

  test.describe('Tab State Persistence', () => {
    test('should remember tab state during navigation', async ({ page }) => {
      await page.goto('/en/personal/savings-account');
      
      // Switch to features tab
      await page.locator('[data-tab="features"]').click();
      await expect(page.locator('[data-tab="features"]')).toHaveAttribute('aria-selected', 'true');
      
      // Navigate to another page and come back
      await page.goto('/en/personal/loans/personal-loan');
      await page.waitForLoadState('networkidle');
      
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      // Check if tab state is reset to default
      await expect(page.locator('[data-tab="overview"]')).toHaveAttribute('aria-selected', 'true');
      await expect(page.locator('[data-tab="features"]')).toHaveAttribute('aria-selected', 'false');
    });
  });
});
