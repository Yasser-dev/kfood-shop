import express from "express";
import { default as errorMiddleware } from "./middlewares/errors";
import { default as products } from "./routes/product.routes";
const app = express();

app.use(express.json());

app.use("/api/v1", products);

// Error handling middleware
app.use(errorMiddleware);
export default app;
