import express from "express";
import { connectDB } from "./connectedDB.js";
import AuthRouter from "./routers/auth/auth.js";
import FoodCategoryRouter from "./routers/food-category/food-category-router.js";
import cors from "cors"

const app = express();

const PORT = 1111;

app.use(express.json());
app.use(cors())

connectDB();

app.get("/api/health", (request, response) => {
  response.json({ message: `API HEALTHY RUNNING ON!${PORT}` });
});

app.use("/auth", AuthRouter);
app.use("/food-category", FoodCategoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//mongodb+srv://WelfarenNN:425824@food-delivery.3a0us94.mongodb.net/
