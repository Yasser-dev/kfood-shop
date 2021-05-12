import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="mt-5 checkout-progress d-flex justify-content-center">
      {shipping ? (
        <Link to="shipping" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step" style={{ cursor: "pointer" }}>
            Shipping
          </div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Shipping</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/confirm" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step" style={{ cursor: "pointer" }}>
            Confirm Order
          </div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirm Order</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {payment ? (
        <Link to="/payment" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step" style={{ cursor: "pointer" }}>
            Payment
          </div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Payment</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
