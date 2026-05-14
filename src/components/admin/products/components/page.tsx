"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import ProductsTable from "./products-table";
import ProductsPagination from "./products-pagination";
import Image from "next/image";
import search from "@/assets/svg/search (1).svg";
import add from "@/assets/svg/add.svg";
import AddProductsModal from "./add-product-modal";


export default function ProductPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 3;
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
   async function loadProducts() {
     const response = await getProducts(page, limit);
     setProducts(response.data);
     setTotalPage(response.pages);
   }
  useEffect(() => {
    loadProducts();
  }, [page]);
  return (
    <div className="w-full md:h-110 flex flex-col gap-10 items-center justify-between mt-11 overflow-x-auto">
      <div className="w-full flex flex-col items-start gap-5 md:flex-row md:justify-between ">
        {/* <div className="w-50 rounded-md bg-light-orange py-1.5 cursor-pointer flex items-center justify-center gap-2">
          <Image src={add} alt="" width="24" height="24" />
          <button className="text-xs font-bold cursor-pointer text-white">
            افزودن محصول جدید
          </button>
        </div> */}
        <AddProductsModal productAddedSuccess={loadProducts} />
        <div className="flex h-9 w-70">
          <input
            type="text"
            className="w-5/6 bg-white font-bold text-xs pr-3 rounded-r-lg outline-0 placeholder:text-light-orange placeholder:text-xs"
            placeholder="جست و جو"
          />
          <button className="w-1/6 flex items-center justify-center bg-light-orange rounded-l-lg cursor-pointer">
            <Image src={search} alt="" width="24" height="24" />
          </button>
        </div>
      </div>
      <ProductsTable
        products={products}
        onEditedProduct={loadProducts}
        onDeletedProduct={loadProducts}
      />
      <ProductsPagination currentPage={page} totalPages={totalPage} />
    </div>
  );
}
