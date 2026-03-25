import { Locale } from './types';

export interface LayoutConfig {
  direction: 'ltr' | 'rtl';
  textAlign: 'left' | 'right';
  float: 'left' | 'right';
  margin: 'ml' | 'mr';
  padding: 'pl' | 'pr';
  border: string;
  borderRadius: string;
}

export interface ResponsiveLayoutConfig {
  sm: LayoutConfig;
  md: LayoutConfig;
  lg: LayoutConfig;
  xl: LayoutConfig;
}

class LayoutManager {
  private currentLocale: Locale = 'en';
  private layoutCache: Map<Locale, LayoutConfig> = new Map();

  constructor() {
    this.initializeLayoutConfigs();
  }

  private initializeLayoutConfigs(): void {
    // English layout (LTR)
    this.layoutCache.set('en', {
      direction: 'ltr',
      textAlign: 'left',
      float: 'left',
      margin: 'ml',
      padding: 'pl',
      border: 'border-l',
      borderRadius: 'rounded-l'
    });
    
    // Hindi layout (LTR currently, but ready for RTL if needed)
    this.layoutCache.set('hi', {
      direction: 'ltr',
      textAlign: 'left',
      float: 'left',
      margin: 'ml',
      padding: 'pl',
      border: 'border-l',
      borderRadius: 'rounded-l'
    });
  }

  setLocale(locale: Locale): void {
    this.currentLocale = locale;
  }

  getLocale(): Locale {
    return this.currentLocale;
  }

  getLayoutConfig(): LayoutConfig {
    return this.layoutCache.get(this.currentLocale) || this.layoutCache.get('en')!;
  }

  getResponsiveLayoutConfig(): ResponsiveLayoutConfig {
    const baseConfig = this.getLayoutConfig();
    return {
      sm: baseConfig,
      md: baseConfig,
      lg: baseConfig,
      xl: baseConfig
    };
  }

  // CSS utility functions
  getDirectionClasses(): string {
    const config = this.getLayoutConfig();
    return `direction-${config.direction}`;
  }

  getTextAlignClass(): string {
    const config = this.getLayoutConfig();
    return `text-${config.textAlign}`;
  }

  getFloatClass(): string {
    const config = this.getLayoutConfig();
    return `float-${config.float}`;
  }

  getMarginClass(size: string): string {
    const config = this.getLayoutConfig();
    return `${config.margin}-${size}`;
  }

  getPaddingClass(size: string): string {
    const config = this.getLayoutConfig();
    return `${config.padding}-${size}`;
  }

  getBorderClass(): string {
    const config = this.getLayoutConfig();
    return config.border;
  }

  getBorderRadiusClass(): string {
    const config = this.getLayoutConfig();
    return config.borderRadius;
  }

  // Responsive utilities
  getResponsiveMarginClass(size: string): string {
    const config = this.getLayoutConfig();
    return `${config.margin}-${size} md:${config.margin}-${size} lg:${config.margin}-${size} xl:${config.margin}-${size}`;
  }

  getResponsivePaddingClass(size: string): string {
    const config = this.getLayoutConfig();
    return `${config.padding}-${size} md:${config.padding}-${size} lg:${config.padding}-${size} xl:${config.padding}-${size}`;
  }

  // Component-specific utilities
  getCardClasses(): string {
    const config = this.getLayoutConfig();
    return `direction-${config.direction} ${this.getTextAlignClass()}`;
  }

  getNavigationClasses(): string {
    const config = this.getLayoutConfig();
    return `direction-${config.direction} flex ${this.getFlexClasses()} ${this.getFlexJustifyClass()}`;
  }

  getFlexClasses(): string {
    return isRTL(this.currentLocale) ? 'flex-row-reverse' : 'flex-row';
  }

  getFlexJustifyClass(): string {
    return isRTL(this.currentLocale) ? 'justify-end' : 'justify-start';
  }

  getFormClasses(): string {
    return `${this.getTextAlignClass()} ${this.getDirectionClasses()}`;
  }

  getTableClasses(): string {
    const config = this.getLayoutConfig();
    return `direction-${config.direction} text-${config.textAlign}`;
  }

  getButtonClasses(): string {
    return `${this.getTextAlignClass()} ${this.getDirectionClasses()}`;
  }

  getButtonGroupClasses(): string {
    return `flex ${this.getFlexClasses()} space-x-2`;
  }

  // JavaScript utilities for dynamic layout changes
  updateElementDirection(element: HTMLElement): void {
    const config = this.getLayoutConfig();
    element.style.direction = config.direction;
    element.style.textAlign = config.textAlign;
  }

  updateElementClasses(element: HTMLElement, classes: string[]): void {
    const config = this.getLayoutConfig();
    
    classes.forEach(className => {
      if (className.includes('text-')) {
        element.style.textAlign = config.textAlign;
      }
      if (className.includes('float-')) {
        element.style.float = config.float;
      }
      if (className.includes('ml-') || className.includes('mr-')) {
        element.style.marginLeft = config.float === 'left' ? '0' : 'auto';
        element.style.marginRight = config.float === 'left' ? 'auto' : '0';
      }
      if (className.includes('pl-') || className.includes('pr-')) {
        element.style.paddingLeft = config.float === 'left' ? '0' : 'auto';
        element.style.paddingRight = config.float === 'left' ? 'auto' : '0';
      }
    });
  }

  // Layout debugging utilities
  debugLayout(): void {
    const config = this.getLayoutConfig();
    console.log(`Layout Configuration for ${this.currentLocale}:`, config);
    console.log(`Document Direction: ${getDirection(this.currentLocale)}`);
    console.log(`Is RTL: ${isRTL(this.currentLocale)}`);
  }

  // Layout testing utilities
  runLayoutTests(): (string | false)[] {
    const tests = [
      {
        name: 'Direction Set',
        test: () => getDirection(this.currentLocale) === this.getLayoutConfig().direction,
        message: 'Document direction matches layout config'
      },
      {
        name: 'Text Alignment',
        test: () => this.getLayoutConfig().textAlign === (isRTL(this.currentLocale) ? 'right' : 'left'),
        message: 'Text alignment is appropriate for locale'
      },
      {
        name: 'Float Direction',
        test: () => this.getLayoutConfig().float === (isRTL(this.currentLocale) ? 'right' : 'left'),
        message: 'Float direction is appropriate for locale'
      },
      {
        name: 'Margin Direction',
        test: () => this.getLayoutConfig().margin === (isRTL(this.currentLocale) ? 'mr' : 'ml'),
        message: 'Margin direction is appropriate for locale'
      },
      {
        name: 'Padding Direction',
        test: () => this.getLayoutConfig().padding === (isRTL(this.currentLocale) ? 'pr' : 'pl'),
        message: 'Padding direction is appropriate for locale'
      }
    ];

    return tests.map(test => test.test() ? test.message : false);
  }
}

// Helper functions
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'hi' ? 'rtl' : 'ltr';
}

export function isRTL(locale: Locale): boolean {
  return getDirection(locale) === 'rtl';
}

// Create a singleton instance
const layoutManager = new LayoutManager();

// Export convenience functions
export function getLayoutConfig(): LayoutConfig {
  return layoutManager.getLayoutConfig();
}

export function getDirectionClasses(): string {
  return layoutManager.getDirectionClasses();
}

export function getTextAlignClass(): string {
  return layoutManager.getTextAlignClass();
}

export function getResponsiveLayoutClasses(): string {
  const config = layoutManager.getLayoutConfig();
  return `
    ${config.margin}-4 ${config.padding}-4
    md:${config.margin}-6 md:${config.padding}-6
    lg:${config.margin}-8 lg:${config.padding}-8
    xl:${config.margin}-12 xl:${config.padding}-12
  `;
}

// React hook for layout
export function useLayout(locale: Locale) {
  layoutManager.setLocale(locale);
  return layoutManager.getLayoutConfig();
}
