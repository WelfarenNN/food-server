import { FoodCategory } from "../../schemas/food-category.js";

export const foodCategoryUpdatedController = async (request, response) => {
  try {
    const { id, categoryName } = request.body;

    const foodCategory = await FoodCategory.findByIdAndUpdate(
      id,
      { categoryName: categoryName },
      { new: true },
    );
    if (!foodCategory) {
      return response.status(404).json({ message: "category not found" });
    }
    response
      .status(200)
      .json({ message: "food category updated", foodCategory });
  } catch (error) {
    response.status(500).json({ message: "internal server error", error: err });
  }
};
