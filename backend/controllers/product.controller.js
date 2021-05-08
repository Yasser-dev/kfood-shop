import Product from "../models/product.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ApiFeatures from "../utils/ApiFeatures";

// Get all products => /api/v1/products?name=xxx
export const getProducts = catchAsyncErrors(async (req, res, _) => {
  const resultsPerPage = 4;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productsCount,
    resultsPerPage,
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

// Add a Product => /api/v1/admin/products/new
export const addProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.createdBy = req.user.id;
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

// Get product reviews => /api/v1/products/:id/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, reviews: product.reviews });
});

// Create a new review => /api/v1/products/:id/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const { rating, comment } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // total rating of the product
  product.ratings =
    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

// Delete all product reviews => /api/v1/products/:id/reviews
export const deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findByIdAndUpdate(req.params.id, {
    reviews: [],
    numOfReviews: 0,
    ratings: 0,
  });
  res.status(200).json({
    success: true,
    message: `Product with id: ${req.params.id} has all its reviews deleted`,
  });
});

// Delete product review by id => /api/v1/products/:id/reviews/:rid
export const deleteProductReviewById = catchAsyncErrors(
  async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const requestedReview = product.reviews.find(
      (review) => review._id.toString() === req.params.rid.toString()
    );

    if (!requestedReview) {
      return next(new ErrorHandler("Review is not found", 404));
    }

    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.params.rid.toString()
    );
    const numOfReviews = reviews.length;
    const ratings =
      product.reviews.reduce((acc, r) => r.rating + acc, 0) / reviews.length;

    if (
      req.user.role === "admin" ||
      req.user._id.toString() === requestedReview.user.toString()
    ) {
      await Product.findByIdAndUpdate(req.params.id, {
        reviews,
        numOfReviews,
        ratings,
      });
      res.status(200).json({
        success: true,
        message: `Product with id: ${req.params.id} has all its review with id: ${req.params.rid} deleted`,
      });
    } else {
      res.status(403).json({
        success: false,
        message: `Review with id: ${req.params.rid} does not belong to you!`,
      });
    }
  }
);
