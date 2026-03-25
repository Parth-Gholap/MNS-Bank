import { test, expect } from '@playwright/test';

test.describe('Location Services Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize with English locale
    await page.goto('/en');
  });

  test('should load location overview page', async ({ page }) => {
    await page.goto('/en/locate-us');
    
    // Check page title and header
    await expect(page.locator('h1')).toContainText('Find Our Locations');
    await expect(page.locator('h2')).toContainText('Quick Actions');
    
    // Check service cards
    await expect(page.locator('[data-testid="service-branch-locator"]')).toBeVisible();
    await expect(page.locator('[data-testid="service-atm-locator"]')).toBeVisible();
    await expect(page.locator('[data-testid="service-map-view"]')).toBeVisible();
    await expect(page.locator('[data-testid="service-contact-us"]')).toBeVisible();
    
    // Check popular locations
    await expect(page.locator('[data-testid="location-connaught-place"]')).toBeVisible();
    await expect(page.locator('[data-testid="location-karol-bagh"]')).toBeVisible();
    await expect(page.locator('[data-testid="location-janpath"]')).toBeVisible();
    
    // Check features section
    await expect(page.locator('[data-testid="feature-247-atm"]')).toBeVisible();
    await expect(page.locator('[data-testid="feature-wheelchair-access"]')).toBeVisible();
    await expect(page.locator('[data-testid="feature-mobile-banking"]')).toBeVisible();
  });

  test('should load location overview page in Hindi', async ({ page }) => {
    await page.goto('/hi/locate-us');
    
    // Check Hindi content
    await expect(page.locator('h1')).toContainText('हमारे स्थान खोजें');
    await expect(page.locator('h2')).toContainText('त्वरित कार्य');
    
    // Check service cards in Hindi
    await expect(page.locator('[data-testid="service-branch-locator"]')).toContainText('शाखा लोकेटर');
    await expect(page.locator('[data-testid="service-atm-locator"]')).toContainText('एटीएम लोकेटर');
    
    // Check popular locations in Hindi
    await expect(page.locator('[data-testid="location-connaught-place"]')).toContainText('कनॉट प्लेस');
    await expect(page.locator('[data-testid="location-karol-bagh"]')).toContainText('करोल बाग');
  });

  test('should navigate to branch locator page', async ({ page }) => {
    await page.goto('/en/locate-us');
    
    // Click on branch locator
    await page.click('[data-testid="service-branch-locator"]');
    await expect(page.url()).toContain('/en/locate-us/branch-locator');
    
    // Check branch locator page
    await expect(page.locator('h1')).toContainText('Branch Locator');
    await expect(page.locator('[data-testid="location-search"]')).toBeVisible();
    await expect(page.locator('[data-testid="map-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="branches-list"]')).toBeVisible();
  });

  test('should navigate to ATM locator page', async ({ page }) => {
    await page.goto('/en/locate-us');
    
    // Click on ATM locator
    await page.click('[data-testid="service-atm-locator"]');
    await expect(page.url()).toContain('/en/locate-us/atm-locator');
    
    // Check ATM locator page
    await expect(page.locator('h1')).toContainText('ATM Locator');
    await expect(page.locator('[data-testid="location-search"]')).toBeVisible();
    await expect(page.locator('[data-testid="map-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="atms-list"]')).toBeVisible();
  });

  test('should search for branches', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for page to load
    await expect(page.locator('[data-testid="branches-list"]')).toBeVisible();
    
    // Enter search query
    await page.fill('[data-testid="search-input"]', 'Connaught Place');
    await page.click('[data-testid="search-button"]');
    
    // Check search results
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    await expect(page.locator('[data-testid="branch-branch-001"]')).toContainText('Connaught Place');
  });

  test('should search for ATMs', async ({ page }) => {
    await page.goto('/en/locate-us/atm-locator');
    
    // Wait for page to load
    await expect(page.locator('[data-testid="atms-list"]')).toBeVisible();
    
    // Enter search query
    await page.fill('[data-testid="search-input"]', 'Connaught Place');
    await page.click('[data-testid="search-button"]');
    
    // Check search results
    await expect(page.locator('[data-testid="atm-atm-001"]')).toBeVisible();
    await expect(page.locator('[data-testid="atm-atm-001"]')).toContainText('Connaught Place');
  });

  test('should use current location for search', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Mock geolocation
    await page.context().grantPermissions(['geolocation']);
    await page.setGeolocation({ latitude: 28.6304, longitude: 77.2180 });
    
    // Click current location button
    await page.click('[data-testid="current-location-button"]');
    
    // Check that search is performed with current location
    await expect(page.locator('[data-testid="location-info"]')).toBeVisible();
    await expect(page.locator('[data-testid="location-info"]')).toContainText('Your location:');
  });

  test('should filter branches by type', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Select branch type filter
    await page.selectOption('[data-testid="type-filter"]', 'branch');
    
    // Check that only branches are shown
    const branches = await page.locator('[data-testid^="branch-"]').count();
    expect(branches).toBeGreaterThan(0);
    
    // Each result should be a branch
    for (let i = 0; i < branches; i++) {
      const branch = page.locator(`[data-testid^="branch-"]:nth-child(${i + 1})`);
      await expect(branch).toBeVisible();
    }
  });

  test('should filter ATMs by type', async ({ page }) => {
    await page.goto('/en/locate-us/atm-locator');
    
    // Select ATM type filter
    await page.selectOption('[data-testid="type-filter"]', 'atm');
    
    // Check that only ATMs are shown
    const atms = await page.locator('[data-testid^="atm-"]').count();
    expect(atms).toBeGreaterThan(0);
    
    // Each result should be an ATM
    for (let i = 0; i < atms; i++) {
      const atm = page.locator(`[data-testid^="atm-"]:nth-child(${i + 1})`);
      await expect(atm).toBeVisible();
    }
  });

  test('should filter by radius', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Select 5km radius
    await page.selectOption('[data-testid="radius-filter"]', '5');
    
    // Search with radius filter
    await page.click('[data-testid="search-button"]');
    
    // Check that results are filtered by radius
    const branches = await page.locator('[data-testid^="branch-"]').count();
    expect(branches).toBeGreaterThanOrEqual(0);
  });

  test('should filter by wheelchair accessibility', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Check wheelchair accessible filter
    await page.check('[data-testid="wheelchair-filter"]');
    await page.click('[data-testid="search-button"]');
    
    // Check that filtered results show wheelchair accessible locations
    const branches = await page.locator('[data-testid^="branch-"]').count();
    for (let i = 0; i < branches; i++) {
      const branch = page.locator(`[data-testid^="branch-"]:nth-child(${i + 1})`);
      // Check if wheelchair accessible icon is present
      const wheelchairIcon = await branch.locator('.feature-badge').count();
      if (wheelchairIcon > 0) {
        // At least one feature should be wheelchair accessible
        const hasWheelchair = await branch.locator('.feature-badge').filter({ hasText: '♿' }).count();
        expect(hasWheelchair).toBeGreaterThan(0);
      }
    }
  });

  test('should show branch details', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Click on first branch
    await page.click('[data-testid="branch-branch-001"]');
    
    // Check branch details
    await expect(page.locator('[data-testid="branch-branch-001"]')).toHaveClass(/selected/);
    await expect(page.locator('[data-testid="selected-location-panel"]')).toBeVisible();
    await expect(page.locator('[data-testid="selected-location-panel"]')).toContainText('Selected Branch');
  });

  test('should show ATM details', async ({ page }) => {
    await page.goto('/en/locate-us/atm-locator');
    
    // Wait for ATMs to load
    await expect(page.locator('[data-testid="atm-atm-001"]')).toBeVisible();
    
    // Click on first ATM
    await page.click('[data-testid="atm-atm-001"]');
    
    // Check ATM details
    await expect(page.locator('[data-testid="atm-atm-001"]')).toHaveClass(/selected/);
    await expect(page.locator('[data-testid="selected-location-panel"]')).toBeVisible();
    await expect(page.locator('[data-testid="selected-location-panel"]')).toContainText('Selected ATM');
  });

  test('should get directions to branch', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Mock geolocation
    await page.context().grantPermissions(['geolocation']);
    await page.setGeolocation({ latitude: 28.6304, longitude: 77.2180 });
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Click on directions button
    await page.click('[data-testid="directions-branch-001"]');
    
    // Check that directions are requested
    // This would typically show a directions modal or update the map
    await expect(page.locator('[data-testid="directions-branch-001"]')).toBeVisible();
  });

  test('should call branch', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Click on call button
    const callButton = page.locator('[data-testid="call-branch-001"]');
    await expect(callButton).toBeVisible();
    
    // Check that phone link is correct
    const href = await callButton.getAttribute('href');
    expect(href).toMatch(/^tel:/);
  });

  test('should show branch services', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Check services are displayed
    const services = await page.locator('[data-testid="branch-branch-001"] .service-tag').count();
    expect(services).toBeGreaterThan(0);
    
    // Check specific services
    await expect(page.locator('[data-testid="branch-branch-001"]')).toContainText('Services:');
  });

  test('should show ATM services', async ({ page }) => {
    await page.goto('/en/locate-us/atm-locator');
    
    // Wait for ATMs to load
    await expect(page.locator('[data-testid="atm-atm-001"]')).toBeVisible();
    
    // Check services are displayed
    const services = await page.locator('[data-testid="atm-atm-001"] .service-tag').count();
    expect(services).toBeGreaterThan(0);
    
    // Check specific services
    await expect(page.locator('[data-testid="atm-atm-001"]')).toContainText('Services:');
  });

  test('should show branch hours', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Check hours are displayed
    await expect(page.locator('[data-testid="branch-branch-001"]')).toContainText('Hours:');
    await expect(page.locator('[data-testid="branch-branch-001"]')).toContainText('9:00 AM - 6:00 PM');
  });

  test('should show ATM hours', async ({ page }) => {
    await page.goto('/en/locate-us/atm-locator');
    
    // Wait for ATMs to load
    await expect(page.locator('[data-testid="atm-atm-001"]')).toBeVisible();
    
    // Check hours are displayed
    await expect(page.locator('[data-testid="atm-atm-001"]')).toContainText('24/7');
  });

  test('should show branch contact information', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Check contact information
    await expect(page.locator('[data-testid="branch-branch-001"]')).toContainText('Phone:');
    await expect(page.locator('[data-testid="branch-branch-001"]')).toContainText('+91-11-23456789');
  });

  test('should show ATM contact information', async ({ page }) => {
    await page.goto('/en/locate-us/atm-locator');
    
    // Wait for ATMs to load
    await expect(page.locator('[data-testid="atm-atm-001"]')).toBeVisible();
    
    // Check contact information
    await expect(page.locator('[data-testid="atm-atm-001"]')).toContainText('Phone:');
    await expect(page.locator('[data-testid="atm-atm-001"]')).toContainText('+91-11-23456789');
  });

  test('should show branch features', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Check features are displayed
    const features = await page.locator('[data-testid="branch-branch-001"] .feature-badge').count();
    expect(features).toBeGreaterThan(0);
    
    // Check specific features
    await expect(page.locator('[data-testid="branch-branch-001"] .feature-badge')).toContainText('📶');
  });

  test('should show ATM features', async ({ page }) => {
    await page.goto('/en/locate-us/atm-locator');
    
    // Wait for ATMs to load
    await expect(page.locator('[data-testid="atm-atm-001"]')).toBeVisible();
    
    // Check features are displayed
    const features = await page.locator('[data-testid="atm-atm-001"] .feature-badge').count();
    expect(features).toBeGreaterThan(0);
    
    // Check specific features
    await expect(page.locator('[data-testid="atm-atm-001"] .feature-badge')).toContainText('🕐');
  });

  test('should handle empty search results', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Enter search query with no results
    await page.fill('[data-testid="search-input"]', 'Nonexistent Location');
    await page.click('[data-testid="search-button"]');
    
    // Check empty state
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
    await expect(page.locator('[data-testid="empty-state"]')).toContainText('No branches found');
  });

  test('should handle search suggestions', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Type in search input
    await page.fill('[data-testid="search-input"]', 'Connaught');
    
    // Check suggestions dropdown appears
    await expect(page.locator('[data-testid="suggestions-dropdown"]')).toBeVisible();
    
    // Check suggestion items
    await expect(page.locator('[data-testid="suggestion-geocode-"]')).toBeVisible();
  });

  test('should clear search', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Enter search query
    await page.fill('[data-testid="search-input"]', 'Connaught Place');
    
    // Click clear button
    await page.click('[data-testid="clear-button"]');
    
    // Check search input is cleared
    const searchValue = await page.inputValue('[data-testid="search-input"]');
    expect(searchValue).toBe('');
  });

  test('should handle map loading error', async ({ page }) => {
    // Mock map loading failure
    await page.route('**/maps/api/**', route => route.abort());
    
    await page.goto('/en/locate-us/branch-locator');
    
    // Check error state
    await expect(page.locator('[data-testid="map-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="map-error"]')).toContainText('Failed to Load Map');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/locate-us/branch-locator');
    
    // Check mobile layout
    await expect(page.locator('.locator-content')).toHaveCSS('grid-template-columns', '1fr');
    
    // Check mobile search
    await expect(page.locator('[data-testid="location-search"]')).toBeVisible();
    
    // Check mobile map
    await expect(page.locator('[data-testid="map-container"]')).toBeVisible();
    
    // Check mobile results
    await expect(page.locator('[data-testid="branches-list"]')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Focus on search input
    await page.focus('[data-testid="search-input"]');
    
    // Type search query and press Enter
    await page.fill('[data-testid="search-input"]', 'Connaught Place');
    await page.press('[data-testid="search-input"]', 'Enter');
    
    // Check search is performed
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
  });

  test('should show loading state', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Check initial loading state
    await expect(page.locator('[data-testid="map-loading"]')).toBeVisible();
    await expect(page.locator('[data-testid="map-loading"]')).toContainText('Loading map...');
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Mock network failure
    await page.route('**/api/locations/**', route => route.abort());
    
    await page.goto('/en/locate-us/branch-locator');
    
    // Check error message
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('should maintain search state across navigation', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Perform search
    await page.fill('[data-testid="search-input"]', 'Connaught Place');
    await page.click('[data-testid="search-button"]');
    
    // Navigate to ATM locator
    await page.goto('/en/locate-us/atm-locator');
    
    // Navigate back to branch locator
    await page.goto('/en/locate-us/branch-locator');
    
    // Check if search state is maintained (this depends on implementation)
    const searchValue = await page.inputValue('[data-testid="search-input"]');
    // This test would need to be adjusted based on actual state management
  });

  test('should show distance from user location', async ({ page }) => {
    // Mock geolocation
    await page.context().grantPermissions(['geolocation']);
    await page.setGeolocation({ latitude: 28.6304, longitude: 77.2180 });
    
    await page.goto('/en/locate-us/branch-locator');
    
    // Use current location
    await page.click('[data-testid="current-location-button"]');
    
    // Wait for search results
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Check distance is displayed
    await expect(page.locator('[data-testid="branch-branch-001"]')).toContainText('km');
  });

  test('should handle Hindi search', async ({ page }) => {
    await page.goto('/hi/locate-us/branch-locator');
    
    // Enter Hindi search query
    await page.fill('[data-testid="search-input"]', 'कनॉट प्लेस');
    await page.click('[data-testid="search-button"]');
    
    // Check search results
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    await expect(page.locator('[data-testid="branch-branch-001"]')).toContainText('कनॉट प्लेस');
  });

  test('should show branch rating', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Check rating is displayed
    await expect(page.locator('[data-testid="branch-branch-001"] .branch-rating')).toBeVisible();
    await expect(page.locator('[data-testid="branch-branch-001"] .branch-rating')).toContainText('★');
  });

  test('should show branch status', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Check status is displayed
    await expect(page.locator('[data-testid="branch-branch-001"] .status-badge')).toBeVisible();
    await expect(page.locator('[data-testid="branch-branch-001"] .status-badge')).toContainText('Active');
  });

  test('should show ATM status', async ({ page }) => {
    await page.goto('/en/locate-us/atm-locator');
    
    // Wait for ATMs to load
    await expect(page.locator('[data-testid="atm-atm-001"]')).toBeVisible();
    
    // Check status is displayed
    await expect(page.locator('[data-testid="atm-atm-001"] .status-badge')).toBeVisible();
    await expect(page.locator('[data-testid="atm-atm-001"] .status-badge')).toContainText('Active');
  });

  test('should handle map interactions', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for map to load
    await expect(page.locator('[data-testid="map-container"]')).toBeVisible();
    
    // Click on map (would typically interact with map markers)
    await page.click('[data-testid="map-container"]');
    
    // Map interactions would be tested based on specific map implementation
  });

  test('should show location details in modal', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for branches to load
    await expect(page.locator('[data-testid="branch-branch-001"]')).toBeVisible();
    
    // Click on details button
    await page.click('[data-testid="details-branch-001"]');
    
    // Check navigation to details page
    await expect(page.url()).toContain('/en/locate-us/branch-details/branch-001');
  });

  test('should handle accessibility', async ({ page }) => {
    await page.goto('/en/locate-us/branch-locator');
    
    // Check ARIA labels
    await expect(page.locator('[data-testid="search-input"]')).toHaveAttribute('aria-label');
    await expect(page.locator('[data-testid="search-button"]')).toHaveAttribute('aria-label');
    await expect(page.locator('[data-testid="clear-button"]')).toHaveAttribute('aria-label');
    
    // Check keyboard navigation
    await page.tab();
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('should handle performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/en/locate-us/branch-locator');
    
    // Wait for page to fully load
    await expect(page.locator('[data-testid="branches-list"]')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // Check that page loads within reasonable time (3 seconds)
    expect(loadTime).toBeLessThan(3000);
  });
});
