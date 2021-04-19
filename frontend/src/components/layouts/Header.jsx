import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import HeaderLogo from "../../assets/logo-header.png";
import Search from "./Search";
const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <Link to="/" className="navbar-brand">
            <img height="75px" src={HeaderLogo} alt="Kfood Shop Logo" />
          </Link>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" id="login_btn">
            Login
          </button>

          <span id="cart" className="ml-3">
            <i className="fa fa-shopping-cart"></i>
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
