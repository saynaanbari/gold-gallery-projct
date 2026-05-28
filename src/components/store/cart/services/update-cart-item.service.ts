import api from "@/api/axios";

export async function updateCartItem(itemId: string, quantity: number) {
  try {
    const response = await api.put(`/cart/update/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error("خطا در بروزرسانی سبد خرید", error);
    throw error;
  }
}