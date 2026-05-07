import { api } from "@/api/axios";
import Cookies from "js-cookie";

export async function getOrders(page: number, limit: number) {
  const token = Cookies.get("token");
  const response = await api.get(
    `/orders/admin/all?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log("response:", response.data);
  return response.data;
}
