import { productActions } from "./product-slice";
import { messageActions } from "./error-slice";
import { getProducts, getProduct } from "../API/api";

export const fetchProducts = () => async (dispatch) => {
  const res = await getProducts();

  if (res.message) {
    dispatch(
      messageActions.showMessage({
        open: true,
        message: res.message,
        type: "error",
      })
    );
  }

  dispatch(productActions.productData(res));
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    const res = await getProduct(id);

    if (res.message) {
      dispatch(
        messageActions.showMessage({
          open: true,
          message: "Something went wrong!",
          type: "error",
        })
      );
    }

    dispatch(productActions.fetchProductData(res));
  };
};
