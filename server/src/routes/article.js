import express from "express";
import { getArticlesByShopId, registerArticle } from "../controllers/article.js";
const router = express.Router();

router.post("/", registerArticle);
router.get("/", getArticlesByShopId);


export default router