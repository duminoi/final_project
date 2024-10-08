"use client";

import axios from "axios";
import { toast } from "react-toastify";
import instance from "@/plugins/axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: null,
  isEdit: false,
  categories: [],
};

export const getCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const response = await instance.get("/categories");
    const categories = await response.data;

    return categories;
  }
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data) => {
    const response = await instance.post("/categories", data);
    const category = await response.data;
    return category;
  }
);
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, values }) => {
    const response = await instance.put(`/categories/${id}`, values);
    const category = await response.data;

    return category;
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    const response = await instance.delete(`/categories/${id}`);
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
      console.log(state);

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
