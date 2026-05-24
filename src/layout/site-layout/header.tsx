"use client"
import Image from "next/image";
import profile from "@/assets/svg/account.svg";
import cart from "@/assets/svg/cart-shopping.svg";
import search from "@/assets/svg/search.svg";
import heart from "@/assets/svg/heart.svg";
import logo from "@/assets/images/Logo-1.webp";
import Link from "next/link";
import Nav from "./nav";
import MobileMenu from "./mobile-menu";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function Header() {
  const { token, isLoading } = useAuth();
   const pathname = usePathname();
   const hideHeader = ["/auth"];
   if (hideHeader.includes(pathname)) return null;
  return (
    <header className="sticky top-0 left-0 z-70">
      <div className="w-full h-20 lg:h-22 bg-light shadow flex justify-between items-center px-5 md:px-10">
        <div className="flex-1 flex justify-start">
          <div className="lg:hidden">
            <MobileMenu />
          </div>
          <div className="hidden lg:flex gap-2 items-center border-b border-[#333333] h-11 w-80 px-2">
            <Image
              src={search}
              alt=""
              className="hidden lg:block"
              width="23"
              height="23"
            />
            <input
              type="text"
              className="outline-0 placeholder:text-xs placeholder:font-bold placeholder:text-[#333333]"
              placeholder="جست و جو در فروشگاه"
            />
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-30 h-15 lg:w-60">
            <Image src={logo} alt="" fill className="object-cover" />
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center gap-1 md:gap-2">
          <div className="relative w-6 h-6 cursor-pointer lg:hidden">
            <Image src={search} alt="" fill className="object-cover" />
          </div>
          <Link
            href=""
            className="hidden lg:block relative w-6 h-6 cursor-pointer"
          >
            <Image src={heart} alt="" fill className="object-cover" />
          </Link>

          <Link href="/cart" className="relative w-6 h-6 cursor-pointer">
            <Image src={cart} alt="" fill className="object-cover" />
          </Link>
          <Link href="/auth" className="relative cursor-pointer">
            <Image
              src={profile}
              alt="ورود"
              className="md:hidden"
              width={28}
              height={28}
            />
            <button className="hidden md:block text-xs text-gray font-bold border border-light-green px-3 py-1.5 rounded-sm cursor-pointer">
              ورود | عضویت
            </button>
          </Link>
        </div>
      </div>
      <Nav />
    </header>
  );
}
