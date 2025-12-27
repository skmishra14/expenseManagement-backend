import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.models.js";

const createExpense = asyncHandler(async (req, res) => {
    res.send('HELLO');
});

export {createExpense};