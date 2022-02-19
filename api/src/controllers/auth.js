const jwt = require("jsonwebtoken");

const UserModel = require("../models/user");
const VerifyCodeModel = require("../models/verifyCode");

const { sendEmail } = require("../utils/emailHandler");
const { GenerateCode } = require("../helpers/aux");
const {
  ResendVerifyCodeEmailTemplate,
  NewUserEmailTemplate,
} = require("../utils/emailTemplates");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const sameEmail = await UserModel.findOne({ email }).exec();

      // Check if email  already exists
      if (sameEmail) {
        return res
          .status(400)
          .json({ errors: { email: { message: "Email already exists!" } } });
      }

      let newUser = new UserModel({ firstName, lastName, email, password });
      let savedUser = await newUser.save();

      const user = { ...newUser._doc };

      let VerifyCode = new VerifyCodeModel({
        userId: user._id,
        code: GenerateCode(),
      });

      const verifyLink = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/auth/verify-email/${user._id}/${VerifyCode.code}`;

      sendEmail(
        user.email,
        "Welcome to Expense Tracker App",
        NewUserEmailTemplate(user.firstName, verifyLink)
      );

      VerifyCode.save();

      return res.json(savedUser);
    } catch (err) {
      console.log(err);
      UserModel.findOneAndDelete({ email }).exec();
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
    VerifyCodeModel.findOneAndDelete(
      { code: verifyCode, userId },
      async function (err, match) {
        if (err) {
          return res.status(400).json({ message: "Bad Request" });
        }

        if (!match) {
          res.redirect(
            `${process.env.REACT_APP}/register/verify?success=false`
          );
          //return res.status(400).json({ message: "Code Expired" });
        }

        //Update the user status
        UserModel.findByIdAndUpdate(userId, {
          status: "verified",
        }).exec();

        let user = await UserModel.findById(userId).exec();

        let token = jwt.sign({ id: user._id }, TOKEN_SECRET);

        res.redirect(
          `${process.env.REACT_APP}/register/verify?success=true&t=${token}`
        );
        /*
        res.json({
          status: 200,
          message: "Email Verified!",
          token,
        });
        */
      }
    );
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

      try {
        const verifyLink = `${req.protocol}://${req.get(
          "host"
        )}/api/v1/auth/verify-email/${user._id}/${newVerifyCode.code}`;

        sendEmail(
          email,
          "Verification code",
          ResendVerifyCodeEmailTemplate(user.firstName, verifyLink)
        );
      } catch (err) {
        return res.status(500).json(err);
      }
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
