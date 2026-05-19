"use client";
import Image from "next/image";
import filter from "@/assets/svg/filter.svg";
import SubMenu from "./category-filter";
import PriceFilter from "./price-filter";
import WeightFilter from "./weight-filter";
import trash from "@/assets/svg/trash2.svg";
import { usePathname, useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();

  const clearFilters = () => {
    router.replace(pathname);
  };
  return (
    <div className="w-62.5 h-fit bg-white shadow-lg rounded-xl flex flex-col gap-6 p-5">
      <div className="flex items-center justify-between border-b border-gray-300 pb-6">
        <div className="flex items-center gap-1.5">
          <Image src={filter} alt={""} className="w-6 h-6 cursor-pointer" />
          <div className="font-bold text-sm">فیلتر</div>
        </div>
        <button
          className="cursor-pointer text-sm font-bold text-red-600 hover:text-red-700"
          onClick={clearFilters}
        >
          حذف فیلترها
        </button>
      </div>
      <div className="w-full min-h-70 flex flex-col gap-5">
        <SubMenu
          title="نوع محصول"
          items={[
            { label: "دستبند", value: "bracelet" },
            { label: "انگشتر", value: "ring" },
            { label: "آویز ساعت", value: "pendant" },
            { label: "گردنبند", value: "necklace" },
            { label: "گوشواره", value: "earrings" },
            { label: "نیم ست", value: "halfset" },
          ]}
        />
        <PriceFilter title={"محدوده قیمت"} />
        <WeightFilter title={"محدوده وزن"} />
      </div>
    </div>
  );
}
