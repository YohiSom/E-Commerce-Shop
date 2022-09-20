import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartArr: getLocalStorage || [],
    cartObject: {},
  },
  reducers: {
    addToCart(state, action) {
      state.cartObject = action.payload;

      const productExists = state.cartArr.find(
        (el) => el.id == state.cartObject.id
      );
      if (productExists) {
        productExists.quantity =
          productExists.quantity + action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.cartArr));
      } else {
        state.cartArr.push(state.cartObject);
        localStorage.setItem("cart", JSON.stringify(state.cartArr));
      }
    },
    changeQuantity(state, action) {
      const id = action.payload.id;
      const newQuantity = action.payload.value;
      const findProduct = state.cartArr.find((el) => el.id === id);
      findProduct.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(state.cartArr));
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const findProduct = state.cartArr.filter((el) => el.id !== id);
      state.cartArr = findProduct;
      localStorage.setItem("cart", JSON.stringify(state.cartArr));
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
