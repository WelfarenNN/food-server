import express from "express";
import { foodCategoryDeleteController } from "../../controllers/food-category/food-category-delete.js";
import { foodCategoryGetController } from "../../controllers/food-category/food-category-get.js";
import { foodCategoryUpdatedController } from "../../controllers/food-category/food-category-update.js";
import { foodCategoryCreateController } from "../../controllers/food-category/food-category-create.js";
import { requireAdmin } from "../../middleware/require-admin.js";
import { requireToken } from "../../middleware/require-token.js";

const router = express.Router();

const requireCategoryName = (request, response, next) => {
  const { categoryName } = request.body;
  if (!categoryName) {
    return response.status(400).json({ message: "categoryName is required" });
  } else {
    next();
  }
};

router.post(
  "/create",
  requireAdmin,
  requireToken,
  requireCategoryName,
  foodCategoryCreateController,
);
router.get("/get", foodCategoryGetController);
router.put(
  "/update",
  requireAdmin,
  requireToken,
  foodCategoryUpdatedController,
);
router.delete(
  "/delete",
  requireAdmin,
  requireToken,
  foodCategoryDeleteController,
);

export default router;
