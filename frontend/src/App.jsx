import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/login";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/products/:id" component={ProductDetails} exact />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
