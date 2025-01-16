export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'seasonal' | 'florals' | 'greenery' | 'ribbons' | 'containers' | 'custom';
}

export interface CartItem extends Omit<Product, 'description'> {
  quantity: number;
}
