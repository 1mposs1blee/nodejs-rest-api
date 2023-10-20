const express = require("express");
const { contactsCtrl } = require("../../conrollers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contactsSchemas } = require("../../models");

const router = express.Router();

router.get("/", authenticate, contactsCtrl.getAll);

router.get("/:contactId", authenticate, isValidId, contactsCtrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(contactsSchemas.post),
  contactsCtrl.add
);

router.delete("/:contactId", authenticate, isValidId, contactsCtrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactsSchemas.put),
  contactsCtrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(contactsSchemas.patchFavorite),
  contactsCtrl.updateStatusContact
);

module.exports = router;
