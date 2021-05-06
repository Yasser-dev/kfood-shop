import React, { Fragment, useState } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import HeaderLogo from "../../assets/logo.png";
import Search from "./Search";
import { logout } from "../../actions/userActions";
import searchIcon from "../../assets/img/icons/icon-search.svg";
import searchIconHover from "../../assets/img/icons/icon-search-hover.svg";
import loginIcon from "../../assets/img/icons/icon-login.svg";
import loginHoverIcon from "../../assets/img/icons/icon-login-hover.svg";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [searchOpened, setSearchOpened] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const toggleSearch = () => {
    setSearchOpened(!searchOpened);
  };
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Successfully Logged Out");
  };

  return (
    <Fragment>
      <div className="mb-6 flex-column">
        <nav className="relative flex items-center justify-between w-full px-8 mx-auto align-middle bg-white shadow h-28">
          <div className="flex items-center justify-between ">
            <div
              onClick={toggleSearch}
              className="flex flex-row items-center px-4 py-4 mr-8 transition-all border-2 border-transparent rounded-full hover:border-primary group"
            >
              <img
                src={searchIcon}
                className="block w-8 h-8 group-hover:hidden"
                alt="icon search"
              />
              <img
                src={searchIconHover}
                className="hidden w-8 h-8 group-hover:block"
                alt="icon search hover"
              />
            </div>
          </div>
          <div className="h-full py-2">
            <Link to="/" className="navbar-brand" className="h-full ">
              <img
                className="object-scale-down h-full"
                height="75px"
                src={HeaderLogo}
                alt="Kfood Shop Logo"
              />
            </Link>
          </div>
          <div className="flex items-center justify-between ">
            <Link
              to="/login"
              className="flex flex-row items-center px-4 py-4 mr-8 transition-all border-2 border-transparent rounded-full text-secondary hover:text-primary hover:border-primary group"
            >
              <img
                fill="#C50F33"
                src={loginIcon}
                className="block w-8 h-8 group-hover:hidden primary"
                alt="icon search"
              />
              <img
                color="primary"
                src={loginHoverIcon}
                className="hidden w-8 h-8 group-hover:block"
                alt="icon search hover"
              />
              <p className="mx-1 text-base font-bold ">Login</p>
            </Link>
          </div>
        </nav>
        {searchOpened && (
          <div className="px-10 my-3 md:px-52 ">
            <Route render={({ history }) => <Search history={history} />} />
          </div>
        )}
      </div>
    </Fragment>
  );
};
// return (
//   <Fragment>
//     <nav className="navbar row">
//       <div className="col-12 col-md-3">
//         <Link to="/" className="navbar-brand">
//           <img height="75px" src={HeaderLogo} alt="Kfood Shop Logo" />
//         </Link>
//       </div>

//       <div className="mt-2 col-12 col-md-6 mt-md-0">
//         <Route render={({ history }) => <Search history={history} />} />
//       </div>

//       <div className="mt-4 text-center col-12 col-md-3 mt-md-0">
//         <Link to="/cart" style={{ textDecoration: "none" }}>
//           <span id="cart" className="ml-3">
//             <i className="fa fa-shopping-cart"></i>
//           </span>
//           <span className="ml-1 mr-4" id="cart_count">
//             2
//           </span>
//         </Link>

//         {user ? (
//           <div className="ml-4 dropdown d-inline">
//             <Link
//               to="#!"
//               className="text-white btn dropdown-toggle"
//               type="button"
//               id="dropDownMenuButton"
//               data-toggle="dropdown"
//               aria-haspopup="true"
//               aria-expanded="false"
//             >
//               <figure className="avatar avatar-nav ">
//                 <img
//                   src={user.avatar && user.avatar.url}
//                   alt={user.name}
//                   className="rounded-circle "
//                 />
//               </figure>
//               <span>{user.name}</span>
//             </Link>
//             <div
//               className="dropdown-menu"
//               aria-labelledby="dropDownMenuButton"
//             >
//               <Link className="dropdown-item" to="/profile">
//                 Profile
//               </Link>
//               {user && user.role !== "admin" ? (
//                 <Link className="dropdown-item" to="/orders">
//                   Orders
//                 </Link>
//               ) : (
//                 <Link className="dropdown-item" to="/dashboard">
//                   Dashboard
//                 </Link>
//               )}

//               <Link
//                 className="dropdown-item text-danger"
//                 to="/"
//                 onClick={logoutHandler}
//               >
//                 Logout
//               </Link>
//             </div>
//           </div>
//         ) : (
//           !loading && (
//             <Link to="/login" className="btn" id="login_btn">
//               Login
//             </Link>
//           )
//         )}
//       </div>
//     </nav>
//   </Fragment>
// );
export default Header;
