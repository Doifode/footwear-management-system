import express from "express";
import { getColorsByShopId, registerColor } from "../controllers/color.js";
const router = express.Router();

router.post("/", registerColor);
router.get("/", getColorsByShopId);


export default router