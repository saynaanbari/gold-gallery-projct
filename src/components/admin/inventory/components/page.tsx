"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InventoryTable from "./inventory-table";
import InventoryPagination from "./pagination";
import { getInventoryProducts } from "../services/inventory.service";

export default function InventoryPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 3;
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  async function loadProducts() {
    const response = await getInventoryProducts(page, limit);
    setProducts(response.data);
    setTotalPage(response.pages);
  }
  useEffect(() => {
    loadProducts();
  }, [page]);
  return (
    <div className="w-full h-110 flex flex-col items-center justify-between mt-11 overflow-x-auto">
      <div className="font-bold text-xl text-blue">لیست موجودی کالاها</div>
      <InventoryTable products={products} onEditedProduct={loadProducts} />
      <InventoryPagination currentPage={page} totalPages={totalPage} />
    </div>
  );
}
