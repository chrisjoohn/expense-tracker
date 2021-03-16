const router = require("express").Router();
const passport = require("passport");

const AuthController = require("../controllers/auth");

router.post("/register", AuthController.register);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  AuthController.login
);

module.exports = router;
