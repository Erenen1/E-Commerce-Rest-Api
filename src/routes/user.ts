import express from "express";
const router = express.Router();
import {getUserDetail,deleteUser,updateUser} from "../controllers/user"


router.get("/",getUserDetail);
router.put("/",updateUser);
router.delete("/",deleteUser);




export default router;