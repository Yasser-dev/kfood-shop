import app from "./app.js";
import dotenv from "dotenv";

// setting up config file
dotenv.config({ path: "backend/config/config.env" });

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
