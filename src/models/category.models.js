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
      enum: ["income", "expense"],
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
