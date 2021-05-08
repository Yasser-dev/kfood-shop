import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader";
import MetaData from "../MetaData";
import { login, clearErrors } from "../../actions/userActions";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history, alert]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    autoComplete="none"
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="py-3 btn btn-block"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
