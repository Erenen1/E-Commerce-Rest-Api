import express from "express";
const router = express.Router();
import { getCategories,getSubCategories } from "../controllers/category";



router.get("/subCategories",  getSubCategories);
router.get("/",  getCategories);



export default router;