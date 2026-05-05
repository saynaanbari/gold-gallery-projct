"use client";
import Image from "next/image";
import Link from "next/link";
import icon from "@/assets/svg/heart.svg";
import { usePathname } from "next/navigation";
export default function AdminPanelSidebar() {
  const pathname = usePathname();
  return (
    <div className="bg-blue w-60 h-screen p-6">
      <ul className="flex flex-col gap-7 text-white">
        <li className="font-black text-md border-b pb-7">گالری مه گلد</li>
        <li
          className={`flex items-center gap-1 font-bold text-sm  hover:bg-[#d8eff03b] hover:rounded-xl py-3  pr-2 ${pathname === "/dashboard" ? "bg-light-blue py-3 rounded-xl pr-2 text-black" : ""}`}
        >
          <div className="w-5 h-5">🏡</div>
          <Link href={"/dashboard"}>داشبورد</Link>
        </li>
        <li
          className={`flex items-center gap-1 font-bold text-sm hover:bg-[#d8eff03b] hover:rounded-xl py-3  pr-2 ${pathname === "/dashboard/products" ? "bg-light-blue py-3 rounded-xl pr-2 text-black" : ""}`}
        >
          <div className="w-5 h-5">🛍️</div>
          <Link href={"/dashboard/products"}>محصولات</Link>
        </li>
        <li
          className={`flex items-center gap-1 font-bold text-sm  hover:bg-[#d8eff03b] hover:rounded-xl py-3  pr-2 ${pathname === "/dashboard/inventory" ? "bg-light-blue py-3 rounded-xl pr-2 text-black" : ""}`}
        >
          <div className="w-5 h-5">📦</div>
          <Link href={"/dashboard/inventory"}>موجودی کالاها</Link>
        </li>
        <li
          className={`flex items-center gap-1 font-bold text-sm  hover:bg-[#d8eff03b] hover:rounded-xl py-3  pr-2 ${pathname === "/dashboard/orders" ? "bg-light-blue py-3 rounded-xl pr-2 text-black" : ""}`}
        >
          <div className="w-5 h-5">🚚</div>
          <Link href={"/dashboard/orders"}>سفارشات</Link>
        </li>
        <li
          className={`flex items-center gap-1 font-bold text-sm  hover:bg-[#d8eff03b] hover:rounded-xl py-3  pr-2`}
        >
          <div className="w-5 h-5">👥</div>
          <Link href="">مشتریان</Link>
        </li>
        <li
          className={`flex items-center gap-1 font-bold text-sm  hover:bg-[#d8eff03b] hover:rounded-xl py-3  pr-2`}
        >
          <div className="w-5 h-5">📊</div>
          <Link href="">گزارشات</Link>
        </li>
      </ul>

      <button className=" w-47 py-3 rounded-xl cursor-pointer fixed bottom-5 bg-[#d8eff03b]  hover:bg-[#d8eff05d] font-bold text-sm text-white">
        خروج از حساب کاربری
      </button>
    </div>
  );
}
