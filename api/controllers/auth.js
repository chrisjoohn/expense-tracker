const UserModel = require("../models/user");

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
};
