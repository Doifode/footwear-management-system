import express from "express";
import { setPassword, verifyUser } from "../controllers/auth.js";
const router = express.Router();

router.post("/verifyUser", verifyUser);
router.put("/setPassword", setPassword);

export default router