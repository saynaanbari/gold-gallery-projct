"use client";
import Login from "@/components/store/auth/components/login";
import Register from "@/components/store/auth/components/register";
import authImg from "@/assets/images/auth-background1.jpg";
import { useSearchParams } from "next/navigation";

export default function Auth() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "login";
  return (
    <div
      className="w-full h-screen absolute top-0 left-0 z-80 flex flex-col items-center md:justify-center gap-5 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${authImg.src})` }}
    >
      <div className="py-20">
        {status === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}
