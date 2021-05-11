import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Stripe from "stripe";

// Process stripe payments   =>   /api/v1/payment/process
export const processPayment = catchAsyncErrors(async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "egp",

    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send stripe API Key   =>   /api/v1/stripeapi
export const sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
