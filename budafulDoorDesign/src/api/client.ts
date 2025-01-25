import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Create axios instance with default config
const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
client.interceptors.request.use(
  (config) => {
    // You can modify the request config here
    // For example, add auth token
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status: number; data: any } };
      if (axiosError.response) {
        // Handle specific error cases
        switch (axiosError.response.status) {
          case 401:
            // Handle unauthorized
            console.error('Unauthorized access');
            break;
          case 403:
            // Handle forbidden
            console.error('Forbidden access');
            break;
          case 404:
            // Handle not found
            console.error('Resource not found');
            break;
          default:
            // Handle other errors
            console.error('API error:', axiosError.response.data);
        }
      }
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response = await client.get<T>(url, { params });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await client.post<T>(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await client.put<T>(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await client.delete<T>(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },
};

export default api;
