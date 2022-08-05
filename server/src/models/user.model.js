const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, "Name should be minimum of 4 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be minimum of 8 characters"],
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", usersSchema);
