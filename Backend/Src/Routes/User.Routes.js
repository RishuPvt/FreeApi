import { Router } from "express";
import { registerUser, loginUser , logoutUser , currentUser} from "../Controller/User.controller.js";
import { verifyJWT } from "../Middleware/Auth.middleware.js";
const router = Router();

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post( loginUser);
router.route("/logoutUser").post( verifyJWT , logoutUser);
router.route("/currentUser").get( verifyJWT , currentUser);



export default router;
