const fs = require("fs").promises;

const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  return contacts[contactIndex];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  const removedContact = contacts[contactIndex];

  contacts.splice(contactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = { ...body, id: nanoid() };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactById = await getContactById(contactId);

  if (contactById === null) {
    return null;
  }

  const {
    name: previousName,
    email: previousEmail,
    phone: previousPhone,
  } = contactById;
  const { name: newName, email: newEmail, phone: newPhone } = body;

  contactById.name = newName || previousName;
  contactById.email = newEmail || previousEmail;
  contactById.phone = newPhone || previousPhone;

  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  contacts.splice(contactIndex, 1, contactById);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactById;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
