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
    select: false,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  hashedDBPassword
) {
  return await bcrypt.compare(candidatePassword, hashedDBPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
