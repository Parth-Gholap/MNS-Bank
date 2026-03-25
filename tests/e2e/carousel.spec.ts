import { test, expect } from '@playwright/test';

test.describe('Homepage Carousel', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
  });

  test('should display carousel with multiple slides', async ({ page }) => {
    // Check if carousel container exists
    await expect(page.locator('[data-testid="carousel-container"]')).toBeVisible();
    
    // Check if carousel items are loaded
    await expect(page.locator('[data-testid="carousel-item"]')).toHaveCount(4);
    
    // Check if navigation controls exist
    await expect(page.locator('[data-testid="carousel-prev"]')).toBeVisible();
    await expect(page.locator('[data-testid="carousel-next"]')).toBeVisible();
    
    // Check if slide indicators exist
    await expect(page.locator('[data-testid="carousel-indicators"]')).toBeVisible();
  });

  test('should navigate between slides using controls', async ({ page }) => {
    // Get initial active slide
    const initialSlide = page.locator('[data-testid="carousel-slide"].active');
    await expect(initialSlide).toBeVisible();
    
    // Click next button
    await page.click('[data-testid="carousel-next"]');
    
    // Wait for slide transition
    await page.waitForTimeout(500);
    
    // Check if next slide is active
    const nextSlide = page.locator('[data-testid="carousel-slide"]:nth-child(2)');
    await expect(nextSlide).toHaveClass(/active/);
    
    // Click previous button
    await page.click('[data-testid="carousel-prev"]');
    
    // Wait for slide transition
    await page.waitForTimeout(500);
    
    // Check if first slide is active again
    const firstSlide = page.locator('[data-testid="carousel-slide"]:nth-child(1)');
    await expect(firstSlide).toHaveClass(/active/);
  });

  test('should navigate using slide indicators', async ({ page }) => {
    // Click on third slide indicator
    await page.click('[data-testid="carousel-indicator"]:nth-child(3)');
    
    // Wait for slide transition
    await page.waitForTimeout(500);
    
    // Check if third slide is active
    const thirdSlide = page.locator('[data-testid="carousel-slide"]:nth-child(3)');
    await expect(thirdSlide).toHaveClass(/active/);
    
    // Check if third indicator is active
    const thirdIndicator = page.locator('[data-testid="carousel-indicator"]:nth-child(3)');
    await expect(thirdIndicator).toHaveClass(/active/);
  });

  test('should auto-play slides', async ({ page }) => {
    // Check if auto-play is enabled by default
    const playPauseButton = page.locator('[data-testid="carousel-play-pause"]');
    await expect(playPauseButton).toHaveAttribute('aria-label', /Pause/i);
    
    // Get initial active slide
    let activeSlide = page.locator('[data-testid="carousel-slide"].active');
    const initialSlideIndex = await activeSlide.getAttribute('data-slide-index');
    
    // Wait for auto-play to move to next slide (5 seconds)
    await page.waitForTimeout(5500);
    
    // Check if slide has changed
    const newActiveSlide = page.locator('[data-testid="carousel-slide"].active');
    const newSlideIndex = await newActiveSlide.getAttribute('data-slide-index');
    expect(newSlideIndex).not.toBe(initialSlideIndex);
  });

  test('should pause and resume auto-play', async ({ page }) => {
    // Click pause button
    await page.click('[data-testid="carousel-play-pause"]');
    
    // Check if button shows play icon
    const playPauseButton = page.locator('[data-testid="carousel-play-pause"]');
    await expect(playPauseButton).toHaveAttribute('aria-label', /Play/i);
    
    // Get current slide
    const currentSlide = page.locator('[data-testid="carousel-slide"].active');
    const currentSlideIndex = await currentSlide.getAttribute('data-slide-index');
    
    // Wait for auto-play duration (should not change)
    await page.waitForTimeout(5500);
    
    // Check if slide hasn't changed
    const sameSlide = page.locator('[data-testid="carousel-slide"].active');
    const sameSlideIndex = await sameSlide.getAttribute('data-slide-index');
    expect(sameSlideIndex).toBe(currentSlideIndex);
    
    // Click play button to resume
    await page.click('[data-testid="carousel-play-pause"]');
    
    // Check if button shows pause icon
    await expect(playPauseButton).toHaveAttribute('aria-label', /Pause/i);
  });

  test('should display slide content correctly', async ({ page }) => {
    // Check first slide content
    const firstSlide = page.locator('[data-testid="carousel-slide"]:nth-child(1)');
    
    // Check if image is loaded
    const slideImage = firstSlide.locator('[data-testid="slide-image"]');
    await expect(slideImage).toBeVisible();
    await expect(slideImage).toHaveAttribute('src');
    
    // Check if title is displayed
    const slideTitle = firstSlide.locator('[data-testid="slide-title"]');
    await expect(slideTitle).toBeVisible();
    await expect(slideTitle).not.toBeEmpty();
    
    // Check if description is displayed
    const slideDescription = firstSlide.locator('[data-testid="slide-description"]');
    await expect(slideDescription).toBeVisible();
    await expect(slideDescription).not.toBeEmpty();
    
    // Check if CTA button is displayed
    const slideCTA = firstSlide.locator('[data-testid="slide-cta"]');
    await expect(slideCTA).toBeVisible();
    await expect(slideCTA).toHaveAttribute('href');
  });

  test('should display thumbnail navigation', async ({ page }) => {
    // Check if thumbnail container exists
    await expect(page.locator('[data-testid="carousel-thumbnails"]')).toBeVisible();
    
    // Check if all thumbnails are displayed
    const thumbnails = page.locator('[data-testid="carousel-thumbnail"]');
    await expect(thumbnails).toHaveCount(4);
    
    // Check if first thumbnail is active
    const firstThumbnail = page.locator('[data-testid="carousel-thumbnail"]:nth-child(1)');
    await expect(firstThumbnail).toHaveClass(/active/);
    
    // Click on second thumbnail
    await page.click('[data-testid="carousel-thumbnail"]:nth-child(2)');
    
    // Wait for slide transition
    await page.waitForTimeout(500);
    
    // Check if second thumbnail is active
    const secondThumbnail = page.locator('[data-testid="carousel-thumbnail"]:nth-child(2)');
    await expect(secondThumbnail).toHaveClass(/active/);
    
    // Check if second slide is active
    const secondSlide = page.locator('[data-testid="carousel-slide"]:nth-child(2)');
    await expect(secondSlide).toHaveClass(/active/);
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Focus on carousel
    await page.focus('[data-testid="carousel-container"]');
    
    // Navigate using arrow keys
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    
    // Check if next slide is active
    const nextSlide = page.locator('[data-testid="carousel-slide"]:nth-child(2)');
    await expect(nextSlide).toHaveClass(/active/);
    
    // Navigate back using arrow keys
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
    
    // Check if first slide is active again
    const firstSlide = page.locator('[data-testid="carousel-slide"]:nth-child(1)');
    await expect(firstSlide).toHaveClass(/active/);
    
    // Check if indicators are keyboard accessible
    const indicators = page.locator('[data-testid="carousel-indicator"]');
    await expect(indicators.first()).toBeFocused();
    
    // Navigate indicators using Tab
    await page.keyboard.press('Tab');
    await expect(indicators.nth(1)).toBeFocused();
  });

  test('should handle touch gestures on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Get initial slide
    const initialSlide = page.locator('[data-testid="carousel-slide"].active');
    const initialSlideIndex = await initialSlide.getAttribute('data-slide-index');
    
    // Perform swipe left gesture
    const carousel = page.locator('[data-testid="carousel-container"]');
    await carousel.evaluate((el) => {
      const startX = 100;
      const endX = -100;
      const startY = 0;
      const endY = 0;
      
      const touchStart = new TouchEvent('touchstart', {
        touches: [{ clientX: startX, clientY: startY }]
      });
      const touchMove = new TouchEvent('touchmove', {
        touches: [{ clientX: endX, clientY: endY }]
      });
      const touchEnd = new TouchEvent('touchend');
      
      el.dispatchEvent(touchStart);
      el.dispatchEvent(touchMove);
      el.dispatchEvent(touchEnd);
    });
    
    // Wait for slide transition
    await page.waitForTimeout(500);
    
    // Check if slide has changed
    const newActiveSlide = page.locator('[data-testid="carousel-slide"].active');
    const newSlideIndex = await newActiveSlide.getAttribute('data-slide-index');
    expect(newSlideIndex).not.toBe(initialSlideIndex);
  });

  test('should load slides from API', async ({ page }) => {
    // Wait for API call to complete
    await page.waitForResponse(response => 
      response.url().includes('/api/carousel') && response.status() === 200
    );
    
    // Check if slides are loaded
    const slides = page.locator('[data-testid="carousel-slide"]');
    await expect(slides).toHaveCount(4);
    
    // Check if slides have proper data attributes
    const firstSlide = slides.first();
    await expect(firstSlide).toHaveAttribute('data-slide-id');
    await expect(firstSlide).toHaveAttribute('data-slide-index');
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('/api/carousel*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Internal server error' })
      });
    });
    
    // Reload page
    await page.reload();
    
    // Check if fallback slides are displayed
    const slides = page.locator('[data-testid="carousel-slide"]');
    await expect(slides).toHaveCount(4);
    
    // Check if error is handled gracefully
    await expect(page.locator('[data-testid="carousel-error"]')).not.toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="carousel-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="carousel-touch-controls"]')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('[data-testid="carousel-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="carousel-navigation"]')).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('[data-testid="carousel-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="carousel-thumbnails"]')).toBeVisible();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check carousel container ARIA attributes
    const carousel = page.locator('[data-testid="carousel-container"]');
    await expect(carousel).toHaveAttribute('role', 'region');
    await expect(carousel).toHaveAttribute('aria-label', 'Homepage Carousel');
    
    // Check slide ARIA attributes
    const slides = page.locator('[data-testid="carousel-slide"]');
    const firstSlide = slides.first();
    await expect(firstSlide).toHaveAttribute('role', 'tabpanel');
    await expect(firstSlide).toHaveAttribute('aria-hidden', 'false');
    
    // Check indicator ARIA attributes
    const indicators = page.locator('[data-testid="carousel-indicator"]');
    const firstIndicator = indicators.first();
    await expect(firstIndicator).toHaveAttribute('role', 'tab');
    await expect(firstIndicator).toHaveAttribute('aria-label', /Go to slide 1/);
    await expect(firstIndicator).toHaveAttribute('aria-current', 'true');
    
    // Check navigation button ARIA attributes
    const prevButton = page.locator('[data-testid="carousel-prev"]');
    await expect(prevButton).toHaveAttribute('aria-label', /Previous slide/);
    
    const nextButton = page.locator('[data-testid="carousel-next"]');
    await expect(nextButton).toHaveAttribute('aria-label', /Next slide/);
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
    
    // Navigate slides
    await page.click('[data-testid="carousel-next"]');
    await page.waitForTimeout(500);
    
    // Check if analytics event was tracked
    const events = await page.evaluate(() => window.analyticsEvents);
    const carouselEvents = events.filter((e: any) => e.event === 'Homepage Carousel');
    expect(carouselEvents.length).toBeGreaterThan(0);
  });
});

test.describe('Carousel Performance', () => {
  test('should load within performance budget', async ({ page }) => {
    // Start performance monitoring
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for carousel to load
    await page.waitForSelector('[data-testid="carousel-slide"]');
    
    // Check load time
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 seconds max
    
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

  test('should handle rapid navigation smoothly', async ({ page }) => {
    await page.goto('/');
    
    // Rapid navigation test
    for (let i = 0; i < 10; i++) {
      await page.click('[data-testid="carousel-next"]');
      await page.waitForTimeout(100); // Minimal wait
    }
    
    // Check if carousel is still functional
    const activeSlide = page.locator('[data-testid="carousel-slide"].active');
    await expect(activeSlide).toBeVisible();
    
    // Check for JavaScript errors
    const errors = await page.evaluate(() => {
      return (window as any).consoleErrors || [];
    });
    expect(errors.length).toBe(0);
  });
});
