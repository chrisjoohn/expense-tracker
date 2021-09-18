import moment from "moment";

import FixedExpenseModel from "../models/fixedExpense";
import ExpenseModel from "../models/expense";

import { findExpenses } from "../services/expenseServices";
import { getFixedExpenses } from "../services/fixedExpenseServices";
import { combineExpenses } from "../utils/aux";

module.exports = {
  create: async (req, res) => {
    // if months to pay is indefinite/subscription, monthsToPay = -1
    const { title, amount, monthsToPay } = req.body;
    try {
      const newFixedExpense = new FixedExpenseModel({
        userID: req.user._id,
        title,
        amount,
        monthsToPay,
      });

      const savedFixedExpense = await newFixedExpense.save();

      return res.json(savedFixedExpense);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  findAll: async (req, res) => {
    const { dateFrom, dateTo } = req.query;

    try {
      const fixedExpenses = await FixedExpenseModel.find({
        userID: req.user._id,
      });

      if (dateFrom && dateTo) {
        if (moment(dateFrom).isSameOrBefore(moment(dateTo), "day")) {
          const sortedFixedExpense = fixedExpenses.filter((fixedExpense) => {
            return (
              moment(fixedExpense.dateUpdated).isSameOrAfter(
                moment(dateFrom),
                "day"
              ) &&
              moment(fixedExpense.dateUpdated).isSameOrBefore(
                moment(dateTo),
                "day"
              )
            );
          });

          return res.json(sortedFixedExpense);
        } else {
          return res.status(400).json({ message: "Invalid date!" });
        }
      }

      const thisMonthFixedExpenses = fixedExpenses.filter((fixedExpense) => {
        return moment(fixedExpense.dateUpdated).isSame(moment(), "month");
      });

      return res.json(thisMonthFixedExpenses);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  findById: async (req, res) => {
    const { id } = req.params;
    try {
      const fixedExpense = await FixedExpenseModel.findOne({
        userID: req.user._id,
        _id: id,
      }).exec();

      if (!fixedExpense) {
        return res.status(400).json({
          message: "Not Found!",
        });
      }

      return res.json(fixedExpense);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;

    try {
      let updatedFixedExpense = await FixedExpenseModel.findByIdAndUpdate(
        id,
        { ...req.body, dateUpdated: Date.now() },
        { new: true }
      ).exec();

      if (!updatedFixedExpense) {
        return res.status(400).json({ message: "Not found!" });
      }

      res.json(updatedFixedExpense);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      let deletedFixedExpense = await FixedExpenseModel.findByIdAndDelete(
        id
      ).exec();

      return res.json({ id: deletedFixedExpense._id });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getPayables: async (req, res) => {
    const { dateFrom, dateTo } = req.query;

    const { _id: userID } = req.user;

    // Get fixed expenses that is already logged on expenses;
    const expenses = (await findExpenses({ userID })).filter(
      ({ fixedExpenseId }) => fixedExpenseId
    );

    // Get All Fixed expenses
    const fixedExpenses = await getFixedExpenses({ userID });

    //Find fixedExpenses that is not on expenses
    const toBeCreatedExpenses = fixedExpenses
      .filter(
        (fixedExpense) =>
          !expenses.some(({ fixedExpenseId }) => {
            return fixedExpenseId.toString() === fixedExpense._id.toString();
          })
      )
      .map(({ title, amount, monthsToPay, _id }) => {
        return {
          userID,
          title,
          fixedExpenseId: _id,
          amount: monthsToPay === -1 ? amount : amount / monthsToPay,
        };
      });

    try {
      // Create instances of Expense from FixedExpense
      await ExpenseModel.insertMany(toBeCreatedExpenses);

      const expenseRes = (
        await findExpenses({ userID, dateTo, dateFrom })
      ).filter(({ fixedExpenseId }) => fixedExpenseId);

      // return new payables from expenses
      return res.json(combineExpenses(expenseRes, "fixedExpenseId"));
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};
