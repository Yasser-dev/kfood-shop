import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  addProduct,
  updateProduct,
  getProductReviews,
  createProductReview,
  deleteProductReview,
  getAdminProducts,
} from "../controllers/product.controller";

import { isAuthenticated, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .get(isAuthenticated, authorizeRoles("admin"), getAdminProducts);
router.route("/products/:id").get(getProductById);
router
  .route("/admin/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), addProduct);

router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticated, createProductReview);
router.route("/reviews").get(isAuthenticated, getProductReviews);
router.route("/reviews").delete(isAuthenticated, deleteProductReview);
export default router;
