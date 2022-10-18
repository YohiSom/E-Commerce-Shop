import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = JSON.parse(localStorage.getItem("user"));
const getLocalStorageShipping = JSON.parse(localStorage.getItem("shipping"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getLocalStorage || null,
    shippingDetails: getLocalStorageShipping || null,
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
    },
    handleShipping(state, action) {
      state.shippingDetails = action.payload;
      localStorage.setItem("shipping", JSON.stringify(state.shippingDetails));
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
