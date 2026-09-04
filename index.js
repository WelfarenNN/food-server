import express, { response } from "express";
import mongoose from "mongoose";
import { connectDB } from "./connectedDB.js";
import { User } from "./schemas/user-schema.js";

const app = express();

const PORT = 1111;

app.use(express.json());

connectDB();

app.get("/api/health", (request, response) => {
  response.json({ message: `API HEALTHY RUNNING ON!${PORT}` });
});

app.post("/sign-up", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.create({ email, password });

    response.status(201).json({ message: "user created" });
  } catch (err) {
    response.status(500).json({ message: "Internal server error" });
  }
});

app.post("/food/category", async (request, response) => {});

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) {
      response.status(404).json({ message: "user not found" });
    }
    response.status(200).json({ message: "user found", user: user });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//mongodb+srv://WelfarenNN:425824@food-delivery.3a0us94.mongodb.net/
