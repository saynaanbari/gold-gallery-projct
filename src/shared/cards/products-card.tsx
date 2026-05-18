import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import cart from "@/assets/svg/cart-outline.svg";
import { ProductType } from "@/types/product-type";
import AddButton from "../buttons/add-button";

export default function ProductsCard({ item }: { item: ProductType }) {
  return (
    <div className="bg-white border border-gray-200 shadow rounded-xl p-3 hover:-translate-y-0.5 hover:transition-all duration-500 ease-in-out ">
      <div className="relative w-full h-75 shadow rounded-xl overflow-hidden">
        <Image
          src={`http://localhost:5000${item.images[1] || item.images[0]}`}
          alt={""}
          fill
          className="object-cover cursor-pointer hover:opacity-10 transition-opacity"
          unoptimized
        />
        <Image
          src={`http://localhost:5000${item.images[0]}`}
          alt={""}
          fill
          className="object-cover cursor-pointer absolute hover:opacity-0 transition-opacity"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-5 mt-3">
        <div className="text-center">
          <h3 className="font-bold">{item.name}</h3>
        </div>
        <div className="flex justify-between items-center px-2">
          <AddButton
            className={"font-bold text-xs cursor-pointer text-white"}
            img={cart}
            title={"افزودن به سبد"}
          />
          <h3 className="font-bold text-sm">
            {item.price.toLocaleString("FA-IR")} تومان{" "}
          </h3>
        </div>
      </div>
    </div>
  );
}
