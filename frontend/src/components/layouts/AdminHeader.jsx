import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import HeaderLogo from "../../assets/adminlogo.png";
import { logout } from "../../actions/userActions";

const AdminHeader = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Successfully Logged Out");
  };

  return (
    <Fragment>
      <nav className="navbar row" style={{ backgroundColor: "#394451" }}>
        <div className="col-12 col-md-3">
          <Link to="/dashboard" className="ml-4 navbar-brand">
            <img height="75px" src={HeaderLogo} alt="Kfood Shop Logo" />
          </Link>
        </div>

        <div className="mt-4 text-center col-12 col-md-3 mt-md-0">
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

export default AdminHeader;
