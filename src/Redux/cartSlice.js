import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CartURL = process.env.REACT_APP_CART_URL;

const initialState = {
  cartItems: [],
  boughtItems: [],
};
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userid) => {
    let getCartItemsURL = `${CartURL}/${userid}/added`;
    const response = await axios.get(getCartItemsURL);
    return response.data;
  }
);
export const fetchBoughtItems = createAsyncThunk(
  "cart/fetchBoughtItems",
  async (userid) => {
    let getBoughtItemsURL = `${CartURL}/${userid}/bought`;
    const response = await axios.get(getBoughtItemsURL);
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
      const request = {...payload};
      const response=await axios.post(CartURL, request);
      return response.data; // response.data.status === "Success"
    } else {
      return null;
    }
  }
);
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId) => {
    try {
      const response = await axios.delete(`${CartURL}/${itemId}`);
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
      const response = await axios.patch(`${CartURL}/${itemId}/status`,{status:"bought"});
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
      .addCase(fetchBoughtItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBoughtItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.boughtItems = action.payload;
      })
      .addCase(fetchBoughtItems.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartItem.fulfilled, (state, action) => {
        if (action.payload === "Item Added") {
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
        if (action.payload === "Delete success") {
          state.cartItems=state.cartItems.filter((item) => item.id !== action.meta.arg);
          state.status = "succeeded";
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
        if (action.payload === "Update success") {
          state.status = "succeeded";
          state.cartItems.filter((item)=>item.id!==action.meta.arg)
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
