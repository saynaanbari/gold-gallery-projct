import api from "@/api/axios";

export async function getProductsById(id: string) {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("خطا در گرفتن محصول", error);
    throw error;
  }
}
