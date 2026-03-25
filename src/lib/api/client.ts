// API Client Configuration for Mahanagar Bank Website

import { config } from '@/lib/config';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  message?: string;
}

export interface APIRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

class APIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = config.strapiUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: APIRequestConfig = {}
  ): Promise<APIResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = config.cacheTimeout
    } = options;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        credentials: 'include'
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: {
          code: 'API_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      };
    }
  }

  // GET request
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers
    });
  }

  // POST request
  async post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body,
      headers
    });
  }

  // PUT request
  async put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body,
      headers
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers
    });
  }

  // Upload file
  async upload<T>(endpoint: string, file: File, headers?: Record<string, string>): Promise<APIResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      }
    });
  }

  // Set authentication token
  setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mnsbank-auth-token', token);
    }
  }

  // Get authentication token
  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mnsbank-auth-token');
    }
    return null;
  }

  // Clear authentication token
  clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mnsbank-auth-token');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

// Create singleton instance
export const apiClient = new APIClient();

// Export convenience functions
export const api = {
  // Products
  getProducts: (headers?: Record<string, string>) => 
    apiClient.get('/products', headers),
  getProduct: (slug: string, headers?: Record<string, string>) => 
    apiClient.get(`/products/${slug}`, headers),
  
  // Rates and Charges
  getRates: (headers?: Record<string, string>) => 
    apiClient.get('/rates', headers),
  getCharges: (headers?: Record<string, string>) => 
    apiClient.get('/charges', headers),
  
  // Compliance
  getDEAFRecords: (headers?: Record<string, string>) => 
    apiClient.get('/compliance/deaf', headers),
  getGrievanceOfficers: (headers?: Record<string, string>) => 
    apiClient.get('/compliance/grievance-officers', headers),
  getPolicies: (headers?: Record<string, string>) => 
    apiClient.get('/compliance/policies', headers),
  
  // Inquiries
  submitInquiry: (data: any, headers?: Record<string, string>) => 
    apiClient.post('/inquiries', data, headers),
  getInquiryStatus: (referenceNumber: string, headers?: Record<string, string>) => 
    apiClient.get(`/inquiries/${referenceNumber}`, headers),
  
  // News and Content
  getCarousel: (headers?: Record<string, string>) => 
    apiClient.get('/carousel', headers),
  getNews: (headers?: Record<string, string>) => 
    apiClient.get('/news', headers),
  
  // Branches and Locations
  getBranches: (headers?: Record<string, string>) => 
    apiClient.get('/branches', headers),
  getBranch: (id: string, headers?: Record<string, string>) => 
    apiClient.get(`/branches/${id}`, headers),
  
  // Forms
  submitForm: (formType: string, data: any, headers?: Record<string, string>) => 
    apiClient.post(`/forms/${formType}`, data, headers),
};

export default apiClient;
