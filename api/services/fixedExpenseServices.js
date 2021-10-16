import moment from "moment";

import FixedExpenseModel from "../models/fixedExpense";
import { findExpenses } from "./expenseServices";
import { combineExpenses } from "../utils/aux";

export const getFixedExpenses = async ({ userID }) => {
  return FixedExpenseModel.find({ userID });
};

export const getToBeCreatedExpenses = async ({ userID }) => {
  /**
   * GOAL: Malaman kung aling fixed expenses yung kailangan gawan ng bagong logged expense
   * - subscription that is not yet on the logged expenses
   * - fixed payments that is not yet on the logged expenses and is also not yet fully paid
   */

  // Get fixed expenses that is already logged on expenses;
  const expenses = (await findExpenses({ userID, all: true })).filter(
    ({ fixedExpenseId }) => fixedExpenseId
  );

  const thisMonthExpenses = expenses.filter(({ dateCreated }) => {
    return moment(dateCreated).isSame(moment(), "month");
  });

  const combinedExpenses = combineExpenses(expenses, "fixedExpenseId");

  // Get All Fixed expenses
  const fixedExpenses = await getFixedExpenses({ userID });

  //Find fixedExpenses that is not on expenses
  const toBeCreatedExpenses = fixedExpenses
    .filter(
      (fixedExpense) =>
        // Get fixed expense that is not yet on the logged expenses
        !thisMonthExpenses.some(({ fixedExpenseId }) => {
          return fixedExpenseId.toString() === fixedExpense._id.toString();
        })
    )
    .filter(({ amount, _id }) => {
      const hit = combinedExpenses.find(
        ({ fixedExpenseId }) => _id.toString() === fixedExpenseId.toString()
      );

      if (!hit) {
        return true;
      }

      if (hit.monthsToPay === -1) {
        return true;
      }

      return amount - hit.amount > 0;
    })
    .map(({ title, amount, monthsToPay, _id }) => {
      return {
        userID,
        title,
        fixedExpenseId: _id,
        amount: monthsToPay === -1 ? amount : amount / monthsToPay,
      };
    });

  return toBeCreatedExpenses;
};
