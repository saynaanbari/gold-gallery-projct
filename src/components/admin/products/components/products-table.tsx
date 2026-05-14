import Image from "next/image";
import trash from "@/assets/svg/delete.svg";

import { ProductType } from "@/types/product-type";
import EditProductsModal from "./edit-products-modal";
import DeleteProductsModal from "./delete-products-modal";

export default function ProductsTable({
  products,
  onEditedProduct,
  onDeletedProduct,
}: {
  products: ProductType[];
  onEditedProduct: () => void;
  onDeletedProduct: () => void;
}) {
  return (
    <div className="w-full shadow-lg overflow-x-auto">
      <table className="w-full min-w-200 mx-auto h-70">
        <thead className="bg-blue">
          <tr>
            <th className="border border-blue p-2 text-white text-sm">
              کد محصول
            </th>
            <th className="border border-blue p-2 text-white text-sm">
              عکس محصول
            </th>
            <th className="border border-blue p-2 text-white text-sm">
              نام محصول
            </th>
            <th className="border border-blue p-2 text-white text-sm">
              قیمت محصول
            </th>
            <th className="border border-blue p-2 text-white text-sm">
              وزن محصول
            </th>
            <th className="border border-blue p-2 text-white text-sm">
              دسته بندی
            </th>
            <th className="border border-blue p-2 text-white text-sm">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((product: ProductType) => (
            <tr
              key={product._id}
              className="border border-blue text-xs font-bold"
            >
              <td className="border border-blue text-xs font-bold px-4">
                <div>{product._id}</div>
              </td>
              <td className="w-full h-full flex justify-center items-center">
                <Image
                  src={`http://localhost:5000${product.images[1] || product.images[0]}`}
                  alt={""}
                  width={65}
                  height={65}
                  unoptimized
                />
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{product.name}</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{product.price.toLocaleString("fa-IR")} تومان</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{product.weight.toLocaleString("fa-IR")}گرم</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{product.category}</div>
              </td>
              <td>
                <div className="flex justify-center items-center gap-3 px-4">
                  <EditProductsModal
                    onEditedSuccess={onEditedProduct}
                    item={product}
                  />
                  <DeleteProductsModal
                    item={product}
                    onDeleteSuccess={onDeletedProduct}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
