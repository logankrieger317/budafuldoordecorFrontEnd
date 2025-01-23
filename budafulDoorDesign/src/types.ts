export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'seasonal' | 'florals' | 'greenery' | 'ribbons' | 'containers' | 'custom';
}

export interface CustomOptions {
  width?: string;
  length?: string;
}

export interface CartItem extends Omit<Product, 'description'> {
  quantity: number;
  options?: Record<string, string>;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  notes?: string;
}
