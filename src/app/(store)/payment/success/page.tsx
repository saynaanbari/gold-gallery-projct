"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { fetchCart } from "@/redux/features/cart/cartSlice";
import { CheckCircle2, Home, ArrowLeft } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    dispatch(fetchCart());
    const duration = 4000;
    const interval = 40;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - step : 0));
    }, interval);

    const redirect = setTimeout(() => {
      router.push("/");
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [dispatch, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-light p-4">
      <div className="max-w-105 w-full">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden transition-all hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
          <div
            className="h-2 bg-[#17c39b]"
            style={{ width: `${progress}%`, transition: "width 40ms linear" }}
          />
          <div className="p-8 sm:p-12 text-center">
            <div className="relative mx-auto w-24 h-24 mb-8">
              <div className="absolute inset-0 bg-[#17c39b]/10 rounded-full animate-ping" />
              <div className="relative flex items-center justify-center w-24 h-24 bg-[#17c39b] rounded-full shadow">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <p className="text-xl font-black text-slate-800 mb-3">
              پرداخت موفقیت‌آمیز
            </p>
            <p className="text-slate-400 font-medium mb-8 leading-relaxed text-sm">
              سفارش شما با موفقیت ثبت شد و در مرحله پردازش قرار گرفت. از خرید
              شما سپاسگزاریم.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 mb-8 flex items-center justify-between border border-slate-100">
              <span className="text-slate-400 text-sm font-bold">
                وضعیت تراکنش
              </span>
              <span className="text-[#17c39b] font-bold text-sm bg-[#17c39b]/10 px-3 py-1 rounded-full">
                تایید شده
              </span>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/")}
                className="w-full h-10 bg-slate-900 text-xs text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                <Home className="w-4 h-4 text-white" />
                بازگشت به صفحه اصلی
              </button>

              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold pt-2">
                <span>انتقال خودکار تا لحظاتی دیگر</span>
                <ArrowLeft className="w-3 h-3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}