import loadEnvironments from "./loadEnvironments.js";

import { startDatabase } from "./database/index.js";
import startServer from "./server/index.js";

const { port } = loadEnvironments;

await startDatabase();
await startServer(+port);
