import React, { useCallback } from 'react';

export interface LogEntry {
  id: string;
  timestamp: number;
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  url?: string;
  ip?: string;
  tags?: string[];
  stack?: string;
  component?: string;
  action?: string;
  duration?: number;
  metadata?: Record<string, any>;
}

export interface LoggerConfig {
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  enableConsole: boolean;
  enableRemote: boolean;
  remoteEndpoint?: string;
  enableFileLogging: boolean;
  maxFileSize: number;
  maxFiles: number;
  enableStructuredLogging: boolean;
  enablePerformanceLogging: boolean;
  enableErrorTracking: boolean;
  enableUserTracking: boolean;
  enableSessionTracking: boolean;
  enableRequestTracking: boolean;
  samplingRate: number;
  bufferSize: number;
  flushInterval: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface LogFilter {
  level?: string;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  component?: string;
  action?: string;
  startDate?: number;
  endDate?: number;
  tags?: string[];
  message?: string;
}

export interface LogStats {
  totalLogs: number;
  logsByLevel: Record<string, number>;
  logsByComponent: Record<string, number>;
  logsByAction: Record<string, number>;
  errorRate: number;
  averageResponseTime: number;
  topErrors: Array<{
    message: string;
    count: number;
    lastOccurrence: number;
  }>;
  recentActivity: LogEntry[];
}

class Logger {
  private static instance: Logger;
  private config: LoggerConfig;
  private buffer: LogEntry[] = [];
  private isClient: boolean;
  private sessionId: string;
  private userId?: string;
  private requestId?: string;
  private flushTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.isClient = typeof window !== 'undefined';
    this.config = this.getDefaultConfig();
    this.sessionId = this.generateSessionId();
    this.startFlushTimer();
    this.setupErrorHandlers();
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private getDefaultConfig(): LoggerConfig {
    return {
      level: 'info',
      enableConsole: true,
      enableRemote: true,
      remoteEndpoint: '/api/logs',
      enableFileLogging: false,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      enableStructuredLogging: true,
      enablePerformanceLogging: true,
      enableErrorTracking: true,
      enableUserTracking: true,
      enableSessionTracking: true,
      enableRequestTracking: true,
      samplingRate: 1.0,
      bufferSize: 1000,
      flushInterval: 5000, // 5 seconds
      retryAttempts: 3,
      retryDelay: 1000
    };
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private generateLogId(): string {
    return 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private startFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }

    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  private setupErrorHandlers(): void {
    if (this.isClient && this.config.enableErrorTracking) {
      // Global error handler
      window.onerror = (message, source, lineno, colno, error) => {
        this.error('Global error', {
          message: String(message),
          source,
          lineno,
          colno,
          stack: error?.stack
        });
      };

      // Unhandled promise rejection handler
      window.onunhandledrejection = (event) => {
        this.error('Unhandled promise rejection', {
          reason: event.reason,
          stack: event.reason?.stack
        });
      };
    }
  }

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error', 'fatal'];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const logLevelIndex = levels.indexOf(level);
    return logLevelIndex >= currentLevelIndex;
  }

  private shouldSample(): boolean {
    return Math.random() < this.config.samplingRate;
  }

  // Public method for console logging from useLogger
  public logEntryToConsole(entry: LogEntry): void {
    this.logToConsole(entry);
  }

  // Public method to access console logging
  public addToBuffer(entry: LogEntry): void {
    this.buffer.push(entry);
  }

  // Public method to create log entries
  public createPublicLogEntry(
    level: LogEntry['level'],
    message: string,
    context?: Record<string, any>
  ): LogEntry {
    return this.createLogEntry(level, message, context);
  }

  private createLogEntry(
    level: LogEntry['level'],
    message: string,
    context?: Record<string, any>
  ): LogEntry {
    const entry: LogEntry = {
      id: this.generateLogId(),
      timestamp: Date.now(),
      level,
      message,
      context,
      userId: this.userId,
      sessionId: this.sessionId,
      requestId: this.requestId,
      userAgent: navigator.userAgent
    };

    // Add user context
    if (this.isClient) {
      entry.userAgent = navigator.userAgent;
      entry.url = window.location.href;
      entry.ip = this.getClientIP();
    }

    if (this.config.enablePerformanceLogging && performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        entry.metadata = {
          ...entry.metadata,
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
        };
      }
    }

    return entry;
  }

  private getClientIP(): string {
    // In a real implementation, this would come from headers or a service
    return 'unknown';
  }

  private log(level: LogEntry['level'], message: string, context?: Record<string, any>): void {
    if (!this.shouldLog(level) || !this.shouldSample()) {
      return;
    }

    const entry = this.createLogEntry(level, message, context);

    // Console logging
    //if (this.config.enableConsole) {
      //this.logToConsole(entry);
    //}

    // Add to buffer
    this.buffer.push(entry);

    // Flush buffer if it's full
    if (this.buffer.length >= this.config.bufferSize) {
      this.flush();
    }

    // Immediate flush for errors
    if (level === 'error' || level === 'fatal') {
      this.flush();
    }
  }

  private logToConsole(entry: LogEntry): void {
    const logMethod = {
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
      fatal: console.error
    }[entry.level];

    if (this.config.enableStructuredLogging) {
      logMethod(JSON.stringify({
        timestamp: new Date(entry.timestamp).toISOString(),
        level: entry.level,
        message: entry.message,
        context: entry.context,
        userId: entry.userId,
        sessionId: entry.sessionId,
        component: entry.component,
        action: entry.action
      }));
    } else {
      logMethod(`[${entry.level.toUpperCase()}] ${entry.message}`, entry.context);
    }
  }

  private async flush(): Promise<void> {
    if (this.buffer.length === 0 || !this.config.enableRemote) {
      return;
    }

    const logsToSend = [...this.buffer];
    this.buffer = [];

    try {
      await this.sendLogs(logsToSend);
    } catch (error) {
      // Retry logic
      for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
        try {
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay * attempt));
          await this.sendLogs(logsToSend);
          break;
        } catch (retryError) {
          if (attempt === this.config.retryAttempts) {
            // Final retry failed, add logs back to buffer
            this.buffer.unshift(...logsToSend);
            console.error('Failed to send logs after all retry attempts:', retryError);
          }
        }
      }
    }
  }

  private async sendLogs(logs: LogEntry[]): Promise<void> {
    if (!this.config.remoteEndpoint) {
      return;
    }

    const response = await fetch(this.config.remoteEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        logs,
        timestamp: Date.now(),
        userAgent: this.isClient ? navigator.userAgent : 'server',
        sessionId: this.sessionId
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to send logs: ${response.status} ${response.statusText}`);
    }
  }

  // Public logging methods
  debug(message: string, context?: Record<string, any>): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, any>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, any>): void {
    this.log('error', message, context);
  }

  fatal(message: string, context?: Record<string, any>): void {
    this.log('fatal', message, context);
  }

  // Specialized logging methods
  userAction(action: string, context?: Record<string, any>): void {
    this.info(`User action: ${action}`, {
      ...context,
      component: 'user',
      action
    });
  }

  apiCall(endpoint: string, method: string, duration: number, context?: Record<string, any>): void {
    this.info(`API call: ${method} ${endpoint}`, {
      ...context,
      component: 'api',
      action: 'request',
      duration,
      endpoint,
      method
    });
  }

  performance(metric: string, value: number, context?: Record<string, any>): void {
    this.info(`Performance metric: ${metric} = ${value}ms`, {
      ...context,
      component: 'performance',
      action: 'metric',
      metric,
      value
    });
  }

  security(event: string, context?: Record<string, any>): void {
    this.warn(`Security event: ${event}`, {
      ...context,
      component: 'security',
      action: event
    });
  }

  business(event: string, context?: Record<string, any>): void {
    this.info(`Business event: ${event}`, {
      ...context,
      component: 'business',
      action: event
    });
  }

  // Configuration methods
  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.startFlushTimer();
  }

  getConfig(): LoggerConfig {
    return { ...this.config };
  }

  // Context methods
  setUserId(userId: string): void {
    this.userId = userId;
  }

  setRequestId(requestId: string): void {
    this.requestId = requestId;
  }

  clearContext(): void {
    this.userId = undefined;
    this.requestId = undefined;
  }

  // Query methods
  getLogs(filter?: LogFilter): LogEntry[] {
    // In a real implementation, this would query a log database
    // For now, return buffered logs
    let filtered = [...this.buffer];

    if (filter) {
      if (filter.level) {
        filtered = filtered.filter(log => log.level === filter.level);
      }
      if (filter.userId) {
        filtered = filtered.filter(log => log.userId === filter.userId);
      }
      if (filter.sessionId) {
        filtered = filtered.filter(log => log.sessionId === filter.sessionId);
      }
      if (filter.requestId) {
        filtered = filtered.filter(log => log.requestId === filter.requestId);
      }
      if (filter.component) {
        filtered = filtered.filter(log => log.component === filter.component);
      }
      if (filter.action) {
        filtered = filtered.filter(log => log.action === filter.action);
      }
      if (filter.startDate) {
        filtered = filtered.filter(log => log.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        filtered = filtered.filter(log => log.timestamp <= filter.endDate!);
      }
      if (filter.tags) {
        filtered = filtered.filter(log => 
          log.tags && filter.tags!.some(tag => log.tags!.includes(tag))
        );
      }
      if (filter.message) {
        filtered = filtered.filter(log => 
          log.message.toLowerCase().includes(filter.message!.toLowerCase())
        );
      }
    }

    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  getStats(): LogStats {
    const logs = this.getLogs();
    const totalLogs = logs.length;
    
    const logsByLevel: Record<string, number> = {};
    const logsByComponent: Record<string, number> = {};
    const logsByAction: Record<string, number> = {};
    const errorMessages: Record<string, { count: number; lastOccurrence: number }> = {};

    logs.forEach(log => {
      // Count by level
      logsByLevel[log.level] = (logsByLevel[log.level] || 0) + 1;
      
      // Count by component
      if (log.component) {
        logsByComponent[log.component] = (logsByComponent[log.component] || 0) + 1;
      }
      
      // Count by action
      if (log.action) {
        logsByAction[log.action] = (logsByAction[log.action] || 0) + 1;
      }
      
      // Track errors
      if (log.level === 'error' || log.level === 'fatal') {
        if (!errorMessages[log.message]) {
          errorMessages[log.message] = { count: 0, lastOccurrence: 0 };
        }
        errorMessages[log.message].count++;
        errorMessages[log.message].lastOccurrence = Math.max(
          errorMessages[log.message].lastOccurrence,
          log.timestamp
        );
      }
    });

    const errorCount = (logsByLevel.error || 0) + (logsByLevel.fatal || 0);
    const errorRate = totalLogs > 0 ? (errorCount / totalLogs) * 100 : 0;

    const topErrors = Object.entries(errorMessages)
      .map(([message, data]) => ({ message, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const recentActivity = logs.slice(0, 50);

    // Calculate average response time
    const performanceLogs = logs.filter(log => 
      log.component === 'performance' && log.metadata?.value
    );
    const averageResponseTime = performanceLogs.length > 0
      ? performanceLogs.reduce((sum, log) => sum + (log.metadata?.value || 0), 0) / performanceLogs.length
      : 0;

    return {
      totalLogs,
      logsByLevel,
      logsByComponent,
      logsByAction,
      errorRate,
      averageResponseTime,
      topErrors,
      recentActivity
    };
  }

  // Cleanup methods
  clearLogs(): void {
    this.buffer = [];
  }

  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    this.flush();
  }
}

// React hook for logging
export function useLogger(component?: string) {
  const logger = Logger.getInstance();

  const log = useCallback((level: LogEntry['level'], message: string, context?: Record<string, any>) => {
    const entry = logger.createPublicLogEntry(level, message, {
      ...context,
      component
    });
    
    // Add to buffer
    logger.addToBuffer(entry);
    
    // Console logging
    if (logger.getConfig().enableConsole) {
      logger.logEntryToConsole(entry);
    }
  }, [logger, component]);

  const debug = useCallback((message: string, context?: Record<string, any>) => {
    log('debug', message, context);
  }, [log]);

  const info = useCallback((message: string, context?: Record<string, any>) => {
    log('info', message, context);
  }, [log]);

  const warn = useCallback((message: string, context?: Record<string, any>) => {
    log('warn', message, context);
  }, [log]);

  const error = useCallback((message: string, context?: Record<string, any>) => {
    log('error', message, context);
  }, [log]);

  const fatal = useCallback((message: string, context?: Record<string, any>) => {
    log('fatal', message, context);
  }, [log]);

  return {
    debug,
    info,
    warn,
    error,
    fatal,
    userAction: (action: string, context?: Record<string, any>) => 
      info(`User action: ${action}`, { ...context, component, action }),
    performance: (metric: string, value: number, context?: Record<string, any>) => 
      info(`Performance: ${metric} = ${value}ms`, { ...context, component, metric, value })
  };
}

// Export singleton
export const logger = Logger.getInstance();
export default Logger;
