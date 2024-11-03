import { TLoading, TProduct, isString } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByItems from "./act/actGetProductsByItems";
interface ICartState {
  items: { [key: string]: number };
  productFullInfo: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICartState = {
  items: {},
  productFullInfo: [],
  loading: "idle",
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
        // or
        // state.items[id] += 1;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemsChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    removeCartItem: (state, action) => {
      // خلى بالك انك هتحذف من مكانين وهما items و ال productFull info
      const id = action.payload;
      delete state.items[id];
      state.productFullInfo = state.productFullInfo.filter(
        (el) => el.id !== id
      );
    },
    cartCleanUp: (state) => {
      state.productFullInfo = [];
    },
    cartCleanUpAfterPlaceOrder: (state) => {
      state.productFullInfo = [];
      state.items = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const {
  addToCart,
  cartItemsChangeQuantity,
  removeCartItem,
  cartCleanUp,
  cartCleanUpAfterPlaceOrder,
} = cartSlice.actions;
export { actGetProductsByItems };
export default cartSlice.reducer;
