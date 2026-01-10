import { Router } from "express";
import {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/create-expense').post(verifyJWT, createExpense);
router.route('/get-expense').get(verifyJWT, getExpenses);
router.route('/update/:id').patch(verifyJWT, updateExpense);
router.route('/delete/:id').post(verifyJWT, deleteExpense);

export default router;