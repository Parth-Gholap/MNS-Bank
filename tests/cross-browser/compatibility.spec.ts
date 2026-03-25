import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';

interface BrowserTestConfig {
  browserName: string;
  viewport: { width: number; height: number };
  userAgent?: string;
  deviceName?: string;
}

interface CompatibilityResult {
  browser: string;
  viewport: { width: number; height: number };
  userAgent: string;
  tests: {
    basicFunctionality: boolean;
    responsiveDesign: boolean;
    javascriptFeatures: boolean;
    cssSupport: boolean;
    accessibility: boolean;
    performance: boolean;
    security: boolean;
  };
  issues: string[];
  score: number;
  timestamp: number;
}

class CrossBrowserTester {
  private static instance: CrossBrowserTester;
  private results: CompatibilityResult[] = [];

  static getInstance(): CrossBrowserTester {
    if (!CrossBrowserTester.instance) {
      CrossBrowserTester.instance = new CrossBrowserTester();
    }
    return CrossBrowserTester.instance;
  }

  async runCompatibilityTests(browser: Browser, config: BrowserTestConfig): Promise<CompatibilityResult> {
    const context = await browser.newContext({
      viewport: config.viewport,
      userAgent: config.userAgent
    });
    
    const page = await context.newPage();
    
    const result: CompatibilityResult = {
      browser: config.browserName,
      viewport: config.viewport,
      userAgent: config.userAgent || '',
      tests: {
        basicFunctionality: false,
        responsiveDesign: false,
        javascriptFeatures: false,
        cssSupport: false,
        accessibility: false,
        performance: false,
        security: false
      },
      issues: [],
      score: 0,
      timestamp: Date.now()
    };

    try {
      // Test 1: Basic Functionality
      result.tests.basicFunctionality = await this.testBasicFunctionality(page);
      
      // Test 2: Responsive Design
      result.tests.responsiveDesign = await this.testResponsiveDesign(page);
      
      // Test 3: JavaScript Features
      result.tests.javascriptFeatures = await this.testJavaScriptFeatures(page);
      
      // Test 4: CSS Support
      result.tests.cssSupport = await this.testCSSSupport(page);
      
      // Test 5: Accessibility
      result.tests.accessibility = await this.testAccessibility(page);
      
      // Test 6: Performance
      result.tests.performance = await this.testPerformance(page);
      
      // Test 7: Security
      result.tests.security = await this.testSecurity(page);
      
      // Calculate score
      result.score = this.calculateScore(result.tests);
      
    } catch (error) {
      result.issues.push(`Test execution error: ${error}`);
    } finally {
      await context.close();
    }

    this.results.push(result);
    return result;
  }

  private async testBasicFunctionality(page: Page): Promise<boolean> {
    try {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check if page loads
      const title = await page.title();
      if (!title) return false;
      
      // Check if main elements are present
      const hasHeader = await page.locator('header').count() > 0;
      const hasMain = await page.locator('main').count() > 0;
      const hasFooter = await page.locator('footer').count() > 0;
      
      return hasHeader && hasMain && hasFooter;
    } catch (error) {
      return false;
    }
  }

  private async testResponsiveDesign(page: Page): Promise<boolean> {
    try {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const viewports = [
        { width: 375, height: 667 },  // Mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1920, height: 1080 } // Desktop
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.waitForTimeout(500);
        
        // Check that layout adapts
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        if (viewportWidth !== viewport.width) {
          return false;
        }
        
        // Check that content is still accessible
        const mainContent = await page.locator('main').isVisible();
        if (!mainContent) return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  private async testJavaScriptFeatures(page: Page): Promise<boolean> {
    try {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Test modern JavaScript features
      const features = await page.evaluate(() => {
        return {
          fetch: typeof fetch !== 'undefined',
          promise: typeof Promise !== 'undefined',
          arrow: (() => true)(),
          template: `template` === 'template',
          destructuring: (() => {
            const [a] = [1];
            return a === 1;
          })(),
          spread: (() => {
            const arr = [1, 2, 3];
            const newArr = [...arr];
            return newArr.length === 3;
          })(),
          async: (() => {
            try {
              const fn = async () => true;
              return typeof fn === 'function';
            } catch {
              return false;
            }
          })()
        };
      });
      
      const allFeaturesSupported = Object.values(features).every(supported => supported);
      return allFeaturesSupported;
    } catch (error) {
      return false;
    }
  }

  private async testCSSSupport(page: Page): Promise<boolean> {
    try {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Test modern CSS features
      const cssFeatures = await page.evaluate(() => {
        const testElement = document.createElement('div');
        document.body.appendChild(testElement);
        
        const features = {
          flexbox: CSS.supports('display', 'flex'),
          grid: CSS.supports('display', 'grid'),
          customProperties: CSS.supports('color', 'var(--test)'),
          transform: CSS.supports('transform', 'translateX(10px)'),
          transition: CSS.supports('transition', 'all 0.3s'),
          animation: CSS.supports('animation', 'test 1s'),
          borderRadius: CSS.supports('border-radius', '10px'),
          boxShadow: CSS.supports('box-shadow', '0 0 10px rgba(0,0,0,0.5)')
        };
        
        document.body.removeChild(testElement);
        return features;
      });
      
      const supportedFeatures = Object.values(cssFeatures).filter(supported => supported).length;
      const totalFeatures = Object.keys(cssFeatures).length;
      
      // Require at least 75% of CSS features to be supported
      return (supportedFeatures / totalFeatures) >= 0.75;
    } catch (error) {
      return false;
    }
  }

  private async testAccessibility(page: Page): Promise<boolean> {
    try {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Basic accessibility checks
      const accessibilityChecks = await page.evaluate(() => {
        const checks = {
          hasTitle: document.title.length > 0,
          hasLang: document.documentElement.hasAttribute('lang'),
          hasMainLandmark: document.querySelector('main') !== null,
          hasHeadings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0,
          hasAltText: Array.from(document.querySelectorAll('img')).every(img => img.hasAttribute('alt')),
          hasFormLabels: Array.from(document.querySelectorAll('input, select, textarea')).every(input => {
            return input.hasAttribute('aria-label') || 
                   input.hasAttribute('aria-labelledby') || 
                   document.querySelector(`label[for="${input.id}"]`) ||
                   input.closest('label');
          })
        };
        
        return checks;
      });
      
      const passedChecks = Object.values(accessibilityChecks).filter(passed => passed).length;
      const totalChecks = Object.keys(accessibilityChecks).length;
      
      // Require at least 80% of accessibility checks to pass
      return (passedChecks / totalChecks) >= 0.8;
    } catch (error) {
      return false;
    }
  }

  private async testPerformance(page: Page): Promise<boolean> {
    try {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Basic performance metrics
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paints = performance.getEntriesByType('paint');
        
        return {
          domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
          loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
          firstPaint: paints.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paints.find(p => p.name === 'first-contentful-paint')?.startTime || 0
        };
      });
      
      // Performance thresholds (in milliseconds)
      const thresholds = {
        domContentLoaded: 3000,
        loadComplete: 5000,
        firstPaint: 1000,
        firstContentfulPaint: 2000
      };
      
      const passedMetrics = Object.entries(metrics).filter(([key, value]) => {
        return value <= thresholds[key as keyof typeof thresholds];
      }).length;
      
      const totalMetrics = Object.keys(metrics).length;
      
      // Require at least 75% of performance metrics to pass
      return (passedMetrics / totalMetrics) >= 0.75;
    } catch (error) {
      return false;
    }
  }

  private async testSecurity(page: Page): Promise<boolean> {
    try {
      const response = await page.goto('/');
      const headers = response?.headers();
      
      const securityChecks = {
        hasXContentTypeOptions: headers?.['x-content-type-options'] === 'nosniff',
        hasXFrameOptions: headers?.['x-frame-options'] === 'DENY' || headers?.['x-frame-options'] === 'SAMEORIGIN',
        hasXXSSProtection: headers?.['x-xss-protection']?.includes('1; mode=block'),
        hasStrictTransportSecurity: !!headers?.['strict-transport-security'],
        hasContentSecurityPolicy: !!headers?.['content-security-policy']
      };
      
      const passedChecks = Object.values(securityChecks).filter(passed => passed).length;
      const totalChecks = Object.keys(securityChecks).length;
      
      // Require at least 60% of security checks to pass
      return (passedChecks / totalChecks) >= 0.6;
    } catch (error) {
      return false;
    }
  }

  private calculateScore(tests: CompatibilityResult['tests']): number {
    const passedTests = Object.values(tests).filter(passed => passed).length;
    const totalTests = Object.keys(tests).length;
    return Math.round((passedTests / totalTests) * 100);
  }

  getResults(): CompatibilityResult[] {
    return [...this.results];
  }

  getAverageScore(): number {
    if (this.results.length === 0) return 0;
    const total = this.results.reduce((sum, result) => sum + result.score, 0);
    return Math.round(total / this.results.length);
  }

  getBrowserCompatibility(): Record<string, number> {
    const browserScores: Record<string, number[]> = {};
    
    this.results.forEach(result => {
      if (!browserScores[result.browser]) {
        browserScores[result.browser] = [];
      }
      browserScores[result.browser].push(result.score);
    });
    
    const averageScores: Record<string, number> = {};
    Object.entries(browserScores).forEach(([browser, scores]) => {
      averageScores[browser] = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
    });
    
    return averageScores;
  }

  generateReport(): {
    summary: {
      totalTests: number;
      averageScore: number;
      bestBrowser: string;
      worstBrowser: string;
      compatibilityRate: number;
    };
    browserResults: Record<string, {
      averageScore: number;
      testCount: number;
      issues: string[];
    }>;
    recommendations: string[];
  } {
    const totalTests = this.results.length;
    const averageScore = this.getAverageScore();
    const browserCompatibility = this.getBrowserCompatibility();
    
    const bestBrowser = Object.entries(browserCompatibility)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'Unknown';
    const worstBrowser = Object.entries(browserCompatibility)
      .sort(([, a], [, b]) => a - b)[0]?.[0] || 'Unknown';
    
    const compatibilityRate = Math.round(
      (this.results.filter(r => r.score >= 80).length / totalTests) * 100
    );
    
    // Browser-specific results
    const browserResults: Record<string, { averageScore: number; testCount: number; issues: string[] }> = {};
    const browserGroups: Record<string, CompatibilityResult[]> = {};
    
    this.results.forEach(result => {
      if (!browserGroups[result.browser]) {
        browserGroups[result.browser] = [];
      }
      browserGroups[result.browser].push(result);
    });
    
    Object.entries(browserGroups).forEach(([browser, results]) => {
      const averageScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
      const allIssues = results.flatMap(r => r.issues);
      
      browserResults[browser] = {
        averageScore,
        testCount: results.length,
        issues: [...new Set(allIssues)] // Unique issues
      };
    });
    
    // Recommendations
    const recommendations = this.generateRecommendations();
    
    return {
      summary: {
        totalTests,
        averageScore,
        bestBrowser,
        worstBrowser,
        compatibilityRate
      },
      browserResults,
      recommendations
    };
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const browserCompatibility = this.getBrowserCompatibility();
    
    if (Object.keys(browserCompatibility).length === 0) {
      return ['No cross-browser test data available.'];
    }
    
    const averageScore = this.getAverageScore();
    
    if (averageScore < 80) {
      recommendations.push('Overall cross-browser compatibility needs improvement. Focus on modern web standards and progressive enhancement.');
    }
    
    // Browser-specific recommendations
    Object.entries(browserCompatibility).forEach(([browser, score]) => {
      if (score < 70) {
        recommendations.push(`${browser} compatibility is poor (${score}%). Consider testing specifically for this browser and implementing fallbacks.`);
      }
    });
    
    // Feature-specific recommendations
    const failedTests = this.results.flatMap(r => 
      Object.entries(r.tests)
        .filter(([, passed]) => !passed)
        .map(([test]) => test)
    );
    
    const testCounts = failedTests.reduce((counts, test) => {
      counts[test] = (counts[test] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
    
    const mostFailedTest = Object.entries(testCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0];
    
    if (mostFailedTest) {
      const testRecommendations: Record<string, string> = {
        basicFunctionality: 'Ensure core HTML structure and navigation work across all browsers.',
        responsiveDesign: 'Test responsive breakpoints and media queries thoroughly.',
        javascriptFeatures: 'Use feature detection and polyfills for unsupported JavaScript features.',
        cssSupport: 'Use CSS feature detection and provide fallbacks for unsupported properties.',
        accessibility: 'Ensure accessibility features work consistently across browsers.',
        performance: 'Optimize performance for slower browsers and devices.',
        security: 'Implement security headers consistently across all browsers.'
      };
      
      recommendations.push(testRecommendations[mostFailedTest] || `Improve ${mostFailedTest} compatibility.`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Great cross-browser compatibility! Continue testing with new browser versions.');
    }
    
    return recommendations;
  }

  clearResults(): void {
    this.results = [];
  }
}

// Test configurations for different browsers and devices
const browserConfigs: BrowserTestConfig[] = [
  // Desktop browsers
  {
    browserName: 'Chrome Desktop',
    viewport: { width: 1920, height: 1080 }
  },
  {
    browserName: 'Firefox Desktop',
    viewport: { width: 1920, height: 1080 }
  },
  {
    browserName: 'Safari Desktop',
    viewport: { width: 1920, height: 1080 }
  },
  {
    browserName: 'Edge Desktop',
    viewport: { width: 1920, height: 1080 }
  },
  
  // Tablet browsers
  {
    browserName: 'Chrome Tablet',
    viewport: { width: 768, height: 1024 }
  },
  {
    browserName: 'Safari Tablet',
    viewport: { width: 768, height: 1024 }
  },
  
  // Mobile browsers
  {
    browserName: 'Chrome Mobile',
    viewport: { width: 375, height: 667 }
  },
  {
    browserName: 'Safari Mobile',
    viewport: { width: 375, height: 667 }
  },
  {
    browserName: 'Firefox Mobile',
    viewport: { width: 360, height: 640 }
  }
];

// Main test suite
test.describe('Cross-Browser Compatibility Tests', () => {
  const tester = CrossBrowserTester.getInstance();
  
  browserConfigs.forEach(config => {
    test.describe(`${config.browserName}`, () => {
      test('should pass all compatibility tests', async ({ browser }) => {
        const result = await tester.runCompatibilityTests(browser, config);
        
        console.log(`${config.browserName} Results:`, {
          score: result.score,
          tests: result.tests,
          issues: result.issues
        });
        
        // Require at least 70% compatibility
        expect(result.score).toBeGreaterThanOrEqual(70);
        
        // Critical tests must pass
        expect(result.tests.basicFunctionality).toBe(true);
        expect(result.tests.javascriptFeatures).toBe(true);
      });
      
      test('should handle responsive design correctly', async ({ browser }) => {
        const result = await tester.runCompatibilityTests(browser, config);
        expect(result.tests.responsiveDesign).toBe(true);
      });
      
      test('should support modern CSS features', async ({ browser }) => {
        const result = await tester.runCompatibilityTests(browser, config);
        expect(result.tests.cssSupport).toBe(true);
      });
      
      test('should meet accessibility standards', async ({ browser }) => {
        const result = await tester.runCompatibilityTests(browser, config);
        expect(result.tests.accessibility).toBe(true);
      });
      
      test('should perform adequately', async ({ browser }) => {
        const result = await tester.runCompatibilityTests(browser, config);
        expect(result.tests.performance).toBe(true);
      });
      
      test('should have basic security features', async ({ browser }) => {
        const result = await tester.runCompatibilityTests(browser, config);
        expect(result.tests.security).toBe(true);
      });
    });
  });
  
  test.describe('Compatibility Report', () => {
    test('should generate comprehensive compatibility report', async () => {
      const report = tester.generateReport();
      
      expect(report.summary.totalTests).toBeGreaterThan(0);
      expect(report.summary.averageScore).toBeGreaterThanOrEqual(0);
      expect(report.summary.compatibilityRate).toBeGreaterThanOrEqual(0);
      expect(report.browserResults).toBeDefined();
      expect(report.recommendations).toBeDefined();
      
      console.log('Cross-Browser Compatibility Report:', report);
    });
    
    test('should identify best and worst performing browsers', async () => {
      const report = tester.generateReport();
      
      expect(report.summary.bestBrowser).toBeDefined();
      expect(report.summary.worstBrowser).toBeDefined();
      expect(report.summary.bestBrowser).not.toBe(report.summary.worstBrowser);
    });
    
    test('should provide actionable recommendations', async () => {
      const report = tester.generateReport();
      
      expect(report.recommendations.length).toBeGreaterThan(0);
      report.recommendations.forEach(recommendation => {
        expect(recommendation.length).toBeGreaterThan(10);
      });
    });
  });
  
  test.describe('Feature-Specific Tests', () => {
    test('should handle modern JavaScript features across browsers', async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
      const page = await context.newPage();
      
      await page.goto('/');
      
      // Test specific JavaScript features that might have compatibility issues
      const jsFeatures = await page.evaluate(() => {
        return {
          asyncAwait: (() => {
            try {
              const fn = async () => await Promise.resolve(true);
              return typeof fn === 'function';
            } catch {
              return false;
            }
          })(),
          fetchAPI: typeof fetch !== 'undefined',
          localStorage: typeof localStorage !== 'undefined',
          sessionStorage: typeof sessionStorage !== 'undefined',
          webWorkers: typeof Worker !== 'undefined',
          geolocation: typeof navigator !== 'undefined' && typeof navigator.geolocation !== 'undefined',
          webGL: (() => {
            try {
              const canvas = document.createElement('canvas');
              return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            } catch {
              return false;
            }
          })()
        };
      });
      
      console.log('JavaScript Features Support:', jsFeatures);
      
      // Most modern features should be supported
      expect(jsFeatures.fetchAPI).toBe(true);
      expect(jsFeatures.localStorage).toBe(true);
      expect(jsFeatures.sessionStorage).toBe(true);
      
      await context.close();
    });
    
    test('should handle CSS Grid and Flexbox correctly', async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
      const page = await context.newPage();
      
      await page.goto('/');
      
      const cssLayoutSupport = await page.evaluate(() => {
        const testDiv = document.createElement('div');
        document.body.appendChild(testDiv);
        
        const support = {
          flexbox: CSS.supports('display', 'flex'),
          flexWrap: CSS.supports('flex-wrap', 'wrap'),
          grid: CSS.supports('display', 'grid'),
          gridTemplateColumns: CSS.supports('grid-template-columns', '1fr 1fr'),
          gap: CSS.supports('gap', '10px')
        };
        
        document.body.removeChild(testDiv);
        return support;
      });
      
      console.log('CSS Layout Support:', cssLayoutSupport);
      
      // Modern layout features should be supported
      expect(cssLayoutSupport.flexbox).toBe(true);
      expect(cssLayoutSupport.grid).toBe(true);
      
      await context.close();
    });
  });
});

// Export for use in other test files
export { CrossBrowserTester, browserConfigs };
export default CrossBrowserTester;
