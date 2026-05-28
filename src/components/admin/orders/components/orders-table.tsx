"use client";
import { useState } from "react";
import { OrderType } from "../types/orders-type";
import toast from "react-hot-toast";
import eye from "@/assets/svg/order-eye.svg";
import pending from "@/assets/svg/order-pending.svg";
import success from "@/assets/svg/order-success.svg";
import Image from "next/image";
import OrderDetailsModal from "./order-details-modal";
import { changeOrderStatus } from "../services/status.service";

export default function OrdersTable({
  orders,
  onOrderUpdate,
}: {
  orders: OrderType[];
  onOrderUpdate?: () => void;
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const viewOrderDetails = (order: OrderType) => {
    setSelectedOrder(order);
  };

  const updateStatus = async (orderId: string) => {
    setLoadingId(orderId);
    try {
      await changeOrderStatus(orderId, "confirmed");
      toast.success("سفارش تأیید شد");
      if (onOrderUpdate) onOrderUpdate();
    } catch (error) {
      toast.error("خطا در تأیید سفارش");
    } finally {
      setLoadingId(null);
    }
  };

   const checkoutData =
     typeof window !== "undefined"
       ? JSON.parse(localStorage.getItem("checkoutForm") || "{}")
       : {};

  return (
    <>
      <div className="w-full shadow-lg overflow-x-auto">
        <table className="w-full min-w-200 mx-auto h-70">
          <thead className="bg-blue">
            <tr>
              <th className="border border-blue p-2 text-white text-sm">
                کد سفارش
              </th>
              <th className="border border-blue p-2 text-white text-sm">
                نام مشتری
              </th>
              <th className="border border-blue p-2 text-white text-sm">
                آدرس
              </th>
              <th className="border border-blue p-2 text-white text-sm">
                روش پرداختی
              </th>
              <th className="border border-blue p-2 text-white text-sm">
                مبلغ کل
              </th>
              <th className="border border-blue p-2 text-white text-sm">
                وضعیت
              </th>
              <th className="border border-blue p-2 text-white text-sm">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order: OrderType) => (
              <tr
                key={order._id}
                className="border border-blue text-xs font-bold"
              >
                <td className="border border-blue px-4">{order._id}</td>
                <td className="border border-blue px-4">
                  {order.shippingAddress.name}
                </td>
                <td className="border border-blue px-4">
                  {order.shippingAddress.address}
                </td>
                <td className="border border-blue px-4">
                  {order.paymentMethod === "cash"
                    ? "پرداخت در محل"
                    : "پرداخت آنلاین"}
                </td>
                <td className="border border-blue px-4">
                  {/* {order.totalPrice.toLocaleString("FA-IR")} تومان */}
                  {(order.totalPrice + checkoutData.deliveryFee).toLocaleString(
                    "FA-IR",
                  )}
                </td>
                <td className="border border-blue px-4">
                  {order.status === "pending" ? (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                      در انتظار
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                      تأیید شده
                    </span>
                  )}
                </td>
                <td className="border border-blue px-2">
                  <div className="flex justify-center items-center gap-2">
                    <button onClick={() => viewOrderDetails(order)}>
                      <Image
                        src={eye}
                        alt="جزئیات"
                        width={20}
                        height={20}
                        className="cursor-pointer hover:opacity-70"
                      />
                    </button>
                    {order.status === "pending" ? (
                      <button
                        onClick={() => updateStatus(order._id)}
                        disabled={loadingId === order._id}
                      >
                        {loadingId === order._id ? (
                          <span className="text-xs">...</span>
                        ) : (
                          <Image
                            src={pending}
                            alt="تأیید"
                            width={20}
                            height={20}
                            className="cursor-pointer hover:opacity-70"
                          />
                        )}
                      </button>
                    ) : (
                      <Image
                        src={success}
                        alt="تأیید شده"
                        width={20}
                        height={20}
                        className="opacity-100"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}