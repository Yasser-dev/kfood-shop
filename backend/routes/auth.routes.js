import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  logoutUser,
} from "../controllers/auth.controller";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logoutUser);

export default router;
