import React, { useState } from "react";
import "antd/dist/antd.css";
import { Select } from "antd";
import { useSelector } from "react-redux";

function ProductQuantitiy() {
  const [quantity, setQuantity] = useState(1);
  const product = useSelector((state) => state.product.product);
  const { countInStock } = product || {};

  const { Option } = Select;

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

  //   console.log(newArr);
  //   let newObj = {};
  //   let arrMenu = [];

  //   for (let i = 0; i < newArr.length; i++) {
  //     newObj = { ...newObj, key: newArr[i], label: newArr[i] };

  //     arrMenu.push(newObj);
  //   }
  //   newArr.forEach((element) => {
  //     newObj.key = element;
  //     newObj.label = element;
  //   });

  //   console.log(arrMenu);

  //   if (loading || product === undefined) return <div>Loading...</div>;

  return (
    <>
      <Select defaultValue={quantity} onChange={handleChange}>
        {newArr.map((el, index) => {
          return <Option value={el} key={index}></Option>;
        })}
      </Select>
    </>
  );
}

export default ProductQuantitiy;
