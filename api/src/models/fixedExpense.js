const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FixedExpenseSchema = new mongoose.Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
  },
  title: {
    type: String,
    required: [true, "Expense title is required!"],
  },
  amount: {
    type: Number,
    required: [true, "Expense amount is required!"],
  },
  monthsToPay: {
    type: Number,
    default: -1,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  dateUpdated: {
    type: Date,
    default: Date.now(),
  },
});

const FixedExpenseModel = new mongoose.model(
  "FixedExpense",
  FixedExpenseSchema
);

module.exports = FixedExpenseModel;
