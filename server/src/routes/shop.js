import express from "express";
import { disableShopById, getAllShops, getShopById, registerShop, activateShopById, updateShopById } from "../controllers/shop.js";
const route = express.Router();

route.get("/", getAllShops);
route.post("/", registerShop);
route.get("/:id", getShopById);
route.put("/", updateShopById);
route.delete("/disable/:id", disableShopById);
route.delete("/activate/:id", activateShopById);

export default route;