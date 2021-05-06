import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader";
import MetaData from "../MetaData";
import defaultAvatar from "../../assets/default_avatar.png";
import { register, clearErrors } from "../../actions/userActions";
import "./register.css";
const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);

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
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      if (e.target.files) {
        if (e.target.files[0].size <= 700000) {
          reader.readAsDataURL(e.target.files[0]);
        } else return alert.error("file size is too big");
      }
    } else {
      setUser({
        ...user,
        [e.target.name]: [e.target.value],
      });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Register"} />

          <div className="p-4 mx-3 mb-3 shadow-xl md:mx-96 text-secondary">
            <form
              className="max-w-sm p-6 mx-auto space-y-10 overflow-hidden rounded-lg "
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h2 className="text-2xl font-bold text-center ">Register</h2>

              <input
                autoComplete="none"
                type="name"
                id="name_field"
                className="block w-full p-4 text-lg bg-transparent border-2 border-secondary"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Name"
              />

              <input
                autoComplete="none"
                type="email"
                id="email_field"
                className="block w-full p-4 text-lg bg-transparent border-2 border-secondary"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
              />

              <input
                type="password"
                id="password_field"
                className="block w-full p-4 text-lg bg-transparent border-2 border-secondary"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />

              <div className="flex-column">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="flex align-items-center">
                  <div className="mr-2">
                    <figure className="mb-3 avatar">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="iamges/*"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>

              <button
                id="register_button"
                type="submit"
                className="w-full px-4 py-2 font-bold text-white rounded bg-secondary hover:bg-secondary-light"
                disabled={loading ? true : false}
              >
                REGISTER
              </button>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Register;
