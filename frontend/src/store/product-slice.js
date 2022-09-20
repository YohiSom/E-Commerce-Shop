import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: true,
    isLoadingProduct: true,
    product: {},
  },
  reducers: {
    productData(state, action) {
      state.products = action.payload;
      state.isLoading = false;
      state.isLoadingProduct = true;
    },
    fetchProductData(state, action) {
      state.product = action.payload;
      state.isLoadingProduct = false;
      state.isLoading = true;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
