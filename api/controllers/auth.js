const jwt = require("jsonwebtoken");

const UserModel = require("../models/user");
const VerifyCodeModel = require("../models/verifyCode");

const { sendEmail } = require("../utils/emailHandler");
const { GenerateCode } = require("../helpers/aux");
const { ResendVerifyCodeEmailTemplate } = require("../utils/emailTemplates");

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

  verifyEmail: async (req, res) => {
    const { verifyCode, userId } = req.params;

    //Find the code associated with the userID then delete existing code
    VerifyCodeModel.findOneAndDelete({ code: verifyCode, userId }, function (
      err,
      match
    ) {
      if (err) {
        return res.status(400).json({ message: "Bad Request" });
      }

      if (!match) {
        return res.status(400).json({ message: "Code Expired" });
      }

      //Update the user status
      UserModel.findByIdAndUpdate(userId, { status: "verified" }).exec();

      res.json({
        status: 200,
        message: "Email Verified!",
      });
    });
  },

  resendVerifyEmail: async (req, res) => {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Bad Request" });
    }
    const user = await UserModel.findOne({ email }).exec();

    //Check if user exists and if status is pending
    if (!user || user.status !== "pending") {
      return res.json({ message: "ok" });
    }

    //Check if verification exists
    let verifyCode = await VerifyCodeModel.findOne({ userId: user._id }).exec();
    if (!verifyCode) {
      // will create new code and will send email to user
      let newVerifyCode = new VerifyCodeModel({
        userId: user._id,
        code: GenerateCode(),
      });

      newVerifyCode.save();

      sendEmail(
        email,
        "Verification code",
        ResendVerifyCodeEmailTemplate(
          user.firstName,
          newVerifyCode.code,
          user._id
        )
      );
      res.json({ message: "ok" });
      return;
    }

    //send existing code to the user
    sendEmail(
      email,
      "Verification code",
      ResendVerifyCodeEmailTemplate(user.firstName, verifyCode.code, user._id)
    );

    res.json({ message: "ok" });
  },

  me: async (req, res) => {
    let user = await UserModel.findById(req.user._id).exec();

    return res.json(user);
  },
};
