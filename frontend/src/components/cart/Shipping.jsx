import React, { Fragment, useState } from "react";

import MetaData from "../MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { governatesList } from "./shippingData";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";

const Shipping = ({ history }) => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const governates = Object.keys(governatesList);
  const [address, setAddress] = useState(shippingInfo.address ?? "");
  const [city, setCity] = useState(shippingInfo.city ?? "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode ?? "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo ?? "");
  const [governate, setGovernate] = useState(shippingInfo.governate ?? "");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({ address, city, phoneNo, postalCode, governate })
    );
    history.push("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />

      <CheckoutSteps shipping />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="governate_field">Governate</label>
              <select
                id="governate_field"
                className="form-control"
                value={governate}
                onChange={(e) => setGovernate(e.target.value)}
                required
              >
                {governates.map((governate) => (
                  <option key={governate} value={governate}>
                    {governate}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="py-3 btn btn-block"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
