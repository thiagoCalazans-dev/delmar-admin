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
  