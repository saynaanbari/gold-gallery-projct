"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import eye from "@/assets/svg/eye.svg";
import eyeSlash from "@/assets/svg/eye-slash.svg";
import Image from "next/image";
import { useState } from "react";
import { LoginRequest } from "../types/login-data";
import { loginService } from "../services/login.service";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const [showPassword, setShowPassword] = useState(false);
  const { refreshAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const response = await loginService(data);
      const result = response.data;
      if (result.user.role === "admin") {
        toast.error("لطفا از پنل مدیریت وارد شوید");
        return;
      }
      Cookies.set("token", result.token, { expires: 1 });
      Cookies.set("refreshToken", result.refreshToken, { expires: 7 });
      Cookies.set("role", result.user.role, { expires: 1 });
      localStorage.setItem("name", result.user.name);
      refreshAuth();
      toast.success(`${result.user.name} عزیز خوش آمدی`);
      router.replace("/");
      console.log(data);
    } catch (error) {
      toast.error("ایمیل یا رمز عبور صحیح نیست");
      return;
    }
  };
  return (
    <form
      className="w-100 p-5 flex flex-col gap-4 bg-[#FDFDFD] rounded-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <div className="font-bold">به مه گلد خوش آمدید!</div>
        <div className="font-bold text-xs text-light-cream">
          برای ورود به حساب کاربری ایمیل و رمز عبور خودرا وارد کنید
        </div>
      </div>
      <div className="flex flex-col gap-6">
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
            className="border border-gray-300 text-xs font-bold placeholder:text-[11px] pr-2 py-3 rounded-sm placeholder:text-gray-400 placeholder:font-bold outline-light-cream"
            placeholder="ایمیل"
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] font-bold absolute -bottom-4">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 relative">
          <input
            {...register("password", {
              required: "رمز عبور الزامی است",
            })}
            type={showPassword ? "text" : "password"}
            className="border border-gray-300 text-xs font-bold pr-2 pl-9 py-3 rounded-sm outline-light-cream"
            placeholder="رمز عبور"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <Image src={eyeSlash} alt={""} />
            ) : (
              <Image src={eye} alt={""} />
            )}
          </button>

          {errors.password && (
            <p className="text-red-500 text-[10px] font-bold absolute -bottom-4">
              {errors.password.message}
            </p>
          )}
        </div>
        <button className="font-bold bg-[#333333] text-white py-3.5 rounded-sm text-sm cursor-pointer hover:bg-[#4D4D4D]">
          ورود
        </button>
        <div className="flex gap-2 items-center text-[#333333]">
          <div className="text-xs font-bold">حساب کاربری ندارید؟</div>
          <button
            className="text-xs font-bold text-light-cream cursor-pointer"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("status", "register");
              window.history.pushState(null, "", `?${params.toString()}`);
            }}
          >
            ثبت نام
          </button>
        </div>
      </div>
    </form>
  );
}