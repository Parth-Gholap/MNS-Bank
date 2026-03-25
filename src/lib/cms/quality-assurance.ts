import { Locale } from '../i18n';
import { TranslationQuality, TranslationIssue } from './translation-workflow';

export interface QualityCheck {
  id: string;
  name: string;
  description: string;
  category: 'accuracy' | 'fluency' | 'consistency' | 'terminology' | 'cultural' | 'formatting' | 'technical';
  weight: number; // 0-1, importance in overall score
  check: (source: string, target: string, context?: string) => QualityCheckResult;
}

export interface QualityCheckResult {
  passed: boolean;
  score: number; // 0-100
  issues: any[];
  suggestions: string[];
  confidence: number; // 0-1
}

export interface QualityReport {
  id: string;
  contentId: string;
  sourceLocale: Locale;
  targetLocale: Locale;
  overallScore: number;
  categoryScores: {
    accuracy: number;
    fluency: number;
    consistency: number;
    terminology: number;
    cultural: number;
    formatting: number;
    technical: number;
  };
  issues: any[];
  suggestions: string[];
  reviewedBy: string;
  reviewedAt: string;
  approved: boolean;
  requiresHumanReview: boolean;
  estimatedReviewTime: number; // minutes
}

export interface QualityMetrics {
  totalChecks: number;
  passedChecks: number;
  averageScore: number;
  criticalIssues: number;
  majorIssues: number;
  minorIssues: number;
  suggestionsCount: number;
  reviewTime: number;
}

export interface QualityThreshold {
  minimum: number; // Minimum acceptable score
  preferred: number; // Preferred score
  critical: number; // Score below this requires immediate attention
}

class TranslationQualityAssurance {
  private checks: Map<string, QualityCheck> = new Map();
  private reports: Map<string, QualityReport> = new Map();
  private thresholds: Map<string, QualityThreshold> = new Map();

  constructor() {
    this.initializeChecks();
    this.initializeThresholds();
  }

  private initializeChecks(): void {
    const checks: QualityCheck[] = [
      // Accuracy Checks
      {
        id: 'length-consistency',
        name: 'Length Consistency',
        description: 'Check if translation length is reasonable compared to source',
        category: 'accuracy',
        weight: 0.15,
        check: (source: string, target: string) => {
          const ratio = target.length / source.length;
          const issues: any[] = [];
          let score = 100;

          if (ratio > 3) {
            issues.push({
              id: this.generateId(),
              type: 'accuracy',
              severity: 'medium',
              description: `Translation is significantly longer (${ratio.toFixed(1)}x) than source`,
              suggestion: 'Consider condensing the translation while maintaining meaning',
              resolved: false
            });
            score -= 20;
          } else if (ratio < 0.3) {
            issues.push({
              id: this.generateId(),
              type: 'accuracy',
              severity: 'medium',
              description: `Translation is significantly shorter (${ratio.toFixed(1)}x) than source`,
              suggestion: 'Check if important information was omitted',
              resolved: false
            });
            score -= 20;
          }

          return {
            passed: issues.length === 0,
            score,
            issues,
            suggestions: issues.map(i => i.suggestion || ''),
            confidence: 0.8
          };
        }
      },
      {
        id: 'unicode-validation',
        name: 'Unicode Validation',
        description: 'Check if target uses proper Unicode characters',
        category: 'technical',
        weight: 0.2,
        check: (source: string, target: string) => {
          const issues: any[] = [];
          let score = 100;

          // Check for proper Hindi Unicode
          if (target.includes('')) {
            issues.push({
              id: this.generateId(),
              type: 'technical',
              severity: 'critical',
              description: 'Contains replacement characters ()',
              suggestion: 'Fix character encoding issues',
              resolved: false
            });
            score -= 50;
          }

          // Check for mixed scripts
          const hasLatin = /[a-zA-Z]/.test(target);
          const hasHindi = /[\u0900-\u097F]/.test(target);
          
          if (hasLatin && !hasHindi) {
            issues.push({
              id: this.generateId(),
              type: 'technical',
              severity: 'high',
              description: 'Translation appears to be in Latin script',
              suggestion: 'Use proper Devanagari script for Hindi',
              resolved: false
            });
            score -= 30;
          }

          return {
            passed: issues.length === 0,
            score,
            issues,
            suggestions: issues.map(i => i.suggestion || ''),
            confidence: 0.9
          };
        }
      },

      // Fluency Checks
      {
        id: 'repetition-check',
        name: 'Repetition Check',
        description: 'Check for excessive word repetition',
        category: 'fluency',
        weight: 0.1,
        check: (source: string, target: string) => {
          const issues: any[] = [];
          let score = 100;

          const words = target.split(/\s+/);
          const wordCount: Record<string, number> = {};
          
          words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
          });

          Object.entries(wordCount).forEach(([word, count]) => {
            if (count > 3 && word.length > 2) {
              issues.push({
                id: this.generateId(),
                type: 'fluency',
                severity: 'low',
                description: `Word "${word}" repeated ${count} times`,
                suggestion: 'Consider using synonyms or rephrasing',
                resolved: false
              });
              score -= 5;
            }
          });

          return {
            passed: issues.length === 0,
            score,
            issues,
            suggestions: issues.map(i => i.suggestion || ''),
            confidence: 0.7
          };
        }
      },

      // Consistency Checks
      {
        id: 'terminology-consistency',
        name: 'Terminology Consistency',
        description: 'Check for consistent terminology usage',
        category: 'consistency',
        weight: 0.2,
        check: (source: string, target: string) => {
          const issues: any[] = [];
          let score = 100;

          // Common banking terms that should be consistent
          const termMappings: Record<string, string> = {
            'account': 'खाता',
            'loan': 'ऋण',
            'bank': 'बैंक',
            'interest': 'ब्याज',
            'payment': 'भुगतान',
            'deposit': 'जमा',
            'withdrawal': 'निकासी',
            'balance': 'शेष',
            'credit': 'क्रेडिट',
            'debit': 'डेबिट'
          };

          Object.entries(termMappings).forEach(([english, hindi]) => {
            if (source.toLowerCase().includes(english) && !target.includes(hindi)) {
              issues.push({
                id: this.generateId(),
                type: 'consistency',
                severity: 'medium',
                description: `Inconsistent translation of "${english}" (should be "${hindi}")`,
                suggestion: `Use "${hindi}" for "${english}"`,
                resolved: false
              });
              score -= 10;
            }
          });

          return {
            passed: issues.length === 0,
            score,
            issues,
            suggestions: issues.map(i => i.suggestion || ''),
            confidence: 0.8
          };
        }
      },

      // Cultural Checks
      {
        id: 'cultural-adaptation',
        name: 'Cultural Adaptation',
        description: 'Check for cultural appropriateness',
        category: 'cultural',
        weight: 0.15,
        check: (source: string, target: string) => {
          const issues: any[] = [];
          let score = 100;

          // Check for direct translations that might not be culturally appropriate
          const problematicPatterns = [
            { pattern: /dear\s+friend/gi, suggestion: 'Use appropriate Hindi greeting' },
            { pattern: /ladies\s+and\s+gentlemen/gi, suggestion: 'Use "महिलाओं और पुरुषों" or similar' }
          ];

          problematicPatterns.forEach(({ pattern, suggestion }) => {
            if (pattern.test(target)) {
              issues.push({
                id: this.generateId(),
                type: 'cultural',
                severity: 'low',
                description: 'Potentially culturally inappropriate direct translation',
                suggestion,
                resolved: false
              });
              score -= 5;
            }
          });

          return {
            passed: issues.length === 0,
            score,
            issues,
            suggestions: issues.map(i => i.suggestion || ''),
            confidence: 0.6
          };
        }
      },

      // Formatting Checks
      {
        id: 'formatting-preservation',
        name: 'Formatting Preservation',
        description: 'Check if formatting is preserved',
        category: 'formatting',
        weight: 0.1,
        check: (source: string, target: string) => {
          const issues: any[] = [];
          let score = 100;

          // Check for preserved HTML tags
          const sourceTags = (source.match(/<[^>]+>/g) || []).length;
          const targetTags = (target.match(/<[^>]+>/g) || []).length;

          if (sourceTags !== targetTags) {
            issues.push({
              id: this.generateId(),
              type: 'formatting',
              severity: 'high',
              description: `HTML tag count mismatch: source(${sourceTags}) vs target(${targetTags})`,
              suggestion: 'Ensure all HTML tags are preserved',
              resolved: false
            });
            score -= 25;
          }

          // Check for preserved placeholders
          const sourcePlaceholders = (source.match(/{{[^}]+}}/g) || []).length;
          const targetPlaceholders = (target.match(/{{[^}]+}}/g) || []).length;

          if (sourcePlaceholders !== targetPlaceholders) {
            issues.push({
              id: this.generateId(),
              type: 'formatting',
              severity: 'critical',
              description: `Placeholder count mismatch: source(${sourcePlaceholders}) vs target(${targetPlaceholders})`,
              suggestion: 'Ensure all placeholders are preserved',
              resolved: false
            });
            score -= 40;
          }

          return {
            passed: issues.length === 0,
            score,
            issues,
            suggestions: issues.map(i => i.suggestion || ''),
            confidence: 0.9
          };
        }
      },

      // Terminology Checks
      {
        id: 'english-words',
        name: 'English Words Check',
        description: 'Check for untranslated English words',
        category: 'terminology',
        weight: 0.1,
        check: (source: string, target: string) => {
          const issues: any[] = [];
          let score = 100;

          // Allowed English words (abbreviations, proper nouns, etc.)
          const allowedWords = new Set([
            'ATM', 'UPI', 'QR', 'SMS', 'URL', 'API', 'ID', 'PIN', 'OTP', 'EMI', 'NRI', 'GST', 'PAN',
            'Aadhaar', 'IFSC', 'MICR', 'NEFT', 'RTGS', 'IMPS', 'BBPS', 'KYC', 'CIBIL'
          ]);

          const englishWords = target.match(/\b[A-Za-z]+\b/g) || [];
          const problemWords = englishWords.filter(word => 
            !allowedWords.has(word) && word.length > 2
          );

          if (problemWords.length > 0) {
            issues.push({
              id: this.generateId(),
              type: 'terminology',
              severity: 'medium',
              description: `Untranslated English words: ${problemWords.join(', ')}`,
              suggestion: 'Translate English words to Hindi',
              resolved: false
            });
            score -= problemWords.length * 5;
          }

          return {
            passed: issues.length === 0,
            score,
            issues,
            suggestions: issues.map(i => i.suggestion || ''),
            confidence: 0.8
          };
        }
      }
    ];

    checks.forEach(check => {
      this.checks.set(check.id, check);
    });
  }

  private initializeThresholds(): void {
    const thresholds: Record<string, QualityThreshold> = {
      'banking-website': {
        minimum: 85,
        preferred: 90,
        critical: 70
      },
      'marketing-content': {
        minimum: 80,
        preferred: 85,
        critical: 65
      },
      'legal-documents': {
        minimum: 95,
        preferred: 98,
        critical: 85
      },
      'technical-docs': {
        minimum: 90,
        preferred: 95,
        critical: 75
      },
      'default': {
        minimum: 80,
        preferred: 85,
        critical: 70
      }
    };

    Object.entries(thresholds).forEach(([key, threshold]) => {
      this.thresholds.set(key, threshold);
    });
  }

  // Quality Assessment
  assessQuality(
    contentId: string,
    sourceText: string,
    targetText: string,
    sourceLocale: Locale,
    targetLocale: Locale,
    context: string = 'default',
    reviewedBy: string
  ): QualityReport {
    const allIssues: TranslationIssue[] = [];
    const allSuggestions: string[] = [];
    const categoryScores: QualityReport['categoryScores'] = {
      accuracy: 0,
      fluency: 0,
      consistency: 0,
      terminology: 0,
      cultural: 0,
      formatting: 0,
      technical: 0
    };

    const categoryWeights: Record<string, number> = {
      accuracy: 0,
      fluency: 0,
      consistency: 0,
      terminology: 0,
      cultural: 0,
      formatting: 0,
      technical: 0
    };

    // Run all quality checks
    this.checks.forEach(check => {
      const result = check.check(sourceText, targetText, context);
      
      allIssues.push(...result.issues);
      allSuggestions.push(...result.suggestions);
      
      categoryScores[check.category] = result.score;
      categoryWeights[check.category] += check.weight;
    });

    // Calculate weighted overall score
    let overallScore = 0;
    let totalWeight = 0;

    Object.entries(categoryScores).forEach(([category, score]) => {
      const weight = categoryWeights[category];
      overallScore += score * weight;
      totalWeight += weight;
    });

    overallScore = totalWeight > 0 ? overallScore / totalWeight : 0;

    const threshold = this.thresholds.get(context) || this.thresholds.get('default')!;
    const approved = overallScore >= threshold.minimum;
    const requiresHumanReview = overallScore < threshold.preferred;

    // Estimate review time based on issues
    const criticalIssues = allIssues.filter(i => i.severity === 'critical').length;
    const majorIssues = allIssues.filter(i => i.severity === 'high').length;
    const minorIssues = allIssues.filter(i => i.severity === 'medium' || i.severity === 'low').length;
    
    const estimatedReviewTime = criticalIssues * 15 + majorIssues * 10 + minorIssues * 5;

    const report: QualityReport = {
      id: this.generateId(),
      contentId,
      sourceLocale,
      targetLocale,
      overallScore,
      categoryScores,
      issues: allIssues,
      suggestions: allSuggestions,
      reviewedBy,
      reviewedAt: new Date().toISOString(),
      approved,
      requiresHumanReview,
      estimatedReviewTime
    };

    this.reports.set(report.id, report);
    return report;
  }

  // Report Management
  getReport(reportId: string): QualityReport | null {
    return this.reports.get(reportId) || null;
  }

  getReportsByContent(contentId: string): QualityReport[] {
    return Array.from(this.reports.values()).filter(report => report.contentId === contentId);
  }

  getAllReports(): QualityReport[] {
    return Array.from(this.reports.values());
  }

  getReportsNeedingReview(): QualityReport[] {
    return this.getAllReports().filter(report => report.requiresHumanReview && !report.approved);
  }

  // Quality Metrics
  getQualityMetrics(): QualityMetrics {
    const reports = this.getAllReports();
    
    const totalChecks = reports.length;
    const passedChecks = reports.filter(r => r.approved).length;
    const averageScore = reports.reduce((sum, r) => sum + r.overallScore, 0) / (totalChecks || 1);
    
    const allIssues = reports.flatMap(r => r.issues);
    const criticalIssues = allIssues.filter(i => i.severity === 'critical').length;
    const majorIssues = allIssues.filter(i => i.severity === 'high').length;
    const minorIssues = allIssues.filter(i => i.severity === 'medium' || i.severity === 'low').length;
    
    const suggestionsCount = reports.reduce((sum, r) => sum + r.suggestions.length, 0);
    const reviewTime = reports.reduce((sum, r) => sum + r.estimatedReviewTime, 0);

    return {
      totalChecks,
      passedChecks,
      averageScore,
      criticalIssues,
      majorIssues,
      minorIssues,
      suggestionsCount,
      reviewTime
    };
  }

  // Check Management
  addCheck(check: QualityCheck): void {
    this.checks.set(check.id, check);
  }

  removeCheck(checkId: string): boolean {
    return this.checks.delete(checkId);
  }

  getCheck(checkId: string): QualityCheck | null {
    return this.checks.get(checkId) || null;
  }

  getAllChecks(): QualityCheck[] {
    return Array.from(this.checks.values());
  }

  getChecksByCategory(category: QualityCheck['category']): QualityCheck[] {
    return this.getAllChecks().filter(check => check.category === category);
  }

  // Threshold Management
  getThreshold(context: string): QualityThreshold | null {
    return this.thresholds.get(context) || this.thresholds.get('default') || null;
  }

  setThreshold(context: string, threshold: QualityThreshold): void {
    this.thresholds.set(context, threshold);
  }

  // Batch Processing
  batchAssess(
    assessments: Array<{
      contentId: string;
      sourceText: string;
      targetText: string;
      sourceLocale: Locale;
      targetLocale: Locale;
      context?: string;
      reviewedBy: string;
    }>
  ): QualityReport[] {
    return assessments.map(assessment => 
      this.assessQuality(
        assessment.contentId,
        assessment.sourceText,
        assessment.targetText,
        assessment.sourceLocale,
        assessment.targetLocale,
        assessment.context || 'default',
        assessment.reviewedBy
      )
    );
  }

  // Export/Import
  exportReports(): string {
    const data = {
      reports: Array.from(this.reports.entries()),
      checks: Array.from(this.checks.entries()),
      thresholds: Array.from(this.thresholds.entries()),
      exportedAt: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  importReports(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.reports) {
        data.reports.forEach(([id, report]: [string, QualityReport]) => {
          this.reports.set(id, report);
        });
      }
      
      if (data.checks) {
        data.checks.forEach(([id, check]: [string, QualityCheck]) => {
          this.checks.set(id, check);
        });
      }
      
      if (data.thresholds) {
        data.thresholds.forEach(([context, threshold]: [string, QualityThreshold]) => {
          this.thresholds.set(context, threshold);
        });
      }
      
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }

  // Utility functions
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Quality Trends
  getQualityTrends(days: number = 30): Array<{
    date: string;
    averageScore: number;
    reportCount: number;
    approvalRate: number;
  }> {
    const reports = this.getAllReports();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const dailyReports: Record<string, QualityReport[]> = {};

    reports.forEach(report => {
      const reportDate = new Date(report.reviewedAt).toISOString().split('T')[0];
      if (new Date(report.reviewedAt) >= cutoffDate) {
        if (!dailyReports[reportDate]) {
          dailyReports[reportDate] = [];
        }
        dailyReports[reportDate].push(report);
      }
    });

    return Object.entries(dailyReports).map(([date, dayReports]) => ({
      date,
      averageScore: dayReports.reduce((sum, r) => sum + r.overallScore, 0) / dayReports.length,
      reportCount: dayReports.length,
      approvalRate: (dayReports.filter(r => r.approved).length / dayReports.length) * 100
    })).sort((a, b) => a.date.localeCompare(b.date));
  }
}

// Export singleton instance
export const qualityAssurance = new TranslationQualityAssurance();

// Export convenience functions
export function assessTranslationQuality(
  contentId: string,
  sourceText: string,
  targetText: string,
  sourceLocale: Locale,
  targetLocale: Locale,
  context: string = 'default',
  reviewedBy: string
): QualityReport {
  return qualityAssurance.assessQuality(
    contentId,
    sourceText,
    targetText,
    sourceLocale,
    targetLocale,
    context,
    reviewedBy
  );
}

export function getQualityMetrics(): QualityMetrics {
  return qualityAssurance.getQualityMetrics();
}

export function getReportsNeedingReview(): QualityReport[] {
  return qualityAssurance.getReportsNeedingReview();
}
