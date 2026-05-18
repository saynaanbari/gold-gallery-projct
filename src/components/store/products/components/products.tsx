import { ProductType } from "@/types/product-type";
import ProductMobileMenu from "./product-mobile-menu";
import ProductsCard from "@/shared/cards/products-card";

export default function Products({
  products,
  total,
}: {
  products: ProductType[];
  total: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <div className="hidden lg:block font-bold text-lg"> محصولات</div>
        <div className="lg:hidden">
          <ProductMobileMenu />
        </div>
        <div className="text-gray-500 text-[12px] font-bold">{total} محصول</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div className="w-80 md:w-83 lg:w-72" key={product._id}>
            <ProductsCard item={product} />
          </div>
        ))}
      </div>
    </div>
  );
}