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

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
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
          <div className="p-4 mx-3 mb-3 shadow md:mx-96 text-secondary">
            <form
              className="max-w-sm p-6 mx-auto space-y-10 overflow-hidden rounded-lg shadow-xl "
              onSubmit={submitHandler}
            >
              <h2 className="mb-3 text-2xl font-bold text-center">Login</h2>

              <input
                autoComplete="none"
                type="email"
                id="email_field"
                className="block w-full p-4 mb-2 text-lg bg-transparent border-2 border-secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />

              <input
                type="password"
                id="password_field"
                className="w-full p-4 text-lg bg-transparent border-2 fblock border-secondary"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="items-center content-center mt-2 mb-1">
                <div className="mb-2 flex-column">
                  <div className="float-right">
                    <Link to="/password/forgot">Forgot Password?</Link>
                  </div>
                  <div>
                    <Link to="/register">New User?</Link>
                  </div>
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="w-full px-4 py-2 font-bold text-white rounded bg-secondary hover:bg-secondary-light"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
