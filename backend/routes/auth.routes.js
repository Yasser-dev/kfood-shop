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
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/auth.controller";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth";
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

// Admin Routes
router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getUserById)
  .put(isAuthenticated, authorizeRoles("admin"), updateUser);

export default router;
