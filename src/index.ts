import loadEnvironments from "./loadEnvironments.js";
import startServer from "./server/index.js";

const { port } = loadEnvironments;

await startServer(+port);
