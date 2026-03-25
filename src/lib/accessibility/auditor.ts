import { AccessibilityIssue, AccessibilityScore } from './types';

export class AccessibilityAuditor {
  private static instance: AccessibilityAuditor | null = null;

  static getInstance(): AccessibilityAuditor {
    if (!AccessibilityAuditor.instance) {
      AccessibilityAuditor.instance = new AccessibilityAuditor();
    }
    return AccessibilityAuditor.instance;
  }

  private issues: AccessibilityIssue[] = [];

  constructor() {
    this.issues = [];
  }

  getScore(): AccessibilityScore {
    if (this.issues.length === 0) {
      return { score: 100, level: 'AA' };
    }

    const criticalIssues = this.issues.filter(issue => issue.impact === 'critical');
    const seriousIssues = this.issues.filter(issue => issue.impact === 'serious');
    const moderateIssues = this.issues.filter(issue => issue.impact === 'moderate');
    const minorIssues = this.issues.filter(issue => issue.impact === 'minor');

    let score = 100;
    if (criticalIssues.length > 0) {
      score -= 50;
    } else if (seriousIssues.length > 0) {
      score -= 30;
    } else if (moderateIssues.length > 0) {
      score -= 20;
    } else if (minorIssues.length > 0) {
      score -= 10;
    }

    let level: 'AAA' | 'AA' | 'A' = 'AA';
    if (score < 50) {
      level = 'A';
    } else if (score < 80) {
      level = 'AA';
    } else if (score < 90) {
      level = 'AAA';
    }

    return { score, level };
  }

  getIssues(): AccessibilityIssue[] {
    return this.issues;
  }

  addIssue(issue: AccessibilityIssue): void {
    this.issues.push(issue);
  }

  clearIssues(): void {
    this.issues = [];
  }
}
