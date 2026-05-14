import api from "@/api/axios";
import { InventoryEditProductType } from "../types/inventory-edit-product-type";

export async function editInventory(
  id: string,
  data: InventoryEditProductType,
) {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("خطا در ویرایش قیمت و موجودی", error);
    throw error;
  }
}