import { Sequelize } from "sequelize";
import Logger from "../utils/Logger.js";
import { type DatabaseProps } from "../types/types";

const logger = new Logger();
logger.setType("db");

export let database: Sequelize | null = null;

export const startDatabase = async ({ dbName, user, password, host, port }: DatabaseProps) => {
  try {
    const sequelize = new Sequelize(dbName, user, password, {
      host,
      port,
      dialect: "postgres",
    });

    await sequelize.authenticate();

    logger.info("Connected");

    database = sequelize;
  } catch (error: unknown) {
    const { message } = error as Error;

    logger.error(`There was an error in database ${message}`);

    database = null;
  }
};
