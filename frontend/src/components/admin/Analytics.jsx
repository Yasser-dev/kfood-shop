import React, { Fragment, useEffect } from "react";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../../actions/orderActions";
import { getAdminProducts } from "../../actions/productActions";
import { allUsers } from "../../actions/userActions";
import Loader from "../layouts/Loader";
import MetaData from "../MetaData";
import Sidebar from "./Sidebar";
const Analytics = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders, loading } = useSelector((state) => state.allOrders);
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  let outOfStock = 0;
  products?.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });
  console.log("ORDERSSS", orders);
  let pieData = {
    labels: ["Available", "Out of Stock"],
    datasets: [
      {
        label: "Products",
        data: [products.length - outOfStock, outOfStock],
        backgroundColor: ["rgba(78, 238, 177, 0.4)", "rgba(235, 54, 54, 0.4)"],
        borderColor: ["rgba(78, 238, 177,1)", "rgba(235, 54, 54,1)"],
      },
    ],
  };
  let admins = 0;
  users?.forEach((user) => {
    if (user.role === "admin") {
      admins += 1;
    }
  });

  let doughnutData = {
    labels: ["Admin", "Customer"],
    datasets: [
      {
        label: "Users",
        data: [admins, users.length - admins],
        backgroundColor: ["rgba(78, 161, 238, 0.4)", "rgba(238, 214, 78, 0.4)"],
        borderColor: ["rgba(78, 161, 238, 1)", "rgba(238, 214, 78, 1)"],
      },
    ],
  };
  let cancelled = 0,
    processing = 0,
    shipped = 0,
    delivered = 0;

  if (orders) {
    orders.forEach((order) => {
      if (order.orderStatus === "Delivered") {
        delivered += 1;
      } else if (order.orderStatus.includes("Processing")) {
        processing += 1;
      } else if (order.orderStatus.includes("Shipped")) {
        shipped += 1;
      } else if (order.orderStatus.includes("Cancelled")) {
        cancelled += 1;
      } else return;
    });
  }
  let barData = {
    labels: ["Processing", "Shipped", "Cancelled", "Delivered"],
    datasets: [
      {
        label: "Orders",
        data: [processing, shipped, cancelled, delivered],
        backgroundColor: [
          "rgba(78, 161, 238, 0.4)",
          "rgba(238, 214, 78, 0.4)",
          "rgba(235, 54, 54, 0.4)",
          "rgba(78, 238, 177, 0.4)",
        ],
        borderColor: [
          "rgba(78, 161, 238, 1)",
          "rgba(238, 214, 78, 1)",
          "rgba(235, 54, 54, 1)",
          "rgba(78, 238, 177,1)",
        ],
      },
    ],
  };

  return (
    <Fragment>
      <MetaData title={"Product Reviews"} />
      <div className="row bg-dark text-light">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          {loading && !orders ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="mt-5 row justify-content-center">
                <div className="row col col-sm-4 justify-content-center mr-5">
                  <h4>Products</h4>
                  <Pie data={pieData} />
                </div>
                <div className="row col col-sm-4 justify-content-center mr-5">
                  <h4>Users</h4>
                  <Doughnut data={doughnutData} />
                </div>
              </div>

              <div className="mt-5 row justify-content-center">
                <div className="row col col-sm-7 justify-content-center mr-5">
                  <h4>Orders</h4>
                  <Bar data={barData} />
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Analytics;
