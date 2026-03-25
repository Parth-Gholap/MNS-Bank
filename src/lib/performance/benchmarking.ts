import React, { useState, useEffect, useCallback } from 'react';

export interface BenchmarkConfig {
  enableCoreWebVitals: boolean;
  enableCustomMetrics: boolean;
  enableNetworkMonitoring: boolean;
  enableMemoryMonitoring: boolean;
  enableResourceTiming: boolean;
  enableUserTiming: boolean;
  benchmarkInterval: number;
  retentionPeriod: number;
  enableComparisons: boolean;
  baselineThresholds: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    timeToInteractive: number;
    totalBlockingTime: number;
  };
}

export interface BenchmarkResult {
  id: string;
  timestamp: number;
  url: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  connection: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };
  coreWebVitals: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    timeToInteractive: number;
    totalBlockingTime: number;
  };
  customMetrics: {
    domContentLoaded: number;
    loadComplete: number;
    firstPaint: number;
    navigationStart: number;
    responseStart: number;
    responseEnd: number;
    domInteractive: number;
  };
  resources: ResourceMetrics[];
  memory: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
  network: NetworkMetrics;
  score: PerformanceScore;
  comparison?: BenchmarkComparison;
}

export interface ResourceMetrics {
  name: string;
  type: string;
  size: number;
  duration: number;
  startTime: number;
  responseEnd: number;
  transferSize: number;
  encodedBodySize: number;
  decodedBodySize: number;
}

export interface NetworkMetrics {
  totalRequests: number;
  totalSize: number;
  averageResponseTime: number;
  failedRequests: number;
  slowRequests: number;
  requestsByType: Record<string, number>;
  sizeByType: Record<string, number>;
}

export interface PerformanceScore {
  overall: number;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  grades: {
    performance: 'A' | 'B' | 'C' | 'D' | 'F';
    accessibility: 'A' | 'B' | 'C' | 'D' | 'F';
    bestPractices: 'A' | 'B' | 'C' | 'D' | 'F';
    seo: 'A' | 'B' | 'C' | 'D' | 'F';
    pwa: 'A' | 'B' | 'C' | 'D' | 'F';
  };
}

export interface BenchmarkComparison {
  baseline: BenchmarkResult;
  current: BenchmarkResult;
  improvements: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    timeToInteractive: number;
    totalBlockingTime: number;
  };
  regressions: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    timeToInteractive: number;
    totalBlockingTime: number;
  };
  scoreChange: number;
}

export interface BenchmarkReport {
  id: string;
  generatedAt: number;
  period: {
    start: number;
    end: number;
  };
  summary: {
    totalBenchmarks: number;
    averageScore: number;
    bestScore: number;
    worstScore: number;
    improvementRate: number;
  };
  trends: Array<{
    date: string;
    score: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
  }>;
  recommendations: string[];
  comparisons: BenchmarkComparison[];
}

class PerformanceBenchmarker {
  private static instance: PerformanceBenchmarker;
  private config: BenchmarkConfig;
  private results: BenchmarkResult[] = [];
  private baseline: BenchmarkResult | null = null;
  private observer: PerformanceObserver | null = null;
  private benchmarkInterval: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  // Public getter for isRunning
  public get IsRunning(): boolean {
    return this.isRunning;
  }

  private constructor() {
    this.config = this.getDefaultConfig();
    this.loadStoredResults();
  }

  static getInstance(): PerformanceBenchmarker {
    if (!PerformanceBenchmarker.instance) {
      PerformanceBenchmarker.instance = new PerformanceBenchmarker();
    }
    return PerformanceBenchmarker.instance;
  }

  private getDefaultConfig(): BenchmarkConfig {
    return {
      enableCoreWebVitals: true,
      enableCustomMetrics: true,
      enableNetworkMonitoring: true,
      enableMemoryMonitoring: true,
      enableResourceTiming: true,
      enableUserTiming: true,
      benchmarkInterval: 30000, // 30 seconds
      retentionPeriod: 7 * 24 * 60 * 60 * 1000, // 7 days
      enableComparisons: true,
      baselineThresholds: {
        firstContentfulPaint: 1800,
        largestContentfulPaint: 2500,
        firstInputDelay: 100,
        cumulativeLayoutShift: 0.1,
        timeToInteractive: 3800,
        totalBlockingTime: 200
      }
    };
  }

  private loadStoredResults(): void {
    try {
      const stored = localStorage.getItem('performance_benchmarks');
      if (stored) {
        this.results = JSON.parse(stored);
      }
      
      const baselineStored = localStorage.getItem('performance_baseline');
      if (baselineStored) {
        this.baseline = JSON.parse(baselineStored);
      }
    } catch (error) {
      console.warn('Failed to load stored benchmark results:', error);
    }
  }

  private saveResults(): void {
    try {
      if (this.results.length > 0) {
        localStorage.setItem('performance_benchmarks', JSON.stringify(this.results));
      }
      
      if (this.baseline) {
        localStorage.setItem('performance_baseline', JSON.stringify(this.baseline));
      }
    } catch (error) {
      console.warn('Failed to save benchmark results:', error);
    }
  }

  startBenchmarking(): void {
    if (this.isRunning || typeof window === 'undefined') {
      return;
    }

    this.isRunning = true;
    this.setupPerformanceObserver();
    
    // Run initial benchmark
    this.runBenchmark();
    
    // Set up interval for continuous benchmarking
    this.benchmarkInterval = setInterval(() => {
      this.runBenchmark();
    }, this.config.benchmarkInterval);
  }

  stopBenchmarking(): void {
    if (this.benchmarkInterval) {
      clearInterval(this.benchmarkInterval);
      this.benchmarkInterval = null;
    }
    
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    this.isRunning = false;
  }

  private setupPerformanceObserver(): void {
    if (typeof PerformanceObserver === 'undefined') {
      return;
    }

    this.observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'largest-contentful-paint' ||
            entry.entryType === 'first-input' ||
            entry.entryType === 'layout-shift') {
          // Handle real-time performance entries
          this.handlePerformanceEntry(entry);
        }
      });
    });

    try {
      this.observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance Observer not fully supported:', error);
    }
  }

  private handlePerformanceEntry(entry: PerformanceEntry): void {
    // Handle real-time performance metrics
    if (entry.entryType === 'largest-contentful-paint') {
      // Update latest result with new LCP
      if (this.results.length > 0) {
        const latest = this.results[this.results.length - 1];
        latest.coreWebVitals.largestContentfulPaint = entry.startTime;
      }
    }
  }

  async runBenchmark(): Promise<BenchmarkResult> {
    if (typeof window === 'undefined') {
      throw new Error('Benchmarking can only be run in a browser environment');
    }

    const result: BenchmarkResult = {
      id: this.generateBenchmarkId(),
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      connection: this.getConnectionInfo(),
      coreWebVitals: this.getCoreWebVitals(),
      customMetrics: this.getCustomMetrics(),
      resources: this.getResourceMetrics(),
      memory: this.getMemoryMetrics(),
      network: this.getNetworkMetrics(),
      score: this.calculatePerformanceScore()
    };

    this.results.push(result);
    this.cleanupOldResults();
    this.saveResults();

    if (this.config.enableComparisons && this.baseline) {
      result.comparison = this.compareWithBaseline(result);
    }

    return result;
  }

  private getConnectionInfo() {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      return {
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0
      };
    }
    
    return {
      effectiveType: 'unknown',
      downlink: 0,
      rtt: 0
    };
  }

  private getCoreWebVitals() {
    const vitals = {
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: 0,
      timeToInteractive: 0,
      totalBlockingTime: 0
    };

    // First Contentful Paint
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] as PerformancePaintTiming;
    if (fcpEntry) {
      vitals.firstContentfulPaint = fcpEntry.startTime;
    }

    // Largest Contentful Paint
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      vitals.largestContentfulPaint = lcpEntries[lcpEntries.length - 1].startTime;
    }

    // First Input Delay
    const fidEntries = performance.getEntriesByType('first-input');
    if (fidEntries.length > 0) {
      vitals.firstInputDelay = (fidEntries[0] as any).processingStart - fidEntries[0].startTime;
    }

    // Cumulative Layout Shift
    const clsEntries = performance.getEntriesByType('layout-shift');
    let clsValue = 0;
    clsEntries.forEach(entry => {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    });
    vitals.cumulativeLayoutShift = clsValue;

    // Time to Interactive (approximation)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      vitals.timeToInteractive = navigation.domInteractive + navigation.loadEventEnd - navigation.loadEventStart;
    }

    // Total Blocking Time (approximation)
    const longTasks = performance.getEntriesByType('long-task');
    let blockingTime = 0;
    longTasks.forEach(task => {
      blockingTime += task.duration - 50;
    });
    vitals.totalBlockingTime = blockingTime;

    return vitals;
  }

  private getCustomMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paints = performance.getEntriesByType('paint');
    
    return {
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
      loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
      firstPaint: paints.find(p => p.name === 'first-paint')?.startTime || 0,
      navigationStart: navigation ? navigation.startTime : 0,
      responseStart: navigation ? navigation.responseStart - navigation.requestStart : 0,
      responseEnd: navigation ? navigation.responseEnd - navigation.requestStart : 0,
      domInteractive: navigation ? navigation.domInteractive - navigation.fetchStart : 0
    };
  }

  private getResourceMetrics(): ResourceMetrics[] {
    const resources = performance.getEntriesByType('resource');
    
    return resources.map(resource => ({
      name: resource.name,
      type: this.getResourceType(resource.name),
      size: (resource as any).transferSize || 0,
      duration: resource.duration,
      startTime: resource.startTime,
      responseEnd: (resource as any).responseEnd || 0,
      transferSize: (resource as any).transferSize || 0,
      encodedBodySize: (resource as any).encodedBodySize || 0,
      decodedBodySize: (resource as any).decodedBodySize || 0
    }));
  }

  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    
    const typeMap: Record<string, string> = {
      'js': 'script',
      'css': 'stylesheet',
      'png': 'image',
      'jpg': 'image',
      'jpeg': 'image',
      'gif': 'image',
      'svg': 'image',
      'webp': 'image',
      'woff': 'font',
      'woff2': 'font',
      'ttf': 'font',
      'eot': 'font',
      'json': 'api',
      'xml': 'api',
      'html': 'document'
    };
    
    return typeMap[extension || ''] || 'other';
  }

  private getMemoryMetrics() {
    const memory = (performance as any).memory;
    
    if (memory) {
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    
    return {
      usedJSHeapSize: 0,
      totalJSHeapSize: 0,
      jsHeapSizeLimit: 0
    };
  }

  private getNetworkMetrics(): NetworkMetrics {
    const resources = this.getResourceMetrics();
    const totalRequests = resources.length;
    const totalSize = resources.reduce((sum, resource) => sum + resource.size, 0);
    const averageResponseTime = resources.reduce((sum, resource) => sum + resource.duration, 0) / totalRequests;
    
    const slowThreshold = 1000; // 1 second
    const slowRequests = resources.filter(resource => resource.duration > slowThreshold).length;
    
    // Assume no failed requests for now (would need error tracking)
    const failedRequests = 0;
    
    const requestsByType: Record<string, number> = {};
    const sizeByType: Record<string, number> = {};
    
    resources.forEach(resource => {
      requestsByType[resource.type] = (requestsByType[resource.type] || 0) + 1;
      sizeByType[resource.type] = (sizeByType[resource.type] || 0) + resource.size;
    });
    
    return {
      totalRequests,
      totalSize,
      averageResponseTime,
      failedRequests,
      slowRequests,
      requestsByType,
      sizeByType
    };
  }

  private calculatePerformanceScore(): PerformanceScore {
    const vitals = this.getCoreWebVitals();
    const thresholds = this.config.baselineThresholds;
    
    // Calculate individual scores
    const fcpScore = this.calculateMetricScore(vitals.firstContentfulPaint, thresholds.firstContentfulPaint);
    const lcpScore = this.calculateMetricScore(vitals.largestContentfulPaint, thresholds.largestContentfulPaint);
    const fidScore = this.calculateMetricScore(vitals.firstInputDelay, thresholds.firstInputDelay);
    const clsScore = this.calculateMetricScore(vitals.cumulativeLayoutShift, thresholds.cumulativeLayoutShift, true);
    const ttiScore = this.calculateMetricScore(vitals.timeToInteractive, thresholds.timeToInteractive);
    const tbpScore = this.calculateMetricScore(vitals.totalBlockingTime, thresholds.totalBlockingTime);
    
    // Overall performance score (weighted average)
    const performance = Math.round((fcpScore * 0.2 + lcpScore * 0.25 + fidScore * 0.15 + clsScore * 0.15 + ttiScore * 0.15 + tbpScore * 0.1));
    
    // Simulate other scores (would need actual auditing)
    const accessibility = 95;
    const bestPractices = 90;
    const seo = 92;
    const pwa = 85;
    
    const overall = Math.round((performance + accessibility + bestPractices + seo + pwa) / 5);
    
    return {
      overall,
      performance,
      accessibility,
      bestPractices,
      seo,
      pwa,
      grades: {
        performance: this.getGrade(performance),
        accessibility: this.getGrade(accessibility),
        bestPractices: this.getGrade(bestPractices),
        seo: this.getGrade(seo),
        pwa: this.getGrade(pwa)
      }
    };
  }

  private calculateMetricScore(value: number, threshold: number, invert: boolean = false): number {
    if (invert) {
      // For metrics where lower is better (like CLS)
      return Math.max(0, Math.min(100, 100 - (value / threshold) * 100));
    } else {
      // For metrics where lower is better
      return Math.max(0, Math.min(100, 100 - (value / threshold) * 100));
    }
  }

  private getGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  private compareWithBaseline(current: BenchmarkResult): BenchmarkComparison {
    if (!this.baseline) {
      throw new Error('No baseline set for comparison');
    }

    const improvements = {
      firstContentfulPaint: this.baseline.coreWebVitals.firstContentfulPaint - current.coreWebVitals.firstContentfulPaint,
      largestContentfulPaint: this.baseline.coreWebVitals.largestContentfulPaint - current.coreWebVitals.largestContentfulPaint,
      firstInputDelay: this.baseline.coreWebVitals.firstInputDelay - current.coreWebVitals.firstInputDelay,
      cumulativeLayoutShift: this.baseline.coreWebVitals.cumulativeLayoutShift - current.coreWebVitals.cumulativeLayoutShift,
      timeToInteractive: this.baseline.coreWebVitals.timeToInteractive - current.coreWebVitals.timeToInteractive,
      totalBlockingTime: this.baseline.coreWebVitals.totalBlockingTime - current.coreWebVitals.totalBlockingTime
    };

    const regressions = {
      firstContentfulPaint: current.coreWebVitals.firstContentfulPaint - this.baseline.coreWebVitals.firstContentfulPaint,
      largestContentfulPaint: current.coreWebVitals.largestContentfulPaint - this.baseline.coreWebVitals.largestContentfulPaint,
      firstInputDelay: current.coreWebVitals.firstInputDelay - this.baseline.coreWebVitals.firstInputDelay,
      cumulativeLayoutShift: current.coreWebVitals.cumulativeLayoutShift - this.baseline.coreWebVitals.cumulativeLayoutShift,
      timeToInteractive: current.coreWebVitals.timeToInteractive - this.baseline.coreWebVitals.timeToInteractive,
      totalBlockingTime: current.coreWebVitals.totalBlockingTime - this.baseline.coreWebVitals.totalBlockingTime
    };

    const scoreChange = current.score.overall - this.baseline.score.overall;

    return {
      baseline: this.baseline,
      current,
      improvements,
      regressions,
      scoreChange
    };
  }

  private cleanupOldResults(): void {
    const cutoffTime = Date.now() - this.config.retentionPeriod;
    this.results = this.results.filter(result => result.timestamp > cutoffTime);
  }

  private generateBenchmarkId(): string {
    return 'benchmark_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  setBaseline(result?: BenchmarkResult): void {
    this.baseline = result || this.results[this.results.length - 1] || null;
    this.saveResults();
  }

  getResults(filters?: {
    startDate?: number;
    endDate?: number;
    url?: string;
    minScore?: number;
    maxScore?: number;
  }): BenchmarkResult[] {
    let filtered = [...this.results];

    if (filters) {
      if (filters.startDate) {
        filtered = filtered.filter(r => r.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        filtered = filtered.filter(r => r.timestamp <= filters.endDate!);
      }
      if (filters.url) {
        filtered = filtered.filter(r => r.url.includes(filters.url!));
      }
      if (filters.minScore) {
        filtered = filtered.filter(r => r.score.overall >= filters.minScore!);
      }
      if (filters.maxScore) {
        filtered = filtered.filter(r => r.score.overall <= filters.maxScore!);
      }
    }

    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  getLatestResult(): BenchmarkResult | null {
    return this.results.length > 0 ? this.results[this.results.length - 1] : null;
  }

  getAverageScore(): number {
    if (this.results.length === 0) return 0;
    const total = this.results.reduce((sum, result) => sum + result.score.overall, 0);
    return Math.round(total / this.results.length);
  }

  generateReport(startDate?: number, endDate?: number): BenchmarkReport {
    const now = Date.now();
    const start = startDate || (now - 24 * 60 * 60 * 1000); // Default: last 24 hours
    const end = endDate || now;

    const reportResults = this.getResults({ startDate: start, endDate: end });
    
    const scores = reportResults.map(r => r.score.overall);
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const worstScore = scores.length > 0 ? Math.min(...scores) : 0;

    // Calculate improvement rate
    const improvementRate = this.calculateImprovementRate(reportResults);

    // Generate trends
    const trends = this.generateTrends(reportResults);

    // Generate recommendations
    const recommendations = this.generateRecommendations(reportResults);

    // Generate comparisons
    const comparisons = reportResults
      .filter(r => r.comparison)
      .map(r => r.comparison!);

    return {
      id: 'report_' + Date.now(),
      generatedAt: now,
      period: { start, end },
      summary: {
        totalBenchmarks: reportResults.length,
        averageScore,
        bestScore,
        worstScore,
        improvementRate
      },
      trends,
      recommendations,
      comparisons
    };
  }

  private calculateImprovementRate(results: BenchmarkResult[]): number {
    if (results.length < 2) return 0;
    
    const first = results[0];
    const last = results[results.length - 1];
    
    return ((last.score.overall - first.score.overall) / first.score.overall) * 100;
  }

  private generateTrends(results: BenchmarkResult[]): Array<{ date: string; score: number; firstContentfulPaint: number; largestContentfulPaint: number }> {
    return results.map(result => ({
      date: new Date(result.timestamp).toISOString().split('T')[0],
      score: result.score.overall,
      firstContentfulPaint: result.coreWebVitals.firstContentfulPaint,
      largestContentfulPaint: result.coreWebVitals.largestContentfulPaint
    })).sort((a, b) => a.date.localeCompare(b.date));
  }

  private generateRecommendations(results: BenchmarkResult[]): string[] {
    const recommendations: string[] = [];
    
    if (results.length === 0) {
      return ['No benchmark data available for recommendations.'];
    }

    const latest = results[results.length - 1];
    const thresholds = this.config.baselineThresholds;

    // FCP recommendations
    if (latest.coreWebVitals.firstContentfulPaint > thresholds.firstContentfulPaint) {
      recommendations.push('Optimize First Contentful Paint by reducing server response time and optimizing critical resources.');
    }

    // LCP recommendations
    if (latest.coreWebVitals.largestContentfulPaint > thresholds.largestContentfulPaint) {
      recommendations.push('Improve Largest Contentful Paint by optimizing images, using modern formats, and preloading important resources.');
    }

    // FID recommendations
    if (latest.coreWebVitals.firstInputDelay > thresholds.firstInputDelay) {
      recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time and breaking up long tasks.');
    }

    // CLS recommendations
    if (latest.coreWebVitals.cumulativeLayoutShift > thresholds.cumulativeLayoutShift) {
      recommendations.push('Prevent Cumulative Layout Shift by specifying dimensions for media and avoiding inserting content above existing content.');
    }

    // TTI recommendations
    if (latest.coreWebVitals.timeToInteractive > thresholds.timeToInteractive) {
      recommendations.push('Improve Time to Interactive by code splitting, reducing JavaScript bundle size, and optimizing third-party scripts.');
    }

    // TBT recommendations
    if (latest.coreWebVitals.totalBlockingTime > thresholds.totalBlockingTime) {
      recommendations.push('Reduce Total Blocking Time by optimizing main thread work and using web workers for heavy computations.');
    }

    // Network recommendations
    if (latest.network.totalRequests > 100) {
      recommendations.push('Reduce the number of HTTP requests by bundling resources and using sprites.');
    }

    if (latest.network.totalSize > 3000000) { // 3MB
      recommendations.push('Optimize page size by compressing images, using efficient formats, and enabling compression.');
    }

    if (recommendations.length === 0) {
      recommendations.push('Great job! Performance metrics are within acceptable thresholds.');
    }

    return recommendations;
  }

  updateConfig(newConfig: Partial<BenchmarkConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): BenchmarkConfig {
    return { ...this.config };
  }

  clearResults(): void {
    this.results = [];
    this.baseline = null;
    this.saveResults();
  }

  exportData(): string {
    return JSON.stringify({
      config: this.config,
      results: this.results,
      baseline: this.baseline,
      timestamp: Date.now()
    }, null, 2);
  }

  importData(data: string): void {
    try {
      const parsed = JSON.parse(data);
      if (parsed.config) {
        this.updateConfig(parsed.config);
      }
      if (parsed.results) {
        this.results = parsed.results;
      }
      if (parsed.baseline) {
        this.baseline = parsed.baseline;
      }
      this.saveResults();
    } catch (error) {
      console.error('Failed to import benchmark data:', error);
    }
  }

  destroy(): void {
    this.stopBenchmarking();
    this.saveResults();
  }
}

// React hook for performance benchmarking
export function usePerformanceBenchmarking() {
  const benchmarker = PerformanceBenchmarker.getInstance();
  const [latestResult, setLatestResult] = useState<BenchmarkResult | null>(benchmarker.getLatestResult());
  const [isRunning, setIsRunning] = useState(benchmarker.IsRunning);
  const [averageScore, setAverageScore] = useState(benchmarker.getAverageScore());

  useEffect(() => {
    const interval = setInterval(() => {
      setLatestResult(benchmarker.getLatestResult());
      setIsRunning(benchmarker.IsRunning);
      setAverageScore(benchmarker.getAverageScore());
    }, 5000);

    return () => clearInterval(interval);
  }, [benchmarker]);

  const runBenchmark = useCallback(() => {
    return benchmarker.runBenchmark();
  }, [benchmarker]);

  const generateReport = useCallback((startDate?: number, endDate?: number) => {
    return benchmarker.generateReport(startDate, endDate);
  }, [benchmarker]);

  return {
    latestResult,
    isRunning,
    averageScore,
    runBenchmark,
    generateReport,
    startBenchmarking: () => benchmarker.startBenchmarking(),
    stopBenchmarking: () => benchmarker.stopBenchmarking(),
    setBaseline: (result?: BenchmarkResult) => benchmarker.setBaseline(result)
  };
}

// Export singleton
export const performanceBenchmarker = PerformanceBenchmarker.getInstance();
export default PerformanceBenchmarker;
