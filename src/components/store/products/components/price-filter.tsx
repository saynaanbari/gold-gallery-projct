"use client";
import openMenu from "@/assets/svg/open-menu.svg";
import close from "@/assets/svg/close-menu.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PriceFilter({ title }: { title: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000000);

  const MIN = 0;
  const MAX = 500000000;

  useEffect(() => {
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    setMinPrice(min ? Number(min) : MIN);
    setMaxPrice(max ? Number(max) : MAX);
    // if (min) setMinPrice(Number(min));
    // if (max) setMaxPrice(Number(max));
  }, [searchParams]);

  const updateUrl = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", min.toString());
    params.set("maxPrice", max.toString());
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleMinChange = (value: number) => {
    if (value >= maxPrice) return;
    setMinPrice(value);
    updateUrl(value, maxPrice);
  };
  const handleMaxChange = (value: number) => {
    if (value <= minPrice) return;
    setMaxPrice(value);
    updateUrl(minPrice, value);
  };

  return (
    <div className="w-full pb-4 flex flex-col gap-6 border-b border-gray-300">
      <button
        className="w-full flex justify-between items-center font-bold text-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        {title}
        {open ? (
          <Image src={openMenu} alt="" width={12} height={12} />
        ) : (
          <Image src={close} alt="" width={12} height={12} />
        )}
      </button>
      {open && (
        <>
          <div className="flex flex-col gap-4">
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={1000000}
              value={minPrice}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              style={{
                accentColor: "#bccc9a",
              }}
            />
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={1000000}
              value={maxPrice}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              style={{
                accentColor: "#bccc9a",
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="text-xs font-bold">قیمت از</div>
            <div className="flex items-center justify-between p-2 w-full rounded-md border border-gray-300 bg-[#FAFAFA]">
              <div className="font-bold text-sm">
                {minPrice.toLocaleString("fa-IR")}
              </div>
              <div className="font-bold text-xs">تومان</div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="text-xs font-bold">قیمت تا</div>
            <div className="flex items-center justify-between p-2 w-full rounded-md border border-gray-300 bg-[#FAFAFA]">
              <div className="font-bold text-sm">
                {maxPrice.toLocaleString("fa-IR")}
              </div>
              <div className="font-bold text-xs">تومان</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
