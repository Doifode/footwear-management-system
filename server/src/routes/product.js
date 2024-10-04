import express from "express";
import { deleteProductById, getProductByShopId, getProductSizeList, registerProduct, searchProduct, updateProduct } from "../controllers/product.js";
const router = express.Router();

router.post("/", registerProduct);
router.get("/", getProductByShopId);
router.put("/", updateProduct);
router.post("/getSizeList", getProductSizeList);
router.post("/searchProduct", searchProduct);
router.delete("/", deleteProductById);


export default router