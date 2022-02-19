import moment from "moment";

import ExpenseModel from "../models/expense";

export const findExpenses = async ({
  dateTo,
  dateFrom,
  userID,
  all = false,
}) => {
  const expenses = await ExpenseModel.find({ userID }).exec();

  if (all) {
    return expenses;
  }

  if (
    dateFrom &&
    dateTo &&
    moment(dateFrom).isSameOrBefore(moment(dateTo), "day")
  ) {
    return expenses.filter((expense) => {
      return (
        moment(expense.dateCreated).isSameOrAfter(moment(dateFrom), "day") &&
        moment(expense.dateCreated).isSameOrBefore(moment(dateTo), "day")
      );
    });
  }

  // Return expenses with on the same month by default
  return expenses.filter((expense) => {
    return moment(expense.dateCreated).isSame(moment(), "month");
  });
};
