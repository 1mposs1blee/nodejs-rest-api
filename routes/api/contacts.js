const express = require("express");

const { contactsCtrl } = require("../../conrollers");

const { validateBody, isValidId } = require("../../middlewares");

const { contactsSchemas } = require("../../models");

const router = express.Router();

router.get("/", contactsCtrl.getAll);

router.get("/:contactId", isValidId, contactsCtrl.getById);

router.post("/", validateBody(contactsSchemas.post), contactsCtrl.add);

router.delete("/:contactId", isValidId, contactsCtrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactsSchemas.put),
  contactsCtrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactsSchemas.patchFavorite),
  contactsCtrl.updateStatusContact
);

module.exports = router;
