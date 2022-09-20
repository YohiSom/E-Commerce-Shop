import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getLocalStorage || null,
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
  },
});

export const userActions = userSlice.actions;
export default userSlice;
