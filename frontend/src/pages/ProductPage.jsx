import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Image } from "antd";
import "antd/dist/antd.css";
import "../components/products/ProductsMap.scss";
import Ratings from "../components/Ratings";
import InStock from "../components/stockComponent/InStock";
import { getProduct } from "../API/api";
import { fetchProduct } from "../store/product-actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Messages from "../components/Messages";
import ProductQuantitiy from "../components/ProductQuantity/ProductQuantitiy";
import { cartActions } from "../store/cart-slice";
function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.isLoadingProduct);
  const error = useSelector((state) => state.message.message);

  const { open, type, message } = error || {};

  // const getProductById = async () => {
  //   const res = await getProduct(id).catch((err) =>
  //     setError("oops, something went wrong")
  //   );

  //   if (res) {
  //     setProduct(res);
  //   }

  //   setLoading(false);
  // };

  useEffect(() => {
    dispatch(fetchProduct(id));
    // getProductById();
  }, [dispatch]);

  // if (loading) return <div>...Loading</div>;

  return (
    <>
      {loading ? (
        <div className="spinner-product">
          <Spinner />
        </div>
      ) : open ? (
        <Messages type={type} message={message} />
      ) : (
        <>
          {" "}
          <div className="product-page-container">
            <div className="product-page">
              <Image
                src={product && product.image}
                width={300}
                // onLoad={handleImageLoaded}
                // style={imageStyle}
              />

              <div className="description-card">
                <h3>{product && product.name}</h3>
                <Ratings value={product && product.rating} />
                <p>${product && product.price}</p>
                <p>{product && product.description}</p>
              </div>
            </div>
            <div className="instock-dertails-card">
              {" "}
              <InStock
                id={id}
                amount={product && product.price}
                stock={
                  product && product.countInStock > 0
                    ? "In Stock"
                    : "Out of Stock"
                }
                inStock={product && product.countInStock === 0}
              />
            </div>{" "}
          </div>
        </>
      )}
    </>
  );
}

export default ProductPage;
