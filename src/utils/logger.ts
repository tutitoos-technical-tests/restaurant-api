import "../loadEnvironments.js";

import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("system:server");

const logger = {
  info(message: string) {
    debug(chalk.blueBright(message));
  },
  error(message: string) {
    debug(chalk.redBright(message));
  },
};

export default logger;
