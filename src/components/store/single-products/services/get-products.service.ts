import api from "@/api/axios";

export async function getProducts(page: number, limit: number = 10) {
  try {
    const response = await api.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("خطا در گرفتن محصولات", error);
    throw error;
  }
}