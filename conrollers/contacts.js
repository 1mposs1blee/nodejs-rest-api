const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models");

const getAll = async (_, res) => {
  const contacts = await Contact.find();

  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contactById = await Contact.findById(contactId);

  if (contactById === null) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(contactById);
};

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const removedContact = await Contact.findByIdAndDelete(contactId);

  if (removedContact === null) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "Contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
