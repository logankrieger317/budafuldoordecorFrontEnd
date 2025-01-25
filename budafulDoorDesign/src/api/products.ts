import axios from 'axios';
import type { Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type CreateProductInput = Omit<Product, 'sku'>;
export type UpdateProductInput = Partial<CreateProductInput>;

// Helper function to handle API errors
const handleApiError = (error: unknown) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as any).response;
    if (response?.data?.message) {
      throw new Error(response.data.message);
    }
  }
  throw error;
};

// API methods
export const productsApi = {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      console.log('Fetching from URL:', `${API_URL}/api/products`);
      const response = await axios.get(`${API_URL}/api/products`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get product by SKU
  async getProductBySku(sku: string): Promise<Product> {
    try {
      const response = await axios.get(`${API_URL}/api/products/${sku}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_URL}/api/products/category/${category}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create new product
  async create(product: CreateProductInput): Promise<Product> {
    try {
      const response = await axios.post(`${API_URL}/api/products`, product);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update product
  async update(sku: string, product: UpdateProductInput): Promise<Product> {
    try {
      const response = await axios.put(`${API_URL}/api/products/${sku}`, product);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update product quantity
  async updateQuantity(sku: string, quantity: number): Promise<Product> {
    try {
      const response = await axios.patch(`${API_URL}/api/products/${sku}/quantity`, { quantity });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Delete product
  async delete(sku: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/api/products/${sku}`);
    } catch (error) {
      return handleApiError(error);
    }
  }
};

export default productsApi;
