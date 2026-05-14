import { api } from "@/api/axios";

export async function deleteProduct(id: string) {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete product error:", error);
    throw error;
  }
}
