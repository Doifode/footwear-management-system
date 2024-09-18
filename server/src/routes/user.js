import express from "express";
import { getUsersByShopId, registerUser } from "../controllers/user.js";
const router = express.Router();

router.post("/", registerUser)
router.get("/:shopId", getUsersByShopId);

export default router;