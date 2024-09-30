import express from "express";
import { getBrandsByShopId, registerBrand } from "../controllers/brand.js";
const router = express.Router();

router.post("/", registerBrand);
router.get("/", getBrandsByShopId);


export default router