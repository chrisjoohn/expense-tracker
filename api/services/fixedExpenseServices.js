import FixedExpenseModel from "../models/fixedExpense";

export const getFixedExpenses = async ({ userID }) => {
  return FixedExpenseModel.find({ userID });
};
