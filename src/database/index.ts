import { Sequelize } from "sequelize";
import Logger from "../utils/Logger.js";
import loadEnvironments from "../loadEnvironments.js";

const {
  database: { dbName, user, password, host, port },
} = loadEnvironments;
const logger = new Logger();
logger.setType("db");

export const database: Sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect: "postgres",
  ssl: false,
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  native: false,
});

const syncDatabaseModels = async () => {
  try {
    await database.sync();

    logger.info("Database synchronized");
  } catch (error: unknown) {
    const { message } = error as Error;

    logger.error(`Error synchronizing database: ${message}`);
    throw new Error("Failed to synchronize database models");
  }
};

export const startDatabase = async () => {
  try {
    await database.authenticate();
    await syncDatabaseModels();

    logger.info("Connected");
  } catch (error: unknown) {
    const { message } = error as Error;

    logger.error(`There was an error in database ${message}`);
  }
};
