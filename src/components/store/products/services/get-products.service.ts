import api from "@/api/axios";
import { ProductResponseType } from "@/types/product-type";

export async function getAllProducts(
  page: number,
  limit: number = 12,
  category?: string | string[],
  minPrice?: number,
  maxPrice?: number,
  minWeight?: number,
  maxWeight?: number,
) {
  try {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));

    if (category) {
      if (Array.isArray(category)) {
        category.forEach((c) => params.append("category", c));
      } else {
        params.append("category", category);
      }
    }

    if (minPrice !== undefined) {
      params.append("minPrice", String(minPrice));
    }
    if (maxPrice !== undefined) {
      params.append("maxPrice", String(maxPrice));
    }
    if (minWeight !== undefined) {
      params.append("minWeight", String(minWeight));
    }

    if (maxWeight !== undefined) {
      params.append("maxWeight", String(maxWeight));
    }

    const response = await api.get<ProductResponseType>(
      `/products?${params.toString()}`,
    );

    return response.data;
  } catch (error) {
    console.error("خطا در دریافت محصولات", error);
    throw error;
  }
}