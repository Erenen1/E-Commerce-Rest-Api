import express from "express";
const router = express.Router();
import {getWishlists,postWishToList,deleteAllWish,deleteWishFromList} from "../controllers/wishlist"


router.get("/",getWishlists);
router.post("/",postWishToList);
router.delete("/",deleteAllWish);
router.delete("/:productId",deleteWishFromList);


export default router;