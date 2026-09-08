import express from "express";
import { foodCategoryDeleteController } from "../../controllers/food-category/food-category-delete.js";
import { foodCategoryGetController } from "../../controllers/food-category/food-category-get.js";
import { foodCategoryUpdatedController } from "../../controllers/food-category/food-category-update.js";
import { foodCategoryCreateController } from "../../controllers/food-category/food-category-create.js";

const router = express.Router();

router.post("/create", foodCategoryCreateController);
router.get("/get", foodCategoryGetController);
router.put("/update", foodCategoryUpdatedController);
router.delete("/delete", foodCategoryDeleteController);

export default router;
