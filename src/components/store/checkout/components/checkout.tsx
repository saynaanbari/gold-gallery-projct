"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { getCart } from "../../cart/services/get-cart.service";
import { CartItem } from "../../cart/types/cart-type";
import CheckoutProgress from "./checkout-progress";
import location from "@/assets/svg/checkout-location.svg";
import time from "@/assets/svg/time.svg";
import truck from "@/assets/svg/truck2.svg";
import { useAppDispatch } from "@/redux/hooks";
import { fetchCart } from "@/redux/features/cart/cartSlice";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryTime: "morning",
    deliveryMethod: "express",
  });
  const deliveryFee = formData.deliveryMethod === "express" ? 150000 : 200000;

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
      router.push("/auth");
      return;
    }

    const loadCart = async () => {
      try {
        const response = await getCart();
        setCartData(response.data.items);
        setTotalPrice(response.data.totalPrice);
        dispatch(fetchCart());
      } catch (error) {
        console.error("خطا در بارگذاری سبد خرید", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      toast.error("لطفاً برای ادامه، تمامی فیلدها را با دقت پر کنید.");
      return;
    }

    const finalData = {
      ...formData,
      items: cartData,
      totalPrice,
      deliveryFee,
      finalPrice: totalPrice + deliveryFee,
    };

    localStorage.setItem("checkoutForm", JSON.stringify(finalData));

    router.push("/payment");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-[#337a5a] font-bold">
        در حال بارگذاری...
      </div>
    );
  }

  if (cartData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-xl font-bold text-gray-400 mb-6">
          سبد خرید شما خالی است
        </div>
        <Link
          href="/"
          className="bg-light-green text-white px-8 py-3 rounded-full font-bold transition-all hover:shadow-lg"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      <CheckoutProgress />

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl shadow shadow-light-cream border border-gray-100 p-6">
            <h2 className="font-bold mb-4 flex items-center gap-2 text-gray-700">
              <span className="w-2 h-6 bg-light-green rounded-full"></span>
              جزئیات سفارش
            </h2>
            <div className="flex gap-4 overflow-x-auto p-2 px-4 shadow rounded-2xl scrollbar-hide bg-light">
              {cartData.map((item) => (
                <div key={item._id} className="shrink-0 w-24">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <Image
                      src={`http://localhost:5000${item.product.images[1] || item.product.images[0]}`}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <span className="absolute bottom-1 right-1 bg-white/90 text-[10px] font-black px-1.5 rounded-md border border-gray-200">
                      {item.quantity.toLocaleString("FA-IR")}x
                    </span>
                  </div>
                  <p className="text-[10px] mt-2 text-gray-500 truncate font-bold">
                    {item.product.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5">
            <div className="bg-white shadow p-7 shadow-light-cream rounded-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-orange-100 w-8 h-8 flex justify-center items-center rounded-md">
                  <Image
                    src={location}
                    alt={"location"}
                    width={22}
                    height={22}
                  />
                </div>
                <h2 className=" font-bold  text-gray-700">
                  اطلاعات تحویل و آدرس
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray mb-2 mr-1">
                    نام و خانوادگی گیرنده :
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-light border border-orange-200 focus:border-orange-300 focus:bg-white rounded-xl p-2 outline-none transition-all text-sm text-gray placeholder:text-xs placeholder:text-gray-400 font-bold"
                    placeholder="مثلا: رضا رضایی"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray mb-2 mr-1">
                    شماره تماس :
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-light border border-orange-200 focus:border-orange-300  focus:bg-white rounded-xl p-2 outline-none transition-all text-sm text-gray  placeholder:text-gray-400 font-bold"
                    placeholder="۰۹۱۲xxxxxxx"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray mb-2 mr-1">
                    آدرس دقیق پستی :
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-light border border-orange-200 focus:border-orange-300  focus:bg-white rounded-xl p-2 outline-none transition-all text-sm text-gray  placeholder:text-gray-400 placeholder:text-xs font-bold"
                    placeholder="استان، شهر، خیابان..."
                  />
                </div>
              </div>
            </div>
            <div className="bg-white shadow p-7 shadow-light-cream rounded-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-100 w-8 h-8 flex justify-center items-center rounded-md">
                  <Image src={time} alt={"time"} width={20} height={20} />
                </div>
                <h2 className=" font-bold text-gray-700">انتخاب زمان ارسال</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["morning", "afternoon"].map((t) => (
                  <label
                    key={t}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.deliveryTime === t ? "border-[#dbeafe] bg-gray-50" : "border-gray-100 hover:border-gray-200"}`}
                  >
                    <span className="text-xs font-bold">
                      {t === "morning" ? "۹ تا ۱۳ (صبح)" : "۱۴ تا ۱۸ (عصر)"}
                    </span>
                    <input
                      type="radio"
                      name="deliveryTime"
                      value={t}
                      checked={formData.deliveryTime === t}
                      onChange={handleInputChange}
                      className="accent-[#3777cc]"
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-white shadow p-7 shadow-light-cream rounded-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-yellow-100 w-8 h-8 flex justify-center items-center rounded-md">
                  <Image src={truck} alt={"truck"} width={20} height={20} />
                </div>
                <h2 className=" font-bold text-gray-700">روش ارسال</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {[
                  {
                    id: "express",
                    label: "ارسال اکسپرس (امروز)",
                    price: "۱۵۰٬۰۰۰",
                  },
                  {
                    id: "normal",
                    label: "ارسال معمولی (۲ روز کاری)",
                    price: "۲۰۰٬۰۰۰",
                  },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.deliveryMethod === method.id
                        ? "border-[#f59e0b] bg-gray-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col text-right">
                      <span className="block text-[12px] font-bold text-gray-800">
                        {method.label}
                      </span>
                      <span className="text-xs text-gray-500 mt-2 block font-bold">
                        {method.price} تومان
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={method.id}
                      checked={formData.deliveryMethod === method.id}
                      onChange={handleInputChange}
                      className="accent-[#d4711f]"
                    />
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="lg:w-96">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className=" font-bold mb-6 text-gray">خلاصه پرداخت</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span className="font-bold text-gray-600">قیمت کالاها : </span>
                <span className="font-bold text-gray-600">
                  {totalPrice.toLocaleString("FA-IR")} تومان
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span className="font-bold text-gray-600">هزینه ارسال : </span>
                <span className="font-bold text-gray-600">
                  {deliveryFee.toLocaleString("FA-IR")} تومان
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-700">
                  مبلغ نهایی پرداخت :{" "}
                </span>
                <span className="font-black text-xl text-gray">
                  {(totalPrice + deliveryFee).toLocaleString("FA-IR")}{" "}
                  <small className="text-[10px] font-bold text-gray-600">
                    تومان
                  </small>
                </span>
              </div>
            </div>
            <button
              onClick={handlePaymentSubmit}
              type="button"
              className="w-full mt-8 bg-light-green py-3 rounded-xl font-bold shadow shadow-green-900/10 transition-all transform active:scale-[0.98] text-sm cursor-pointer"
            >
              تایید و ادامه پرداخت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
