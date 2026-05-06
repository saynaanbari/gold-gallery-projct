export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  weight: number;
  wagePerGram: number;
  numReviews: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductResponseType {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: ProductType[];
}
