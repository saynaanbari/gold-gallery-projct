import Menu from "@/components/store/products/components/menu";
import ProductsPagination from "@/components/store/products/components/pagination";
import Products from "@/components/store/products/components/products";
import { getAllProducts } from "@/components/store/products/services/get-products.service";
import { ProductsParams } from "@/components/store/products/types/products-params-type";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductsParams>;
}) {
  const params = await searchParams;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const minWeight = params.minWeight ? Number(params.minWeight) : undefined;
  const maxWeight = params.maxWeight ? Number(params.maxWeight) : undefined;

  const data = await getAllProducts(
    Number(params.page) || 1,
    Number(params.limit) || 12,
    params.category,
    minPrice,
    maxPrice,
    minWeight,
    maxWeight,
  );
  const isEmpty = data.data.length === 0;
  return (
    <div className="flex justify-around container mx-auto my-10">
      {!isEmpty && (
        <div className="hidden lg:block">
          <Menu />
        </div>
      )}

      <div className="flex flex-col items-center gap-15 w-full">
        {isEmpty ? (
          <div className="w-full h-60 flex flex-col items-center justify-center gap-4">
            <div className="font-bold text-gray text-md">
              متاسفانه محصولی با مشخصات و فیلترهای انتخاب‌شده یافت نشد.
            </div>
            <Link
              href="/products"
              className="bg-light-green text-white px-5 py-3  font-bold text-xs  bg-linear-to-b from-light-green to-[#8a9e6e] rounded-lg transition-all duration-30 hover:from-[#8a9e6e] hover:to-[#6b7f4e] hover:shadow-md"
            >
              بازگشت به صفحه محصولات
            </Link>
          </div>
        ) : (
          <>
            <Products products={data.data} total={data.total} />
            <ProductsPagination
              currentPage={data.page}
              totalPages={data.pages}
            />
          </>
        )}
      </div>
    </div>
  );
}

