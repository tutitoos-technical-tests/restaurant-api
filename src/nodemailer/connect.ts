import { createTransport } from "nodemailer";
import loadEnvironments from "../loadEnvironments.js";

const {
  nodemailer: { username, password, host, port },
} = loadEnvironments;

const nodemailer = createTransport({
  service: "Mailgun",
  host,
  port,
  secure: port === 465,
  auth: {
    user: username,
    pass: password,
  },
});

export default nodemailer;
