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

const updateExpense = asyncHandler(async (req, res) => {
  // get the expenseId from url params
  // get userId from the req.user
  // validate if the selected expenseId and userId exists
  // make sure only the necessary fields gets update
  // update with new values
  // return the updated response.
  const expenseId = req.params.id;
  const userId = req.user._id;

  const finderObj = {
    _id: expenseId,
    userId: userId,
    isDeleted: false,
  };

  const expense = await Expense.findOne(finderObj);
  if (!expense) {
    throw new ApiError(404, "expenseId does not exist");
  }

  const updateableFields = ["amount", "type", "description"];

  const updatedField = {};

  updateableFields.forEach((field) => {
    if (field in req.body) {
      updatedField[field] = req.body[field];
    }
  });

  if (Object.keys(updatedField.length) === 0) {
    throw new ApiError(400, "No fields to update");
  }

  const typeEnum = ["investment", "expense", "income"];

  // Validation checks for updated data
  // check if amount is present
  const updatedAmount = updatedField.hasOwnProperty("amount")
    ? Number(updatedField.amount)
    : null;
  // check if type exist
  const updatedType = updatedField.hasOwnProperty("type")
    ? updatedField.type
    : null;

  if (updatedAmount !== null && updatedAmount < 0 && updatedAmount === NaN) {
    throw new ApiError(400, "updated amount can not be negative");
  }

  if (updatedType !== null && !typeEnum.includes(updatedType)) {
    throw new ApiError(
      400,
      "updated type not part of enum, invalid updated value"
    );
  }

  const patchExpense = await Expense.findByIdAndUpdate(
    expenseId,
    {
      $set: updatedField,
    },
    {
      new: true,
    }
  );

  if (!patchExpense) {
    throw new ApiError(
      500,
      "Something went wrong in updating the expense details"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Fields updated", patchExpense));
});

const deleteExpense = asyncHandler(async (req, res) => {
  // get expense id that needs to be deleted.
  // get user id using req.user._id
  // find if expense for that use exists
  // just set the isDeleted flag to true
  // return with the updated details
  const expenseId = req.params.id;
  const userId = req.user._id;

  const findExpense = {
    _id: expenseId,
    userId: userId,
    isDeleted: false,
  };

  const expense = await Expense.findOne(findExpense);
  if (!expense) {
    throw new ApiError(404, "Expense does not exist");
  }

  const deletedExpense = await Expense.findByIdAndUpdate(
    expenseId,
    {
      $set: {
        isDeleted: true,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "deleted the record", deletedExpense));
});

export { createExpense, getExpenses, updateExpense, deleteExpense };
