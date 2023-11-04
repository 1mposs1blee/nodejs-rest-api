const nodemailer = require("nodemailer");

const { PASSWORD } = process.env;

const ownerEmail = "pelerovteatr@meta.ua";

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: ownerEmail,
    pass: PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const emailOptions = { ...data, from: ownerEmail };

  await transporter.sendMail(emailOptions);

  return true;
};

module.exports = sendEmail;
