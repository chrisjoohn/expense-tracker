const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT = 10;

const VerifyCodeModel = require("./verifyCode");
const Aux = require('../helpers/aux');

const UserSchema = new mongoose.Schema({
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
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  status: {
    type: String,
    default: "pending",
  },
});

UserSchema.pre("save", function (next) {
  let user = this;

  if (user.isNew) {
    let VerifyCode = new VerifyCodeModel({
      userId: user._id,
      code: Aux.GenerateCode(),
    });

    VerifyCode.save();
  }

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
