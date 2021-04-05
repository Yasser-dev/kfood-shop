import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/product.controller";

import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductById);
router.route("/admin/products/new").post(isAuthenticated, newProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct);

export default router;
