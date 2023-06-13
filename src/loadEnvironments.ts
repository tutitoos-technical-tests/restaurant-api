import dotenv from "dotenv";
dotenv.config();

const {
  PORT: port,
  DEBUG: debug,
  PG_DATABASE: pgDatabase,
  PG_USER: pgUser,
  PG_PASSWORD: pgPassword,
  PG_HOST: pgHost,
  PG_PORT: pgPort,
  EMAIL_SMTP_USERNAME: emailSmtpUsername,
  EMAIL_SMTP_PASSWORD: emailSmtpPassword,
  EMAIL_SMTP_HOST: emailSmtpHost,
  EMAIL_SMTP_PORT: emailSmtpPort,
  EMAIL_TO_TEST: emailToTest,
} = process.env;

interface Environments {
  port: number;
  debug: string;
  database: {
    dbName: string;
    user: string;
    password: string;
    host: string;
    port: number;
  };
  nodemailer: {
    username: string;
    password: string;
    host: string;
    port: number;
    emailToTest: string;
  };
}

const loadEnvironments: Environments = {
  port: +port || 4001,
  debug,
  database: {
    dbName: pgDatabase,
    user: pgUser,
    password: pgPassword,
    host: pgHost,
    port: +pgPort,
  },
  nodemailer: {
    username: emailSmtpUsername,
    password: emailSmtpPassword,
    host: emailSmtpHost,
    port: +emailSmtpPort,
    emailToTest,
  },
};

export default loadEnvironments;
