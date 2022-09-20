import { createSlice } from "@reduxjs/toolkit";

const messageAndErrorHandlerSlice = createSlice({
  name: "message",
  initialState: {
    message: null,
    alerts: null,
  },
  reducers: {
    showMessage(state, action) {
      state.message = {
        open: action.payload.open,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    showAlerts(state, action) {
      state.alerts = {
        open: action.payload.open,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    clearAlert(state, action) {
      state.alerts = action.payload;
    },
  },
});

export const messageActions = messageAndErrorHandlerSlice.actions;
export default messageAndErrorHandlerSlice;
