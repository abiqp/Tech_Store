import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '../types/Products';

// --- 1. Definir Tipos de Acciones ---
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// --- 2. Definir el Estado del Carrito ---
interface CartState {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
}

// --- 3. Definir la Interfaz del Contexto ---
interface CartContextType {
  state: CartState;
  // ¡CORRECCIÓN AQUÍ! Añadimos dispatch a la interfaz del contexto
  dispatch: React.Dispatch<CartAction>; 
}

// --- 4. Crear el Contexto ---
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- 5. Reducer para manejar las acciones del carrito ---
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);

      if (existingItemIndex > -1) {
        // Si el producto ya existe, actualiza la cantidad
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { ...state, items: updatedItems, itemCount: state.itemCount + quantity, totalAmount: state.totalAmount + (product.price * quantity) };
      } else {
        // Si es un nuevo producto, añádelo
        return { ...state, items: [...state.items, { product, quantity }], itemCount: state.itemCount + quantity, totalAmount: state.totalAmount + (product.price * quantity) };
      }
    }
    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      const itemToRemove = state.items.find(item => item.product.id === productId);
      if (!itemToRemove) return state; // No hacer nada si el item no existe

      const updatedItems = state.items.filter(item => item.product.id !== productId);
      return { ...state, items: updatedItems, itemCount: state.itemCount - itemToRemove.quantity, totalAmount: state.totalAmount - (itemToRemove.product.price * itemToRemove.quantity) };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);

      if (!existingItem) return state; // No hacer nada si el item no existe

      const oldQuantity = existingItem.quantity;
      const priceChange = (quantity - oldQuantity) * existingItem.product.price;

      const updatedItems = state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: quantity }
          : item
      );
      return { ...state, items: updatedItems, itemCount: state.itemCount + (quantity - oldQuantity), totalAmount: state.totalAmount + priceChange };
    }
    case 'CLEAR_CART':
      return { items: [], itemCount: 0, totalAmount: 0 };
    default:
      return state;
  }
};

// --- 6. Crear el Proveedor del Carrito ---
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], itemCount: 0, totalAmount: 0 });

  const contextValue: CartContextType = {
    state,
    dispatch, // Aseguramos que dispatch se pase en el valor del contexto
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

// --- 7. Hook Personalizado para usar el Carrito ---
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};