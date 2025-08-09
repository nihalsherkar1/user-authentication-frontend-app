import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./loginAction";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  user: {},
  message: "",
  token: null,
  OAuthData: {},
  isAuthenticated: false,
  role: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.user = {};
      state.message = "";
      state.token = null;
      state.role = "";
      state.OAuthData = {};
      state.isAuthenticated = false;
      sessionStorage.removeItem("token"); // Clear token from session storage
      sessionStorage.removeItem("user"); // Clear user data from session storage
      sessionStorage.removeItem("normalUser");
      sessionStorage.removeItem("role");
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setOAuth: (state, action) => {
      state.OAuthData = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    setUser: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("normalUser", action.payload);
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.token.userName;
        state.token = action.payload.token.token;
        state.message = action.payload.message;
        state.role = action.payload.token.role;
        sessionStorage.setItem("token", action.payload.token); // Store token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Login failed";
        state.user = {};
        state.token = null;
      });
  },
});

export const { logout, setCredentials, setOAuth, setUser, setAuthenticated } =
  loginSlice.actions;
export default loginSlice.reducer;
