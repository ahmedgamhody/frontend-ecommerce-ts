import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { isString, TCategory, TLoading } from "@types";

interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}
const initialState: ICategoriesState = {
  records: [],
  loading: "idle", // default دى يعنى مفيش بيانات من الاساس وهى اساسا بمعنى خامل ودى الحاله ال  ( idle )
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    // فى حاله انه لسه بيجيب البيانات
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null; // هنا قولت null عشان اضمن انه هيفضى الايرور بعد كدا بدل ما يرجع يجيب نفس القيمه
    });
    // فى حاله انه  جاب البيانات و نجح
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    // فى حاله انه  جاب البيانات وما نجحش
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export { actGetCategories };
export const { categoriesCleanUp } = categoriesSlice.actions;
export default categoriesSlice.reducer;
