const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const { sendEmail } = require("../utils/emailHandler");
const { NewUserEmailTemplate } = require("../utils/emailTemplates");

const SALT = 10;

const VerifyCodeModel = require("./verifyCode");
const Aux = require("../helpers/aux");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already in use"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  status: {
    type: String,
    default: "pending",
  },
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

UserSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, SALT, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  delete obj.expenses;
  return obj;
};

UserSchema.methods.comparePassword = function (inputPW, cb) {
  bcrypt.compare(inputPW, this.password, function (err, isMatch) {
    if (err) return cb(err, false);
    cb(null, isMatch);
  });
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
