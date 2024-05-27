import express from "express";
const router = express.Router();
import {getUser} from "../controllers/user"


router.get("/profile",getUser);
router.put("/profile");




export default router;