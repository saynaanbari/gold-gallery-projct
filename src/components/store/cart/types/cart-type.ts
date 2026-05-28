export interface CartItem {
  _id: string;
  product: {
    weight: any;
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
  quantity: number;
  price: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    user: string;
    items: CartItem[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  };
}