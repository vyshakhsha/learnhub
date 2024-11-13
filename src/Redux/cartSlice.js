import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const fetchCartURL = process.env.REACT_APP_CART_ITEMS_URL;
const addToCartURL = process.env.REACT_APP_ADD_TO_CART_URL;
const removeFromCartURL = process.env.REACT_APP_REMOVE_FROM_CART_URL;
const checkoutCartURL = process.env.REACT_APP_CHECKOUT_CART_URL;

const initialState = {
  cartItems: [],
};
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userid) => {
    const response = await axios.get(fetchCartURL, {
      headers: {
        userid: userid,
      },
    });
    return response.data;
  }
);
export const addToCartItem = createAsyncThunk(
  "cart/addToCartItem",
  async (payload, { getState }) => {
    const state = getState();
    const itemExist = state.cart.cartItems.find(
      (item) => item.courseId === payload.courseId
    );
    if (!itemExist) {
      const request = { ...payload, id: uuidv4() };
      await axios.post(addToCartURL, request);
      return request;
    } else {
      return null;
    }
  }
);
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId) => {
    try {
      const response = await axios.delete(`${removeFromCartURL}${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (itemId) => {
    try {
      console.log(`url:${checkoutCartURL}${itemId}`)
      const response = await axios.put(`${checkoutCartURL}${itemId}`,{status:"bought"});
      return response.data;
    } catch (error) {
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartItem.fulfilled, (state, action) => {
        if (action.payload) {
          state.cartItems.push(action.payload);
          state.status = "succeeded";
          console.log("Item added");
        } else {
          console.log("Item already exists");
        }
      })
      .addCase(addToCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        console.log("action", action);
        if (action.payload === "Delete success") {
          state.cartItems.filter((item) => item.itemId !== action.meta.arg);
          state.status = "succeeded";
          console.log("Item removed", [...state.cartItems]);
        } else {
          console.log("not deleted");
        }
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(checkoutCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        console.log("action", action);
        if (action.payload === "Update success") {
          state.status = "succeeded";
          state.cartItems.filter((item)=>item.id!==action.meta.arg)
          console.log("Checkout completed", [...state.cartItems]);
        } else {
          console.log("Checkout failed");
        }
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default cartSlice.reducer;
