import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import { isString, TProduct } from "@types";

interface IProductsState {
  records: TProduct[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IProductsState = {
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
  },
  extraReducers: (builder) => {
    // فى حاله انه لسه بيجيب البيانات
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null; // هنا قولت null عشان اضمن انه هيفضى الايرور بعد كدا بدل ما يرجع يجيب نفس القيمه
    });
    // فى حاله انه  جاب البيانات و نجح
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    // فى حاله انه  جاب البيانات وما نجحش
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;
export { actGetProductsByCatPrefix };

export default productsSlice.reducer;
