const router = require("express").Router();

const AuthController = require("../controllers/auth");

router.post("/register", AuthController.register);

router.post("/login", (req, res) => {
  res.json({ message: "login endpoint" });
});

module.exports = router;
