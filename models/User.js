const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "E-mail already exists"],
    select: false,
  },
  password: {
    type: String,
    required: [true, "Please enter some password"],
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema);
