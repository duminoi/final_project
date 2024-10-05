"use client";

import axios from "axios";
import { toast } from "react-toastify";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isEdit: false,
  categories: [],
};

export const getCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const response = await fetch("http://localhost:3001/categories", {
      cache: "no-store",
    });
    const categories = await response.json();

    return categories;
  }
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data) => {
    const response = await axios.post("http://localhost:3001/categories", data);
    const category = await response.data;
    return category;
  }
);
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, values }) => {
    const response = await axios.put(
      `http://localhost:3001/categories/${id}`,
      values
    );
    const category = await response.data;

    return category;
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:3001/categories/${id}`
    );
    const category = await response.data;
    return category;
  }
);
export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("action", action);
        state.categories = action.payload;
      }),
      builder.addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action", action);
        state.categories.push(action.payload);
        toast("Đã thêm thành công ^^");
      }),
      builder.addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action", action);
        const id = state.categories.findIndex(
          (item) => item.id === action.payload.id
        );
        state.categories[id] = action.payload;
        toast("Đã sửa thành công ^^");
      }),
      builder.addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action", action.payload);

        const newCategories = state.categories.filter(
          (item) => item.id !== action.payload.id
        );
        state.categories = newCategories;
        toast("Xóa thành công !!!!!");
      });
  },
});
export const { setIsEdit } = categorySlice.actions;
export default categorySlice.reducer;
