import express from "express";
import { default as products } from "./routes/product.routes";
const app = express();

app.use(express.json());

app.use("/api/v1", products);

export default app;
