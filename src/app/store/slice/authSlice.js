import { instanceAuth } from "@/plugins/axios";
import axios from "axios";
import { progress } from "framer-motion";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  data: null,
  isLoading: null,
};

export const registerAccount = createAsyncThunk(
  "user/register",
  async (data) => {
    try {
      const respose = await instanceAuth.post("/master/user", data);
      const dataResponse = await respose.data;
      return dataResponse;
    } catch (e) {
      console.log(e);
    }
  }
);

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
      });
  },
});
export const { getToken } = authSlice.actions;
export default authSlice.reducer;
