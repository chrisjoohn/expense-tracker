const router = require("express").Router();
const passport = require("passport");

const authRoutes = require("./auth");
const expenseRoutes = require("./expense");

router.use("/auth", authRoutes);
router.use(
  "/expense",
  passport.authenticate("jwt", { session: false }),
  expenseRoutes
);

module.exports = router;
