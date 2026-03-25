import { test, expect } from '@playwright/test';

test.describe('Escalation Path Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/grievances');
  });

  test.describe('Escalation Matrix Display', () => {
    test('should display escalation matrix correctly', async ({ page }) => {
      // Navigate to grievance tracker
      await page.goto('/en/grievances/tracker');
      
      // Check escalation matrix is visible
      const escalationMatrix = page.locator('[data-testid="escalation-matrix"]');
      await expect(escalationMatrix).toBeVisible();
      
      // Check all escalation levels are displayed
      await expect(page.locator('h2')).toContainText('Escalation Matrix');
      await expect(page.locator('[data-testid="level-0"]')).toBeVisible();
      await expect(page.locator('[data-testid="level-1"]')).toBeVisible();
      await expect(page.locator('[data-testid="level-2"]')).toBeVisible();
      await expect(page.locator('[data-testid="level-3"]')).toBeVisible();
    });

    test('should show current level status correctly', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Check current level display
      const currentStatus = page.locator('[data-testid="current-status"]');
      await expect(currentStatus).toBeVisible();
      
      // Should show current level information
      await expect(currentStatus.locator('h3')).toContainText('Current Status');
      await expect(currentStatus.locator('text-blue-900')).toBeVisible();
      
      // Should show response time
      await expect(currentStatus).toContainText('Response Time:');
    });

    test('should expand/collapse escalation levels correctly', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Click on first escalation level
      const level0 = page.locator('[data-testid="level-0"]');
      await level0.click();
      
      // Should expand and show details
      await expect(page.locator('[data-testid="level-0-details"]')).toBeVisible();
      await expect(page.locator('[data-testid="level-0-description"]')).toBeVisible();
      await expect(page.locator('[data-testid="level-0-contact"]')).toBeVisible();
      
      // Click again to collapse
      await level0.click();
      await expect(page.locator('[data-testid="level-0-details"]')).not.toBeVisible();
    });

    test('should show correct escalation status for each level', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Check status badges for each level
      const levels = [0, 1, 2, 3];
      
      for (const level of levels) {
        const levelElement = page.locator(`[data-testid="level-${level}"]`);
        const statusBadge = levelElement.locator('[data-testid="status-badge"]');
        
        await expect(statusBadge).toBeVisible();
        
        // Check status text is appropriate
        const statusText = await statusBadge.textContent();
        expect(['Completed', 'Current Level', 'Available', 'Not Available']).toContain(statusText);
      }
    });
  });

  test.describe('Escalation Functionality', () => {
    test('should allow escalation when available', async ({ page }) => {
      // Mock a grievance that can be escalated
      await page.goto('/en/grievances/GRV1648123456789');
      
      // Check if escalation is available
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      
      // Should be visible and enabled if escalation is available
      if (await escalateButton.isVisible()) {
        await expect(escalateButton).not.toBeDisabled();
        
        // Click escalate button
        await escalateButton.click();
        
        // Should show confirmation dialog
        await expect(page.locator('[data-testid="escalation-confirmation"]')).toBeVisible();
        
        // Confirm escalation
        await page.locator('[data-testid="confirm-escalation"]').click();
        
        // Should show loading state
        await expect(page.locator('[data-testid="escalation-loading"]')).toBeVisible();
        
        // Wait for completion
        await page.waitForTimeout(2000);
        
        // Should show success message
        await expect(page.locator('[data-testid="escalation-success"]')).toBeVisible();
      }
    });

    test('should prevent escalation when not available', async ({ page }) => {
      // Mock a grievance at maximum escalation level
      await page.goto('/en/grievances/GRV1648123456799');
      
      // Check if escalation button is disabled
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      
      if (await escalateButton.isVisible()) {
        await expect(escalateButton).toBeDisabled();
        
        // Try to click disabled button
        await escalateButton.click({ force: true });
        
        // Should show error message
        await expect(page.locator('[data-testid="escalation-error"]')).toBeVisible();
        await expect(page.locator('[data-testid="escalation-error"]')).toContainText('Maximum escalation level reached');
      }
    });

    test('should show escalation timeline correctly', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Check escalation timeline is displayed
      const timeline = page.locator('[data-testid="escalation-timeline"]');
      await expect(timeline).toBeVisible();
      
      // Should show response times for each level
      await expect(timeline).toContainText('24 hours');
      await expect(timeline).toContainText('48 hours');
      await expect(timeline).toContainText('72 hours');
      await expect(timeline).toContainText('30 days');
    });

    test('should display contact information for each level', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand first level to see contact info
      const level0 = page.locator('[data-testid="level-0"]');
      await level0.click();
      
      // Check contact information is displayed
      const contactInfo = page.locator('[data-testid="level-0-contact"]');
      await expect(contactInfo).toBeVisible();
      await expect(contactInfo).toContainText('Contact Information');
      await expect(contactInfo).toContainText('Email:');
      await expect(contactInfo).toContainText('Phone:');
    });
  });

  test.describe('RBI Ombudsman Integration', () => {
    test('should show RBI Ombudsman as final escalation level', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Check RBI Ombudsman level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await expect(rbiLevel).toBeVisible();
      
      // Should show RBI specific information
      await expect(rbiLevel).toContainText('RBI Ombudsman');
      await expect(rbiLevel).toContainText('Final authority');
      await expect(rbiLevel).toContainText('30 days');
    });

    test('should provide RBI Ombudsman link', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check RBI link is provided
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await expect(rbiLink).toBeVisible();
      await expect(rbiLink).toHaveAttribute('href', 'https://rbi.org.in');
    });

    test('should show RBI contact information', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check RBI contact info
      const rbiContact = page.locator('[data-testid="level-3-contact"]');
      await expect(rbiContact).toBeVisible();
      await expect(rbiContact).toContainText('1800-456-7890');
    });
  });

  test.describe('Escalation Process Flow', () => {
    test('should follow correct escalation sequence', async ({ page }) => {
      // Start with a new grievance
      await page.goto('/en/grievances/GRV1648123456789');
      
      // Should start at level 0
      const currentLevel = page.locator('[data-testid="current-level"]');
      await expect(currentLevel).toContainText('Branch Manager');
      
      // Escalate to level 1
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      if (await escalateButton.isVisible() && !await escalateButton.isDisabled()) {
        await escalateButton.click();
        await page.locator('[data-testid="confirm-escalation"]').click();
        await page.waitForTimeout(2000);
        
        // Should now be at level 1
        await expect(currentLevel).toContainText('Regional Manager');
      }
    });

    test('should track escalation history', async ({ page }) => {
      await page.goto('/en/grievances/GRV1648123456789');
      
      // Check escalation history is displayed
      const history = page.locator('[data-testid="escalation-history"]');
      await expect(history).toBeVisible();
      
      // Should show timeline of escalations
      await expect(history).toContainText('Escalation Timeline');
      await expect(history.locator('[data-testid="history-item"]')).toHaveCount({ min: 1 });
    });

    test('should show escalation reasons', async ({ page }) => {
      await page.goto('/en/grievances/GRV1648123456789');
      
      // Check escalation reasons are displayed
      const reasons = page.locator('[data-testid="escalation-reasons"]');
      if (await reasons.isVisible()) {
        await expect(reasons).toBeVisible();
        await expect(reasons).toContainText('Escalation Reasons');
      }
    });
  });

  test.describe('Escalation Notifications', () => {
    test('should show escalation confirmation notification', async ({ page }) => {
      await page.goto('/en/grievances/GRV1648123456789');
      
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      if (await escalateButton.isVisible() && !await escalateButton.isDisabled()) {
        await escalateButton.click();
        await page.locator('[data-testid="confirm-escalation"]').click();
        
        // Should show notification
        await expect(page.locator('[data-testid="escalation-notification"]')).toBeVisible();
        await expect(page.locator('[data-testid="escalation-notification"]')).toContainText('Grievance escalated successfully');
      }
    });

    test('should send email notification on escalation', async ({ page }) => {
      // Mock email service
      await page.route('**/api/grievances/GRV1648123456789', route => {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
              grievance: {
                id: '1',
                referenceNumber: 'GRV1648123456789',
                status: 'escalated',
                escalationLevel: 1
              }
            }
          })
        });
      });
      
      await page.goto('/en/grievances/GRV1648123456789');
      
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      if (await escalateButton.isVisible() && !await escalateButton.isDisabled()) {
        await escalateButton.click();
        await page.locator('[data-testid="confirm-escalation"]').click();
        await page.waitForTimeout(2000);
        
        // Check email notification was sent (mock verification)
        const notifications = await page.locator('[data-testid="notification-sent"]').all();
        expect(notifications.length).toBeGreaterThan(0);
      }
    });

    test('should send SMS notification for high priority escalation', async ({ page }) => {
      // Mock high priority grievance
      await page.route('**/api/grievances/GRV1648123456799', route => {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
              grievance: {
                id: '2',
                referenceNumber: 'GRV1648123456799',
                status: 'escalated',
                priority: 'high',
                escalationLevel: 1
              }
            }
          })
        });
      });
      
      await page.goto('/en/grievances/GRV1648123456799');
      
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      if (await escalateButton.isVisible() && !await escalateButton.isDisabled()) {
        await escalateButton.click();
        await page.locator('[data-testid="confirm-escalation"]').click();
        await page.waitForTimeout(2000);
        
        // Check SMS notification indicator
        const smsIndicator = page.locator('[data-testid="sms-sent"]');
        if (await smsIndicator.isVisible()) {
          await expect(smsIndicator).toContainText('SMS notification sent');
        }
      }
    });
  });

  test.describe('Escalation Error Handling', () => {
    test('should handle escalation API errors gracefully', async ({ page }) => {
      // Mock API error
      await page.route('**/api/grievances/GRV1648123456789', route => {
        return route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            error: 'Internal server error',
            message: 'Escalation failed'
          })
        });
      });
      
      await page.goto('/en/grievances/GRV1648123456789');
      
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      if (await escalateButton.isVisible() && !await escalateButton.isDisabled()) {
        await escalateButton.click();
        await page.locator('[data-testid="confirm-escalation"]').click();
        await page.waitForTimeout(2000);
        
        // Should show error message
        await expect(page.locator('[data-testid="escalation-error"]')).toBeVisible();
        await expect(page.locator('[data-testid="escalation-error"]')).toContainText('Escalation failed');
        
        // Button should be re-enabled
        await expect(escalateButton).not.toBeDisabled();
      }
    });

    test('should handle network errors during escalation', async ({ page }) => {
      // Mock network error
      await page.route('**/api/grievances/GRV1648123456789', route => {
        return route.abort('failed');
      });
      
      await page.goto('/en/grievances/GRV1648123456789');
      
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      if (await escalateButton.isVisible() && !await escalateButton.isDisabled()) {
        await escalateButton.click();
        await page.locator('[data-testid="confirm-escalation"]').click();
        await page.waitForTimeout(2000);
        
        // Should show network error message
        await expect(page.locator('[data-testid="network-error"]')).toBeVisible();
        await expect(page.locator('[data-testid="network-error"]')).toContainText('Network error occurred');
      }
    });

    test('should validate escalation confirmation', async ({ page }) => {
      await page.goto('/en/grievances/GRV1648123456789');
      
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      if (await escalateButton.isVisible() && !await escalateButton.isDisabled()) {
        await escalateButton.click();
        
        // Should show confirmation dialog
        await expect(page.locator('[data-testid="escalation-confirmation"]')).toBeVisible();
        
        // Check confirmation dialog content
        await expect(page.locator('[data-testid="confirmation-title"]')).toContainText('Confirm Escalation');
        await expect(page.locator('[data-testid="confirmation-message"]')).toContainText('escalate to next level');
        
        // Check cancel button
        const cancelButton = page.locator('[data-testid="cancel-escalation"]');
        await expect(cancelButton).toBeVisible();
        
        // Click cancel to close dialog
        await cancelButton.click();
        await expect(page.locator('[data-testid="escalation-confirmation"]')).not.toBeVisible();
      }
    });
  });

  test.describe('Escalation Accessibility', () => {
    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Tab through escalation levels
      await page.keyboard.press('Tab');
      const firstLevel = page.locator('[data-testid="level-0"]');
      await expect(firstLevel).toBeFocused();
      
      // Navigate through levels
      for (let i = 1; i <= 3; i++) {
        await page.keyboard.press('Tab');
        const level = page.locator(`[data-testid="level-${i}"]`);
        await expect(level).toBeFocused();
      }
    });

    test('should have proper ARIA attributes', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Check ARIA attributes on escalation levels
      const levels = page.locator('[data-testid^="level-"]');
      const levelCount = await levels.count();
      
      for (let i = 0; i < levelCount; i++) {
        const level = levels.nth(i);
        await expect(level).toHaveAttribute('role', 'button');
        await expect(level).toHaveAttribute('aria-expanded');
        await expect(level).toHaveAttribute('aria-controls');
      }
    });

    test('should have proper color contrast', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Check color contrast for status badges
      const statusBadges = page.locator('[data-testid="status-badge"]');
      const badgeCount = await statusBadges.count();
      
      for (let i = 0; i < badgeCount; i++) {
        const badge = statusBadges.nth(i);
        const styles = await badge.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color
          };
        });
        
        // Should have sufficient contrast (basic check)
        expect(styles.backgroundColor).not.toBe('rgb(255, 255, 255)');
        expect(styles.color).not.toBe('rgb(128, 128, 128)');
      }
    });
  });

  test.describe('Escalation Performance', () => {
    test('should load escalation data quickly', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/en/grievances/tracker');
      
      // Wait for escalation matrix to load
      await page.waitForSelector('[data-testid="escalation-matrix"]');
      
      const loadTime = Date.now() - startTime;
      
      // Should load within 2 seconds
      expect(loadTime).toBeLessThan(2000);
    });

    test('should handle multiple rapid escalations', async ({ page }) => {
      await page.goto('/en/grievances/GRV1648123456789');
      
      const escalateButton = page.locator('[data-testid="escalate-button"]');
      
      if (await escalateButton.isVisible() && !await escalateButton.isDisabled()) {
        // Try to click escalate multiple times rapidly
        for (let i = 0; i < 5; i++) {
          await escalateButton.click();
          await page.waitForTimeout(100);
        }
        
        // Should only process one escalation
        await expect(page.locator('[data-testid="escalation-confirmation"]')).toHaveCount(1);
      }
    });
  });
});
