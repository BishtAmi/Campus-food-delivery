const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  emailOTP: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  role: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  otp: {
    type: String,
  },
});
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("userData", userSchema);
