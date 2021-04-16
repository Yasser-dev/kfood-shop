import express from "express";
import {
  createOrder,
  getOrder,
  getCurrentUserOrders,
  getAllOrders,
} from "../controllers/order.controller";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.route("/orders/new").post(isAuthenticated, createOrder);
router.route("/orders/:id").get(isAuthenticated, getOrder);
router.route("/orders/currentuser").get(isAuthenticated, getCurrentUserOrders);
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);
export default router;
