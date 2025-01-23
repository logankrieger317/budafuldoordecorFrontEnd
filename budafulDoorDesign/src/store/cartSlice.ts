import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => 
          item.id === action.payload.id && 
          JSON.stringify(item.options) === JSON.stringify(action.payload.options)
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string; options?: Record<string, string> }>) => {
      state.items = state.items.filter(
        item => 
          item.id !== action.payload.id || 
          JSON.stringify(item.options) !== JSON.stringify(action.payload.options)
      );
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number; options?: Record<string, string> }>) => {
      const item = state.items.find(
        item => 
          item.id === action.payload.id && 
          JSON.stringify(item.options) === JSON.stringify(action.payload.options)
      );
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
