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
