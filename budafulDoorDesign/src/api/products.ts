import axios from 'axios';
import type { Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type CreateProductInput = Omit<Product, 'sku'>;
export type UpdateProductInput = Partial<CreateProductInput>;

// Helper function to handle API errors
const handleApiError = (error: unknown) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { status: number; data: any; headers: any } };
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: axiosError.response.status,
        data: axiosError.response.data,
        headers: axiosError.response.headers,
      });
    }
  }
  throw error;
};

// API methods
export const productsApi = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      console.log('Fetching from URL:', `${API_URL}/api/products`); // Debug log
      const response = await axios.get<Product[]>(`${API_URL}/api/products`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get product by SKU
  getProductBySku: async (sku: string): Promise<Product> => {
    try {
      const response = await axios.get<Product>(`${API_URL}/api/products/${sku}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/api/products/category/${category}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create new product
  create: async (product: CreateProductInput): Promise<Product> => {
    try {
      const response = await axios.post<Product>(`${API_URL}/api/products`, product);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update product
  update: async (sku: string, product: UpdateProductInput): Promise<Product> => {
    try {
      const response = await axios.put<Product>(`${API_URL}/api/products/${sku}`, product);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update product quantity
  updateQuantity: async (sku: string, quantity: number): Promise<Product> => {
    try {
      const response = await axios.patch<Product>(`${API_URL}/api/products/${sku}/quantity`, { quantity });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Delete product
  delete: async (sku: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/api/products/${sku}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default productsApi;
