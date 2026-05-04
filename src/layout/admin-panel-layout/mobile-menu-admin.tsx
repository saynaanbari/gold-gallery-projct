"use client";
import Image from "next/image";
import menu from "@/assets/svg/menu01.svg";
import { useState } from "react";
import Link from "next/link";

export default function AdminMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <div>
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
        className={`fixed top-0 right-0 w-1/2 h-screen bg-dark-blue z-50 shadow transition-transform duration-300
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
          <ul className="flex flex-col gap-7 font-bold text-white">
            <li>
              <Link href="/admin" onClick={closeMenu}>
                داشبورد
              </Link>
            </li>

            <li>
              <Link
                href="/admin/products"
                onClick={closeMenu}
                className="hover:underline decoration-2 underline-offset-4"
              >
                محصولات
              </Link>
            </li>

            <li>
              <Link href="/admin/orders" onClick={closeMenu}>
                سفارشات
              </Link>
            </li>

            <li>
              <Link href="" onClick={closeMenu}>
                مشتریان
              </Link>
            </li>

            <li>
              <Link href="" onClick={closeMenu}>
                موجودی کالا
              </Link>
            </li>

            <li>
              <Link href="" onClick={closeMenu}>
                گزارشات
              </Link>
            </li>
            <li>
              <Link href="" onClick={closeMenu}>
                حساب ها
              </Link>
            </li>
            <li>
              <Link href="" onClick={closeMenu}>
                تبلیغات فروش
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
