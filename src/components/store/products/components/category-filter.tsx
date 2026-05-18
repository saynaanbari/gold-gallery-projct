"use client";
import { useState } from "react";
import openMenu from "@/assets/svg/open-menu.svg";
import close from "@/assets/svg/close-menu.svg";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterItem = {
  label: string;
  value: string;
};

export default function SubMenu({
  title,
  items,
}: {
  title: string;
  items: FilterItem[];
}) {
  const [open, setIsOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedCategories = searchParams.getAll("category");

  const handleToggle = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll("category");

    if (currentValues.includes(value)) {
      const newValues = currentValues.filter((v) => v !== value);
      params.delete("category");
      newValues.forEach((v) => params.append("category", v));
    } else {
      params.append("category", value);
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full pb-4 flex flex-col gap-8 border-b border-gray-300">
      <button
        className="w-full items-center flex justify-between font-bold text-sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
        {open ? (
          <Image
            src={openMenu}
            alt={""}
            width={12}
            height={12}
            className="cursor-pointer"
          />
        ) : (
          <Image
            src={close}
            alt={""}
            width={12}
            height={12}
            className="cursor-pointer"
          />
        )}
      </button>
      {open && (
        <div className="flex flex-col gap-5">
          {items.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900 font-bold cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(item.value)}
                onChange={() => handleToggle(item.value)}
                className=" w-3.5 h-3.5 bg-light-green cursor-pointer"
              />
              {item.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}