import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import errorMiddleware from "./middlewares/errors";
import auth from "./routes/auth.routes";
import products from "./routes/product.routes";
import orders from "./routes/order.routes";
import payment from "./routes/payment.routes";
const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", auth);
app.use("/api/v1", products);
app.use("/api/v1", orders);
app.use("/api/v1", payment);

// Error handling middleware
app.use(errorMiddleware);
export default app;
