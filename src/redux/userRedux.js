import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    currentUser: null,
    isFetching: false,
    error: "",
    wishlist: [],
    token: "",
    cartId: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.userId = action.payload._id;
      state.token = action.payload.accessToken;
      state.isFetching = false;
      state.currentUser = action.payload.firstname;
      state.wishlist = action.payload.wishlist;
      state.cartId=action.payload.pendingcartId;
    },
    loginFailure: (state,action) => {
      state.isFetching = false;
      state.error =action.payload;
    },
    logout: (state) => {
      state.userId = "";
      state.currentUser = null;
      state.isFetching = false;
      state.error = "";
      state.wishlist = [];
      state.token = "";
      state.cartId = "";
    },
    addCartId: (state, action) => {
      state.cartId = action.payload;
    },
    addToWishlistSuccess: (state, action) => {
      state.wishlist = action.payload;
    },
    removeFromWishlistSuccess: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  addToWishlistSuccess,
  addCartId,
  removeFromWishlistSuccess,
} = userSlice.actions;
export default userSlice.reducer;
