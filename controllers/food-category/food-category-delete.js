import { FoodCategory } from "../../schemas/food-category.js";

export const foodCategoryDeleteController = async (request, response) => {
  try {
    const { id } = request.body;

    const deletedCategory = await FoodCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return response.status(494).json({ message: "food category not found" });
    }

    response.status(200).json({ message: "delete", deletedCategory });
  } catch (error) {
    response.status(500).json({ message: "internal server error", error: err });
  }
};
