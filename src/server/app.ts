import cors from "cors";
import express from "express";
import morgan from "morgan";
import { generalRouter } from "./routers/index.js";
import routes from "./routers/routes.js";

const { general } = routes;
const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(general.root, generalRouter);

export default app;
