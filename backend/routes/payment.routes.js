import { Router } from "express";
const router = Router();

import {
  processPayment,
  sendStripApi,
} from "../controllers/payment.controller";

import { isAuthenticated } from "../middlewares/auth";

router.route("/payment/process").post(isAuthenticated, processPayment);
router.route("/stripeapi").get(isAuthenticated, sendStripApi);

export default router;
