const express = require("express");

const logger = require("morgan");

const cors = require("cors");

const app = express();

const { contactsRouter } = require("./routes/api");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  let { status = 500, message } = err;

  if (message.includes("ENOENT")) {
    message = "Server error";
  }

  res.status(status).json({ message });
});

module.exports = app;
