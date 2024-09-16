import express from "express";
import { verifyUser } from "../controllers/auth.js";
const router = express.Router();

router.post("/verifyUser", verifyUser)
export default router