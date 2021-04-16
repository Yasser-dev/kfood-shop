import express from "express";
import { createOrder } from "../controllers/order.controller";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.route("/orders/new").post(isAuthenticated, createOrder);

export default router;
