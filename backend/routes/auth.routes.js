import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updatePassword,
  updateProfile,
  logoutUser,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth";
const router = express.Router();

// Auth Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);

// User Routes
router.route("/currentuser").get(isAuthenticated, getCurrentUser);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/currentuser/update").put(isAuthenticated, updateProfile);

export default router;
