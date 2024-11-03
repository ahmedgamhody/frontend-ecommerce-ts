import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { TProduct } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsIds = Object.keys(cart.items); // get products ids from items
    if (!itemsIds.length) {
      return fulfillWithValue([]);
    }
    try {
      const contcatenatedItemsId = itemsIds.map((id) => `id=${id}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${contcatenatedItemsId}`,
        {
          signal,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
