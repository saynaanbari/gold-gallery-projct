"use client";
import Image from "next/image";
import menu from "@/assets/svg/menu01.svg";
import logo from "@/assets/images/logo-black.png";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
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
        className={`fixed top-0 right-0 w-1/2 h-screen bg-white z-50 shadow transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className=" px-7 py-6 flex flex-col gap-5">
          <div className="w-full border-b flex justify-between items-center pb-6">
            <Image src={logo} alt={""} width="45" height="45" />
            <button
              className="font-bold text-2xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <ul className="flex flex-col gap-7 font-bold">
            <li>
              <Link href="/" onClick={closeMenu}>
                خانه
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                onClick={closeMenu}
                className="hover:underline decoration-2 underline-offset-4"
              >
                فروشگاه
              </Link>
            </li>

            <li>
              <Link href="/cart" onClick={closeMenu}>
                سبد خرید
              </Link>
            </li>

            <li>
              <Link href="/about-us" onClick={closeMenu}>
                درباره ما
              </Link>
            </li>

            <li>
              <Link href="/contact-us" onClick={closeMenu}>
                ارتباط با ما
              </Link>
            </li>

            <li>
              <Link href="/register" onClick={closeMenu}>
                ثبت نام
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
