import React, { useState } from "react";
import "./InStock.scss";
import { Button } from "antd";
import { Select } from "antd";
import "antd/dist/antd.css";
import { cartActions } from "../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
function InStock({ amount, stock, inStock, id }) {
  const [quantity, setQuantity] = useState(1);
  const product = useSelector((state) => state.product.product);
  const { countInStock } = product || {};
  const cart = useSelector((state) => state.cart);
  const { cartObject, cartArr } = cart;
  const { name, image, price } = product;
  const { Option } = Select;
  const dispatch = useDispatch();
  let newArr = [];

  if (product && countInStock > 0) {
    let num = countInStock - countInStock + 1;
    newArr.push(num);

    for (let i = 0; i <= countInStock; i++) {
      if (newArr[i] == countInStock) {
        break;
      }
      newArr[i + 1] = newArr[i] + 1;
    }
  }

  const handleChange = (value) => {
    setQuantity(value);
  };
  const addToCartHandler = () => {
    let newCartObj = {
      // ...cartObject,
      image,
      id: id,
      productName: name,
      quantity,
      price,
      countInStock,
    };
    dispatch(cartActions.addToCart(newCartObj));
  };

  return (
    <div className="inStock-container">
      <div className="price-container">
        <div className="price-card">Price:</div>
        <div className="value-price-card">${amount}</div>
      </div>
      <div className="stock-container">
        <div className="price-card">Status:</div>
        <div className="value-price-card">{stock}</div>
      </div>
      {countInStock > 0 && (
        <div className="price-container">
          Quantity:
          <Select defaultValue={quantity} onChange={handleChange}>
            {newArr.map((el, index) => {
              return <Option value={el} key={index}></Option>;
            })}
          </Select>
        </div>
      )}
      <div className="button-cart">
        <Button disabled={inStock} onClick={addToCartHandler}>
          ADD TO CART
        </Button>
      </div>
    </div>
  );
}

export default InStock;
