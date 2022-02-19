const router = require("express").Router();

const ExpenseController = require("../controllers/expense");

router.post("/", ExpenseController.create);
router.get("/:expenseId", ExpenseController.findById);
router.get("/", ExpenseController.find);
router.patch("/:expenseId", ExpenseController.update);
router.delete("/:expenseId", ExpenseController.delete);

module.exports = router;
