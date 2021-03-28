import { default as Product } from "../models/product.model";

export const getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "this route will show all products",
  });
};

export const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({ success: true, product });
};
