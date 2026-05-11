import Image from "next/image";
import { trustBadgesItems } from "../constants/trust-badges-items";

export default function TrustBadges() {
  return (
    <div className="w-full flex justify-center mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 lg:gap-25 px-3">
        {trustBadgesItems.map((item) => (
          <div
            className="flex items-center justify-between gap-2 md:gap-3 hover:-translate-y-2.5 hover:transition-all duration-500 ease-in-out cursor-pointer"
            key={item.id}
          >
            <div className=" w-25">
              <div className="font-bold text-[14px] text-end">{item.title}</div>
              <div className="font-medium text-[11px] text-end text-[#B7A48F]">
                {item.enTitle}
              </div>
            </div>
            <div className="relative w-12.5 h-12.5 md:w-15 md:h-15 lg:w-16 lg:h-16">
              <Image src={item.src} alt="" fill className=" object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
