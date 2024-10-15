import express from "express";
import { getAllBillsByMainBill, registerBill } from "../controllers/bill.js";
const router = express.Router();

router.post("/", registerBill);
router.get("/:id", getAllBillsByMainBill);

export default router