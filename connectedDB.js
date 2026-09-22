import { mongoose } from "mongoose";
import "dotenv/config";

const MONGO_DB_URL = process.env.MONGO_DB || "";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log("DB is connected");
  } catch (err) {
    console.log(err);
  }
};
