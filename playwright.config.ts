import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Browser configurations
    ...devices['Desktop Chrome'],
    ...devices['Desktop Safari'],
    ...devices['Desktop Firefox'],
    
    // Mobile configurations
    ...devices['Pixel 5'],
    ...devices['iPhone 13'],
    ...devices['iPad Pro'],
    
    // Viewport sizes
    viewport: {
      width: 1280,
      height: 720,
    },
    
    // Ignore HTTPS errors for local testing
    ignoreHTTPSErrors: !process.env.CI,
    
    // Action and navigation timeouts
    actionTimeout: 10000,
    navigationTimeout: 30000,
    
    // Global timeout
    timeout: 60000,
  },
  
  // Global setup and teardown
  globalSetup: require('./global-setup'),
  globalTeardown: require('./global-teardown'),
  
  // Project-specific configurations
  projects: [
    {
      name: 'e2e',
      testMatch: '**/*.spec.ts',
      testIgnore: '**/*.unit.spec.ts',
    },
    {
      name: 'accessibility',
      testMatch: '**/accessibility.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        // Accessibility-specific options
        colorScheme: 'dark',
        reducedMotion: 'reduce',
      },
    },
    {
      name: 'performance',
      testMatch: '**/performance.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        // Performance-specific options
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-blink-features=IdleDetection',
          ],
        },
      },
    },
  ],
  
  // Web server configuration
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
