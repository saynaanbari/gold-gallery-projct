import api from "@/api/axios";
import { EditProductType } from "../types/edit-product-types";

export async function editProducts(id: string, data: EditProductType) {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("خطا در ویرایش محصول", error);
    throw error;
  }
}
