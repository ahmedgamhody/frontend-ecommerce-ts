import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "@store/wishlist/act/actGetWishlist";
import { isString, TLoading, TProduct } from "@types";
import { authLogout } from "@store/auth/authSlice";
interface IWishlistState {
  productsId: number[];
  error: null | string;
  loading: TLoading;
  productFullInfo: TProduct[];
}

const initialState: IWishlistState = {
  productsId: [],
  error: null,
  loading: "idle",
  productFullInfo: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistCleanUp: (state) => {
      state.productFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    // act Like Button Toggle
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.productsId.push(action.payload.id);
      } else {
        state.productsId = state.productsId.filter(
          (el) => el !== action.payload.id
        );
        state.productFullInfo = state.productFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // act Wishlist Products
    builder.addCase(actGetWishlist.pending, (state) => {
      state.error = null;
      state.loading = "pending";
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "productsFullInfo") {
        state.productFullInfo = action.payload.data as TProduct[];
      } else if (action.payload.dataType === "productsIds") {
        state.productsId = action.payload.data as number[];
      }
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    builder.addCase(authLogout, (state) => {
      state.productsId = [];
      state.productFullInfo = [];
    });
  },
});
export { actLikeToggle, actGetWishlist };
export const { wishlistCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;
