import { Router } from "express";
import {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import multer from "multer";

const upload = multer();

const router = Router();

router.route('/create-expense').post(upload.none(),verifyJWT, createExpense);
router.route('/get-expense').get(verifyJWT, getExpenses);
router.route('/update/:id').patch(upload.none(),verifyJWT, updateExpense);
router.route('/delete/:id').patch(upload.none(),verifyJWT, deleteExpense);

export default router;