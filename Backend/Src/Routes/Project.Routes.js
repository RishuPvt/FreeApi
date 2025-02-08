import { Router } from "express";
import { verifyJWT } from "../Middleware/Auth.middleware.js";
import { uploadProject, allProject, updateProject ,projectDetails } from "../Controller/Project.controller.js";

const router = Router();

router.route("/uploadproject").post(verifyJWT, uploadProject);
router.route("/allproject").get(allProject);
router.route("/updateProject/:projectId").patch(verifyJWT , updateProject);
router.route("/projectDetails/:projectId").get( projectDetails);



export default router;
