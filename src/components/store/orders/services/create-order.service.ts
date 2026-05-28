import api from "@/api/axios";
import { CreateOrderData } from "../types/orders-type";

export async function createOrder(orderData: CreateOrderData) {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("خطا در ایجاد سفارش", error);
    throw error;
  }
}
