import api from "@/api/axios";

export async function removeCartItem(itemId: string) {
  try {
    const response = await api.delete(`/cart/remove/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("خطا در حذف از سبد خرید", error);
    throw error;
  }
}