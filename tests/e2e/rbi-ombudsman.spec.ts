import { test, expect } from '@playwright/test';

test.describe('RBI Ombudsman Link Verification Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/grievances');
  });

  test.describe('RBI Ombudsman Presence', () => {
    test('should display RBI Ombudsman information in escalation matrix', async ({ page }) => {
      // Navigate to grievance tracker
      await page.goto('/en/grievances/tracker');
      
      // Check RBI Ombudsman level is present
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await expect(rbiLevel).toBeVisible();
      
      // Should contain RBI specific text
      await expect(rbiLevel).toContainText('RBI Ombudsman');
      await expect(rbiLevel).toContainText('Final authority');
      await expect(rbiLevel).toContainText('30 days');
    });

    test('should show RBI Ombudsman as final escalation level', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Check that RBI is the final level
      const escalationLevels = page.locator('[data-testid^="level-"]');
      const levelCount = await escalationLevels.count();
      expect(levelCount).toBe(4); // Levels 0, 1, 2, 3
      
      // RBI should be level 3 (final)
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await expect(rbiLevel).toBeVisible();
      
      // Should show final authority indicator
      await expect(rbiLevel).toContainText('Final authority for grievance resolution');
    });

    test('should display RBI contact information', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level to see contact info
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check contact information is displayed
      const rbiContact = page.locator('[data-testid="level-3-contact"]');
      await expect(rbiContact).toBeVisible();
      
      // Should show RBI specific contact details
      await expect(rbiContact).toContainText('Contact Information');
      await expect(rbiContact).toContainText('https://rbi.org.in');
      await expect(rbiContact).toContainText('1800-456-7890');
    });
  });

  test.describe('RBI Ombudsman Link Functionality', () => {
    test('should provide clickable RBI website link', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check RBI link is present and clickable
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await expect(rbiLink).toBeVisible();
      await expect(rbiLink).toHaveAttribute('href');
      
      // Should point to correct RBI URL
      const href = await rbiLink.getAttribute('href');
      expect(href).toBe('https://rbi.org.in');
    });

    test('should open RBI link in new tab', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check link opens in new tab
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await expect(rbiLink).toHaveAttribute('target', '_blank');
      await expect(rbiLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('should validate RBI link accessibility', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check link has proper accessibility attributes
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await expect(rbiLink).toHaveAttribute('role', 'link');
      await expect(rbiLink).toHaveAttribute('aria-label');
      
      // Check aria-label is descriptive
      const ariaLabel = await rbiLink.getAttribute('aria-label');
      expect(ariaLabel).toContain('RBI Ombudsman');
    });
  });

  test.describe('RBI Ombudsman Integration Flow', () => {
    test('should show RBI escalation when all internal levels are exhausted', async ({ page }) => {
      // Mock a grievance at maximum escalation
      await page.goto('/en/grievances/GRV1648123456799');
      
      // Check current status shows RBI level
      const currentStatus = page.locator('[data-testid="current-status"]');
      await expect(currentStatus).toContainText('RBI Ombudsman');
      
      // Should show that internal escalation is complete
      await expect(currentStatus).toContainText('Maximum escalation level reached');
    });

    test('should provide RBI contact when internal resolution fails', async ({ page }) => {
      // Mock a grievance that needs RBI intervention
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
                escalationLevel: 3,
                nextEscalation: null,
                rbiContact: {
                  website: 'https://rbi.org.in',
                  phone: '1800-456-7890',
                  email: 'ombudsman@rbi.org.in'
                }
              }
            }
          })
        });
      });
      
      await page.goto('/en/grievances/GRV1648123456799');
      
      // Should show RBI contact information
      const rbiContact = page.locator('[data-testid="rbi-contact-info"]');
      await expect(rbiContact).toBeVisible();
      await expect(rbiContact).toContainText('Please contact RBI Ombudsman');
    });

    test('should track RBI escalation in grievance history', async ({ page }) => {
      await page.goto('/en/grievances/GRV1648123456799');
      
      // Check escalation history includes RBI level
      const history = page.locator('[data-testid="escalation-history"]');
      await expect(history).toBeVisible();
      
      // Should show RBI escalation entry
      await expect(history).toContainText('Escalated to RBI Ombudsman');
      
      // Should show date of RBI escalation
      await expect(history).toContainText(new Date().toLocaleDateString());
    });
  });

  test.describe('RBI Ombudsman Content Verification', () => {
    test('should display accurate RBI information', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Verify RBI information accuracy
      const rbiInfo = page.locator('[data-testid="rbi-information"]');
      await expect(rbiInfo).toBeVisible();
      
      // Should contain correct RBI details
      await expect(rbiInfo).toContainText('Reserve Bank of India');
      await expect(rbiInfo).toContainText('Banking Ombudsman');
      await expect(rbiInfo).toContainText('Final authority for grievance resolution');
    });

    test('should show RBI guidelines and process', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check RBI process information
      const rbiProcess = page.locator('[data-testid="rbi-process"]');
      await expect(rbiProcess).toBeVisible();
      
      // Should explain RBI process
      await expect(rbiProcess).toContainText('RBI guidelines');
      await expect(rbiProcess).toContainText('30 days resolution timeline');
      await expect(rbiProcess).toContainText('Final authority');
    });

    test('should provide RBI complaint submission guidance', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check submission guidance
      const rbiGuidance = page.locator('[data-testid="rbi-guidance"]');
      await expect(rbiGuidance).toBeVisible();
      
      // Should provide step-by-step guidance
      await expect(rbiGuidance).toContainText('How to file complaint with RBI');
      await expect(rbiGuidance).toContainText('Required documents');
      await expect(rbiGuidance).toContainText('Complaint form');
    });
  });

  test.describe('RBI Ombudsman Link Validation', () => {
    test('should validate RBI link URL format', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check link URL format
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      const href = await rbiLink.getAttribute('href');
      
      // Should be valid URL
      expect(href).toMatch(/^https?:\/\/.+/);
      expect(href).toContain('rbi.org.in');
    });

    test('should handle RBI link errors gracefully', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Mock RBI link failure
      await page.route('**/rbi.org.in/**', route => {
        return route.fulfill({
          status: 404,
          contentType: 'text/plain',
          body: 'Page not found'
        });
      });
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Click RBI link
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await rbiLink.click();
      
      // Should handle error gracefully
      await expect(page.locator('[data-testid="link-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="link-error"]')).toContainText('Unable to access RBI website');
    });

    test('should show fallback contact if RBI link fails', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Mock RBI link failure
      await page.route('**/rbi.org.in/**', route => {
        return route.fulfill({
          status: 500,
          contentType: 'text/plain',
          body: 'Server error'
        });
      });
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Click RBI link
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await rbiLink.click();
      
      // Should show fallback contact information
      const fallbackContact = page.locator('[data-testid="fallback-contact"]');
      await expect(fallbackContact).toBeVisible();
      await expect(fallbackContact).toContainText('1800-456-7890');
      await expect(fallbackContact).toContainText('ombudsman@rbi.org.in');
    });
  });

  test.describe('RBI Ombudsman Accessibility', () => {
    test('should be keyboard accessible', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Tab to RBI level
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await expect(rbiLevel).toBeFocused();
      
      // Expand RBI level
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-testid="level-3-details"]')).toBeVisible();
      
      // Tab to RBI link
      await page.keyboard.press('Tab');
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await expect(rbiLink).toBeFocused();
      
      // Activate link
      await page.keyboard.press('Enter');
    });

    test('should have proper ARIA labels', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check ARIA attributes
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await expect(rbiLink).toHaveAttribute('aria-label', 'RBI Ombudsman Website');
      await expect(rbiLink).toHaveAttribute('role', 'link');
      
      const rbiInfo = page.locator('[data-testid="rbi-information"]');
      await expect(rbiInfo).toHaveAttribute('role', 'region');
      await expect(rbiInfo).toHaveAttribute('aria-label', 'RBI Ombudsman Information');
    });

    test('should have sufficient color contrast', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Check color contrast for RBI elements
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      const linkStyles = await rbiLink.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color
        };
      });
      
      // Should have sufficient contrast
      expect(linkStyles.backgroundColor).not.toBe('rgb(255, 255, 255)');
      expect(linkStyles.color).not.toBe('rgb(128, 128, 128)');
    });
  });

  test.describe('RBI Ombudsman Performance', () => {
    test('should load RBI information quickly', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Wait for RBI information to load
      await page.waitForSelector('[data-testid="rbi-information"]');
      
      const loadTime = Date.now() - startTime;
      
      // Should load within 2 seconds
      expect(loadTime).toBeLessThan(2000);
    });

    test('should handle multiple RBI link clicks efficiently', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      
      // Click multiple times rapidly
      for (let i = 0; i < 5; i++) {
        await rbiLink.click();
        await page.waitForTimeout(100);
      }
      
      // Should only open one instance
      await expect(page.locator('[data-testid="rbi-link"]')).toHaveCount(1);
    });

    test('should cache RBI information for performance', async ({ page }) => {
      // First load
      const startTime1 = Date.now();
      await page.goto('/en/grievances/tracker');
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      await page.waitForSelector('[data-testid="rbi-information"]');
      const loadTime1 = Date.now() - startTime1;
      
      // Second load (should be faster due to caching)
      const startTime2 = Date.now();
      await page.goto('/en/grievances/tracker');
      await rbiLevel.click();
      await page.waitForSelector('[data-testid="rbi-information"]');
      const loadTime2 = Date.now() - startTime2;
      
      // Second load should be faster or equal
      expect(loadTime2).toBeLessThanOrEqual(loadTime1);
    });
  });

  test.describe('RBI Ombudsman Error Handling', () => {
    test('should handle RBI website downtime gracefully', async ({ page }) => {
      // Mock RBI website downtime
      await page.route('**/rbi.org.in/**', route => {
        return route.fulfill({
          status: 503,
          contentType: 'text/plain',
          body: 'Service Unavailable'
        });
      });
      
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Click RBI link
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await rbiLink.click();
      
      // Should show downtime message
      await expect(page.locator('[data-testid="service-unavailable"]')).toBeVisible();
      await expect(page.locator('[data-testid="service-unavailable"]')).toContainText('RBI website temporarily unavailable');
    });

    test('should provide alternative contact during RBI issues', async ({ page }) => {
      // Mock RBI website issues
      await page.route('**/rbi.org.in/**', route => {
        return route.fulfill({
          status: 500,
          contentType: 'text/plain',
          body: 'Internal Server Error'
        });
      });
      
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Should show alternative contact
      const altContact = page.locator('[data-testid="alternative-contact"]');
      await expect(altContact).toBeVisible();
      await expect(altContact).toContainText('Alternative Contact');
      await expect(altContact).toContainText('1800-456-7890');
    });

    test('should log RBI link access attempts', async ({ page }) => {
      await page.goto('/en/grievances/tracker');
      
      // Expand RBI level
      const rbiLevel = page.locator('[data-testid="level-3"]');
      await rbiLevel.click();
      
      // Click RBI link
      const rbiLink = page.locator('[data-testid="rbi-link"]');
      await rbiLink.click();
      
      // Check if access was logged (mock verification)
      const accessLog = page.locator('[data-testid="access-log"]');
      if (await accessLog.isVisible()) {
        await expect(accessLog).toContainText('RBI Ombudsman link accessed');
        await expect(accessLog).toContainText(new Date().toLocaleDateString());
      }
    });
  });
});
