import { Food } from "../../schemas/food-schema.js";

export const foodListController = async (request, response) => {
  try {
    const { category } = request.query; 
    let filter = {};

    if (category) {
      filter.category = category;
    }

    const food = await Food.find(filter).populate(
      "category",
      "categoryName",
    );

    response.status(200).json({ message: "food items found", foods: food });
  } catch (error) {
    response
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};
