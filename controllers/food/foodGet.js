import { Food } from "../../schemas/food-schema.js";

export const foodGetController = async (request, response) => {
  try {
    const { id } = request.params;
    const food = await Food.findById(id).populate("category", "categoryName");

    if (!food) {
      return response.status(404).json({ message: "food item not found" });
    }

    response.status(200).json({ message: "food item found", food });
  } catch (error) {
    response
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};
