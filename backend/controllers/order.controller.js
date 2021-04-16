import { default as Order } from "../models/order.model";
import { default as Product } from "../models/product.model";
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

  res.status(200).json({ success: true, order });
});

// Get order by id => /api/v1/orders/:id
export const getOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populated(
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

  res.status(200).json({ success: true, orders });
});

// Admin Order Routes

// Get all orders => /api/v1/admin/orders
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({ success: true, ordersCount: orders.length, orders });
});

// Update Order => /api/v1/admin/order/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  if ((order.status = "Delivered")) {
    return next(
      new ErrorHandler(
        `Order was delivered already at: ${order.deliveredAt}`,
        400
      )
    );
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}
