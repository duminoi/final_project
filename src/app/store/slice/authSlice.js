"use client";
import { instanceAuth } from "@/plugins/axios";
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  data: null,
  token: JSON.parse(localStorage?.getItem("token")) || {},
  isLoading: null,
};

export const registerAccount = createAsyncThunk(
  "user/register",
  async (data) => {
    try {
      const respose = await instanceAuth.post("/master/user", data);
      const infomation = await respose.data;
      return infomation;
    } catch (e) {
      console.log(e);
    }
  }
);

export const loginAccount = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await instanceAuth.post("/login", data);
    const tokenData = await response.data;
    return tokenData;
  } catch (e) {
    console.log(e);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    getToken: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerAccount.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(registerAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action", action);
      }),
      builder.addCase(loginAccount.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(loginAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action", action.payload);
        const tokenData = action.payload;
        state.token = tokenData;
        localStorage.setItem("token", JSON.stringify(tokenData));
      });
  },
});
export const { getToken } = authSlice.actions;
export default authSlice.reducer;
