import { Router } from "express";
import { working } from "../controllers/user.controller.js";

const router = Router();

router.route('/check').get(working);

export default router;