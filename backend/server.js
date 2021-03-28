import app from "./app";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";

// setting up config file
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
