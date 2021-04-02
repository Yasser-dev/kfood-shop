import { default as Product } from "../models/product.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ApiFeatures from "../utils/ApiFeatures";

// Get all products => /api/v1/products?name=xxx
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 4;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
});

// Get single product by id => /api/v1/products/:id
export const getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Create a new Product => /api/v1/admin/products/new
export const newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorHandler("Product not created", 404));
  }
  res.status(200).json({ success: true, product });
});

// Update product => /api/v1/admin/products/:id

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete a product => /api/v1/admin/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
