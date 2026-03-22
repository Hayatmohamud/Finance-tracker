import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Cinwaanka (Title) waa khasab"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Lacagta (Amount) waa khasab"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category-ga waa khasab"],
      default: "General",
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
