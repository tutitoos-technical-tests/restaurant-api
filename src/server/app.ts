import cors from "cors";
import express from "express";
import morgan from "morgan";
import { generalRouter, orderRouter } from "./routers/index.js";
import routes from "./routers/routes.js";
import { generalError, notFoundEndpoint } from "./middlewares/errors.js";

const { general, order } = routes;
const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(general.root, generalRouter);
app.use(order.root, orderRouter);

app.use(notFoundEndpoint);
app.use(generalError);

export default app;
