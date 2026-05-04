"use client";
import Image from "next/image";
import Link from "next/link";
import icon from "@/assets/svg/heart.svg";
import { usePathname } from "next/navigation";
export default function AdminPanelSidebar() {
  const pathname = usePathname();
  return (
    <div className="bg-dark-blue w-60 h-screen p-6">
      <ul className="flex flex-col gap-7 text-white">
        <li className="font-black text-md border-b pb-7">گالری مه گلد</li>
        <li
          className={`flex items-center gap-2 font-bold text-sm  hover:bg-[#e5eee473] hover:rounded-xl py-3  pr-2 ${pathname === "/dashboard" ? "bg-light-blue py-3 rounded-xl pr-2 text-black" : ""}`}
        >
          <Image src={icon} alt="" width="20" height="20" />
          <Link href={"/dashboard"}>داشبورد</Link>
        </li>
        <li
          className={`flex items-center gap-2 font-bold text-sm hover:bg-[#e5eee473] hover:rounded-xl py-3  pr-2 ${pathname === "/dashboard/products" ? "bg-light-blue py-3 rounded-xl pr-2 text-black" : ""}`}
        >
          <Image src={icon} alt="" width="20" height="20" />
          <Link href={"/dashboard/products"}>محصولات</Link>
        </li>
        <li
          className={`flex items-center gap-2 font-bold text-sm  hover:bg-[#e5eee473] hover:rounded-xl py-3  pr-2 ${pathname === "/dashboard/inventory" ? "bg-light-blue py-3 rounded-xl pr-2 text-black" : ""}`}
        >
          <Image src={icon} alt="" width="20" height="20" />
          <Link href={"/dashboard/inventory"}>موجودی کالاها</Link>
        </li>
        <li
          className={`flex items-center gap-2 font-bold text-sm  hover:bg-[#e5eee473] hover:rounded-xl py-3  pr-2 ${pathname === "/dashboard/orders" ? "bg-light-blue py-3 rounded-xl pr-2 text-black" : ""}`}
        >
          <Image src={icon} alt="" width="20" height="20" />
          <Link href={"/dashboard/orders"}>سفارشات</Link>
        </li>
        <li
          className={`flex items-center gap-2 font-bold text-sm  hover:bg-[#e5eee473] hover:rounded-xl py-3  pr-2`}
        >
          <Image src={icon} alt="" width="20" height="20" />
          <Link href="">مشتریان</Link>
        </li>
        <li
          className={`flex items-center gap-2 font-bold text-sm  hover:bg-[#e5eee473] hover:rounded-xl py-3  pr-2`}
        >
          <Image src={icon} alt="" width="20" height="20" />
          <Link href="">گزارشات</Link>
        </li>
      </ul>

      <button className=" w-47 py-3 rounded-xl cursor-pointer fixed bottom-5 bg-light-blue font-bold text-sm">
        خروج از حساب کاربری
      </button>
    </div>
  );
}
