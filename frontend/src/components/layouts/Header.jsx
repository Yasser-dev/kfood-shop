import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import HeaderLogo from "../../assets/logo-header1.png";
import Search from "./Search";
import { logout } from "../../actions/userActions";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Successfully Logged Out");
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <Link to="/" className="navbar-brand">
            <img height="75px" src={HeaderLogo} alt="Kfood Shop Logo" />
          </Link>
        </div>

        <div className="mt-2 col-12 col-md-6 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="mt-4 text-center col-12 col-md-3 mt-md-0">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              <i className="fa fa-shopping-cart"></i>
            </span>
            <span className="ml-1 mr-4" id="cart_count">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="mr-1 text-white btn dropdown-toggle"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav ">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user.name}
                    className="rounded-circle "
                  />
                </figure>
                <span>{user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
                {user && user.role !== "admin" ? (
                  <Link className="dropdown-item" to="/orders">
                    Orders
                  </Link>
                ) : (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
