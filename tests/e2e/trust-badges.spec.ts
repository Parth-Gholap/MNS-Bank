import { test, expect } from '@playwright/test';

test.describe('Trust Badges', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
  });

  test('should display trust badges section', async ({ page }) => {
    // Check if trust badges section exists
    await expect(page.locator('[data-testid="trust-badges-section"]')).toBeVisible();
    
    // Check if trust badges are loaded
    await expect(page.locator('[data-testid="trust-badge"]')).toHaveCount(6);
    
    // Check if section header is displayed
    const header = page.locator('[data-testid="trust-badges-header"]');
    await expect(header).toBeVisible();
    await expect(header).toContainText('Trust & Credibility');
  });

  test('should display badge information correctly', async ({ page }) => {
    // Get first badge
    const firstBadge = page.locator('[data-testid="trust-badge"]:first-child');
    
    // Check if badge has icon
    const badgeIcon = firstBadge.locator('[data-testid="badge-icon"]');
    await expect(badgeIcon).toBeVisible();
    
    // Check if badge has name
    const badgeName = firstBadge.locator('[data-testid="badge-name"]');
    await expect(badgeName).toBeVisible();
    await expect(badgeName).not.toBeEmpty();
    
    // Check if badge has description
    const badgeDescription = firstBadge.locator('[data-testid="badge-description"]');
    await expect(badgeDescription).toBeVisible();
    await expect(badgeDescription).not.toBeEmpty();
    
    // Check if badge has category
    const badgeCategory = firstBadge.locator('[data-testid="badge-category"]');
    await expect(badgeCategory).toBeVisible();
    await expect(badgeCategory).not.toBeEmpty();
    
    // Check if badge has verification status
    const badgeStatus = firstBadge.locator('[data-testid="badge-status"]');
    await expect(badgeStatus).toBeVisible();
    await expect(badgeStatus).toContainText('Verified');
  });

  test('should categorize badges correctly', async ({ page }) => {
    // Check Regulatory badges
    const regulatoryBadges = page.locator('[data-testid="trust-badge"][data-category="regulatory"]');
    await expect(regulatoryBadges).toHaveCount(1);
    
    // Check Certification badges
    const certificationBadges = page.locator('[data-testid="trust-badge"][data-category="certification"]');
    await expect(certificationBadges).toHaveCount(4);
    
    // Check Security badges
    const securityBadges = page.locator('[data-testid="trust-badge"][data-category="security"]');
    await expect(securityBadges).toHaveCount(1);
    
    // Check Membership badges
    const membershipBadges = page.locator('[data-testid="trust-badge"][data-category="membership"]');
    await expect(membershipBadges).toHaveCount(1);
  });

  test('should display verification status correctly', async ({ page }) => {
    // Check verified badges
    const verifiedBadges = page.locator('[data-testid="trust-badge"][data-verified="true"]');
    await expect(verifiedBadges).toHaveCount(6);
    
    // Check if verified badges show correct status
    const firstVerifiedBadge = verifiedBadges.first();
    const statusElement = firstVerifiedBadge.locator('[data-testid="badge-status"]');
    await expect(statusElement).toContainText('Verified');
    await expect(statusElement).toHaveClass(/text-green-600/);
  });

  test('should handle external links correctly', async ({ page }) => {
    // Get first badge with external link
    const externalBadge = page.locator('[data-testid="trust-badge"][data-external="true"]:first-child');
    
    // Check if CTA button exists
    const ctaButton = externalBadge.locator('[data-testid="badge-cta"]');
    await expect(ctaButton).toBeVisible();
    
    // Check if button has external link indicator
    await expect(ctaButton).toHaveAttribute('target', '_blank');
    await expect(ctaButton).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Test external link opens in new tab
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      ctaButton.click()
    ]);
    
    await expect(newPage).toBeTruthy();
    await newPage.close();
  });

  test('should display certificate details when available', async ({ page }) => {
    // Get badge with certificate details
    const certBadge = page.locator('[data-testid="trust-badge"][data-has-certificate="true"]:first-child');
    
    // Check if issue date is displayed
    const issueDate = certBadge.locator('[data-testid="certificate-issue-date"]');
    await expect(issueDate).toBeVisible();
    
    // Check if expiry date is displayed
    const expiryDate = certBadge.locator('[data-testid="certificate-expiry-date"]');
    await expect(expiryDate).toBeVisible();
    
    // Check if certificate number is displayed
    const certNumber = certBadge.locator('[data-testid="certificate-number"]');
    if (await certNumber.count() > 0) {
      await expect(certNumber).toBeVisible();
    }
  });

  test('should load badges from API', async ({ page }) => {
    // Wait for API call to complete
    await page.waitForResponse(response => 
      response.url().includes('/api/trust') && response.status() === 200
    );
    
    // Check if badges are loaded
    const badges = page.locator('[data-testid="trust-badge"]');
    await expect(badges).toHaveCount(6);
    
    // Check if badges have proper data attributes
    const firstBadge = badges.first();
    await expect(firstBadge).toHaveAttribute('data-badge-id');
    await expect(firstBadge).toHaveAttribute('data-badge-type');
    await expect(firstBadge).toHaveAttribute('data-category');
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('/api/trust*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Internal server error' })
      });
    });
    
    // Reload page
    await page.reload();
    
    // Check if fallback badges are displayed
    const badges = page.locator('[data-testid="trust-badge"]');
    await expect(badges).toHaveCount(6);
    
    // Check if error is handled gracefully
    await expect(page.locator('[data-testid="trust-badges-error"]')).not.toBeVisible();
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Focus on trust badges section
    await page.focus('[data-testid="trust-badges-section"]');
    
    // Navigate to first badge
    await page.keyboard.press('Tab');
    const firstBadge = page.locator('[data-testid="trust-badge"]:first-child');
    await expect(firstBadge).toBeFocused();
    
    // Navigate through badges
    await page.keyboard.press('Tab');
    const secondBadge = page.locator('[data-testid="trust-badge"]:nth-child(2)');
    await expect(secondBadge).toBeFocused();
    
    // Check if CTA buttons are keyboard accessible
    await page.keyboard.press('Enter');
    // Should trigger CTA action (navigate or open external link)
  });

  test('should display security measures section', async ({ page }) => {
    // Check if security measures section exists
    await expect(page.locator('[data-testid="security-measures-section"]')).toBeVisible();
    
    // Check if security features are displayed
    const securityFeatures = page.locator('[data-testid="security-feature"]');
    await expect(securityFeatures).toHaveCount(4);
    
    // Check specific security features
    await expect(page.locator('[data-testid="security-feature"]:has-text("256-bit Encryption")')).toBeVisible();
    await expect(page.locator('[data-testid="security-feature"]:has-text("Two-Factor Authentication")')).toBeVisible();
    await expect(page.locator('[data-testid="security-feature"]:has-text("Fraud Detection")')).toBeVisible();
    await expect(page.locator('[data-testid="security-feature"]:has-text("24/7 Monitoring")')).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="trust-badges-section"]')).toBeVisible();
    
    const mobileBadges = page.locator('[data-testid="trust-badge"]');
    await expect(mobileBadges).toHaveCount(6);
    
    // Check if badges are stacked on mobile
    const firstBadge = mobileBadges.first();
    const firstBadgeRect = await firstBadge.boundingBox();
    const secondBadge = mobileBadges.nth(1);
    const secondBadgeRect = await secondBadge.boundingBox();
    
    // On mobile, badges should be stacked vertically
    expect(secondBadgeRect.y).toBeGreaterThan(firstBadgeRect.y + firstBadgeRect.height);
    
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Check if badges are in grid layout
    const desktopBadges = page.locator('[data-testid="trust-badge"]');
    await expect(desktopBadges).toHaveCount(6);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check trust badges section ARIA attributes
    const section = page.locator('[data-testid="trust-badges-section"]');
    await expect(section).toHaveAttribute('role', 'region');
    await expect(section).toHaveAttribute('aria-label', 'Trust & Credibility');
    
    // Check badge ARIA attributes
    const badges = page.locator('[data-testid="trust-badge"]');
    const firstBadge = badges.first();
    await expect(firstBadge).toHaveAttribute('role', 'article');
    
    // Check badge icon ARIA attributes
    const badgeIcon = firstBadge.locator('[data-testid="badge-icon"]');
    await expect(badgeIcon).toHaveAttribute('aria-hidden', 'true');
    
    // Check CTA button ARIA attributes
    const ctaButton = firstBadge.locator('[data-testid="badge-cta"]');
    await expect(ctaButton).toHaveAttribute('aria-label');
    await expect(ctaButton).toHaveAttribute('role', 'link');
  });

  test('should track analytics events', async ({ page }) => {
    // Listen for analytics events
    const analyticsEvents: any[] = [];
    await page.evaluate(() => {
      window.analyticsEvents = [];
      const originalTrack = window.trackPageView;
      window.trackPageView = (event: string, data: any) => {
        window.analyticsEvents.push({ event, data });
        originalTrack(event, data);
      };
    });
    
    // Click on a badge
    await page.click('[data-testid="trust-badge"]:first-child [data-testid="badge-cta"]');
    
    // Check if analytics event was tracked
    const events = await page.evaluate(() => window.analyticsEvents);
    const trustEvents = events.filter((e: any) => e.event === 'Trust Badges');
    expect(trustEvents.length).toBeGreaterThan(0);
  });
});

test.describe('Trust Badges Performance', () => {
  test('should load within performance budget', async ({ page }) => {
    // Start performance monitoring
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for trust badges to load
    await page.waitForSelector('[data-testid="trust-badge"]');
    
    // Check load time
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000); // 2 seconds max
    
    // Check for layout shifts
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const clsValue = entries.reduce((sum, entry) => {
            if (!entry.hadRecentInput) {
              return sum + entry.value;
            }
            return sum;
          }, 0);
          resolve(clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
      });
    });
    
    expect(cls).toBeLessThan(0.1); // CLS should be minimal
  });

  test('should handle rapid interactions smoothly', async ({ page }) => {
    await page.goto('/');
    
    // Rapid hover test
    const badges = page.locator('[data-testid="trust-badge"]');
    for (let i = 0; i < badges.count(); i++) {
      await badges.nth(i).hover();
      await page.waitForTimeout(50); // Minimal wait
    }
    
    // Check if trust badges section is still functional
    await expect(page.locator('[data-testid="trust-badges-section"]')).toBeVisible();
    
    // Check for JavaScript errors
    const errors = await page.evaluate(() => {
      return (window as any).consoleErrors || [];
    });
    expect(errors.length).toBe(0);
  });
});
