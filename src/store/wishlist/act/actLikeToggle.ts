import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const isRecord = await axios.get(
        `/wishlist?userId=${auth.user?.id}&productId=${id}`
      );
      if (isRecord.data.length > 0) {
        await axios.delete(`/wishlist/${isRecord.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post(`/wishlist`, { userId: 1, productId: id });
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
