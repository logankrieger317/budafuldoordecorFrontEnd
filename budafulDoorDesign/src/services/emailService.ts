import axios from 'axios';
import { CartItem, CustomerInfo } from '../types';

interface OrderEmailParams {
  customerInfo: CustomerInfo;
  items: CartItem[];
  total: number;
  orderDate: string;
}

class EmailService {
  private API_URL = import.meta.env.VITE_API_URL || 'https://budafuldoordecor-production.up.railway.app';

  private formatOrderData(params: OrderEmailParams) {
    const { street = '', city = '', state = '', zipCode = '' } = params.customerInfo.address || {};
    
    console.log('Formatting order data with customer info:', {
      name: `${params.customerInfo.firstName} ${params.customerInfo.lastName}`,
      email: params.customerInfo.email,
      phone: params.customerInfo.phone,
      notes: params.customerInfo.notes,
      address: params.customerInfo.address
    });
    
    const formattedData = {
      customerEmail: params.customerInfo.email,
      customerName: `${params.customerInfo.firstName} ${params.customerInfo.lastName}`,
      customerPhone: params.customerInfo.phone || '',
      customerNotes: params.customerInfo.notes || '',
      items: params.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      totalAmount: params.total,
      shippingAddress: {
        street,
        city,
        state,
        zipCode
      }
    };

    console.log('Formatted order data:', JSON.stringify(formattedData, null, 2));
    return formattedData;
  }

  async sendOrderConfirmation(params: OrderEmailParams): Promise<boolean> {
    try {
      console.log('Sending order confirmation email...');
      const orderData = this.formatOrderData(params);
      console.log('Formatted order data:', orderData);

      const response = await axios.post(`${this.API_URL}/api/email/order-confirmation`, orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        console.log('Order confirmation email sent successfully');
        return true;
      } else {
        console.error('Failed to send order confirmation email:', response.statusText);
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to send order confirmation email:', error.response?.data || error.message);
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
      } else {
        console.error('Unexpected error sending order confirmation email:', error);
      }
      return false;
    }
  }

  async sendOrderNotification(params: OrderEmailParams): Promise<boolean> {
    try {
      console.log('Sending order notification email...');
      const orderData = this.formatOrderData(params);
      console.log('Formatted order data:', orderData);

      const response = await axios.post(`${this.API_URL}/api/email/order-notification`, orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        console.log('Order notification email sent successfully');
        return true;
      } else {
        console.error('Failed to send order notification email:', response.statusText);
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to send order notification email:', error.response?.data || error.message);
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
      } else {
        console.error('Unexpected error sending order notification email:', error);
      }
      return false;
    }
  }
}

export default new EmailService();
