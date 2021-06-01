import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product deleted successfully");
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `EGP ${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="px-2 py-1 btn btn-primary"
            >
              <i className="fa fa-pen"></i>
            </Link>
            <button
              className="px-2 py-1 ml-2 btn btn-danger"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="row bg-dark text-light">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 ">
          <Fragment>
            <h1 className="my-5">All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                style={{ color: "#ffffff" }}
                bordered
                striped
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
