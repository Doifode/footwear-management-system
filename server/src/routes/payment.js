import express from "express";
import { getAllPaymentTypes } from "../controllers/payment.js";
const router = express.Router();

router.get("/", getAllPaymentTypes);

export default router