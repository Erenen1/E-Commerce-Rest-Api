import express from "express";
const router = express.Router();
import { getCart, postItemToCart, deleteItemFromCart } from "../controllers/cart"


router.get("/",getCart); //kullanıcın sepeti
router.post("/",postItemToCart); // sepete ekle
router.delete("/",deleteItemFromCart); // sepetten sil




export default router;