import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import multer from "multer";

// allows to request data from the form
const upload = multer();

const router = Router();

router.route('/register-user').post(upload.none(), registerUser);
router.route('/login-user').post(upload.none(), loginUser);

export default router;