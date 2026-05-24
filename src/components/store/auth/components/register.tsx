"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterDataType } from "../types/register-data";
import { useState } from "react";
import eye from "@/assets/svg/eye.svg";
import eyeSlash from "@/assets/svg/eye-slash.svg";
import Image from "next/image";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import { registerService } from "../services/register.service";
import { useRouter } from "next/navigation";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>();

  const onSubmit: SubmitHandler<RegisterDataType> = async (data) => {
    try {
      const response = await registerService(data);
      const result = response.data;
      Cookies.set("token", result.token, { expires: 1 });
      Cookies.set("refreshToken", result.refreshToken, { expires: 7 });
      Cookies.set("role", result.user.role, { expires: 1 });
      localStorage.setItem("name", result.user.name);
      refreshAuth();
      toast.success("ثبت نام شما با موفقیت انجام شد");
      router.replace("/");
    } catch (error) {
      toast.error("ثبت‌نام ناموفق بود");
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
          برای عضویت در فروشگاه، اطلاعات زیر را تکمیل کنید
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="relative flex flex-col gap-1">
          <input
            {...register("name", {
              required: "نام کاربری الزامی است",
            })}
            type="text"
            className="border border-gray-300 text-xs font-bold placeholder:text-[11px]  pr-2 py-3 rounded-sm placeholder:text-gray-400 placeholder:font-bold outline-light-cream"
            placeholder="نام کاربری"
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] font-bold absolute -bottom-4">
              {errors.name.message}
            </p>
          )}
        </div>
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
            className="border border-gray-300 text-xs font-bold placeholder:text-[11px]  pr-2 py-3 rounded-sm placeholder:text-gray-400 placeholder:font-bold outline-light-cream"
            placeholder="ایمیل"
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] font-bold absolute -bottom-4">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <input
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: { value: 6, message: "حداقل 6 کارکتر" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                message: "رمز باید شامل حروف بزرگ، کوچک و عدد باشد",
              },
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
        <div className="relative flex flex-col gap-1">
          <input
            {...register("phone", {
              required: "شماره تلفن الزامی است",
              pattern: {
                value: /^09[0-9]{9}$/,
                message: "شماره موبایل باید 11 رقم و با 09 شروع شود",
              },
            })}
            type="text"
            className="border border-gray-300 text-xs font-bold placeholder:text-[11px]  pr-2 py-3 rounded-sm placeholder:text-gray-400 placeholder:font-bold outline-light-cream"
            placeholder="شماره تلفن "
          />
          {errors.phone && (
            <p className="text-red-500 text-[10px] font-bold absolute -bottom-4">
              {errors.phone.message}
            </p>
          )}
        </div>
        <button className="font-bold bg-[#333333] text-white py-3.5 rounded-sm text-sm cursor-pointer hover:bg-[#4D4D4D]">
          ثبت نام
        </button>
      </div>
    </form>
  );
}