import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.models.js";

const createExpense = asyncHandler(async (req, res) => {
  // get amount, type, description
  // validate is entered correctly
  // create the record
  const { amount, type, description, isDeleted } = req.body;

  if (!type) {
    throw new ApiError(400, "Required fields are empty");
  }
  if (!Number(amount)) {
    throw new ApiError(400, "Required fields are empty");
  }

  if (Number(amount) < 0) {
    throw new ApiError(400, "Amount can not be negative");
  }

  if (type !== "income" || type !== "expense" || type != "investment") {
    throw new ApiError(400, "Selected type does not exist");
  }

  const expense = await Expense.create({
    amount: Number(amount),
    type: type,
    description: description || "",
    isDeleted: isDeleted || false,
  });

  if (!expense) {
    throw new ApiError(500, "Something went wrong can not update the values");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "Created expense successfully", expense));
});

const getExpenses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { type, amount, description, start, end } = req.query;

  const filterQuery = {
    userId,
    isDeleted: false,
  };

  if (type) filterQuery.type = type;
  if (amount) filterQuery.amount = Number(amount);
  if (description) filterQuery.description = description;
  if (start || end) {
    filterQuery.date = {};
    if (start) filterQuery.date.$gte = new Date(start);
    if (end) filterQuery.date.$lte = new Date(end);
  }

  const findExpense = await Expense.find(filterQuery);
  //   findExpense will be [] when it doesn't find anything
  //   so no need to handle this condition
  return res
    .status(200)
    .json(new ApiResponse(200, "Got expenses report", findExpense));
});

export { createExpense, getExpenses };
