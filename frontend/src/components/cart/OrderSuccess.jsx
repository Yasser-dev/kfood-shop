import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title={"Order Success"} />

      <div className="row justify-content-center">
        <div className="mt-5 text-center col-6">
          <img
            className="mx-auto my-5 img-fluid d-block"
            src="/images/order_success.png"
            alt="Order Success"
            width="400"
          />

          <h2>Your Order has been placed successfully.</h2>

          <Link
            to="/orders/me"
            className="btn btn-primary"
            style={{ background: "#8860D0" }}
          >
            Go to Orders
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
