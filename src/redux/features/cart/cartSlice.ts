import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import Cookies from "js-cookie";

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalCount: number;
  isLoading: boolean;
}

const initialState: CartState = {
  items: [],
  totalCount: 0,
  isLoading: false,
};

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const token = Cookies.get("token");
  if (!token) return [];

  const response = await api.get("/cart");
  const items = response.data?.data?.items || [];
  return items.map((item: any) => ({
    _id: item._id,
    productId: item.product._id,
    quantity: item.quantity,
  }));
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await api.post("/cart/add", { productId, quantity });
    return response.data;
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
    const response = await api.put(`/cart/update/${itemId}`, { quantity });
    return response.data;
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/remove",
  async (itemId: string) => {
    const response = await api.delete(`/cart/remove/${itemId}`);
    return response.data;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalCount = action.payload.reduce(
          (sum: any, item: any) => sum + item.quantity,
          0,
        );
        state.isLoading = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeCartItem.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;