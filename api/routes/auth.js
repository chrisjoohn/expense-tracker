const router = require("express").Router();
const passport = require("passport");

const AuthController = require("../controllers/auth");

router.post("/register", AuthController.register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  AuthController.login
);
router.post("/resend-verify-email", AuthController.resendVerifyEmail);

router.get("/verify-email/:userId/:verifyCode", AuthController.verifyEmail);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  AuthController.me
);

module.exports = router;
