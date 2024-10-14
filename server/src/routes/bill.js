import express from "express";
import { registerBill } from "../controllers/bill.js";
const router = express.Router();

router.post("/", registerBill);

export default router