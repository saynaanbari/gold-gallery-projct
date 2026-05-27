"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { OrderType } from "../types/orders-type";

export default function OrderDetailsModal({
  order,
  onClose,
}: {
  order: OrderType | null;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!order) return null;

  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed w-full h-full inset-0 bg-black/50 backdrop-blur-sm z-30 flex justify-center items-center px-2"
          onClick={handleCloseModal}
        >
          <div
            className="w-130 max-w-2xl bg-white rounded-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-gray-200 pb-3 px-5 pt-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-olive-green flex justify-center items-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div className="font-black text-[15px] text-gray">
                  جزئیات سفارش
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div className="bg-light rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray text-[13px]">
                    نام مشتری:
                  </span>
                  <span className="text-gray-500 text-xs font-bold">
                    {order.shippingAddress.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray text-[13px]">تلفن:</span>
                  <span className="text-gray-500 text-xs font-bold">
                    {order.shippingAddress.phone}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray text-[13px]">آدرس:</span>
                  <span className="text-gray-500 text-xs font-bold">
                    {order.shippingAddress.address}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray text-[13px]">
                    روش پرداخت:
                  </span>
                  <span className="text-gray-500 text-xs font-bold">
                    {order.paymentMethod === "cash"
                      ? "پرداخت در محل"
                      : "پرداخت آنلاین"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray text-[13px]">
                    وضعیت پرداخت:
                  </span>
                  <span
                    className={`text-xs font-bold ${order.isPaid ? "text-green-600" : "text-red-600"}`}
                  >
                    {order.isPaid ? "پرداخت شده" : "پرداخت نشده"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray text-[13px]">
                    وضعیت سفارش:
                  </span>
                  <span
                    className={`text-xs font-bold ${order.status === "confirmed" ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {order.status === "confirmed" ? "تأیید شده" : "در انتظار"}
                  </span>
                </div>
              </div>
              <div>
                <div className="font-bold text-gray text-[13px] mb-3">
                  محصولات
                </div>
                <div className="space-y-2 rounded-lg shadow">
                  {order.orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-3 flex gap-3"
                    >
                      <Image
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                        unoptimized
                      />
                      <div className="flex-1">
                        <div className="font-bold text-gray text-[13px]">
                          {item.name}
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-gray-400 text-xs font-bold">
                            تعداد: {item.quantity.toLocaleString("FA-IR")}
                          </span>
                          <span className="text-gray text-xs font-bold">
                            {item.price.toLocaleString("fa-IR")} تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-200 shadow rounded-lg p-4 flex justify-between items-center">
                <span className="font-bold text-gray text-[13px]">
                  جمع کل سفارشات:
                </span>
                <span className="font-bold text-light-brown text-lg">
                  {order.totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>
            <div className="p-5 border-t border-gray-200">
              <button
                className="w-full py-3 text-xs font-bold cursor-pointer rounded-md bg-olive-green hover:bg-[#546d46] text-white"
                onClick={handleCloseModal}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
