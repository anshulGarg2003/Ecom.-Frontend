import { createSlice } from "@reduxjs/toolkit";

const selectProductSlice = createSlice({
  name: "selectProduct",
  initialState: {
    product: {},
    quantity: "",
    colour: "",
    size: "",
    price:0,
  },
  reducers: {
    addSelectProduct: (state, action) => {
      // console.log(action.payload);
      state.product = action.payload.product;
      state.quantity = action.payload.quantity;
      state.colour = action.payload.colour;
      state.size = action.payload.size;
      state.price = action.payload.price;
    },
    deleteSelectProduct: (state) => {
      state.product = {};
      state.quantity = "";
      state.colour = "";
      state.size = "";
      state.price = 0;
    },
  },
});

export const { addSelectProduct, deleteSelectProduct } =
  selectProductSlice.actions;
export default selectProductSlice.reducer;
