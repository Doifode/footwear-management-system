import express from "express";
import { setPassword, verifyUser } from "../controllers/auth.js";
const router = express.Router();

router.post("/", verifyUser);
router.put("/", setPassword);
router.delete("/", setPassword);
router.get("/:id", setPassword);

export default router