const router = require("express").Router();
const passport = require("passport");

const AuthController = require("../controllers/auth");

router.post("/register", AuthController.register);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  AuthController.login
);

router.get("/resend-verify-email", AuthController.resendVerifyEmail);
router.get("/verify-email/:userId/:verifyCode", AuthController.verifyEmail);

module.exports = router;
