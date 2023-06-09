import { Sequelize } from "sequelize";
import Logger from "../utils/Logger.js";
import { type DatabaseProps } from "../types/types";

const logger = new Logger();
logger.setType("db");

export let database: Sequelize | null = null;

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

export const startDatabase = async ({ dbName, user, password, host, port }: DatabaseProps) => {
  try {
    database = new Sequelize(dbName, user, password, {
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

    await database.authenticate();

    logger.info("Connected");

    await syncDatabaseModels();
  } catch (error: unknown) {
    const { message } = error as Error;

    logger.error(`There was an error in database ${message}`);

    database = null;
  }
};
