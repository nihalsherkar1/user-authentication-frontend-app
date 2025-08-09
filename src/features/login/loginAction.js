import { createAsyncThunk } from "@reduxjs/toolkit";

import myApi from "../../service/axiosInstance";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (user, thunkAPI) => {
    console.log("userData", user);
    try {
      const response = await myApi.post("/auth/login", user);
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || { message: "Login failed" }
      );
    }
  }
);
