"use client";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import lock from "@/assets/svg/lock.svg";
import Image from "next/image";
import { api } from "@/api/axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { LoginRequest } from "@/types/login-type";

export default function AdminLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await api.post("/auth/login", data);
      const result = response.data;
      Cookies.set("token", result.data.token, {
        expires: 1,
      });

      Cookies.set("role", result.data.user.role, {
        expires: 1,
      });
      toast.success("با موفقیت وارد شدید");
      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      className="w-100 h-fit p-5 flex flex-col items-center gap-5 bg-linear-to-br from-[#E8F1FF] via-[#D4E4FF] to-[#BFD3FF] rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-11 h-11 bg-[#0A1F4A] flex justify-center items-center rounded-xl">
        <Image src={lock} alt={""} className="w-8 h-8" />
      </div>
      <div className="w-full flex flex-col gap-2 items-center">
        <div className="font-bold text-2xl">ورود مدیر به سیستم</div>
        <div className="font-bold text-gray-600 text-[11px]">
          ایمیل و رمز عبور خودرا وارد کنید
        </div>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="relative flex flex-col gap-1">
          <input
            {...register("email", {
              required: "ایمیل الزامی است",
              pattern: {
                value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
                message: "فرمت ایمیل صحیح نیست",
              },
            })}
            type="email"
            className="rounded-xl border border-gray-300 text-xs font-bold placeholder:text-[11px]  pr-2 py-3  placeholder:text-gray-400 placeholder:font-bold outline-blue bg-[#E8F0FE]"
            placeholder="ایمیل"
          />
          {errors.email && (
            <p className="text-[#D54062] text-[10px] font-bold absolute -bottom-4">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 relative">
          <input
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: { value: 6, message: "حداقل 6 کارکتر" },
            })}
            type="password"
            className="rounded-xl border border-gray-300 text-xs font-bold placeholder:text-[11px] pr-2 py-3  placeholder:text-gray-400 placeholder:font-bold outline-blue bg-[#E8F0FE]"
            placeholder="رمز عبور"
          />
          {errors.password && (
            <p className="text-[#D54062] text-[10px] font-bold absolute -bottom-4">
              {errors.password.message}
            </p>
          )}
        </div>
        <button className="py-3 text-sm cursor-pointer w-full bg-linear-to-r from-[#D54062] via-[#C23A59] to-[#B83253] hover:bg-[linear-gradient(to_right,#BF3857,#A9324C,#9F2945)] transition-all duration-300 rounded-xl text-white font-bold">
          ورود به پنل ادمین
        </button>
      </div>
      <p className="text-center font-bold text-gray-600 text-[11px]">
        ورود فقط برای پرسنل مجازاست
      </p>
    </form>
  );
}
