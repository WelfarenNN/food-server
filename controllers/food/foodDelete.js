import { Food } from "../../schemas/food-schema.js";

export const foodDeleteController = async (request, response) => {
  try {
    const { id } = request.body;

    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return response.status(494).json({ message: "food item not found" });
    }

    response.status(200).json({ message: "delete", deletedFood });
  } catch (error) {
    response
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};
