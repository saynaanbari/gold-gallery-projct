import api from "@/api/axios";

export async function addToCart(productId: string, quantity: number) {
  try {
    const response = await api.post(`/cart/add`, {
      productId: productId,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در اضافه کردن محصول به سبد خرید", error);
    throw error;
  }
}
