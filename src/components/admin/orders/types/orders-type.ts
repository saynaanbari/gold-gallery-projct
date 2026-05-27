import { ProductType } from "@/types/product-type";

export interface OrderType {
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
  };
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: {
    product: ProductType;
    name: string;
    quantity: number;
    price: number;
    image: string;
    _id: string;
  }[];
  paymentMethod: string;
  totalPrice: number;
  status: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}