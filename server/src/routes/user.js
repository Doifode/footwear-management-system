import express from "express";
import { getUserById, getUsersByShopId, registerUser } from "../controllers/user.js";
const router = express.Router();

router.post("/", registerUser)
router.get("/:shopId", getUsersByShopId);
router.get("/user/:userId", getUserById);



export default router;