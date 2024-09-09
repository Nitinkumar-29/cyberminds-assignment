const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true, // Corrected 'require' to 'required'
  },
  email: {
    type: String,
    required: true, // Corrected 'require' to 'required'
  },
  password: {
    type: String,
    required: true, // Corrected 'require' to 'required'
  },
  mobileNumber: {
    type: Number,
    required: false, // Corrected 'require' to 'required'
  },
  date: {
    type: Date,
    default: Date.now, // You can set the default to `Date.now` instead of calling new Date
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
