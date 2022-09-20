import React, { useEffect } from "react";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { cartActions } from "../store/cart-slice";
import { DeleteFilled } from "@ant-design/icons";
import SubTotal from "../components/subtotal/SubTotal";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartArr);
  const product = useSelector((state) => state.product.product);
  const { Option } = Select;

  const findProductById = (id) => {
    const productId = cart.find((el) => el.id === id);
    const countInStock = productId.countInStock;

    let newArr = [];

    if (cart && countInStock > 0) {
      let num = countInStock - countInStock + 1;
      newArr.push(num);

      for (let i = 0; i <= countInStock; i++) {
        if (newArr[i] == countInStock) {
          break;
        }
        newArr[i + 1] = newArr[i] + 1;
      }
    }

    return newArr;
  };

  const handleQuantity = (value, id) => {
    dispatch(cartActions.changeQuantity({ id, value }));
  };

  const removeProduct = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };
  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="cart-empty">Your cart is empty</div>
      ) : (
        cart.map((product) => {
          return (
            <div key={product.id} className="cart-product-container">
              <img src={product.image} className="cart-img" />
              <div className="cart-name">{product.productName}</div>
              <div className="cart-name">$ {product.price}</div>
              <div className="cart-name">
                {" "}
                <Select
                  defaultValue={product.quantity}
                  onChange={(value) => handleQuantity(value, product.id)}
                >
                  {findProductById(product.id).map((el, index) => {
                    return <Option value={el} key={index}></Option>;
                  })}
                </Select>
              </div>
              <div className="cart-name">
                <DeleteFilled
                  tyle={{ fontSize: "30px" }}
                  onClick={() => removeProduct(product.id)}
                />
              </div>
            </div>
          );
        })
      )}
      <div>
        <SubTotal />
      </div>
    </div>
  );
}

export default Cart;
