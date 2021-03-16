const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "TOKEN_SECRET_KEY";

module.exports = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      let newUser = new UserModel({ firstName, lastName, email, password });
      let savedUser = await newUser.save();

      return res.json(savedUser);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  login: async (req, res) => {
    const { user } = req;
    let token = jwt.sign({ id: user._id }, TOKEN_SECRET);
    res.json({ id: user._id, token });
  },
};
