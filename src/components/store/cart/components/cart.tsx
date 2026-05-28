"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCart, removeCartItem } from "@/redux/features/cart/cartSlice";
import trash from "@/assets/svg/trash2.svg";
import emptyCart from "@/assets/svg/NoItemsCart (1).svg";
import { CartItem } from "../types/cart-type";
import { getCart } from "../services/get-cart.service";
import QuantityButton from "@/shared/buttons/quantity-button";
import CartProgress from "./cart-progress";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const cartItems = useAppSelector((state) => state.cart.items);
  const updateTotals = async () => {
    try {
      const response = await getCart();
      setCartData(response.data.items);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error("خطا", error);
    }
  };

  const loadCart = async () => {
    setLoading(true);
    try {
      const response = await getCart();
      setCartData(response.data.items);
      setTotalPrice(response.data.totalPrice);
      dispatch(fetchCart());
    } catch (error) {
      console.error("خطا", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth");
      return;
    }
    loadCart();
  }, [router]);

  const handleRemoveItem = async (itemId: string) => {
    try {
      await dispatch(removeCartItem(itemId)).unwrap();
      await updateTotals();
      dispatch(fetchCart());
    } catch (error) {
      console.error("خطا در حذف محصول", error);
    }
  };

  const handleQuantityChange = async () => {
    await updateTotals();
    dispatch(fetchCart());
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center text-gray-500">در حال بارگذاری...</div>
      </div>
    );
  }

  if (cartData.length === 0) {
    return (
      <div className="container mx-auto mt-11 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="relative w-70 h-50">
            <Image
              src={emptyCart}
              alt="سبد خرید خالی"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-lg font-bold text-gray">
            سبد خرید شما خالی است!
          </div>
          <div className=" font-bold text-gray-500 text-xs">
            برای مشاهده محصولات بیشتر به صفحه محصولات بروید
          </div>
          <Link
            href="/products"
            className="px-5 py-3 border border-gray-300 text-gray font-bold text-sm rounded-lg  hover:shadow-md"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-11 px-4">
      <div className="mb-2">
        <CartProgress />
      </div>
      <h3 className="font-bold text-xl mb-3">سبد خرید</h3>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartData.map((item) => {
                const cartItem = cartItems.find(
                  (ci: any) => ci.productId === item.product._id,
                );
                const quantity = cartItem?.quantity || item.quantity;
                const cartItemId = cartItem?._id || item._id;
                const itemTotal = item.product.price * quantity;
                return (
                  <div key={item._id} className="p-4">
                    <div className="flex flex-col gap-4 md:hidden">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                          <Image
                            src={`http://localhost:5000${item.product.images[1] || item.product.images[0]}`}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1">
                          <Link
                            href={`/products/${item.product._id}`}
                            className="font-bold  hover:text-light-cream transition line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <div className="text-sm text-gray-500 font-bold mt-1">
                            وزن :
                            {item.product.weight?.toLocaleString("FA-IR") ||
                              "—"}
                            گرم
                          </div>
                          <div className="text-sm text-light-cream font-bold mt-1">
                            قیمت واحد :{" "}
                            {item.product.price.toLocaleString("FA-IR")} تومان
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleRemoveItem(cartItemId)}
                            className="text-red-500 hover:text-red-700 transition"
                            title="حذف از سبد خرید"
                          >
                            <Image
                              src={trash}
                              alt="حذف"
                              width={20}
                              height={20}
                            />
                          </button>
                          <div className="text-center border border-gray-200 shadow shadow-light-green px-1 py-1.5 rounded-2xl">
                            <QuantityButton
                              productId={item.product._id}
                              quantity={quantity}
                              cartItemId={cartItemId}
                              onQuantityChange={handleQuantityChange}
                            />
                          </div>
                        </div>
                        <div className="font-bold text-light-cream">
                          {itemTotal.toLocaleString("FA-IR")} تومان
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border-gray-200 shadow shadow-light-green">
                          <Image
                            src={`http://localhost:5000${item.product.images[1] || item.product.images[0]}`}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/products/${item.product._id}`}
                            className="font-bold  hover:text-light-cream transition line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <div className="text-sm text-gray-500 font-bold mt-1">
                            وزن:
                            {item.product.weight?.toLocaleString("FA-IR") ||
                              "—"}
                            گرم
                          </div>
                          <div className="text-sm text-light-cream font-bold mt-1">
                            قیمت واحد :{" "}
                            {item.product.price.toLocaleString("FA-IR")} تومان
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-center">
                          <button
                            onClick={() => handleRemoveItem(cartItemId)}
                            className="text-red-500 hover:text-red-700 transition"
                            title="حذف از سبد خرید"
                          >
                            <Image
                              src={trash}
                              alt="حذف"
                              width={20}
                              height={20}
                              className="cursor-pointer"
                            />
                          </button>
                        </div>
                        <div className="text-center border border-gray-200 shadow shadow-light-green px-1 py-1.5 rounded-2xl ">
                          <QuantityButton
                            productId={item.product._id}
                            quantity={quantity}
                            cartItemId={cartItemId}
                            onQuantityChange={handleQuantityChange}
                          />
                        </div>
                        <div className="text-center font-bold text-gray">
                          {itemTotal.toLocaleString("FA-IR")} تومان
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:w-96">
          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
            <h2 className="font-bold mb-4 ">جزئیات سفارش</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-bold">قیمت کل : </span>
                <span className="font-bold">
                  {totalPrice.toLocaleString("FA-IR")} تومان
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-bold">
                  سود شما از خرید :{" "}
                </span>
                <span className="font-bold">۰ تومان</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-5">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-600">مجموع : </span>
                  <span className="text-green-700">
                    {totalPrice.toLocaleString("FA-IR")} تومان
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-light-green hover:bg-[#abb98c]  py-3 rounded-md font-bold transition mt-4 text-sm cursor-pointer"
              >
                ادامه جهت ثبت سفارش
              </button>

              <Link
                href="/products"
                className="bg-[#887150] hover:bg-[#7e694c]  block text-center text-white text-sm py-3 rounded-md font-bold cursor-pointer"
              >
                بازگشت به فروشگاه
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
