import app from "./app";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`ERROR ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});

// setting up config file
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`ERROR ${err.message}`);
  console.log("Shutting down server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});
