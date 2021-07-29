const router = require("express").Router();
const passport = require("passport");

const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./auth");
const expenseRoutes = require("./expense");

const specs = require("../docs/v1");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(specs));


router.use("/auth", authRoutes);
router.use(
  "/expense",
  passport.authenticate("jwt", { session: false }),
  expenseRoutes
);

module.exports = router;
