import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import { isString, TProduct } from "@types";
import actGetAllProducts from "./act/actGetAllProducts";

interface IProductsState {
  allPtoducts: TProduct[];
  records: TProduct[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IProductsState = {
  allPtoducts: [],
  records: [],
  loading: "idle",
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = []; // ودا عشان افضى المنتجات بدل ما بيعمل الشكل انه كان فيه منتجات واتحذفت
    },
    allProductsCleanUp: (state) => {
      state.allPtoducts = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // actGetProductsByCatPrefix
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // actGetAllProducts
    builder.addCase(actGetAllProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetAllProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.allPtoducts = action.payload;
    });
    builder.addCase(actGetAllProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { productsCleanUp, allProductsCleanUp } = productsSlice.actions;
export { actGetProductsByCatPrefix, actGetAllProducts };

export default productsSlice.reducer;
