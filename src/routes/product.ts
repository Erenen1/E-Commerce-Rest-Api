import express from "express";
const router = express.Router();
import { getProductDetail, getProducts,postProduct } from "../controllers/products"


router.get("/", getProducts);
router.get("/:productId", getProductDetail);


router.get("/", getProducts);
router.post("/", postProduct);
router.put("/:productId", getProductDetail);
router.delete("/:productId", getProductDetail);





export default router;