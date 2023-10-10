import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    OrderId: "",
    products: [],
    quantity: 0,
    amount: 0,
  },
  reducers: {
    addCart: (state, action) => {
      // console.log(action.payload);
      state.products = action.payload.products;
      state.amount = action.payload.totalAmount;
      state.quantity = action.payload.products.length;
    },
    addOrderId: (state, action) => {
      console.log(action.payload);
      state.OrderId = action.payload;
    },
    addProduct: (state, action) => {
      // console.log(action.payload);
      state.quantity += 1;
      state.products.push(action.payload.myselectproduct);
      state.amount +=
        action.payload.myselectproduct.price *
        action.payload.myselectproduct.quantity;
    },
    removeProduct: (state, action) => {
      // console.log(action.payload);
      const productIdToRemove = action.payload.product._id;
      state.products = state.products.filter(
        (element) => element.product._id !== productIdToRemove
      );
      // Update quantity and amount accordingly
      state.quantity -= 1;
      state.amount -=
        action.payload.price * action.payload.quantity;
    },
    checkout: (state) => {
      state.OrderId = "";
      state.products = [];
      state.quantity = 0;
      state.amount = 0;
    },
  },
});

export const { addProduct, addCart, removeProduct, checkout, addOrderId } =
  cartSlice.actions;
export default cartSlice.reducer;
