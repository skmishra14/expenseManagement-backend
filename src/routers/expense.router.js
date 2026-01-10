import { Router } from "express";
import {
    createExpense,
    getExpenses,
    updateExpense
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/create-expense').post(verifyJWT, createExpense);
router.route('/create-expense').get(verifyJWT, getExpenses);
router.route('/update/:id').patch(verifyJWT, updateExpense);

export default router;