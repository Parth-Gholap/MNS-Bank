import { Locale } from '../i18n';

export interface CMSContent {
  id: string;
  type: 'page' | 'component' | 'article' | 'form' | 'navigation';
  title: {
    en: string;
    hi: string;
  };
  content: {
    en: string;
    hi: string;
  };
  metadata: {
    created: string;
    updated: string;
    author: string;
    status: 'draft' | 'review' | 'published' | 'archived';
    version: number;
    tags: string[];
    category?: string;
  };
  seo: {
    title: {
      en: string;
      hi: string;
    };
    description: {
      en: string;
      hi: string;
    };
    keywords: {
      en: string[];
      hi: string[];
    };
  };
  validation?: {
    hindiReviewed: boolean;
    reviewedBy?: string;
    reviewedDate?: string;
    qualityScore?: number;
    issues: string[];
  };
}

export interface TranslationWorkflow {
  id: string;
  contentId: string;
  status: 'pending' | 'in_progress' | 'review' | 'approved' | 'rejected';
  assignedTo?: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  history: WorkflowHistory[];
}

export interface WorkflowHistory {
  id: string;
  action: 'created' | 'assigned' | 'submitted' | 'reviewed' | 'approved' | 'rejected' | 'completed';
  performedBy: string;
  performedAt: string;
  notes?: string;
  attachments?: string[];
}

export interface QualityAssurance {
  contentId: string;
  locale: Locale;
  score: number;
  checks: {
    grammar: boolean;
    spelling: boolean;
    consistency: boolean;
    terminology: boolean;
    cultural: boolean;
    technical: boolean;
  };
  issues: QualityIssue[];
  reviewedBy: string;
  reviewedAt: string;
  approved: boolean;
}

export interface QualityIssue {
  id: string;
  type: 'grammar' | 'spelling' | 'consistency' | 'terminology' | 'cultural' | 'technical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestion: string;
  position?: {
    line: number;
    column: number;
    context: string;
  };
  resolved?: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
}

class HindiContentManager {
  private content: Map<string, CMSContent> = new Map();
  private workflows: Map<string, TranslationWorkflow> = new Map();
  private qualityReports: Map<string, QualityAssurance> = new Map();

  constructor() {
    this.initializeDefaultContent();
  }

  private initializeDefaultContent(): void {
    // Initialize with some default Hindi content
    const defaultContent: CMSContent[] = [
      {
        id: 'home-page',
        type: 'page',
        title: {
          en: 'Home',
          hi: 'मुख्य पृष्ठ'
        },
        content: {
          en: 'Welcome to our banking services',
          hi: 'हमारी बैंकिंग सेवाओं में आपका स्वागत है'
        },
        metadata: {
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          author: 'system',
          status: 'published',
          version: 1,
          tags: ['home', 'landing', 'main'],
          category: 'pages'
        },
        seo: {
          title: {
            en: 'Home - MNS Bank',
            hi: 'मुख्य पृष्ठ - एमएनएस बैंक'
          },
          description: {
            en: 'Welcome to MNS Bank - Your trusted banking partner',
            hi: 'एमएनएस बैंक में आपका स्वागत - आपका विश्वसनीय बैंकिंग साथी'
          },
          keywords: {
            en: ['banking', 'finance', 'services', 'home'],
            hi: ['बैंकिंग', 'वित्त', 'सेवाएं', 'मुख्य पृष्ठ']
          }
        },
        validation: {
          hindiReviewed: true,
          reviewedBy: 'hindi-expert',
          reviewedDate: new Date().toISOString(),
          qualityScore: 95,
          issues: []
        }
      },
      {
        id: 'navigation-main',
        type: 'navigation',
        title: {
          en: 'Main Navigation',
          hi: 'मुख्य नेविगेशन'
        },
        content: {
          en: 'Personal, Business, Accounts, Loans',
          hi: 'व्यक्तिग, व्यवसाय, खाते, ऋण'
        },
        metadata: {
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          author: 'system',
          status: 'published',
          version: 1,
          tags: ['navigation', 'menu', 'header'],
          category: 'navigation'
        },
        seo: {
          title: {
            en: 'Main Navigation',
            hi: 'मुख्य नेविगेशन'
          },
          description: {
            en: 'Main navigation menu',
            hi: 'मुख्य नेविगेशन मेनू'
          },
          keywords: {
            en: ['navigation', 'menu', 'header'],
            hi: ['नेविगेशन', 'मेनू', 'हेडर']
          }
        },
        validation: {
          hindiReviewed: true,
          reviewedBy: 'hindi-expert',
          reviewedDate: new Date().toISOString(),
          qualityScore: 98,
          issues: []
        }
      }
    ];

    defaultContent.forEach(content => {
      this.content.set(content.id, content);
    });
  }

  // Content Management
  createContent(content: any): CMSContent {
    const newContent: CMSContent = {
      ...content,
      id: this.generateId(),
      metadata: {
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        author: 'current-user',
        status: 'draft',
        version: 1,
        tags: content.tags || [],
        category: content.category
      }
    };

    this.content.set(newContent.id, newContent);
    this.createTranslationWorkflow(newContent.id);
    
    return newContent;
  }

  updateContent(id: string, updates: Partial<CMSContent>): CMSContent | null {
    const existing = this.content.get(id);
    if (!existing) return null;

    const updated: CMSContent = {
      ...existing,
      ...updates,
      metadata: {
        ...existing.metadata,
        ...updates.metadata,
        updated: new Date().toISOString(),
        version: existing.metadata.version + 1
      }
    };

    this.content.set(id, updated);
    this.updateWorkflow(id, 'updated');
    
    return updated;
  }

  getContent(id: string): CMSContent | null {
    return this.content.get(id) || null;
  }

  getAllContent(): CMSContent[] {
    return Array.from(this.content.values());
  }

  getContentByType(type: CMSContent['type']): CMSContent[] {
    return this.getAllContent().filter(content => content.type === type);
  }

  getContentByStatus(status: CMSContent['metadata']['status']): CMSContent[] {
    return this.getAllContent().filter(content => content.metadata.status === status);
  }

  deleteContent(id: string): boolean {
    return this.content.delete(id);
  }

  // Translation Workflow
  private createTranslationWorkflow(contentId: string): TranslationWorkflow {
    const workflow: TranslationWorkflow = {
      id: this.generateId(),
      contentId,
      status: 'pending',
      assignedBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priority: 'medium',
      history: [
        {
          id: this.generateId(),
          action: 'created',
          performedBy: 'system',
          performedAt: new Date().toISOString()
        }
      ]
    };

    this.workflows.set(workflow.id, workflow);
    return workflow;
  }

  private updateWorkflow(contentId: string, action: string, notes?: string): void {
    const workflows = Array.from(this.workflows.values()).filter(w => w.contentId === contentId);
    
    workflows.forEach(workflow => {
      workflow.status = 'in_progress';
      workflow.updatedAt = new Date().toISOString();
      workflow.history.push({
        id: this.generateId(),
        action: action as any,
        performedBy: 'current-user',
        performedAt: new Date().toISOString(),
        notes
      });
    });
  }

  getWorkflows(): TranslationWorkflow[] {
    return Array.from(this.workflows.values());
  }

  getWorkflow(id: string): TranslationWorkflow | null {
    return this.workflows.get(id) || null;
  }

  getWorkflowsByStatus(status: TranslationWorkflow['status']): TranslationWorkflow[] {
    return this.getWorkflows().filter(workflow => workflow.status === status);
  }

  assignWorkflow(workflowId: string, assignedTo: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return false;

    workflow.assignedTo = assignedTo;
    workflow.status = 'in_progress';
    workflow.updatedAt = new Date().toISOString();
    workflow.history.push({
      id: this.generateId(),
      action: 'assigned',
      performedBy: 'current-user',
      performedAt: new Date().toISOString()
    });

    return true;
  }

  submitWorkflow(workflowId: string, notes?: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return false;

    workflow.status = 'review';
    workflow.updatedAt = new Date().toISOString();
    workflow.history.push({
      id: this.generateId(),
      action: 'submitted',
      performedBy: workflow.assignedTo || 'anonymous',
      performedAt: new Date().toISOString(),
      notes
    });

    return true;
  }

  approveWorkflow(workflowId: string, approvedBy: string, notes?: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return false;

    workflow.status = 'approved';
    workflow.updatedAt = new Date().toISOString();
    workflow.history.push({
      id: this.generateId(),
      action: 'approved',
      performedBy: approvedBy,
      performedAt: new Date().toISOString(),
      notes
    });

    // Update content status
    const content = this.content.get(workflow.contentId);
    if (content) {
      content.metadata.status = 'published';
      content.validation = {
        hindiReviewed: true,
        reviewedBy: approvedBy,
        reviewedDate: new Date().toISOString(),
        qualityScore: 95,
        issues: []
      };
    }

    return true;
  }

  rejectWorkflow(workflowId: string, rejectedBy: string, notes?: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return false;

    workflow.status = 'rejected';
    workflow.updatedAt = new Date().toISOString();
    workflow.history.push({
      id: this.generateId(),
      action: 'rejected',
      performedBy: rejectedBy,
      performedAt: new Date().toISOString(),
      notes
    });

    return true;
  }

  // Quality Assurance
  runQualityAssurance(contentId: string, locale: Locale = 'hi'): QualityAssurance {
    const content = this.content.get(contentId);
    if (!content) {
      throw new Error(`Content not found: ${contentId}`);
    }

    const hindiContent = content.content.hi;
    const issues = this.analyzeQuality(hindiContent);
    
    const qa: QualityAssurance = {
      contentId,
      locale,
      score: this.calculateQualityScore(issues),
      checks: {
        grammar: !issues.some(i => i.type === 'grammar' && i.severity === 'critical'),
        spelling: !issues.some(i => i.type === 'spelling' && i.severity === 'critical'),
        consistency: !issues.some(i => i.type === 'consistency' && i.severity === 'high'),
        terminology: !issues.some(i => i.type === 'terminology' && i.severity === 'high'),
        cultural: !issues.some(i => i.type === 'cultural' && i.severity === 'medium'),
        technical: !issues.some(i => i.type === 'technical' && i.severity === 'critical')
      },
      issues,
      reviewedBy: 'qa-system',
      reviewedAt: new Date().toISOString(),
      approved: issues.filter(i => i.severity === 'critical' || i.severity === 'high').length === 0
    };

    this.qualityReports.set(`${contentId}-${locale}`, qa);
    return qa;
  }

  private analyzeQuality(content: string): QualityIssue[] {
    const issues: QualityIssue[] = [];

    // Check for common Hindi quality issues
    if (content.match(/[a-zA-Z]{3,}/g)) {
      issues.push({
        id: this.generateId(),
        type: 'terminology',
        severity: 'medium',
        description: 'Contains English words that should be translated',
        suggestion: 'Translate English words to Hindi'
      });
    }

    // Check for proper Unicode
    if (!content.match(/[\u0900-\u097F]/)) {
      issues.push({
        id: this.generateId(),
        type: 'technical',
        severity: 'high',
        description: 'No Hindi characters found',
        suggestion: 'Add proper Hindi Devanagari characters'
      });
    }

    // Check length consistency
    if (content.length > 500) {
      issues.push({
        id: this.generateId(),
        type: 'consistency',
        severity: 'low',
        description: 'Content is quite long',
        suggestion: 'Consider breaking into smaller sections'
      });
    }

    return issues;
  }

  private calculateQualityScore(issues: QualityIssue[]): number {
    let score = 100;
    
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical':
          score -= 20;
          break;
        case 'high':
          score -= 10;
          break;
        case 'medium':
          score -= 5;
          break;
        case 'low':
          score -= 2;
          break;
      }
    });

    return Math.max(0, score);
  }

  getQualityReport(contentId: string, locale: Locale = 'hi'): QualityAssurance | null {
    return this.qualityReports.get(`${contentId}-${locale}`) || null;
  }

  getAllQualityReports(): QualityAssurance[] {
    return Array.from(this.qualityReports.values());
  }

  // Analytics and Reporting
  getContentStats(): {
    total: number;
    published: number;
    draft: number;
    review: number;
    hindiReviewed: number;
    averageQualityScore: number;
  } {
    const allContent = this.getAllContent();
    const published = allContent.filter(c => c.metadata.status === 'published').length;
    const draft = allContent.filter(c => c.metadata.status === 'draft').length;
    const review = allContent.filter(c => c.metadata.status === 'review').length;
    const hindiReviewed = allContent.filter(c => c.validation?.hindiReviewed).length;
    
    const qualityReports = this.getAllQualityReports();
    const averageQualityScore = qualityReports.length > 0 
      ? qualityReports.reduce((sum, report) => sum + report.score, 0) / qualityReports.length 
      : 0;

    return {
      total: allContent.length,
      published,
      draft,
      review,
      hindiReviewed,
      averageQualityScore
    };
  }

  getWorkflowStats(): {
    total: number;
    pending: number;
    inProgress: number;
    review: number;
    approved: number;
    rejected: number;
  } {
    const workflows = this.getWorkflows();
    
    return {
      total: workflows.length,
      pending: workflows.filter(w => w.status === 'pending').length,
      inProgress: workflows.filter(w => w.status === 'in_progress').length,
      review: workflows.filter(w => w.status === 'review').length,
      approved: workflows.filter(w => w.status === 'approved').length,
      rejected: workflows.filter(w => w.status === 'rejected').length
    };
  }

  // Utility functions
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  exportContent(): string {
    const data = {
      content: Array.from(this.content.entries()),
      workflows: Array.from(this.workflows.entries()),
      qualityReports: Array.from(this.qualityReports.entries()),
      exportedAt: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  importContent(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.content) {
        data.content.forEach(([id, content]: [string, CMSContent]) => {
          this.content.set(id, content);
        });
      }
      
      if (data.workflows) {
        data.workflows.forEach(([id, workflow]: [string, TranslationWorkflow]) => {
          this.workflows.set(id, workflow);
        });
      }
      
      if (data.qualityReports) {
        data.qualityReports.forEach(([id, report]: [string, QualityAssurance]) => {
          this.qualityReports.set(id, report);
        });
      }
      
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const hindiContentManager = new HindiContentManager();

// Export convenience functions
export function createHindiContent(content: Omit<CMSContent, 'id' | 'metadata'>): CMSContent {
  return hindiContentManager.createContent(content);
}

export function updateHindiContent(id: string, updates: Partial<CMSContent>): CMSContent | null {
  return hindiContentManager.updateContent(id, updates);
}

export function getHindiContent(id: string): CMSContent | null {
  return hindiContentManager.getContent(id);
}

export function runHindiQualityCheck(contentId: string): QualityAssurance {
  return hindiContentManager.runQualityAssurance(contentId);
}

export function getHindiContentStats() {
  return hindiContentManager.getContentStats();
}

export function getHindiWorkflowStats() {
  return hindiContentManager.getWorkflowStats();
}
