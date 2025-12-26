import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
} from "../controllers/user.controller.js";
import multer from "multer";
import { verifyJWT } from "../middleware/auth.middleware.js";

// allows to request data from the form
const upload = multer();

const router = Router();

router.route("/register-user").post(upload.none(), registerUser);
router.route("/login-user").post(upload.none(), loginUser);
router.route("/logout-user").post(verifyJWT, logoutUser);
router.route("/get-details").get(verifyJWT, getUserDetails);

export default router;
