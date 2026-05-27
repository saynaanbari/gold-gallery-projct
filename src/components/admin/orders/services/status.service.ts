import api from "@/api/axios";

export async function changeOrderStatus(orderId: string, status: string) {
  try {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("خطا در تغییر وضعیت سفارش", error);
    throw error;
  }
}
