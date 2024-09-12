import express from "express";
import { getUsersByShopId, registerUser, setPassword } from "../controllers/user.js";
const router = express.Router();

router.post("/", registerUser)
router.put("/setPassword", setPassword)
router.get("/:shopId",getUsersByShopId)

export default router;