import React, { useState, useEffect, useCallback } from 'react';

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items
  strategy?: 'lru' | 'fifo' | 'lfu' | 'ttl';
  persistToStorage?: boolean;
  storageKey?: string;
  compressionEnabled?: boolean;
}

export interface CacheItem<T> {
  key: string;
  value: T;
  timestamp: number;
  ttl?: number;
  accessCount: number;
  lastAccessed: number;
  size: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  maxSize: number;
  hitRate: number;
  memoryUsage: number;
  oldestItem?: number;
  newestItem?: number;
}

class CacheManager {
  private static instance: CacheManager;
  private caches: Map<string, Map<string, CacheItem<any>>> = new Map();
  private stats: Map<string, CacheStats> = new Map();
  private compressionEnabled: boolean = false;
  private storageAvailable: boolean = false;

  private constructor() {
    this.checkStorageAvailability();
    this.setupCompression();
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private checkStorageAvailability(): void {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        const testKey = '__cache_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        this.storageAvailable = true;
      }
    } catch (error) {
      this.storageAvailable = false;
    }
  }

  private setupCompression(): void {
    // Check if compression is supported
    this.compressionEnabled = typeof window !== 'undefined' && 'CompressionStream' in window;
  }

  private compress(data: string): Promise<string> {
    if (!this.compressionEnabled) {
      return Promise.resolve(data);
    }

    const stream = new CompressionStream('gzip');
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();

    writer.write(new TextEncoder().encode(data));
    writer.close();

    return new Promise((resolve) => {
      const chunks: Uint8Array[] = [];
      
      function pump(): void {
        reader.read().then(({ done, value }) => {
          if (done) {
            const compressedArray = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
            let offset = 0;
            chunks.forEach(chunk => {
              compressedArray.set(chunk, offset);
              offset += chunk.length;
            });
            resolve(btoa(String.fromCharCode.apply(null, Array.from(compressedArray))));
            return;
          }
          chunks.push(value);
          pump();
        });
      }
      
      pump();
    });
  }

  private decompress(compressedData: string): Promise<string> {
    if (!this.compressionEnabled) {
      return Promise.resolve(compressedData);
    }

    try {
      const compressed = Uint8Array.from(atob(compressedData), c => c.charCodeAt(0));
      const stream = new DecompressionStream('gzip');
      const writer = stream.writable.getWriter();
      const reader = stream.readable.getReader();

      writer.write(compressed);
      writer.close();

      return new Promise((resolve) => {
        const chunks: Uint8Array[] = [];
        
        function pump(): void {
          reader.read().then(({ done, value }) => {
            if (done) {
              const decompressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
              let offset = 0;
              chunks.forEach(chunk => {
                decompressed.set(chunk, offset);
                offset += chunk.length;
              });
              resolve(new TextDecoder().decode(decompressed));
              return;
            }
            chunks.push(value);
            pump();
          });
        }
        
        pump();
      });
    } catch (error) {
      return Promise.resolve(compressedData);
    }
  }

  createCache<T>(name: string, options: CacheOptions = {}): void {
    const {
      ttl = 300000, // 5 minutes default
      maxSize = 100,
      strategy = 'lru',
      persistToStorage = false,
      storageKey = `cache_${name}`,
      compressionEnabled = this.compressionEnabled
    } = options;

    if (!this.caches.has(name)) {
      this.caches.set(name, new Map());
      this.stats.set(name, {
        hits: 0,
        misses: 0,
        size: 0,
        maxSize,
        hitRate: 0,
        memoryUsage: 0
      });

      // Load from storage if persistence is enabled
      if (persistToStorage && this.storageAvailable) {
        this.loadFromStorage<T>(storageKey, name);
      }
    }
  }

  private async loadFromStorage<T>(storageKey: string, cacheName: string): Promise<void> {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const decompressed = await this.decompress(stored);
        const data = JSON.parse(decompressed);
        const cache = this.caches.get(cacheName);
        
        if (cache && data.items) {
          data.items.forEach((item: CacheItem<T>) => {
            // Check if item is still valid
            if (!item.ttl || (Date.now() - item.timestamp) < item.ttl) {
              cache.set(item.key, item);
            }
          });
        }
      }
    } catch (error) {
      console.warn('Failed to load cache from storage:', error);
    }
  }

  private async saveToStorage<T>(storageKey: string, cacheName: string): Promise<void> {
    try {
      const cache = this.caches.get(cacheName);
      if (!cache) return;

      const items = Array.from(cache.values());
      const data = {
        items,
        timestamp: Date.now()
      };

      const serialized = JSON.stringify(data);
      const compressed = await this.compress(serialized);
      localStorage.setItem(storageKey, compressed);
    } catch (error) {
      console.warn('Failed to save cache to storage:', error);
    }
  }

  set<T>(cacheName: string, key: string, value: T, options: CacheOptions = {}): void {
    const cache = this.caches.get(cacheName);
    const stats = this.stats.get(cacheName);
    
    if (!cache || !stats) {
      this.createCache(cacheName, options);
      return this.set(cacheName, key, value, options);
    }

    const now = Date.now();
    const ttl = options.ttl || 300000;
    const size = this.calculateSize(value);

    const item: CacheItem<T> = {
      key,
      value,
      timestamp: now,
      ttl,
      accessCount: 0,
      lastAccessed: now,
      size
    };

    // Check if we need to evict items
    if (cache.size >= stats.maxSize) {
      this.evictItem(cacheName, stats);
    }

    cache.set(key, item);
    stats.size = cache.size;
    stats.memoryUsage += size;
    stats.oldestItem = Math.min(...Array.from(cache.values()).map(item => item.timestamp));
    stats.newestItem = Math.max(...Array.from(cache.values()).map(item => item.timestamp));

    // Update stats
    this.updateStats(cacheName);
  }

  get<T>(cacheName: string, key: string): T | null {
    const cache = this.caches.get(cacheName);
    const stats = this.stats.get(cacheName);
    
    if (!cache || !stats) {
      return null;
    }

    const item = cache.get(key);
    
    if (!item) {
      stats.misses++;
      this.updateStats(cacheName);
      return null;
    }

    // Check if item has expired
    if (item.ttl && (Date.now() - item.timestamp) > item.ttl) {
      cache.delete(key);
      stats.size = cache.size;
      stats.misses++;
      this.updateStats(cacheName);
      return null;
    }

    // Update access information
    item.accessCount++;
    item.lastAccessed = Date.now();
    
    stats.hits++;
    this.updateStats(cacheName);
    
    return item.value;
  }

  has(cacheName: string, key: string): boolean {
    return this.get(cacheName, key) !== null;
  }

  delete(cacheName: string, key: string): boolean {
    const cache = this.caches.get(cacheName);
    const stats = this.stats.get(cacheName);
    
    if (!cache || !stats) {
      return false;
    }

    const item = cache.get(key);
    if (item) {
      stats.memoryUsage -= item.size;
      stats.size = cache.size - 1;
      cache.delete(key);
      this.updateStats(cacheName);
      return true;
    }
    
    return false;
  }

  clear(cacheName: string): void {
    const cache = this.caches.get(cacheName);
    const stats = this.stats.get(cacheName);
    
    if (cache && stats) {
      cache.clear();
      stats.size = 0;
      stats.memoryUsage = 0;
      stats.hits = 0;
      stats.misses = 0;
      stats.hitRate = 0;
      this.updateStats(cacheName);
    }
  }

  clearAll(): void {
    this.caches.forEach((_, cacheName) => {
      this.clear(cacheName);
    });
  }

  private evictItem(cacheName: string, stats: CacheStats): void {
    const cache = this.caches.get(cacheName);
    if (!cache) return;

    let keyToEvict: string | null = null;
    let oldestAccess = Date.now();

    // Find the least recently used item
    for (const [key, item] of Array.from(cache.entries())) {
      if (item.lastAccessed < oldestAccess) {
        oldestAccess = item.lastAccessed;
        keyToEvict = key;
      }
    }

    if (keyToEvict) {
      const item = cache.get(keyToEvict);
      if (item) {
        stats.memoryUsage -= item.size;
        cache.delete(keyToEvict);
      }
    }
  }

  private updateStats(cacheName: string): void {
    const stats = this.stats.get(cacheName);
    if (!stats) return;

    const totalRequests = stats.hits + stats.misses;
    stats.hitRate = totalRequests > 0 ? (stats.hits / totalRequests) * 100 : 0;
  }

  private calculateSize(value: any): number {
    try {
      return JSON.stringify(value).length * 2; // Rough estimation
    } catch (error) {
      return 1000; // Default size for complex objects
    }
  }

  getStats(cacheName?: string): CacheStats | Map<string, CacheStats> {
    if (cacheName) {
      return this.stats.get(cacheName) || {
        hits: 0,
        misses: 0,
        size: 0,
        maxSize: 0,
        hitRate: 0,
        memoryUsage: 0
      };
    }
    return new Map(this.stats);
  }

  getCacheSize(cacheName: string): number {
    const cache = this.caches.get(cacheName);
    return cache ? cache.size : 0;
  }

  getMemoryUsage(cacheName?: string): number {
    if (cacheName) {
      const stats = this.stats.get(cacheName);
      return stats ? stats.memoryUsage : 0;
    }
    
    let total = 0;
    this.stats.forEach(stats => {
      total += stats.memoryUsage;
    });
    return total;
  }

  cleanup(): void {
    const now = Date.now();
    
    this.caches.forEach((cache, cacheName) => {
      const stats = this.stats.get(cacheName);
      if (!stats) return;

      const keysToDelete: string[] = [];
      
      cache.forEach((item, key) => {
        if (item.ttl && (now - item.timestamp) > item.ttl) {
          keysToDelete.push(key);
        }
      });

      keysToDelete.forEach(key => {
        const item = cache.get(key);
        if (item) {
          stats.memoryUsage -= item.size;
          cache.delete(key);
        }
      });

      stats.size = cache.size;
      this.updateStats(cacheName);
    });
  }

  // Utility methods for common caching patterns
  memoize<T extends (...args: any[]) => any>(
    fn: T,
    cacheName: string = 'memoize',
    ttl: number = 300000
  ): T {
    return ((...args: any[]) => {
      const key = JSON.stringify(args);
      const cached = this.get(cacheName, key);
      
      if (cached !== null) {
        return cached;
      }

      const result = fn(...args);
      this.set(cacheName, key, result, { ttl });
      return result;
    }) as T;
  }

  async cacheAsync<T>(
    key: string,
    asyncFn: () => Promise<T>,
    cacheName: string = 'async',
    ttl: number = 300000
  ): Promise<T> {
    const cached = this.get<T>(cacheName, key);
    
    if (cached !== null) {
      return cached;
    }

    const result = await asyncFn();
    this.set(cacheName, key, result, { ttl });
    return result;
  }

  // React hook for caching
  useCache<T>(cacheName: string, key: string, fetcher?: () => Promise<T>, ttl: number = 300000): {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
  } {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      const cached = this.get<T>(cacheName, key);
      if (cached !== null) {
        setData(cached);
        return;
      }

      if (fetcher) {
        setLoading(true);
        fetcher()
          .then(result => {
            setData(result);
            this.set(cacheName, key, result, { ttl });
            setError(null);
          })
          .catch(err => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [cacheName, key, fetcher, ttl]);

    const refetch = useCallback(() => {
      if (fetcher) {
        setLoading(true);
        fetcher()
          .then(result => {
            setData(result);
            this.set(cacheName, key, result, { ttl });
            setError(null);
          })
          .catch(err => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [cacheName, key, fetcher, ttl]);

    return { data, loading, error, refetch };
  }
}

// React hook
export function useCache<T>(cacheName: string, key: string, fetcher?: () => Promise<T>, ttl: number = 300000): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const manager = CacheManager.getInstance();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = manager.get<T>(cacheName, key);
    if (cached !== null) {
      setData(cached);
      return;
    }

    if (fetcher) {
      setLoading(true);
      fetcher()
        .then(result => {
          setData(result);
          manager.set(cacheName, key, result, { ttl });
          setError(null);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [cacheName, key, fetcher, ttl]);

  const refetch = useCallback(() => {
    if (fetcher) {
      setLoading(true);
      fetcher()
        .then(result => {
          setData(result);
          manager.set(cacheName, key, result, { ttl });
          setError(null);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [cacheName, key, fetcher, ttl]);

  return { data, loading, error, refetch };
}

// Export singleton
export const cacheManager = CacheManager.getInstance();
export default CacheManager;
