import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let database;

const connectDB = async () => {
  const mongodb_url = process.env.MONGO_URI ;

  if (database) {
    return;
  }
  await mongoose
    .connect(mongodb_url)
    .then((connection) => {
      database = connection;
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("MongoDB connection error: ", error);
    });
};
export default connectDB;
