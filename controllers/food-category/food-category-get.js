import { FoodCategory } from "../../schemas/food-category.js";

export const foodCategoryGetController = async (request, response) => {
  try {
    const foodCategory = await FoodCategory.find();
    response
      .status(200)
      .json({ message: "food category found", foodCategories: foodCategory });
  } catch (error) {
    response.status(500).json({ message: "internal server error", error: err });
  }
};
