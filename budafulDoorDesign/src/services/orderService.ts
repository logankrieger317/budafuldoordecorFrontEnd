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
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  orderItems: CartItem[];
  total: string;
  notes: string;
  status: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const orderService = {
  async createOrder({ customerInfo, items, total, orderNumber }: CreateOrderParams): Promise<ApiResponse<OrderResponse>> {
    try {
      console.log('Creating order with data:', { customerInfo, items, total, orderNumber });
      const response = await axios.post<ApiResponse<OrderResponse>>(`${API_URL}/api/orders`, {
        customerInfo,
        items,
        total,
        orderNumber,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
};

export default orderService;
