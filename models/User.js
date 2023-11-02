const { Schema, model } = require("mongoose");
const { handleValidateError, runUpdateValidators } = require("./hooks");
const { emailValidator } = require("../constants/contact-constants");

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: [emailValidator, "Invalid email address"],
      unique: true,
      required: [true, "Set email for contact"],
    },
    password: {
      type: String,
      minlength: [6, "The minimum password length must be 6 characters"],
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatar: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      //  required: [true, 'Verify token is required'],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleValidateError);

userSchema.pre("findOneAndUpdate", runUpdateValidators);

userSchema.post("findOneAndUpdate", handleValidateError);

const User = model("user", userSchema);

module.exports = User;
