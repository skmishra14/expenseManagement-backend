import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.models.js";

const createExpense = asyncHandler(async (req, res) => {
  // get amount, type, description
  // validate is entered correctly
  // create the record
  const { amount, type, description, isDeleted } = req.body;

  if ([amount, type].some((item) => item?.trim() !== "")) {
    throw new ApiError(400, "Required fields are empty");
  }

  if (amount < 0) {
    throw new ApiError(400, "Amount can not be negative");
  }

  if (type !== "income" || type !== "expense" || type != "investment") {
    throw new ApiError(400, "Selected type does not exist");
  }

  const expense = await Expense.create({
    amount: amount,
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

export { createExpense };
