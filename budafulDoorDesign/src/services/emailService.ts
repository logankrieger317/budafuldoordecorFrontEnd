import axios from 'axios';
import { CartItem, CustomerInfo } from '../types';

interface OrderEmailParams {
  customerInfo: CustomerInfo;
  items: CartItem[];
  total: number;
  orderDate: string;
}

class EmailService {
  private API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  async sendOrderConfirmation(params: OrderEmailParams): Promise<boolean> {
    try {
      console.log('Attempting to send order confirmation to:', this.API_URL);
      
      const orderData = {
        customerEmail: params.customerInfo.email,
        customerName: `${params.customerInfo.firstName} ${params.customerInfo.lastName}`,
        items: params.items,
        totalAmount: params.total,
        shippingAddress: {
          street: params.customerInfo.address || '',
          city: '',
          state: '',
          zipCode: ''
        }
      };

      const response = await axios.post(`${this.API_URL}/api/email/order-confirmation`, orderData);
      console.log('Email sent successfully:', response.data);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  async sendOrderNotification(params: OrderEmailParams): Promise<boolean> {
    try {
      console.log('Attempting to send order notification to:', this.API_URL);
      
      const orderData = {
        customerEmail: params.customerInfo.email,
        customerName: `${params.customerInfo.firstName} ${params.customerInfo.lastName}`,
        items: params.items,
        totalAmount: params.total,
        shippingAddress: {
          street: params.customerInfo.address || '',
          city: '',
          state: '',
          zipCode: ''
        }
      };

      const response = await axios.post(`${this.API_URL}/api/email/order-notification`, orderData);
      console.log('Email sent successfully:', response.data);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}

export default new EmailService();
