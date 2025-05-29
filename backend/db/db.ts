import mongoose from "mongoose";
import config from "../core/config";

export const connectDb = async () => {
  mongoose.set({
    strictQuery: true,
  });

  try {
    console.log("Connecting to mongo DB");
    const conn = await mongoose.connect(config.MONGODB_URL);
    console.log(`Connected to Mongo DB: ${conn.connection.host}`);
  } catch (e) {
    console.log(`Failed to connect to MongoDB: ${e}`);
    process.exit(1);
  }
};
