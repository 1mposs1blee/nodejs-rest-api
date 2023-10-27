const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

const { contactsRouter, authRouter } = require("./routes/api");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  let { status = 500, message = "Server error" } = err;

  if (message.includes("ENOENT")) {
    message = "Server error";
  }

  if (message.includes("req.file") || message === "Unexpected field") {
    status = 400;
    message = "There should only be an 'avatar' field that contains the image";
  }

  res.status(status).json({ message });
});

module.exports = app;
