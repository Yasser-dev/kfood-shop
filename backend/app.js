import express from "express";
import cookieParser from "cookie-parser";
import { default as errorMiddleware } from "./middlewares/errors";
import { default as products } from "./routes/product.routes";
import { default as auth } from "./routes/auth.routes";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", products);
app.use("/api/v1", auth);

// Error handling middleware
app.use(errorMiddleware);
export default app;
