"use client";
import Image from "next/image";
import add from "@/assets/svg/add.svg";
import { useState, useRef } from "react";
import img from "@/assets/svg/image-add.svg";
import add2 from "@/assets/svg/add2.svg";
import { Controller, useForm } from "react-hook-form";
import { createProduct } from "../services/create-product.service";
import { CreateProductType } from "../types/create-product-types";
import RichTextEditor from "@/shared/editor/text-editor";

export default function AddProductsModal({
  productAddedSuccess,
}: {
  productAddedSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateProductType>({
    defaultValues: {
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      setValue("images", files);
      const previews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setImagePreviews([...previews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      fileArray.splice(index, 1);
      const newFileList = new DataTransfer();
      fileArray.forEach((file) => newFileList.items.add(file));
      const newFiles = newFileList.files;
      setSelectedFiles(newFiles);
      setValue("images", newFiles);
      if (fileInputRef.current) {
        fileInputRef.current.files = newFiles;
      }
    }
  };
  const onSubmit = async (data: CreateProductType) => {
    console.log(data);
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("category", data.category);
    formdata.append("price", data.price.toString());
    formdata.append("stock", data.stock.toString());
    formdata.append("wagePerGram", data.wagePerGram.toString());
    formdata.append("weight", data.weight.toString());
    if (selectedFiles && selectedFiles.length > 0) {
      Array.from(selectedFiles).forEach((file) => {
        formdata.append("images", file);
      });
    }

    formdata.append("description", data.description);
    await createProduct(formdata);
    productAddedSuccess();
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    reset();
    setImagePreviews([]);
    setSelectedFiles(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <button
        className="w-50 rounded-md bg-light-orange py-1.5 cursor-pointer flex items-center justify-center gap-1"
        onClick={() => setIsOpen(true)}
      >
        <Image src={add} alt="" width="24" height="24" />
        <div className="text-xs font-bold cursor-pointer text-white">
          افزودن محصول جدید
        </div>
      </button>
      {isOpen && (
        <div
          className="fixed w-full h-full inset-0 bg-black/50 z-30 flex justify-center items-center px-2"
          onClick={handleCloseModal}
        >
          <form
            className="w-150 bg-white rounded-2xl px-5 py-3"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-3 border-b-2 border-olive-green pb-4">
              <div className="w-8 h-8 rounded-lg bg-olive-green flex justify-center items-center">
                <Image src={add2} alt={""} className="w-5.5 h-5.5" />
              </div>
              <div className="font-black text-[15px] text-gray">
                افزودن محصول جدید
              </div>
            </div>
            {/* inputs parent */}
            <div className="grid grid-cols-2 gap-3 my-4 text-gray max-h-[70vh] overflow-y-auto pl-2">
              {/* inputs1 */}
              <div className="flex flex-col gap-2 items-start ">
                <label htmlFor="" className="font-bold text-xs">
                  نام محصول
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    className="border border-gray-300 w-full rounded-md p-2 text-[11px] placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : انگشتر طلای زنانه"
                    {...register("name", { required: "نام محصول اجباری است" })}
                  />
                  <div className="h-2 font-bold text-[10px] text-red-500">
                    {errors.name?.message}
                  </div>
                </div>
              </div>
              {/* inputs1 */}
              <div className="flex flex-col gap-2 items-start">
                <label className="font-bold text-xs">دسته بندی محصول</label>

                <div className="w-full">
                  <select
                    defaultValue=""
                    className="border border-gray-300 w-full rounded-md p-1.25 text-[10.5px] text-gray-500 font-bold outline-olive-green"
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

                  <div className="h-3 font-bold text-[10px] text-red-500">
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
                    className="border border-gray-300 w-full rounded-md p-2 text-[11px] placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : 1200000"
                    {...register("price", {
                      required: "قیمت محصول اجباری است",
                      valueAsNumber: true,
                    })}
                  />
                  <div className="h-3 font-bold text-[10px] text-red-500">
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
                    className="border border-gray-300 w-full rounded-md p-2 text-[11px] placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : 10"
                    {...register("stock", {
                      required: "موجودی محصول اجباری است",
                      valueAsNumber: true,
                    })}
                  />
                  <div className="h-3 font-bold text-[10px] text-red-500">
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
                    className="border border-gray-300 w-full rounded-md p-2 text-[11px] placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : 300000"
                    {...register("wagePerGram", {
                      required: "اجرت هر گرم اجباری است",
                      valueAsNumber: true,
                    })}
                  />
                  <div className="h-3 font-bold text-[10px] text-red-500">
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
                    className="border border-gray-300 w-full rounded-md p-2 text-[11px] placeholder:text-gray-500 placeholder:text-[10.5px] placeholder:font-bold outline-olive-green"
                    placeholder="مثال : 5"
                    {...register("weight", {
                      required: "وزن محصول اجباری است",
                      valueAsNumber: true,
                    })}
                  />
                  <div className="h-3 font-bold text-[10px] text-red-500">
                    {errors.weight?.message}
                  </div>
                </div>
              </div>

              {/* inputs1 */}
              <div className="flex flex-col gap-2 items-start col-span-2">
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
                  <div className="h-3 font-bold text-[10px] text-red-500">
                    {errors.description?.message}
                  </div>
                </div>
              </div>

              {/* تصویر محصول با پیش‌نمایش */}
              <div className="flex flex-col gap-2 items-start w-full col-span-2">
                <label htmlFor="" className="font-bold text-xs">
                  تصویر محصول
                </label>
                <div className="w-full">
                  <label className="w-full h-25 border-2 border-dashed border-olive-green rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Image src={img} alt={""} width={30} height={30} />
                    <span className="text-[10.5px] text-olive-green">
                      برای انتخاب عکس کلیک کنید
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                  </label>
                  <div className="h-3 font-bold text-[10px] text-red-500">
                    {errors.images?.message}
                  </div>
                </div>

                {/* پیش‌نمایش تصاویر */}
                {imagePreviews.length > 0 && (
                  <div className="mt-3 w-full">
                    <div className="text-xs font-bold text-gray mb-2">
                      تصاویر انتخاب شده:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300 relative">
                            <Image
                              src={preview}
                              alt={`پیش‌نمایش ${index + 1}`}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/*  */}
            </div>
            <div className="flex gap-3">
              <button
                className="w-full py-3 text-xs font-bold cursor-pointer rounded-md bg-olive-green hover:bg-[#546d46] text-white"
                type="submit"
              >
                ثبت تغییرات
              </button>
              <button
                className="w-full py-3 text-xs font-bold cursor-pointer rounded-md bg-red hover:bg-[#8a1a22] text-white"
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
