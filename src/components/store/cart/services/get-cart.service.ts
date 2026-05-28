import api from "@/api/axios";
import { CartResponse } from "../types/cart-type";

export async function getCart(): Promise<CartResponse> {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    console.error("خطا در گرفتن سبد خرید", error);
    throw error;
  }
}
