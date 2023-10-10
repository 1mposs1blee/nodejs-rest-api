const { HttpError, ctrlWrapper } = require("../helpers");

const { contactsOperations } = require("../models");

const getAll = async (_, res) => {
  const contacts = await contactsOperations.listContacts();

  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contactById = await contactsOperations.getContactById(contactId);

  if (contactById === null) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(contactById);
};

const add = async (req, res) => {
  const newContact = await contactsOperations.addContact(req.body);

  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const removedContact = await contactsOperations.removeContact(contactId);

  if (removedContact === null) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "Contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await contactsOperations.updateContact(
    contactId,
    req.body
  );

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
};
