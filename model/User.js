const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { schema } = require("./secure/userValidation");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [4, "ok"],
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// this is middle ware for hgashing password
userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("User", userSchema);
