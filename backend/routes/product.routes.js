import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductById);
router.route("/admin/products/new").post(newProduct);
router.route("/admin/products/:id").put(updateProduct).delete(deleteProduct);

export default router;
