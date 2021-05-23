import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    });
};
