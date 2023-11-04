const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const subscriptionValues = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionValues,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const patchSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionValues)
    .required(),
});

const authSchemas = { register, login, patchSubscription, emailSchema };

const User = model("user", userSchema);

module.exports = { User, authSchemas };
