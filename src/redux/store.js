import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./newCartRedux";
import userReducer from "./userRedux";
import wishlistReducer from "./wishlist";
import selectProductReducer from "./productRedux";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  selectProduct: selectProductReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


