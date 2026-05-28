"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // اضافه شده
import { getCart } from "@/components/store/cart/services/get-cart.service";

import {
  ArrowLeftRight,
  CreditCard,
  Globe,
  RefreshCw,
  Smartphone,
  TimerReset,
  Wallet,
} from "lucide-react";
import { createOrder } from "../../orders/services/create-order.service";

export default function PaymentGatewayPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderData, setOrderData] = useState<any>(null);
  const [remainingTime, setRemainingTime] = useState(10 * 60 + 48);

  // تنظیمات react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadData = async () => {
      try {
        const cart = await getCart();
        setTotalPrice(cart.data.totalPrice);
        const savedForm = localStorage.getItem("checkoutForm");
        if (savedForm) {
          setOrderData(JSON.parse(savedForm));
        } else {
          router.push("/checkout");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [router]);

  useEffect(() => {
    if (remainingTime <= 0) return;
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingTime]);

  const formattedTime = useMemo(() => {
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }, [remainingTime]);
  const onSubmit = async () => {
    if (!orderData) return;
    try {
      await createOrder({
        shippingAddress: {
          name: orderData.name,
          phone: orderData.phone,
          address: orderData.address,
        },
        paymentMethod: "cash",
      });
      router.push("/payment/success");
    } catch (error) {
      alert("خطا در ثبت سفارش");
    }
  };

  const handlePaymentCancel = () => {
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7fb] px-4">
        <div className="text-gray-500">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] lg:flex lg:items-center lg:justify-center p-5 md:p-10 lg:p-2">
      <div className="max-w-6xl lg:w-250 mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden h-fit flex flex-col">
          <div className="border-b border-b-gray-200 bg-white shrink-0">
            <div className="flex items-center justify-between px-4 sm:px-8 py-4">
              <div className="text-center flex-1">
                <h1 className="text-sm sm:text-xl font-bold text-gray">
                  درگاه پرداخت اینترنتی
                </h1>
                <p className="text-[11px] sm:text-sm text-slate-400 mt-1">
                  پرداخت امن و سریع
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
            <aside className="order-2 lg:order-1 bg-[#fbfcfe] border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col">
              <div className="px-4 sm:px-6 pt-6 pb-6 space-y-5 flex-1">
                <div className="bg-[#eaf2ff] rounded-xl px-4 h-11 flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[#2f76e8] font-bold">
                    زمان باقی‌مانده:
                  </span>
                  <div className="flex items-center gap-2 text-[#2f76e8] font-bold">
                    <span className="tabular-nums">{formattedTime}</span>
                    <TimerReset className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-400 mb-1">
                        پذیرنده :{" "}
                      </div>
                      <div className="font-bold text-slate-700">مه گلد</div>
                    </div>
                    <Wallet className="w-5 h-5 text-slate-300 mt-1" />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-400 mb-1">مبلغ : </div>
                      <div className="font-extrabold text-slate-800 tabular-nums">
                        {orderData?.finalPrice?.toLocaleString("fa-IR")} تومان
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-slate-300 mt-1" />
                  </div>
                  <hr className="border-slate-100" />
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-right">
                        <div className="text-slate-400 text-[11px]">
                          شماره ترمینال
                        </div>
                        <div className="font-bold text-slate-600 text-sm mt-0.5">
                          ۱۶۸۸۰۵۳۵
                        </div>
                      </div>
                      <ArrowLeftRight className="w-4 h-4 text-slate-300 mt-1" />
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-right">
                        <div className="text-slate-400 text-[11px]">
                          سایت پذیرنده
                        </div>
                        <div className="font-bold text-slate-600 text-sm mt-0.5">
                          mahgold.com
                        </div>
                      </div>
                      <Globe className="w-4 h-4 text-slate-300 mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="order-1 lg:order-2 p-4 sm:p-6 lg:pt-6 lg:px-8 lg:pb-8"
            >
              <div className="mb-6">
                <div className="bg-[#eef5ff] rounded-xl px-4 h-11 flex items-center text-[#2f76e8] font-medium text-sm">
                  اطلاعات کارت خود را وارد کنید
                </div>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-600 mb-2">
                    شماره کارت
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2f76e8]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <input
                      {...register("cardNumber", { required: true })}
                      type="text"
                      placeholder="ــــ ــــ ــــ ــــ"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-white pr-10 pl-4 outline-none transition focus:border-[#2f76e8] text-sm tracking-widest"
                    />
                  </div>
                  {errors.cardNumber && (
                    <span className="absolute -bottom-5 right-0 text-[10px] text-red-500 font-bold">
                      شماره کارت الزامی است
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-600 mb-2">
                      CVV2
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2f76e8]">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <input
                        {...register("cvv2", { required: true })}
                        type="text"
                        placeholder="کد ۳ یا ۴ رقمی"
                        className="w-full h-11 rounded-xl border border-slate-200 bg-white pr-10 pl-4 outline-none transition focus:border-[#2f76e8] text-sm placeholder:text-xs placeholder:font-bold"
                      />
                    </div>
                    {errors.cvv2 && (
                      <span className="absolute -bottom-5 right-0 text-[10px] text-red-500 font-bold">
                        شماره شناسایی دوم (CVV2) الزامی است
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-600 mb-2">
                      تاریخ انقضا
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        {...register("expiryMonth", { required: true })}
                        type="text"
                        placeholder="ماه"
                        className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 outline-none transition focus:border-[#2f76e8] text-center text-sm placeholder:text-xs placeholder:font-bold"
                      />
                      <input
                        {...register("expiryYear", { required: true })}
                        type="text"
                        placeholder="سال"
                        className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 outline-none transition focus:border-[#2f76e8] text-center text-sm placeholder:text-xs placeholder:font-bold"
                      />
                    </div>
                    {(errors.expiryMonth || errors.expiryYear) && (
                      <span className="absolute -bottom-5 right-0 text-[10px] text-red-500 font-bold">
                        تاریخ انقضا الزامی است
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-slate-600 mb-2">
                    کد امنیتی
                  </label>
                  <div className="grid grid-cols-[120px_44px_1fr] gap-2 items-center">
                    <div className="h-11 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-[#2f76e8] font-extrabold tracking-[0.2em] text-xl select-none">
                      85282
                    </div>
                    <button
                      type="button"
                      className="h-11 flex items-center justify-center text-[#2f76e8] rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <input
                      {...register("captcha", { required: true })}
                      type="text"
                      placeholder="کد امنیتی"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 outline-none transition focus:border-[#2f76e8] text-sm placeholder:text-xs placeholder:font-bold"
                    />
                  </div>
                  {errors.captcha && (
                    <span className="absolute -bottom-5 right-0 text-[10px] text-red-500 font-bold">
                      کد امنیتی الزامی است
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="save-card"
                    className="w-4 h-4 accent-[#2f76e8] cursor-pointer"
                    defaultChecked
                  />
                  <label
                    htmlFor="save-card"
                    className="text-xs text-slate-600 cursor-pointer font-bold"
                  >
                    ذخیره شماره کارت
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    className="h-11 rounded-xl bg-[#17c39b] text-white font-bold text-sm shadow-md hover:bg-[#12b08b] transition cursor-pointer"
                  >
                    پرداخت نهایی
                  </button>
                  <button
                    type="button"
                    onClick={handlePaymentCancel}
                    className="h-11 rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer font-bold text-red-500 text-sm"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
