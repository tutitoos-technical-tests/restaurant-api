import app from "./app.js";
import logger from "../utils/logger.js";

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port http://localhost:${port}`);

      resolve(server);
    });

    server.on("error", (error: Error) => {
      logger.error(`There was an error in server ${error.message}`);

      reject(error);
    });
  });

export default startServer;
