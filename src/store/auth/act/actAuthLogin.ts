import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type formData = {
  email: string;
  password: string;
};

type TResponse = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: formData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await axios.post<TResponse>("/login", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
