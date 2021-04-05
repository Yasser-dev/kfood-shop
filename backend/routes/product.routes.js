import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/product.controller";

import { isAuthenticated, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.route("/products").get(isAuthenticated, getProducts);
router.route("/products/:id").get(getProductById);
router
  .route("/admin/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), newProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

export default router;
