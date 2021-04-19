import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  addProduct,
  updateProduct,
  getProductReviews,
  createProductReview,
  deleteProductReviews,
  deleteProductReviewById,
} from "../controllers/product.controller";

import { isAuthenticated, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductById);
router
  .route("/admin/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), addProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router
  .route("/products/:id/reviews")
  .get(isAuthenticated, getProductReviews)
  .put(isAuthenticated, createProductReview)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProductReviews);

router
  .route("/products/:id/reviews/:rid")
  .delete(isAuthenticated, deleteProductReviewById);

export default router;
