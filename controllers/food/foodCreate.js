import { Food } from "../../schemas/food-schema.js";

export const foodCreateController = async (request, response) => {
  try {
    const { name, price, image, ingredients, category } = request.body;

    const food = await Food.create({
      name,
      price,
      image,
      ingredients,
      category,
    });

    response.status(201).json({ message: "food item created", food });
  } catch (error) {
    response
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};
