// import "swiper/css";
// import "swiper/css/autoplay";
"use client";
import Image from "next/image";
import cart from "@/assets/svg/cart-outline.svg";
import { ProductType } from "@/types/product-type";
import AddButton from "../buttons/add-button";
import Link from "next/link";
import QuantityButton from "../buttons/quantity-button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { fetchCart, addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function ProductsCard({ item }: { item: ProductType }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const isLoading = useAppSelector((state) => state.cart.isLoading);

  const cartItem = cartItems.find(
    (cartItem: any) => cartItem.productId === item._id,
  );
  const quantity = cartItem?.quantity || 0;
  const cartItemId = cartItem?._id || null;

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const token = Cookies.get("token");

    if (!token) {
      router.push("/auth");
      return;
    }

    try {
      await dispatch(addToCart({ productId: item._id, quantity: 1 })).unwrap();
      dispatch(fetchCart());
    } catch (error) {
      console.error("خطا در افزودن به سبد خرید", error);
    }
  };
  return (
    <Link href={`/products/${item._id}`}>
      <div className="bg-white border border-gray-200 shadow rounded-xl p-3 hover:-translate-y-0.5 hover:transition-all duration-500 ease-in-out ">
        <div className="relative w-full h-75 shadow rounded-xl overflow-hidden">
          <Image
            src={`http://localhost:5000${item.images[1] || item.images[0]}`}
            alt={""}
            fill
            className="object-cover cursor-pointer hover:opacity-10 transition-opacity duration-500"
            unoptimized
          />
          <Image
            src={`http://localhost:5000${item.images[0]}`}
            alt={""}
            fill
            className="object-cover cursor-pointer absolute hover:opacity-0 transition-opacity duration-500"
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-5 mt-3">
          <div className="text-center">
            <h3 className="font-bold">{item.name}</h3>
          </div>
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-1 text-white cursor-pointer bg-[#a9bd86] hover:bg-[#9daf7d] px-3 py-2 rounded-lg">
              {quantity === 0 ? (
                <>
                  <Image src={cart} alt={""} width={18} height={18} />
                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className="font-bold text-xs whitespace-nowrap cursor-pointer"
                  >
                    افزودن به سبد
                  </button>
                </>
              ) : (
                <QuantityButton
                  productId={item._id}
                  quantity={quantity}
                  cartItemId={cartItemId}
                />
              )}
            </div>
            <h3 className="font-bold text-sm">
              {item.price.toLocaleString("FA-IR")} تومان{" "}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
