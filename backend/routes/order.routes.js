import express from "express";
import {
  createOrder,
  getOrder,
  getCurrentUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.route("/orders/new").post(isAuthenticated, createOrder);
router.route("/orders/currentuser").get(isAuthenticated, getCurrentUserOrders);
router.route("/orders/:id").get(isAuthenticated, getOrder);
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/orders/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

export default router;
