const FixedExpenseModel = require("../models/fixedExpense");
import moment from "moment";

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

    console.log(req.user._id);

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
};
