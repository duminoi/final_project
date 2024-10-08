"use client";

import instance from "@/plugins/axios";
import axios from "axios";
import { toast } from "react-toastify";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isEdit: false,
  products: [],
};

export const getProduct = createAsyncThunk("product/fetchproduct", async () => {
 try {
  const response = await instance.get("/products");
  const products = await response.data;
  return products;
 } catch (e) {
  console.log(e);
  
 }
});
export const addProduct = createAsyncThunk(
  "product/addproduct",
  async (data) => {
    const response = await instance.post("/products", data);
    const product = await response.data;
    return product;
  }
);
export const editProduct = createAsyncThunk(
  "product/editproduct",
  async ({ id, values }) => {
    const response = await instance.put(
      `/products/${id}`,
      values
    );
    const product = await response.data;

    return product;
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteproduct",
  async (id) => {
    const response = await instance.delete(`http://localhost:3001/products/${id}`);
    const product = await response.data;
    return product;
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("action", action);
        state.products = action.payload;
      }),
      builder.addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action", action);
        state.products.push(action.payload);
        toast("Đã thêm thành công ^^");
      }),
      builder.addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action", action);
        const id = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[id] = action.payload;
        toast("Đã sửa thành công ^^");
      }),
      builder.addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action", action.payload);

        const newproducts = state.products.filter(
          (item) => item.id !== action.payload.id
        );
        state.products = newproducts;
        toast("Xóa thành công !!!!!");
      });
  },
});
export const { setIsEdit } = productSlice.actions;
export default productSlice.reducer;
