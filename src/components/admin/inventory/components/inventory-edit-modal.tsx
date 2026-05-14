"use client";
import Image from "next/image";
import edit from "@/assets/svg/edit-write.svg";
import edit2 from "@/assets/svg/edit2.svg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InventoryEditProductType } from "../types/inventory-edit-product-type";
import { editInventory } from "../services/inventory-edit.service";
import { ProductType } from "@/types/product-type";
import toast from "react-hot-toast";

export default function InventoryEditProductsModal({
  item,
  onEditedSuccess,
}: {
  onEditedSuccess: () => void;
  item: ProductType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InventoryEditProductType>();

  useEffect(() => {
    if (item) {
      reset({
        price: item.price,
        stock: item.stock,
      });
    }
  }, [item, reset]);

  const onSubmit = async (data: InventoryEditProductType) => {
    console.log(data);
    await editInventory(item._id, data);
    toast.success("ویرایش با موفقیت انجام شد")
    onEditedSuccess();
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    reset();
  };
  return (
    <div>
      <button className="relative" onClick={() => setIsOpen(true)}>
        <Image
          src={edit}
          alt={""}
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </button>
      {isOpen && (
        <div
          className="fixed w-full h-full inset-0 bg-black/50 backdrop-blur z-30 flex justify-center items-center px-2"
          onClick={handleCloseModal}
        >
          <form
            className="w-110 bg-white rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-3 border-b-2 border-olive-green pb-5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-olive-green flex justify-center items-center">
                <Image src={edit2} alt={""} className="w-5.5 h-5.5" />
              </div>
              <div className="font-black text-[15px] text-gray">
                ویرایش موجودی و قیمت
              </div>
            </div>
            <div className="h-25 shadow shadow-olive-green flex justify-around items-center rounded-md">
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
            {/* inputs parent */}
            <div className="grid grid-cols-2 gap-3 my-5 text-gray">
              {/* inputs1 */}
              <div className="flex flex-col gap-3 items-start">
                <label className="font-bold text-xs">قیمت محصول</label>
                <div className="w-full">
                  <input
                    type="number"
                    className="border border-gray-300 w-full rounded-md p-2 placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : 1200000"
                    {...register("price", {
                      required: "قیمت محصول اجباری است",
                      valueAsNumber: true,
                    })}
                  />
                  <div className="h-3 font-bold text-[10px] text-red-500 text-start">
                    {errors.price?.message}
                  </div>
                </div>
              </div>
              {/* inputs1 */}
              <div className="flex flex-col gap-3 items-start">
                <label className="font-bold text-xs">موجودی</label>
                <div className="w-full">
                  <input
                    type="number"
                    className="border border-gray-300 w-full rounded-md p-2 placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : 10"
                    {...register("stock", {
                      required: "موجودی محصول اجباری است",
                      valueAsNumber: true,
                    })}
                  />
                  <div className="h-3 font-bold text-[10px] text-red-500 text-start">
                    {errors.stock?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="w-full py-3 text-xs font-bold cursor-pointer rounded-md bg-olive-green hover:bg-[#546d46] text-white"
                type="submit"
              >
                ثبت تغییرات
              </button>
              <button
                className="w-full py-3 text-xs font-bold cursor-pointer rounded-md bg-red hover:bg-[#8a1a22]  text-white"
                type="button"
                onClick={handleCloseModal}
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
