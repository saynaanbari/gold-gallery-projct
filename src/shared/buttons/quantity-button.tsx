"use client";
import {
  updateCartItem,
  removeCartItem,
  fetchCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

interface QuantityButtonProps {
  productId: string;
  quantity: number;
  cartItemId: string | null;
  onQuantityChange?: () => void;
}

export default function QuantityButton({
  productId,
  quantity,
  cartItemId,
  onQuantityChange,
}: QuantityButtonProps) {
  const dispatch = useAppDispatch();
  const [localLoading, setLocalLoading] = useState(false);

  const handleDecrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItemId || localLoading) return;

    setLocalLoading(true);
    try {
      if (quantity === 1) {
        await dispatch(removeCartItem(cartItemId)).unwrap();
      } else {
        await dispatch(
          updateCartItem({ itemId: cartItemId, quantity: quantity - 1 }),
        ).unwrap();
      }
      await dispatch(fetchCart());
      if (onQuantityChange) {
        await onQuantityChange();
      }
    } catch (error) {
      console.error("خطا", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleIncrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItemId || localLoading) return;

    setLocalLoading(true);
    try {
      await dispatch(
        updateCartItem({ itemId: cartItemId, quantity: quantity + 1 }),
      ).unwrap();
      await dispatch(fetchCart());
      if (onQuantityChange) {
        await onQuantityChange();
      }
    } catch (error) {
      console.error("خطا", error);
    } finally {
      setLocalLoading(false);
    }
  };

  if (quantity === 0) return null;

  return (
    <div
      className="flex items-center gap-2"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        onClick={handleIncrease}
        disabled={localLoading}
        className="font-black text-sm cursor-pointer hover:bg-light-green/50 px-1 min-w-6 disabled:opacity-50"
      >
        +
      </button>
      <span className="text-xs font-bold min-w-6 text-center">
        {quantity.toLocaleString("FA-IR")}
      </span>

      <button
        onClick={handleDecrease}
        disabled={localLoading}
        className="font-black text-sm cursor-pointer hover:bg-light-green/50 px-1 min-w-6 disabled:opacity-50"
      >
        -
      </button>
    </div>
  );
}
