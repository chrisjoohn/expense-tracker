const mongoose = require("mongoose");

const VerifyCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const VerifyCode = new mongoose.model("VerifyCode", VerifyCodeSchema);

module.exports = VerifyCode;
