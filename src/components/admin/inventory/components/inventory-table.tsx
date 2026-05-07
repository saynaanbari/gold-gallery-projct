import { ProductType } from "@/types/product-type";
import Image from "next/image";

export default function InventoryTable({ products }: { products: ProductType[] }) {
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
                  src={`http://localhost:5000${product.images[1]}`}
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
                <div>{product.price},000,000 تومان</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{product.weight}گرم</div>
              </td>
              <td className="border border-blue text-xs font-bold px-4">
                <div>{product.stock} عدد</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
