import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product-slice";
import messageAndErrorHandlerSlice from "./error-slice";
import cartSlice from "./cart-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    message: messageAndErrorHandlerSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
