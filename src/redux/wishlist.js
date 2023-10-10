import { createSlice } from "@reduxjs/toolkit";

const wishlistSlicer = createSlice({
  name: "wishlist",
  initialState: {
    quantity: 0,
    products: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
        state.quantity += 1;
        state.products.push(action.payload);
      },
  },
});

export const { addToWishlist } = wishlistSlicer.actions;
export default wishlistSlicer.reducer;
