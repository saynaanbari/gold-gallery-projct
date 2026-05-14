import { ProductType } from "@/types/product-type";
import Image from "next/image";
import InventoryEditProductsModal from "./inventory-edit-modal";

export default function InventoryTable({
  products,
  onEditedProduct,
}: {
  products: ProductType[];
  onEditedProduct: () => void;
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
              موجودی
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
                <div>{product.price.toLocaleString("FA-IR")} تومان</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{product.weight.toLocaleString("FA-IR")}گرم</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{product.stock.toLocaleString("FA-IR")} عدد</div>
              </td>
              <td>
                <InventoryEditProductsModal
                  onEditedSuccess={onEditedProduct}
                  item={product}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
