import express from "express";
import { foodCreateController } from "../../controllers/food/foodCreate.js";
import { foodListController } from "../../controllers/food/foodList.js";
import { foodGetController } from "../../controllers/food/foodGet.js";
import { foodUpdateController } from "../../controllers/food/foodUpdate.js";
import { foodDeleteController } from "../../controllers/food/foodDelete.js";

const router = express.Router();

router.post("/create", foodCreateController);
router.get("/get", foodListController);
router.get("/get/:id", foodGetController);
router.put("/update", foodUpdateController);
router.delete("/delete", foodDeleteController);

export default router;
