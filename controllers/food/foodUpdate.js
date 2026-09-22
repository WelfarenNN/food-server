import { Food } from "../../schemas/food-schema.js";

export const foodUpdateController = async (request, response) => {
  try {
    const { id, name, price, image, ingredients, category } = request.body;

    const food = await Food.findByIdAndUpdate(
      id,
      { name, price, image, ingredients, category },
      { new: true },
    );

    if (!food) {
      return response.status(404).json({ message: "food item not found" });
    }

    response.status(200).json({ message: "food item updated", food });
  } catch (error) {
    response
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};
