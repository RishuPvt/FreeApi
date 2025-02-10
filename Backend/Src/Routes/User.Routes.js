import { Router } from "express";
import { registerUser, loginUser , logoutUser} from "../Controller/User.controller.js";
import { verifyJWT } from "../Middleware/Auth.middleware.js";
const router = Router();

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post( loginUser);
router.route("/logoutUser").post( verifyJWT , logoutUser);


export default router;
