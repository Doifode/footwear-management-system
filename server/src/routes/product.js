import express from "express";
import { registerArticle } from "../controllers/article.js";
import { getProductByShopId } from "../controllers/product.js";
const router = express.Router();

router.post("/", registerArticle);
router.get("/", getProductByShopId);


export default router