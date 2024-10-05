import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/app/store/slice/categorySlice";
import productReducer from "@/app/store/slice/productSlice";
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
  },
});
