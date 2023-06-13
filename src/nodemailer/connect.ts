import { createTransport } from "nodemailer";
import loadEnvironments from "../loadEnvironments.js";
import Logger from "../utils/Logger.js";

const logger = new Logger();
logger.setType("mail");

const {
  nodemailer: { username, password, host, port },
} = loadEnvironments;

const nodemailer = createTransport({
  service: "mailgun",
  host,
  port,
  secure: port === 465,
  auth: {
    user: username,
    pass: password,
  },
});

logger.info("Connected");

export default nodemailer;
