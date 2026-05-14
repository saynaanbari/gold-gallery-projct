import api from "@/api/axios";

export async function createProduct(data: FormData) {
  try {
    const response = await api.post("/products", data);
    return response.data;
  } catch (error) {
    console.error("خطا در ارسال محصول", error);
    throw error;
  }
}
