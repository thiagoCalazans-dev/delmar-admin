export interface Color {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  code: string;
  value: number;
  description: string;
  trending: boolean;
  categoryId: number;
  brandId: number | null;
}

export interface Storage {
  id: number;
  price: number;
  descont: number;
  amount: number;
  product: Product;
  size: Size;
  color: Color;
}
