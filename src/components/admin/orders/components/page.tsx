"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrders } from "../services/order.service";
import OrdersTable from "./orders-table";
import OrdersPagination from "./pagination";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 3;
  const [orders, setOrders] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  async function loadOrders() {
    const response = await getOrders(page, limit);
    setOrders(response.data);
    setTotalPage(response.pages);
  }
  useEffect(() => {
    loadOrders();
  }, [page]);
  return (
    <div className="w-full h-110 flex flex-col items-center justify-between mt-11 overflow-x-auto">
      <div className="font-bold text-xl text-blue">لیست سفارشات</div>
      <OrdersTable orders={orders} onOrderUpdate={loadOrders} />
      <OrdersPagination currentPage={page} totalPages={totalPage} />
    </div>
  );
}
