import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./MetaData";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";
import Product from "./product/product";
import Loader from "./layouts/Loader";

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resultsPerPage,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert(error);
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, alert, error, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Authentic Korean Food"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {resultsPerPage < productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
