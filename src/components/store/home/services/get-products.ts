import api from "@/api/axios";

export async function getProducts() {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("خطا در گرفتن محصولات", error);
    throw error;
  }
}
