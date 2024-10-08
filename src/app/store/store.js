import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/app/store/slice/categorySlice";
import productReducer from "@/app/store/slice/productSlice";
import authReducer from "@/app/store/slice/authSlice";
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
  },
});
