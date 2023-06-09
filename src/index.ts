import loadEnvironments from "./loadEnvironments.js";

import { startDatabase } from "./database/index.js";
import startServer from "./server/index.js";

const { port, database } = loadEnvironments;

await startServer(+port);
await startDatabase(database);
