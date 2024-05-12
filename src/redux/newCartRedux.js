import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    amount: 0,
    CartId: "",
    address: "",
    mode: "",
  },
  reducers: {
    addCart: (state, action) => {
      // console.log(action.payload);
      state.products = action.payload.products;
      state.amount = action.payload.totalAmount;
      state.quantity = action.payload.products.length;
      state.CartId = action.payload._id || "";
    },
    // addOrderId: (state, action) => {
    //   // console.log(action.payload);
    //   state.OrderId = action.payload.order;
    //   state.CartId = action.payload.cart;
    // },
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
      state.amount -= action.payload.product.price * action.payload.quantity;
    },
    addAddress: (state, action) => {
      // console.log(action.payload);
      state.address = action.payload;
    },
    addMode: (state, action) => {
      state.mode = action.payload.modeSelect;
    },
    checkout: (state) => {
      state.products = [];
      state.quantity = 0;
      state.amount = 0;
      state.CartId = "";
      state.address = "";
      state.mode = "";
    },
  },
});

export const {
  addProduct,
  addCart,
  removeProduct,
  addAddress,
  addMode,
  checkout,
  addOrderId,
} = cartSlice.actions;
export default cartSlice.reducer;
