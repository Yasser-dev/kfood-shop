import express from "express";
import { getProducts, newProduct } from "../controllers/product.controller";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/new").post(newProduct);

export default router;
