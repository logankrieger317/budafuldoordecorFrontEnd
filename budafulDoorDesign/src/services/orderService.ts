import axios from 'axios';
import type { CartItem, CustomerInfo } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface CreateOrderParams {
  customerInfo: CustomerInfo;
  items: CartItem[];
  total: number;
  orderNumber?: string;
}

interface OrderResponse {
  id: string;
  orderNumber: string;
  status: string;
}

export const orderService = {
  async createOrder({ customerInfo, items, total, orderNumber }: CreateOrderParams): Promise<OrderResponse> {
    try {
      console.log('Creating order with data:', { customerInfo, items, total, orderNumber });
      const response = await axios.post(`${API_URL}/api/orders`, {
        customerInfo,
        items,
        total,
        orderNumber,
      });
      
      return response.data.order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getOrder(orderId: string): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  async getOrderByNumber(orderNumber: string): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/api/orders/number/${orderNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },
};

export default orderService;
