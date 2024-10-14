import express from "express";
import { setPassword } from "../controllers/auth.js";
import { registerMainBill } from "../controllers/mainBill.js";
const router = express.Router();

router.post("/", registerMainBill);
router.put("/", setPassword);
router.get("/customer/:id", setPassword);

export default router