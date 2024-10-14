import express from "express";
import { getBrandsByShopId } from "../controllers/brand.js";
import { getAllCustomers, registerCustomer } from "../controllers/customer.js";
const router = express.Router();

router.post("/", registerCustomer);
router.get("/", getAllCustomers);


export default router