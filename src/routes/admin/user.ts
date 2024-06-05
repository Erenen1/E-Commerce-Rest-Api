import express from "express";
const router = express.Router();
import { getUsers,getUserDetail,deleteUserForAdmin,updateUserForAdmin} from "../../controllers/user"

router.get("/",getUsers);
router.get("/",getUserDetail);
router.put("/",updateUserForAdmin);
router.delete("/",deleteUserForAdmin);


export default router;