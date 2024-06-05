import express from "express";
const router = express.Router();
import { getAddress,postAddress,updateAddress,deleteAddress} from "../controllers/address"


router.get("/",getAddress); 
router.post("/",postAddress);
router.put("/",updateAddress);
router.delete("/",deleteAddress);


export default router;