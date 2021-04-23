const ExpenseModel = require("../models/expense");

module.exports = {
  create: async (req, res) => {
    const { title, amount } = req.body;

    try {
      const newExpense = new ExpenseModel({
        userID: req.user._id,
        title,
        amount,
      });
      const savedExpense = await newExpense.save();

      return res.json(savedExpense);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  update: async (req, res) => {
    const { expenseId } = req.params;
    try {
      let updatedExpense = await ExpenseModel.findByIdAndUpdate(
        expenseId,
        {
          ...req.body,
          dateUpdated: Date.now(),
        },
        { new: true }
      ).exec();

      res.json(updatedExpense);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  delete: async (req, res) => {
    try{

    }catch(err){
      console.log(err);
      return res.status(400).json(err);
    };
  },

  find: async (req, res) => {
    try {
      const expenses = await ExpenseModel.find({ userID: req.user._id }).exec();
      res.json(expenses);
    } catch (err) {
      console.log(err);
    }
  },

  findById: async (req, res) => {
    const { expenseId } = req.params;
    try {
      const expense = await ExpenseModel.findOne({
        _id: expenseId,
        userID: req.user._id,
      });

      if (!expense) {
        return res.status(400).json({
          message: "Not found!",
        });
      }

      return res.json(expense);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};
