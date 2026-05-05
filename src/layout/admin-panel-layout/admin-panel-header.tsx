"use client";
import setting from "@/assets/svg/setting.svg";
import bell from "@/assets/svg/bell.svg";
import Image from "next/image";
import mobileSearch from "@/assets/svg/search.svg";
import AdminMobileMenu from "./mobile-menu-admin";
import { useState } from "react";
export default function AdminPanelHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full py-5 bg-light shadow shadow-blue flex justify-between px-5 lg:px-10">
      <div className="font-bold hidden md:block">
        به<strong className="text-light-orange"> پنل ادمین</strong> خوش آمدید
      </div>
      <div className="md:hidden flex gap-1 items-center">
        <AdminMobileMenu />
        <Image src={mobileSearch} alt="" width="28" height="28" />
      </div>
      <div className="flex gap-3 items-center">
        <div className="relative w-6 h-6">
          <Image src={bell} alt="" fill className="object-cover" />
        </div>
        <div className="relative w-6 h-6">
          <Image src={setting} alt="" fill className="object-cover" />
        </div>
      </div>
    </header>
  );
}
