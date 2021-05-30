import Order from "../models/order.model";
import Product from "../models/product.model";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

// Create a new order => /api/v1/orders/new
export const createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    shippingPrice,
    orderItems,
    itemsPrice,
    taxPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    shippingPrice,
    orderItems,
    itemsPrice,
    taxPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity, "remove");
  });
  res.status(200).json({ success: true, order });
});

// Get order by id => /api/v1/orders/:id
export const getOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(200).json({ success: true, order });
});

// Get logged in user Orders => /api/v1/orders/currentuser
export const getCurrentUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// Admin Order Routes

// Get all orders => /api/v1/admin/orders
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    if (order.orderStatus === "Delivered") {
      totalAmount += order.totalPrice;
    }
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order => /api/v1/admin/order/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }
  if (order.orderStatus === "Cancelled") {
    return next(new ErrorHandler("You have already cancelled this order", 400));
  }

  if (req.body.status === "Cancelled") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity, "add");
    });
  }

  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

  await order.save();

  res.status(200).json({
    success: true,
  });
});

// Delete Order => /api/v1/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  await order.remove();
  res
    .status(200)
    .json({ success: true, message: "Order deleted successfully" });
});

// Util Functions

async function updateStock(id, quantity, state) {
  const product = await Product.findById(id);
  if (state === "add") {
    product.stock = product.stock + quantity;
  }
  if (state === "remove") {
    product.stock = product.stock - quantity;
  }
  await product.save({ validateBeforeSave: false });
}
