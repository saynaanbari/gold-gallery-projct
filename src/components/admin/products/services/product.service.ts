import { api } from "@/api/axios";
export async function getProducts(page: number, limit: number = 3) {
  const response = await api.get(`/products?page=${page}&limit=${limit}`);
  return response.data;
}
