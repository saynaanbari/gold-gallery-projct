import { api } from "@/api/axios";

export async function getInventoryProducts(page: number, limit: number) {
  const response = await api.get(`/products?page=${page}&limit=${limit}`);
  return response.data;
}
