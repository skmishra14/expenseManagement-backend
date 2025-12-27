import { Router } from "express";
import {
    createExpense
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/create-expense').get(verifyJWT, createExpense);

export default router;