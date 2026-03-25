import { messages, validateTranslations, getTranslationStats, Locale } from './index';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  stats: TranslationStats;
}

export interface ValidationError {
  type: 'missing' | 'invalid' | 'empty' | 'format' | 'length' | 'consistency' | 'encoding';
  key: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationWarning {
  type: 'length' | 'consistency' | 'encoding';
  key: string;
  message: string;
}

export interface TranslationStats {
  totalKeys: number;
  translatedKeys: number;
  completion: number;
  missingKeys: string[];
}

export interface ContentValidationRule {
  name: string;
  description: string;
  validate: (key: string, value: string, locale: Locale) => ValidationError | null;
}

class HindiContentValidator {
  private rules: ContentValidationRule[] = [
    {
      name: 'mandatory-translation',
      description: 'All English keys must have Hindi translations',
      validate: (key: string, value: string, locale: Locale) => {
        if (locale === 'hi' && (!value || value.trim() === '')) {
          return {
            type: 'missing',
            key,
            message: `Missing Hindi translation for key: ${key}`,
            severity: 'error'
          };
        }
        return null;
      }
    },
    {
      name: 'no-english-content',
      description: 'Hindi translations should not contain English text',
      validate: (key: string, value: string, locale: Locale) => {
        if (locale === 'hi' && value) {
          const englishWords = value.match(/[a-zA-Z]+/g);
          if (englishWords && englishWords.length > 0) {
            // Allow common English words and abbreviations
            const allowedWords = ['ATM', 'UPI', 'QR', 'SMS', 'URL', 'API', 'ID', 'PIN', 'OTP', 'EMI', 'NRI', 'GST', 'PAN'];
            const disallowedWords = englishWords.filter(word => !allowedWords.includes(word.toUpperCase()));
            
            if (disallowedWords.length > 0) {
              return {
                type: 'invalid',
                key,
                message: `Hindi translation contains English words: ${disallowedWords.join(', ')}`,
                severity: 'warning'
              };
            }
          }
        }
        return null;
      }
    },
    {
      name: 'unicode-validation',
      description: 'Hindi translations must use proper Unicode Devanagari script',
      validate: (key: string, value: string, locale: Locale) => {
        if (locale === 'hi' && value) {
          // Check for proper Hindi Unicode range (Devanagari: \u0900-\u097F)
          const hindiChars = value.match(/[\u0900-\u097F]/g);
          const totalChars = value.replace(/\s/g, '').length;
          
          if (totalChars > 0 && (!hindiChars || hindiChars.length / totalChars < 0.3)) {
            return {
              type: 'format',
              key,
              message: 'Translation should primarily use Hindi Devanagari script',
              severity: 'warning'
            };
          }
        }
        return null;
      }
    },
    {
      name: 'length-consistency',
      description: 'Translation length should be reasonable compared to English',
      validate: (key: string, value: string, locale: Locale) => {
        if (locale === 'hi' && value) {
          const enValue = this.getEnglishValue(key);
          if (enValue) {
            const ratio = value.length / enValue.length;
            if (ratio > 2.5) {
              return {
                type: 'length',
                key,
                message: `Hindi translation is significantly longer than English (${ratio.toFixed(1)}x)`,
                severity: 'warning'
              };
            }
          }
        }
        return null;
      }
    },
    {
      name: 'placeholder-consistency',
      description: 'Placeholders should be consistent between languages',
      validate: (key: string, value: string, locale: Locale) => {
        if (locale === 'hi' && value) {
          const enValue = this.getEnglishValue(key);
          if (enValue) {
            const enPlaceholders = (enValue.match(/{{\w+}}/g) || []) as string[];
            const hiPlaceholders = (value.match(/{{\w+}}/g) || []) as string[];
            
            if ((enPlaceholders?.length || 0) !== (hiPlaceholders?.length || 0)) {
              return {
                type: 'format',
                key,
                message: `Placeholder count mismatch: EN(${enPlaceholders.length}) vs HI(${hiPlaceholders.length})`,
                severity: 'error'
              };
            }
            
            // Check if placeholder names match
            for (const enPlaceholder of enPlaceholders) {
              if (!hiPlaceholders.includes(enPlaceholder)) {
                return {
                  type: 'format',
                  key,
                  message: `Missing placeholder: ${enPlaceholder}`,
                  severity: 'error'
                };
              }
            }
          }
        }
        return null;
      }
    },
    {
      name: 'no-html-tags',
      description: 'Translations should not contain HTML tags',
      validate: (key: string, value: string, locale: Locale) => {
        if (value && /<[^>]*>/.test(value)) {
          return {
            type: 'invalid',
            key,
            message: 'Translation contains HTML tags',
            severity: 'warning'
          };
        }
        return null;
      }
    },
    {
      name: 'proper-capitalization',
      description: 'Hindi should use proper capitalization (mostly lowercase)',
      validate: (key: string, value: string, locale: Locale) => {
        if (locale === 'hi' && value) {
          const uppercaseWords = value.match(/\b[A-Z][a-z]+\b/g);
          if (uppercaseWords && uppercaseWords.length > 2) {
            return {
              type: 'format',
              key,
              message: `Excessive capitalization: ${uppercaseWords.join(', ')}`,
              severity: 'warning'
            };
          }
        }
        return null;
      }
    }
  ];

  private getEnglishValue(key: string): string | null {
    const keys = key.split('.');
    let value: any = messages.en;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || null;
  }

  validateAll(): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    // Get all translation keys
    const allKeys = this.getAllKeys(messages.en);
    
    for (const key of allKeys) {
      const enValue = this.getEnglishValue(key);
      const hiValue = this.getHindiValue(key);
      
      // Run validation rules
      for (const rule of this.rules) {
        const error = rule.validate(key, hiValue || '', 'hi');
        if (error) {
          if (error.severity === 'error') {
            errors.push(error);
          } else {
            warnings.push({
              type: error.type as any,
              key: error.key,
              message: error.message
            });
          }
        }
      }
    }
    
    const stats = this.getStats();
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      stats
    };
  }

  validateKey(key: string): ValidationError[] {
    const errors: ValidationError[] = [];
    const hiValue = this.getHindiValue(key);
    
    for (const rule of this.rules) {
      const error = rule.validate(key, hiValue || '', 'hi');
      if (error && error.severity === 'error') {
        errors.push(error);
      }
    }
    
    return errors;
  }

  private getHindiValue(key: string): string | null {
    const keys = key.split('.');
    let value: any = messages.hi;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || null;
  }

  private getAllKeys(obj: any, prefix = ''): string[] {
    const keys: string[] = [];
    
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys.push(...this.getAllKeys(obj[key], prefix ? `${prefix}.${key}` : key));
      } else {
        keys.push(prefix ? `${prefix}.${key}` : key);
      }
    }
    
    return keys;
  }

  private getStats(): TranslationStats {
    const stats = getTranslationStats();
    const validation = validateTranslations();
    
    return {
      totalKeys: stats.en,
      translatedKeys: stats.hi,
      completion: stats.completion,
      missingKeys: validation.missing
    };
  }

  getRules(): ContentValidationRule[] {
    return this.rules;
  }

  addRule(rule: ContentValidationRule): void {
    this.rules.push(rule);
  }

  removeRule(ruleName: string): void {
    this.rules = this.rules.filter(rule => rule.name !== ruleName);
  }
}

// Export singleton instance
export const hindiValidator = new HindiContentValidator();

// Export convenience functions
export function validateHindiContent(): ValidationResult {
  return hindiValidator.validateAll();
}

export function validateHindiKey(key: string): ValidationError[] {
  return hindiValidator.validateKey(key);
}

export function getValidationRules(): ContentValidationRule[] {
  return hindiValidator.getRules();
}

export function addValidationRule(rule: ContentValidationRule): void {
  hindiValidator.addRule(rule);
}

// Auto-validation utility
export function autoValidateOnBuild(): void {
  if (process.env.NODE_ENV === 'development') {
    const result = validateHindiContent();
    
    if (!result.isValid) {
      console.error('🚨 Hindi Translation Validation Failed:');
      result.errors.forEach(error => {
        console.error(`  ❌ ${error.key}: ${error.message}`);
      });
    }
    
    if (result.warnings.length > 0) {
      console.warn('⚠️ Hindi Translation Warnings:');
      result.warnings.forEach(warning => {
        console.warn(`  ⚠️ ${warning.key}: ${warning.message}`);
      });
    }
    
    console.log(`📊 Translation Stats: ${result.stats.completion.toFixed(1)}% complete (${result.stats.translatedKeys}/${result.stats.totalKeys})`);
  }
}

// Content quality scoring
export function calculateTranslationQuality(): number {
  const result = validateHindiContent();
  let score = 100;
  
  // Deduct points for errors
  score -= result.errors.length * 10;
  
  // Deduct points for warnings
  score -= result.warnings.length * 2;
  
  // Add points for high completion rate
  score += (result.stats.completion / 100) * 10;
  
  return Math.max(0, Math.min(100, score));
}

// Export validation report generator
export function generateValidationReport(): string {
  const result = validateHindiContent();
  const quality = calculateTranslationQuality();
  
  let report = `# Hindi Translation Validation Report\n\n`;
  report += `**Generated:** ${new Date().toISOString()}\n`;
  report += `**Quality Score:** ${quality.toFixed(1)}/100\n`;
  report += `**Completion:** ${result.stats.completion.toFixed(1)}%\n`;
  report += `**Status:** ${result.isValid ? '✅ PASSED' : '❌ FAILED'}\n\n`;
  
  if (result.errors.length > 0) {
    report += `## Errors (${result.errors.length})\n\n`;
    result.errors.forEach(error => {
      report += `- **${error.key}:** ${error.message}\n`;
    });
    report += `\n`;
  }
  
  if (result.warnings.length > 0) {
    report += `## Warnings (${result.warnings.length})\n\n`;
    result.warnings.forEach(warning => {
      report += `- **${warning.key}:** ${warning.message}\n`;
    });
    report += `\n`;
  }
  
  if (result.stats.missingKeys.length > 0) {
    report += `## Missing Translations (${result.stats.missingKeys.length})\n\n`;
    result.stats.missingKeys.forEach(key => {
      report += `- ${key}\n`;
    });
  }
  
  return report;
}
