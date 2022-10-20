import { userActions } from "./user-slice";
import {
  userRegister,
  userLogin,
  updateProfile,
  createOrder,
} from "../API/api";
import { messageActions } from "./error-slice";
import { cartActions } from "./cart-slice";

export const register = (name, email, password) => async (dispatch) => {
  try {
    const res = await userRegister(name, email, password);

    dispatch(userActions.userData(res));

    dispatch(
      messageActions.showAlerts({
        open: true,
        message: "Registered successfully!",
        type: "success",
      })
    );

    setTimeout(() => {
      dispatch(messageActions.clearAlert({}));
      dispatch(userActions.clear(false));
    }, 3000);
  } catch (err) {
    dispatch(
      messageActions.showAlerts({
        open: true,
        message: err.message,
        type: "error",
      })
    );
    setTimeout(() => {
      dispatch(messageActions.clearAlert({}));
    }, 3000);
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await userLogin(email, password);

    dispatch(userActions.userData(res));

    dispatch(
      messageActions.showAlerts({
        open: true,
        message: "Successfully logged-in",
        type: "success",
      })
    );

    setTimeout(() => {
      dispatch(messageActions.clearAlert({}));
      dispatch(userActions.clear(false));
    }, 3000);
  } catch (err) {
    dispatch(
      messageActions.showAlerts({
        open: true,
        message: err.message,
        type: "error",
      })
    );
    setTimeout(() => {
      dispatch(messageActions.clearAlert({}));
    }, 3000);
  }
};

export const updateUserProfile =
  (name, email, password, token) => async (dispatch) => {
    try {
      const res = await updateProfile(name, email, password, token);

      dispatch(userActions.userData(res));
      dispatch(
        messageActions.showAlerts({
          open: true,
          message: "Successfully updated",
          type: "success",
        })
      );

      setTimeout(() => {
        dispatch(messageActions.clearAlert({}));
      }, 3000);
    } catch (err) {
      dispatch(
        messageActions.showAlerts({
          open: true,
          message: err.message,
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(messageActions.clearAlert({}));
      }, 3000);
    }
  };

export const newOrderAction =
  (cartArr, shippingDetails, paymentMethod, shippingPrice, token) =>
  async (dispatch) => {
    try {
      const res = await createOrder(
        cartArr,
        shippingDetails,
        paymentMethod,
        shippingPrice,
        token
      );

      dispatch(userActions.handleNewOrder(res));

      dispatch(
        messageActions.showAlerts({
          open: true,
          message: "order successfully submitted",
          type: "success",
        })
      );

      setTimeout(() => {
        dispatch(messageActions.clearAlert());
      }, 2000);

      dispatch(cartActions.removeCartFromStorageAfterOrder());
    } catch (err) {
      dispatch(
        messageActions.showAlerts({
          open: true,
          message: err.message,
          type: "error",
        })
      );

      setTimeout(() => {
        dispatch(messageActions.clearAlert());
      }, 2000);
    }
  };
