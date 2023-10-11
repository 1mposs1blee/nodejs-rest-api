const express = require("express");

const { contactsCtrl } = require("../../conrollers");

const { validateBody } = require("../../middlewares");

const { contactsSchemas } = require("../../schemas");

const router = express.Router();

router.get("/", contactsCtrl.getAll);

router.get("/:contactId", contactsCtrl.getById);

router.post("/", validateBody(contactsSchemas.post), contactsCtrl.add);

router.delete("/:contactId", contactsCtrl.deleteById);

router.put(
  "/:contactId",
  validateBody(contactsSchemas.put),
  contactsCtrl.updateById
);

module.exports = router;
