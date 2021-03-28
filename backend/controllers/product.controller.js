import { default as Product } from "../models/product.model";

// Get all products => /api/v1/products
export const getProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// Get single product by id => /api/v1/products/:id
export const getProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({
      success: false,
      message: "product not found",
    });

  res.status(200).json({
    success: true,
    product,
  });
};

// Create a new Product => /api/v1/admin/products/new
export const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({ success: true, product });
};

// Update product => /api/v1/admin/products/:id

export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// Delete a product => /api/v1/admin/products/:id
export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({
      success: false,
      message: "product not found",
    });

  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
};
