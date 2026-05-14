"use client";
import Image from "next/image";
import edit from "@/assets/svg/edit.svg";
import { useEffect, useState } from "react";
import edit2 from "@/assets/svg/edit2.svg";
import { Controller, useForm } from "react-hook-form";
import { editProducts } from "../services/edit-products.service";
import { EditProductType } from "../types/edit-product-types";
import RichTextEditor from "@/shared/editor/text-editor";
import { ProductType } from "@/types/product-type";
import toast from "react-hot-toast";

export default function EditProductsModal({
  item,
  onEditedSuccess,
}: {
  onEditedSuccess: () => void;
  item: ProductType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProductType>({
    defaultValues: {
      description: "",
    },
  });

  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        stock: item.stock,
        weight: item.weight,
        wagePerGram: item.wagePerGram,
      });
    }
  }, [item, reset]);

  const onSubmit = async (data: EditProductType) => {
    console.log(data);
    await editProducts(item._id, data);
    toast.success("ویرایش محصول با موفقیت انجام شد")
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
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </button>
      {isOpen && (
        <div
          className="fixed w-full h-full inset-0 bg-black/50 backdrop-blur z-30 flex justify-center items-center px-2"
          onClick={handleCloseModal}
        >
          <form
            className="w-150 bg-white rounded-2xl px-5 py-3"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-3 border-b-2 border-olive-green pb-4">
              <div className="w-8 h-8 rounded-lg bg-olive-green flex justify-center items-center">
                <Image src={edit2} alt={""} className="w-5 h-5" />
              </div>
              <div className="font-black text-[15px] text-gray">
                ویرایش محصول
              </div>
            </div>
            {/* inputs parent */}
            <div className="grid grid-cols-2 gap-2 my-4 text-gray">
              {/* inputs1 */}
              <div className="flex flex-col gap-2 items-start ">
                <label htmlFor="" className="font-bold text-xs">
                  نام محصول
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    className="border border-gray-300 w-full rounded-md p-2 text-[10.5px] placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : انگشتر طلای زنانه"
                    {...register("name", { required: "نام محصول اجباری است" })}
                  />
                  <div className="h-2 font-bold text-[10px] text-red-500 text-start">
                    {errors.name?.message}
                  </div>
                </div>
              </div>
              {/* inputs1 */}
              <div className="flex flex-col gap-2 items-start">
                <label className="font-bold text-xs">دسته بندی محصول</label>

                <div className="w-full">
                  <select
                    className="border border-gray-300 w-full rounded-md p-1 text-[10.5px] text-gray-500 font-bold outline-olive-green"
                    {...register("category", {
                      required: "دسته بندی محصول اجباری است",
                    })}
                  >
                    <option value="" disabled hidden>
                      انتخاب کنید
                    </option>
                    <option value="necklace">necklace</option>
                    <option value="ring">ring</option>
                    <option value="pendant">pendant</option>
                    <option value="earrings">earrings</option>
                    <option value="halfset">halfset</option>
                    <option value="bracelet">bracelet</option>
                  </select>

                  <div className="h-3 font-bold text-[10px] text-red-500 text-start">
                    {errors.category?.message}
                  </div>
                </div>
              </div>
              {/* inputs1 */}
              <div className="flex flex-col gap-2 items-start">
                <label className="font-bold text-xs">قیمت</label>
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
              <div className="flex flex-col gap-2 items-start">
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
              {/* inputs1 */}
              <div className="flex flex-col gap-2 items-start">
                <label className="font-bold text-xs">اجرت هر گرم</label>
                <div className="w-full">
                  <input
                    type="number"
                    className="border border-gray-300 w-full rounded-md p-2 placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : 300000"
                    {...register("wagePerGram", {
                      required: "اجرت هر گرم اجباری است",
                      valueAsNumber: true,
                    })}
                  />
                  <div className="h-3 font-bold text-[10px] text-red-500 text-start">
                    {errors.wagePerGram?.message}
                  </div>
                </div>
              </div>
              {/* inputs1 */}
              <div className="flex flex-col gap-2 items-start">
                <label className="font-bold text-xs">وزن</label>
                <div className="w-full">
                  <input
                    type="number"
                    className="border border-gray-300 w-full rounded-md p-2 placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : 5"
                    {...register("weight", {
                      required: "وزن محصول اجباری است",
                      valueAsNumber: true,
                    })}
                  />
                  <div className="h-3 font-bold text-[10px] text-red-500 text-start">
                    {errors.weight?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 items-start mb-4">
              <label htmlFor="" className="font-bold text-xs">
                توضیحات محصول
              </label>
              <div className="w-full">
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    validate: (value) => {
                      if (!value) return "توضیحات محصول اجباری است";
                      const plainText = value.replace(/<[^>]*>/g, "").trim();
                      if (plainText.length === 0)
                        return "توضیحات محصول اجباری است";
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                <div className="w-full text-start h-3 font-bold text-[10px] text-red-500">
                  {errors.description?.message}
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
                className="w-full py-3 text-xs font-bold cursor-pointer rounded-md bg-red  hover:bg-[#8a1a22] text-white"
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
