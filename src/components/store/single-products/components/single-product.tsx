
import Image from "next/image";
import heart from "@/assets/svg/heart-love-like.svg";
import ProductGallery from "./product-gallery";
import SimilarProducts from "./similar-products";
import fastDeli from "@/assets/svg/fastdeli.svg";
import truck from "@/assets/svg/truck.svg";
import likeStar from "@/assets/svg/likestar.svg";
import packing from "@/assets/svg/packing.svg";
import BreadCrumb from "./bread-crumb";
import SingleProductDescription from "./description";
import { ProductType } from "@/types/product-type";

export default function SingleProduct({ item }: { item: ProductType }) {
  return (
    <div className="w-full container mx-auto my-10">
      <div className=" flex flex-col gap-5 md:flex-row ">
        <div className="w-full lg:w-220">
          <div className="mb-4 px-3 md:px-0">
            <BreadCrumb categoryName={item.name} />
          </div>
          <ProductGallery images={item.images} />
        </div>
        <div className="w-full px-5 flex flex-col gap-11">
          <div className="w-full border-b border-light-cream">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold">{item.name}</div>
              <div className="flex items-center gap-1 cursor-pointer">
                <Image
                  src={heart}
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
                <div className="font-bold text-xs hover:text-gray-800">
                  افزودن به علاقه مندی
                </div>
              </div>
            </div>
          </div>
          <div className="w-full  flex flex-col gap-10 lg:flex-row">
            <div className="w-full flex flex-col gap-3">
              <div className="font-bold text-sm text-light-cream">
                جزئیات محصول :
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    وزن
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    {item.weight.toLocaleString("fa-IR")} گرم
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    اجرت
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    {item.wagePerGram.toLocaleString("fa-IR")} درصد
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    جنس
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    طلا
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    پوشش
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    براق
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    مناسب برای
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    خانوم ها
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    عیار طلا
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    ۱۸ عیار
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    قیمت روز طلا ۱۸ عیار
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="font-bold text-xs text-gray whitespace-nowrap">
                    ۱۹,۳۹۰,۸۰۰ تومان
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full p-4 flex flex-col gap-3 shadow shadow-light-cream rounded-md">
              <div className="flex justify-between items-center">
                <div className="font-bold text-lg">
                  {item.price.toLocaleString("FA-IR")} تومان
                </div>

                <div className="relative group">
                  <span className="font-bold text-xs text-gray hover:text-light-cream cursor-pointer">
                    نحوه محاسبه قیمت
                  </span>

                  <div className="absolute bottom-full -right-80 mb-3 px-3 py-2 text-xs bg-white font-bold text-gray shadow rounded-md whitespace-nowrap opacity-0 invisible transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:visible">
                    وزن طلا × (قیمت روز طلا + اجرت) + ۷٪ سود + متعلقات + ۱۰٪
                    مالیات از سود و اجرت
                  </div>
                </div>
              </div>
              <button className="w-full py-2.5 font-bold bg-light-cream rounded-md cursor-pointer text-white text-sm hover:bg-[#a79273]">
                افزودن به سبد خرید
              </button>
              <div className="w-full  flex flex-col gap-3">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={truck}
                    alt=""
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                  <div className="font-bold text-xs hover:text-gray-800">
                    ارسال پستی رایگان
                  </div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={fastDeli}
                    alt=""
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                  <div className="font-bold text-xs hover:text-gray-800">
                    تحویل فوری
                  </div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={packing}
                    alt=""
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                  <div className="font-bold text-xs hover:text-gray-800">
                    بسته بندی ویژه
                  </div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={likeStar}
                    alt=""
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                  <div className="font-bold text-xs hover:text-gray-800">
                    ضمانت اصالت کالا
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden lg:block">
            <SingleProductDescription description={item.description} />
          </div>
        </div>
      </div>
      <div className="hidden md:block lg:hidden mt-7">
        <SingleProductDescription description={item.description} />
      </div>
      <div className="mt-20 mb-30">
        <div className="px-15 md:px-10 lg:px-0">
          <SimilarProducts product={item} />
        </div>
      </div>
    </div>
  );
}