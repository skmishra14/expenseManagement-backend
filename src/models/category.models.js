import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense", "investment"],
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
