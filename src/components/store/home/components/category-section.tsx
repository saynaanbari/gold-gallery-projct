import Image from "next/image";
import Link from "next/link";
import rightStar from "@/assets/svg/right-star-green.svg";
import leftStar from "@/assets/svg/left-star-green.svg";
import { categoryItems } from "../constants/category-items";

export default function CategorySection() {
  return (
    <div className="flex flex-col gap-7 md:gap-5 items-center mb-20">
      <div className="flex items-center gap-5">
        <Image src={rightStar} alt={""} width={120} height={10} />
        <h2 className="font-bold lg:text-lg">دسته بندی محصولات</h2>
        <Image src={leftStar} alt={""} width={120} height={10} />
      </div>
      <div className="w-full grid grid-cols-3 md:grid-cols-3 md:justify-items-center gap-5 lg:grid-cols-6 px-5 py-2">
        {categoryItems.map((category) => (
          <Link href={`/products?category=${category.slug}`} key={category.id}>
            <div className="w-30 md:w-40 flex items-center justify-between gap-3  hover:-translate-y-2.5 hover:transition-all duration-500 ease-in-out">
              <div>
                <div className="font-bold text-[16px] text-end">
                  {category.enName}
                </div>
                <div className="font-medium text-[12px] text-dark-green text-end">
                  {category.name}
                </div>
              </div>
              <div className="relative w-14.5 h-14.5 md:w-18 md:h-18 lg:w-20 lg:h-20">
                <Image
                  src={category.src}
                  alt=""
                  fill
                  className="cursor-pointer  object-cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
