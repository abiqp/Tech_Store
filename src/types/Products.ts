// src/types/Product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  stock: number; // ¡NUEVA PROPIEDAD AÑADIDA! Cantidad numérica de stock
  rating: number;
  reviews: number;
  color?: string;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}