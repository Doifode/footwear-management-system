import express from "express";
import { deleteShopById, disableShopById, getAllShops, getShopById, registerShop, restoreShopById, updateShopById } from "../controllers/shop.js";
const route = express.Router();

route.get("/", getAllShops);
route.post("/", registerShop);
route.get("/:id", getShopById);
route.put("/:id", updateShopById);
route.delete("/:id", deleteShopById);
route.delete("/disable/:id", disableShopById);
route.delete("/restore/:id", restoreShopById);

export default route