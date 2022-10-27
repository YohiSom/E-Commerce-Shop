import React, { useEffect, useState } from "react";
import { getOrderById } from "../API/api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderHistory from "../components/orderHistorySummary/OrderHistory";
import "antd/dist/antd.css";
import { Spin, Alert } from "antd";

function OrderPage() {
  const { id } = useParams();
  const token = useSelector((state) => state.user.user.token);
  const user = useSelector((state) => state.user.user);
  const shipping = useSelector((state) => state.user.shippingDetails);
  const paymentMethod = useSelector((state) => state.user.paymentMethod);
  const { myAddress } = shipping || {};
  const { name, email } = user || {};
  const [orderDetail, setOrderDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const getOrder = async () => {
    try {
      const res = await getOrderById(id, token);
      // console.log(res);
      setOrderDetail(res);
      setIsLoading(false);
    } catch (err) {
      setIsOpen(true);
      setMessage(err.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  let sum = 0;

  orderDetail &&
    orderDetail.orderItem.forEach((el) => {
      let item = el.quantity * el.price;
      item.toFixed(2);

      sum = sum + item;
    });

  if (isLoading || orderDetail === undefined) return <Spin />;

  return (
    <div>
      {isOpen && <Alert message={message} type="error" />}
      <OrderHistory
        orderId={id}
        name={name}
        email={email}
        address={`${orderDetail.shippingAddress.address}, ${orderDetail.shippingAddress.city}, ${orderDetail.shippingAddress.postalCode}, ${orderDetail.shippingAddress.country}`}
        isDeliveredMessage={
          !orderDetail.isDelivered ? "Not Delivered" : "Delivered"
        }
        isDeliveredType={!orderDetail.isDelivered ? "error" : "success"}
        paymentMethod={orderDetail.paymentMethod}
        isPaidMessage={!orderDetail.isPaid ? "Not Paid" : "Paid"}
        isPaidType={!orderDetail.isPaid ? "error" : "success"}
        src={orderDetail.image}
        order={orderDetail.orderItem}
        item={sum}
        shipping={orderDetail.shippingPrice}
        shippingAd={orderDetail}
      />
    </div>
  );
}

export default OrderPage;
