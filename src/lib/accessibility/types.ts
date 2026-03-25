export interface AccessibilityIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  category: 'wcag' | 'aria' | 'keyboard' | 'color' | 'structure' | 'content';
  rule: string;
  description: string;
  element: string;
  selector: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  recommendation: string;
}

export interface AccessibilityScore {
  score: number;
  level: 'AAA' | 'AA' | 'A';
}
