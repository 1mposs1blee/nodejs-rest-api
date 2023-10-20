const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact } = require("../models");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const filters = { owner };

  if (favorite === "true" || favorite === "false") {
    filters.favorite = JSON.parse(favorite);
  }

  const skip = (page - 1) * limit;

  const contacts = await Contact.find(filters, "", {
    skip,
    limit,
  }).populate("owner", "email");

  res.json(contacts);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId: _id } = req.params;

  const contactById = await Contact.findOne({ _id, owner });

  if (contactById === null) {
    throw HttpError(404, "Not found");
  }

  res.json(contactById);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const newContact = await Contact.create({ ...req.body, owner });

  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId: _id } = req.params;

  const removedContact = await Contact.findOneAndDelete({ _id, owner });

  if (removedContact === null) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId: _id } = req.params;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id, owner },
    req.body,
    {
      new: true,
    }
  );

  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId: _id } = req.params;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id, owner },
    req.body,
    {
      new: true,
    }
  );

  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
