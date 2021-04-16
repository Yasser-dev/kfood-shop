import express from "express";
import {
  createOrder,
  getOrder,
  getCurrentUserOrders,
} from "../controllers/order.controller";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.route("/orders/new").post(isAuthenticated, createOrder);
router.route("/orders/:id").get(isAuthenticated, getOrder);
router.route("/orders/currentuser").get(isAuthenticated, getCurrentUserOrders);
export default router;
