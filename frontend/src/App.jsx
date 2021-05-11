import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/auth/Profile";
import { loadUser } from "./actions/userActions";
import store from "./store";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/auth/UpdateProfile";
import UpdatePassword from "./components/auth/UpdatePassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import NewPassword from "./components/auth/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/orderDetails";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());
    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}

          <ProtectedRoute path="/orders" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />

          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/profile" component={Profile} exact />
          <ProtectedRoute
            path="/profile/update"
            component={UpdateProfile}
            exact
          />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />

          <Route path="/search/:keyword" component={Home} />
          <Route path="/products/:id" component={ProductDetails} exact />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
