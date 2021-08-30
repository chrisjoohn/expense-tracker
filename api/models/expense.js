const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new mongoose.Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
  },
  title: {
    type: String,
    required: [true, "Expense title is required!"],
  },
  amount: { type: Number, required: [true, " Amount is required"] },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  dateUpdated: {
    type: Date,
    default: Date.now(),
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

const ExpenseModel = new mongoose.model("Expense", ExpenseSchema);

module.exports = ExpenseModel;
