import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { TProduct } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
type TResponse = TProduct[];
type TDataType = "ProductIds" | "ProductsFullInfo";
const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const wishlistProductsIds = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        {
          signal,
        }
      );
      if (!wishlistProductsIds.data.length) {
        return { data: [], dataType: "empty" };
      }

      if (dataType === "ProductIds") {
        const productsIds = wishlistProductsIds.data.map((el) => el.productId);
        return { data: productsIds, dataType: "productsIds" };
      } else {
        const contcatenatedItemsId = wishlistProductsIds.data
          .map((el) => `id=${el.productId}`)
          .join("&");
        const response = await axios.get<TResponse>(
          `/products?${contcatenatedItemsId}`
        );
        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
