const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const post = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const put = Joi.object().or("name", "email", "phone").required().keys({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const patchFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactsSchemas = { post, put, patchFavorite };

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactsSchemas };
