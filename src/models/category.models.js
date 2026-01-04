import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense", "investment"],
      index: true
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
