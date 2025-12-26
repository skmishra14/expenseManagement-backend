import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import multer from "multer";

// allows to request data from the form
const upload = multer();

const router = Router();

router.route('/register-user').post(upload.none(), registerUser);

export default router;