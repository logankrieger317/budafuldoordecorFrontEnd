export interface Product {
  sku: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: 'seasonal' | 'florals' | 'greenery' | 'ribbons' | 'containers' | 'custom';
  width: number;
  length: number;
  isWired: boolean;
  quantity: number;
}

export interface CustomOptions {
  width?: string;
  length?: string;
  isWired?: boolean;
}

export interface CartItem extends Omit<Product, 'description'> {
  id?: string;
  price: number;
  quantity: number;
  options?: Record<string, string>;
  customOptions?: CustomOptions;
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
