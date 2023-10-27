const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../public/avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);

  const { email: newEmail, subscription } = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newEmail,
      subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  const { email: userEmail, subscription } = await User.findByIdAndUpdate(
    user._id,
    {
      token,
    }
  );

  res.json({ token, user: { email: userEmail, subscription } });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const updateSubscriptionUser = async (req, res) => {
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json(updatedUser);
};

const updateAvatarUser = async (req, res) => {
  const { _id } = req.user;

  const { path: tmpUpload, originalname } = req.file;

  const resizedImage = await Jimp.read(tmpUpload).then((result) =>
    result
      .autocrop()
      .resize(200, 200, Jimp.RESIZE_BEZIER)
      .getBufferAsync(Jimp.MIME_JPEG)
  );

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);

  await fs.writeFile(resultUpload, resizedImage);

  await fs.unlink(tmpUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
  updateAvatarUser: ctrlWrapper(updateAvatarUser),
};
