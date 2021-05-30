import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;
  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = match.params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, orderId]);
  const [status, setStatus] = useState(orderStatus);
  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={`Process Order # ${order && order._id}`} />
      <div className="row bg-dark text-light">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5">Order # {order._id}</h2>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b> {user && user.name}
                  </p>
                  <p>
                    <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                  </p>
                  <p className="mb-4">
                    <b>Address:</b>
                    {shippingDetails}
                  </p>
                  <p>
                    <b>Amount:</b> EGP {totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p className={isPaid ? "greenColor" : "redColor"}>
                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                  </p>

                  <h4 className="my-4">Stripe ID</h4>
                  <p>
                    <b>{paymentInfo && paymentInfo.id}</b>
                  </p>

                  <h4 className="my-4">Order Status:</h4>
                  <b>
                    {order.orderStatus &&
                    String(order.orderStatus).includes("Delivered") ? (
                      <p style={{ color: "mediumseagreen" }}>
                        {order.orderStatus}
                      </p>
                    ) : String(order.orderStatus).includes("Shipped") ? (
                      <p style={{ color: "gold" }}>{order.orderStatus}</p>
                    ) : String(order.orderStatus).includes("Cancelled") ? (
                      <p style={{ color: "firebrick" }}>{order.orderStatus}</p>
                    ) : (
                      <p style={{ color: "dodgerblue" }}>{order.orderStatus}</p>
                    )}
                  </b>

                  <h4 className="my-4">Order Items:</h4>

                  <hr />
                  <div className="my-1 cart-item">
                    {orderItems &&
                      orderItems.map((item) => (
                        <div key={item.product} className="my-5 row">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/admin/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div className="mt-4 col-4 col-lg-2 mt-lg-0">
                            <p>EGP {item.price}</p>
                          </div>

                          <div className="mt-4 col-4 col-lg-3 mt-lg-0">
                            <p>{item.quantity} Item(s)</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                </div>

                <div className="mt-5 col-12 col-lg-3">
                  <h4 className="my-4">Status</h4>
                  {(orderStatus && orderStatus?.includes("Delivered")) ||
                  orderStatus.includes("Cancelled") ? (
                    String(order.orderStatus).includes("Delivered") ? (
                      <p style={{ color: "mediumseagreen" }}>
                        Order has been delivered
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>Order been cancelled</p>
                    )
                  ) : (
                    <div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="Cancelled">Cancelled</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>

                      <button
                        className="btn btn-light btn-block"
                        onClick={() => updateOrderHandler(order._id)}
                      >
                        Update Status
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
