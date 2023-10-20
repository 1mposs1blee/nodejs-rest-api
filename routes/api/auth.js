const express = require("express");
const { authCtrl } = require("../../conrollers");
const { validateBody, authenticate } = require("../../middlewares");
const {
  authSchemas: { register, login, patchSubscription },
} = require("../../models");

const router = express.Router();

router.post("/register", validateBody(register), authCtrl.register);

router.post("/login", validateBody(login), authCtrl.login);

router.get("/current", authenticate, authCtrl.getCurrent);

router.post("/logout", authenticate, authCtrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(patchSubscription),
  authCtrl.updateSubscriptionUser
);

module.exports = router;