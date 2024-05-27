import express from "express";
const router = express.Router();
import { deleteProduct, getProductsForAdmin, postProduct, updateProduct, getProductForAdmin } from "../../controllers/products"
import { onlyAdmin } from "../../middlewares/authentication";



router.get("/", onlyAdmin, getProductsForAdmin);
router.get("/:productId", onlyAdmin, getProductForAdmin);
router.post("/", onlyAdmin, postProduct);
router.put("/:productId", onlyAdmin, updateProduct);
router.delete("/:productId", onlyAdmin, deleteProduct);





export default router;