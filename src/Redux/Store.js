import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import courseReducer from "./courseSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    course:courseReducer
  },
});
