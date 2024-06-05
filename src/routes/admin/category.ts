import express from "express";
const router = express.Router();
import { getCategories,getSubCategories,postCategory,postSubCategory,deleteCategory,deleteSubCategory } from "../../controllers/category";
import { onlyAdmin } from "../../middlewares/authentication";



router.get("/subCategories", onlyAdmin, getSubCategories);
router.post("/subCategories", onlyAdmin, postSubCategory);
router.delete("/subCategories", onlyAdmin, deleteSubCategory);
router.get("/", onlyAdmin, getCategories);
router.post("/", onlyAdmin, postCategory);
router.delete("/", onlyAdmin, deleteCategory);



export default router;