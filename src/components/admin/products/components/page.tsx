"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import ProductsTable from "./products-table";
import ProductsPagination from "./products-pagination";


export default function ProductPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 3;
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const response = await getProducts(page, limit);
      setProducts(response.data);
      setTotalPage(response.pages);
      setLoading(false);
    }
    loadProducts();
  }, [page]);
  return (
    <div className="w-full h-110 flex flex-col items-center justify-between mt-11 overflow-x-auto">
      {loading ? <div>loading</div> : null}
      <ProductsTable products={products}/>
      <ProductsPagination currentPage={page} totalPages={totalPage}/>
    </div>
  );
}
