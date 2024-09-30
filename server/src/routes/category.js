import express from "express";
import { setPassword } from "../controllers/auth.js";
import { getCategoriesByShopId, registerCategory } from "../controllers/category.js";
const router = express.Router();

router.post("/", registerCategory);
router.put("/", setPassword);
router.delete("/", setPassword);
router.get("/", getCategoriesByShopId);

export default router