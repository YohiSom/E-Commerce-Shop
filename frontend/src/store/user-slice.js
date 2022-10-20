import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = JSON.parse(localStorage.getItem("user"));
const getLocalStorageShipping = JSON.parse(localStorage.getItem("shipping"));
const getLocalStorageMethod = JSON.parse(localStorage.getItem("paymentMethod"));
const localStorageNewOrder = JSON.parse(localStorage.getItem("newOrder"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getLocalStorage || null,
    shippingDetails: getLocalStorageShipping || null,
    paymentMethod: getLocalStorageMethod || null,
    newOrder: localStorageNewOrder || null,
    modalOpen: false,
  },
  reducers: {
    userData(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    handleModal(state) {
      state.modalOpen = true;
    },
    handleCloseModal(state) {
      state.modalOpen = false;
    },
    clear(state, action) {
      state.modalOpen = action.payload;
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("newOrder");
    },
    handleShipping(state, action) {
      state.shippingDetails = action.payload;
      localStorage.setItem("shipping", JSON.stringify(state.shippingDetails));
    },
    handlePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
    handleNewOrder(state, action) {
      state.newOrder = action.payload;
      localStorage.setItem("newOrder", JSON.stringify(state.newOrder));
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
