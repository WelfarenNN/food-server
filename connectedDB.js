import { mongoose } from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://WelfarenNN:425824@food-delivery.3a0us94.mongodb.net/",
    );
    console.log("DB is connected");
  } catch (err) {
    console.log(err);
  }
};
