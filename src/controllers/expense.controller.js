import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: Category,
    },
    description: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      require: true,
      enum: ["true", "false"],
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", expenseSchema);
