export interface Product {
  sku: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: string;
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

export interface CartItem {
  sku: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  width: number;
  length: number;
  isWired: boolean;
  customOptions?: CustomOptions;
}
