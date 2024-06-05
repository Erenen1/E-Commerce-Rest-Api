import express from "express";
const router = express.Router();
import { getProductDetail, getProducts } from "../controllers/products"


router.get("/", getProducts);
router.get("/:productId", getProductDetail);


export default router;