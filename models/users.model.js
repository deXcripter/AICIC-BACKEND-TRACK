const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// name, email, password, avatar
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required"],
  },
  email: {
    type: String,
    required: [true, "An email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    maxlength: 20,
  },
  avatar: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

const User = mongoose.model("User", userSchema); // Adannas

module.exports = User;
