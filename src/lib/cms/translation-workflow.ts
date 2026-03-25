import { Locale } from '../i18n';
import { CMSContent, TranslationWorkflow, WorkflowHistory } from './hindi-content';

export interface TranslationTask {
  id: string;
  sourceContentId: string;
  sourceLocale: Locale;
  targetLocale: Locale;
  status: 'pending' | 'assigned' | 'in_progress' | 'submitted' | 'review' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  progress: number; // 0-100
  notes?: string;
  attachments?: string[];
  history: TranslationTaskHistory[];
  quality?: TranslationQuality;
}

export interface TranslationTaskHistory {
  id: string;
  action: 'created' | 'assigned' | 'started' | 'progress_updated' | 'submitted' | 'review_started' | 'review_completed' | 'approved' | 'rejected' | 'reopened';
  performedBy: string;
  performedAt: string;
  notes?: string;
  data?: {
    progress?: number;
    hours?: number;
    quality?: number;
    attachments?: string[];
  };
}

export interface TranslationQuality {
  accuracy: number; // 0-100
  fluency: number; // 0-100
  consistency: number; // 0-100
  terminology: number; // 0-100
  cultural: number; // 0-100
  overall: number; // 0-100
  issues: TranslationIssue[];
  reviewedBy: string;
  reviewedAt: string;
  feedback?: string;
}

export interface TranslationIssue {
  id: string;
  type: 'accuracy' | 'fluency' | 'consistency' | 'terminology' | 'cultural' | 'formatting';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestion?: string;
  position?: {
    segment: string;
    line: number;
    context: string;
  };
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface TranslationTemplate {
  id: string;
  name: string;
  description: string;
  sourceLocale: Locale;
  targetLocale: Locale;
  contentType: string;
  instructions: string;
  guidelines: string[];
  terminology: TranslationTerminology[];
  qualityThreshold: number;
  estimatedTimePerWord: number; // minutes
}

export interface TranslationTerminology {
  source: string;
  target: string;
  context: string;
  notes?: string;
  mandatory: boolean;
}

export interface TranslatorProfile {
  id: string;
  name: string;
  email: string;
  locales: Locale[];
  specializations: string[];
  experience: number; // years
  averageQuality: number;
  capacity: number; // tasks per month
  availability: 'available' | 'busy' | 'unavailable';
  rate: number; // per word
  certifications: string[];
  rating: number; // 0-5
  completedTasks: number;
}

class TranslationWorkflowManager {
  private tasks: Map<string, TranslationTask> = new Map();
  private templates: Map<string, TranslationTemplate> = new Map();
  private translators: Map<string, TranslatorProfile> = new Map();
  private workflows: Map<string, TranslationWorkflow> = new Map();

  constructor() {
    this.initializeTemplates();
    this.initializeTranslators();
  }

  private initializeTemplates(): void {
    const templates: TranslationTemplate[] = [
      {
        id: 'hindi-website-content',
        name: 'Hindi Website Content',
        description: 'Standard template for translating website content to Hindi',
        sourceLocale: 'en',
        targetLocale: 'hi',
        contentType: 'website',
        instructions: 'Translate all English website content to Hindi while maintaining the original meaning and tone',
        guidelines: [
          'Use formal Hindi language',
          'Maintain consistent terminology',
          'Preserve formatting and structure',
          'Translate UI elements accurately',
          'Consider cultural context',
          'Use proper Devanagari script',
          'Avoid direct translations of idioms',
          'Maintain brand voice'
        ],
        terminology: [
          { source: 'Account', target: 'खाता', context: 'Bank account', mandatory: true },
          { source: 'Loan', target: 'ऋण', context: 'Financial loan', mandatory: true },
          { source: 'Interest Rate', target: 'ब्याज दर', context: 'Banking interest', mandatory: true },
          { source: 'Credit Card', target: 'क्रेडिट कार्ड', context: 'Payment card', mandatory: true },
          { source: 'Debit Card', target: 'डेबिट कार्ड', context: 'Payment card', mandatory: true },
          { source: 'Mobile Banking', target: 'मोबाइल बैंकिंग', context: 'Banking service', mandatory: true },
          { source: 'Net Banking', target: 'नेट बैंकिंग', context: 'Online banking', mandatory: true },
          { source: 'ATM', target: 'एटीएम', context: 'Automated Teller Machine', mandatory: true },
          { source: 'UPI', target: 'यूपीआई', context: 'Unified Payments Interface', mandatory: true }
        ],
        qualityThreshold: 85,
        estimatedTimePerWord: 2
      },
      {
        id: 'hindi-marketing-content',
        name: 'Hindi Marketing Content',
        description: 'Template for translating marketing materials to Hindi',
        sourceLocale: 'en',
        targetLocale: 'hi',
        contentType: 'marketing',
        instructions: 'Translate marketing content to Hindi with persuasive and culturally appropriate language',
        guidelines: [
          'Use persuasive language',
          'Adapt cultural references',
          'Maintain marketing impact',
          'Use appropriate honorifics',
          'Consider local idioms',
          'Preserve call-to-action effectiveness',
          'Adapt tone for Hindi audience',
          'Maintain brand consistency'
        ],
        terminology: [
          { source: 'Offer', target: 'ऑफर', context: 'Special offer', mandatory: false },
          { source: 'Discount', target: 'छूट', context: 'Price reduction', mandatory: true },
          { source: 'Promotion', target: 'प्रमोशन', context: 'Marketing promotion', mandatory: false },
          { source: 'Campaign', target: 'अभियान', context: 'Marketing campaign', mandatory: true }
        ],
        qualityThreshold: 80,
        estimatedTimePerWord: 3
      }
    ];

    templates.forEach(template => {
      this.templates.set(template.id, template);
    });
  }

  private initializeTranslators(): void {
    const translators: TranslatorProfile[] = [
      {
        id: 'translator-1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        locales: ['hi'],
        specializations: ['banking', 'finance', 'legal'],
        experience: 5,
        averageQuality: 92,
        capacity: 20,
        availability: 'available',
        rate: 0.10,
        certifications: ['Hindi Translation Certificate', 'Banking Terminology'],
        rating: 4.8,
        completedTasks: 150
      },
      {
        id: 'translator-2',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        locales: ['hi'],
        specializations: ['marketing', 'content', 'creative'],
        experience: 3,
        averageQuality: 88,
        capacity: 25,
        availability: 'available',
        rate: 0.08,
        certifications: ['Creative Writing', 'Marketing Translation'],
        rating: 4.6,
        completedTasks: 120
      }
    ];

    translators.forEach(translator => {
      this.translators.set(translator.id, translator);
    });
  }

  // Task Management
  createTranslationTask(
    sourceContentId: string,
    sourceLocale: Locale,
    targetLocale: Locale,
    priority: TranslationTask['priority'],
    assignedBy: string,
    dueDate?: string
  ): TranslationTask {
    const task: TranslationTask = {
      id: this.generateId(),
      sourceContentId,
      sourceLocale,
      targetLocale,
      status: 'pending',
      priority,
      assignedBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate,
      progress: 0,
      history: [
        {
          id: this.generateId(),
          action: 'created',
          performedBy: assignedBy,
          performedAt: new Date().toISOString()
        }
      ]
    };

    this.tasks.set(task.id, task);
    return task;
  }

  assignTranslationTask(taskId: string, translatorId: string, assignedBy: string): boolean {
    const task = this.tasks.get(taskId);
    const translator = this.translators.get(translatorId);
    
    if (!task || !translator || translator.availability !== 'available') {
      return false;
    }

    task.assignedTo = translatorId;
    task.status = 'assigned';
    task.updatedAt = new Date().toISOString();
    task.history.push({
      id: this.generateId(),
      action: 'assigned',
      performedBy: assignedBy,
      performedAt: new Date().toISOString(),
      data: { progress: task.progress }
    });

    return true;
  }

  updateTaskProgress(taskId: string, progress: number, notes?: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    if (progress < 0 || progress > 100) return false;

    task.progress = progress;
    task.status = progress > 0 && progress < 100 ? 'in_progress' : task.status;
    task.updatedAt = new Date().toISOString();
    
    if (notes) {
      task.notes = notes;
    }

    task.history.push({
      id: this.generateId(),
      action: 'progress_updated',
      performedBy: task.assignedTo || 'system',
      performedAt: new Date().toISOString(),
      data: { progress }
    });

    return true;
  }

  submitTranslationTask(taskId: string, notes?: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    task.status = 'submitted';
    task.updatedAt = new Date().toISOString();
    
    if (notes) {
      task.notes = notes;
    }

    task.history.push({
      id: this.generateId(),
      action: 'submitted',
      performedBy: task.assignedTo || 'system',
      performedAt: new Date().toISOString()
    });

    return true;
  }

  startReview(taskId: string, reviewerId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task || task.status !== 'submitted') return false;

    task.status = 'review';
    task.updatedAt = new Date().toISOString();
    task.history.push({
      id: this.generateId(),
      action: 'review_started',
      performedBy: reviewerId,
      performedAt: new Date().toISOString()
    });

    return true;
  }

  completeReview(taskId: string, quality: TranslationQuality, reviewerId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task || task.status !== 'review') return false;

    task.quality = quality;
    task.status = quality.overall >= 85 ? 'approved' : 'rejected';
    task.updatedAt = new Date().toISOString();
    task.history.push({
      id: this.generateId(),
      action: 'review_completed',
      performedBy: reviewerId,
      performedAt: new Date().toISOString(),
      data: { quality: quality.overall }
    });

    return true;
  }

  approveTask(taskId: string, approvedBy: string, notes?: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    task.status = 'approved';
    task.updatedAt = new Date().toISOString();
    
    if (notes) {
      task.notes = notes;
    }

    task.history.push({
      id: this.generateId(),
      action: 'approved',
      performedBy: approvedBy,
      performedAt: new Date().toISOString()
    });

    return true;
  }

  rejectTask(taskId: string, rejectedBy: string, notes?: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    task.status = 'rejected';
    task.updatedAt = new Date().toISOString();
    
    if (notes) {
      task.notes = notes;
    }

    task.history.push({
      id: this.generateId(),
      action: 'rejected',
      performedBy: rejectedBy,
      performedAt: new Date().toISOString()
    });

    return true;
  }

  reopenTask(taskId: string, reopenedBy: string, notes?: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task || task.status !== 'rejected') return false;

    task.status = 'in_progress';
    task.progress = 0;
    task.updatedAt = new Date().toISOString();
    
    if (notes) {
      task.notes = notes;
    }

    task.history.push({
      id: this.generateId(),
      action: 'reopened',
      performedBy: reopenedBy,
      performedAt: new Date().toISOString(),
      data: { progress: 0 }
    });

    return true;
  }

  // Task Queries
  getTask(taskId: string): TranslationTask | null {
    return this.tasks.get(taskId) || null;
  }

  getAllTasks(): TranslationTask[] {
    return Array.from(this.tasks.values());
  }

  getTasksByStatus(status: TranslationTask['status']): TranslationTask[] {
    return this.getAllTasks().filter(task => task.status === status);
  }

  getTasksByTranslator(translatorId: string): TranslationTask[] {
    return this.getAllTasks().filter(task => task.assignedTo === translatorId);
  }

  getTasksByPriority(priority: TranslationTask['priority']): TranslationTask[] {
    return this.getAllTasks().filter(task => task.priority === priority);
  }

  getOverdueTasks(): TranslationTask[] {
    const now = new Date();
    return this.getAllTasks().filter(task => 
      task.dueDate && new Date(task.dueDate) < now && task.status !== 'approved'
    );
  }

  // Template Management
  getTemplate(templateId: string): TranslationTemplate | null {
    return this.templates.get(templateId) || null;
  }

  getAllTemplates(): TranslationTemplate[] {
    return Array.from(this.templates.values());
  }

  createTemplate(template: Omit<TranslationTemplate, 'id'>): TranslationTemplate {
    const newTemplate: TranslationTemplate = {
      ...template,
      id: this.generateId()
    };

    this.templates.set(newTemplate.id, newTemplate);
    return newTemplate;
  }

  updateTemplate(templateId: string, updates: Partial<TranslationTemplate>): boolean {
    const template = this.templates.get(templateId);
    if (!template) return false;

    Object.assign(template, updates);
    return true;
  }

  // Translator Management
  getTranslator(translatorId: string): TranslatorProfile | null {
    return this.translators.get(translatorId) || null;
  }

  getAllTranslators(): TranslatorProfile[] {
    return Array.from(this.translators.values());
  }

  getTranslatorsByLocale(locale: Locale): TranslatorProfile[] {
    return this.getAllTranslators().filter(translator => 
      translator.locales.includes(locale)
    );
  }

  getAvailableTranslators(locale: Locale): TranslatorProfile[] {
    return this.getTranslatorsByLocale(locale).filter(translator => 
      translator.availability === 'available'
    );
  }

  updateTranslatorAvailability(translatorId: string, availability: TranslatorProfile['availability']): boolean {
    const translator = this.translators.get(translatorId);
    if (!translator) return false;

    translator.availability = availability;
    return true;
  }

  // Analytics and Reporting
  getTaskStats(): {
    total: number;
    pending: number;
    assigned: number;
    inProgress: number;
    submitted: number;
    review: number;
    approved: number;
    rejected: number;
    averageProgress: number;
    overdueCount: number;
  } {
    const tasks = this.getAllTasks();
    const overdue = this.getOverdueTasks();
    
    const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
    const averageProgress = tasks.length > 0 ? totalProgress / tasks.length : 0;

    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      assigned: tasks.filter(t => t.status === 'assigned').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      submitted: tasks.filter(t => t.status === 'submitted').length,
      review: tasks.filter(t => t.status === 'review').length,
      approved: tasks.filter(t => t.status === 'approved').length,
      rejected: tasks.filter(t => t.status === 'rejected').length,
      averageProgress,
      overdueCount: overdue.length
    };
  }

  getTranslatorStats(): {
    total: number;
    available: number;
    busy: number;
    unavailable: number;
    averageRating: number;
    totalCompletedTasks: number;
    averageQuality: number;
  } {
    const translators = this.getAllTranslators();
    
    const totalRating = translators.reduce((sum, t) => sum + t.rating, 0);
    const averageRating = translators.length > 0 ? totalRating / translators.length : 0;
    
    const totalQuality = translators.reduce((sum, t) => sum + t.averageQuality, 0);
    const averageQuality = translators.length > 0 ? totalQuality / translators.length : 0;
    
    const totalCompletedTasks = translators.reduce((sum, t) => sum + t.completedTasks, 0);

    return {
      total: translators.length,
      available: translators.filter(t => t.availability === 'available').length,
      busy: translators.filter(t => t.availability === 'busy').length,
      unavailable: translators.filter(t => t.availability === 'unavailable').length,
      averageRating,
      totalCompletedTasks,
      averageQuality
    };
  }

  getQualityStats(): {
    averageAccuracy: number;
    averageFluency: number;
    averageConsistency: number;
    averageTerminology: number;
    averageCultural: number;
    averageOverall: number;
    totalReviewed: number;
  } {
    const tasks = this.getAllTasks().filter(task => task.quality);
    
    if (tasks.length === 0) {
      return {
        averageAccuracy: 0,
        averageFluency: 0,
        averageConsistency: 0,
        averageTerminology: 0,
        averageCultural: 0,
        averageOverall: 0,
        totalReviewed: 0
      };
    }

    const totals = tasks.reduce((acc, task) => {
      if (task.quality) {
        acc.accuracy += task.quality.accuracy;
        acc.fluency += task.quality.fluency;
        acc.consistency += task.quality.consistency;
        acc.terminology += task.quality.terminology;
        acc.cultural += task.quality.cultural;
        acc.overall += task.quality.overall;
      }
      return acc;
    }, { accuracy: 0, fluency: 0, consistency: 0, terminology: 0, cultural: 0, overall: 0 });

    const count = tasks.length;
    
    return {
      averageAccuracy: totals.accuracy / count,
      averageFluency: totals.fluency / count,
      averageConsistency: totals.consistency / count,
      averageTerminology: totals.terminology / count,
      averageCultural: totals.cultural / count,
      averageOverall: totals.overall / count,
      totalReviewed: count
    };
  }

  // Utility functions
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  exportData(): string {
    const data = {
      tasks: Array.from(this.tasks.entries()),
      templates: Array.from(this.templates.entries()),
      translators: Array.from(this.translators.entries()),
      exportedAt: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.tasks) {
        data.tasks.forEach(([id, task]: [string, TranslationTask]) => {
          this.tasks.set(id, task);
        });
      }
      
      if (data.templates) {
        data.templates.forEach(([id, template]: [string, TranslationTemplate]) => {
          this.templates.set(id, template);
        });
      }
      
      if (data.translators) {
        data.translators.forEach(([id, translator]: [string, TranslatorProfile]) => {
          this.translators.set(id, translator);
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
export const translationWorkflowManager = new TranslationWorkflowManager();

// Export convenience functions
export function createTranslationTask(
  sourceContentId: string,
  sourceLocale: Locale,
  targetLocale: Locale,
  priority: TranslationTask['priority'],
  assignedBy: string,
  dueDate?: string
): TranslationTask {
  return translationWorkflowManager.createTranslationTask(
    sourceContentId,
    sourceLocale,
    targetLocale,
    priority,
    assignedBy,
    dueDate
  );
}

export function assignTranslationTask(taskId: string, translatorId: string, assignedBy: string): boolean {
  return translationWorkflowManager.assignTranslationTask(taskId, translatorId, assignedBy);
}

export function getTranslationTaskStats() {
  return translationWorkflowManager.getTaskStats();
}

export function getTranslatorStats() {
  return translationWorkflowManager.getTranslatorStats();
}

export function getQualityStats() {
  return translationWorkflowManager.getQualityStats();
}
