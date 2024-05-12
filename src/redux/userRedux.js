import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    token: "",
    password: "",
    firstname: null,
    username: null,
    email: null,
    isFetching: false,
    error: "",
    wishlist: [],
    cartId: "",
    isAdmin: false,
    ImgUrl: "",
    address: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.userId = action.payload?._id;
      state.isFetching = false;
      state.token = action.payload.accessToken;
      state.password = action.payload.originalPassword;
      state.isAdmin = action.payload?.isAdmin;
      state.firstname = action.payload?.firstname;
      state.email = action.payload?.email;
      state.username = action.payload?.username;
      state.wishlist = action.payload?.wishlist;
      state.cartId = action.payload?.pendingcartId;
      state.ImgUrl = action.payload?.image;
      state.addresses = action.payload?.address;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userId = "";
      state.firstname = null;
      state.username = null;
      state.email = null;
      state.token = "";
      state.password = "";
      state.isFetching = false;
      state.error = "";
      state.wishlist = [];
      state.cartId = "";
      state.isAdmin = false;
      state.ImgUrl = "";
    },
    addCartId: (state, action) => {
      state.cartId = action.payload;
    },
    addToWishlistSuccess: (state, action) => {
      state.wishlist = action.payload.wishlist;
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
