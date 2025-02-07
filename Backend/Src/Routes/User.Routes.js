import { Router } from "express";
import { registerUser, loginUser } from "../Controller/User.controller.js";
const router = Router();

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post( loginUser);

export default router;
