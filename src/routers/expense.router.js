import { Router } from "express";
import {
    createExpense,
    getExpenses
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/create-expense').post(verifyJWT, createExpense);
router.route('/create-expense').get(verifyJWT, getExpenses);

export default router;