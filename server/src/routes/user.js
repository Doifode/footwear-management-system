import express from "express";
import { getUserById, getUsersByShopId, registerUser, updateUser } from "../controllers/user.js";
const router = express.Router();

router.post("/", registerUser)
router.get("/getUsers/:shopId", getUsersByShopId);
router.get("/getUserById/", getUserById);
router.put("/", updateUser);



export default router;