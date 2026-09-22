import { FoodCategory } from "../../schemas/food-category.js";

export const foodCategoryCreateController = async (request, response) => {
  try {
    const { categoryName } = request.body;
    const foodCategory = await FoodCategory.create({
      categoryName: categoryName,
    });
    response
      .status(201)
      .json({ message: "food category created", foodCategory });
  } catch (error) {
    if (error.code === 11000) {
      return response
        .status(409)
        .json({ message: "categoryName is already exists" });
    }
    response
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};
