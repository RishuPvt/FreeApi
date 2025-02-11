import { Router } from "express";
import { verifyJWT } from "../Middleware/Auth.middleware.js";
import { uploadProject, allProject, updateProject ,projectDetails ,deleteProject, downloadProject , getDownloadCount} from "../Controller/Project.controller.js";
import {upload} from "../Middleware/multer.middleware.js"
const router = Router();

router.route("/uploadproject").post(verifyJWT, upload.array("fileUrl", 50), uploadProject);
router.route("/allproject").get(allProject);
router.route("/updateProject/:projectId").patch(verifyJWT , updateProject);
router.route("/projectDetails/:projectId").get( projectDetails);
router.route("/deleteProject/:projectId").delete( verifyJWT , deleteProject);

router.route("/downloadProject/:projectId").get(downloadProject)
router.route("/downloadCount/:projectId").get(getDownloadCount)



export default router;
