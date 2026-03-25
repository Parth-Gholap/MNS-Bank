import { test, expect } from '@playwright/test';
import { AxeBuilder, createAxeBuilder } from '@axe-core/playwright';

// Accessibility Tests for Navigation Components
test.describe('Navigation Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Header Accessibility', () => {
    test('should have proper heading structure', async ({ page }) => {
      // Check if main navigation has proper heading
      const mainNav = page.locator('nav[aria-label="Main navigation"]');
      
      // Check if navigation has proper ARIA label
      await expect(mainNav).toHaveAttribute('aria-label', 'Main navigation');
      
      // Check if navigation is properly structured as a navigation landmark
      await expect(mainNav).toHaveRole('navigation');
    });

    test('should have accessible menu items', async ({ page }) => {
      // Check if menu items are properly structured
      const menuItems = page.locator('nav a');
      
      // Check if all menu items have accessible names
      const itemCount = await menuItems.count();
      for (let i = 0; i < itemCount; i++) {
        const item = menuItems.nth(i);
        
        // Check if menu items have proper ARIA attributes
        await expect(item).toHaveAttribute('href');
        await expect(item).toHaveAccessibleName();
        
        // Check if menu items are keyboard accessible
        await expect(item).toBeTabbable();
      }
    });

    test('should have accessible dropdown menus', async ({ page }) => {
      // Check if dropdown menus are accessible
      const personalBanking = page.locator('a[href*="/personal"]');
      await personalBanking.hover();
      
      const dropdown = page.locator('[data-testid="personal-dropdown"]');
      
      // Check if dropdown is properly announced
      await expect(dropdown).toHaveAttribute('aria-expanded', 'true');
      
      // Check if dropdown items are accessible
      const dropdownItems = dropdown.locator('a');
      const dropdownItemCount = await dropdownItems.count();
      
      for (let i = 0; i < dropdownItemCount; i++) {
        const item = dropdownItems.nth(i);
        await expect(item).toHaveAccessibleName();
        await expect(item).toBeTabbable();
        await expect(item).toHaveAttribute('href');
      }
    });

    test('should have accessible language toggle', async ({ page }) => {
      // Check if language toggle is accessible
      const languageToggle = page.locator('[data-testid="language-toggle"]');
      
      // Check if language toggle has proper ARIA attributes
      await expect(languageToggle).toHaveAttribute('aria-label');
      await expect(languageToggle).toHaveAttribute('role', 'button');
      await expect(languageToggle).toBeTabbable();
      
      // Check if current language is announced
      const currentLanguage = languageToggle.locator('[data-testid="current-language"]');
      await expect(currentLanguage).toHaveAccessibleName();
    });

    test('should have accessible accessibility toolbar', async ({ page }) => {
      // Check if accessibility toolbar is accessible
      const accessibilityToolbar = page.locator('[data-testid="accessibility-toolbar"]');
      
      // Check if toolbar has proper ARIA label
      await expect(accessibilityToolbar).toHaveAttribute('aria-label');
      await expect(accessibilityToolbar).toHaveRole('toolbar');
      
      // Check if accessibility controls are accessible
      const increaseText = accessibilityToolbar.locator('[data-testid="increase-text"]');
      const decreaseText = accessibilityToolbar.locator('[data-testid="decrease-text"]');
      const highContrast = accessibilityToolbar.locator('[data-testid="high-contrast"]');
      const resetAccessibility = accessibilityToolbar.locator('[data-testid="reset-accessibility"]');
      
      await expect(increaseText).toHaveAttribute('aria-label');
      await expect(increaseText).toHaveAttribute('role', 'button');
      await expect(increaseText).toBeTabbable();
      
      await expect(decreaseText).toHaveAttribute('aria-label');
      await expect(decreaseText).toHaveAttribute('role', 'button');
      await expect(decreaseText).toBeTabbable();
      
      await expect(highContrast).toHaveAttribute('aria-label');
      await expect(highContrast).toHaveAttribute('role', 'button');
      await expect(highContrast).toBeTabbable();
      
      await expect(resetAccessibility).toHaveAttribute('aria-label');
      await expect(resetAccessibility).toHaveAttribute('role', 'button');
      await expect(resetAccessibility).toBeTabbable();
    });

    test('should have accessible net banking button', async ({ page }) => {
      // Check if net banking button is accessible
      const netBankingButton = page.locator('[data-testid="net-banking-button"]');
      
      // Check if net banking button has proper ARIA attributes
      await expect(netBankingButton).toHaveAttribute('aria-label');
      await expect(netBankingButton).toHaveAttribute('role', 'button');
      await expect(netBankingButton).toBeTabbable();
      
      // Check if button opens in new window
      await expect(netBankingButton).toHaveAttribute('target', '_blank');
      await expect(netBankingButton).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test.describe('Mobile Navigation Accessibility', () => {
    test('should have accessible mobile menu', async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check if mobile menu button is accessible
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      await expect(mobileMenuButton).toHaveAttribute('aria-label');
      await expect(mobileMenuButton).toHaveAttribute('role', 'button');
      await expect(mobileMenuButton).toBeTabbable();
      
      // Open mobile menu
      await mobileMenuButton.click();
      await page.waitForSelector('[data-testid="mobile-menu"]');
      
      // Check if mobile menu is accessible
      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      await expect(mobileMenu).toHaveAttribute('role', 'dialog');
      await expect(mobileMenu).toHaveAttribute('aria-modal', 'true');
      await expect(mobileMenu).toHaveAttribute('aria-label');
      
      // Check if mobile menu items are accessible
      const menuItems = mobileMenu.locator('a');
      const itemCount = await menuItems.count();
      
      for (let i = 0; i < itemCount; i++) {
        const item = menuItems.nth(i);
        await expect(item).toHaveAccessibleName();
        await expect(item).toBeTabbable();
        await expect(item).toHaveAttribute('href');
      }
      
      // Check if close button is accessible
      const closeButton = mobileMenu.locator('[data-testid="mobile-menu-close"]');
      await expect(closeButton).toHaveAttribute('aria-label');
      await expect(closeButton).toHaveAttribute('role', 'button');
      await expect(closeButton).toBeTabbable();
    });
  });

  test.describe('Footer Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      // Scroll to bottom to ensure footer is in view
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    });

    test('should have proper landmark structure', async ({ page }) => {
      // Check if footer has proper contentinfo landmark
      const footer = page.locator('footer');
      await expect(footer).toHaveRole('contentinfo');
      
      // Check if footer sections are properly structured
      const aboutUsSection = footer.locator('[data-testid="footer-about-us"]');
      const personalSection = footer.locator('[data-testid="footer-personal"]');
      const businessSection = footer.locator('[data-testid="footer-business"]');
      const complianceSection = footer.locator('[data-testid="footer-compliance"]');
      const contactSection = footer.locator('[data-testid="footer-contact"]');
      
      await expect(aboutUsSection).toHaveRole('navigation');
      await expect(personalSection).toHaveRole('navigation');
      await expect(businessSection).toHaveRole('navigation');
      await expect(complianceSection).toHaveRole('navigation');
      await expect(contactSection).toHaveRole('navigation');
    });

    test('should have accessible footer links', async ({ page }) => {
      // Check if footer links are accessible
      const footerLinks = page.locator('footer a');
      const linkCount = await footerLinks.count();
      
      for (let i = 0; i < linkCount; i++) {
        const link = footerLinks.nth(i);
        await expect(link).toHaveAccessibleName();
        await expect(link).toBeTabbable();
        await expect(link).toHaveAttribute('href');
        
        // Check if external links have proper attributes
        const href = await link.getAttribute('href');
        if (href && (href.includes('http') || href.includes('www'))) {
          await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        }
      }
    });

    test('should have accessible trust indicators', async ({ page }) => {
      // Check if trust indicators are accessible
      const trustIndicators = page.locator('[data-testid="trust-indicators"]');
      
      // Check if trust indicators are properly structured
      const trustLinks = trustIndicators.locator('a');
      const trustCount = await trustLinks.count();
      
      for (let i = 0; i < trustCount; i++) {
        const link = trustLinks.nth(i);
        await expect(link).toHaveAccessibleName();
        await expect(link).toBeTabbable();
        await expect(link).toHaveAttribute('href');
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should support keyboard navigation', async ({ page }) => {
      // Test Tab navigation through header
      await page.keyboard.press('Tab');
      
      // Check if focus moves to first focusable element
      const firstFocusable = page.locator(':focus');
      await expect(firstFocusable).toBeVisible();
      
      // Continue Tab navigation
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const focusedElement = page.locator(':focus');
        
        // Check if focus is visible and interactive
        if (await focusedElement.count() > 0) {
          await expect(focusedElement).toBeVisible();
          const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
          expect(['a', 'button', 'input', 'select']).toContain(tagName);
        }
      }
      
      // Test Shift+Tab for backward navigation
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Shift+Tab');
        const focusedElement = page.locator(':focus');
        
        if (await focusedElement.count() > 0) {
          await expect(focusedElement).toBeVisible();
        }
      }
      
      // Test Enter key on focused elements
      const focusedButton = page.locator(':focus');
      if (await focusedButton.count() > 0) {
        const tagName = await focusedButton.evaluate(el => el.tagName.toLowerCase());
        if (tagName === 'button' || tagName === 'a') {
          await page.keyboard.press('Enter');
          // Check if Enter key activates the element
          // This would typically navigate or trigger an action
        }
      }
    });

    test('should support Escape key for closing modals', async ({ page }) => {
      // Set mobile viewport and open mobile menu
      await page.setViewportSize({ width: 375, height: 667 });
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      await mobileMenuButton.click();
      await page.waitForSelector('[data-testid="mobile-menu"]');
      
      // Test Escape key to close mobile menu
      await page.keyboard.press('Escape');
      
      // Check if mobile menu closes
      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      await expect(mobileMenu).not.toBeVisible();
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    test('should announce page changes to screen readers', async ({ page }) => {
      // Check if page has proper language declaration
      const htmlLang = page.locator('html');
      await expect(htmlLang).toHaveAttribute('lang');
      
      // Check if page has proper title
      const title = page.locator('title');
      await expect(title).toHaveText(/Mahanagar Nagrik Sahakari Bank|MNS Bank/);
      
      // Test language toggle announcement
      const languageToggle = page.locator('[data-testid="language-toggle"]');
      await languageToggle.click();
      
      // Check if language change is announced
      // This would typically be handled by ARIA live regions
      const body = page.locator('body');
      await expect(body).toHaveAttribute('dir');
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      // Check if page has proper heading structure
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      
      // Check if headings are properly nested
      let previousLevel = 0;
      for (let i = 0; i < headingCount; i++) {
        const heading = headings.nth(i);
        const level = parseInt(await heading.evaluate(el => el.tagName.substring(1)));
        
        // Check if heading levels don't skip levels
        expect(level).toBeLessThanOrEqual(previousLevel + 1);
        previousLevel = level;
        
        // Check if headings have accessible content
        await expect(heading).toHaveAccessibleName();
      }
    });
  });

  test.describe('Color Contrast and Visual Accessibility', () => {
    test('should have sufficient color contrast', async ({ page }) => {
      // Run axe-core for color contrast violations
      const accessibilityResults = await createAxeBuilder(page).analyze();
      
      // Check for color contrast issues
      const contrastViolations = accessibilityResults.violations.filter(
        violation => violation.id === 'color-contrast'
      );
      
      expect(contrastViolations).toHaveLength(0);
    });

    test('should support high contrast mode', async ({ page }) => {
      // Enable high contrast mode
      const highContrastButton = page.locator('[data-testid="high-contrast"]');
      await highContrastButton.click();
      
      // Check if high contrast styles are applied
      const body = page.locator('body');
      await expect(body).toHaveClass('high-contrast');
      
      // Run axe-core again to check for improvements
      const accessibilityResults = await createAxeBuilder(page).analyze();
      
      // Check if high contrast mode reduces violations
      const contrastViolations = accessibilityResults.violations.filter(
        violation => violation.id === 'color-contrast'
      );
      
      // High contrast mode should reduce or eliminate contrast violations
      expect(contrastViolations.length).toBeLessThanOrEqual(0);
    });

    test('should maintain focus visibility', async ({ page }) => {
      // Check if focus indicators are visible
      const focusableElements = page.locator('a, button, input, select, textarea');
      const elementCount = await focusableElements.count();
      
      // Test focus on various elements
      for (let i = 0; i < Math.min(elementCount, 5); i++) {
        const element = focusableElements.nth(i);
        await element.focus();
        
        // Check if focus is visible
        await expect(element).toBeVisible();
        
        // Check if element has visible focus indicator
        const computedStyle = await element.evaluate(el => 
          window.getComputedStyle(el)
        );
        
        // Focus should have visible outline or background change
        const hasFocusIndicator = 
          computedStyle.outline !== 'none' || 
          computedStyle.boxShadow !== 'none' ||
          computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)';
        
        expect(hasFocusIndicator).toBe(true);
      }
    });
  });

  test.describe('Responsive Design Accessibility', () => {
    test('should maintain accessibility across screen sizes', async ({ page }) => {
      const screenSizes = [
        { width: 1920, height: 1080 }, // Desktop
        { width: 768, height: 1024 },  // Tablet
        { width: 375, height: 667 }   // Mobile
      ];
      
      for (const size of screenSizes) {
        await page.setViewportSize(size);
        await page.waitForLoadState('networkidle');
        
        // Run axe-core for each screen size
        const accessibilityResults = await createAxeBuilder(page).analyze();
        
        // Check for critical accessibility violations
        const criticalViolations = accessibilityResults.violations.filter(
          violation => violation.impact === 'critical'
        );
        
        // Should have no critical violations on any screen size
        expect(criticalViolations).toHaveLength(0);
        
        // Check if navigation is accessible on all screen sizes
        const mainNav = page.locator('nav[aria-label="Main navigation"]');
        const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
        
        if (size.width >= 768) {
          // Desktop/Tablet: Main navigation should be visible
          await expect(mainNav).toBeVisible();
          await expect(mainNav).toBeTabbable();
        } else {
          // Mobile: Mobile menu button should be visible
          await expect(mobileMenuButton).toBeVisible();
          await expect(mobileMenuButton).toBeTabbable();
        }
      }
    });
  });

  test.describe('ARIA Compliance', () => {
    test('should have proper ARIA landmarks', async ({ page }) => {
      // Check for proper ARIA landmarks
      const mainNav = page.locator('nav[aria-label="Main navigation"]');
      const main = page.locator('main');
      const footer = page.locator('footer');
      
      await expect(mainNav).toHaveRole('navigation');
      await expect(main).toHaveRole('main');
      await expect(footer).toHaveRole('contentinfo');
    });

    test('should have proper ARIA labels and descriptions', async ({ page }) => {
      // Check for proper ARIA labeling
      const languageToggle = page.locator('[data-testid="language-toggle"]');
      const accessibilityToolbar = page.locator('[data-testid="accessibility-toolbar"]');
      const netBankingButton = page.locator('[data-testid="net-banking-button"]');
      
      // All interactive elements should have accessible names
      await expect(languageToggle).toHaveAccessibleName();
      await expect(accessibilityToolbar).toHaveAccessibleName();
      await expect(netBankingButton).toHaveAccessibleName();
      
      // Check for ARIA descriptions where appropriate
      await expect(languageToggle).toHaveAttribute('aria-label');
      await expect(accessibilityToolbar).toHaveAttribute('aria-label');
      await expect(netBankingButton).toHaveAttribute('aria-label');
    });

    test('should have proper ARIA states', async ({ page }) => {
      // Check for proper ARIA states
      const personalBanking = page.locator('a[href*="/personal"]');
      
      // Hover to open dropdown
      await personalBanking.hover();
      const dropdown = page.locator('[data-testid="personal-dropdown"]');
      
      // Check if dropdown has proper ARIA expanded state
      await expect(dropdown).toHaveAttribute('aria-expanded', 'true');
      
      // Check if dropdown controls have proper ARIA attributes
      await expect(personalBanking).toHaveAttribute('aria-haspopup', 'true');
      await expect(personalBanking).toHaveAttribute('aria-controls');
    });
  });
});
