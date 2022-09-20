import React, { useEffect, useState } from "react";
import { Card, Image } from "antd";
import "antd/dist/antd.css";
import "./ProductsMap.scss";
import Ratings from "../Ratings";
import { Link } from "react-router-dom";
import { getProducts } from "../../API/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product-actions";
import Spinner from "../Spinner";
import Messages from "../Messages";
function ProductsMap() {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState("");

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const isLoading = useSelector((state) => state.product.isLoading);
  const error = useSelector((state) => state.message.message);
  const { open, message, type } = error || {};
  const { products = [] } = productState || {};

  // const allProducts = async () => {
  //   const data = await getProducts().catch((err) =>
  //     setError("oops, something went wrong")
  //   );
  //   if (data) {
  //     setProducts(data);
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    dispatch(fetchProducts());
    // allProducts();
  }, [dispatch]);

  // if (isLoading === true) return <Spinner />;

  return (
    <div className="products-container">
      {isLoading ? (
        <Spinner />
      ) : open ? (
        <Messages type={type} message={message} />
      ) : (
        products &&
        products.map((item) => {
          return (
            <div key={item._id}>
              <Link to={`/product/${item._id}`}>
                {" "}
                <Card>
                  <Image src={item.image} width={200} />
                  <h3>{item.name}</h3>
                  <h6>
                    {item.rating} from {item.numReviews} reviews
                  </h6>
                  <Ratings value={item.rating} />
                  <h3>${item.price}</h3>
                </Card>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ProductsMap;
