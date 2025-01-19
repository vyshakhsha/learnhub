import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import courseReducer from "./courseSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  course: courseReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     cart: cartReducer,
//     course:courseReducer
//   },
// });
