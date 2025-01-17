const express = require("express");
const { authCtrl } = require("../../conrollers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  authSchemas: { register, login, patchSubscription, emailSchema },
} = require("../../models");

const router = express.Router();

router.post("/register", validateBody(register), authCtrl.register);

router.get("/verify/:verificationToken", authCtrl.verifyEmail);

router.post("/verify", validateBody(emailSchema), authCtrl.resendVerifyEmail);

router.post("/login", validateBody(login), authCtrl.login);

router.get("/current", authenticate, authCtrl.getCurrent);

router.post("/logout", authenticate, authCtrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(patchSubscription),
  authCtrl.updateSubscriptionUser
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authCtrl.updateAvatarUser
);

module.exports = router;
