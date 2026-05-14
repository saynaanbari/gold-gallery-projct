"use client";
import { useState } from "react";
import trash from "@/assets/svg/delete.svg";
import cilTrash from "@/assets/svg/cil-trash.svg";
import Image from "next/image";
import { deleteProduct } from "../services/delete-product.service";
import toast from "react-hot-toast";
import { ProductType } from "@/types/product-type";

export default function DeleteProductsModal({
  item,
  onDeleteSuccess,
}: {
  item: ProductType;
  onDeleteSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(item._id);
      onDeleteSuccess();
      setIsOpen(false);
      toast.success("کالا با موفقیت حذف شد");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button className="relative" onClick={() => setIsOpen(true)}>
        <Image
          src={trash}
          alt={""}
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </button>
      {isOpen && (
        <div
          className="fixed w-full h-full inset-0 bg-black/50 backdrop-blur z-30 flex justify-center items-center px-2"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-110 bg-white rounded-2xl flex flex-col gap-8 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center items-center">
              <div className="w-15 h-15 rounded-full bg-warm-cream flex justify-center items-center">
                <Image src={cilTrash} alt={""} className="w-8 h-8" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-gray font-bold text-lg">
                آیا از حذف این محصول مطمئن هستید؟
              </div>
              <div className="text-gray font-bold">
                بعد از انجام این کار، امکان برگرداندن آن وجود ندارد.
              </div>
            </div>
            <div className="h-25 border border-warm-cream shadow flex justify-around items-center py-5 rounded-md">
              <div className="flex flex-col gap-2 items-start">
                <div className="font-bold text-gray text-[13px]">
                  {item.name}
                </div>
                <div className="text-gray font-bold text-xs">
                  کد : {item._id}
                </div>
              </div>
              <Image
                src={`http://localhost:5000${item.images[1] || item.images[0]}`}
                alt={""}
                width={65}
                height={65}
                unoptimized
              />
            </div>
            <div className="flex gap-3">
              <button
                className="w-full py-3 font-bold cursor-pointer rounded-md bg-red  hover:bg-[#8a1a22] text-white"
                onClick={handleDeleteProduct}
              >
                حذف محصول
              </button>
              <button
                className="w-full py-3 font-bold cursor-pointer rounded-md bg-warm-cream hover:bg-[#e0d9d0]"
                onClick={() => setIsOpen(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
