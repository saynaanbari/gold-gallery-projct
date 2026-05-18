"use client";
import Image from "next/image";
import filter from "@/assets/svg/filter2.svg";
import { useState, useEffect } from "react";
import Menu from "./menu";

export default function ProductMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      <button
        className="flex items-center gap-1.5"
        onClick={() => setIsOpen(true)}
      >
        <Image src={filter} alt="" className="w-6 h-6" />
        <div className="font-bold text-sm">فیلتر محصولات</div>
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-90" onClick={closeMenu} />
      )}
      <div
        className={`fixed top-0 right-0 h-screen bg-white px-3 z-90 shadow-xl
        transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex-1 overflow-y-auto pt-1.5">
          <Menu />
        </div>
      </div>
    </div>
  );
}