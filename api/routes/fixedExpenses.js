const router = require("express").Router();

const FixedExpenseController = require("../controllers/fixedExpenses");

router.get("/payables", FixedExpenseController.getPayables);
router.post("/", FixedExpenseController.create);
router.get("/:id", FixedExpenseController.findById);
router.get("/", FixedExpenseController.findAll);
router.patch("/:id", FixedExpenseController.update);
router.delete("/:id", FixedExpenseController.delete);

module.exports = router;
