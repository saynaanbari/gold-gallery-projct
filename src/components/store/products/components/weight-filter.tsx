"use client";
import openMenu from "@/assets/svg/open-menu.svg";
import close from "@/assets/svg/close-menu.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function WeightFilter({ title }: { title: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(30);
  const MIN = 0;
  const MAX = 30;

  useEffect(() => {
    const min = searchParams.get("minWeight");
    const max = searchParams.get("maxWeight");

    if (min) setMinWeight(Number(min));
    if (max) setMaxWeight(Number(max));
  }, [searchParams]);

  const updateUrl = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minWeight", min.toString());
    params.set("maxWeight", max.toString());
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleMinChange = (value: number) => {
    if (value >= maxWeight) return;
    setMinWeight(value);
    updateUrl(value, maxWeight);
  };

  const handleMaxChange = (value: number) => {
    if (value <= minWeight) return;
    setMaxWeight(value);
    updateUrl(minWeight, value);
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
              step={0.1}
              value={minWeight}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              style={{
                accentColor: "#bccc9a",
              }}
            />
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={0.1}
              value={maxWeight}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              style={{
                accentColor: "#bccc9a",
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="text-xs font-bold">وزن از</div>
            <div className="flex items-center justify-between p-2 w-full border rounded-md border-gray-300 bg-[#FAFAFA]">
              <div className="font-bold text-sm">
                {minWeight.toLocaleString("fa-IR", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="font-bold text-xs">گرم</div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="text-xs font-bold">وزن تا</div>
            <div className="flex items-center justify-between p-2 w-full rounded-md border border-gray-300 bg-[#FAFAFA]">
              <div className="font-bold text-sm">
                {maxWeight.toLocaleString("fa-IR", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="font-bold text-xs">گرم</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
