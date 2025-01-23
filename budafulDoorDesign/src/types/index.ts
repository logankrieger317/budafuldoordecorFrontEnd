export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CustomOptions {
  width?: string;
  length?: string;
  size?: string;
}

export interface CartItem extends Omit<Product, 'description'> {
  quantity: number;
  customOptions?: CustomOptions;
}
