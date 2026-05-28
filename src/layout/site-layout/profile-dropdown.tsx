"use client";
import { useEffect, useRef, useState } from "react";
import profile from "@/assets/svg/profile-2.svg";
import loginProfile from "@/assets/svg/login-account.svg";
import Image from "next/image";
import order from "@/assets/svg/profile-order.svg";
import wishlist from "@/assets/svg/profile-wishlist.svg";
import wallet from "@/assets/svg/profile-wallet.svg";
import exit from "@/assets/svg/profile-exit.svg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import LogoutModal from "./logout-modal";
import { useAppDispatch } from "@/redux/hooks";
import { resetCart } from "@/redux/features/cart/cartSlice";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("role", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    dispatch(resetCart());
    refreshAuth();
    setIsOpen(false);
    router.push("/");
  };

  const handleLogoutBtn = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-7 h-7 flex items-center justify-center outline-none"
      >
        <Image
          src={loginProfile}
          alt="پروفایل کاربری"
          fill
          className="object-cover cursor-pointer"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-50 bg-white shadow-lg rounded-md border border-gray-100 z-50">
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1.5 border-b border-b-gray-100 py-2.5 px-2 hover:bg-light cursor-pointer duration-150"
          >
            <Image src={profile} alt="مشخصات" width={20} height={20} />
            <div className="font-bold text-gray text-xs">مشخصات کاربری</div>
          </Link>

          <Link
            href="/orders"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1.5 border-b border-b-gray-100 py-2.5 px-2 hover:bg-light cursor-pointer duration-150"
          >
            <Image src={order} alt="سفارش‌ها" width={20} height={20} />
            <div className="font-bold text-gray text-xs">سفارش های من</div>
          </Link>

          <Link
            href=""
            // onClick={() => setIsOpen(false)}
            className="flex items-center gap-1.5 border-b border-b-gray-100 py-2.5 px-2 hover:bg-light cursor-pointer duration-150"
          >
            <Image src={wishlist} alt="علاقه‌مندی‌ها" width={20} height={20} />
            <div className="font-bold text-gray text-xs">علاقه مندی ها</div>
          </Link>
          <Link
            href=""
            // onClick={() => setIsOpen(false)}
            className="flex items-center gap-1.5 border-b border-b-gray-100 py-2.5 px-2 hover:bg-light cursor-pointer duration-150"
          >
            <Image src={wallet} alt="کیف پول" width={20} height={20} />
            <div className="font-bold text-gray text-xs">کیف پول</div>
          </Link>
          <button
            onClick={handleLogoutBtn}
            className="w-full flex items-center gap-1.5 py-2.5 px-2 hover:bg-light cursor-pointer duration-150"
          >
            <Image src={exit} alt="خروج" width={20} height={20} />
            <div className="font-bold text-xs text-red-600">خروج از حساب</div>
          </button>
        </div>
      )}
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
