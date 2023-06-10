import "../loadEnvironments.js";

import chalk from "chalk";
import debugCreator from "debug";

class Logger {
  debug: debugCreator.Debugger;

  constructor() {
    this.debug = debugCreator("system:server");
  }

  setType(type: "server" | "db" | "internal") {
    this.debug = debugCreator(`system:${type}`);
  }

  info(message: string) {
    this.debug(chalk.blueBright(message));
  }

  error(message: string) {
    this.debug(chalk.redBright(message));
  }
}

export default Logger;
