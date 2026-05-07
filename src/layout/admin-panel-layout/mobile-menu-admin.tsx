"use client";
import Image from "next/image";
import menu from "@/assets/svg/menu01.svg";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function dashboardMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const router = useRouter();
   const handleLogout = () => {
     Cookies.remove("token", { path: "/" });
     Cookies.remove("role", { path: "/" });
     router.replace("/my-secret-panel-15j30k");
   };
  return (
    <div className="">
      <button className="relative w-7 h-7" onClick={() => setIsOpen(true)}>
        <Image src={menu} alt="" fill className="object-cover" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 w-1/2 h-screen bg-blue z-50 shadow transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className=" px-7 py-6 flex flex-col gap-5">
          <div className="w-full border-b border-white flex justify-between items-center pb-6">
            <div className="font-bold text-white">گالری مه گلد</div>
            <button
              className="font-bold text-2xl cursor-pointer text-white"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <ul className="flex flex-col gap-10 font-bold text-white">
            <li className="flex items-center gap-1">
              <div className="w-5 h-5">🏡</div>
              <Link href="/dashboard" onClick={closeMenu}>
                داشبورد
              </Link>
            </li>

            <li className="flex items-center gap-1">
              <div className="w-5 h-5">🛍️</div>
              <Link
                href="/dashboard/products"
                onClick={closeMenu}
                className="hover:underline decoration-2 underline-offset-4"
              >
                محصولات
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-5 h-5">📦</div>
              <Link href="" onClick={closeMenu}>
                موجودی کالا
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-5 h-5">🚚</div>
              <Link href="/dashboard/orders" onClick={closeMenu}>
                سفارشات
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-5 h-5">👥</div>
              <Link href="" onClick={closeMenu}>
                مشتریان
              </Link>
            </li>

            <li className="flex items-center gap-1">
              <div className="w-5 h-5">📊</div>
              <Link href="" onClick={closeMenu}>
                گزارشات
              </Link>
            </li>
          </ul>
        </div>
        <button
          className=" w-47 py-3 rounded-xl cursor-pointer fixed bottom-5 right-4 bg-[#d8eff03b]  hover:bg-[#d8eff05d] font-bold text-sm text-white"
          onClick={handleLogout}
        >
          خروج از حساب کاربری
        </button>
      </div>
    </div>
  );
}
